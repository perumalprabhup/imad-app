var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var  crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config={
    user:'perumalprabhu92',
    database:'perumalprabhu92',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
    
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret : "someRandomSecretValue",
    cookie : {maxAge:1200*60*60*24*30}
    
}));

/*

var articles={
 'article-one':{
 title : 'prabhu',
 heading :'This is My First Page',
 paragraph :`
<p>This is the Content Page what to say is nothing now it will be Continued....</p> 
<p>This is the advanced form of new datas and new Files  </p>
`},
 'article-two':{
 title : 'prabhu',
 heading :'This is My Second Page',
 paragraph :`
<p>This is the Content Page what to say is nothing now it will be Continued....</p> 
<p>This is the advanced form of new datas and new Files  </p>
`},
 'article-three':{
 title : 'prabhu',
 heading :'This is My Third Page',
 paragraph :`
<p>This is the Content Page what to say is nothing now it will be Continued....</p> 
<p>This is the advanced form of new datas and new Files  </p>
`}
};
*/

function createTemplate(data){
    
    var title = data.title;
    
    var heading = data.heading;
    
    var date = data.date;
    var content = data.content;
    
var htmlTemplate =`
<html>
<head>
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
 <link href="/ui/style.css" rel="stylesheet" />
</head>
<body>
    <div class="container">
        <div class=""> 
        <a href="/">Home</a>
        </div>
<div class="row">
    <div class="header">
<h1>${heading}</h1>
</div>

<div class="body">
${date.toDateString()}
${content}
<input type="text" name="prabhu"/>Hi
</div>
<div class="footer pull-right">
<h6>Copyrights@given to Prabhu for this year 2016-2020</h6>
</div>
</div>
</div>
</body>
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});




var pool = new Pool(config);
app.get('/test-db',function(req,res){
    
    pool.query('SELECT * FROM test',function(err,result){
        
        if(err){
            res.status(500).send(err,toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});


var counter = 0;

app.get ('/counter',function(req,res){
    
    counter=counter+1;
    
    res.send(counter.toString());
});


function hash (input,salt){
   // crypto.pbkdf2(password, salt,10000,512, );
    
    
    var key = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2','10000',salt,key.toString('hex')].join('$');  // '3745e48...aa39b34'
 
    
    
}


app.post('/create-user',function(req,res){

var username = req.body.username;
var password = req.body.password;

var salt = crypto.randomBytes(128).toString('hex');
var dbString =hash(password,salt);
pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){

//pool.query('SLECT * FROM "user" WHERE username = $1 ',[username,dbString],function(err,result){
    
      if(err){
         res.status(500).send(err.toString());
     }
     else{
         res.send("User Successfully Created :"+username);
     }
    
});
    
    
});




app.post('/login',function(req,res){

var username = req.body.username;
var password = req.body.password;

var salt = crypto.randomBytes(128).toString('hex');
var dbString =hash(password,salt);

pool.query('SELECT * FROM "user" WHERE username = $1 ',[username],function(err,result){
    
      if(err){
         res.status(500).send(err.toString());
     }
     else{
         if(username ===0){
      res.status(403).send(" NO User at the Name found");       
             
         }
         else{
             var dbString =result.rows[0].password;
             var salt = dbString.split("$")[2];
             var hashedPassword = hash(password,salt);
             if(hashedPassword === dbString){
                 
                 //set the Session
                 req.session.auth = {userId:result.rows[0].id};
                 
                 
                  res.send("credentials Ok ");
             }else{
                 res.send(403).send(" NO User at the Name found"); 
             }
        
     }
     }
    
});
    
    
});





app.get ('/check-login',function(req,res){
if(req.session && req.session.auth && req.session.auth.userId){
    res.send("You are logged In with ID :"+req.session.auth.userId.toString());
}
else{
    res.send("User not Logged In");
}
    
    
});


app.get ('/logout',function(req,res){
if(req.session && req.session.auth && req.session.auth.userId){

    delete req.session.auth;
    res.send("Logged Out Susscessfully");
}
    
    
});


app.get ('/hash/:input',function(req,res){
    
    var hashedString = hash(req.params.input,"This-is-the-String");
    
    res.send(hashedString);
});

app.get('/articles/:articleName', function (req, res) {

//articleName will define the articleone

 pool.query("SELECT * FROM article where title = $1 " ,[ req.params.articleName],function(err,result){
     
     if(err){
         res.status(500).send(err.toString());
     }
     else{
         if(result.rows.length === 0){
             res.status(404).send("Article not found");
         }
         else{
             
                // var articleData = result.rows[0];
             
                //  res.send(createTemplate(articleData));
                
    
                var artData = result.rows[0];
                res.send(createTemplate(artData));
    
    
    
    
               //  res.send(JSON.stringify(result.rows));
         
             
         }
     }
 });
});




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});





var names=[];

app.get('/name-input',function (req,res){
    
    var name=req.query.name;
    names.push(name);
    
    //json is used to convert the object to String
    res.send(JSON.stringify(names));
    
    
});


/*
app.get('/page2', function (req, res) {
 // res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
  res.send(createTemplate(article.articleTwo));
    
});

app.get('/page3', function (req, res) {
 // res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
  res.send(createTemplate(article.articleThree));
    
});
*/


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
