const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3005;

const server = http.createServer(app);

server.listen(port,(err) =>{
    if(err){
        console.log('Error occured..')
    }
    else{
        console.log('Server running..')
    }
});