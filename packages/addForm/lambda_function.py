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
    get_from_body,
    get_uuidv4,
    get_slug,
)

from dynamoDb import add_item


# *##############################################
def lambda_handler(event, context):
    try:
        print(f"Received Event: {event}")

        table_name = os.environ.get('TableName')
        table = boto3.resource("dynamodb").Table(table_name)

        name = get_from_body(event, "name")
        sk = get_from_body(event, "sk")
        id = get_from_body(event, "id")
        form = get_from_body(event, "form")
        category1 = get_from_body(event, "category1")
        category2 = get_from_body(event, "category2")
        country = get_from_body(event, "country")
        mandatedDays = get_from_body(event, "mandatedDays")
        location = get_from_body(event, "location")

        if sk == 'named-form' or id is not None:
            id = get_from_body(event, "id")
        else:
            id = get_slug()
        
        baseUrl = os.environ.get('reactAppDomain')
        print(f"baseUrl: {baseUrl}")

        var2 = "employeeJoin"
        var3 = "visitorJoin"

        if category1 == 'employee':
            link = "/".join([baseUrl, var2, id]) 
            payload = checkin = {
                "pk": id,
                "sk": sk,
                "name": name,
                "category1": category1,
                "category2": category2,
                "country": country,
                "mandatedDays": mandatedDays,
                "form": form,
                "surveyLink": link
            }
        elif category1 == 'visitor':
            link= "/".join([baseUrl, var3, location, id])
            payload = checkin = {
                "pk": id,
                "sk": sk,
                "name": name,
                "category1": category1,
                "category2": category2,
                "country": country,
                "mandatedDays": mandatedDays,
                "form": form,
                "surveyLink": link
            }
        else:
            payload = checkin = {
                "pk": id,
                "sk": sk,
                "name": name,
                "category1": category1,
                "category2": category2,
                "country": country,
                "mandatedDays": mandatedDays,
                "form": form
            }
        
        print("form data: {payload}")
    
        response = add_item(table, payload)
        response = build_response(201, response)
        print("Form inserted successfully")

    except botocore.exceptions.ClientError as error:
        response = build_response(500, error.response)
        print("Something went wrong!!")
        
    return response
