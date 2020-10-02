#! python

# *##############################################
# * Generic Helpers
# *##############################################

import decimal
import json
import re
from datetime import datetime, timedelta
import slugid
import uuid


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def get_date_time(now=True):
    date_time = datetime.utcnow()
    return date_time


def get_date_time_delta(date_time, days=14):
    date_time = date_time + timedelta(days=days)
    return date_time


def datetime_to_iso8610(date_time):
    date_time = str(date_time.replace(microsecond=0).isoformat()) + "Z"
    return date_time


def is_valid_mobile_number(mobile_number):
    e_164 = re.compile(r"^\+?[1-9]\d{1,14}$")
    is_valid = bool(e_164.match(mobile_number))
    return is_valid


def get_slug():
    return slugid.v4()


def get_uuidv4():
    uuid_4 = uuid.uuid4()
    return str(uuid_4)


def j_dumps(json_obj):
    return json.dumps(json_obj, cls=DecimalEncoder)


def j_loads(json_obj):
    return json.loads(json_obj, parse_float=decimal.Decimal)


def get_headers(event):
    headers = event.get("headers", None)
    return headers


def get_body(event):
    body = event.get("body", None)
    body = j_loads(body)
    return body


def get_from_body(event, key_name):
    body = get_body(event)
    result = body.get(key_name, None)

    return result


def get_request_context(event):
    request_context = event.get("requestContext", None)
    return request_context


def get_path_params(event):
    path_params = event.get("pathParameters", None)
    return path_params


def get_id(event):
    path_params = get_path_params(event)
    id = path_params.get("id", None)
    return id


def get_account_id(event):
    request_context = get_request_context(event)
    account_id = request_context.get("accountId", None)
    return account_id


def get_table_name_from_api_event(event):
    tenant = get_tenant(event)
    table_name = f"forms-engine-{tenant}"
    return table_name


def get_table_name_from_s3_event(event):
    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]

    table_name = bucket_name.rsplit("-", 1)[0]
    return table_name


def get_bucket_name(event):
    tenant = get_tenant(event)
    account_id = get_account_id(event)
    bucket_name = f"forms-engine-{tenant}-{account_id}"
    return bucket_name


def get_tenant(event):
    headers = get_headers(event)
    tenant = headers.get("tenant", None)
    return tenant


def get_domain(event):
    tenant = get_tenant(event)
    domain = f"https://{tenant}.example.com"
    return domain


def build_response(status_code, body=None):

    if body:
        body = j_dumps(body)

    response = {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": body,
        "isBase64Encoded": False,
    }

    return response

    #!#############################################
    #! WIP Below
    #!#############################################


def process_checkin_results(results):
    # ! ADD PROCESSING RULES HERE
    # ! Move to Rules Engine File
    # ! NEEDS WORK
    # *#############################################

    def get_text_results(text_lst, match_str):
        # ! COMPLETE THIS and add others
        text_result = {}

        return text_result

    # *#############################################
    background_result = get_text_results(results["detectedText"], "reliable")
    text_result = get_text_results(results["detectedText"], "reliable")
    face_result = get_text_results(results["detectedText"], "reliable")
    location_result = get_text_results(results["detectedText"], "reliable")
    duration_result = get_text_results(results["detectedText"], "reliable")
    content_result = get_text_results(results["detectedText"], "reliable")

    # *#############################################

    result = {
        "background": background_result,
        "text": text_result,
        "face": face_result,
        "location": location_result,
        "duration": duration_result,
        "content": content_result,
    }

    return result

def get_name(event):
    path_params = get_path_params(event)
    name = path_params.get("name", None)
    return name

def get_formGroup(event):
    path_params = get_path_params(event)
    _formGroup = path_params.get("formGroup", None)
    return _formGroup
