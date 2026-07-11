export const VERIFY_EMAIL_TEMPLATE = (otp) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Email Verification</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#f4f6fb;
    font-family:Arial,Helvetica,sans-serif;
}

.container{
    max-width:600px;
    margin:40px auto;
    background:white;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 5px 20px rgba(0,0,0,.08);
}

.header{
    background:linear-gradient(135deg,#6366F1,#8B5CF6);
    color:white;
    padding:35px;
    text-align:center;
}

.content{
    padding:40px;
    text-align:center;
}

.content h2{
    color:#222;
    margin-bottom:15px;
}

.content p{
    color:#666;
    line-height:1.7;
}

.otp{
    margin:35px auto;
    width:max-content;
    padding:18px 35px;
    background:#EEF2FF;
    color:#4F46E5;
    font-size:36px;
    font-weight:bold;
    letter-spacing:8px;
    border-radius:10px;
}

.note{
    color:#888;
    font-size:14px;
    margin-top:20px;
}

.footer{
    background:#F8F9FA;
    text-align:center;
    padding:20px;
    color:#999;
    font-size:13px;
}
</style>

</head>

<body>

<div class="container">

    <div class="header">
        <h1>Verify Your Email</h1>
    </div>

    <div class="content">

        <h2>Welcome 👋</h2>

        <p>
            Thank you for creating your account.
            Please use the OTP below to verify your email address.
        </p>

        <div class="otp">${otp}</div>

        <p>
            This OTP is valid for
            <strong>15 minutes</strong>.
        </p>

        <p class="note">
            If you didn't create this account, you can safely ignore this email.
        </p>

    </div>

    <div class="footer">
        © 2026 Your App Name • Secure Email Verification
    </div>

</div>

</body>
</html>
`;


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