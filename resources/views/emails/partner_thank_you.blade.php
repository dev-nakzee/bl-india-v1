<!DOCTYPE html>
<html>
<head>
    <title>Thank You for Partnering With Us</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f7f7f7;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 24px;
            color: #0056b3;
            margin-bottom: 20px;
            text-align: center;
        }
        p {
            margin: 10px 0;
        }
        .signature {
            margin-top: 20px;
        }
        .highlight {
            color: #0056b3;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank You for Partnering With Us</h1>
        <p>Dear <span class="highlight">{{ $partnerWithUs['name'] }}</span>,</p>
        <p>Thank you for expressing your interest in partnering with us. We have received your submission and will review it shortly. Our team will get back to you with further details and the next steps.</p>
        <p>Best regards,</p>
        <p class="signature">Team BL-India</p>
        <div class="footer">
            This email was sent automatically. Please do not reply.
        </div>
    </div>
</body>
</html>
