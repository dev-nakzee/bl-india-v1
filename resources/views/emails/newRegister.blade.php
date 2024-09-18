<!DOCTYPE html>
<html>
<head>
    <title>New Registration</title>
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
        <h1>New registration with BL</h1>
        <p><span class="highlight">Name:</span> {{ $client['name'] }}</p>
        <p><span class="highlight">Email:</span> {{ $client['email'] }}</p>
        <p><span class="highlight">Country Code:</span> {{ $client['country_code'] }}</p>
        <p><span class="highlight">Phone:</span> {{ $client['phone'] }}</p>
        <div class="footer">
            This email was sent automatically. Please do not reply.
        </div>
    </div>
</body>
</html>
