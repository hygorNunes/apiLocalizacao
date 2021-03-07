class OnSignal {
    constructor(){
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic " + process.env.ONESIGNAL_TOKEN
        };
    
        this.options = {
            host: process.env.ONESIGNAL_HOST,
            port: process.env.ONESIGNAL_PORT,
            path: process.env.ONESIGNAL_PATH,
            method: "POST",
            headers: headers
        };
    }

    sendNotification(data){
        var https = require('https');
        var req = https.request(this.options, function(res) {  
            res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
            });
        });
    
        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
    }
}

export default OnSignal