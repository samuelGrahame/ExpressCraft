Bridge.assembly("ExpressCraftRibbonBar", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,ExpressCraft,ExpressCraftRibbonBar];
    $m($n[2].App, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"CreateRandomRibbonPage","is":true,"t":8,"pi":[{"n":"caption","pt":$n[0].String,"ps":0}],"sn":"CreateRandomRibbonPage","rt":$n[1].RibbonPage,"p":[$n[0].String]},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void},{"a":2,"n":"r","is":true,"t":4,"rt":$n[0].Random,"sn":"r"}]}; });
    $m($n[2].App.RibbonForm, function () { return {"td":$n[2].App,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":3,"n":"OnShowing","t":8,"sn":"OnShowing","rt":$n[0].Void},{"a":2,"n":"RibbonControl","t":4,"rt":$n[1].RibbonControl,"sn":"RibbonControl"}]}; });
});
