import boto3


def batch_get_items(zipcodes):
    dynamodb = boto3.resource('dynamodb')

    batch_keys = {
        'Product': {
            'Keys': [{'Zip': zipcode} for zipcode in zipcodes]
        }
    }

    response = dynamodb.batch_get_item(RequestItems=batch_keys)
    return response


def batch_write_items(items):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Product')
    zipcodes = []
    with table.batch_writer() as batch:
        for item in items:
            zipcodes.append(item['Zip'])
            batch.put_item(Item=item)

    return batch_get_items(zipcodes)


