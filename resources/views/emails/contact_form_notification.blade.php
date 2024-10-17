<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #333;
            font-weight: 700;
        }
        .content p {
            line-height: 1.6;
            margin: 10px 0;
            color: #555;
        }
        .content p strong {
            color: #333;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
        }
        .footer p {
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
            <p><strong>Name:</strong> {{ $contactForm['name'] }}</p>
            <p><strong>Email:</strong> {{ $contactForm['email'] }}</p>
            <p><strong>Phone:</strong> {{ $contactForm['country_code'] }} - {{ $contactForm['phone'] }}</p>
            <p><strong>Organization:</strong> {{ $contactForm['organization'] }}</p>
            <p><strong>Message:</strong> {{ $contactForm['message'] }}</p>
            <p><strong>File: </strong> {{ 'https://bl-india.com'.$contactForm['file_url'] }}</p>
        </div>
        <div class="footer">
            <p>Copyright &copy; 2024 Brand Liaison India Private Limited.</p>
        </div>
    </div>
</body>
</html>
