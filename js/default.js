// For an introduction to the Grid template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232446
(function () {
    "use strict";

    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    app.onready = function () {
        
        nav.history = app.sessionState.history || {};
        nav.history.current.initialPlaceholder = true;

        // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
        ui.disableAnimations();
        var p = ui.processAll().then(function () {
            document.body.onkeyup = function (e) {
                WinJS.Application.queueEvent({ type: 'keyUpTriggered', keyCode: e.keyCode, handled: false });
            };
            return nav.navigate(nav.location || Application.navigator.home, nav.state);
        }).then(function () {
            ui.enableAnimations();
        });                      
    };

    app.start();
})();
