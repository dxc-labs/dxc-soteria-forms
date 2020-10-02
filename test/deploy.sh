#!/bin/bash
echo "====================================== Integration Wrapper test started ==============================================="

echo '=================================== Newman testing for Forms API started ================================================'
error_flag=0

export API_BASE_URL="api-xxx.example.com"
export API_TOKEN="--api-key here--"

echo "API_BASE_URL= "${API_BASE_URL}

if newman run 'postman-collection.json' --insecure --global-var "API_BASE_URL=${API_BASE_URL}" --global-var "API_TOKEN=${API_TOKEN}"
    then
        echo Test succeeded.
            #exit 0 - we don't want to exist because we have additional tests.
    else
        echo Test failed.
        error_flag=1
fi

if [ $error_flag -ne 0 ]; then exit 1; else echo "All the tests passed successfully"; fi
echo '=================================== Newman testing for Forms API done ================================================'
