var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var UserViewModel = require("../../shared/view-models/user-view-model");
var observableModule = require("data/observable");
var dialogsModule = require("ui/dialogs");

// var user = new observableModule.Observable({
//     email: "user@domain.com",
//     password: "password"
// });
var user = new UserViewModel({
    email: "test@test1234.com",
    password: "test"
});

var pageData = new observableModule.Observable({
	isLoading: false,
	user: user
})

exports.loaded = function(args) {
    var page = args.object;
    //email = viewModule.getViewById(page, "email_address");
    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barTintColor = UIColor.colorWithRedGreenBlueAlpha(0.011, 0.278, 0.576, 1);
        navigationBar.titleTextAttributes = new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]);
        navigationBar.barStyle = 1;
        navigationBar.tintColor = UIColor.whiteColor();
    }
    page.bindingContext = pageData;
};

exports.signIn = function() {
	pageData.set("isLoading", true);
	user.login()
        .then(function() {
        	pageData.set("isLoading", false);
            frameModule.topmost().navigate("views/list/list");
        }).catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
    	});
};
exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};
exports.maps = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("views/maps/maps");
}