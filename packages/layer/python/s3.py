#! python
from generic import j_loads

# *##############################################
# * S3 Helpers
# *##############################################


def get_presigned_url(s3, method, bucket, file_key, content_type):

    presigned_url = s3.generate_presigned_url(
        ClientMethod=method,
        Params={"Bucket": bucket, "Key": file_key, "ContentType": content_type},
    )
    return presigned_url


def get_latest_file(s3, bucket, prefix):

    files = s3.list_objects_v2(Bucket=bucket, Prefix=f"images/{prefix}",)["Contents"]

    get_last_modified = lambda x: x["LastModified"]
    files = [file for file in sorted(files, key=get_last_modified, reverse=True)]

    try:
        latest_file = files[1]
    except:
        latest_file = files[0]

    print(files)
    print(latest_file)

    return latest_file


def get_tenant_config(s3, bucket):

    config = s3.get_object(Bucket=bucket, Key="config.json")

    config = config["Body"].read().decode("utf-8")
    print(config)

    config = j_loads(config)
    print(config)

    return config
