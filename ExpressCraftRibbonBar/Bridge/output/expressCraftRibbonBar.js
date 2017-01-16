/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.6.0
 */
Bridge.assembly("ExpressCraftRibbonBar", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftRibbonBar.App", {
        $main: function () {
            // Create a new Button
            var button = Bridge.merge(document.createElement('button'), {
                innerHTML: "Click Me",
                onclick: $asm.$.ExpressCraftRibbonBar.App.f1
            } );

            // Add the Button to the page
            document.body.appendChild(button);

            // To confirm Bridge.NET is working: 
            // 1. Build this project (Ctrl + Shift + B)
            // 2. Browse to file /Bridge/www/demo.html
            // 3. Right-click on file and select "View in Browser" (Ctrl + Shift + W)
            // 4. File should open in a browser, click the "Submit" button
            // 5. Success!
        }
    });

    Bridge.ns("ExpressCraftRibbonBar.App", $asm.$);

    Bridge.apply($asm.$.ExpressCraftRibbonBar.App, {
        f1: function (ev) {
            // When Button is clicked, 
            // the Bridge Console should open.
            Bridge.Console.log("Success!");
        }
    });
});
