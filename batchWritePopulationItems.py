import PopulationDAO as DAO
import collections


def lambda_handler(event, context):
    try:
        verify_input(event)
    except Exception as e:
        print(e)
        response = {
            'statusCode': 400,
            'errorMessage': str(e),
        }
        return response

    items = event['items']

    zipcodes = []

    # remove items without specified Modified User
    items_to_delete = []
    for item in items:
        if item['Modified User'] == '':
            items_to_delete.append(item)
        else:
            zipcodes.append(item['Zip'])

    for item in items_to_delete:
        items.remove(item)

    # get the order to return items in
    sort_order = calc_order(items)

    # get items already in database
    already_in_database = dict()
    zipcodes_in_database = []
    res = DAO.batch_get_items(zipcodes)
    for table, _items in res.items():
        if 'Population' in _items:
            for item in _items['Population']:
                already_in_database[item['Zip']] = item
                zipcodes_in_database.append(item['Zip'])

    # compare items already in database with items to be uploaded
    # items that overlap with empty cells are filled in with existing items' cells
    for item in items:
        if item['Zip'] in zipcodes_in_database:
            for key in item:
                if item[key] == '':
                    item[key] = already_in_database[item['Zip']][key]

    result = []
    res = DAO.batch_write_items(items)
    for table, items in res.items():
        if 'Population' in items:
            for item in items['Population']:
                ordered_item = order_item(item)
                result.append(ordered_item)

    result.sort(key=lambda item: sort_order[item["Zip"]])

    response = {
        'statusCode': 200,
        'body': result,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }

    # return array of objects, each object represents a tuple
    return response


def calc_order(items):
    zipcodes = []
    for i in range(len(items)):
        zipcodes.append(items[i]['Zip'])
    order = dict()
    for i in range(len(zipcodes)):
        order[zipcodes[i]] = i
    return order


def order_item(item):
    key_order = ('Zip', '5 Mile Population', 'Recorded', 'ORG User', 'Modified User')
    ordered_item = collections.OrderedDict((k, item[k]) for k in key_order)
    return ordered_item


def verify_input(event):
    if 'items' not in event:
        raise Exception('request requires a list called "items".')
    if not isinstance(event['items'], list):
        raise Exception('"items" must be a list of objects.')
    for item in event['items']:
        if type(item) is not dict:
            raise Exception(str(item) + " is not the correct format.")
        if 'Zip' not in item or 'Recorded' not in item or '5 Mile Population' not in item or 'Modified User' not in item or 'ORG User' not in item:
            raise Exception(str(item) + " is not the correct format.")
    if not event['items']:
        raise Exception('request cannot contain empty list.')
    for item in event['items']:
        for key in item:
            if item[key] == 'N/A' and item['Modified User'] != "":  # if modified user is not specified, item is ignored
                raise Exception('{' + str(key) + ': N/A} is not allowed to be inserted into the database.')