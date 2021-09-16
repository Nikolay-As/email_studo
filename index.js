const { app, BrowserWindow } = require('electron')
const express = require('express');
const nodemailer = require("nodemailer");
const multer  = require("multer");
var XLSX = require('xlsx');
//let mailInPacket=require('./front')

var mailInPacket;
var delayMail;
var delayPacket;

// Для xlmx -------
var workbook;
var sheet_name_list
var xlData
// -------------

const serv = express()
const port = 3001||process.env.PORT;

const storageConfig = multer.diskStorage({  // Настройки для сохранения принятых файлов
  destination: (req, file, cb) =>{
      cb(null, "uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});


let downloaded_name_file; // Имя загруженного файла


serv.use(express.static(__dirname));
serv.use(multer({storage:storageConfig}).single("filedata"));

serv.set('view engine', 'ejs');

const urlencodedParser = express.urlencoded({extended: false});


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
   // fullscreen:true
  })

  win.loadURL('http://localhost:3001')
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

serv.get('/',urlencodedParser, (req, res) => { // Запуск рассылки
  res.render("index.ejs",{data:xlData})
})


serv.post('/start',urlencodedParser, (req, res) => { // Запуск рассылки

})

serv.post('/download_files',urlencodedParser, (req, res) => { // Загрузка файлов, которые будут отправляться с письмом

})

serv.post('/download_email_address', (req, res) => { // Выгрузить адреса из файла
   downloaded_name_file = req.file.filename;
    if(!req.file)
        res.send("Ошибка при загрузке файла");
    else
    {
       workbook = XLSX.readFile(req.file.originalname);
       sheet_name_list = workbook.SheetNames;
       xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
       res.render("index.ejs",{data:xlData})
    }
})

serv.get('/refresh_table',urlencodedParser, (req, res) => { // обноить таблицу
 res.render("index.ejs",{data:xlData})
})



serv.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
