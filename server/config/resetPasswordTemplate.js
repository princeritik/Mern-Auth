export const RESET_PASSWORD_TEMPLATE = (otp) => `
<!DOCTYPE html>
<html>
<head>
<style>
body{
    font-family:Arial,sans-serif;
    background:#f4f4f4;
    padding:40px;
}
.container{
    max-width:600px;
    margin:auto;
    background:white;
    border-radius:10px;
    padding:30px;
    text-align:center;
}
.otp{
    font-size:36px;
    letter-spacing:8px;
    font-weight:bold;
    color:#4f46e5;
    margin:30px 0;
}
.footer{
    color:#777;
    font-size:14px;
}
</style>
</head>

<body>

<div class="container">

<h2>Password Reset</h2>

<p>We received a request to reset your password.</p>

<p>Use the OTP below:</p>

<div class="otp">${otp}</div>

<p>This OTP will expire in <b>15 minutes</b>.</p>

<p>If you didn't request this, simply ignore this email.</p>

<div class="footer">
Your App Team
</div>

</div>

</body>
</html>
`;