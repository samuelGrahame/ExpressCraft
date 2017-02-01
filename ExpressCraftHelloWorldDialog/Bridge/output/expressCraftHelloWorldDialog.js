/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.6.0
 */
Bridge.assembly("ExpressCraftHelloWorldDialog", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftHelloWorldDialog.App", {
        statics: {
            r: null,
            config: {
                init: function () {
                    this.r = new System.Random.ctor();
                }
            },
            getRandomText: function () {
                var builder = new System.Text.StringBuilder();

                for (var i = 0; i < 1000; i = (i + 1) | 0) {
                    builder.append(ExpressCraftHelloWorldDialog.App.r.next().toString());
                }
                return builder.toString();
            }
        },
        $main: function () {
            var $t, $t1, $t2, $t3;
            // Setup the form events and containers*
            ExpressCraft.Form.setup();
            ExpressCraft.GoogleCloudPrint.setup();
            ExpressCraft.AceCodeEditor.setup();
            ExpressCraft.Settings.allowCloseWithoutQuestion = true;

            var dialogTestButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "dialog test",
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f1
            } );

            var errorBtn = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: ($t=ExpressCraft.MessageBoxLayout.Error, System.Enum.format(ExpressCraft.MessageBoxLayout, $t, "G")),
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f2
            } );
            errorBtn.content.style.position = "relative";

            var exclamationBtn = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: ($t1=ExpressCraft.MessageBoxLayout.Exclamation, System.Enum.format(ExpressCraft.MessageBoxLayout, $t1, "G")),
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f3
            } );
            exclamationBtn.content.style.position = "relative";

            var informationBtn = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: ($t2=ExpressCraft.MessageBoxLayout.Information, System.Enum.format(ExpressCraft.MessageBoxLayout, $t2, "G")),
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f4
            } );
            informationBtn.content.style.position = "relative";

            var questionBtn = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: ($t3=ExpressCraft.MessageBoxLayout.Question, System.Enum.format(ExpressCraft.MessageBoxLayout, $t3, "G")),
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f5
            } );
            questionBtn.content.style.position = "relative";

            var informationBtn2 = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Large Information",
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f6
            } );
            informationBtn2.content.style.position = "relative";
            informationBtn2.content.style.width = "auto";

            var googlecloudPrintBtn = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Google Cloud Print",
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f7
            } );
            googlecloudPrintBtn.content.style.position = "relative";
            googlecloudPrintBtn.content.style.width = "auto";

            var aceCodeBtn = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Ace Code Editor",
                itemClick: $asm.$.ExpressCraftHelloWorldDialog.App.f8
            } );
            aceCodeBtn.content.style.position = "relative";
            aceCodeBtn.content.style.width = "auto";

            ExpressCraft.Helper.appendChildrenTabIndex(ExpressCraft.Form.getWindowHolder(), [errorBtn, exclamationBtn, informationBtn, questionBtn, informationBtn2, googlecloudPrintBtn, aceCodeBtn, dialogTestButton]);
        }
    });

    Bridge.ns("ExpressCraftHelloWorldDialog.App", $asm.$);

    Bridge.apply($asm.$.ExpressCraftHelloWorldDialog.App, {
        f1: function (ev) {
            (new ExpressCraft.InputDialogText("Question", "This is a question. This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.This is a question.")).showDialog();
        },
        f2: function (ev) {
            (new ExpressCraft.MessageBoxForm.ctor("Hello World!", ExpressCraft.MessageBoxLayout.Error)).showDialog();
        },
        f3: function (ev) {
            (new ExpressCraft.MessageBoxForm.ctor("Hello World!", ExpressCraft.MessageBoxLayout.Exclamation)).showDialog();
        },
        f4: function (ev) {
            (new ExpressCraft.MessageBoxForm.ctor("Hello World!", ExpressCraft.MessageBoxLayout.Information)).showDialog();
        },
        f5: function (ev) {
            (new ExpressCraft.MessageBoxForm.ctor("Hello World!", ExpressCraft.MessageBoxLayout.Question)).showDialog();
        },
        f6: function (ev) {
            (new ExpressCraft.MessageBoxForm.ctor(ExpressCraftHelloWorldDialog.App.getRandomText(), ExpressCraft.MessageBoxLayout.Information)).showDialog();
        },
        f7: function (ev) {
            (new ExpressCraft.GoogleCloudPrint("https://www.google.com/landing/cloudprint/testpage.pdf", "Test Print")).show();
        },
        f8: function (ev) {
            var frm = Bridge.merge(new ExpressCraft.Form(), {
                setText: "Ace Code Editor"
            } );
            var codeEditor = new ExpressCraft.AceCodeEditor();
            ExpressCraft.Helper.setBoundsFull$1(codeEditor);

            frm.linkchildToForm(codeEditor);

            frm.getBody().appendChild(ExpressCraft.Control.op_Implicit(codeEditor));
            frm.show();
        }
    });
});
