const express = require('express')
const jwt = require('jsonwebtoken');

const app = express()
const port = 5000

app.get('/', (req, res) => res.send('HELLO WORLD'))

app.post('/api/posts', VerifyToken, (req, res)=> {
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
      if(err){
            res.sendStatus(403);
      }else{
        res.json({
            messange: 'Post created...',
            authData
            });
        }
    });
});

app.post('/api/login' , (req, res)=> {
  const user = {
    id: 1,
    username: 'Quan',
    password: '123456a',
  }

  jwt.sign({user}, 'secretkey' , (err, token) =>{
    res.json({
      token
    })
  })
});

//FORMAT OF TOKEN
//Authorization: Token <access_token>

//Verify Token
function VerifyToken(req, res, next) {
    //Get auth header value
    const TokenHeader = req.headers['authorization'];
    //check if Token is underfined
    if(typeof TokenHeader !== 'undefined'){
    //Split at the space
    const Token = TokenHeader.split(' ');
    //Get token from array
    const TokenToken = Token[1];
    //Set the token
    req.token = TokenToken;
    next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }

}


app.listen(port, ()=> console.log(`Example app listen on port ${port}!`))

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})