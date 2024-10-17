<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px 0;
            text-align: center;
        }
        .content h1 {
            color: #0d629a;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 30px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #0d629a;
            background-color: #f4f4f4;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
            font-size: 14px;
            color: #777777;
        }
        .footer a {
            color: #0d629a;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://ik.imagekit.io/iouishbjd/BL-Site/logo-500x125.jpg?updatedAt=1720777719860" alt="Company Logo">
        </div>
        <div class="content">
            <p>Dear {{ $name }},</p>
            <p>Please use the following One-Time Password (OTP) to complete your verification process:</p>
            <div class="otp">{{ $otp }}</div>
            <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
        </div>
        <div class="footer">
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Thank you,<br>Team BL India</p>
            <p><a href="https://bl-india.com/">Brand Liaison India Pvt Ltd</a></p>
        </div>
    </div>
</body>
</html>
