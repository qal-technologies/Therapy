const templates = {
    en: {
        subjects: {
            verification: "Confirm your email to begin your healing journey",
            welcome: "Welcome to Healing with Charlotte Casiraghi",
            "login-alert": "New login to your account",
            "password-changed": "Your password has been updated",
            waitlist: "You’ve been added to the waitlist",
            newsletter: "Welcome to Charlotte’s circle of healing insights",
            "payment-approved": "Your payment is confirmed – {{purchase_type}} booked",
            "payment-declined": "Issue with your payment attempt",
            "payment-processing": "Your payment is being processed",
            "admin-otp": "Your Admin Panel OTP Code",
            'waitlist-spot': "A spot is available – claim your Inner Circle Experience",
        },
        templates: {
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
    </html>`,
            'waitlist-spot': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>A spot is available – claim your Inner Circle Experience</title></head><body style="font-family: sans-serif; line-height: 1.6;"><p>Hello {{first_name}},</p><p>We have wonderful news! A spot in the Inner Circle Experience has opened up. This programme includes a private extended session, signed personal letter, custom healing plan, soul‑to‑soul ritual and curated gifts. The investment is €6,850 and it comes with ongoing private check‑ins for two weeks.</p><p><strong>What to do next:</strong></p><ol><li>Click the link below to confirm your spot and complete payment.</li><li>If you’re unable to take the spot at this time, reply to let us know so we can offer it to the next person.</li></ol><p><a href="#">Claim My Spot</a></p><p>Spots are offered on a first‑come, first‑served basis. We look forward to welcoming you into this sanctuary.</p><p>Warmly,<br>Companion support</p></body></html>`,
        }
    },
    fr: {
        subjects: {
            verification: "Confirmez votre e-mail pour commencer votre parcours de guérison",
            welcome: "Bienvenue chez Healing with Charlotte Casiraghi",
            "login-alert": "Nouvelle connexion à votre compte",
            "password-changed": "Votre mot de passe a été mis à jour",
            waitlist: "Vous avez été ajouté à la liste d'attente",
            newsletter: "Bienvenue dans le cercle d'aperçus de guérison de Charlotte",
            "payment-approved": "Votre paiement est confirmé – {{purchase_type}} réservé",
            "payment-declined": "Problème avec votre tentative de paiement",
            "payment-processing": "Votre paiement est en cours de traitement",
            "admin-otp": "Votre code OTP pour le panneau d'administration",
            'waitlist-spot': "Une place est disponible – réclamez votre Expérience du Cercle Intérieur",
        },
        templates: {
            'login-alert': `
            <!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
  <title>Alerte de connexion</title>
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
      Un espace pour guérir</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Bonjour <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Nous avons remarqué une
      nouvelle connexion à votre compte Healing with Charlotte Casiraghi le <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{date_time}}</b> depuis
      <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{location}}</b> en
      utilisant : <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{device}}</b>.
    </p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">La protection de votre
      vie privée et de votre parcours de guérison est notre priorité.</p>
    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Était-ce vous ?</b></p>
    <ul style="margin: 0; padding: 0; box-sizing: border-box;">
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Oui :</b> Aucune
        action n'est nécessaire.</li>
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Non :</b> Veuillez
        réinitialiser votre mot de passe immédiatement en utilisant notre lien sécurisé et contactez-nous à <b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b>
      </li>
    </ul>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Si vous voyagez ou
      utilisez un nouvel appareil, vous pourriez recevoir ces alertes plus souvent. Elles sont juste un rappel que nous
      gardons votre compte en sécurité. Merci de faire partie de cet espace sacré.</p><br
      style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Avec soin,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">Le support Companion</p>
    <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU : +33 7 45 62 46
      34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US : +1 (302) 277-8716<br
        style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
    </p>
  </div>
  <footer
    style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;">
    <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysées, 75008 Paris, France</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU : +33 7 45 62 46 34</span><span
        style="margin: 0; padding: 0; box-sizing: border-box;">📞 US : +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>

</html>`,
            'newsletter': `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>Bienvenue dans le cercle d'aperçus de guérison de Charlotte</title>
    </head>
    
    <body style="font-family: sans-serif; line-height: 1.6; margin: 0; padding: 0; box-sizing: border-box; width: 100%; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <header style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333; margin: 0;">Bienvenue dans le cercle d'aperçus de guérison de Charlotte</h1>
            <p style="color: #777; margin: 0;">Un espace pour guérir</p>
        </header>
        <p>Chère {{first_name}},</p>
        <p>Nous sommes ravis de vous accueillir dans notre cercle d'aperçus de guérison. En tant que membre précieux de cette communauté, vous recevrez des réflexions inspirantes, des méditations guidées et des offres exclusives pour soutenir votre parcours de guérison.</p>
        <p>Voici ce à quoi vous pouvez vous attendre :</p>
        <ul>
            <li style="margin-bottom: 10px;">   <b>Réflexions mensuelles :</b> Des messages personnels de Charlotte pour nourrir votre esprit et votre âme.</li>
            <li style="margin-bottom: 10px;">   <b>Méditations guidées :</b> Des pratiques apaisantes pour vous aider à vous recentrer et à vous reconnecter.</li>
            <li style="margin-bottom: 10px;">   <b>Offres exclusives :</b> Accès anticipé à nos sessions de guérison, ateliers et contenus spéciaux.</li>
            </ul>
            <p>Nous sommes honorés de faire partie de votre voyage de guérison. Si vous avez des questions ou des suggestions, n'hésitez pas à répondre à cet e-mail.</p>
            <br>
            <p>Avec chaleur et gratitude,<br>Le support Companion</p>
    </div>
    </body>
    </html>
        `,
            'password-changed': `
<!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
  <title>Changement de Mot de Passe</title>
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
      Un Espace pour Guérir</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Bonjour <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Ceci est une
      confirmation que le mot de passe de votre compte <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with
        Charlotte Casiraghi</b> a été modifié avec succès. Si vous êtes à l’origine de ce changement, aucune action
      supplémentaire n’est requise. La protection de votre vie privée et de vos données est importante pour nous, et nous
      utilisons des systèmes de chiffrement conformes aux normes de l’industrie afin de sécuriser votre compte.</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Vous n’êtes pas à
        l’origine de ce changement&nbsp;?</b><br style="margin: 0; padding: 0; box-sizing: border-box;">Veuillez
      réinitialiser votre mot de passe immédiatement à l’aide de notre lien sécurisé et nous en informer à l’adresse <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>.
    </p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Merci de continuer à
      nous faire confiance dans votre cheminement vers la guérison. Nous sommes honorés de vous accompagner.</p><br
      style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Cordialement,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">Support Companion</p>
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
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Élysées, 75008 Paris, France</h5>
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
  <title>Vérification de l'adresse e-mail</title>
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
      Un espace pour guérir</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Bonjour <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Merci de vous être inscrit(e)
      à <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with
        Charlotte Casiraghi</b>. Avant de continuer, veuillez vérifier votre adresse e-mail en saisissant le code
      de 6 chiffres que nous vous avons envoyé. <br style="margin: 0; padding: 0; box-sizing: border-box;">Votre sécurité est essentielle pour nous, et la vérification de votre e-mail contribue à protéger votre compte.</p>
    <p class="bottom up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-block: 20px;">
      Votre code de vérification : <strong style="margin: 0; padding: 0; box-sizing: border-box; font-size:x-large; margin-left:5px">{{otpCode}}</strong></p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Avec bienveillance,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">Support Compagnon</p>
    <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #ffeeec; margin-block: 5px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU : +33 7 45 62 46
      34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US : +1 (302) 277-8716<br
        style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
    </p>
  </div>

  <footer
    style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #ffeed8; padding-block: 40px; display: block;">
    <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Élysées, 75008 Paris, France</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: inline-flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU : +33 7 45 62 46 34</span><span
        style="margin: 0; padding: 0; box-sizing: border-box;">📞 US : +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>
</html>`,
            'waitlist': `<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">

  <title>Inscription sur Liste d’Attente</title>
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
      Un espace pour guérir</p>

  </header>

  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">

    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Cher/Chère <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Merci d’avoir souhaité rejoindre le cercle de guérison privé de Charlotte.
      Nous avons bien reçu votre demande et ajouté votre nom à la liste pour la prochaine session disponible.</p>

    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Ce qui se passera ensuite :</b>
    </p>
    <p style="margin-top: -4px;">
      Vous n’avez rien à faire pour le moment. Lorsqu’une place se libérera, vous recevrez un message personnel avec des instructions claires pour confirmer votre participation.</p>

    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;">
      <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">En attendant, vous pouvez :</b>
    </p>

    <ul style="margin: 0; padding: 0; box-sizing: border-box;">
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Lire <i>Compagnon Féminin</i>, un doux compagnon écrit pour réconforter et guider les femmes dans les moments de réflexion.</li>
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Explorer les lettres et messages de Charlotte partagés sur notre page privée pour une inspiration paisible.</li>
    </ul>

    <p style="margin-bottom: -15px; font-style:italic;">
      Quelques mots de notre part
    </p>

    <p class="bottom">
      Nous savons que demander de l’aide est un acte de courage. Charlotte et sa petite équipe prennent le temps d’examiner chaque demande personnellement, afin que chaque session reste intime et pleine de sens.</p>

    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Votre intimité, votre histoire et votre tranquillité d’esprit resteront toujours prioritaires ici.</p>

    <br style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Avec chaleur et bienveillance,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">L’équipe de soutien <br />
      pour Healing with Charlotte Casiraghi — Un espace pour guérir
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
  <title>Message de bienvenue</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">

<body
  style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <header
    style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;">
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">Bienvenue 🌸✨</h5>
    <h2
      style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">
      Healing with Charlotte Casiraghi</h2>
    <p
      style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">
      Un espace pour guérir</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Chèr(e) <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Bienvenue dans <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with Charlotte
        Casiraghi</b>. Je suis vraiment honorée que vous ayez choisi de commencer ce chemin avec moi. Ici, votre histoire
      sera écoutée avec soin et gardée dans la plus grande confidentialité. Ce n’est pas qu’une thérapie ; c’est un lien
      profond et personnel.</p>
    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Ce que vous pouvez attendre :</b>
    </p>
    <ul style="margin: 0; padding: 0; box-sizing: border-box;">
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Une connexion en tête-à-tête.</b> Nous nous rencontrons calmement et sans précipitation, virtuellement ou en personne, d’âme à âme.</li>
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Des lettres personnelles & suivis.</b> Après chaque séance, je vous envoie une note privée et je prends de vos nouvelles.</li>
      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Un cercle de soutien.</b> Quand cela est utile, je vous présente des mentors et amis de confiance pour ouvrir de nouvelles portes avec douceur.</li>
    </ul>
    <p class="up"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Vos prochaines étapes :</b></p>
    <ol style="margin: 0; padding: 0; box-sizing: border-box; gap:10px;">
      <li style="margin: 0; padding: 0px; padding-bottom:6px; box-sizing: border-box; width: 100%; margin-bottom: 0px;">
        <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Réserver votre séance :</b>
        Virtuelle, en personne, ou en communauté. Chaque option est adaptée à vos besoins et comprend des avantages attentionnés (<b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">550€</b> – <b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">1 600€</b>).
      </li>
      <a href="{{origin}}/html/main/Book.html" class="cta book"
        style="margin-top: 10px; padding:5px; padding-inline:20px; background:#8b5e5a; border-radius:15px; color:white; text-decoration:none; font-weight:bolder; ">Réserver
        maintenant</a>

      <li
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; padding-top: 20px; padding-bottom:5px;">
        <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Découvrir notre livre :</b>
        <i style="margin: 0; padding: 0; box-sizing: border-box;">Compagnon Féminin</i> vous accompagne dans chaque femme que vous avez été et devenez aujourd’hui. Les exemplaires sont limités — vous pouvez réserver le vôtre.
      </li>
      <a href="{{origin}}/html/main/Shop.html" class="cta book"
        style="margin-top: 10px; padding:5px; padding-inline:20px; background:#8b5e5a; border-radius:15px; color:white; text-decoration:none; font-weight:bolder; ">Réserver un exemplaire</a>


      <li
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;  padding-top: 20px; padding-bottom:8px;">
        <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Visiter la FAQ :</b>
        Réponses simples sur les paiements (cartes bancaires ou Paysafecard à 16 chiffres), la reprogrammation (préavis 72h), et la confidentialité (séances strictement privées).</li>

      <a href="{{origin}}/html/main/FAQ.html" class="cta book"
        style="margin-top: 10px; padding:5px; padding-inline:20px; background:#8b5e5a; border-radius:15px; color:white; text-decoration:none; font-weight:bolder; ">Lire la FAQ</a>

      <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; padding-top: 20px;"><b
          style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Restez connectée :</b> Vous recevrez parfois des messages audio, des réflexions, et des offres spéciales. Vous pouvez vous désinscrire à tout moment.</li>
    </ol>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Votre parcours de guérison est précieux. Pour toute demande, répondez simplement à cet e-mail ou écrivez à <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b>
    </p><br style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Avec chaleur et gratitude,<br style="margin: 0; padding: 0; box-sizing: border-box;">Charlotte Casiraghi</p>
    <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU : +33 7 45 62 46
      34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US : +1 (302) 277-8716<br
        style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>
    </p>
  </div>
  <footer
    style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;">
    <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Élysées, 75008 Paris, France</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU : +33 7 45 62 46 34</span><span
        style="margin: 0; padding: 0; box-sizing: border-box;">📞 US : +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>

</html>`,
            'payment-approved': `<!DOCTYPE html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Paiement approuvé</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">
<body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; background:#ffeed8; text-align: center;">
        <h2 style="margin: 0; letter-spacing: 0.4px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Healing with Charlotte Casiraghi</h2>
        <p style="margin: 0; letter-spacing: 1px; font-weight: lighter;">Un espace pour guérir</p>
    </header>
    <div style="width: 95%; padding: 20px; margin-top: -10px; margin:auto; background: rgba(255, 255, 255, 0.787); border-radius: 25px;">
        <p>Bonjour <b>{{first_name}}</b>,</p>
        <p>Bonne nouvelle ! Votre paiement pour <b>{{purchase_type}}</b> a été approuvé. Voici un résumé de votre transaction :</p>
        <ul style="list-style: none; padding: 0;">
            <li><b>ID de transaction :</b> {{transaction_id}}</li>
            <li><b>Montant :</b> {{amount}}</li>
            <li><b>Méthode de paiement :</b> {{payment_method}}</li>
        </ul>
        <p><b>Pour les sessions :</b> Votre réservation est maintenant officielle. Vous recevrez bientôt un e-mail séparé avec la date et l'heure de votre session ainsi que des détails personnalisés de préparation.</p>
        <p><b>Pour les achats de livres :</b> Votre commande a été confirmée. Vous avez acheté <i>Compagnon Féminin</i>, vous pourrez le lire directement sur notre site web.</p>
        <p>Vous pouvez consulter cette transaction et toutes vos transactions passées en vous connectant et en visitant la section Historique des paiements sous votre profil.</p>
        <br>
        <p>Avec nos sincères remerciements,<br>Support Companion</p>
    </div>
</body>
</html>`,
            'payment-declined': `<!DOCTYPE html>    
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Paiement refusé</title>
</head>
<html style="margin: 0; padding: 0; box-sizing: border-box;">
<body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; background:#ffeed8; text-align: center;">
        <h2 style="margin: 0; letter-spacing: 0.4px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Healing with Charlotte Casiraghi</h2>
        <p style="margin: 0; letter-spacing: 1px; font-weight: lighter;">Un espace pour guérir</p>
    </header>
    <div style="width: 95%; padding: 20px; margin-top: -10px; margin:auto; background: rgba(255, 255, 255, 0.787); border-radius: 25px;">
        <p>Cher/Chère <b>{{first_name}}</b>,</p>
        <p>Malheureusement, nous n'avons pas pu traiter votre récent paiement pour <b>{{purchase_type}}</b> (ID de transaction {{transaction_id}}). Cela peut être dû à un numéro de carte incorrect, des fonds insuffisants ou un problème de réseau.</p>
        <p><b>Ce que vous pouvez faire :</b></p>
        <ul style="padding-left: 20px;">
            <li>Vérifiez que les détails de votre carte et votre adresse de facturation sont corrects.</li>
            <li>Essayez une autre méthode de paiement.</li>
            <li>Contactez votre banque pour vous assurer qu'il n'y a pas de restrictions sur votre carte.</li>
        </ul>
        <p>Si le problème persiste, veuillez répondre à cet e-mail. Nous sommes là pour vous aider.</p>
        <br>
        <p>Cordialement,<br>Support Companion</p>
    </div>
</body>
</html>`,
            'payment-processing': `<!DOCTYPE html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>Traitement du Paiement</title>
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
            Un espace pour guérir</p>
    </header>
    <div class="parent"
        style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Cher/Chère <b
                style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,
        </p>
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
            Merci d’avoir initié votre paiement pour <b>{{purchase_type}}</b>. Nous avons bien reçu vos informations, et notre processeur de paiement sécurisé (propulsé par Stripe) est en train de les vérifier. 
            Votre identifiant de transaction est <b>{{transaction_id}}</b>.
        </p>
        <p class="up"
            style="margin: 0; padding: 0; box-sizing:border-box; width: 100%; margin-bottom: 5px; margin-top:10px;">
            <b>Et maintenant ?</b>
        </p>
        <ul style="margin: 0; padding: 0; box-sizing: border-box;">
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
                Nous vérifions que le paiement soit complet et validé.
            </li>
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
                Une fois confirmé, vous recevrez un message de bienvenue ainsi que des instructions personnalisées pour préparer votre séance ou accéder à votre livre.
            </li>
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
                Si nous avons besoin d’informations supplémentaires, nous vous contacterons. En attendant, vous pouvez consulter notre FAQ concernant les méthodes de paiement 
                (carte bancaire ou Paysafecard 16 chiffres) et notre politique de reprogrammation.
            </li>
            <li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
                Vous pouvez suivre le statut de votre paiement à tout moment en vous connectant à votre compte et en consultant l’historique des paiements dans votre profil.
            </li>
        </ul>
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
            Si vous avez des questions ou avez besoin d’assistance pendant le traitement de votre paiement, veuillez répondre à cet e-mail ou écrire à 
            <b>healingwithcharlottecasiraghi@gmail.com</b>.
        </p><br>
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
            Avec gratitude,<br>Companion Support
        </p>
        <hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;">
        <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">
            📞 Europe : +33 7 45 62 46 34<br>
            📞 États-Unis : +1 (302) 277-8716<br>
            ✉️ <b>healingwithcharlottecasiraghi@gmail.com</b>
        </p>
    </div>
    <footer
        style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;">
        <h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3>
        <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Élysées, 75008 Paris, France</h5>
        <p class="contacts"
            style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
            <span>📞 Europe : +33 7 45 62 46 34</span>
            <span>📞 États-Unis : +1 (302) 277-8716</span>
        </p>
    </footer>
</body>
</html>`,
            'admin-otp': `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>OTP de Connexion Admin</title>
</head>
<body style="font-family: sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Accès au Panneau d’Administration</h2>
        <p style="font-size: 16px; color: #555;">Voici votre mot de passe à usage unique (OTP) pour accéder au panneau d’administration. Ce code expirera dans 5 minutes.</p>
        <p style="font-size: 24px; font-weight: bold; color: #000; letter-spacing: 2px; margin: 20px 0; background-color: #f0f2f5; padding: 15px; border-radius: 5px;">{{otpCode}}</p>
        <p style="font-size: 14px; color: #777;">Si vous n’avez pas demandé ce code, veuillez ignorer cet email immédiatement.</p>
    </div>
</body>
</html>`,
            'waitlist-spot': `<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Une place est disponible – rejoignez l’Inner Circle Experience</title>
</head>

<body style="font-family: sans-serif; line-height: 1.6;">
    <p>Bonjour {{first_name}},</p>
    <p>Nous avons une merveilleuse nouvelle ! Une place s’est libérée pour l’Inner Circle Experience. 
       Ce programme comprend une séance privée prolongée, une lettre personnelle signée, un plan de guérison 
       personnalisé, un rituel âme-à-âme et des cadeaux soigneusement sélectionnés. 
       L’investissement est de 6 850 €, incluant deux semaines de suivi privé continu.</p>
    <p><strong>Ce qu’il faut faire maintenant :</strong></p>
    <ol>
        <li>Cliquez sur le lien ci-dessous pour confirmer votre place et finaliser le paiement.</li>
        <li>Si vous ne pouvez pas prendre cette place pour le moment, veuillez nous le faire savoir afin que 
            nous puissions l’offrir à la prochaine personne sur la liste.</li>
    </ol>
    <p><a href="#">Réserver ma place</a></p>
    <p>Les places sont attribuées selon le principe du premier arrivé, premier servi. 
       Nous serions honorés de vous accueillir dans ce sanctuaire.</p>
    <p>Chaleureusement,<br>Companion support</p>
</body>

</html>`,

        }
    },
    es: {
        subjects: {
            verification: "Confirma tu correo electrónico para comenzar tu viaje de sanación",
            welcome: "Bienvenido a Healing with Charlotte Casiraghi",
            "login-alert": "Nuevo inicio de sesión en tu cuenta",
            "password-changed": "Tu contraseña ha sido actualizada",
            waitlist: "Has sido añadido a la lista de espera",
            newsletter: "Bienvenido al círculo de ideas de sanación de Charlotte",
            "payment-approved": "Tu pago está confirmado – {{purchase_type}} reservado",
            "payment-declined": "Problema con tu intento de pago",
            "payment-processing": "Tu pago está siendo procesado",
            "admin-otp": "Tu código OTP para el panel de administración",
            'waitlist-spot': "Hay un lugar disponible – reclama tu Experiencia del Círculo Íntimo",
        },
        templates: {
            'login-alert': `<!DOCTYPE html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Alerta de inicio de sesión</title></head><html style="margin: 0; padding: 0; box-sizing: border-box;"><body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;"><h2 style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">Healing with Charlotte Casiraghi</h2><p style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">Un espacio para sanar</p></header><div class="parent" style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Hola <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Notamos un nuevo inicio de sesión en tu cuenta de Healing with Charlotte Casiraghi el <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{date_time}}</b> desde <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{location}}</b> usando: <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{device}}</b>.</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Proteger tu privacidad y tu viaje de sanación es nuestra prioridad.</p><p class="up" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">¿Fuiste tú?</b></p><ul style="margin: 0; padding: 0; box-sizing: border-box;"><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Sí:</b> No se necesita ninguna acción.</li><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">No:</b> Por favor, restablece tu contraseña inmediatamente usando nuestro enlace seguro y contáctanos en <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b></li></ul><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Si estás de viaje o usando un nuevo dispositivo, podrías recibir estas alertas más a menudo. Son solo un recordatorio de que mantenemos tu cuenta segura. Gracias por ser parte de este espacio sagrado.</p><br style="margin: 0; padding: 0; box-sizing: border-box;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Con cuidado,<br style="margin: 0; padding: 0; box-sizing: border-box;">Soporte Companion</p><hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 UE: +33 7 45 62 46 34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 EE. UU.: +1 (302) 277-8716<br style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b></p></div><footer style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;"><h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3><h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysées, 75008 París, Francia</h5><p class="contacts" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;"><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 UE: +33 7 45 62 46 34</span><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EE. UU.: +1 (302) 277-8716 </span></p></footer></body></html>`,
        }
    },
    it: {
        subjects: {
            verification: "Conferma la tua email per iniziare il tuo percorso di guarigione",
            welcome: "Benvenuto in Healing with Charlotte Casiraghi",
            "login-alert": "Nuovo accesso al tuo account",
            "password-changed": "La tua password è stata aggiornata",
            waitlist: "Sei stato aggiunto alla lista d'attesa",
            newsletter: "Benvenuto nel cerchio di intuizioni di guarigione di Charlotte",
            "payment-approved": "Il tuo pagamento è confermato – {{purchase_type}} prenotato",
            "payment-declined": "Problema con il tuo tentativo di pagamento",
            "payment-processing": "Il tuo pagamento è in fase di elaborazione",
            "admin-otp": "Il tuo codice OTP per il pannello di amministrazione",
            'waitlist-spot': "È disponibile un posto – richiedi la tua Esperienza del Cerchio Interno",
        },
        templates: {
            'login-alert': `<!DOCTYPE html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Avviso di accesso</title></head><html style="margin: 0; padding: 0; box-sizing: border-box;"><body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;"><h2 style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">Healing with Charlotte Casiraghi</h2><p style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">Uno spazio per guarire</p></header><div class="parent" style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Ciao <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Abbiamo notato un nuovo accesso al tuo account Healing with Charlotte Casiraghi il <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{date_time}}</b> da <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{location}}</b> utilizzando: <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{device}}</b>.</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Proteggere la tua privacy e il tuo percorso di guarigione è la nostra priorità.</p><p class="up" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Eri tu?</b></p><ul style="margin: 0; padding: 0; box-sizing: border-box;"><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Sì:</b> Nessuna azione richiesta.</li><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">No:</b> Reimposta immediatamente la tua password utilizzando il nostro link sicuro e contattaci a <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b></li></ul><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Se sei in viaggio o utilizzi un nuovo dispositivo, potresti ricevere questi avvisi più spesso. Sono solo un promemoria che stiamo mantenendo il tuo account sicuro. Grazie per far parte di questo spazio sacro.</p><br style="margin: 0; padding: 0; box-sizing: border-box;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Con cura,<br style="margin: 0; padding: 0; box-sizing: border-box;">Supporto Companion</p><hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 UE: +33 7 45 62 46 34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 USA: +1 (302) 277-8716<br style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b></p></div><footer style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;"><h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3><h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysées, 75008 Parigi, Francia</h5><p class="contacts" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;"><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 UE: +33 7 45 62 46 34</span><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 USA: +1 (302) 277-8716 </span></p></footer></body></html>`,
            
            'password-changed': `
<!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
  <title>Cambio Password</title>
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
      Uno Spazio per Guarire</p>
  </header>
  <div class="parent"
    style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Ciao <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Questa è una
      conferma che la password del tuo account <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Healing with
        Charlotte Casiraghi</b> è stata modificata con successo. Se hai effettuato tu stesso questo cambiamento, non è
      richiesta alcuna ulteriore azione. Proteggere la tua privacy e i tuoi dati è importante per noi e utilizziamo
      sistemi di crittografia standard del settore per proteggere il tuo account.</p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Non hai cambiato tu la
        password?</b><br style="margin: 0; padding: 0; box-sizing: border-box;">Reimpostala immediatamente utilizzando il
      nostro link sicuro e informaci all’indirizzo <b
        style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b>.
    </p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Grazie per continuare
      a riporre la tua fiducia in noi nel tuo percorso di guarigione. Siamo onorati di camminare al tuo fianco.</p><br
      style="margin: 0; padding: 0; box-sizing: border-box;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Cordiali saluti,<br
        style="margin: 0; padding: 0; box-sizing: border-box;">Supporto Companion</p>
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
    <h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysees, 75008 Parigi, Francia</h5>
    <p class="contacts"
      style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;">
      <span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span
        style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span>
    </p>
  </footer>
</body>
</html>`,

            
        }
    },
    de: {
        subjects: {
            verification: "Bestätigen Sie Ihre E-Mail, um Ihre Heilungsreise zu beginnen",
            welcome: "Willkommen bei Healing with Charlotte Casiraghi",
            "login-alert": "Neuer Login in Ihrem Konto",
            "password-changed": "Ihr Passwort wurde aktualisiert",
            waitlist: "Sie wurden zur Warteliste hinzugefügt",
            newsletter: "Willkommen in Charlottes Kreis der Heilungseinblicke",
            "payment-approved": "Ihre Zahlung ist bestätigt – {{purchase_type}} gebucht",
            "payment-declined": "Problem bei Ihrem Zahlungsversuch",
            "payment-processing": "Ihre Zahlung wird bearbeitet",
            "admin-otp": "Ihr OTP-Code für das Admin-Panel",
            'waitlist-spot': "Ein Platz ist verfügbar – sichern Sie sich Ihr Inner Circle Erlebnis",
        },
        templates: {
            'login-alert': `<!DOCTYPE html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Anmelde-Benachrichtigung</title></head><html style="margin: 0; padding: 0; box-sizing: border-box;"><body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;"><h2 style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">Healing with Charlotte Casiraghi</h2><p style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">Ein Raum zum Heilen</p></header><div class="parent" style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Hallo <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Wir haben eine neue Anmeldung in Ihrem Healing with Charlotte Casiraghi-Konto am <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{date_time}}</b> von <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{location}}</b> mit: <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{device}}</b> bemerkt.</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Der Schutz Ihrer Privatsphäre und Ihrer Heilungsreise ist unsere Priorität.</p><p class="up" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Waren Sie das?</b></p><ul style="margin: 0; padding: 0; box-sizing: border-box;"><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Ja:</b> Keine Aktion erforderlich.</li><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Nein:</b> Bitte setzen Sie Ihr Passwort sofort über unseren sicheren Link zurück und kontaktieren Sie uns unter <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b></li></ul><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Wenn Sie auf Reisen sind oder ein neues Gerät verwenden, erhalten Sie diese Benachrichtigungen möglicherweise häufiger. Sie sind nur eine Erinnerung daran, dass wir Ihr Konto sicher halten. Vielen Dank, dass Sie Teil dieses heiligen Raumes sind.</p><br style="margin: 0; padding: 0; box-sizing: border-box;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Mit Sorgfalt,<br style="margin: 0; padding: 0; box-sizing: border-box;">Companion Support</p><hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 EU: +33 7 45 62 46 34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716<br style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b></p></div><footer style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;"><h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3><h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysées, 75008 Paris, Frankreich</h5><p class="contacts" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;"><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EU: +33 7 45 62 46 34</span><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 US: +1 (302) 277-8716 </span></p></footer></body></html>`,
        }
    },
    pt: {
        subjects: {
            verification: "Confirme o seu e-mail para iniciar a sua jornada de cura",
            welcome: "Bem-vindo ao Healing with Charlotte Casiraghi",
            "login-alert": "Novo login na sua conta",
            "password-changed": "A sua senha foi atualizada",
            waitlist: "Foi adicionado à lista de espera",
            newsletter: "Bem-vindo ao círculo de insights de cura de Charlotte",
            "payment-approved": "O seu pagamento está confirmado – {{purchase_type}} reservado",
            "payment-declined": "Problema com a sua tentativa de pagamento",
            "payment-processing": "O seu pagamento está a ser processado",
            "admin-otp": "O seu código OTP para o painel de administração",
            'waitlist-spot': "Está disponível um lugar – reclame a sua Experiência do Círculo Interno",
        },
        templates: {
            'login-alert': `<!DOCTYPE html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><title>Alerta de Login</title></head><html style="margin: 0; padding: 0; box-sizing: border-box;"><body style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; place-content: center; display: block; flex-direction: column; gap: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><header style="margin: 0; box-sizing: border-box; width: 100%; padding:20px; padding-top:30px; display: block; flex-direction: column; place-content: center; justify-content: center; align-items: center; text-align: center; color: black; font-weight: bold; gap: 5px; position: relative; overflow: hidden; background:#ffeed8;"><h2 style="margin: 0; padding: 0; box-sizing: border-box; letter-spacing: 0.4px; font-weight: bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; width: 100%;">Healing with Charlotte Casiraghi</h2><p style="margin: 0; padding: 0; box-sizing: border-box; margin-bottom: 5px; width: 100%; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: lighter;">Um Espaço para Curar</p></header><div class="parent" style="margin: 0; box-sizing: border-box; width: 95%; padding: 20px; margin-top: -10px; place-self: center; background: rgba(255, 255, 255, 0.787); backdrop-filter: blur(10px); border-radius: 25px; box-shadow: 0px 0px 15px rgba(225, 225, 225, 0.234); margin-bottom: 10px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Olá <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{first_name}}</b>,</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Notámos um novo início de sessão na sua conta Healing with Charlotte Casiraghi em <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{date_time}}</b> a partir de <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{location}}</b> usando: <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">{{device}}</b>.</p><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Proteger a sua privacidade e a sua jornada de cura é a nossa prioridade.</p><p class="up" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; margin-top: 10px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Foi você?</b></p><ul style="margin: 0; padding: 0; box-sizing: border-box;"><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Sim:</b> Nenhuma ação é necessária.</li><li style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;"><b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Não:</b> Por favor, redefina a sua senha imediatamente usando o nosso link seguro e contacte-nos em <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com.</b></li></ul><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Se estiver a viajar ou a usar um novo dispositivo, poderá receber estes alertas com mais frequência. São apenas um lembrete de que estamos a manter a sua conta segura. Obrigado por fazer parte deste espaço sagrado.</p><br style="margin: 0; padding: 0; box-sizing: border-box;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">Com cuidado,<br style="margin: 0; padding: 0; box-sizing: border-box;">Suporte Companion</p><hr style="margin: 0; padding: 0; box-sizing: border-box; border-color: #c6a8a587; margin-block: 5px;"><p style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">📞 UE: +33 7 45 62 46 34<br style="margin: 0; padding: 0; box-sizing: border-box;">📞 EUA: +1 (302) 277-8716<br style="margin: 0; padding: 0; box-sizing: border-box;">✉️ <b style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px;">healingwithcharlottecasiraghi@gmail.com</b></p></div><footer style="margin: 0; box-sizing: border-box; width: 100%; text-align: center; padding: 20px; background: #e6d4bdaa; padding-block: 40px; display: block; flex-direction: column; gap: 2px;"><h3 style="margin: 0; padding: 0; box-sizing: border-box;">Healing with Charlotte Casiraghi</h3><h5 style="margin: 0; padding: 0; box-sizing: border-box;">12 Avenue des Champs-Elysées, 75008 Paris, França</h5><p class="contacts" style="margin: 0; padding: 0; box-sizing: border-box; width: 100%; margin-bottom: 5px; display: flex; flex-direction: column; margin-top: 10px;"><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 UE: +33 7 45 62 46 34</span><span style="margin: 0; padding: 0; box-sizing: border-box;">📞 EUA: +1 (302) 277-8716 </span></p></footer></body></html>`,
        }
    }
};

module.exports = { templates };
