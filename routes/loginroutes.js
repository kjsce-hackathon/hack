var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'learn'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    // "first_name":req.body.first_name,
    // "last_name":req.body.last_name,
    "username":req.body.username,
    "email":req.body.email,
    "password":req.body.password,
    "gender":req.body.gender,
    // "created":today,
    // "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      // "code":200,
      // "success":"user registered sucessfully"
      "error":false,
          "message": "registered sucessfull",
          "user": users
        });
  }
  });
}

exports.login = function(req,res){
  // var email= req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      // "code":400,
      // "failed":"error ocurred"
      "error":true,
          "message": "error occured"
          
    })
  }else{
     console.log('The solution is: ', results.length);
    if(results.length >0){
      var userss = {
        "id": results[0].id,
       "username":results[0].username,
      "email":results[0].email,
      "gender":results[0].gender
      }
      console.log("----->>>",userss);
        // console.log("---->>", results[0].password);
        // console.log("---->>",password);
      if(results[0].password == password){
        res.send({
          // "code":200,
          // "success":"login sucessfull"
          "error":false,
          "message": "login sucessfull",
          "user": userss
            });
      }
      else{
        res.send({
          // "code":204,
           "error":true,
          "message": "Email and password does not match",
          "user": userss
          // "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        // "code":204,
        // "success":"Email does not exits"
        "error":true,
          "message": "Email does not match",
          "user": userss
          });
    }
  }
  });
}


exports.img = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var image=[{
    // "first_name":req.body.first_name,
    // "last_name":req.body.last_name,
    id:2,
    name: '105 POPULAR TESTER',
   image: fs.readFileSync('C:\\POPULAR.jpg'),
    
  },
  {
  name: '101 POPULAR TESTER',
   image: fs.readFileSync('C:\\POPULAR.jpg'),
    
  
    // "created":today,
    // "modified":today
  }]
  
  connection.query('INSERT INTO images SET ?',image, function (error, products, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.json({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', products);
    res.json({
      // "code":200,
      // "success":"user registered sucessfully"
      "status":true,
          
          "data": {products}
        });
  }
});


// connection.query('SELECT * FROM image', function (error, products, fields) {
//   if (error) {
//     console.log("error ocurred",error);
//     res.json({
//       "code":400,
//       "failed":"error ocurred"
//     })
//   }else{
//     console.log('The solution is: ', products);
//     res.json({
//       // "code":200,
//       // "success":"user registered sucessfully"
//       "status":true,
          
//           "data": {products}
//         });
//   }
// });
  }


