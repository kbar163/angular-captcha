const express = require ('express');
const bodyParser = require("body-parser");
var https = require('https');
const app = express();
const cors = require('cors');
app.use(cors({
    origin : '*'
}));
app.use(bodyParser.json());

app.post('/', (request,response) => {
    
    let requestBody = request.body;
    let parameters = requestBody.parameters;
    let appURL = getWebviewParam(parameters, 'AngularAppURL', null);
    let callbackURL = getWebviewParam(parameters, 'webview.onDone', null);
    let responseURL = `${appURL}?callbackURL=${callbackURL}`;
    response.status(200).json({
        "webview.url": responseURL
    });
    
});

app.post('/test', (request,response) => {
    
    let requestBody = request.body;
    console.log(requestBody); 
    response.status(200).json({"ok":200})
});

function getWebviewParam (paramArray, key, defaultValue) 
{
    if (paramArray)
    {
        let param = paramArray.find(e => {
            return e.key === key;
        });
        return param ? param.value : defaultValue;
    }
    return defaultValue;
}

const port = process.env.PORT || 3000;
app.listen(port);