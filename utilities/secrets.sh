# Configuration

ProjectName="--- Project Name Here ---" # E.g., soteria
TenantName="--- Tenant Name Here ---" # E.g., acme
EnvironmentName="--- Environment Name Here ---" # E.g., sbx
ComponentName="surveys"
AWS_REGION="--- AWS Region Here ---" # E.g., us-east-1
apiKey="--- API Key Here ---"

if aws ssm put-parameter --region $AWS_REGION --name "${ProjectName}-${TenantName}-${EnvironmentName}-${ComponentName}-apikey" --type "SecureString" --value "${apiKey}" --tier Standard --overwrite; then
		echo "SSM apikey created"
fi
