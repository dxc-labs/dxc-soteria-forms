#! python

# *##############################################
# * SNS Helpers
# *##############################################


def send_sms(sns, sender_id, message, mobile_number):
    response = sns.publish(
        PhoneNumber=mobile_number,
        Message=message,
        MessageAttributes={
            "AWS.SNS.SMS.SenderID": {"DataType": "String", "StringValue": sender_id,},
            "AWS.SNS.SMS.SMSType": {
                "DataType": "String",
                "StringValue": "Transactional",
            },
        },
    )
    return response
