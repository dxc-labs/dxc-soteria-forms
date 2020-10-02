#! python
from boto3.dynamodb.conditions import Attr, Key


# *##############################################
# * DynamoDB Helpers
# *##############################################


def build_update_expr(update_expr):
    update_expr_str = ""
    for modifier, attributes in update_expr.items():
        update_expr_str += f"{modifier} "

        for attribute in attributes:
            update_expr_str += attribute

            if attribute != attributes[-1]:
                update_expr_str += ", "

    return update_expr_str


def query_gsi1(table, filter_value=None):
    """
    Perform a query operation on the table. 
    Can specify filter_key (col name) and its value to be filtered.
    """

    if filter_value:
        filtering_exp = Key("sk").eq(filter_value)
        response = table.query(IndexName="GSI1", KeyConditionExpression=filtering_exp)
    else:
        response = table.query()

    return response["Items"]


def query_table(table, pk_value, sk_value=None):
    """
    Perform a query operation on the table. 
    Can specify filter_key (col name) and its value to be filtered.
    """
    if sk_value:
        filtering_exp = Key("pk").eq(pk_value) & Key("sk").begins_with(sk_value)
    else:
        filtering_exp = Key("pk").eq(pk_value)

    response = table.query(KeyConditionExpression=filtering_exp)

    return response["Items"]


def scan_table(table, filter_key=None, filter_value=None, type="eq"):
    """
    Perform a scan operation on table.
    Can specify filter_key (col name) and its value to be filtered.
    """

    if filter_key and filter_value and type == "eq":
        filtering_exp = Key(filter_key).eq(filter_value)
        response = table.scan(FilterExpression=filtering_exp)

    elif filter_key and filter_value and type == "bw":
        filtering_exp = Key(filter_key).begins_with(filter_value)
        response = table.scan(FilterExpression=filtering_exp)

    else:
        response = table.scan()

    return response["Items"]


def get_table_item(table, pk_value, sk_value):
    """
    Return item read by primary key.
    """
    response = table.get_item(Key={"pk": pk_value, "sk": sk_value})

    if "Item" not in response:
        response["Item"] = []

    return response["Item"]


def add_item(table, item):
    """
    Add one item (row) to table. col_dict is a dictionary {col_name: value}.
    """
    response = table.put_item(Item=item, ReturnConsumedCapacity="NONE")

    # !attribute_not_exists
    return response


def update_table_item(
    table, pk_value, sk_value, update_expr, expr_attr_names, expr_attr_vals
):
    """
    Update item
    """
    update_expr = build_update_expr(update_expr)

    response = table.update_item(
        Key={"pk": pk_value, "sk": sk_value},
        UpdateExpression=update_expr,
        ExpressionAttributeNames=expr_attr_names,
        ExpressionAttributeValues=expr_attr_vals,
    )

    return response


def batch_put_items(table, items):
    """
    Batch put items
    """
    with table.batch_writer() as batch:
        for item in items:
            response = batch.put_item(Item=item)

    print(response)

    return response
