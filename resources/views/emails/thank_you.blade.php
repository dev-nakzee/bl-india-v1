<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Us</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header, .footer {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #0056b3;
        }
        .content p {
            line-height: 1.6;
        }
        .footer p {
            font-size: 0.9em;
            color: #777;
            margin: 0;
        }
        .footer a {
            color: #0056b3;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for contacting BL India</h1>
        </div>
        <div class="content">
            <p>Dear {{ $contactForm['name'] }},</p>
            <p>Thank you for reaching out to us. We have received your message and one of our representatives will get back to you shortly.</p>
            <p>We appreciate your interest and look forward to assisting you.</p>
            <p>Best regards,<br>Team BL-India</p>
        </div>
        <div class="footer">
            <p>Brand Liaison India Pvt. Ltd.</p>
            <p><a href="https://bl-india.com">www.bl-india.com</a></p>
        </div>
    </div>
</body>
</html>
