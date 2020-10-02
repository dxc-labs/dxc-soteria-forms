#!/usr/bin/env python
#
# Copyright 2020 DXC Technology
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import boto3
import botocore
import os

from generic import (
    build_response,
    get_table_name_from_api_event,
    get_id,
    get_name,
    get_formGroup,
)

from dynamoDb import get_table_item


# *##############################################
def lambda_handler(event, context):
    try:
        print(f"Received Event: {event}")

        table_name = os.environ.get('TableName')
        table = boto3.resource("dynamodb").Table(table_name)
        errorResponse = "No data found"
        id = get_id(event)
        formGroup = get_formGroup(event)

        response = get_table_item(table, id, formGroup)

        if response:
            response = build_response(200, response)
            print("Form retrieved successfully")
        else:
            response = build_response(404, errorResponse)
            print("No data found")
            
    except botocore.exceptions.ClientError as error:
        response = build_response(500, error.response)
        print("Something went wrong!!")

    return response
