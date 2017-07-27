var express = require('express');
var app = express();

var submitedUrls= [];

var prefix = `
<html>
<head> 
</head> 
  <body>
    <form action='/' method ="post">
      <label>Submit your url</label>
      <input type="text" name='userUrl'>
      <input type="submit">
    </form>`

var suffix =
` </body>
</html>`  

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var htmlTemplate_Url = function(url){
    return '<div><a href="'+ url +'">'+url+'</a></div>';
}

var urlControl = function(req, res){
  var htmlTemplate = prefix+suffix;
  if(req.dataProcessed == undefined) {
    res.send(htmlTemplate);
  } else {
    htmlTemplate = "";
    submitedUrls.push(req.dataProcessed);
    htmlTemplate = prefix;
    for(var i=0; i<submitedUrls.length; i++){
      // htmlTemplate += htmlTemplate_Url();
      htmlTemplate += '<div><a href="'+ submitedUrls[i] +'" target="_blank">'+submitedUrls[i]+'</a></div>';
    }
    htmlTemplate += suffix;
    res.send(htmlTemplate);  
  }
}

var userControl = function(req, res, next){
  req.dataProcessed = req.body.userUrl;
  return next();
}

app.get('/', urlControl);

app.post('/', userControl, urlControl);

app.listen(3000, function(){
  console.log('listen on port 3000')
});
