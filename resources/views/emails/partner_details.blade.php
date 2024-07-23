<!DOCTYPE html>
<html>
<head>
    <title>New Partner With Us Submission</title>
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
        <h1>New interest in partnering with us</h1>
        <p><span class="highlight">Name:</span> {{ $partnerWithUs['name'] }}</p>
        <p><span class="highlight">Email:</span> {{ $partnerWithUs['email'] }}</p>
        <p><span class="highlight">Country Code:</span> {{ $partnerWithUs['country_code'] }}</p>
        <p><span class="highlight">Phone:</span> {{ $partnerWithUs['phone'] }}</p>
        <p><span class="highlight">Partner Type:</span> {{ $partnerWithUs['partner_type'] }}</p>
        <p><span class="highlight">Entity Type:</span> {{ $partnerWithUs['entity_type'] }}</p>
        @if($partnerWithUs['organization'])
        <p><span class="highlight">Organization:</span> {{ $partnerWithUs['organization'] }}</p>
        @endif
        @if($partnerWithUs['designation'])
        <p><span class="highlight">Designation:</span> {{ $partnerWithUs['designation'] }}</p>
        @endif
        @if($partnerWithUs['field_of_expertise'])
        <p><span class="highlight">Field of Expertise:</span> {{ $partnerWithUs['field_of_expertise'] }}</p>
        @endif
        @if($partnerWithUs['year_of_experience'])
        <p><span class="highlight">Years of Experience:</span> {{ $partnerWithUs['year_of_experience'] }}</p>
        @endif
        <div class="footer">
            This email was sent automatically. Please do not reply.
        </div>
    </div>
</body>
</html>
