
/*
var submitbtn = document.getElementById('submit_btn');

 submitbtn.onclick = function(){
    
    //capture the list of names 

    //create a req object;
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    
    request.onreadystatechange = function(){
        
    if(request.readyState  === XMLHttpRequest.DONE){
        
        if(request.status === 200){
            
       //var names =['name 1','name 2','name 3'];
       
      var names = request.responseText;
      names = JSON.parse(names);
       var list = '';
    for(var i=0; i<names.length; i++){
        
        list += '<li>'+names[i]+'</li>'+ '<br/><li class="comments">'+'<textarea rowsz="4" cols="50"></textarea><input type="submit" value="submit"></li>' ;
    }





var ul = document.getElementById('nameList');  
ul.innerHTML = list;
    }
    }
    };
    //capture the Namee
var nameInput = document.getElementById('name');
var name = nameInput.value;
//make the req
request.open('GET','http://perumalprabhu92.imad.hasura-app.io/name-input?name='+name,true);
request.send(null);
};

var button = document.getElementById('counter');

button.onclick = function(){
    
    //create a req object;
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    
    request.onreadystatechange =function(){
        
    if(request.readyState  == XMLHttpRequest.DONE){
        
        if(request.status === 200){
            
            var counter =request.responseText;
                
                var span = document.getElementById('count');
                
                span.innerHTML = counter .toString();
    
        }
    }
        
        
    };
    
    
    
//make the req

request.open('GET','http://perumalprabhu92.imad.hasura-app.io/counter',true);
request.send(null);
    
};

*/


var submit = document.getElementById('submit');

 submit.onclick = function(){
    
    //capture the list of names 

    //create a req object;
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    
    request.onreadystatechange = function(){
        
    if(request.readyState  === XMLHttpRequest.DONE){
        
        if(request.status === 200){
    alert ("User Logged in Successfully");
    }
    else if(request.status === 403){
     alert("username/password is incorrect");   
    }
    else if(request.status === 502){
        alert("Server Failure");
    }
    }
    };
    //capture the Namee
var nameInput = document.getElementById('username').value;
var password = document.getElementById('password').value;

console.log(username);

console.log(password);

//make the req
request.open('POST','http://perumalprabhu92.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password}));

};
