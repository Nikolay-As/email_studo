const { app, BrowserWindow } = require('electron')
const nodemailer = require("nodemailer");

const express = require('express');
const { text } = require('express');
const serv = express()
const port = 3001||process.env.PORT;

let email_address;
let text_users;



const urlencodedParser = express.urlencoded({extended: false});


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
   // fullscreen:true
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})


async function main() {

//let testAccount = await nodemailer.createTestAccount();


let transporter = nodemailer.createTransport({
  service:"Mail.ru",
  auth: {
    user: "viladrog@mail.ru", // generated ethereal user
    pass: "ahtiger2000", // generated ethereal password
  },
});


let info = await transporter.sendMail({
  from: '"viladrog@mail.ru"', // sender address
  to: email_address, // list of receivers
  subject: "Hello ✔", // Subject line
  text: text_users, // plain text body
});

console.log("Message sent: %s", info.messageId);

}









serv.post('/sendemail',urlencodedParser, (req, res) => {
  //console.log("Нужно отправить письмо")
   email_address=req.body.email
   text_users=req.body.text
   main().catch(console.error);


  //console.log(req.body)
 // console.log("email:"+req.body.email);
  //console.log(`text: ${req.body.text}`)
  //main().catch(console.error);
})

serv.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})