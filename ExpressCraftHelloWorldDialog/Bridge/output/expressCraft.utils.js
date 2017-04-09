Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.utils.ResourceManager", {
        statics: {
            cacheResourceString: null,
            config: {
                init: function () {
                    this.cacheResourceString = new (System.Collections.Generic.Dictionary$2(String,String))();
                }
            },
            getResourceString: function (name) {
                var $t;
                if (ExpressCraft.utils.ResourceManager.cacheResourceString.containsKey(name)) {
                    return ExpressCraft.utils.ResourceManager.cacheResourceString.get(name);
                }
                return (($t = ExpressCraft.Settings.getStyleRuleValue$1(ExpressCraft.Settings.resourceManangerSheets, "value", System.String.concat(".", name)), ExpressCraft.utils.ResourceManager.cacheResourceString.set(name, $t), $t));
            }
        }
    });
});
