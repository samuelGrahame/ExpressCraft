Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.controls.GridLookupEdit", {
        inherits: [ExpressCraft.Control],
        gridView: null,
        fieldName: null,
        displayName: null,
        visible: false,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor4.call(this, "inputcontrol", ExpressCraft.ComboBoxTypes.Default);
            this.gridView = Bridge.merge(new ExpressCraft.GridView(), {
                setSize: new ExpressCraft.Vector2.$ctor1(250, 400)
            } );

            this.gridView.content.onmouseleave = Bridge.fn.bind(this, $asm.$.ExpressCraft.controls.GridLookupEdit.f1);
            this.content.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.controls.GridLookupEdit.f2);
        },
        showPopup: function () {
            if (this.visible) {
                return;
            }
            var x = this.content.getBoundingClientRect();
            this.gridView.setLocation(new ExpressCraft.Vector2.$ctor1(x.left, x.top + x.height));

            ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles + 1) | 0;
            this.content.parentElement.appendChild(ExpressCraft.Control.op_Implicit(this.gridView));
            this.gridView.content.style.zIndex = (((ExpressCraft.ContextMenu.totalContextHandles + ExpressCraft.Settings.contextMenuStartingZIndex) | 0)).toString();
            this.visible = true;
        },
        closePopup: function () {
            if (this.visible) {
                this.gridView.content.remove();
                ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles - 1) | 0;
                this.visible = false;
            }
        }
    });

    Bridge.ns("ExpressCraft.controls.GridLookupEdit", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.controls.GridLookupEdit, {
        f1: function (ev) {
            this.closePopup();
        },
        f2: function (ev) {
            this.showPopup();
        }
    });
});
