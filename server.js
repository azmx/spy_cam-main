const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Mengatur direktori statis
app.use(express.static(path.join(__dirname, "public")));

// Mengatur body parser untuk JSON
app.use(bodyParser.json({ limit: "10mb" }));

// Endpoint untuk menangani upload gambar
app.post("/upload", (req, res) => {
  const imageData = req.body.image;

  // Konfigurasi transportasi email
  let transporter = nodemailer.createTransport({
    service: "gmail", // Contoh menggunakan Gmail
    auth: {
      user: "muhammadazzamaqiladaffa@gmail.com",
      pass: "gsch wgid jnxx fopq",
    },
  });

  // Konfigurasi email
  let mailOptions = {
    from: "muhammadazzamaqiladaffa@gmail.com",
    to: "muhammadazzamaqiladaffa@gmail.com",
    subject: "Captured Image",
    text: "Here is the captured image.",
    attachments: [
      {
        filename: "image.png",
        content: imageData.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  // Kirim email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
    res.sendStatus(200);
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
