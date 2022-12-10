﻿# Cannes
 
 
 This is a backend project, with a bare minium frontend just for testing.
 
 In this project , we have created a backend API for a full fledged E-Commerce Store.
 
 Features of this project are as follows-
 
 1. User Authentication.
 2. Products Management.
 3. Order Processing
 4. Payment Gateway Integration.
 5. Inventory Management
 
 
 Services used in this app are- 
 
 1. Cloudinary for images management
 2. Razorpay and Stripe for payment Gateway Integration
 3. MongoDB as Database.
 4. Mailtrap for sending mails.
 
 
 <h1>Steps to run the application</h1>
 1. Create a dotenv file in the root directory and add the following parameters.
 PORT=4000

DB_URL=

JWT_SECRET=
JWT_EXPIRY=
COOKIE_TIME=


CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

STRIPE_API_KEY=
STRIPE_SECRET=

RAZORPAY_API_KEY=
RAZORPAY_SECRET=


After add all these paramters in the file. save and run.

2. RUN the command - > npm run dev (For Developers script.)

