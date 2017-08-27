var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config={
    user:'perumalprabhu92',
    database:'perumalprabhu92',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
    
};
var app = express();
app.use(morgan('combined'));

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


function createTemplate(data){
    
    var title = data.title;
    
    var heading = data.heading;
    
    var paragraph = data.paragraph;
    
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
${paragraph}
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
*/




app.get('/article/:articleName', function (req, res) {

//articleName will define the articleone
//var articleName = req.params.articleName;
// var articleData = 
 pool.query("SELECT * FROM article where title = '" + req.params.articleName + "'",function(err,result){
     
     if(err){
         res.status(500).send(err.toString());
         
     }
     else{
         if(result.rows.length === 0){
             res.status(400).send("article not found");
         }
         else{
             var articlData = result.rows[0];
              res.send(createTemplate(articleData));
             
         }
     }
     
 });
    
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    
    
    pool.query('SELECT * FROM test',function(err,result){
        
        if(err){
            err.status(500).send(err,toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    
    
    
});

var counter =0;
app.get ('/counter',function(req,res){
    
    counter=counter+1;
    
    res.send(counter.toString());
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
