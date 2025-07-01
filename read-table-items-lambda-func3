import boto3
import os
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    table_name = os.environ['DB_TABLE_NAME']
    
    #Connect to DynamoDB service in N.Virginia Region
    try:
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        table = dynamodb.Table(table_name)
        #Read all data
        try:
            items = table.scan()
            print("Scan completed.")
        except Exception as e:
            print("")
    except Exception as e:
        print("Connect to DynamoDB table failed because ", e)
    #Return all the items in the table
    return items["Items"]
