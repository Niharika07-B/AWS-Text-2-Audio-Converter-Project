<div align="center">

![HTML](https://img.shields.io/badge/HTML-e34f26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-264de4?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)

</div>

-----

# 🎙️Speak AI — A Text-to-Speech Web App using AWS☁️

_✨ Turn your words into voice. In real time. In any accent. Straight from the cloud._

Welcome to Speak AI — a serverless web app that literally talks back.
Type a message, pick a voice, and within seconds, hear it spoken out loud using the power of Amazon Polly. No downloads. No installs. Just your browser, the cloud, and a bit of magic.

---

# 🌍 Live Demo

🎧 Try the app in action:  
🔗 [Click here to launch Speak AI](https://frontend-text2speech-niharika.s3.us-east-1.amazonaws.com/index.html)

> No installs. Just your browser, some text, and a voice from the cloud!

☁️ Successfully deployed and hosted the application on AWS using Amazon S3 Static Website Hosting, AWS Lambda, Amazon Polly, SNS, and DynamoDB in a fully serverless architecture.

*(😔 The AWS account has expired, so the live demo is no longer accessible. Please refer to the screenshots below to view the application's functionality.)*

---

# 🧠 What is Speak AI?
Speak AI is more than just a text-to-speech app — it's a cloud-native, fully serverless voice generation pipeline built using AWS.

Behind the scenes, it uses a suite of AWS services working in harmony:

   + 🔁 Asynchronous processing with SNS

   + 🧠 Stateless logic with Lambda

   +  📦 Durable storage via S3 and DynamoDB

   +  🎤 Realistic voices with Amazon Polly

   + 🌐 Public APIs through API Gateway

---

# ⚡ Quick Features

     ✅ Enter text in your browser
     

     ✅ Choose from multiple Amazon Polly voices
     

     ✅ Get an audio file generated in seconds
     

     ✅ Scalable to thousands of requests
     

     ✅ No backend servers, no EC2s, no containers
     

     ✅ 100% Serverless. 100% AWS.

---

# 🧬 Architecture at a Glance
 
![AWS_Architecture_Diagram](https://github.com/user-attachments/assets/4285f14d-bd3f-4910-bbd8-b60de3e773be)


---

# 📁 Project Structure

```
AWS-Text-2-Audio-Converter-Project/
│
├── serverless-web/
│   ├── index.html          # 🌐 Main Web UI
│   ├── styles.css          # 🎨 Frontend styles
│   ├── scripts.js          # ⚙️ Frontend logic & API calls
│   └── error.html          # 🚫 Error fallback page
│
├── add_new_posts.py        # 📤 Lambda: Text submit & SNS trigger
├── convert_text_to_audio.py# 🔊 Lambda: Polly text-to-speech
├── read_table_items.py     # 📥 Lambda: Read from DynamoDB
│
├── arc_diagram.png         # 🧭 Architecture visual
├── iam-policy.txt          # 🔐 IAM Roles & Permissions
├── s3-bucket-policy        # 📂 S3 policy for public access
└── README.md               # 📘 Project overview
```

---

# 🛠️ AWS Services Used

| AWS Service     | Purpose                                                        |
|-----------------|--------------------------------------------------------------- |
| Amazon Polly    | Converts text into realistic MP3 speech                        |
| AWS Lambda      | Serverless compute (3 functions for different stages)          |
| Amazon S3       | Stores MP3 files and optionally hosts frontend                 |
| DynamoDB        | NoSQL storage for request data and audio URLs                  |
| SNS             | Publishes events and triggers processing asynchronously        |
| API Gateway     | Connects frontend to Lambda securely via HTTP endpoints        |


---

# 🚀 Getting Started

_____🔧 Prerequisites_____

+ AWS account with programmatic access

+ IAM roles set up with proper permissions

+ Bucket with public-read policy (see s3-bucket-policy)
  
---

# 🧱 Project Overview: AWS Text-to-Audio Converter

## 🎨 Frontend (Static Web)

Files: `index.html`, `styles.css`, `scripts.js`

- 🖋️ **Text Input**: User submits text and selects a voice.
- 🗂️ **Voice Selector**: Dropdown to choose a Polly voice.
- 🎧 **Result Display**: Shows playback links for generated audio.
- 📡 Communicates with backend via REST (API Gateway).

---

## 🔧 Backend (Serverless + AWS)

#### 🛠️ API Gateway
- Exposes secure RESTful endpoints for frontend interactions.
- Triggers Lambda functions upon requests.
- ![abcd3](https://github.com/user-attachments/assets/223c12b8-161c-47fe-88b1-f7a8aa8cb67d)


## 🧠 Lambda Functions

- `add_new_posts.py` 📤  
  ➤ Receives new text input  
  ➤ Stores in **DynamoDB**  
  ➤ Publishes event to **SNS**

- `convert_text_to_audio.py` 🔊  
  ➤ Triggered by **SNS**  
  ➤ Reads text/voice from **DynamoDB**  
  ➤ Converts text to audio using **Amazon Polly**  
  ➤ Uploads `.mp3` to **S3**  
  ➤ Updates **DynamoDB** with the audio URL & status

- `read_table_items.py` 📥  
  ➤ Reads all entries from **DynamoDB**  
  ➤ Returns data to frontend for listing

---

# 🗄️ Data & Event Infrastructure

- 🧾 **DynamoDB**
  - Stores: `text`, `voice`, `status`, `audio_url`
  - Used for both queueing and retrieving data
  - ![abcd2](https://github.com/user-attachments/assets/11b1102b-e00c-40c3-8359-8ee1554f1388)

- 📬 **SNS (Simple Notification Service)**
  - Decouples text submission from audio processing
  - Enables async invocation of audio conversion

- 🗣️ **Amazon Polly**
  - Converts submitted text into lifelike speech
  - Supports multiple languages and voices

- 🗃️ **Amazon S3**
  - Stores generated `.mp3` files
  - Publicly accessible URLs for playback in frontend
  - ![abcd1](https://github.com/user-attachments/assets/bfc376e7-46e0-4beb-85d0-a8b02fb958cb)

---
 
# 📸 Project Screenshots

![abcd4](https://github.com/user-attachments/assets/25c40c84-7a3b-4b2d-80b9-d95ce99619cb)


![abcd5](https://github.com/user-attachments/assets/2a5e1b81-423f-4643-9a8a-52b14cfd6c07)

---

# 📝 Notes to remember

 **Region**:  
  🔹 *Make sure all AWS services (`Lambda`, `DynamoDB`, `S3`, `SNS`, `Polly`) are deployed in the* `us-east-1` *region for seamless integration.*

 **Purpose**:  
  🔹 *This application is intended for* `educational` *and* `demonstration` *purposes. It is not production-hardened.*

---

# ⚠️ Before Public Deployment, Consider These Improvements:

**1️⃣ Input Validation**
- 🔸 Sanitize text input to prevent injection attacks or invalid data.
- 🔸 Set character limits and allow only supported languages.

**2️⃣ Error Handling**
- 🔸 Add try/catch blocks in all Lambda functions.
- 🔸 Show clear frontend error messages (e.g., "Audio failed to generate").
- 🔸 Implement retry logic for transient AWS service errors.

**3️⃣ Security Best Practices**
- 🔐 **IAM Roles**
  - Use **least privilege** access policies.
  - Avoid `AdministratorAccess` on deployed functions.
  - Define **resource-specific ARNs** in permissions.

- 🔐 **S3 & DynamoDB Access**
  - Do **not** expose DynamoDB or sensitive S3 data publicly.
  - Use **signed URLs** if public access is needed.

**4️⃣ Monitoring & Alerts**
- 📊 Enable `CloudWatch Logs` for all Lambda functions.
- ⏰ Create CloudWatch **alarms** for function errors or high latency.
- 💰 Set up **Billing Alerts** to track AWS usage and avoid surprise costs.

---

# Show your support
Give a ⭐ if you like this!

---



