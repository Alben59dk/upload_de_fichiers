const express = require('express')
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

let upload = multer({ storage: storage })

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public/uploads'))

app.get('/', (req, res) => res.render('index'))

app.post('/monupload', upload.array('monfichier', 3), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  if (req.file !== undefined) {
    console.log(req.file)
    res.sendStatus(200)
  } else {
    res.render('index')
  }
})

app.listen(3000, () => console.log(`server started on port 3000`))
