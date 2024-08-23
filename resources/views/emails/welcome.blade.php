<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Our Service</title>
</head>
<body>
    <h1>Hello, {{ $client->name }}!</h1>
    <p>Welcome to our BL-India. Here are your login details:</p>
    <p>Email: {{ $client->email }}</p>
    <p>Password: {{ $password }}</p>
    <p>Please change your password upon your first login.</p>
</body>
</html>
