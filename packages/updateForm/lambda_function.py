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
    get_from_body,
    get_id,
    get_formGroup,
)


# *##############################################
def lambda_handler(event, context):
    try:
        print(f"Received Event: {event}")

        table_name = os.environ.get('TableName')
        table = boto3.resource("dynamodb").Table(table_name)
        
        #Fetch the data
        id = get_id(event)
        formGroup = get_formGroup(event)

        #modifiedData
        category2 = get_from_body(event, "category2")
        country = get_from_body(event, "country")
        form = get_from_body(event, "form")
        mandatedDays = get_from_body(event, "mandatedDays")
        formName = get_from_body(event, "name")

    
        response = table.update_item(
                        Key={
                            "pk": id,
                            "sk": formGroup
                        },
                        UpdateExpression="set category2=:c2, country=:c, form=:f, mandatedDays=:m, #formName=:n",
                        ExpressionAttributeValues={
                            ':c2': category2,
                            ':c': country,
                            ':f': form,
                            ':m': mandatedDays,
                            ':n': formName
                        },
                        ExpressionAttributeNames={
                            '#formName': "name"
                        },
                        ReturnValues="UPDATED_NEW"
                    )
        response = build_response(200, response)
        print("Form updated successfully")

    except botocore.exceptions.ClientError as error:
        response = build_response(500, error.response)
        print("Something went wrong!!")
        
    return response
