import boto3
import os
import uuid

def lambda_handler(event, context):
    return_val = "Failed to process."
    DynamoDB_table_name = os.environ['DB_TABLE_NAME']
    sns_topic_arn = os.environ['SNS_TOPIC']
    
    selected_voice = event["voice"]
    input_text = event["text"]
    unique_id = str(uuid.uuid4())
    
    print("Created Unique ID : " + unique_id)
    print("Input Text : " + input_text)
    print("Selected Voice : " + selected_voice)
    
    #Connect to DynamoDB service in N.Virginia Region
    try:
        dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
        table = dynamodb.Table(DynamoDB_table_name)
        #Put an Item to Table
        try:
            table.put_item(
                Item={
                    'id' : unique_id,
                    'input text' : input_text,
                    'selected voice' : selected_voice,
                    'status' : 'PROCESSING'
                }
            )
            print("Successfull Inserted an item with id : " + unique_id)
            return_val = "Text is PROCESSING."
        except Exception as e:
            print("Insert Item to Table failed because ", e)
    except Exception as e:
        print("Connect to DynamoDB failed because ", e)
    
    #Client connection to SNS service in N.Virgina region
    try:
        snsClient = boto3.client("sns", region_name = "us-east-1")
        #Publish a message to SNS Topic
        try:
            snsClient.publish(
                TopicArn = sns_topic_arn,
                Message = unique_id
            )
            print("Successfull Published a Message.")
        except Exception as e:
            print("Publish message to SNS topic failed because ", e)
    except Exception as e:
        print("Client connection failed because ", e)
    return return_val
