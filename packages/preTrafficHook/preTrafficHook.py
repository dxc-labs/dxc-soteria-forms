# import aws_cdk
# import aws_cdk.aws_codedeploy as codedeploy

import boto3

client = boto3.client('codedeploy')

def lambda_handler(event, context):
  print(f"Entering PreTraffic Hook!")
  print(f"Received Event: {event}")

  deploymentId = event.get("DeploymentId", None)
  print(f"deploymentId: {deploymentId}")

  lifecycleEventHookExecutionId = event.get("LifecycleEventHookExecutionId", None)
  print(f"lifecycleEventHookExecutionId: {lifecycleEventHookExecutionId}")

  response = client.put_lifecycle_event_hook_execution_status(
    deploymentId=deploymentId,
    lifecycleEventHookExecutionId=lifecycleEventHookExecutionId,
    status='Succeeded'
  )

  print(f"putLifecycleEventHookExecutionStatus done. executionStatus: {response}")
  return 'Validation test succeeded'



