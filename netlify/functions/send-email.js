// ✅ Netlify Serverless Function — Universal Email Sender
// Handles sending emails through Brevo, Resend, or other APIs safely.

require('dotenv').config();
const fetch = require("node-fetch");

// ✅ Jules: As per your suggestion, I am embedding the templates directly into the function
// to create a self-contained and reliable solution, eliminating all file-path issues.
const templates = {
    'login-alert': `<!DOCTYPE html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Login Alert</title></head><html style="margin: 0; padding: 0; box-sizing: border-box;"><body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;"><h2 style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">Healing with Charlotte Casiraghi</h2><p style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">A Space to Heal</p></header><div class="parent" style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Hello <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">We noticed a new sign‑in to your Healing with Charlotte Casiraghi account on <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{date_time}}</b> from <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{location}}</b> using: <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{device}}</b>.</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Protecting your privacy and healing journey is our priority.</p><p class="up" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Was this you?</b></p><ul style="margin: 0; padding: 0; box-sizing: border-box;"><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Yes:</b> No action needed.</li><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">No:</b> Please reset your password immediately using our secure link and contact us at <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b></li></ul><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">If you’re travelling or using a new device, you might receive these alerts more often. They’re just a reminder that we’re keeping your account secure. Thank you for being part of this sacred space.</p><br style="margin: 0; padding: 0; box-sizing: border-box;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">With care,<br style="margin: 0; padding: 0; box-sizing: border-box;">Companion support</p><hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU: +33 7 45 62 46 34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716<br style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b></p></div><footer style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;"><h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3><h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Paris, France</h5><p class="contacts" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;"><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span></p></footer></body></html>`,

    'newsletter': `<!DOCTYPE html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Newsletter Subscription</title></head><html style="margin: 0; padding: 0; box-sizing: border-box;"><body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;"><h2 style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">Healing with Charlotte Casiraghi</h2><p style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">A Space to Heal</p></header><div class="parent" style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Hello <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Thank you for subscribing to our newsletter. At <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with Charlotte Casiraghi</b>, your privacy and trust mean everything. By subscribing, you’ll receive occasional audio messages, reflections, and special offers designed to inspire and guide you.</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">You can expect:</b></p><ul style="margin: 0; padding: 0; box-sizing: border-box;"><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Invitations to book new session types and community gatherings.</li><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Early access to limited‑edition books and healing tools.</li><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Stories and tips to help you navigate a world on edge and become a better version of yourself.</li></ul><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">If at any time you’d rather not receive our messages, just click “unsubscribe” at the bottom of any email. For questions, write to <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b></p><br style="margin: 0; padding: 0; box-sizing: border-box;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">With care,<br style="margin: 0; padding: 0; box-sizing: border-box;">Companion support</p><hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU: +33 7 45 62 46 34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716<br style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b></p></div><footer style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;"><h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3><h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Paris, France</h5><p class="contacts" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;"><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span></p></footer></body></html>`,

    'password-changed': `
    <!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
  <title>Password Change</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">

<body
  style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <header
    style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;">
    <h2
      style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">
      Healing with Charlotte Casiraghi</h2>
    <p
      style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">
      A Space to Heal</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Hello <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">This is a confirmation
      that your <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with
        Charlotte Casiraghi</b> password was successfully changed. If you initiated this change, no further action is
      necessary. Protecting your privacy and data is important to us, and we implement industry‑standard encryption to
      safeguard your account.</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Didn’t change your
        password?</b><br style="margin: 0; padding: 0; box-sizing: border-box;">Please reset it immediately using our
      secure link and notify us at <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b>
    </p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Thank you for continuing
      to entrust us with your healing. We’re honoured to walk alongside you.</p><br
      style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Warm regards,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">Companion support</p>
    <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU: +33 7 45 62 46
      34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716<br
        style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
    </p>
  </div>
  <footer
    style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;">
    <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Paris, France</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span
        style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>
</html>`,

    'verification': `<!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box; ">
<body
  style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <header
    style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;">
    <h2
      style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">
      Healing with Charlotte Casiraghi</h2>
    <p
      style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">
      A Space to Heal</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Hello <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Thank you for registering
      with <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with
        Charlotte Casiraghi</b>. Before we continue, please verify your email by entering the 6-digit code we’ve sent to
      you. <br style="margin: 0; padding: 0; box-sizing: border-box;">Protecting your privacy is important to us, and
      verifying your email helps keep your account secure.</p>
    <p class="bottom up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-block: 20px;">
      Your
      verification code: <strong style="margin: 0; padding: 0; box-sizing: border-box; font-size:x-large; margin-left:5px">{{otpCode}}</strong></p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">With care,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">Companion support</p>
    <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #ffeeec; margin-block: 5px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU: +33 7 45 62 46
      34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716<br
        style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
    </p>
  </div>

  <footer
    style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #ffeed8; padding-block: 40px; display: block;">
    <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Paris, France</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: inline-flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span
        style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>
</html>`,

    'waitlist': `<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">

  <title>Waitlist Subscription</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">

<body
  style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

  <header
    style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;">

    <h2
      style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">
      Healing with Charlotte Casiraghi</h2>
    <p
      style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">
      A Space to Heal</p>

  </header>

  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">

    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Dear <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Thank you for reaching
      out to join Charlotte’s private healing circle.
      We’ve received your request and added your name to the list for the next available session.</p>

    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">What happens next:</b>
    </p>
    <p style="margin-top: -4px;">
      You don’t need to do anything for now. When a space opens, you’ll receive a personal message with clear
      instructions on
      how to confirm your place.</p>

    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;">
      <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">While you wait, you’re
        welcome to:</b>
    </p>

    <ul style="margin: 0; padding: 0; box-sizing: border-box;">
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Read <i>Compagnon
          Féminin</i>, a gentle companion written to comfort and guide women in moments of reflection.</li>
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Explore Charlotte’s
        letters and messages shared on our private page for quiet inspiration.</li>
    </ul>

    <p style="margin-bottom: -15px; font-style:italic;">
      A few words from us
    </p>

    <p class="bottom">
      We know that reaching out for healing is an act of courage. Charlotte and her small team take the time to review
      each
      request personally, so every session remains intimate and meaningful.</p>

    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Your privacy, your story,
      and your peace of mind will always come first here.
    </p>
    <br style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">With warmth and care,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">Companion support <br />
      for Healing with Charlotte Casiraghi — A Space to Heal
    </p>
    <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
      📞 EU: +33 7 45 62 46 34<br style="margin: 0; padding: 0; box-sizing: border-box;">
      📞 US: +1 (302) 277-8716<br style="margin: 0; padding: 0; box-sizing: border-box;">
      ✉️ <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
    </p>
  </div>

  <footer
    style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;">
    <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Paris, France</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span>
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>
</html>`,

    'welcome': `
    <!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
  <title>Welcome Message</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">

<body
  style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <header
    style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;">
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">Welcome 🌸✨</h5>
    <h2
      style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">
      Healing with Charlotte Casiraghi</h2>
    <p
      style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">
      A Space to Heal</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Dear <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Welcome to <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with Charlotte
        Casiraghi</b>. I’m truly honoured you’ve chosen to begin this journey with me. Here, your story will
      be listened to with care and held in confidence. This is more than therapy; it’s a rare, personal connection.</p>
    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">What you can expect:</b>
    </p>
    <ul style="margin: 0; padding: 0; box-sizing: border-box;">
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Face‑to‑face
          connection.</b> We meet calmly and unhurried, virtually or in person, soul to soul.</li>
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Personal letters &
          follow‑ups.</b> After each session, I send you a private note and check in on how you’re feeling.</li>
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">An inner circle of
          support.</b> When helpful, I introduce you to trusted mentors and friends who can gently open new doors.</li>
    </ul>
    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Your next steps:</b></p>
    <ol style="margin: 0; padding: 0; box-sizing: border-box; gap:10px;">
      <li style="margin: 0; padding: 0px; padding-bottom:6px; box-sizing: border-box; width: 100%; margin-bottom: 0px;">
        <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Book your
          session:</b>
        Virtual, In-Person, or Community. Each option is tailored to your needs and includes thoughtful bonuses (<b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">€550</b> – <b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">€1,600</b>).
      </li>
      <a href="{{origin}}/html/main/Book.html" class="cta book"
        style="margin-top: 10px; padding:5px; padding-inline:20px; background:#8b5e5a; border-radius:15px; color:white; text-decoration:none; font-weight:bolder; ">Book
        Now</a>

      <li
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; padding-top: 20px; padding-bottom:5px;">
        <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Explore our book:</b>
        <i style="margin: 0; padding: 0; box-sizing: border-box;">Compagnon Féminin</i> is a quiet companion for every
        woman you’ve been and are becoming. Copies are limited; you may wish to
        reserve yours.been and will become. Copies are limited, so consider reserving yours today.
      </li>
      <a href="{{origin}}/html/main/Shop.html" class="cta book"
        style="margin-top: 10px; padding:5px; padding-inline:20px; background:#8b5e5a; border-radius:15px; color:white; text-decoration:none; font-weight:bolder; ">Reserve
        a copy</a>


      <li
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;  padding-top: 20px; padding-bottom:8px;">
        <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Visit the FAQs:</b>
        Simple answers about payments (credit/debit cards or a 16-digit Paysafecard), rescheduling (please allow 72
        hours), and
        confidentiality (all sessions are private).</li>

      <a href="{{origin}}/html/main/FAQ.html" class="cta book"
        style="margin-top: 10px; padding:5px; padding-inline:20px; background:#8b5e5a; border-radius:15px; color:white; text-decoration:none; font-weight:bolder; ">Read
        FAQs</a>

      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; padding-top: 20px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Stay connected:</b> As
        part of this community, you’ll receive occasional audio messages, reflections and special offers. You may opt
        out at any time.</li>
    </ol>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Your healing journey is
      sacred. If you need anything, please reply to this email or write to <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b>
    </p><br style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">With warmth and
      gratitude,<br style="margin: 0; padding: 0; box-sizing: border-box;">Charlotte Casiraghi</p>
    <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU: +33 7 45 62 46
      34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716<br
        style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
    </p>
  </div>
  <footer
    style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;">
    <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Paris, France</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span
        style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>

</html>`,
    
    'payment-approved': `<!DOCTYPE html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Payment Approved</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">
<body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; background:#ffeed8; text-align: center;">
        <h2 style="margin: 0; letter-spacing: 0.4px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Healing with Charlotte Casiraghi</h2>
        <p style="margin: 0; letter-spacing: 1px; font-weight: lighter;">A Space to Heal</p>
    </header>
    <div style="width: 95%; padding: 20px; margin-top: -10px; margin:auto; background: rgba(255, 255, 255, 0.787); border-radius: 25px;">
        <p>Hello <b>{{first_name}}</b>,</p>
        <p>Great news! Your payment for <b>{{purchase_type}}</b> has been approved. Below is a summary of your transaction:</p>
        <ul style="list-style: none; padding: 0;">
            <li><b>Transaction ID:</b> {{transaction_id}}</li>
            <li><b>Amount:</b> {{amount}}</li>
            <li><b>Payment Method:</b> {{payment_method}}</li>
        </ul>
        <p><b>For Sessions:</b> Your booking is now official. You’ll soon receive a separate email with your session date, time and personalized preparation details.</p>
        <p><b>For Book Purchases:</b> Your order has been confirmed. You purchased <i>Compagnon Féminin</i>, you’ll be able to read it directly on our website.</p>
        <p>You can view this and all of your past transactions by logging in and visiting the Payment History section under your profile.</p>
        <br>
        <p>With heartfelt thanks,<br>Companion support</p>
    </div>
</body>
</html>`,

    'payment-declined': `<!DOCTYPE html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Payment Declined</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">
<body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; background:#ffeed8; text-align: center;">
        <h2 style="margin: 0; letter-spacing: 0.4px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Healing with Charlotte Casiraghi</h2>
        <p style="margin: 0; letter-spacing: 1px; font-weight: lighter;">A Space to Heal</p>
    </header>
    <div style="width: 95%; padding: 20px; margin-top: -10px; margin:auto; background: rgba(255, 255, 255, 0.787); border-radius: 25px;">
        <p>Dear <b>{{first_name}}</b>,</p>
        <p>Unfortunately, we couldn’t process your recent payment for <b>{{purchase_type}}</b> (Transaction ID {{transaction_id}}). This could be due to an incorrect card number, insufficient funds, or a network issue.</p>
        <p><b>What you can do:</b></p>
        <ul style="padding-left: 20px;">
            <li>Double‑check that your card details and billing address are correct.</li>
            <li>Try another payment method.</li>
            <li>Contact your bank to ensure there are no restrictions on your card.</li>
        </ul>
        <p>If the problem persists, please reply to this email. We’re here to help.</p>
        <br>
        <p>Warm regards,<br>Companion support</p>
    </div>
</body>
</html>`,

    'payment-processing': `<!DOCTYPE html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>Payment Processing</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">

<body
    style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <header
        style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;">
        <h2
            style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">
            Healing with Charlotte Casiraghi</h2>
        <p
            style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">
            A Space to Heal</p>
    </header>
    <div class="parent"
        style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Dear <b
                style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,
        </p>
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Thank you for
            initiating your payment for <b>{{purchase_type}}</b>. We’ve received your payment details and our secure
            payment
            processor (powered by Stripe) is reviewing it. Your transaction ID is <b>{{transaction_id}}</b>.</p>
        <p class="up"
            style="margin: 0; padding: 0; box-sizing:border-box; width: 100%; margin-bottom: 5px; margin-top:10px;">
            <b>What happens
                next?</b></p>
        <ul style="margin: 0; padding: 0; box-sizing: border-box;">
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">We verify the
                payment to ensure everything is complete.</li>
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Once confirmed,
                you’ll receive a welcome message and personalized instructions on how to prepare for your session or
                access your book.</li>
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">If we need more
                information, we’ll contact you. In the meantime, feel free to review our FAQ about payment methods
                (credit/debit card or 16‑digit paysafecard) and rescheduling policies.</li>
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">You can track
                the status of your payment at any time by logging into your account and visiting your Payment History
                section under profile . Each transaction will display its current status and details.</li>
        </ul>
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">If you have any
            questions or need assistance while we review your payment, please reply to this email or write to
            healingwithcharlottecasiraghi@gmail.com.</p><br style="margin: 0; padding: 0; box-sizing: border-box;">
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">With gratitude,<br
                style="margin: 0; padding: 0; box-sizing: border-box;">Companion support</p>
        <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;">
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU: +33 7 45 62 46
            34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716<br
                style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b
                style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
        </p>
    </div>
    <footer
        style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;">
        <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
        <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Paris, France
        </h5>
        <p class="contacts"
            style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
            <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span
                style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span>
        </p>
    </footer>
</body>

</html>`,
    
  'admin-otp': `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Admin Login OTP</title>
    </head>
    <body style="font-family: sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">Admin Panel Access</h2>
            <p style="font-size: 16px; color: #555;">Here is your One-Time Password (OTP) to access the admin panel. This code will expire in 5 minutes.</p>
            <p style="font-size: 24px; font-weight: bold; color: #000; letter-spacing: 2px; margin: 20px 0; background-color: #f0f2f5; padding: 15px; border-radius: 5px;">{{otpCode}}</p>
            <p style="font-size: 14px; color: #777;">If you did not request this code, please ignore this email immediately.</p>
        </div>
    </body>
    </html>`
};

