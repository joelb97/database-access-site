import ProductDAO as DAO
import collections


def lambda_handler(event, context):
    print(event)
    try:
        verify_input(event)
    except Exception as e:
        print(e)
        response = {
            'statusCode': 400,
            'errorMessage': str(e),
        }
        return response

    zipcodes = event.get('zipcodes')

    sort_order = calc_order(zipcodes)

    result = []
    response = DAO.batch_get_items(zipcodes)
    for table, items in response.items():
        if 'Product' in items:
            for item in items['Product']:
                ordered_item = order_item(item)
                result.append(ordered_item)

    zips_so_far = []
    for item in result:
        zips_so_far.append(item['Zip'])

    zips_diff = list(set(zipcodes) - set(zips_so_far))

    for zip in zips_diff:
        result.append(
            {'Zip': zip, '5 Mile Population': 'N/A', 'Recorded': 'N/A', 'ORG User': 'N/A', 'Modified User': 'N/A'})

    result.sort(key=lambda item: sort_order[item["Zip"]])

    response = {
        'statusCode': 200,
        'body': result,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
    }
    return response


def calc_order(zipcodes):
    print(zipcodes)
    order = dict()
    for i in range(len(zipcodes)):
        order[zipcodes[i]] = i
    return order


def order_item(item):
    key_order = ('Zip', 'Product Info', 'Recorded', 'ORG User', 'Modified User')
    ordered_item = collections.OrderedDict((k, item[k]) for k in key_order)
    return ordered_item


def verify_input(event):
    if 'zipcodes' not in event:
        raise Exception('request requires a list of zipcodes with title "zipcodes".')
    if not isinstance(event['zipcodes'], list):
        raise Exception('"zipcodes" must be a list of of zipcodes.')
    for zipcode in event['zipcodes']:
        if not isinstance(zipcode, str):
            raise Exception('"zipcodes" must be a list of strings.')
    if not event['zipcodes']:
        raise Exception('zipcodes list is empty.')

