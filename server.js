var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.get("/timeline", function (req, res) {
    res.sendFile(__dirname + "/timeline.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});
// test route
router.get('/', function(req, res) {
    res.json({
    "status": true,
    "data": {
        "products": [
            {
                "id": "434",
                "name": "Pattern - Fractal Wallpaper",
                "image_url": "http://images5.alphacoders.com/350/350374.jpg"
            },
            {
                "id": "431",
                "name": "Mickey Mouse",
                "image_url": "http://www.iconsdb.com/icons/download/icon-sets/sketchy-pink/mickey-mouse-20-512.png"
            },
            {
                "id": "424",
                "name": "Pattern - Wallpaper",
                "image_url": "http://images7.alphacoders.com/421/421423.jpg"
            },
             {
                "id": "426",
                "name": "Batman",
                "image_url": "http://www.iconsdb.com/icons/download/icon-sets/sketchy-pink/batman-6-512.png"
            },
            {
                "id": "419",
                "name": "Pattern - Music",
                "image_url": "http://images3.alphacoders.com/169/169085.jpg"
            }
        ]
    }
});
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
router.get('/img',login.img);
app.use('/api', router);
app.listen(5000);