// Utility to inject {{placeholders}} inside email templates
function replacePlaceholders(template, variables) {
    let html = template;
    for (const [key, value] of Object.entries(variables)) {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    return html;
}

// ✅ Brevo email sender
async function sendWithBrevo(from, to, subject, html) {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: { name: "Healing with Charlotte Casiraghi", email: from },
                to: [{ email: to }],
                subject,
                htmlContent: html,
                replyTo: { email: "healingwithcharlottecasiraghi@gmail.com", name: "Support Team" },
            }),
        });

        const text = await response.text(); // safer than response.json()
        if (!response.ok) throw new Error(`Brevo error: ${text}`);
        return { success: true, message: "Email sent successfully via Brevo" };
    } catch (err) {
        console.error("Brevo Error:", err.message);
        return { success: false, message: err.message };
    }
}

// ✅ Main Netlify function
exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { to, templateName, variables } = JSON.parse(event.body);
        const from = "qaltech.company@gmail.com";

        if (!to || !templateName) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing parameters" }) };
        }

        const template = templates[templateName];
        if (!template) {
            return { statusCode: 404, body: JSON.stringify({ error: `Template '${templateName}' not found.` }) };
        }

        const html = replacePlaceholders(template, variables || {});

        const subjects = {
            verification: "Confirm your email to begin your healing journey",
            welcome: "Welcome to Healing with Charlotte Casiraghi",
            "login-alert": "New login to your account",
            "password-changed": "Your password has been updated",
            waitlist: "You’ve been added to the waitlist",
            newsletter: "Welcome to Charlotte’s circle of healing insights",
            "payment-approved": "Your payment is confirmed – {{purchase_type}} booked",
          "payment-declined": "Issue with your payment attempt",
          "payment-processing": "Your payment is being processed",
          'admin-otp': "Your Admin Panel OTP Code",
        };

        const subject = subjects[templateName] || "Update from Healing with Charlotte Casiraghi";

        // ✅ Send with Brevo
        const result = await sendWithBrevo(from, to, subject, html);

        return {
            statusCode: result.success ? 200 : 500,
            body: JSON.stringify({ success: result.success, message: result.message }),
        };
    } catch (err) {
        console.error("Send-email function error:", err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
