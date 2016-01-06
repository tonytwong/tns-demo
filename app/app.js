var applicationModule = require("application");
applicationModule.mainModule = "views/login/login";
    if(applicationModule.ios) {
    	console.log("setting GM Services key" );
        GMSServices.provideAPIKey("AIzaSyC5gyIOdhMUF6VQAIpogFM2i19u8BQqlQE");
    }
applicationModule.start();
