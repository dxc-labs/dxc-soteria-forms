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
import os
import botocore

from generic import (
    build_response,
    get_table_name_from_api_event,
)

from dynamoDb import query_gsi1


# *##############################################
def lambda_handler(event, context):
    try:
        print(f"Received Event: {event}")

        table_name = os.environ.get('TableName')
        table = boto3.resource("dynamodb").Table(table_name)

        response = query_gsi1(table, filter_value="form")
        response = build_response(200, response)
        print("Forms retrieved successfully")

        if response["body"] == []:
            response["statusCode"] = 404
            response["body"] = "No Records"
            print(response)
            print("No data found")

    except botocore.exceptions.ClientError as error:
        response = build_response(500, error.response)
        print("Something went wrong!!")
        
    return response
