const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", (req, res) => {
  let data = req.body;
  if (
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.message.length === 0
  ) {
    return res.json({ msg: "please fill all the fields" });
  }
  let smtTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "59050167@kmitl.ac.th",
      pass: "0891631619Za",
    },
  });
  let mailOptions = {
    from: data.email,
    to: "59050167@kmitl.ac.th",
    subject: `message from ${data.name}`,
    html: `
      <h3>Informations<h3/>
      <ul>
      <li>Name: ${data.name}<li/>
      <li>Email: ${data.email}<li/>
      </ul>
      <h3>Message</h3>
      <p>${data.message}<p/>
      `,
  };
  smtTransporter.sendMail(mailOptions, (error) => {
    try {
      if (error)
        return res
          .status(400)
          .json({ msg: "please fill all the fields again " });
      res.status(200).json({ msg: "Thank you for contacting" });
    } catch (error) {
      if (error) return res.status(500).json({ msg: "There is server error" });
    }
  });
});
module.exports = router;
