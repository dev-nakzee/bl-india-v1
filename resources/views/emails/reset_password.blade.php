<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Password Notification</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            font-weight: 500;
            color: #333333;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
        }
        .content p {
            margin-bottom: 20px;
        }
        .content a {
            display: inline-block;
            padding: 10px 20px;
            font-weight: 700;
            text-decoration: none;
            background-color: #0d6efd;
            color: #ffffff;
            border-radius: 4px;
        }
        .copy-link-container {
            text-align: center;
            margin-top: 20px;
        }
        .copy-link-button {
            padding: 10px 20px;
            font-weight: 700;
            text-decoration: none;
            background-color: #28a745;
            color: #ffffff;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #777777;
        }
        .link-text {
            word-wrap: break-word;
            color: #333;
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Dear {{ $name }},</p>
            <p>We received a request to reset your password. Click the link below to reset your password:</p>
            <p><a href="{{ $url }}">Reset Password</a></p>
            <p>If you did not request a password reset, no further action is required.</p>
            <p>Thank you!</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
