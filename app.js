const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const port = 8000;

// Servers are created with call back functions
// Which is  why function are passed asargument to http.createServer()
const server = http.createServer((req, res)  =>{
    data = "";
    if (req.url === '/' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type' : 'text/html'});

        fs.readFile('./index.html', 'utf8', (err, data) => {
            if (err){
                console.log("Error Message: ",err);
            }
            res.write(data);
           // console.log(data);
            res.end();
        });

    }

    else if (req.method === 'POST'){
        req.on('data', (chunk) => {
            //console.log(chunk)
            data += chunk.toString('utf-8');
            

        });

        req.on('end', () => {
            fs.readFile('./index.html', 'utf-8', (err, data) => {
                if(err){
                    console.log("Error", err);
                }
                res.write(data);
                res.end();
            });

            let userData = qs.parse(data);
            fileName = "data.txt"
            console.log('File: ', fileName)

            let fileContent = `First Name: ${userData.firstname}\nLast Name: ${userData.lastname}\nUsername: ${userData.username}\nPassword: ${userData.password}\nEmail: ${userData.email}`;
            fs.writeFile('./database/'+ fileName, fileContent,
            function(err){
                console.log("User Data succesfuly added");
            });
        });

    }
    else{
        res.writeHead(404, {'Content-Type' : 'text/html'});

        fs.readFile('./error.html', 'utf-8', (err, data) =>{
            if(err){
                console.log("Error message: ", err);
            }
            res.write(data);
            res.end();
        })
       
    }

});

server.listen(port);

console.log('Listening on port 8000...');