<!-- resources/views/emails/reset_password.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Reset Password Notification</title>
</head>
<body>
    <p>Dear {{ $name }},</p>
    <p>We received a request to reset your password. Click the link below to reset your password:</p>
    <p><a href="{{ $url }}">Reset Password</a></p>
    <p>If you did not request a password reset, no further action is required.</p>
    <p>Thank you!</p>
</body>
</html>
