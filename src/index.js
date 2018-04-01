import express          from 'express';
import { createServer } from 'http';
import path             from 'path';
import bodyParser       from 'body-parser';
import mongoose         from 'mongoose';
import { User }         from './models';
import {
  createUser,
  findUserByLogin
}                       from './actions';


const HOST='localhost';
const dbName=`chatdb`;
const PORT=3001;
const app=express();
const server=createServer(app);
const jsonParser=bodyParser.json();
const client=path.dirname(__dirname).replace(`server`, `client/public/index.html`);

mongoose.connect(`mongodb://${HOST}/${dbName}`);
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
  console.log(`chatdb connected!`);
});

server.listen(PORT, HOST, ()=>{
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

app.get(`/`, (req, res)=>{
  res.sendFile(client);
});

app.post(`/api/login`, jsonParser, (req, res)=>{
  findUserByLogin({ ...req.body })
  .then(data=>{
    const result=data && data.password === req.body.password;
    result && res.json({
      token: `secret path`,
      success: true,
    });
    (data && !result) && res.json({
      message: `wrong password or login`,
      success: false,
    });
    !data && res.json({
      message: `not found`,
      success: false,
    });
  })
  .catch(error=>{
    res.status(500).json({
      error
    });
    console.log('/api/login Error', error);
  });
});

app.post(`/api/signup`, jsonParser, (req, res)=>{
  findUserByLogin({ ...req.body })
  .then(result=>{
    result && res.json({
      message: `login already exist`,
      success: false,
    });
    !result && createUser({ ...req })
    .then(()=>{
      res.json({
        success: true,
      });
    });
  })
  .catch(error=>{
    res.json({ error });
    console.log('error', error);
  });
});