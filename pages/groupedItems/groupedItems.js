﻿(function () {
    "use strict";

    var nav = WinJS.Navigation,
        ui = WinJS.UI,
        session = WinJS.Application.sessionState;

    ui.Pages.define("/RebuildWinJSWeb/pages/groupedItems/groupedItems.html", {
        // This function is called to initialize the page.
        init: function (element, options) {
            this.groupHeaderInvoked = ui.eventHandler(this._groupHeaderInvoked.bind(this));
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
            this.zoomHeaderInvoked = ui.eventHandler(this._zoomHeaderInvoked.bind(this));
        },

        // This function is called whenever a user navigates to this page.
        ready: function (element, options) {
            session.currentSlide = session.nextItem = session.previousItem = null;                                   
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _zoomHeaderInvoked: function (args) {
            var group = Data.groups.getAt(args.detail.itemIndex);

            // give the semantic zoom control time to collapse before
            // navigating 
            (function (group) {
                setTimeout(function () {
                    nav.navigate("/RebuildWinJSWeb/pages/groupDetail/groupDetail.html", { groupKey: group.key });
                }, 0);
            })(group);            
        },

        _groupHeaderInvoked: function (args) {
            var group = Data.groups.getAt(args.detail.groupHeaderIndex);
            nav.navigate("/RebuildWinJSWeb/pages/groupDetail/groupDetail.html", { groupKey: group.key });
        },

        _itemInvoked: function (args) {
            var item = Data.items.getAt(args.detail.itemIndex);
            nav.navigate("/RebuildWinJSWeb/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
