const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

//
require("dotenv").config();
//
const app = express();
app.use(cors());
app.use(express.json());

//mailgun configuiration
const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "Guillaume",
  key: process.env.API_KEY_MAILGUN,
});

//route en Get
app.get("/", (req, res) => {
  console.log("ok");
  res.status(200).json({ message: "ok" });
});

//route en post récupérant un body
app.post("/form", async (req, res) => {
  //   Le console.log de req.body nous affiche les données qui ont été rentrées dans les inputs (dans le formulaire frontend) :

  try {
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "guillaumegemelas@hotmail.com",
      subject: `Formulaire JS`,
      text: req.body.message,
    };

    const response = await client.messages.create(
      process.env.DOMAIN_MAILGUN,
      messageData
    );
    console.log("response 🟢>", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
  //   res.json(req.body);
});

//port 3000
app.listen(3000, () => {
  console.log("Server has started 🤓");
});
