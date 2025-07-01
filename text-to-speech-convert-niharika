import boto3
import os
from contextlib import closing
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    DynamoDB_Table_name = os.environ['DB_TABLE_NAME']
    S3_Bucket_name = os.environ['BUCKET_NAME']
    unique_id = event["Records"][0]["Sns"]["Message"]

    print("Started Text to Speech operation for ID : " + unique_id)

    #Connect to DynamoDB service in N.Virginia Region
    try:
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        table = dynamodb.Table(DynamoDB_Table_name)
        #Fetch data based on ID
        try:
            GetItem = table.query(
                KeyConditionExpression=Key('id').eq(unique_id)
            )
        except Exception as e:
            print("Get item from table failed because ", e)
    except Exception as e:
        print("Connect to DynamoDB Failed because ", e)

    Input_text = GetItem["Items"][0]["input text"]
    selected_voice = GetItem["Items"][0]["selected voice"]

    text_backup = Input_text

    # Because single invocation of the polly synthesize_speech api can
    # transform text with about 3000 characters, we are dividing the
    # post into blocks of approximately 2500 characters.
    try:
        textBlocks = []
        while (len(text_backup) > 1100):
            begin = 0
            end = text_backup.find(".", 1000)
    
            if (end == -1):
                end = text_backup.find(" ", 1000)
    
            textBlock = text_backup[begin:end]
            text_backup = text_backup[end:]
            textBlocks.append(textBlock)
        textBlocks.append(text_backup)
    except Exception as e:
        print("Split text to blocks failed because ", e)

    #Client Connection to Polly in N.Virginia Region
    try:
        pollyClient = boto3.client("polly", region_name = "us-east-1")
        for textBlock in textBlocks:
            #Convert Text to Speech
            try:
                sysnthesize_response = pollyClient.synthesize_speech(
                    OutputFormat='mp3',
                    Text = textBlock,
                    VoiceId = selected_voice
                )
                #Append Multiple audio streams into a single file.
                #store/save this file in Lambda Temp Folder/Dirctory.
                if "AudioStream" in sysnthesize_response:
                    with closing(sysnthesize_response["AudioStream"]) as stream:
                        output = os.path.join("/tmp/", unique_id)
                        with open(output, "ab") as file:
                            file.write(stream.read())
            except Exception as e:
                print("Speech Synthesize failed because ", e)
        print("Polly Synthesize Completed.")
    except Exception as e:
        print("Client Conncetion to Polly failed because ", e)
    
    #Client Connection to S3 in N.Virginia Region
    try:
        s3Client = boto3.client("s3", region_name = "us-east-1")
        #Upload the file from Lambda temp folder to S3 bucket
        try:
            s3Client.upload_file('/tmp/' + unique_id,
                S3_Bucket_name,
                unique_id + ".mp3")
            print("S3 Upload completed.")
            #Give Read only access to S3 Object that is uploaded
            try:
                s3Client.put_object_acl(ACL='public-read',
                    Bucket=S3_Bucket_name,
                    Key= unique_id + ".mp3")
                print("Gave Public access to S3 Object.")
            except Exception as e:
                print("Set Read only access to Object failed because ", e)
        except Exception as e:
            print("Upload File to S3 Bucket failed beacuse ", e)
        
        #Get Bucket location
        try:
            location = s3Client.get_bucket_location(Bucket=S3_Bucket_name)
            region = location['LocationConstraint']
            
            if region is None:
                url_beginning = "https://s3.amazonaws.com/"
            else:
                url_beginning = "https://s3-" + str(region) + ".amazonaws.com/"
            
            url = url_beginning \
                    + str(S3_Bucket_name) \
                    + "/" \
                    + str(unique_id) \
                    + ".mp3"
        except Exception as e:
            print("Get bucket location failed because ", e)
    except Exception as e:
        print("Client Connection to S3 failed because ", e)
    
    #Update Item based on Unique Id
    #Add the S3 Object URL and status as Updated.
    try:
        response = table.update_item(
            Key={'id':unique_id},
              UpdateExpression=
                "SET #statusAtt = :statusValue, #urlAtt = :urlValue",
              ExpressionAttributeValues=
                {':statusValue': 'COMPLETED', ':urlValue': url},
            ExpressionAttributeNames=
              {'#statusAtt': 'status', '#urlAtt': 'url'},
        )
    except Exception as e:
        print("DynamoDB item update failed because ", e)

    print("Text to Speech operation Completed.")
