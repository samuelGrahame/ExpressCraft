/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.Control", {
        statics: {
            ControlClass: "control",
            cva: null,
            baseClass: function (add, ac) {
                if (add === void 0) { add = true; }
                if (ac === void 0) { ac = true; }
                return ac ? (add ? " control" : ExpressCraft.Control.ControlClass) : "";
            },
            getImageString: function (s) {
                //url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==') no-repeat
                return System.String.format("url('data:image/png;base64,{0}') no-repeat", s);
            },
            getPdfString: function (s) {
                //url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==') no-repeat
                return System.String.format("data:application/pdf;base64,{0}", s);
            },
            getImageStringURI: function (s, useResourceURL) {
                if (useResourceURL === void 0) { useResourceURL = true; }
                //"./Images/"
                return System.String.format("url('{0}{1}') no-repeat", useResourceURL ? ExpressCraft.Settings.resourceURL : "", s);
            },
            div: function (ac) {
                if (ac === void 0) { ac = true; }
                return Bridge.merge(document.createElement('div'), {
                    className: ExpressCraft.Control.baseClass(false, ac)
                } );
            },
            div$1: function (cn, ac) {
                if (ac === void 0) { ac = true; }
                return Bridge.merge(document.createElement('div'), {
                    className: System.String.concat(cn, ExpressCraft.Control.baseClass(true, ac))
                } );
            },
            span: function (ac) {
                if (ac === void 0) { ac = true; }
                return Bridge.merge(document.createElement('span'), {
                    className: ExpressCraft.Control.baseClass(false, ac)
                } );
            },
            span$1: function (cn, ac) {
                if (ac === void 0) { ac = true; }
                return Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(cn, ExpressCraft.Control.baseClass(true, ac))
                } );
            },
            label$2: function (Caption, X, Y, IsBold, IsTiny, ac) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (ac === void 0) { ac = true; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: ExpressCraft.Control.baseClass(false, ac)
                } );

                lbl.innerHTML = ExpressCraft.Helper.htmlEscape$1(Caption);
                ExpressCraft.Helper.setLocation(lbl, X, Y);
                ExpressCraft.Control.setBT(lbl, IsBold, IsTiny);

                return lbl;
            },
            label$4: function (Caption, X, Y, width, height, IsBold, IsTiny, classr, Alignment, Forecolor, ac) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (classr === void 0) { classr = ""; }
                if (Alignment === void 0) { Alignment = 3; }
                if (Forecolor === void 0) { Forecolor = null; }
                if (ac === void 0) { ac = true; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(classr, ExpressCraft.Control.baseClass(!System.String.isNullOrWhiteSpace(classr), ac))
                } );

                lbl.innerHTML = ExpressCraft.Helper.htmlEscape$1(Caption);
                ExpressCraft.Helper.setBounds$1(lbl, X, Y, width, height);
                if (Alignment !== "left") {
                    lbl.style.textAlign = Alignment;
                }
                ExpressCraft.Control.setBT(lbl, IsBold, IsTiny);
                if (Forecolor != null) {
                    lbl.style.color = Forecolor;
                }

                return lbl;
            },
            label$3: function (Caption, X, Y, width, IsBold, IsTiny, classr, Alignment, Forecolor, ignoreHtml, ac) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (classr === void 0) { classr = ""; }
                if (Alignment === void 0) { Alignment = 3; }
                if (Forecolor === void 0) { Forecolor = null; }
                if (ignoreHtml === void 0) { ignoreHtml = false; }
                if (ac === void 0) { ac = true; }
                var lbl = document.createElement('span');
                lbl.className = System.String.concat(classr, ExpressCraft.Control.baseClass(!System.String.isNullOrWhiteSpace(classr), ac));
                if (!ignoreHtml) {
                    lbl.textContent = ExpressCraft.Helper.htmlEscape$1(Caption);
                } else {
                    lbl.textContent = Caption;
                }
                lbl.style.left = ExpressCraft.Helper.toPx(X);
                lbl.style.top = ExpressCraft.Helper.toPx(Y);
                lbl.style.width = ExpressCraft.Helper.toPx(width);

                if (Alignment !== "left") {
                    if (Alignment === "right") {
                        lbl.style.direction = "rtl";
                    } else {
                        lbl.style.textAlign = Alignment;
                    }
                }
                ExpressCraft.Control.setBT(lbl, IsBold, IsTiny);
                if (Forecolor != null) {
                    lbl.style.color = Forecolor;
                }

                return lbl;
            },
            label$5: function (c, X, Y, width, height, IsBold, IsTiny, classr, ac) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (classr === void 0) { classr = ""; }
                if (ac === void 0) { ac = true; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(classr, ExpressCraft.Control.baseClass(!System.String.isNullOrWhiteSpace(classr), ac))
                } );

                lbl.innerHTML = ExpressCraft.Helper.htmlEscape$1(c);
                ExpressCraft.Helper.setBounds$1(lbl, X, Y, width, height);
                ExpressCraft.Control.setBT(lbl, IsBold, IsTiny);

                return lbl;
            },
            label$1: function (c, X, Y, width, IsBold, IsTiny, classr, ac) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (classr === void 0) { classr = ""; }
                if (ac === void 0) { ac = true; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(classr, ExpressCraft.Control.baseClass(!System.String.isNullOrWhiteSpace(classr), ac))
                } );

                lbl.innerHTML = ExpressCraft.Helper.htmlEscape$1(c);
                ExpressCraft.Helper.setLocation(lbl, X, Y);
                lbl.style.width = ExpressCraft.Helper.toPx(width);
                ExpressCraft.Control.setBT(lbl, IsBold, IsTiny);

                return lbl;
            },
            label: function (c, X, Y, IsBold, IsTiny, ac) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (ac === void 0) { ac = true; }
                return ExpressCraft.Control.label$2(c, X, Y, IsBold, IsTiny, ac);
            },
            setBT: function (lbl, IsBold, IsTiny) {
                if (IsBold) {
                    lbl.style.fontWeight = "bold";
                }
                if (IsTiny) {
                    lbl.style.fontSize = "6.75pt";
                }
            },
            comboBox: function (cn, ct, ac) {
                if (ac === void 0) { ac = true; }
                var combo = Bridge.merge(document.createElement('select'), {
                    className: System.String.concat(cn, ExpressCraft.Control.baseClass(true, ac))
                } );
                if (ct === ExpressCraft.ComboBoxTypes.Default) {

                }
                return combo;
            },
            button: function (cn, bt, ac) {
                if (ac === void 0) { ac = true; }
                return Bridge.merge(document.createElement('button'), {
                    className: System.String.concat(cn, ExpressCraft.Control.baseClass(true, ac)),
                    type: bt
                } );
            },
            input: function (cn, it, ac) {
                if (ac === void 0) { ac = true; }
                var input = document.createElement('input');
                input.className = System.String.concat(cn, ExpressCraft.Control.baseClass(!System.String.isNullOrWhiteSpace(cn), ac));
                var ty = it;
                if (Bridge.Browser.isIE && (Bridge.referenceEquals(ty, "text") || Bridge.referenceEquals(ty, "date") || Bridge.referenceEquals(ty, "color") || Bridge.referenceEquals(ty, 19) || Bridge.referenceEquals(ty, 3) || Bridge.referenceEquals(ty, 2))) {
                    return input;
                }
                input.type = it;

                return input;
            },
            /**
             * Returns Text Metrics for a given string
             *
             * @static
             * @public
             * @this ExpressCraft.Control
             * @memberof ExpressCraft.Control
             * @param   {string}         t    the string
             * @param   {string}         f    the font used
             * @return  {TextMetrics}         TextMetrics
             */
            getTextMetrics: function (t, f) {
                var $t;
                var c = (ExpressCraft.Control.cva || (($t = document.createElement('canvas'), ExpressCraft.Control.cva = $t, $t))).getContext("2d");
                c.font = f;
                return c.measureText(t);
            },
            /**
             * Returns text width
             *
             * @static
             * @public
             * @this ExpressCraft.Control
             * @memberof ExpressCraft.Control
             * @param   {string}    t    the string
             * @param   {string}    f    the font used
             * @return  {number}         double
             */
            getTextWidth: function (t, f) {
                return ExpressCraft.Control.getTextMetrics(t, f).width;
            },
            op_Implicit: function (control) {
                if (ExpressCraft.Settings.autoRender && !control.getHasRendered()) {
                    control.render();
                }
                return control.content;
            }
        },
        content: null,
        _toolTip: null,
        _OnMouseEnterToolTip: null,
        _OnMouseLeaveToolTip: null,
        onResize: null,
        onLoaded: null,
        contextMenu: null,
        linkedForm: null,
        config: {
            properties: {
                Name: null,
                HasRendered: false
            }
        },
        $ctor1: function (ac) {
            if (ac === void 0) { ac = true; }

            this.$initialize();
            this.content = ExpressCraft.Control.div(ac);
        },
        ctor: function (element) {
            this.$initialize();
            this.content = element;
        },
        $ctor5: function (cn, ac) {
            if (ac === void 0) { ac = true; }

            this.$initialize();
            this.content = ExpressCraft.Control.div$1(cn, ac);
        },
        $ctor2: function (cn, bt, ac) {
            if (ac === void 0) { ac = true; }

            this.$initialize();
            this.content = ExpressCraft.Control.button(cn, bt, ac);
        },
        $ctor4: function (cn, ct, ac) {
            if (ac === void 0) { ac = true; }

            this.$initialize();
            this.content = ExpressCraft.Control.comboBox(cn, ct, ac);
        },
        $ctor3: function (cn, it, ac) {
            if (ac === void 0) { ac = true; }

            this.$initialize();
            this.content = ExpressCraft.Control.input(cn, it, ac);
        },
        getToolTip: function () {
            return this._toolTip;
        },
        setToolTip: function (value) {
            if (!Bridge.referenceEquals(this._toolTip, value)) {
                if (value != null) {
                    if (value.attachedControl != null && !Bridge.referenceEquals(value.attachedControl, this)) {
                        value = null;
                    } else {
                        value.attachedControl = this;
                    }
                }
                this._toolTip = value;

                if (this._toolTip != null && (!ExpressCraft.Helper.isEmpty(this._toolTip.heading) || !ExpressCraft.Helper.isEmpty(this._toolTip.description))) {
                    this._OnMouseEnterToolTip = Bridge.fn.bind(this, $asm.$.ExpressCraft.Control.f1);
                    this._OnMouseLeaveToolTip = Bridge.fn.bind(this, $asm.$.ExpressCraft.Control.f2);

                    this.content.addEventListener("mouseenter", this._OnMouseEnterToolTip);
                    this.content.addEventListener("mouseleave", this._OnMouseLeaveToolTip);
                    return;
                }

                if (!Bridge.staticEquals(this._OnMouseEnterToolTip, null)) {
                    this.content.removeEventListener("mouseenter", this._OnMouseEnterToolTip);
                    this._OnMouseEnterToolTip = null;
                }
                if (!Bridge.staticEquals(this._OnMouseLeaveToolTip, null)) {
                    this.content.removeEventListener("mouseleave", this._OnMouseLeaveToolTip);
                    this._OnMouseLeaveToolTip = null;
                }
            }
        },
        getStyle: function () {
            return this.content.style;
        },
        getClassList: function () {
            return this.content.classList;
        },
        getWidth: function () {
            return this.content.style.width;
        },
        setWidth: function (value) {
            this.content.style.width = ExpressCraft.Helper.toHtmlValue(value);
        },
        getHeight: function () {
            return this.content.style.height;
        },
        setHeight: function (value) {
            this.content.style.height = ExpressCraft.Helper.toHtmlValue(value);
        },
        getLeft: function () {
            return this.content.style.left;
        },
        setLeft: function (value) {
            this.content.style.left = ExpressCraft.Helper.toHtmlValue(value);
        },
        getTop: function () {
            return this.content.style.top;
        },
        setTop: function (value) {
            this.content.style.top = ExpressCraft.Helper.toHtmlValue(value);
        },
        getSize: function () {
            return new ExpressCraft.Vector2.$ctor1(this.getWidth(), this.getHeight());
        },
        setSize: function (value) {
            this.setWidth(value.x);
            this.setHeight(value.y);
        },
        getLocation: function () {
            return new ExpressCraft.Vector2.$ctor1(this.getLeft(), this.getTop());
        },
        setLocation: function (value) {
            this.setLeft(value.x);
            this.setTop(value.y);
        },
        getBounds: function () {
            return new ExpressCraft.Vector4.$ctor1(this.getLeft(), this.getTop(), this.getWidth(), this.getHeight());
        },
        setBounds: function (value) {
            this.setLeft(value.x);
            this.setTop(value.y);
            this.setWidth(value.z);
            this.setHeight(value.m);
        },
        setAttribute: function (name, value) {
            this.content.setAttribute(name, ExpressCraft.Helper.toStr(value));

            return this;
        },
        getAttribute: function (name) {
            return this.content.getAttribute(name);
        },
        getAttributei: function (name) {
            return parseInt(this.content.getAttribute(name));
        },
        getAttributef: function (name) {
            return parseFloat(this.content.getAttribute(name));
        },
        render: function () {
            this.setHasRendered(true);
        },
        changeState: function (s, sf) {
            if (sf === void 0) { sf = "disabled"; }
            if (s) {
                this.content.classList.remove(sf);
            } else {
                this.content.classList.add(sf);
            }
        }
    });

    Bridge.ns("ExpressCraft.Control", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.Control, {
        f1: function (ev) {
            if (!(Bridge.is(this, ExpressCraft.ToolTipControl))) {
                ExpressCraft.Form.setActiveToolTip(this._toolTip);
            }
        },
        f2: function (ev) {
            if (!(Bridge.is(this, ExpressCraft.ToolTipControl))) {
                ExpressCraft.Form.setActiveToolTip(null);
            }
        }
    });

    Bridge.define("ExpressCraft.AceModeTypes", {
        $kind: "enum",
        statics: {
            abap: 0,
            abc: 1,
            actionscript: 2,
            ada: 3,
            apache_conf: 4,
            asciidoc: 5,
            assembly_x86: 6,
            autohotkey: 7,
            batchfile: 8,
            bro: 9,
            c_cpp: 10,
            c9search: 11,
            cirru: 12,
            clojure: 13,
            cobol: 14,
            coffee: 15,
            coldfusion: 16,
            csharp: 17,
            css: 18,
            curly: 19,
            d: 20,
            dart: 21,
            diff: 22,
            dockerfile: 23,
            dot: 24,
            drools: 25,
            dummy: 26,
            dummysyntax: 27,
            eiffel: 28,
            ejs: 29,
            elixir: 30,
            elm: 31,
            erlang: 32,
            forth: 33,
            fortran: 34,
            ftl: 35,
            gcode: 36,
            gherkin: 37,
            gitignore: 38,
            glsl: 39,
            gobstones: 40,
            golang: 41,
            groovy: 42,
            haml: 43,
            handlebars: 44,
            haskell: 45,
            haskell_cabal: 46,
            haxe: 47,
            hjson: 48,
            html: 49,
            html_elixir: 50,
            html_ruby: 51,
            ini: 52,
            io: 53,
            jack: 54,
            jade: 55,
            java: 56,
            javascript: 57,
            json: 58,
            jsoniq: 59,
            jsp: 60,
            jsx: 61,
            julia: 62,
            kotlin: 63,
            latex: 64,
            less: 65,
            liquid: 66,
            lisp: 67,
            livescript: 68,
            logiql: 69,
            lsl: 70,
            lua: 71,
            luapage: 72,
            lucene: 73,
            makefile: 74,
            markdown: 75,
            mask: 76,
            matlab: 77,
            maze: 78,
            mel: 79,
            mushcode: 80,
            mysql: 81,
            nix: 82,
            nsis: 83,
            objectivec: 84,
            ocaml: 85,
            pascal: 86,
            perl: 87,
            pgsql: 88,
            php: 89,
            powershell: 90,
            praat: 91,
            prolog: 92,
            properties: 93,
            protobuf: 94,
            python: 95,
            r: 96,
            razor: 97,
            rdoc: 98,
            rhtml: 99,
            rst: 100,
            ruby: 101,
            rust: 102,
            sass: 103,
            scad: 104,
            scala: 105,
            scheme: 106,
            scss: 107,
            sh: 108,
            sjs: 109,
            smarty: 110,
            snippets: 111,
            soy_template: 112,
            space: 113,
            sql: 114,
            sqlserver: 115,
            stylus: 116,
            svg: 117,
            swift: 118,
            tcl: 119,
            tex: 120,
            text: 121,
            textile: 122,
            toml: 123,
            tsx: 124,
            twig: 125,
            typescript: 126,
            vala: 127,
            vbscript: 128,
            velocity: 129,
            verilog: 130,
            vhdl: 131,
            wollok: 132,
            xml: 133,
            xquery: 134,
            yaml: 135,
            django: 136
        }
    });

    Bridge.define("ExpressCraft.AceThemeTypes", {
        $kind: "enum",
        statics: {
            label: 0,
            chrome: 1,
            clouds: 2,
            crimson_editor: 3,
            dawn: 4,
            dreamweaver: 5,
            eclipse: 6,
            github: 7,
            solarized_light: 8,
            textmate: 9,
            tomorrow: 10,
            xcode: 11,
            clouds_midnight: 12,
            cobalt: 13,
            idle_fingers: 14,
            kr_theme: 15,
            merbivore: 16,
            merbivore_soft: 17,
            mono_industrial: 18,
            monokai: 19,
            pastel_on_dark: 20,
            solarized_dark: 21,
            terminal: 22,
            tomorrow_night: 23,
            tomorrow_night_blue: 24,
            tomorrow_night_bright: 25,
            tomorrow_night_eighties: 26,
            twilight: 27,
            vibrant_ink: 28
        }
    });

    Bridge.define("ExpressCraft.App", {
        $main: function () {
            ExpressCraft.Settings.setup();
        }
    });

    Bridge.define("ExpressCraft.Application", {
        statics: {
            mainForm: null,
            _applicationDefition: 2,
            getAplicationDefition: function () {
                return ExpressCraft.Application._applicationDefition;
            },
            close: function () {
                if (ExpressCraft.Application.mainForm != null) {
                    ExpressCraft.Application.mainForm.close();
                }
                window.close();
                window.location.reload();
            },
            setApplicationDefinition: function (applicationDefition) {
                if (applicationDefition === void 0) { applicationDefition = 1; }
                ExpressCraft.Application._applicationDefition = applicationDefition;
                switch (applicationDefition) {
                    case ExpressCraft.ApplicationDefitnion.BrowserConsole: 
                        			
					Bridge.Console.log = function(message) { console.log(message); };
					Bridge.Console.error = function(message) { console.error(message); };
					Bridge.Console.debug = function(message) { console.debug(message); };
					Bridge.Console.clear = function() { console.clear(); };
					
                        break;
                    case ExpressCraft.ApplicationDefitnion.ExpressCraftConsole: 
                        
					Bridge.Console.log = function(message) { ExpressCraft.ConsoleForm.log(message) };
					Bridge.Console.error = function(message) { ExpressCraft.ConsoleForm.log(message, ExpressCraft.ConsoleLogType.Error); };
					Bridge.Console.debug = function(message) { ExpressCraft.ConsoleForm.log(message, ExpressCraft.ConsoleLogType.Debug); };
					console.clear = function() { ExpressCraft.ConsoleForm.clear(); };
					
                        break;
                    default: 
                        break;
                }
            },
            run: function (_Mainform) {
                ExpressCraft.Application.mainForm = _Mainform;
                ExpressCraft.Application.mainForm.showStartNewLevel();
            }
        }
    });

    Bridge.define("ExpressCraft.ApplicationDefitnion", {
        $kind: "enum",
        statics: {
            None: 0,
            BrowserConsole: 1,
            BridgeConsole: 2,
            ExpressCraftConsole: 3
        }
    });

    Bridge.define("ExpressCraft.Color", {
        $kind: "struct",
        statics: {
            ctor: function () {
                ExpressCraft.Color.empty = new ExpressCraft.Color.ctor();
                ExpressCraft.Color.stateKnownColorValid = 1;
                ExpressCraft.Color.stateARGBValueValid = 2;
                ExpressCraft.Color.stateValueMask = ExpressCraft.Color.stateARGBValueValid;
                ExpressCraft.Color.stateNameValid = 8;
                ExpressCraft.Color.notDefinedValue = System.Int64(0);
            },
            stateKnownColorValid: 0,
            stateARGBValueValid: 0,
            stateValueMask: 0,
            stateNameValid: 0,
            notDefinedValue: System.Int64(0),
            ARGBAlphaShift: 24,
            ARGBRedShift: 16,
            ARGBGreenShift: 8,
            ARGBBlueShift: 0,
            q: 255.0,
            config: {
                init: function () {
                    this.empty = new ExpressCraft.Color();
                }
            },
            getTransparent: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Transparent);
            },
            getAliceBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.AliceBlue);
            },
            getAntiqueWhite: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.AntiqueWhite);
            },
            getAqua: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Aqua);
            },
            getAquamarine: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Aquamarine);
            },
            getAzure: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Azure);
            },
            getBeige: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Beige);
            },
            getBisque: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Bisque);
            },
            getBlack: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Black);
            },
            getBlanchedAlmond: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.BlanchedAlmond);
            },
            getBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Blue);
            },
            getBlueViolet: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.BlueViolet);
            },
            getBrown: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Brown);
            },
            getBurlyWood: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.BurlyWood);
            },
            getCadetBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.CadetBlue);
            },
            getChartreuse: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Chartreuse);
            },
            getChocolate: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Chocolate);
            },
            getCoral: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Coral);
            },
            getCornflowerBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.CornflowerBlue);
            },
            getCornsilk: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Cornsilk);
            },
            getCrimson: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Crimson);
            },
            getCyan: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Cyan);
            },
            getDarkBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkBlue);
            },
            getDarkCyan: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkCyan);
            },
            getDarkGoldenrod: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkGoldenrod);
            },
            getDarkGray: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkGray);
            },
            getDarkGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkGreen);
            },
            getDarkKhaki: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkKhaki);
            },
            getDarkMagenta: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkMagenta);
            },
            getDarkOliveGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkOliveGreen);
            },
            getDarkOrange: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkOrange);
            },
            getDarkOrchid: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkOrchid);
            },
            getDarkRed: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkRed);
            },
            getDarkSalmon: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSalmon);
            },
            getDarkSeaGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSeaGreen);
            },
            getDarkSlateBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSlateBlue);
            },
            getDarkSlateGray: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSlateGray);
            },
            getDarkTurquoise: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkTurquoise);
            },
            getDarkViolet: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkViolet);
            },
            getDeepPink: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DeepPink);
            },
            getDeepSkyBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DeepSkyBlue);
            },
            getDimGray: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DimGray);
            },
            getDodgerBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DodgerBlue);
            },
            getFirebrick: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Firebrick);
            },
            getFloralWhite: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.FloralWhite);
            },
            getForestGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.ForestGreen);
            },
            getFuchsia: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Fuchsia);
            },
            getGainsboro: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Gainsboro);
            },
            getGhostWhite: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.GhostWhite);
            },
            getGold: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Gold);
            },
            getGoldenrod: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Goldenrod);
            },
            getGray: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Gray);
            },
            getGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Green);
            },
            getGreenYellow: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.GreenYellow);
            },
            getHoneydew: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Honeydew);
            },
            getHotPink: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.HotPink);
            },
            getIndianRed: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.IndianRed);
            },
            getIndigo: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Indigo);
            },
            getIvory: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Ivory);
            },
            getKhaki: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Khaki);
            },
            getLavender: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Lavender);
            },
            getLavenderBlush: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LavenderBlush);
            },
            getLawnGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LawnGreen);
            },
            getLemonChiffon: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LemonChiffon);
            },
            getLightBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightBlue);
            },
            getLightCoral: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightCoral);
            },
            getLightCyan: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightCyan);
            },
            getLightGoldenrodYellow: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightGoldenrodYellow);
            },
            getLightGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightGreen);
            },
            getLightGray: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightGray);
            },
            getLightPink: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightPink);
            },
            getLightSalmon: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSalmon);
            },
            getLightSeaGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSeaGreen);
            },
            getLightSkyBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSkyBlue);
            },
            getLightSlateGray: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSlateGray);
            },
            getLightSteelBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSteelBlue);
            },
            getLightYellow: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightYellow);
            },
            getLime: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Lime);
            },
            getLimeGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LimeGreen);
            },
            getLinen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Linen);
            },
            getMagenta: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Magenta);
            },
            getMaroon: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Maroon);
            },
            getMediumAquamarine: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumAquamarine);
            },
            getMediumBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumBlue);
            },
            getMediumOrchid: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumOrchid);
            },
            getMediumPurple: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumPurple);
            },
            getMediumSeaGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumSeaGreen);
            },
            getMediumSlateBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumSlateBlue);
            },
            getMediumSpringGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumSpringGreen);
            },
            getMediumTurquoise: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumTurquoise);
            },
            getMediumVioletRed: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumVioletRed);
            },
            getMidnightBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MidnightBlue);
            },
            getMintCream: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MintCream);
            },
            getMistyRose: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MistyRose);
            },
            getMoccasin: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Moccasin);
            },
            getNavajoWhite: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.NavajoWhite);
            },
            getNavy: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Navy);
            },
            getOldLace: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.OldLace);
            },
            getOlive: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Olive);
            },
            getOliveDrab: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.OliveDrab);
            },
            getOrange: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Orange);
            },
            getOrangeRed: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.OrangeRed);
            },
            getOrchid: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Orchid);
            },
            getPaleGoldenrod: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleGoldenrod);
            },
            getPaleGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleGreen);
            },
            getPaleTurquoise: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleTurquoise);
            },
            getPaleVioletRed: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleVioletRed);
            },
            getPapayaWhip: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PapayaWhip);
            },
            getPeachPuff: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PeachPuff);
            },
            getPeru: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Peru);
            },
            getPink: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Pink);
            },
            getPlum: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Plum);
            },
            getPowderBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PowderBlue);
            },
            getPurple: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Purple);
            },
            getRed: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Red);
            },
            getRosyBrown: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.RosyBrown);
            },
            getRoyalBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.RoyalBlue);
            },
            getSaddleBrown: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SaddleBrown);
            },
            getSalmon: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Salmon);
            },
            getSandyBrown: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SandyBrown);
            },
            getSeaGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SeaGreen);
            },
            getSeaShell: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SeaShell);
            },
            getSienna: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Sienna);
            },
            getSilver: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Silver);
            },
            getSkyBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SkyBlue);
            },
            getSlateBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SlateBlue);
            },
            getSlateGray: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SlateGray);
            },
            getSnow: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Snow);
            },
            getSpringGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SpringGreen);
            },
            getSteelBlue: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SteelBlue);
            },
            getTan: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Tan);
            },
            getTeal: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Teal);
            },
            getThistle: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Thistle);
            },
            getTomato: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Tomato);
            },
            getTurquoise: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Turquoise);
            },
            getViolet: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Violet);
            },
            getWheat: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Wheat);
            },
            getWhite: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.White);
            },
            getWhiteSmoke: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.WhiteSmoke);
            },
            getYellow: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Yellow);
            },
            getYellowGreen: function () {
                return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.YellowGreen);
            },
            checkByte: function (value) {
                if ((value < 0) || (value > 255)) {
                    throw new System.ArgumentException("InvalidEx2BoundArgument");
                }
            },
            makeArgb: function (alpha, red, green, blue) {
                return System.Int64.clip64(Bridge.Int.clipu64((((red << 16) | (green << 8)) | blue) | (alpha << 24)).and(System.UInt64(System.Int64([-1,0]))));
            },
            fromArgb: function (argb) {
                return new ExpressCraft.Color.$ctor2(System.Int64(argb).and((System.Int64([-1,0]))), ExpressCraft.Color.stateARGBValueValid, null, 0);
            },
            fromArgb$3: function (alpha, red, green, blue) {
                ExpressCraft.Color.checkByte(alpha);
                ExpressCraft.Color.checkByte(red);
                ExpressCraft.Color.checkByte(green);
                ExpressCraft.Color.checkByte(blue);
                return new ExpressCraft.Color.$ctor2(ExpressCraft.Color.makeArgb((alpha & 255), (red & 255), (green & 255), (blue & 255)), ExpressCraft.Color.stateARGBValueValid, null, 0);
            },
            fromArgb$1: function (alpha, baseColor) {
                ExpressCraft.Color.checkByte(alpha);
                return new ExpressCraft.Color.$ctor2(ExpressCraft.Color.makeArgb((alpha & 255), baseColor.getR(), baseColor.getG(), baseColor.getB()), ExpressCraft.Color.stateARGBValueValid, null, 0);
            },
            fromArgb$2: function (red, green, blue) {
                return ExpressCraft.Color.fromArgb$3(255, red, green, blue);
            },
            isEnumValid: function (enumValue, value, minValue, maxValue) {
                return ((value >= minValue) && (value <= maxValue));
            },
            fromKnownColor: function (color) {
                return new ExpressCraft.Color.$ctor1(color);
            },
            fromHex: function (value) {
                if (System.String.startsWith(value, "#")) {
                    return ExpressCraft.Color.fromHex(value.substr(1));
                } else {
                    return ExpressCraft.Color.fromArgb(parseInt(value));
                }
            },
            op_Implicit$1: function (color) {
                return color.toHex();
            },
            op_Implicit: function (hexValue) {
                return ExpressCraft.Color.fromHex(hexValue);
            },
            op_Equality: function (left, right) {
                if (((left.value.ne(right.value)) || (left.state !== right.state)) || (left.knownColor !== right.knownColor)) {
                    return false;
                }
                return ((Bridge.referenceEquals(left.name, right.name)) || (((left.name != null) && (right.name != null)) && System.String.equals(left.name, right.name)));
            },
            op_Inequality: function (left, right) {
                return !(ExpressCraft.Color.op_Equality(left, right));
            },
            getDefaultValue: function () { return new ExpressCraft.Color(); }
        },
        name: null,
        value: System.Int64(0),
        knownColor: 0,
        state: 0,
        $ctor1: function (knownColor) {
            this.$initialize();
            this.value = System.Int64(0);
            this.state = ExpressCraft.Color.stateKnownColorValid;
            this.name = null;
            this.knownColor = Bridge.Int.sxs(knownColor & 65535);
        },
        $ctor2: function (value, state, name, knownColor) {
            this.$initialize();
            this.value = value;
            this.state = state;
            this.name = name;
            this.knownColor = Bridge.Int.sxs(knownColor & 65535);
        },
        ctor: function () {
            this.$initialize();
        },
        getR: function () {
            return System.Int64.clipu8((this.getValue().shr(16)).and(System.Int64(255)));
        },
        getG: function () {
            return System.Int64.clipu8((this.getValue().shr(8)).and(System.Int64(255)));
        },
        getB: function () {
            return System.Int64.clipu8(this.getValue().and(System.Int64(255)));
        },
        getA: function () {
            return System.Int64.clipu8((this.getValue().shr(24)).and(System.Int64(255)));
        },
        getIsKnownColor: function () {
            return ((this.state & ExpressCraft.Color.stateKnownColorValid) > 0);
        },
        getIsEmpty: function () {
            return (this.state === 0);
        },
        getIsNamedColor: function () {
            if ((this.state & ExpressCraft.Color.stateNameValid) === 0) {
                return this.getIsKnownColor();
            }
            return true;
        },
        getIsSystemColor: function () {
            if (!this.getIsKnownColor()) {
                return false;
            }
            if (this.knownColor > 26) {
                return (this.knownColor > 167);
            }
            return true;
        },
        getNameAndARGBValue: function () {
            return System.String.format("{{Name={0}, ARGB=({1}, {2}, {3}, {4})}}", this.getName(), this.getA(), this.getR(), this.getG(), this.getB());
        },
        getName: function () {
            if ((this.state & ExpressCraft.Color.stateNameValid) !== 0) {
                return this.name;
            }
            if (!this.getIsKnownColor()) {
                return System.Convert.toStringInBase(this.value, 16, 11);
            }
            var str = ExpressCraft.KnownColorTable.knownColorToName(this.knownColor);
            if (str != null) {
                return str;
            }
            return this.knownColor.toString();
        },
        getValue: function () {
            if ((this.state & ExpressCraft.Color.stateValueMask) !== 0) {
                return this.value;
            }
            if (this.getIsKnownColor()) {
                return System.Int64(ExpressCraft.KnownColorTable.knownColorToArgb(this.knownColor));
            }
            return ExpressCraft.Color.notDefinedValue;
        },
        componentToHex: function (value) {
            var x = value.toString(16);
            return System.String.concat((x.length === 1 ? "0" : ""), x);
        },
        toHex: function () {
            if (this.getA() !== 255) {
                return System.String.format("#{0}{1}{2}{3}", this.componentToHex(this.getA()), this.componentToHex(this.getR()), this.componentToHex(this.getG()), this.componentToHex(this.getB())); // "#" + (155).toString(16) + (102).toString(16) + (102).toString(16);
            } else {
                return System.String.format("#{0}{1}{2}", this.componentToHex(this.getR()), this.componentToHex(this.getG()), this.componentToHex(this.getB())); // "#" + (155).toString(16) + (102).toString(16) + (102).toString(16);
            }
        },
        getBrightness: function () {
            var z = this.getR() / ExpressCraft.Color.q;
            var x = this.getG() / ExpressCraft.Color.q;
            var c = this.getB() / ExpressCraft.Color.q;
            var v = z;
            var b = z;
            if (x > v) {
                v = x;
            }
            if (c > v) {
                v = c;
            }
            if (x < b) {
                b = x;
            }
            if (c < b) {
                b = c;
            }
            return ((v + b) / 2.0);
        },
        getHue: function () {
            if ((this.getR() === this.getG()) && (this.getG() === this.getB())) {
                return 0.0;
            }
            var z = this.getR() / ExpressCraft.Color.q;
            var x = this.getG() / ExpressCraft.Color.q;
            var c = this.getB() / ExpressCraft.Color.q;
            var v = 0.0;
            var b = z;
            var n = z;
            if (x > b) {
                b = x;
            }
            if (c > b) {
                b = c;
            }
            if (x < n) {
                n = x;
            }
            if (c < n) {
                n = c;
            }
            var num6 = b - n;
            if (z === b) {
                v = (x - c) / num6;
            } else if (x === b) {
                v = 2.0 + ((c - z) / num6);
            } else if (c === b) {
                v = 4.0 + ((z - x) / num6);
            }
            v *= 60.0;
            if (v < 0.0) {
                v += 360.0;
            }
            return v;
        },
        getSaturation: function () {
            var z = this.getR() / ExpressCraft.Color.q;
            var x = this.getG() / ExpressCraft.Color.q;
            var c = this.getB() / ExpressCraft.Color.q;
            var v = 0.0;
            var b = z;
            var n = z;
            if (x > b) {
                b = x;
            }
            if (c > b) {
                b = c;
            }
            if (x < n) {
                n = x;
            }
            if (c < n) {
                n = c;
            }
            if (b === n) {
                return v;
            }
            var m = (b + n) / 2.0;
            if (m <= 0.5) {
                return ((b - n) / (b + n));
            }
            return ((b - n) / ((2.0 - b) - n));
        },
        toArgb: function () {
            return System.Int64.clip32(this.getValue());
        },
        toKnownColor: function () {
            return this.knownColor;
        },
        toString: function () {
            var builder = new System.Text.StringBuilder("", 32);
            builder.append(Bridge.Reflection.getTypeName(Bridge.getType(this)));
            builder.append(" [");
            if ((this.state & ExpressCraft.Color.stateNameValid) !== 0) {
                builder.append(this.getName());
            } else if ((this.state & ExpressCraft.Color.stateKnownColorValid) !== 0) {
                builder.append(this.getName());
            } else if ((this.state & ExpressCraft.Color.stateValueMask) !== 0) {
                builder.appendFormat("A={0}, R={1}, G={2}, B={3}", this.getA(), this.getR(), this.getG(), this.getB());
            } else {
                builder.append("Empty");
            }
            builder.append("]");
            return builder.toString();
        },
        equals: function (obj) {
            if (Bridge.is(obj, ExpressCraft.Color)) {
                var color = System.Nullable.getValue(Bridge.cast(obj, ExpressCraft.Color));
                if (((this.value.equals(color.value)) && (this.state === color.state)) && (this.knownColor === color.knownColor)) {
                    return ((Bridge.referenceEquals(this.name, color.name)) || (((this.name != null) && (color.name != null)) && System.String.equals(this.name, this.name)));
                }
            }
            return false;
        },
        getHashCode: function () {
            return ((Bridge.getHashCode(this.value) ^ Bridge.getHashCode(this.state)) ^ Bridge.getHashCode(this.knownColor));
        },
        $clone: function (to) {
            var s = to || new ExpressCraft.Color();
            s.name = this.name;
            s.value = this.value;
            s.knownColor = this.knownColor;
            s.state = this.state;
            return s;
        }
    });

    Bridge.define("ExpressCraft.ComboBoxTypes", {
        $kind: "enum",
        statics: {
            Default: 0
        }
    });

    Bridge.define("ExpressCraft.ConsoleLogType", {
        $kind: "enum",
        statics: {
            Log: 0,
            Debug: 1,
            Error: 2
        }
    });

    Bridge.define("ExpressCraft.ContextItem", {
        caption: "",
        onItemClick: null,
        beginGroup: false,
        enabled: true,
        ctor: function () {
            this.$initialize();

        },
        $ctor2: function (caption, beginGroup) {
            if (beginGroup === void 0) { beginGroup = false; }

            this.$initialize();
            this.caption = caption;
            this.beginGroup = beginGroup;
        },
        $ctor1: function (caption, _OnItemClick, beginGroup) {
            if (beginGroup === void 0) { beginGroup = false; }

            this.$initialize();
            this.caption = caption;
            this.beginGroup = beginGroup;
            this.onItemClick = _OnItemClick;

        }
    });

    Bridge.define("ExpressCraft.DataColumn", {
        fieldName: null,
        dataType: 0,
        getDisplayValue$1: function (rowIndex, formatString) {
            switch (this.dataType) {
                default: 
                case ExpressCraft.DataType.Object: 
                    return System.String.format(formatString, (Bridge.cast(this, ExpressCraft.DataColumnObject).cells.getItem(rowIndex)));
                case ExpressCraft.DataType.DateTime: 
                    var obj = Bridge.cast(this, ExpressCraft.DataColumnDateTime).cells.getItem(rowIndex);
                    if (obj == null) {
                        return "";
                    }
                    if (Bridge.is(obj, Date)) {
                        return System.String.format(formatString, Bridge.cast(obj, Date));
                    }
                    var d = { };
                    if (Bridge.Date.tryParse(obj, null, d)) {
                        return System.String.format(formatString, d.v);
                    }
                    var str = Bridge.as(obj, String);
                    if (System.String.isNullOrWhiteSpace(str)) {
                        return "";
                    }
                    return System.String.format(formatString, str);
                case ExpressCraft.DataType.String: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnString).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Integer: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnInteger).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Long: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnLong).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Float: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnFloat).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Double: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnDouble).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Decimal: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnDecimal).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Byte: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnByte).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Short: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnShort).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Bool: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnBool).cells.getItem(rowIndex));
            }
        },
        getDisplayValue: function (rowIndex) {
            switch (this.dataType) {
                default: 
                case ExpressCraft.DataType.Object: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnObject).cells.getItem(rowIndex));
                case ExpressCraft.DataType.DateTime: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnDateTime).cells.getItem(rowIndex));
                case ExpressCraft.DataType.String: 
                    return Bridge.cast(this, ExpressCraft.DataColumnString).cells.getItem(rowIndex);
                case ExpressCraft.DataType.Integer: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnInteger).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Long: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnLong).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Float: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnFloat).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Double: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnDouble).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Decimal: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnDecimal).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Byte: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnByte).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Bool: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnBool).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Short: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnShort).cells.getItem(rowIndex));
            }
        },
        getCellValue: function (rowIndex) {
            switch (this.dataType) {
                default: 
                case ExpressCraft.DataType.Object: 
                    return Bridge.cast(this, ExpressCraft.DataColumnObject).cells.getItem(rowIndex);
                case ExpressCraft.DataType.DateTime: 
                    return Bridge.cast(this, ExpressCraft.DataColumnDateTime).cells.getItem(rowIndex);
                case ExpressCraft.DataType.String: 
                    return Bridge.cast(this, ExpressCraft.DataColumnString).cells.getItem(rowIndex);
                case ExpressCraft.DataType.Integer: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnInteger).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Long: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnLong).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Float: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnFloat).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Double: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnDouble).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Decimal: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnDecimal).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Byte: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnByte).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Bool: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnBool).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Short: 
                    return (Bridge.cast(this, ExpressCraft.DataColumnShort).cells.getItem(rowIndex));
            }
        }
    });

    Bridge.define("ExpressCraft.DataItem", {
        text: null,
        value: null,
        $ctor1: function (text, value) {
            this.$initialize();
            this.text = text;
            this.value = value;
        },
        ctor: function (text) {
            this.$initialize();
            this.text = text;
            this.value = text;
        }
    });

    Bridge.define("ExpressCraft.DataRow", {
        parentTable: null,
        rowIndex: -1,
        batchData: null,
        ctor: function () {
            this.$initialize();

        },
        $ctor2: function (columnLength) {
            this.$initialize();
            this.parentTable = null;
            this.rowIndex = -1;
            this.batchData = System.Array.init(columnLength, null, Object);
        },
        $ctor1: function (parentTable, rowIndex) {
            if (rowIndex === void 0) { rowIndex = -1; }

            this.$initialize();
            this.parentTable = parentTable;
            this.rowIndex = rowIndex;
            if (rowIndex === -1) {
                this.batchData = System.Array.init(parentTable.getColumnCount(), null, Object);
            }
        },
        getItem: function (columnIndex) {
            if (this.rowIndex === -1) {
                return this.batchData[columnIndex];
            }
            var col = this.parentTable.columns.getItem(columnIndex);
            return col.cells.items[this.rowIndex];
        },
        setItem: function (columnIndex, value) {
            if (this.rowIndex === -1) {
                if (!Bridge.referenceEquals(this.batchData[columnIndex], value)) {
                    this.batchData[columnIndex] = value;
                    this.parentTable.requireOnDataChangeEvent();
                }

                return;
            }
            var col = this.parentTable.columns.getItem(columnIndex);
            if (!Bridge.referenceEquals(col.cells.items[this.rowIndex], value)) {
                col.cells.items[this.rowIndex] = value;
                this.parentTable.requireOnDataChangeEvent();
            }
        },
        getOfflineDataRow: function () {
            var dr = new ExpressCraft.DataRow.$ctor2(this.parentTable.getColumnCount());
            var data = System.Array.init(this.parentTable.getColumnCount(), null, Object);
            for (var i = 0; i < this.parentTable.getColumnCount(); i = (i + 1) | 0) {
                data[i] = this.getItem(i);
            }
            dr.batchData = data;
            return dr;
        }
    });

    Bridge.define("ExpressCraft.DataTable", {
        columns: null,
        _inDataChange: false,
        _requestedOnDataChange: false,
        _ColCount: 0,
        _RowCount: 0,
        newRows: null,
        config: {
            events: {
                OnDataSourceChanged: null
            },
            init: function () {
                this.columns = new (System.Collections.Generic.List$1(ExpressCraft.DataColumn))();
                this.newRows = new (System.Collections.Generic.List$1(ExpressCraft.DataRow))();
            }
        },
        getColumnCount: function () {
            return this._ColCount;
        },
        getRowCount: function () {
            return this._RowCount;
        },
        getItem: function (rowIndex) {
            return new ExpressCraft.DataRow.$ctor1(this, rowIndex);
        },
        requireOnDataChangeEvent: function () {
            if (!this._inDataChange) {
                this._requestedOnDataChange = false;
                if (!Bridge.staticEquals(this.OnDataSourceChanged, null)) {
                    this.OnDataSourceChanged(this, null);
                }
            } else {
                this._requestedOnDataChange = true;
            }
        },
        clearRows: function () {
            this._RowCount = 0;
            for (var i = 0; i < this.columns.getCount(); i = (i + 1) | 0) {
                this.clearCells(this.columns.getItem(i));
            }
        },
        clearCells$1: function (T, _column) {
            var _col = _column;
            _col.cells = new (System.Collections.Generic.List$1(T))();
        },
        clearCells: function (_column) {
            switch (_column.dataType) {
                default: 
                case ExpressCraft.DataType.Object: 
                    this.clearCells$1(Object, _column);
                    break;
                case ExpressCraft.DataType.DateTime: 
                    this.clearCells$1(System.Nullable$1(Date), _column);
                    break;
                case ExpressCraft.DataType.String: 
                    this.clearCells$1(String, _column);
                    break;
                case ExpressCraft.DataType.Integer: 
                    this.clearCells$1(System.Nullable$1(System.Int32), _column);
                    break;
                case ExpressCraft.DataType.Long: 
                    this.clearCells$1(System.Nullable$1(System.Int64), _column);
                    break;
                case ExpressCraft.DataType.Float: 
                    this.clearCells$1(System.Nullable$1(System.Single), _column);
                    break;
                case ExpressCraft.DataType.Double: 
                    this.clearCells$1(System.Nullable$1(System.Double), _column);
                    break;
                case ExpressCraft.DataType.Decimal: 
                    this.clearCells$1(System.Nullable$1(System.Decimal), _column);
                    break;
                case ExpressCraft.DataType.Bool: 
                    this.clearCells$1(System.Nullable$1(Boolean), _column);
                    break;
                case ExpressCraft.DataType.Byte: 
                    this.clearCells$1(System.Nullable$1(System.Byte), _column);
                    break;
                case ExpressCraft.DataType.Short: 
                    this.clearCells$1(System.Nullable$1(System.Int16), _column);
                    break;
            }
            this.requireOnDataChangeEvent();
        },
        getColumnByDataType: function (type) {
            if (type === void 0) { type = 0; }
            switch (type) {
                default: 
                case ExpressCraft.DataType.Object: 
                    return new ExpressCraft.DataColumnObject();
                case ExpressCraft.DataType.DateTime: 
                    return new ExpressCraft.DataColumnDateTime();
                case ExpressCraft.DataType.String: 
                    return new ExpressCraft.DataColumnString();
                case ExpressCraft.DataType.Integer: 
                    return new ExpressCraft.DataColumnInteger();
                case ExpressCraft.DataType.Long: 
                    return new ExpressCraft.DataColumnLong();
                case ExpressCraft.DataType.Float: 
                    return new ExpressCraft.DataColumnFloat();
                case ExpressCraft.DataType.Double: 
                    return new ExpressCraft.DataColumnDouble();
                case ExpressCraft.DataType.Decimal: 
                    return new ExpressCraft.DataColumnDecimal();
                case ExpressCraft.DataType.Bool: 
                    return new ExpressCraft.DataColumnBool();
                case ExpressCraft.DataType.Byte: 
                    return new ExpressCraft.DataColumnByte();
                case ExpressCraft.DataType.Short: 
                    return new ExpressCraft.DataColumnShort();
            }
        },
        addColumn: function (fieldName, type) {
            if (type === void 0) { type = 0; }
            var col = this.getColumnByDataType(type);
            col.fieldName = fieldName;

            this.columns.add(col);
            this._ColCount = this.columns.getCount();

            this.requireOnDataChangeEvent();
        },
        beginNewRow: function (EstimatedNewRows) {
            this.newRows = new (System.Collections.Generic.List$1(ExpressCraft.DataRow))(EstimatedNewRows);
            this.beginDataUpdate();
        },
        addRow: function () {
            var dr = new ExpressCraft.DataRow.$ctor1(this, Bridge.identity(this._RowCount, (this._RowCount = (this._RowCount + 1) | 0)));
            var colLength = this.columns.getCount();
            for (var x = 0; x < colLength; x = (x + 1) | 0) {
                var col = this.columns.getItem(x);
                col.cells.add(null);
            }

            this.requireOnDataChangeEvent();

            return dr;
        },
        addRow$1: function (row) {
            if (row === void 0) { row = []; }
            if (row.length === this.getColumnCount()) {
                this._RowCount = (this._RowCount + 1) | 0;
                var colLength = this.columns.getCount();
                for (var x = 0; x < colLength; x = (x + 1) | 0) {
                    var col = this.columns.getItem(x);
                    col.cells.add(row[x]);
                }
                this.requireOnDataChangeEvent();
            }
        },
        newRow: function () {
            var dr = new ExpressCraft.DataRow.$ctor1(this);

            this.newRows.add(dr);

            return dr;
        },
        acceptNewRows: function () {
            if (this.newRows == null || this.newRows.getCount() === 0) {
                return;
            }
            var colLength = this.columns.getCount();
            var rowLength = this.newRows.getCount();
            var colN1 = (colLength - 1) | 0;

            for (var x = 0; x < colLength; x = (x + 1) | 0) {
                var col = this.columns.getItem(x);
                var DataCells = System.Array.init(rowLength, null, Object);

                if (x === 0) {
                    for (var y = 0; y < rowLength; y = (y + 1) | 0) {
                        this.newRows.getItem(y).rowIndex = Bridge.identity(this._RowCount, (this._RowCount = (this._RowCount + 1) | 0));
                        DataCells[y] = this.newRows.getItem(y).batchData[x];
                    }
                } else if (x === colN1) {
                    for (var y1 = 0; y1 < rowLength; y1 = (y1 + 1) | 0) {
                        DataCells[y1] = this.newRows.getItem(y1).batchData[x];
                        this.newRows.getItem(y1).batchData = null;
                    }
                } else {
                    for (var y2 = 0; y2 < rowLength; y2 = (y2 + 1) | 0) {
                        DataCells[y2] = this.newRows.getItem(y2).batchData[x];
                    }
                }
                col.cells.addRange(DataCells);

            }
            this.newRows.clear();

            this.endDataUpdate();
        },
        beginDataUpdate: function () {
            this._inDataChange = true;
            this._requestedOnDataChange = false;
        },
        endDataUpdate: function () {
            this._inDataChange = false;
            if (this._requestedOnDataChange) {
                this._requestedOnDataChange = false;
                if (!Bridge.staticEquals(this.OnDataSourceChanged, null)) {
                    this.OnDataSourceChanged(this, null);
                }
            }
        },
        rejectNewRows: function () {
            this.newRows.clear();
            this._inDataChange = false;
        }
    });

    Bridge.define("ExpressCraft.DataType", {
        $kind: "enum",
        statics: {
            Object: 0,
            DateTime: 1,
            String: 2,
            Integer: 3,
            Long: 4,
            Float: 5,
            Double: 6,
            Decimal: 7,
            Bool: 8,
            Byte: 9,
            Short: 10
        }
    });

    Bridge.define("ExpressCraft.DialogResult", {
        resultEnum: 0,
        callBack: null,
        ctor: function (resultEnum, callBack) {
            this.$initialize();
            this.resultEnum = resultEnum;
            this.callBack = callBack;
        },
        invokeIfResult: function (resultEnum) {
            if (resultEnum === this.resultEnum && !Bridge.staticEquals(this.callBack, null)) {
                this.callBack();
            }
        }
    });

    Bridge.define("ExpressCraft.DialogResultEnum", {
        $kind: "enum",
        statics: {
            None: 0,
            OK: 1,
            Cancel: 2,
            Abort: 3,
            Retry: 4,
            Ignore: 5,
            Yes: 6,
            No: 7
        }
    });

    Bridge.define("ExpressCraft.ExternalPlugin", {
        sourceUrl: null,
        setupCompleted: false,
        inLoad: false,
        onReady: null,
        ctor: function (sourceUrl) {
            this.$initialize();
            this.sourceUrl = sourceUrl;
        },
        setup: function () {
            if (!this.setupCompleted) {
                if (this.inLoad) {
                    return;
                }
                this.inLoad = true;

                document.head.appendChild(Bridge.merge(document.createElement('script'), {
                    onload: Bridge.fn.bind(this, $asm.$.ExpressCraft.ExternalPlugin.f1),
                    src: this.sourceUrl
                } ));
            }
        },
        usageCheck: function () {
            if (!this.setupCompleted) {
                throw new System.Exception(System.String.concat("'", this.sourceUrl, "' requires to be setup!"));
            }
            if (this.inLoad) {
                throw new System.Exception(System.String.concat("'", this.sourceUrl, "' is currently loading, Please try again in a few seconds!"));
            }
        }
    });

    Bridge.ns("ExpressCraft.ExternalPlugin", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ExternalPlugin, {
        f1: function (ele) {
            this.setupCompleted = true;
            this.inLoad = false;
            if (!Bridge.staticEquals(this.onReady, null)) {
                this.onReady();
            }
        }
    });

    Bridge.define("ExpressCraft.Firebase", {
        statics: {
            externalFireBase: null,
            displayName: null,
            photoURL: null,
            userSignedIn: false,
            config: {
                init: function () {
                    this.externalFireBase = new ExpressCraft.ExternalPlugin("https://www.gstatic.com/firebasejs/3.6.8/firebase.js");
                }
            },
            setup: function (OnReady) {
                if (OnReady === void 0) { OnReady = null; }
                ExpressCraft.Firebase.externalFireBase.onReady = OnReady;
                ExpressCraft.Firebase.externalFireBase.setup();
            },
            initializeApp: function (ApiKey, AuthDomain, DatabaseURL, ProjectId, StorageBucket, MessagingSenderId) {
                ExpressCraft.Firebase.externalFireBase.usageCheck();
                if (System.String.isNullOrWhiteSpace(ApiKey)) {
                    throw new System.Exception(System.String.format("Invalid Firebase {0} !", "ApiKey"));
                }
                if (System.String.isNullOrWhiteSpace(AuthDomain)) {
                    throw new System.Exception(System.String.format("Invalid Firebase {0}!", "AuthDomain"));
                }
                if (System.String.isNullOrWhiteSpace(DatabaseURL)) {
                    throw new System.Exception(System.String.format("Invalid Firebase {0}!", "DatabaseURL"));
                }
                if (System.String.isNullOrWhiteSpace(ProjectId)) {
                    throw new System.Exception(System.String.format("Invalid Firebase {0}!", "ProjectId"));
                }
                if (System.String.isNullOrWhiteSpace(StorageBucket)) {
                    throw new System.Exception(System.String.format("Invalid Firebase {0}!", "StorageBucket"));
                }
                if (System.String.isNullOrWhiteSpace(MessagingSenderId)) {
                    throw new System.Exception(System.String.format("Invalid Firebase {0}!", "MessagingSenderId"));
                }

                
			firebase.initializeApp({apiKey: ApiKey, authDomain: AuthDomain, databaseURL: DatabaseURL, projectId : ProjectId, storageBucket: StorageBucket, messagingSenderId: MessagingSenderId });
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					this.UserSignedIn = true;
					this.DisplayName = user.displayName;
					this.PhotoURL = user.photoURL;
				}else{
					this.UserSignedIn = false;
				}
			
			});
			
            },
            signIn: function () {
                			
			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
			
            },
            signOut: function () {
                			
			firebase.auth().signOut();
			
            },
            databaseRef: function (name) {
                var dataRef = firebase.database().ref(name);
                dataRef.off();
                return dataRef;
            },
            isSignedInWithFirebase: function () {
                return 
			if(firebase.auth().currentUser)
			{
				return true;
			}else
			{
				return false;
			};
            }
        }
    });

    Bridge.define("ExpressCraft.FixedSplitterPosition", {
        $kind: "enum",
        statics: {
            Panel1: 0,
            Panel2: 1,
            None: 2
        }
    });

    Bridge.define("ExpressCraft.FormButtonType", {
        $kind: "enum",
        statics: {
            Close: 0,
            Maximize: 1,
            Minimize: 2,
            Restore: 3,
            Help: 4
        }
    });

    Bridge.define("ExpressCraft.FormCollection", {
        formOwner: null,
        visibleForms: null,
        config: {
            init: function () {
                this.visibleForms = new (System.Collections.Generic.List$1(ExpressCraft.Form))();
            }
        },
        ctor: function (formOwner) {
            this.$initialize();
            this.formOwner = formOwner;
        }
    });

    Bridge.define("ExpressCraft.FormStartPosition", {
        $kind: "enum",
        statics: {
            Manual: 0,
            Center: 1,
            WindowsDefaultLocation: 2
        }
    });

    Bridge.define("ExpressCraft.GoogleCloudPrint", {
        statics: {
            externalGoogleCloudPrint: null,
            config: {
                init: function () {
                    this.externalGoogleCloudPrint = new ExpressCraft.ExternalPlugin("https://www.google.com/cloudprint/client/cpgadget.js");
                }
            },
            setup: function () {
                ExpressCraft.GoogleCloudPrint.externalGoogleCloudPrint.setup();
            }
        },
        _source: null,
        _mimetype: null,
        _encoding: "",
        _title: null,
        _gadget: null,
        ctor: function (source, title, gcpmt, encoding) {
            if (title === void 0) { title = ""; }
            if (gcpmt === void 0) { gcpmt = 0; }
            if (encoding === void 0) { encoding = ""; }

            this.$initialize();
            Object.call(this);
            this._title = title;
            this._source = source;
            this._encoding = encoding;
            this._mimetype = System.String.replaceAll(System.Enum.format(ExpressCraft.GoogleCloudPrintingMimeType, gcpmt, "G").toLowerCase(), "_", ".");
        },
        show: function () {
            ExpressCraft.GoogleCloudPrint.externalGoogleCloudPrint.usageCheck();

            
			this._gadget = new cloudprint.Gadget();			
			
            if (!System.String.isNullOrWhiteSpace(this._encoding)) {
                
				this._gadget.setPrintDocument(this._mimetype, this._title, this._source, this._encoding);
				
            } else {
                
				this._gadget.setPrintDocument(this._mimetype, this._title, this._source);
				
            }
            
			this._gadget.openPrintDialog();
			this._gadget.setOnCloseCallback(this.clearContent);			
			
        },
        clearContent: function () {
            try {
                ExpressCraft.Helper.delete($(".__gcp_dialog_container_cls").parent().get(0));
            }
            catch ($e1) {
                $e1 = System.Exception.create($e1);
            }
        },
        close: function () {
            if (this._gadget != null) {
                			
				this._gadget.closePrintDialog();
				this._gadget = null;
				
            }
        }
    });

    Bridge.define("ExpressCraft.GoogleCloudPrintingMimeType", {
        $kind: "enum",
        statics: {
            Url: 0,
            DataUrl: 1,
            Google_Drawing: 2,
            Google_Drive: 3,
            Google_Kix: 4,
            Google_Mail: 5,
            Google_Presentation: 6,
            Google_Spreadsheet: 7
        }
    });

    Bridge.define("ExpressCraft.GridViewCellApparence", {
        isBold: false,
        alignment: "left",
        forecolor: null,
        ctor: function () {
            this.$initialize();

        },
        $ctor1: function (isBold) {
            this.$initialize();
            this.isBold = isBold;
        },
        $ctor2: function (isBold, alignment) {
            this.$initialize();
            this.isBold = isBold;
            this.alignment = alignment;
        },
        $ctor3: function (isBold, alignment, forecolor) {
            this.$initialize();
            this.isBold = isBold;
            this.alignment = alignment;
            this.forecolor = forecolor;
        }
    });

    Bridge.define("ExpressCraft.GridViewCellDisplay", {
        useDefaultElement: false,
        onCreate: function (gridView, dataRowIndex, columnIndex) {
            return null;
        },
        onCreateDefault: function (originalElement, gridView, dataRowIndex, columnIndex) {
            return originalElement;
        }
    });

    Bridge.define("ExpressCraft.GridViewColumn", {
        column: null,
        view: null,
        caption: null,
        visible: false,
        cachedX: 0,
        formatString: "",
        headingApparence: null,
        bodyApparence: null,
        cellDisplay: null,
        sortedMode: 0,
        filterEdit: null,
        filterValue: null,
        allowEdit: true,
        readOnly: false,
        _width: 0,
        config: {
            init: function () {
                this.headingApparence = new ExpressCraft.GridViewCellApparence.ctor();
                this.bodyApparence = new ExpressCraft.GridViewCellApparence.ctor();
            }
        },
        ctor: function (view, width) {
            if (width === void 0) { width = 100; }

            this.$initialize();
            this.view = view;
            this._width = width;
        },
        getFilterValue: function () {
            return this.filterValue;
        },
        setFilterValue: function (value) {
            if (!Bridge.referenceEquals(this.filterValue, value)) {
                this.filterValue = value;
                if (this.view.getShowAutoFilterRow()) {
                    this.view.calculateVisibleRows();
                }
            }
        },
        getWidth: function () {
            return this._width;
        },
        setWidth: function (value) {
            if (value < 24) {
                value = 24;
            }
            if (this._width !== value) {
                this._width = value;
                this.view.renderGrid();
            }
        },
        valueMatchFilter: function (index) {
            if (this.filterValue == null) {
                return true;
            }

            var abc = this.getDisplayValueByDataRowHandle(index);

            switch (this.column.dataType) {
                default: 
                case ExpressCraft.DataType.Object: 
                case ExpressCraft.DataType.Integer: 
                case ExpressCraft.DataType.Long: 
                case ExpressCraft.DataType.Float: 
                case ExpressCraft.DataType.Double: 
                case ExpressCraft.DataType.Decimal: 
                case ExpressCraft.DataType.Bool: 
                case ExpressCraft.DataType.Byte: 
                case ExpressCraft.DataType.Short: 
                    return Bridge.referenceEquals(abc, this.filterValue);
                case ExpressCraft.DataType.DateTime: 
                case ExpressCraft.DataType.String: 
                    return System.String.startsWith((System.String.concat(abc, "")), System.String.concat(this.filterValue, ""));
            }
        },
        getDataColumnIndex: function () {
            var length = this.view.getDataSource().getColumnCount();
            for (var i = 0; i < length; i = (i + 1) | 0) {
                if (Bridge.referenceEquals(this.view.getDataSource().columns.getItem(i), this.column)) {
                    return i;
                }
            }
            return -1;
        },
        getDisplayValueByDataRowHandle: function (RowHandle) {
            if (System.String.isNullOrWhiteSpace(this.formatString)) {
                return this.column.getDisplayValue(RowHandle);
            } else {
                return this.column.getDisplayValue$1(RowHandle, this.formatString);
            }
        },
        getDisplayValue: function (RowHandle) {
            if (this.view.visibleRowHandles != null) {
                RowHandle = this.view.visibleRowHandles.getItem(RowHandle);
            }

            if (System.String.isNullOrWhiteSpace(this.formatString)) {
                return this.column.getDisplayValue(RowHandle);
            } else {
                return this.column.getDisplayValue$1(RowHandle, this.formatString);
            }
        }
    });

    Bridge.define("ExpressCraft.GridViewSortMode", {
        $kind: "enum",
        statics: {
            None: 0,
            Asc: 1,
            Desc: 2
        }
    });

    Bridge.define("ExpressCraft.HardSoftList$1", function (T) { return {
        _hhl: null,
        _hl: null,
        SL: null,
        limit: 0,
        hardLength: 0,
        defaultValue: Bridge.getDefaultValue(T),
        config: {
            init: function () {
                this._hhl = new (System.Collections.Generic.List$1(T))();
                this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                this.SL = new (System.Collections.Generic.List$1(System.Int32))();
            }
        },
        ctor: function (defaultValue, limit) {
            if (limit === void 0) { limit = 10000; }

            this.$initialize();
            this.defaultValue = defaultValue;
            this.limit = limit;
        },
        getIndexValueByHardListIndex: function (index) {
            return this._hl.getItem(index);
        },
        clearAll: function () {
            this._hhl = new (System.Collections.Generic.List$1(T))();
            this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
            this.SL = new (System.Collections.Generic.List$1(System.Int32))();
            this.hardLength = 0;
        },
        clearAllSetHardRange: function (value, Indexs) {
            if (Indexs === void 0) { Indexs = []; }
            this.hardLength = 0;
            if (Indexs == null || Indexs.length === 0) {
                this.clearAll();
            } else {
                if (Indexs.length > this.limit) {
                    this.hardLength = Indexs.length;
                    this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                    this.SL = new (System.Collections.Generic.List$1(System.Int32))();

                    var max = 0;
                    for (var i = 0; i < this.hardLength; i = (i + 1) | 0) {
                        if (Indexs[i] > max) {
                            max = Indexs[i];
                        }
                    }
                    var length = (max + 1) | 0;
                    this._hhl = new (System.Collections.Generic.List$1(T))(length);

                    if (length === Indexs.length) {
                        for (var i1 = 0; i1 < this.hardLength; i1 = (i1 + 1) | 0) {
                            this._hhl.add(value);
                        }
                    } else {
                        for (var i2 = 0; i2 < length; i2 = (i2 + 1) | 0) {
                            this._hhl.add(this.defaultValue);
                        }
                        for (var i3 = 0; i3 < this.hardLength; i3 = (i3 + 1) | 0) {
                            this._hhl.setItem(Indexs[i3], value);
                        }
                    }


                } else {
                    this._hhl = new (System.Collections.Generic.List$1(T))();
                    this.hardLength = Indexs.length;
                    this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))(this.hardLength);
                    for (var i4 = 0; i4 < this.hardLength; i4 = (i4 + 1) | 0) {
                        this._hl.add(new (ExpressCraft.IndexValue$1(T))(Indexs[i4], value));
                    }
                    this.SL = new (System.Collections.Generic.List$1(System.Int32))();
                }
            }
        },
        clearSoftList: function () {
            this.SL = new (System.Collections.Generic.List$1(System.Int32))();
        },
        clearAndAddOrSet: function (value, index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            this._hhl = new (System.Collections.Generic.List$1(T))();
            this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
            this.SL = new (System.Collections.Generic.List$1(System.Int32))();
            this.hardLength = 0;
            this.addOrSet(value, index, AddToSoftList);
        },
        getHardOrSoftIndexValue: function (index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            var length = this.SL.getCount();
            for (var i = 0; i < length; i = (i + 1) | 0) {
                var slI = this.SL.getItem(i);
                if (this._hl.getItem(slI).index === index) {
                    return this._hl.getItem(slI);
                }
            }

            length = this._hl.getCount();

            for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                var hli = this._hl.getItem(i1);
                if (hli.index === index) {
                    if (AddToSoftList) {
                        this.SL.add(i1);
                    }
                    return hli;
                }
            }

            return null;
        },
        getHardIndexValue: function (index) {
            var length = this._hl.getCount();

            for (var i = 0; i < length; i = (i + 1) | 0) {
                var hli = this._hl.getItem(i);
                if (hli.index === index.v) {
                    index.v = i;
                    return hli;
                }
            }
            index.v = length;

            return null;
        },
        getValue: function (index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            if (this.hardLength > this.limit) {
                return this._hhl.getItem(index);
            }
            var hiv = this.getHardOrSoftIndexValue(index, AddToSoftList);
            if (hiv == null) {
                return this.defaultValue;
            }
            return hiv.value;
        },
        getIndex: function (index) {
            if (this.hardLength > this.limit) {
                return index;
            }

            var hiv = this.getHardOrSoftIndexValue(index);
            if (hiv == null) {
                return -1;
            }
            return hiv.index;
        },
        addOrSet: function (value, index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            if (this.hardLength > this.limit) {
                if (index >= this.hardLength) {
                    var addDiff = ((((index + 1) | 0)) - this._hhl.getCount()) | 0;
                    if (addDiff > 0) {
                        var data = System.Array.init(addDiff, function (){
                            return Bridge.getDefaultValue(T);
                        }, T);
                        for (var i = 0; i < addDiff; i = (i + 1) | 0) {
                            data[i] = this.defaultValue;
                        }
                        this._hhl.addRange(data);
                    }
                    this._hhl.add(value);
                    this.hardLength = this._hhl.getCount();
                } else {
                    this._hhl.setItem(index, value);
                }
                return;
            }

            var length = this.SL.getCount();
            for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                var hli = this._hl.getItem(this.SL.getItem(i1));
                if (hli.index === index) {
                    hli.value = value;
                    return;
                }
            }

            var hindex = { v : index };
            var hiv = this.getHardIndexValue(hindex);
            if (hiv == null) {
                this._hl.add(((hiv = new (ExpressCraft.IndexValue$1(T))(index, value))));
            } else {
                hiv.value = value;
            }

            if (AddToSoftList) {
                this.SL.add(hindex.v);
            }
        },
        remove: function (index, OnlySoftList) {
            if (OnlySoftList === void 0) { OnlySoftList = false; }
            if (this.hardLength > this.limit) {
                if (((this.hardLength - 1) | 0) > this.limit) {
                    this._hhl.setItem(index, this.defaultValue);
                } else {
                    for (var i = 0; i < this.hardLength; i = (i + 1) | 0) {
                        if (i !== index && !Bridge.equals(this._hhl.getItem(i), this.defaultValue)) {
                            this._hl.add(new (ExpressCraft.IndexValue$1(T))(i, this._hhl.getItem(i)));
                        }
                    }

                    this.hardLength = (this.hardLength - 1) | 0;
                }
            } else {
                var Length = this.SL.getCount();
                for (var i1 = 0; i1 < Length; i1 = (i1 + 1) | 0) {
                    var sli = this.SL.getItem(i1);
                    if (this._hl.getItem(sli).index === index) {
                        this.SL.removeAt(i1);
                        if (OnlySoftList) {
                            return;
                        }
                        this._hl.removeAt(sli);
                        return;
                    }
                }
                var length = this._hl.getCount();

                for (var i2 = 0; i2 < length; i2 = (i2 + 1) | 0) {
                    var hli = this._hl.getItem(i2);
                    if (hli.index === index) {
                        this._hl.removeAt(i2);
                        return;
                    }
                }
            }
        }
    }; });

    Bridge.define("ExpressCraft.Helper", {
        statics: {
            isTrue: function (value) {
                return (Bridge.referenceEquals(((value = value.toLowerCase())), "true") || Bridge.referenceEquals(value, "1") || Bridge.referenceEquals(value, "on")) ? 1 : 0;
            },
            toInt: function (value) {
                return parseInt(value);
            },
            toFloat: function (value) {
                return parseFloat(value);
            },
            toStr: function (value) {
                return value;
            },
            isNumber: function (value) {
                return Bridge.is(value, System.SByte) || Bridge.is(value, System.Byte) || Bridge.is(value, System.Int16) || Bridge.is(value, System.UInt16) || Bridge.is(value, System.Int32) || Bridge.is(value, System.UInt32) || Bridge.is(value, System.Int64) || Bridge.is(value, System.UInt64) || Bridge.is(value, System.Single) || Bridge.is(value, System.Double) || Bridge.is(value, System.Decimal);
            },
            empty: function (element) {
                
			var len = element.childNodes.length;
			while(len--)
			{
				element.removeChild(element.lastChild);
			};
			
            },
            getClientMouseLocation: function (e) {
                var x = 0;
                var y = 0;
                			  
			  if (!e) var e = window.event;

			  if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
			  } else if (e.clientX || e.clientY) {
				x = e.clientX + document.body.scrollLeft + 
								   document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop + 
								   document.documentElement.scrollTop;
			  }
			
                return new ExpressCraft.Vector2.$ctor1(x, y);
            },
            setChecked$1: function (input, value) {
                ExpressCraft.Helper.setChecked(input.content, value);
            },
            setChecked: function (input, value) {
                var check = false;
                if (value != null) {
                    if (Bridge.is(value, Boolean) || ExpressCraft.Helper.isNumber(value)) {
                        check = System.Nullable.getValue(Bridge.cast(value, Boolean));
                    } else if (Bridge.is(value, String)) {
                        var strValue = Bridge.cast(value, String);
                        check = (Bridge.referenceEquals(strValue, "1") || System.String.compare(strValue.toLowerCase(), "true") === 0);
                    }
                }
                if (!check) {
                    input.removeAttribute(ExpressCraft.GridViewCellDisplayCheckBox.resource_checked);
                } else {
                    input.setAttribute(ExpressCraft.GridViewCellDisplayCheckBox.resource_checked, null);
                }
            },
            /**
             * IE does not support .remove on Element use delete
             *
             * @static
             * @public
             * @this ExpressCraft.Helper
             * @memberof ExpressCraft.Helper
             * @param   {Element}    c
             * @return  {void}
             */
            delete: function (c) {
                if (c != null && c.parentElement != null && c.parentElement.contains(c)) {
                    c.parentElement.removeChild(c);
                }
            },
            toPx: function (i) {
                return i + 'px';
            },
            log: function (jso) {
                console.log(jso);
            },
            appendChildren$1: function (c, Nodes) {
                if (Nodes === void 0) { Nodes = []; }
                if (Nodes != null && Nodes.length > 0) {
                    for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                        c.appendChild(Nodes[i]);
                    }
                }
            },
            appendChildren: function (c, Nodes) {
                if (Nodes === void 0) { Nodes = []; }
                ExpressCraft.Helper.appendChildren$2(c.content, Nodes);

                return c;
            },
            appendChildren$2: function (c, Nodes) {
                if (Nodes === void 0) { Nodes = []; }
                if (Nodes != null && Nodes.length > 0) {
                    for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                        c.appendChild(ExpressCraft.Control.op_Implicit(Nodes[i]));
                    }
                }


            },
            appendChildrenTabIndex: function (c, Nodes) {
                if (Nodes === void 0) { Nodes = []; }
                if (Nodes != null && Nodes.length > 0) {
                    for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                        Nodes[i].content.tabIndex = i;
                        c.appendChild(ExpressCraft.Control.op_Implicit(Nodes[i]));
                    }
                }
            },
            appendChildrenTabIndex$1: function (c, Nodes) {
                if (Nodes === void 0) { Nodes = []; }
                ExpressCraft.Helper.appendChildrenTabIndex(c.content, Nodes);
            },
            appendChild: function (c, Node) {
                c.content.appendChild(ExpressCraft.Control.op_Implicit(Node));
                return c;
            },
            setBounds: function (c, left, top, width, height) {
                ExpressCraft.Helper.setBounds$1(c.content, left, top, width, height);

                return c;
            },
            setBounds$1: function (c, left, top, width, height) {
                c.style.left = ExpressCraft.Helper.toHtmlValue(left);
                c.style.top = ExpressCraft.Helper.toHtmlValue(top);
                c.style.width = ExpressCraft.Helper.toHtmlValue(width);
                c.style.height = ExpressCraft.Helper.toHtmlValue(height);
            },
            setBoundsFull: function (c) {
                ExpressCraft.Helper.setBoundsFull$1(c.content);

                return c;
            },
            setBoundsFull$1: function (c) {
                ExpressCraft.Helper.setBounds$1(c, 0, 0, "100%", "100%");
            },
            setSize: function (c, width, height) {
                ExpressCraft.Helper.setSize$1(c.content, width, height);

                return c;
            },
            setSize$1: function (c, width, height) {
                c.style.width = ExpressCraft.Helper.toHtmlValue(width);
                c.style.height = ExpressCraft.Helper.toHtmlValue(height);
            },
            toHtmlValue: function (value) {
                if (Bridge.is(value, String)) {
                    return value;
                } else {
                    if (Bridge.is(value, System.Int32)) {
                        return ExpressCraft.Helper.toPx(value);
                    } else {
                        return ExpressCraft.Helper.toPx(value);
                    }
                }
            },
            setImage$1: function (c, str, useURL) {
                if (useURL === void 0) { useURL = true; }
                if (!System.String.startsWith(str, "url(")) {
                    str = useURL ? ExpressCraft.Control.getImageStringURI(str) : ExpressCraft.Control.getImageString(str);
                }
                ExpressCraft.Helper.setImage(c.content, str, useURL);
            },
            setImage: function (c, str, useURL) {
                if (useURL === void 0) { useURL = true; }
                if (System.String.isNullOrWhiteSpace(str)) {
                    c.style.background = "";
                    c.style.backgroundSize = "";
                    return;
                } else if (!System.String.startsWith(str, "url(")) {
                    str = useURL ? ExpressCraft.Control.getImageStringURI(str) : ExpressCraft.Control.getImageString(str);
                }
                c.style.background = str;
                c.style.backgroundSize = "100% 100%";
            },
            setLocation$2: function (c, left, top) {
                ExpressCraft.Helper.setLocation(c.content, ExpressCraft.Helper.toPx(left), ExpressCraft.Helper.toPx(top));
            },
            setLocation$1: function (c, left, top) {
                ExpressCraft.Helper.setLocation(c.content, left, top);
            },
            setLocation: function (c, left, top) {
                c.style.left = ExpressCraft.Helper.toHtmlValue(left);
                c.style.top = ExpressCraft.Helper.toHtmlValue(top);
            },
            /**
             * HtmlEscape XSS
             *
             * @static
             * @public
             * @this ExpressCraft.Helper
             * @memberof ExpressCraft.Helper
             * @param   {Object}    obj
             * @return  {string}
             */
            htmlEscape: function (obj) {
                return ExpressCraft.Helper.htmlEscape$1((Bridge.as(obj, String)));
            },
            /**
             * HtmlEscape XSS
             *
             * @static
             * @public
             * @this ExpressCraft.Helper
             * @memberof ExpressCraft.Helper
             * @param   {string}    input
             * @return  {string}
             */
            htmlEscape$1: function (input) {
                return !System.String.isNullOrEmpty(input) ? System.String.replaceAll(System.String.replaceAll(ExpressCraft.Helper.htmlUrlEscape(input), "\\/", "&#x2F"), "\"", "&quot") : "";
            },
            /**
             * HtmlUrlUnescape XSS
             *
             * @static
             * @public
             * @this ExpressCraft.Helper
             * @memberof ExpressCraft.Helper
             * @param   {string}    input
             * @return  {string}
             */
            htmlUrlUnescape: function (input) {
                return !System.String.isNullOrEmpty(input) ? System.String.replaceAll(System.String.replaceAll(System.String.replaceAll(System.String.replaceAll(input, "&amp", "&"), "&lt", "<"), "&gt", ">"), "&#x27", "'") : "";
            },
            /**
             * HtmlUrlEscape XSS
             *
             * @static
             * @public
             * @this ExpressCraft.Helper
             * @memberof ExpressCraft.Helper
             * @param   {string}    input
             * @return  {string}
             */
            htmlUrlEscape: function (input) {
                return !System.String.isNullOrEmpty(input) ? System.String.replaceAll(System.String.replaceAll(System.String.replaceAll(System.String.replaceAll(input, "&", "&amp"), "<", "&lt"), ">", "&gt"), "'", "&#x27") : "";
            },
            /**
             * HtmlUnescape XSS
             *
             * @static
             * @public
             * @this ExpressCraft.Helper
             * @memberof ExpressCraft.Helper
             * @param   {string}    input
             * @return  {string}
             */
            htmlUnescape: function (input) {
                return !System.String.isNullOrEmpty(input) ? System.String.replaceAll(System.String.replaceAll(ExpressCraft.Helper.htmlUrlUnescape(input), "&#x2F", "\\/"), "&quot", "\"") : "";
            },
            exchangeClass$1: function (control, oldClass, newClass) {
                ExpressCraft.Helper.exchangeClass(control.content, oldClass, newClass);

            },
            exchangeClass: function (control, oldClass, newClass) {
                if (control.classList.contains(oldClass)) {
                    control.classList.remove(oldClass);
                }
                if (!control.classList.contains(newClass)) {
                    control.classList.add(newClass);
                }
            },
            isEmpty: function (value) {
                return System.String.isNullOrWhiteSpace(value);
            },
            stopAndLog: function (sw, logName) {
                if (logName === void 0) { logName = "Task"; }
                sw.stop();
                ExpressCraft.ConsoleForm.log(System.String.concat(logName, " took ", sw.milliseconds(), "ms to finish"));
            }
        }
    });

    Bridge.define("ExpressCraft.Helper.DataTableJson", {
        statics: {
            fromExternal: function (o) {
                var x;
                x = Bridge.merge(Bridge.createInstance(ExpressCraft.Helper.DataTableJson), o);
                return x;
            },
            parse: function (o) {
                var dt = new ExpressCraft.DataTable();
                var length = o.fieldNames.length;
                for (var i = 0; i < length; i = (i + 1) | 0) {
                    dt.addColumn(o.fieldNames[i], o.dataTypes[i]);
                }
                if (o.rows != null) {
                    length = o.rows.length;
                    dt.beginNewRow(length);

                    for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                        var dr = dt.newRow();
                        dr.batchData = o.rows[i1];
                    }
                    dt.acceptNewRows();
                }
                return dt;
            }
        },
        fieldNames: null,
        rows: null,
        dataTypes: null,
        toTable: function () {
            var dt = new ExpressCraft.DataTable();

            for (var i = 0; i < this.fieldNames.length; i = (i + 1) | 0) {
                dt.addColumn(this.fieldNames[i], this.dataTypes[i]);
            }

            if (this.rows != null) {
                dt.beginNewRow(this.rows.length);

                for (var i1 = 0; i1 < this.rows.length; i1 = (i1 + 1) | 0) {
                    var dr = dt.newRow();
                    dr.batchData = this.rows[i1];
                }
                dt.acceptNewRows();
            }

            return dt;
        }
    });

    Bridge.define("ExpressCraft.IndexValue$1", function (T) { return {
        index: 0,
        value: Bridge.getDefaultValue(T),
        ctor: function (index, value) {
            this.$initialize();
            this.index = index;
            this.value = value;
        }
    }; });

    Bridge.define("ExpressCraft.KeyCodes", {
        statics: {
            Modifiers: -65536,
            None: 0,
            LButton: 1,
            RButton: 2,
            Cancel: 3,
            MButton: 4,
            XButton1: 5,
            XButton2: 6,
            Back: 8,
            Tab: 9,
            LineFeed: 10,
            Clear: 12,
            Return: 13,
            Enter: 13,
            ShiftKey: 16,
            ControlKey: 17,
            Menu: 18,
            Pause: 19,
            Capital: 20,
            CapsLock: 20,
            KanaMode: 21,
            HanguelMode: 21,
            HangulMode: 21,
            JunjaMode: 23,
            FinalMode: 24,
            HanjaMode: 25,
            KanjiMode: 25,
            Escape: 27,
            IMEConvert: 28,
            IMENonconvert: 29,
            IMEAccept: 30,
            IMEAceept: 30,
            IMEModeChange: 31,
            Space: 32,
            Prior: 33,
            PageUp: 33,
            Next: 34,
            PageDown: 34,
            End: 35,
            Home: 36,
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40,
            Select: 41,
            Print: 42,
            Execute: 43,
            Snapshot: 44,
            PrintScreen: 44,
            Insert: 45,
            Delete: 46,
            Help: 47,
            D0: 48,
            D1: 49,
            D2: 50,
            D3: 51,
            D4: 52,
            D5: 53,
            D6: 54,
            D7: 55,
            D8: 56,
            D9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            LWin: 91,
            RWin: 92,
            Apps: 93,
            Sleep: 95,
            NumPad0: 96,
            NumPad1: 97,
            NumPad2: 98,
            NumPad3: 99,
            NumPad4: 100,
            NumPad5: 101,
            NumPad6: 102,
            NumPad7: 103,
            NumPad8: 104,
            NumPad9: 105,
            Multiply: 106,
            Add: 107,
            Separator: 108,
            Subtract: 109,
            Decimal: 110,
            Divide: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            F13: 124,
            F14: 125,
            F15: 126,
            F16: 127,
            F17: 128,
            F18: 129,
            F19: 130,
            F20: 131,
            F21: 132,
            F22: 133,
            F23: 134,
            F24: 135,
            NumLock: 144,
            Scroll: 145,
            LShiftKey: 160,
            RShiftKey: 161,
            LControlKey: 162,
            RControlKey: 163,
            LMenu: 164,
            RMenu: 165,
            BrowserBack: 166,
            BrowserForward: 167,
            BrowserRefresh: 168,
            BrowserStop: 169,
            BrowserSearch: 170,
            BrowserFavorites: 171,
            BrowserHome: 172,
            VolumeMute: 173,
            VolumeDown: 174,
            VolumeUp: 175,
            MediaNextTrack: 176,
            MediaPreviousTrack: 177,
            MediaStop: 178,
            MediaPlayPause: 179,
            LaunchMail: 180,
            SelectMedia: 181,
            LaunchApplication1: 182,
            LaunchApplication2: 183,
            OemSemicolon: 186,
            Oem1: 186,
            Oemplus: 187,
            Oemcomma: 188,
            OemMinus: 189,
            OemPeriod: 190,
            OemQuestion: 191,
            Oem2: 191,
            Oemtilde: 192,
            Oem3: 192,
            OemOpenBrackets: 219,
            Oem4: 219,
            OemPipe: 220,
            Oem5: 220,
            OemCloseBrackets: 221,
            Oem6: 221,
            OemQuotes: 222,
            Oem7: 222,
            Oem8: 223,
            OemBackslash: 226,
            Oem102: 226,
            ProcessKey: 229,
            Packet: 231,
            Attn: 246,
            Crsel: 247,
            Exsel: 248,
            EraseEof: 249,
            Play: 250,
            Zoom: 251,
            NoName: 252,
            Pa1: 253,
            OemClear: 254,
            KeyCode: 65535,
            Shift: 65536,
            Control: 131072,
            Alt: 262144
        }
    });

    Bridge.define("ExpressCraft.KnownColor", {
        $kind: "enum",
        statics: {
            ActiveBorder: 1,
            ActiveCaption: 2,
            ActiveCaptionText: 3,
            AliceBlue: 28,
            AntiqueWhite: 29,
            AppWorkspace: 4,
            Aqua: 30,
            Aquamarine: 31,
            Azure: 32,
            Beige: 33,
            Bisque: 34,
            Black: 35,
            BlanchedAlmond: 36,
            Blue: 37,
            BlueViolet: 38,
            Brown: 39,
            BurlyWood: 40,
            ButtonFace: 168,
            ButtonHighlight: 169,
            ButtonShadow: 170,
            CadetBlue: 41,
            Chartreuse: 42,
            Chocolate: 43,
            Control: 5,
            ControlDark: 6,
            ControlDarkDark: 7,
            ControlLight: 8,
            ControlLightLight: 9,
            ControlText: 10,
            Coral: 44,
            CornflowerBlue: 45,
            Cornsilk: 46,
            Crimson: 47,
            Cyan: 48,
            DarkBlue: 49,
            DarkCyan: 50,
            DarkGoldenrod: 51,
            DarkGray: 52,
            DarkGreen: 53,
            DarkKhaki: 54,
            DarkMagenta: 55,
            DarkOliveGreen: 56,
            DarkOrange: 57,
            DarkOrchid: 58,
            DarkRed: 59,
            DarkSalmon: 60,
            DarkSeaGreen: 61,
            DarkSlateBlue: 62,
            DarkSlateGray: 63,
            DarkTurquoise: 64,
            DarkViolet: 65,
            DeepPink: 66,
            DeepSkyBlue: 67,
            Desktop: 11,
            DimGray: 68,
            DodgerBlue: 69,
            Firebrick: 70,
            FloralWhite: 71,
            ForestGreen: 72,
            Fuchsia: 73,
            Gainsboro: 74,
            GhostWhite: 75,
            Gold: 76,
            Goldenrod: 77,
            GradientActiveCaption: 171,
            GradientInactiveCaption: 172,
            Gray: 78,
            GrayText: 12,
            Green: 79,
            GreenYellow: 80,
            Highlight: 13,
            HighlightText: 14,
            Honeydew: 81,
            HotPink: 82,
            HotTrack: 15,
            InactiveBorder: 16,
            InactiveCaption: 17,
            InactiveCaptionText: 18,
            IndianRed: 83,
            Indigo: 84,
            Info: 19,
            InfoText: 20,
            Ivory: 85,
            Khaki: 86,
            Lavender: 87,
            LavenderBlush: 88,
            LawnGreen: 89,
            LemonChiffon: 90,
            LightBlue: 91,
            LightCoral: 92,
            LightCyan: 93,
            LightGoldenrodYellow: 94,
            LightGray: 95,
            LightGreen: 96,
            LightPink: 97,
            LightSalmon: 98,
            LightSeaGreen: 99,
            LightSkyBlue: 100,
            LightSlateGray: 101,
            LightSteelBlue: 102,
            LightYellow: 103,
            Lime: 104,
            LimeGreen: 105,
            Linen: 106,
            Magenta: 107,
            Maroon: 108,
            MediumAquamarine: 109,
            MediumBlue: 110,
            MediumOrchid: 111,
            MediumPurple: 112,
            MediumSeaGreen: 113,
            MediumSlateBlue: 114,
            MediumSpringGreen: 115,
            MediumTurquoise: 116,
            MediumVioletRed: 117,
            Menu: 21,
            MenuBar: 173,
            MenuHighlight: 174,
            MenuText: 22,
            MidnightBlue: 118,
            MintCream: 119,
            MistyRose: 120,
            Moccasin: 121,
            NavajoWhite: 122,
            Navy: 123,
            OldLace: 124,
            Olive: 125,
            OliveDrab: 126,
            Orange: 127,
            OrangeRed: 128,
            Orchid: 129,
            PaleGoldenrod: 130,
            PaleGreen: 131,
            PaleTurquoise: 132,
            PaleVioletRed: 133,
            PapayaWhip: 134,
            PeachPuff: 135,
            Peru: 136,
            Pink: 137,
            Plum: 138,
            PowderBlue: 139,
            Purple: 140,
            Red: 141,
            RosyBrown: 142,
            RoyalBlue: 143,
            SaddleBrown: 144,
            Salmon: 145,
            SandyBrown: 146,
            ScrollBar: 23,
            SeaGreen: 147,
            SeaShell: 148,
            Sienna: 149,
            Silver: 150,
            SkyBlue: 151,
            SlateBlue: 152,
            SlateGray: 153,
            Snow: 154,
            SpringGreen: 155,
            SteelBlue: 156,
            Tan: 157,
            Teal: 158,
            Thistle: 159,
            Tomato: 160,
            Transparent: 27,
            Turquoise: 161,
            Violet: 162,
            Wheat: 163,
            White: 164,
            WhiteSmoke: 165,
            Window: 24,
            WindowFrame: 25,
            WindowText: 26,
            Yellow: 166,
            YellowGreen: 167
        }
    });

    Bridge.define("ExpressCraft.KnownColorTable", {
        statics: {
            AlphaShift: 24,
            BlueShift: 0,
            colorNameTable: null,
            colorTable: null,
            GreenShift: 8,
            RedShift: 16,
            Win32BlueShift: 16,
            Win32GreenShift: 8,
            Win32RedShift: 0,
            argbToKnownColor: function (targetARGB) {
                ExpressCraft.KnownColorTable.ensureColorTable();
                for (var i = 0; i < ExpressCraft.KnownColorTable.colorTable.length; i = (i + 1) | 0) {
                    var num2 = ExpressCraft.KnownColorTable.colorTable[i];
                    if (num2 === targetARGB) {
                        var color = ExpressCraft.Color.fromKnownColor(i).$clone();
                        if (!color.getIsSystemColor()) {
                            return color.$clone();
                        }
                    }
                }
                return ExpressCraft.Color.fromArgb(targetARGB);
            },
            encode: function (alpha, red, green, blue) {
                return ((((red << 16) | (green << 8)) | blue) | (alpha << 24));
            },
            ensureColorNameTable: function () {
                if (ExpressCraft.KnownColorTable.colorNameTable == null) {
                    ExpressCraft.KnownColorTable.initColorNameTable();
                }
            },
            ensureColorTable: function () {
                if (ExpressCraft.KnownColorTable.colorTable == null) {
                    ExpressCraft.KnownColorTable.initColorTable();
                }
            },
            fromWin32Value: function (value) {
                return ExpressCraft.KnownColorTable.encode(255, value & 255, (value >> 8) & 255, (value >> 16) & 255);
            },
            initColorNameTable: function () {
                var s = System.Array.init(175, null, String);
                s[1] = "ActiveBorder";
                s[2] = "ActiveCaption";
                s[3] = "ActiveCaptionText";
                s[4] = "AppWorkspace";
                s[168] = "ButtonFace";
                s[169] = "ButtonHighlight";
                s[170] = "ButtonShadow";
                s[5] = "Control";
                s[6] = "ControlDark";
                s[7] = "ControlDarkDark";
                s[8] = "ControlLight";
                s[9] = "ControlLightLight";
                s[10] = "ControlText";
                s[11] = "Desktop";
                s[171] = "GradientActiveCaption";
                s[172] = "GradientInactiveCaption";
                s[12] = "GrayText";
                s[13] = "Highlight";
                s[14] = "HighlightText";
                s[15] = "HotTrack";
                s[16] = "InactiveBorder";
                s[17] = "InactiveCaption";
                s[18] = "InactiveCaptionText";
                s[19] = "Info";
                s[20] = "InfoText";
                s[21] = "Menu";
                s[173] = "MenuBar";
                s[174] = "MenuHighlight";
                s[22] = "MenuText";
                s[23] = "ScrollBar";
                s[24] = "Window";
                s[25] = "WindowFrame";
                s[26] = "WindowText";
                s[27] = "Transparent";
                s[28] = "AliceBlue";
                s[29] = "AntiqueWhite";
                s[30] = "Aqua";
                s[31] = "Aquamarine";
                s[32] = "Azure";
                s[33] = "Beige";
                s[34] = "Bisque";
                s[35] = "Black";
                s[36] = "BlanchedAlmond";
                s[37] = "Blue";
                s[38] = "BlueViolet";
                s[39] = "Brown";
                s[40] = "BurlyWood";
                s[41] = "CadetBlue";
                s[42] = "Chartreuse";
                s[43] = "Chocolate";
                s[44] = "Coral";
                s[45] = "CornflowerBlue";
                s[46] = "Cornsilk";
                s[47] = "Crimson";
                s[48] = "Cyan";
                s[49] = "DarkBlue";
                s[50] = "DarkCyan";
                s[51] = "DarkGoldenrod";
                s[52] = "DarkGray";
                s[53] = "DarkGreen";
                s[54] = "DarkKhaki";
                s[55] = "DarkMagenta";
                s[56] = "DarkOliveGreen";
                s[57] = "DarkOrange";
                s[58] = "DarkOrchid";
                s[59] = "DarkRed";
                s[60] = "DarkSalmon";
                s[61] = "DarkSeaGreen";
                s[62] = "DarkSlateBlue";
                s[63] = "DarkSlateGray";
                s[64] = "DarkTurquoise";
                s[65] = "DarkViolet";
                s[66] = "DeepPink";
                s[67] = "DeepSkyBlue";
                s[68] = "DimGray";
                s[69] = "DodgerBlue";
                s[70] = "Firebrick";
                s[71] = "FloralWhite";
                s[72] = "ForestGreen";
                s[73] = "Fuchsia";
                s[74] = "Gainsboro";
                s[75] = "GhostWhite";
                s[76] = "Gold";
                s[77] = "Goldenrod";
                s[78] = "Gray";
                s[79] = "Green";
                s[80] = "GreenYellow";
                s[81] = "Honeydew";
                s[82] = "HotPink";
                s[83] = "IndianRed";
                s[84] = "Indigo";
                s[85] = "Ivory";
                s[86] = "Khaki";
                s[87] = "Lavender";
                s[88] = "LavenderBlush";
                s[89] = "LawnGreen";
                s[90] = "LemonChiffon";
                s[91] = "LightBlue";
                s[92] = "LightCoral";
                s[93] = "LightCyan";
                s[94] = "LightGoldenrodYellow";
                s[95] = "LightGray";
                s[96] = "LightGreen";
                s[97] = "LightPink";
                s[98] = "LightSalmon";
                s[99] = "LightSeaGreen";
                s[100] = "LightSkyBlue";
                s[101] = "LightSlateGray";
                s[102] = "LightSteelBlue";
                s[103] = "LightYellow";
                s[104] = "Lime";
                s[105] = "LimeGreen";
                s[106] = "Linen";
                s[107] = "Magenta";
                s[108] = "Maroon";
                s[109] = "MediumAquamarine";
                s[110] = "MediumBlue";
                s[111] = "MediumOrchid";
                s[112] = "MediumPurple";
                s[113] = "MediumSeaGreen";
                s[114] = "MediumSlateBlue";
                s[115] = "MediumSpringGreen";
                s[116] = "MediumTurquoise";
                s[117] = "MediumVioletRed";
                s[118] = "MidnightBlue";
                s[119] = "MintCream";
                s[120] = "MistyRose";
                s[121] = "Moccasin";
                s[122] = "NavajoWhite";
                s[123] = "Navy";
                s[124] = "OldLace";
                s[125] = "Olive";
                s[126] = "OliveDrab";
                s[127] = "Orange";
                s[128] = "OrangeRed";
                s[129] = "Orchid";
                s[130] = "PaleGoldenrod";
                s[131] = "PaleGreen";
                s[132] = "PaleTurquoise";
                s[133] = "PaleVioletRed";
                s[134] = "PapayaWhip";
                s[135] = "PeachPuff";
                s[136] = "Peru";
                s[137] = "Pink";
                s[138] = "Plum";
                s[139] = "PowderBlue";
                s[140] = "Purple";
                s[141] = "Red";
                s[142] = "RosyBrown";
                s[143] = "RoyalBlue";
                s[144] = "SaddleBrown";
                s[145] = "Salmon";
                s[146] = "SandyBrown";
                s[147] = "SeaGreen";
                s[148] = "SeaShell";
                s[149] = "Sienna";
                s[150] = "Silver";
                s[151] = "SkyBlue";
                s[152] = "SlateBlue";
                s[153] = "SlateGray";
                s[154] = "Snow";
                s[155] = "SpringGreen";
                s[156] = "SteelBlue";
                s[157] = "Tan";
                s[158] = "Teal";
                s[159] = "Thistle";
                s[160] = "Tomato";
                s[161] = "Turquoise";
                s[162] = "Violet";
                s[163] = "Wheat";
                s[164] = "White";
                s[165] = "WhiteSmoke";
                s[166] = "Yellow";
                s[167] = "YellowGreen";
                ExpressCraft.KnownColorTable.colorNameTable = s;
            },
            initColorTable: function () {
                var c = System.Array.init(175, 0, System.Int32);

                c[27] = 16777215;
                c[28] = -984833;
                c[29] = -332841;
                c[30] = -16711681;
                c[31] = -8388652;
                c[32] = -983041;
                c[33] = -657956;
                c[34] = -6972;
                c[35] = -16777216;
                c[36] = -5171;
                c[37] = -16776961;
                c[38] = -7722014;
                c[39] = -5952982;
                c[40] = -2180985;
                c[41] = -10510688;
                c[42] = -8388864;
                c[43] = -2987746;
                c[44] = -32944;
                c[45] = -10185235;
                c[46] = -1828;
                c[47] = -2354116;
                c[48] = -16711681;
                c[49] = -16777077;
                c[50] = -16741493;
                c[51] = -4684277;
                c[52] = -5658199;
                c[53] = -16751616;
                c[54] = -4343957;
                c[55] = -7667573;
                c[56] = -11179217;
                c[57] = -29696;
                c[58] = -6737204;
                c[59] = -7667712;
                c[60] = -1468806;
                c[61] = -7357301;
                c[62] = -12042869;
                c[63] = -13676721;
                c[64] = -16724271;
                c[65] = -7077677;
                c[66] = -60269;
                c[67] = -16728065;
                c[68] = -9868951;
                c[69] = -14774017;
                c[70] = -5103070;
                c[71] = -1296;
                c[72] = -14513374;
                c[73] = -65281;
                c[74] = -2302756;
                c[75] = -460545;
                c[76] = -10496;
                c[77] = -2448096;
                c[78] = -8355712;
                c[79] = -16744448;
                c[80] = -5374161;
                c[81] = -983056;
                c[82] = -38476;
                c[83] = -3318692;
                c[84] = -11861886;
                c[85] = -16;
                c[86] = -989556;
                c[87] = -1644806;
                c[88] = -3851;
                c[89] = -8586240;
                c[90] = -1331;
                c[91] = -5383962;
                c[92] = -1015680;
                c[93] = -2031617;
                c[94] = -329006;
                c[95] = -2894893;
                c[96] = -7278960;
                c[97] = -18751;
                c[98] = -24454;
                c[99] = -14634326;
                c[100] = -7876870;
                c[101] = -8943463;
                c[102] = -5192482;
                c[103] = -32;
                c[104] = -16711936;
                c[105] = -13447886;
                c[106] = -331546;
                c[107] = -65281;
                c[108] = -8388608;
                c[109] = -10039894;
                c[110] = -16777011;
                c[111] = -4565549;
                c[112] = -7114533;
                c[113] = -12799119;
                c[114] = -8689426;
                c[115] = -16713062;
                c[116] = -12004916;
                c[117] = -3730043;
                c[118] = -15132304;
                c[119] = -655366;
                c[120] = -6943;
                c[121] = -6987;
                c[122] = -8531;
                c[123] = -16777088;
                c[124] = -133658;
                c[125] = -8355840;
                c[126] = -9728477;
                c[127] = -23296;
                c[128] = -47872;
                c[129] = -2461482;
                c[130] = -1120086;
                c[131] = -6751336;
                c[132] = -5247250;
                c[133] = -2396013;
                c[134] = -4139;
                c[135] = -9543;
                c[136] = -3308225;
                c[137] = -16181;
                c[138] = -2252579;
                c[139] = -5185306;
                c[140] = -8388480;
                c[141] = -65536;
                c[142] = -4419697;
                c[143] = -12490271;
                c[144] = -7650029;
                c[145] = -360334;
                c[146] = -744352;
                c[147] = -13726889;
                c[148] = -2578;
                c[149] = -6270419;
                c[150] = -4144960;
                c[151] = -7876885;
                c[152] = -9807155;
                c[153] = -9404272;
                c[154] = -1286;
                c[155] = -16711809;
                c[156] = -12156236;
                c[157] = -2968436;
                c[158] = -16744320;
                c[159] = -2572328;
                c[160] = -40121;
                c[161] = -12525360;
                c[162] = -1146130;
                c[163] = -663885;
                c[164] = -1;
                c[165] = -657931;
                c[166] = -256;
                c[167] = -6632142;
                ExpressCraft.KnownColorTable.colorTable = c;
            },
            knownColorToArgb: function (color) {
                ExpressCraft.KnownColorTable.ensureColorTable();
                if (color <= ExpressCraft.KnownColor.MenuHighlight) {
                    return ExpressCraft.KnownColorTable.colorTable[color];
                }
                return 0;
            },
            knownColorToName: function (color) {
                ExpressCraft.KnownColorTable.ensureColorNameTable();
                if (color <= ExpressCraft.KnownColor.MenuHighlight) {
                    return ExpressCraft.KnownColorTable.colorNameTable[color];
                }
                return null;
            }
        }
    });

    Bridge.define("ExpressCraft.MessageBoxButtons", {
        $kind: "enum",
        statics: {
            Auto: 0,
            Ok: 1,
            YesNo: 2,
            YesNoCancel: 3,
            AbortIgnoreRetry: 4
        }
    });

    Bridge.define("ExpressCraft.MessageBoxLayout", {
        $kind: "enum",
        statics: {
            Information: 0,
            Exclamation: 1,
            Question: 2,
            Error: 3
        }
    });

    Bridge.define("ExpressCraft.MouseMoveAction", {
        $kind: "enum",
        statics: {
            None: 0,
            Move: 1,
            TopLeftResize: 2,
            LeftResize: 3,
            BottomLeftResize: 4,
            BottomResize: 5,
            BottomRightResize: 6,
            RightResize: 7,
            TopResize: 8,
            TopRightResize: 9
        }
    });

    Bridge.define("ExpressCraft.Network", {
        statics: {
            getAjaxOptions: function (JsonFile, Async) {
                if (Async === void 0) { Async = true; }
                return { async: Async, url: ExpressCraft.Settings.networkURL, cache: false, data: JsonFile == null ? "" : JSON.stringify(JsonFile), dataType: "json", contentType: "application/json", type: "POST" };
            },
            invokeMethodUI: function (interfaceName, method, Success, Error, $arguments) {
                if (Success === void 0) { Success = null; }
                if (Error === void 0) { Error = null; }
                if ($arguments === void 0) { $arguments = []; }
                ExpressCraft.Network.postJsonProgressForm(new ExpressCraft.Network.MethodRequest(interfaceName, method, $arguments), Success, Error);
            },
            invokeMethodUIControl: function (interfaceName, method, progressControl, Success, Error, $arguments) {
                if (Success === void 0) { Success = null; }
                if (Error === void 0) { Error = null; }
                if ($arguments === void 0) { $arguments = []; }
                ExpressCraft.Network.postJsonProgressControl(new ExpressCraft.Network.MethodRequest(interfaceName, method, $arguments), progressControl, Success, Error);
            },
            invokeMethod: function (interfaceName, method, Success, Error, $arguments) {
                if (Success === void 0) { Success = null; }
                if (Error === void 0) { Error = null; }
                if ($arguments === void 0) { $arguments = []; }
                ExpressCraft.Network.postJson(new ExpressCraft.Network.MethodRequest(interfaceName, method, $arguments), Success, Error);
            },
            postJson: function (JsonFile, Success, Error, Async) {
                if (Success === void 0) { Success = null; }
                if (Error === void 0) { Error = null; }
                if (Async === void 0) { Async = true; }
                // lets convert the JsonFileObject to a string;			
                var ajo = ExpressCraft.Network.getAjaxOptions(JsonFile, Async);
                ajo.success = Success;
                ajo.error = Error;

                $.ajax(ajo);
            },
            postJsonProgressControl: function (JsonFile, progressControl, Success, Error, Async) {
                if (Success === void 0) { Success = null; }
                if (Error === void 0) { Error = null; }
                if (Async === void 0) { Async = true; }
                // lets convert the JsonFileObject to a string;			
                var ajo = ExpressCraft.Network.getAjaxOptions(JsonFile, Async);
                ajo.xhr = function () {
                    var xmlRequest = new XMLHttpRequest();
                    xmlRequest.addEventListener("progress", function (e) {
                        var pe = Bridge.as(e, ProgressEvent);
                        if (progressControl == null) {
                            return;
                        }
                        var pc = progressControl;

                        var Percent = 0;

                        if (pe.loaded !== 0 && pe.total !== 0) {
                            Percent = (pe.loaded / pe.total) * 100.0;
                        }
                        pc.internalProgressControl.style.width = System.String.concat(System.Single.format(Percent, 'G'), "%");
                    });

                    return xmlRequest;
                };
                ajo.success = Success;
                ajo.error = Error;

                $.ajax(ajo);
            },
            postJsonProgressForm: function (JsonFile, Success, Error, Async) {
                if (Success === void 0) { Success = null; }
                if (Error === void 0) { Error = null; }
                if (Async === void 0) { Async = true; }
                // lets convert the JsonFileObject to a string;
                var npf = new ExpressCraft.Network.NetworkProgressForm();

                var ajo = ExpressCraft.Network.getAjaxOptions(JsonFile, Async);
                ajo.xhr = function () {
                    var xmlRequest = new XMLHttpRequest();
                    xmlRequest.addEventListener("progress", function (e) {
                        var pe = Bridge.as(e, ProgressEvent);
                        if (npf == null || npf.progressControl == null) {
                            return;
                        }
                        var pc = npf.progressControl;

                        var Percent = 0;

                        if (pe.loaded !== 0 && pe.total !== 0) {
                            Percent = (pe.loaded / pe.total) * 100.0;
                        }
                        pc.internalProgressControl.style.width = System.String.concat(System.Single.format(Percent, 'G'), "%");
                    });

                    return xmlRequest;
                };
                ajo.success = function (o, s, jq) {
                    npf.dialogResult = ExpressCraft.DialogResultEnum.OK;
                    Success(o, s, jq);
                };
                ajo.error = function (jq, s1, s2) {
                    npf.dialogResult = ExpressCraft.DialogResultEnum.Cancel;
                    Error(jq, s1, s2);
                };
                ajo.complete = function (jq, str) {
                    npf.close();
                };

                var ajr = $.ajax(ajo);

                npf.showDialog([new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.Cancel, function () {
                    ajr.abort();
                })]);
            }
        }
    });

    Bridge.define("ExpressCraft.Network.MethodRequest", {
        method: null,
        arguments: null,
        interface: null,
        ctor: function (interfaceName, method, $arguments) {
            if ($arguments === void 0) { $arguments = []; }

            this.$initialize();
            this.method = method;
            this.arguments = $arguments;
            this.interface = interfaceName;
        }
    });

    Bridge.define("ExpressCraft.PdfSourceType", {
        $kind: "enum",
        statics: {
            Url: 0,
            Base64: 1
        }
    });

    Bridge.define("ExpressCraft.ResourceManager", {
        statics: {
            cacheResourceString: null,
            config: {
                init: function () {
                    this.cacheResourceString = new (System.Collections.Generic.Dictionary$2(String,String))();
                }
            },
            getResourceString: function (name) {
                var $t;
                if (ExpressCraft.ResourceManager.cacheResourceString.containsKey(name)) {
                    return ExpressCraft.ResourceManager.cacheResourceString.get(name);
                }
                return (($t = ExpressCraft.Settings.getStyleRuleValue$1(ExpressCraft.Settings.resourceManangerSheets, "content", System.String.concat(".", name)), ExpressCraft.ResourceManager.cacheResourceString.set(name, $t), $t));
            }
        }
    });

    Bridge.define("ExpressCraft.RibbonControl.RibbonType", {
        $kind: "enum",
        statics: {
            Full: 0,
            Compact: 1
        }
    });

    Bridge.define("ExpressCraft.RibbonGroup.RenderInfo", {
        left: 0,
        width: 0,
        isSmall: false,
        firstButton: null,
        secondButton: null,
        thirdButton: null,
        beginGroup: false
    });

    Bridge.define("ExpressCraft.Settings", {
        statics: {
            networkURL: "Host.ashx",
            resourceURL: "./images/",
            autoRender: true,
            Font: "8.25pt Tahoma",
            defaultFont: "8.25pt Tahoma",
            defaultStyleSheet: null,
            pluginStyleSheet: null,
            resourceManangerSheets: null,
            gridViewAutoColumnGenerateFormatAsDate: false,
            gridViewAutoColumnFormatDates: true,
            gridViewBlurOnScroll: false,
            gridViewRowScrollPadding: 0,
            gridViewScrollDelayed: false,
            gridViewScrollDelayMS: 25,
            contextMenuStartingZIndex: 500,
            contextMenuMinWidth: 200,
            messageFormTextMaximumHeightInPx: 500,
            messageFormTextMinimumHeightInPx: 32,
            messageFormMinimumWidthInPx: 195,
            messageFormBeep: false,
            maximumPixelScrollingRows: 500000,
            _WindowManagerVisible: false,
            isChrome: false,
            allowCloseWithoutQuestion: false,
            showExceptionDialog: true,
            formFadeDuration: 100,
            themeElement: null,
            _includeFocusRegion: true,
            _activeTheme: null,
            themefocusValue: ".{25}:focus:not(.grid){{\r\noutline: dashed 1px {0};\r\n}}",
            themeTemplate: ".{25}{{\r\n    color:{22};\r\n}}\r\n#focusLine;\r\n.{25}::selection{{\r\n{26}:{1};\r\n}}\r\n.{25}::-moz-selection{{\r\n{26}:{1};\r\n}}\r\n.{25}:disabled{{\r\n{26}:{2};\r\n}}\r\n.input{25}:read-only{{\r\n{26}:{3};\r\n}}\r\n.{28}{25}{{\r\n{26}:{0};\r\n{27}{29}:{0};\r\n{27}{31}:{0};\r\n{27}{32}:{1};\r\n}}\r\n.{28}page{{\r\n{26}:{3};\r\n}}\r\n.{28}group{{\r\n{26}:{3};\r\n}}\r\n.{28}{33}{{\r\n{26}:{3};\r\n}}\r\n.{28}{33}:hover:not(:active):not(.disabled)\r\n{{\r\n{26}:{4};\r\n}}\r\n.{28}{33}:active:not(.disabled){{\r\n{26}:{5};\r\n}}\r\n.{28}{33}small{{\r\n{26}:{3}; \r\n}}\r\n.{28}{33}small:hover:not(:active):not(.disabled)\r\n{{\r\n{26}:{4};\r\n}}\r\n.{28}{33}small:active:not(.disabled){{\r\n{26}:{5};\r\n}}\r\n.{28}seperator{{\r\n{26}:{1};\r\n}}\r\n.{28}{35}-hidden{{\r\n{26}:{0};\r\ncolor:{23};\r\n}}\r\n.{28}{35}-hidden:hover{{\r\n{26}:{6};\r\n}}\r\n.{28}{35}-active{{\r\n{26}:{3};\r\n}}\r\n.tab{25}{{\r\n{26}:{3};\r\n}}\r\n.tab{25}page{{\r\n{26}:{3};\r\n{27}{30}:{1};\r\n{27}{29}:{1};\r\n{27}{31}:{1};\r\n{27}{32}:{1};\r\n}}\r\n.tab{25}{35} {{\r\n{26}:{3};   \r\n}}\r\n.tab{25}{35}-hidden{{\r\n{27}{30}:{3};\r\n{27}{29}:{3};\r\n{27}{31}:{3};\r\n{27}{32}:{1};\r\n}}\r\n.tab{25}{35}-hidden:hover{{\r\n{26}:{7};\r\n{27}{29}:{7};\r\n{27}{31}:{7};\r\n}}\r\n.tab{25}{35}-active{{\r\n{27}{30}:{1};\r\n{27}{29}:{1};\r\n{27}{31}:{1};\r\n{27}{32}:{3};\r\n}}\r\n.tab{25}{35}-close{33}{{\r\ncolor:{1};\t\r\n}}\r\n.tab{25}{35}-close{33}:hover{{\r\ncolor:{24};\r\n\t{26}:{2};\r\n\t{27}:1px solid {19};\r\n}}\r\n.input{25} {{\r\n{27}:1px solid {1};   \r\n{26}:{14};\r\n}}\r\n.simple{33}{{\r\n{27}:1px solid {19};\r\n{26}:{3};\r\n}}\r\n.simple{33}:hover:not(.disabled)\r\n{{\r\n\t{26}:{1};\r\n}}\r\n.simple{33}:active:not(.disabled)\r\n{{\r\n\t{26}:{12};\r\n{27}: 1px solid {20};\r\n}}\r\n@keyframes ColorFlash {{\r\nfrom {{ {26}: {23};}}\r\nto {{ {26}: {0};}}\r\n}}\r\n.form-base{{\r\n{27}-color:{0};\r\n}}\r\n.{34}{{\r\n{26}:{0};  \r\n}}\r\n.{34}-title{{\r\ncolor:{23}; \r\n}}\r\n.{34}-{33}{{\r\ncolor:{23};\r\n}}\r\n.{34}-{33}:hover:not(.{34}-{33}-close){{\r\n{26}:{8};\r\n}}\r\n.{34}-{33}:active:not(.{34}-{33}-close){{\r\n{26}:{9};\r\n}}\r\n.{34}-{33}-close:hover{{\r\n{26}:{10};\r\n}}\r\n.{34}-{33}-close:active{{\r\n{26}:{11};\r\n}}\r\n.cell{{\r\n{27}: 1px solid {3};   \r\n}}\r\n.cellrow{{\r\n{26}:{14};\r\n}}\r\n.cellrow:hover{{\r\n{26}:{3} !important;\r\n}}\r\n.cellrow:active{{\r\n{26}:{12} !important;\r\n}}\r\n.even{{\r\n   {26}:{13} !important;\r\n}}\r\n.cellrow-selected{{\r\n{26}:{17} !important;\r\n}}\r\n.cellrow-selected:hover{{\r\n{26}:{18} !important;\r\n}}\r\n.{36}{{\r\n{26}:{3};\r\n{27}-right:1px solid {19} !important;\r\n}}\r\n.{36}:hover{{\r\n{26}:{1};\r\n}}\r\n.{36}:active{{\r\n{26}:{12};\r\n}}\r\n.{36}-container{{\r\n{26}:{3};\r\n{27}-bottom:1px solid {19} !important;\t\r\n}}\r\n.grid{{\r\n{26}:{14};\r\n{27}:1px solid {19}; \r\n}}\r\n.progressbar{{\r\n{27}:1px solid {19};\r\n{26}:{14};\r\n}}\r\n.progressbarbody{{\r\n{26}:{0};\r\n}}\r\n.contextmenu{{\r\n{26}:{14}; \r\n{27}: solid 1px {21};\r\n}}\r\n.contextitem:hover{{\r\n{26}:{15};\r\n}}\r\n.contextitemseperator{{\r\n{26}:{16};\r\n}}\r\n.dialog{33}section{{\r\n{26}:{3};\r\n}}\r\n.split{25}\r\n{{\r\n{27}:1px solid {19};\r\n}}\r\n.splittervertical {{\r\n{27}-left: 1px {4} solid;\r\n{27}-right: 1px {4} solid;\r\n}}\r\n.splitterhorizontal {{\r\n{27}-top: 1px {4} solid;\r\n{27}-bottom: 1px {4} solid;\r\n}}\r\n.splitterhorizontal:hover {{\r\n{26}:{4};\r\n}}\r\n.splittervertical:hover {{\r\n{26}:{4};\r\n}}\r\n.tool-tip{{\r\n{26}:{14};\r\n{27}: solid 1px {21};\r\n}}\r\n",
            onF2ShowThemeForm: true,
            toolTipPopupDelayMs: 1000,
            toolTipPopupStayOpenDelayPerWordMs: 250,
            config: {
                init: function () {
                    this.resourceManangerSheets = new (System.Collections.Generic.List$1(StyleSheet))();
                    this.consoleDefaultSize = new ExpressCraft.Vector2.$ctor1(540, 240);
                    this.isChrome = Bridge.Browser.isChrome;
                }
            },
            getWindowManagerVisible: function () {
                return ExpressCraft.Settings._WindowManagerVisible;
            },
            setWindowManagerVisible: function (value) {
                if (value !== ExpressCraft.Settings._WindowManagerVisible) {
                    ExpressCraft.Settings._WindowManagerVisible = value;
                    ExpressCraft.Form.setupWindowManager();
                }
            },
            getIncludeFocusRegion: function () {
                return ExpressCraft.Settings._includeFocusRegion;
            },
            setIncludeFocusRegion: function (value) {
                if (ExpressCraft.Settings._includeFocusRegion !== value) {
                    ExpressCraft.Settings._includeFocusRegion = value;
                    ExpressCraft.Settings.applyActiveTheme();
                }
            },
            getActiveTheme: function () {
                return ExpressCraft.Settings._activeTheme;
            },
            setActiveTheme: function (value) {
                if (!Bridge.referenceEquals(ExpressCraft.Settings._activeTheme, value)) {
                    ExpressCraft.Settings._activeTheme = value;
                    ExpressCraft.Settings.applyActiveTheme();
                }
            },
            setup: function () {
                ExpressCraft.Settings.setupStyleDefaults();
                ExpressCraft.Settings.setActiveTheme(ExpressCraft.Theme.theme1);
            },
            setupStyleDefaults: function () {
                var sheets = document.styleSheets;
                for (var i = 0; i < sheets.length; i = (i + 1) | 0) {
                    var ownerNode = Bridge.as(sheets[i].ownerNode, HTMLLinkElement);
                    if (ownerNode == null) {
                        continue;
                    }
                    if (Bridge.referenceEquals(ownerNode.id.toLowerCase(), "expresscraft")) {
                        ExpressCraft.Settings.defaultStyleSheet = sheets[i];
                    }
                    if (Bridge.referenceEquals(ownerNode.id.toLowerCase(), "expresscraftplugin")) {
                        ExpressCraft.Settings.pluginStyleSheet = sheets[i];
                    }
                    if (Bridge.referenceEquals(ownerNode.id.toLowerCase(), "resourcemanager")) {
                        ExpressCraft.Settings.resourceManangerSheets.add(sheets[i]);
                    }
                }
                if (ExpressCraft.Settings.defaultStyleSheet == null) {
                    return;
                }
                var df = ExpressCraft.Settings.getExpressStyleRuleValue("font", ".control");
                if (df != null) {
                    ExpressCraft.Settings.defaultFont = df;
                }
            },
            getStyleRuleValue$1: function (cssFile, style, className) {
                var $t;
                try {
                    if (cssFile != null) {
                        $t = Bridge.getEnumerator(cssFile);
                        while ($t.moveNext()) {
                            var item = $t.getCurrent();
                            var value = ExpressCraft.Settings.getStyleRuleValue(item, style, className);
                            if (value != null) {
                                return value;
                            }
                        }
                    }
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);

                }
                return null;
            },
            getStyleRuleValue: function (cssFile, style, className) {
                try {
                    if (cssFile != null) {
                        var pStyles = cssFile;
                        if (pStyles.cssRules) {
                            for (var i = 0; i < pStyles.cssRules.length; i = (i + 1) | 0) {
                                var rule = pStyles.cssRules[i];
                                if (rule.selectorText && !Bridge.referenceEquals(rule.selectorText.split(44).indexOf(className), -1)) {
                                    return rule.style[style];
                                }
                            }
                        }
                    }
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);

                }
                return null;
            },
            getExpressStyleRuleValue: function (style, className) {
                var value = ExpressCraft.Settings.getStyleRuleValue(ExpressCraft.Settings.pluginStyleSheet, style, className);
                if (value == null) {
                    value = ExpressCraft.Settings.getStyleRuleValue(ExpressCraft.Settings.defaultStyleSheet, style, className);
                }
                return value;
            },
            applyActiveTheme: function () {
                if (ExpressCraft.Settings.themeElement != null) {
                    ExpressCraft.Settings.themeElement.parentElement.removeChild(ExpressCraft.Settings.themeElement);
                }
                if (ExpressCraft.Settings._activeTheme == null) {
                    ExpressCraft.Settings._activeTheme = ExpressCraft.Theme.theme1;
                }
                var objList = new (System.Collections.Generic.List$1(Object))();
                objList.addRange(ExpressCraft.Settings._activeTheme.getColors());
                objList.addRange(System.Array.init(["control", "background-color", "border", "ribbon", "-left-color", "-top-color", "-right-color", "-bottom-color", "button", "form-heading", "pageheader", "heading"], Object));


                ExpressCraft.Settings.themeElement = Bridge.merge(document.createElement('style'), {
                    innerHTML: System.String.format.apply(System.String, [System.String.replaceAll(ExpressCraft.Settings.themeTemplate, "#focusLine;", ExpressCraft.Settings._includeFocusRegion ? ExpressCraft.Settings.themefocusValue : "")].concat(objList.toArray()))
                } );

                document.body.appendChild(ExpressCraft.Settings.themeElement);
            }
        }
    });

    Bridge.define("ExpressCraft.SortSetting", {
        column: null,
        sortMode: 0
    });

    Bridge.define("ExpressCraft.TextBlock", {
        originalSource: null,
        maxWidth: 0,
        computedHeight: 0,
        linesComputed: 0,
        elelemtsOverMax: false,
        maxCalculatedWidth: 0,
        ctor: function (source, maxWidth) {
            this.$initialize();
            this.originalSource = source;
            this.maxWidth = maxWidth;
        },
        computeString: function () {
            this.elelemtsOverMax = false;
            var Lines = this.originalSource.split("\r\n");

            var sizePerChar = ExpressCraft.Control.getTextWidth("M", ExpressCraft.Settings.defaultFont);

            this.linesComputed = 0;

            for (var i = 0; i < Lines.length; i = (i + 1) | 0) {
                var line = Lines[i];

                var lineWidth = ExpressCraft.Control.getTextWidth(this.originalSource, ExpressCraft.Settings.defaultFont);

                if (lineWidth > this.maxWidth) {
                    this.elelemtsOverMax = true;
                    this.maxCalculatedWidth = this.maxWidth;
                    var yy = 0;
                    for (var x = 0; x < line.length; x = (x + 1) | 0) {
                        yy = (yy + 1) | 0;

                        if (yy * sizePerChar > this.maxWidth) {
                            this.linesComputed = (this.linesComputed + 1) | 0;
                            yy = 0;
                        }
                    }

                    if (yy > 0) {
                        this.linesComputed = (this.linesComputed + 1) | 0;
                    }
                } else {
                    this.linesComputed = (this.linesComputed + 1) | 0;
                    if (lineWidth > this.maxCalculatedWidth) {
                        this.maxCalculatedWidth = lineWidth;
                    }
                }
            }
            this.computedHeight = this.getFontSize(ExpressCraft.Settings.defaultFont) * this.linesComputed;
        },
        getFontSize: function (fontWithSize) {
            var strs = System.String.split(fontWithSize, System.Array.init([32], System.Char).map(function(i) {{ return String.fromCharCode(i); }}), null, 1);

            for (var i = 0; i < strs.length; i = (i + 1) | 0) {
                if (System.String.endsWith(strs[i], "pt")) {
                    return parseFloat(strs[i]) * 1.333333;
                } else if (System.String.endsWith(strs[i], "px")) {
                    return parseFloat(strs[i]);
                }
            }

            return 10.9999971;
        }
    });

    Bridge.define("ExpressCraft.Theme", {
        statics: {
            theme1: null,
            config: {
                init: function () {
                    this.theme1 = new ExpressCraft.Theme(["#0173C7", "#C5C5C5", "#CCCCCC", "#F0F0F0", "#C3C3C3", "#ADADAD", "#2A8AD0", "#D3D3D3", "#2A8AD4", "#015C9F", "#E81123", "#F1707A", "#AEAEAE", "#FAFAFA", "#ffffff", "#CFCFCF", "#B9B9B9", "rgba(1, 115, 199, 0.3)", "rgba(1, 115, 199, 0.5)", "#A6A6A6", "#777777", "#80868A", "#404040", "#ffffff", "#000000"]);
                }
            }
        },
        config: {
            properties: {
                Colors: null
            }
        },
        ctor: function (colors) {
            if (colors === void 0) { colors = []; }

            this.$initialize();
            if (colors != null && colors.length === 25) {
                this.setColors(colors);
            }

            //BackgroundColor1 = bgc1;
            //BackgroundColor2 = bgc2;
            //BackgroundColor3 = bgc3;
            //BackgroundColor4 = bgc4;
            //BackgroundColor5 = bgc5;
            //BackgroundColor6 = bgc6;
            //BackgroundColor7 = bgc7;
            //BackgroundColor8 = bgc8;
            //BackgroundColor9 = bgc9;
            //BackgroundColor10 = bgc10;
            //BackgroundColor11 = bgc11;
            //BackgroundColor12 = bgc12;
            //BackgroundColor13 = bgc13;
            //BackgroundColor14 = bgc14;		
            //BackgroundColor15 = bgc15;
            //BackgroundColor16 = bgc16;
            //BackgroundColor17 = bgc17;
            //BackgroundColor18 = bgc18;
            //BackgroundColor19 = bgc19;
            //BorderColor1 = bc1;
            //BorderColor2 = bc2;
            //BorderColor3 = bc3;
            //ForeColor1 = fc1;
            //ForeColor2 = fc2;
            //ForeColor3 = fc3;
        }
    });

    Bridge.define("ExpressCraft.ToolTip", {
        description: null,
        heading: null,
        attachedControl: null,
        ctor: function (content) {
            this.$initialize();
            this.description = content;
        },
        $ctor1: function (heading, description) {
            this.$initialize();
            this.description = description;
            this.heading = heading;
        },
        getWordCount: function () {
            var fullContent = [this.heading, " ", this.description].join('').trim();
            var length = fullContent.length;
            var prevChar = 0;
            var builder = new System.Text.StringBuilder();
            var current;
            var WordCount = 1;
            for (var i = 0; i < length; i = (i + 1) | 0) {
                current = fullContent.charCodeAt(i);
                if (System.Char.isWhiteSpace(String.fromCharCode(current))) {
                    if (System.Char.isWhiteSpace(String.fromCharCode(prevChar))) {
                        prevChar = current;
                        continue;
                    } else {
                        WordCount = (WordCount + 1) | 0;
                    }
                }
                prevChar = current;
            }
            return WordCount;
        }
    });

    Bridge.define("ExpressCraft.Vector2", {
        $kind: "struct",
        statics: {
            getDefaultValue: function () { return new ExpressCraft.Vector2(); }
        },
        x: null,
        y: null,
        $ctor1: function (x, y) {
            this.$initialize();
            this.x = x;
            this.y = y;
        },
        ctor: function () {
            this.$initialize();
        },
        getXi: function () {
            return this.x;
        },
        setXi: function (value) {
            this.x = value;
        },
        getYi: function () {
            return this.y;
        },
        setYi: function (value) {
            this.y = value;
        },
        getXf: function () {
            return this.x;
        },
        setXf: function (value) {
            this.x = value;
        },
        getYf: function () {
            return this.y;
        },
        setYf: function (value) {
            this.y = value;
        },
        getHashCode: function () {
            var h = Bridge.addHash([1955977157, this.x, this.y]);
            return h;
        },
        equals: function (o) {
            if (!Bridge.is(o, ExpressCraft.Vector2)) {
                return false;
            }
            return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y);
        },
        $clone: function (to) {
            var s = to || new ExpressCraft.Vector2();
            s.x = this.x;
            s.y = this.y;
            return s;
        }
    });

    Bridge.define("ExpressCraft.Vector4", {
        $kind: "struct",
        statics: {
            getDefaultValue: function () { return new ExpressCraft.Vector4(); }
        },
        x: null,
        y: null,
        z: null,
        m: null,
        $ctor1: function (x, y, z, m) {
            this.$initialize();
            this.x = x;
            this.y = y;
            this.z = z;
            this.m = m;
        },
        ctor: function () {
            this.$initialize();
        },
        getHashCode: function () {
            var h = Bridge.addHash([1956108229, this.x, this.y, this.z, this.m]);
            return h;
        },
        equals: function (o) {
            if (!Bridge.is(o, ExpressCraft.Vector4)) {
                return false;
            }
            return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.z, o.z) && Bridge.equals(this.m, o.m);
        },
        $clone: function (to) {
            var s = to || new ExpressCraft.Vector4();
            s.x = this.x;
            s.y = this.y;
            s.z = this.z;
            s.m = this.m;
            return s;
        }
    });

    Bridge.define("ExpressCraft.WindowState", {
        $kind: "enum",
        statics: {
            Normal: 0,
            Minimized: 1,
            Maximized: 2
        }
    });

    Bridge.define("ExpressCraft.AceCodeEditor", {
        inherits: [ExpressCraft.Control],
        statics: {
            externalAceCodeEditor: null,
            config: {
                init: function () {
                    this.externalAceCodeEditor = new ExpressCraft.ExternalPlugin("https://ace.c9.io/build/src/ace.js");
                }
            },
            setup: function () {
                ExpressCraft.AceCodeEditor.externalAceCodeEditor.setup();
            }
        },
        editor: null,
        _modeType: 0,
        _themeType: 0,
        ctor: function (modeType, themeType) {
            if (modeType === void 0) { modeType = 17; }
            if (themeType === void 0) { themeType = 11; }

            this.$initialize();
            ExpressCraft.Control.ctor.call(this);
            this._modeType = modeType;
            this._themeType = themeType;
        },
        getReadOnly: function () {
            return this.editor.getReadOnly();
        },
        setReadOnly: function (value) {
            this.editor.setReadOnly(value);
        },
        getSource: function () {
            return this.editor.getValue();
        },
        setSource: function (value) {
            this.editor.setValue(value);
        },
        clearSelection: function () {
            this.editor.clearSelection();
        },
        render: function () {
            var $t, $t1;
            ExpressCraft.AceCodeEditor.externalAceCodeEditor.usageCheck();

            var theme = ($t=this._modeType, System.Enum.format(ExpressCraft.AceModeTypes, $t, "G"));
            var mode = ($t1=this._modeType, System.Enum.format(ExpressCraft.AceModeTypes, $t1, "G"));

            			
			this.editor = ace.edit(this.content);
			this.editor.setTheme("ace/theme/" + theme);
			this.editor.getSession().setMode("ace/mode/" + mode);	
			
            this.onResize = $asm.$.ExpressCraft.AceCodeEditor.f1;

            this.content.addEventListener("mousedown", $asm.$.ExpressCraft.AceCodeEditor.f2);

            this.content.addEventListener("mouseup", $asm.$.ExpressCraft.AceCodeEditor.f3);

            ExpressCraft.Control.prototype.render.call(this);
        }
    });

    Bridge.ns("ExpressCraft.AceCodeEditor", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.AceCodeEditor, {
        f1: function (cont) {
            
				this.editor.resize(true);
				
        },
        f2: function (ev) {
            ExpressCraft.Form.inExternalMouseEvent = true;
        },
        f3: function (ev) {
            ExpressCraft.Form.inExternalMouseEvent = false;
        }
    });

    Bridge.define("ExpressCraft.TextInput", {
        inherits: [ExpressCraft.Control],
        prevText: "",
        onTextChanged: null,
        onKeyDown: null,
        onKeyUp: null,
        onKeyPress: null,
        type: "button",
        enabled: true,
        _readonly: false,
        ctor: function (type, ac) {
            if (type === void 0) { type = 19; }
            if (ac === void 0) { ac = true; }

            this.$initialize();
            ExpressCraft.Control.$ctor3.call(this, "inputcontrol", type, ac);
            this.type = type;
            this.content.onchange = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f1);
            this.content.oncontextmenu = $asm.$.ExpressCraft.TextInput.f2;
            this.content.onkeypress = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f3);
            this.content.onkeydown = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f4);
            this.content.onkeyup = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f5);
            this.content.addEventListener("paste", Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f6));
            this.content.addEventListener("cut", Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f6));
        },
        getText: function () {
            if (this.type === "checkbox") {
                return System.Boolean.toString(this.content.checked);
            } else {
                return this.content.value;
            }
        },
        setText: function (value) {
            if (this.type === "checkbox") {
                value = value.toLowerCase();
                this.content.checked = ExpressCraft.Helper.isTrue(value) === 1;
            } else {
                this.content.value = value;
            }


            this.checkTextChanged();
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
        },
        getReadonly: function () {
            return this._readonly;
        },
        setReadonly: function (value) {
            this._readonly = value;
            if (this._readonly) {
                this.content.setAttribute("readonly", System.Boolean.toString((this._readonly)));
            } else {
                this.content.removeAttribute("readonly");
            }
        },
        checkTextChanged: function () {
            if (!Bridge.referenceEquals(this.getText(), this.prevText)) {
                if (!Bridge.staticEquals(this.onTextChanged, null)) {
                    this.onTextChanged(this);
                }
                this.prevText = this.getText();
            }
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);
            this.prevText = this.getText();
        },
        setDate: function (date) {
            var obj = this.content;

            if (date != null) {
                var dt = { };
                if (Bridge.Date.tryParse(date, null, dt) && !Bridge.equals(dt.v, new Date(-864e13))) {
                    obj.value = Bridge.Date.format(dt.v, "yyyy-MM-dd");
                } else {
                    obj.value = null;
                }
            } else {
                obj.value = null;
            }
            //obj.value = DateTime.Parse(Convert.ToString(date)).ToString("yyyy-MM-dd");
        },
        getDate: function () {
            var obj = this.content;
            var str = obj.value;
            var dt = { };

            if (Bridge.Date.tryParse(str, null, dt)) {
                return Bridge.Date.format(dt.v, "yyyy-MM-dd");
            } else {
                return "0001-01-01";
            }
        }
    });

    Bridge.ns("ExpressCraft.TextInput", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.TextInput, {
        f1: function (ev) {
            this.checkTextChanged();
        },
        f2: function (ev) {
            ev.stopPropagation();
        },
        f3: function (ev) {
            this.checkTextChanged();
            if (!Bridge.staticEquals(this.onKeyPress, null)) {
                this.onKeyPress(this, ev);
            }
        },
        f4: function (ev) {
            this.checkTextChanged();
            if (!Bridge.staticEquals(this.onKeyDown, null)) {
                this.onKeyDown(this, ev);
            }
        },
        f5: function (ev) {
            this.checkTextChanged();
            if (!Bridge.staticEquals(this.onKeyUp, null)) {
                this.onKeyUp(this, ev);
            }
        },
        f6: function () {
            this.checkTextChanged();
        }
    });

    Bridge.define("ExpressCraft.ComboBoxEdit", {
        inherits: [ExpressCraft.Control],
        comboBoxBase: null,
        previousSelectedIndex: -1,
        selectedIndexChanged: null,
        enabled: true,
        _readonly: false,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor4.call(this, "inputcontrol", ExpressCraft.ComboBoxTypes.Default);
            this.comboBoxBase = Bridge.as(this.content, HTMLSelectElement);

            this.content.oncontextmenu = $asm.$.ExpressCraft.ComboBoxEdit.f1;

            this.comboBoxBase.onchange = Bridge.fn.bind(this, $asm.$.ExpressCraft.ComboBoxEdit.f2);
        },
        getText: function () {
            if (this.comboBoxBase.selectedIndex === -1) {
                return "";
            }
            return this.comboBoxBase.options[this.comboBoxBase.selectedIndex].innerHTML;
        },
        setText: function (value) {
            for (var i = 0; i < this.comboBoxBase.options.length; i = (i + 1) | 0) {
                if (Bridge.referenceEquals(this.comboBoxBase.options[i].innerHTML, value)) {
                    this.comboBoxBase.selectedIndex = i;
                }
            }
            this.comboBoxBase.selectedIndex = -1;
        },
        getValue: function () {
            if (this.comboBoxBase.selectedIndex === -1) {
                return "";
            }
            return this.comboBoxBase.options[this.comboBoxBase.selectedIndex].value;
        },
        setValue: function (value) {
            for (var i = 0; i < this.comboBoxBase.options.length; i = (i + 1) | 0) {
                if (Bridge.referenceEquals(this.comboBoxBase.options[i].value, value)) {
                    this.comboBoxBase.selectedIndex = i;
                }
            }
            this.comboBoxBase.selectedIndex = -1;
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
        },
        getReadonly: function () {
            return this._readonly;
        },
        setReadonly: function (value) {
            this._readonly = value;
            this.content.setAttribute("readonly", System.Boolean.toString((this._readonly)));
        },
        fillData: function (dataitems) {
            if (dataitems === void 0) { dataitems = []; }
            $(this.comboBoxBase).empty();

            if (dataitems == null) {
                for (var i = 0; i < dataitems.length; i = (i + 1) | 0) {
                    this.comboBoxBase.appendChild(Bridge.merge(document.createElement('option'), {
                        innerHTML: dataitems[i].text,
                        value: dataitems[i].value
                    } ));
                }
            }
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);
        }
    });

    Bridge.ns("ExpressCraft.ComboBoxEdit", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ComboBoxEdit, {
        f1: function (ev) {
            ev.stopPropagation();
        },
        f2: function (ev) {
            if (this.previousSelectedIndex !== this.comboBoxBase.selectedIndex) {
                if (!Bridge.staticEquals(this.selectedIndexChanged, null)) {
                    this.selectedIndexChanged(this);
                }

                this.previousSelectedIndex = this.comboBoxBase.selectedIndex;
            }
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.Form", {
        inherits: [ExpressCraft.Control],
        statics: {
            _activeToolTip: null,
            _toolTipTimerHandle: -1,
            _activeToolTipMouseMove: null,
            _activeToolTipControl: null,
            _oepntoolTipTimerHandle: -1,
            movingForm: null,
            parent: null,
            formOverLay: null,
            windowCursorManager: null,
            _hasSetup: false,
            inExternalMouseEvent: false,
            inErrorDialog: false,
            standAloneForms: null,
            formCollections: null,
            _ActiveForm: null,
            _PrevActiveForm: null,
            moveAction: 1,
            windowHolderSelectionBoxX: 0,
            windowHolderSelectionBoxY: 0,
            windowHolderSelectionBoxXOff: 0,
            windowHolderSelectionBoxYOff: 0,
            toClean: null,
            config: {
                properties: {
                    WindowHolder: null,
                    WindowManager: null,
                    WindowManagerStart: null,
                    WindowManagerSearch: null,
                    ResizeCorners: 2,
                    Mouse_Down: false,
                    ShowBodyOverLay: false,
                    Window_DefaultHeight: 480,
                    Window_DefaultWidth: 640
                },
                init: function () {
                    this.standAloneForms = new ExpressCraft.FormCollection(null);
                    this.formCollections = new (System.Collections.Generic.List$1(ExpressCraft.FormCollection))();
                    this.toClean = new (System.Collections.Generic.List$1(ExpressCraft.Form))();
                }
            },
            getActiveToolTip: function () {
                return ExpressCraft.Form._activeToolTip;
            },
            setActiveToolTip: function (value) {
                if (!Bridge.referenceEquals(ExpressCraft.Form._activeToolTip, value)) {
                    if (value != null && value.attachedControl != null && value.attachedControl.content != null) {
                        if (!Bridge.staticEquals(ExpressCraft.Form._activeToolTipMouseMove, null)) {
                            value.attachedControl.content.removeEventListener("mousemove", ExpressCraft.Form._activeToolTipMouseMove);
                            ExpressCraft.Form._activeToolTipMouseMove = null;
                        }
                    }
                    if (ExpressCraft.Form._activeToolTipControl != null) {
                        ExpressCraft.Form._activeToolTipControl.close();
                        ExpressCraft.Form._activeToolTipControl = null;
                    }
                    if (ExpressCraft.Form._toolTipTimerHandle > -1) {
                        Bridge.global.clearTimeout(ExpressCraft.Form._toolTipTimerHandle);
                        ExpressCraft.Form._toolTipTimerHandle = -1;
                    }

                    ExpressCraft.Form._activeToolTip = value;


                    var messageLength;
                    if (ExpressCraft.Form._activeToolTip != null && ((messageLength = ExpressCraft.Form._activeToolTip.getWordCount())) > 0 && ExpressCraft.Form._activeToolTip.attachedControl != null) {
                        ExpressCraft.Form._activeToolTipMouseMove = function (ev) {
                            if (ExpressCraft.Form._toolTipTimerHandle > -1) {
                                Bridge.global.clearTimeout(ExpressCraft.Form._toolTipTimerHandle);
                            }
                            ExpressCraft.Form._toolTipTimerHandle = Bridge.global.setTimeout(function () {
                                if (ExpressCraft.Form._activeToolTipControl != null) {
                                    ExpressCraft.Form._activeToolTipControl.close();
                                    ExpressCraft.Form._activeToolTipControl = null;
                                }
                                if (ExpressCraft.Form._oepntoolTipTimerHandle > -1) {
                                    Bridge.global.clearTimeout(ExpressCraft.Form._oepntoolTipTimerHandle);
                                    ExpressCraft.Form._oepntoolTipTimerHandle = -1;
                                }
                                ExpressCraft.Form._activeToolTipControl = new ExpressCraft.ToolTipControl(ExpressCraft.Form._activeToolTip);
                                ExpressCraft.Form._activeToolTipControl.show(ev);

                                ExpressCraft.Form._oepntoolTipTimerHandle = Bridge.global.setTimeout($asm.$.ExpressCraft.Form.f1, Math.max(1000, ((messageLength * Math.max(ExpressCraft.Settings.toolTipPopupStayOpenDelayPerWordMs, 10)) | 0)));

                                if (!Bridge.staticEquals(ExpressCraft.Form._activeToolTipMouseMove, null)) {
                                    value.attachedControl.content.removeEventListener("mousemove", ExpressCraft.Form._activeToolTipMouseMove);
                                    ExpressCraft.Form._activeToolTipMouseMove = null;
                                }
                            }, Math.max(1, ExpressCraft.Settings.toolTipPopupDelayMs));
                        };
                        value.attachedControl.content.addEventListener("mousemove", ExpressCraft.Form._activeToolTipMouseMove);
                    }
                }
            },
            getActiveForm: function () {
                return ExpressCraft.Form._ActiveForm;
            },
            setActiveForm: function (value) {
                if (!Bridge.referenceEquals(ExpressCraft.Form._ActiveForm, value)) {
                    ExpressCraft.Form._PrevActiveForm = ExpressCraft.Form._ActiveForm;

                    if (ExpressCraft.Form._ActiveForm != null) {
                        ExpressCraft.Form._ActiveForm.onLostFocus();
                        if (ExpressCraft.Form._ActiveForm.content != null) {
                            if (ExpressCraft.Form._ActiveForm.inDesign) {
                                ExpressCraft.Form._ActiveForm.getBodyOverLay().style.visibility = "collapse";
                                return;
                            }
                            ExpressCraft.Form._ActiveForm.getBodyOverLay().style.visibility = "visible";
                        }
                    }
                    ExpressCraft.Form._ActiveForm = value;
                    if (ExpressCraft.Form._ActiveForm != null) {
                        ExpressCraft.Form._ActiveForm.onGotFocus();
                        if (ExpressCraft.Form._ActiveForm.content != null) {
                            ExpressCraft.Form._ActiveForm.getBodyOverLay().style.visibility = "collapse";
                            ExpressCraft.Form._ActiveForm.bringToFront();
                        }
                    }
                }

            },
            midleOfAction: function () {
                return ExpressCraft.Form.movingForm != null; // WindowHolderSelectionBox != null ||
            },
            getActiveFormCollection: function () {
                for (var i = (ExpressCraft.Form.formCollections.getCount() - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var frmCol = ExpressCraft.Form.formCollections.getItem(i);
                    if (frmCol.formOwner == null) {
                        for (var x = 0; x < frmCol.visibleForms.getCount(); x = (x + 1) | 0) {
                            if (frmCol.visibleForms.getItem(x) != null) {
                                frmCol.visibleForms.getItem(x).close();
                            }
                        }
                        ExpressCraft.Form.formCollections.removeAt(i);
                    } else {
                        return frmCol;
                    }
                }

                return null;
            },
            setBodyOverLay: function () {
                var ActiveCollection = ExpressCraft.Form.getActiveFormCollection();
                if (ActiveCollection == null) {
                    return;
                }

                ActiveCollection.formOwner.showBodyOverLayStyle();

                var VisibleForms = ActiveCollection.visibleForms;

                for (var i = 0; i < VisibleForms.getCount(); i = (i + 1) | 0) {
                    var form = VisibleForms.getItem(i);
                    if (form != null) {
                        form.showBodyOverLayStyle();
                    }
                }
            },
            changeStateTextSelection: function (element, state) {
                if (state) {
                    $(element).css("user-select", "text");
                } else {
                    $(element).css("user-select", "none");
                }
            },
            disableStateDrag: function (element) {
                if (Bridge.is(element, HTMLImageElement)) {
                    element.ondragstart = $asm.$.ExpressCraft.Form.f2;
                } else {
                    $(element).css("user-drag:", "none");
                }
            },
            setupHideElementsOnView: function () {
                window.onblur = $asm.$.ExpressCraft.Form.f3;

                window.onfocus = $asm.$.ExpressCraft.Form.f4;
            },
            setupWindowManager: function () {
                if (ExpressCraft.Form.parent == null || ExpressCraft.Form.getWindowHolder() == null) {
                    return;
                }

                if (ExpressCraft.Settings.getWindowManagerVisible()) {
                    ExpressCraft.Form.getWindowHolder().style.height = "calc(100% - 40px)";
                    if (!System.Linq.Enumerable.from(ExpressCraft.Form.parent.children).contains(ExpressCraft.Form.getWindowManager())) {
                        ExpressCraft.Form.parent.appendChild(ExpressCraft.Form.getWindowManager());
                    }
                } else {
                    ExpressCraft.Form.getWindowHolder().style.height = "100%";
                    if (System.Linq.Enumerable.from(ExpressCraft.Form.parent.children).contains(ExpressCraft.Form.getWindowManager())) {
                        ExpressCraft.Form.parent.removeChild(ExpressCraft.Form.getWindowManager());
                    }
                }
            },
            setup: function (parent) {
                if (parent === void 0) { parent = null; }
                //Settings.Setup();
                if (ExpressCraft.Form._hasSetup) {
                    return;
                }
                ExpressCraft.Form._hasSetup = true;

                if (parent == null) {
                    ExpressCraft.Form.parent = document.body;
                } else {
                    ExpressCraft.Form.parent = parent;
                }

                ExpressCraft.Form.windowCursorManager = document.createElement('style');

                ExpressCraft.Form.setWindowHolder(ExpressCraft.Control.div$1("form-container"));
                ExpressCraft.Form.setWindowManager(ExpressCraft.Control.div$1("form-manager"));
                ExpressCraft.Form.setWindowManagerStart(ExpressCraft.Control.div$1("form-manager-start"));

                ExpressCraft.Form.setWindowManagerSearch(new ExpressCraft.TextInput());
                ExpressCraft.Form.getWindowManagerSearch().getClassList().add("form-manager-search");

                ExpressCraft.Form.formOverLay = ExpressCraft.Control.div$1("system-form-collection-overlay");
                ExpressCraft.Form.formOverLay.onmousedown = $asm.$.ExpressCraft.Form.f5;
                ExpressCraft.Form.formOverLay.onclick = $asm.$.ExpressCraft.Form.f6;
                ExpressCraft.Form.formOverLay.oncontextmenu = $asm.$.ExpressCraft.Form.f7;
                ExpressCraft.Form.formOverLay.style.visibility = "visible";

                window.onkeyup = $asm.$.ExpressCraft.Form.f8;

                window.onresize = $asm.$.ExpressCraft.Form.f9;
                window.onmousemove = $asm.$.ExpressCraft.Form.f10;

                window.onmouseup = $asm.$.ExpressCraft.Form.f11;
                window.onbeforeunload = $asm.$.ExpressCraft.Form.f12;
                window.onerror = Bridge.fn.combine(window.onerror, $asm.$.ExpressCraft.Form.f13);

                ExpressCraft.Form.getWindowHolder().appendChild(ExpressCraft.Form.formOverLay);
                ExpressCraft.Helper.appendChildren$1(ExpressCraft.Form.getWindowManager(), [ExpressCraft.Form.getWindowManagerStart(), ExpressCraft.Control.op_Implicit(ExpressCraft.Form.getWindowManagerSearch())]);

                ExpressCraft.Helper.appendChildren$1(ExpressCraft.Form.parent, [ExpressCraft.Form.getWindowHolder(), ExpressCraft.Form.windowCursorManager]);

                ExpressCraft.Form.setupWindowManager();
            },
            setCursor: function (cursor) {
                ExpressCraft.Form.windowCursorManager.innerHTML = System.String.format("\r\n\t\t\t\t.control{    \r\n\t\t\t\t\tcursor:{0} !important;    \r\n\t\t\t\t}", cursor);
            },
            calculateZOrder$1: function (formCollection, zIndex) {
                zIndex = {v:zIndex};
                var TopMostForms = new (System.Collections.Generic.List$1(ExpressCraft.Form))();

                var VisibleForms = formCollection.visibleForms;

                if (formCollection.formOwner != null) {
                    formCollection.formOwner.setZIndex(zIndex);
                }

                for (var i = 0; i < VisibleForms.getCount(); i = (i + 1) | 0) {
                    if (VisibleForms.getItem(i).content == null) {
                        ExpressCraft.Form.toClean.add(VisibleForms.getItem(i));
                    } else {
                        if (VisibleForms.getItem(i).topMost) {
                            TopMostForms.add(VisibleForms.getItem(i));
                        }
                    }
                }
                for (var i1 = 0; i1 < ExpressCraft.Form.toClean.getCount(); i1 = (i1 + 1) | 0) {
                    if (VisibleForms.contains(ExpressCraft.Form.toClean.getItem(i1))) {
                        VisibleForms.remove(ExpressCraft.Form.toClean.getItem(i1));
                        ExpressCraft.Form.toClean.setItem(i1, null);
                    }

                }
                ExpressCraft.Form.toClean.remove(null); // Removes all nulls..

                for (var i2 = 0; i2 < TopMostForms.getCount(); i2 = (i2 + 1) | 0) {
                    var form = TopMostForms.getItem(i2);
                    VisibleForms.remove(form);
                    VisibleForms.add(form);
                }
                for (var i3 = 0; i3 < VisibleForms.getCount(); i3 = (i3 + 1) | 0) {
                    if (VisibleForms.getItem(i3) != null && VisibleForms.getItem(i3).content != null) {
                        VisibleForms.getItem(i3).setZIndex(zIndex);
                    }
                }

                return zIndex.v;
            },
            calculateZOrder: function () {
                ExpressCraft.Form.getActiveFormCollection();

                if (ExpressCraft.Form.formCollections == null && ExpressCraft.Form.standAloneForms.visibleForms.getCount() === 0) {
                    return;
                }
                ExpressCraft.Form.formCollections.remove(null);

                var zIndex = 1;
                if (ExpressCraft.Form.formCollections.getCount() === 0) {
                    ExpressCraft.Form.formOverLay.style.zIndex = "";
                } else {
                    if (ExpressCraft.Form.formCollections.getCount() === 1) {
                        ExpressCraft.Form.formOverLay.style.opacity = "0";
                    } else {
                        ExpressCraft.Form.formOverLay.style.opacity = "0.4";
                    }
                }

                for (var x = 0; x < ExpressCraft.Form.formCollections.getCount(); x = (x + 1) | 0) {
                    if (x === ((ExpressCraft.Form.formCollections.getCount() - 1) | 0)) {
                        ExpressCraft.Form.formOverLay.style.zIndex = (Bridge.identity(zIndex, (zIndex = (zIndex + 1) | 0))).toString();
                    }
                    zIndex = ExpressCraft.Form.calculateZOrder$1(ExpressCraft.Form.formCollections.getItem(x), zIndex);
                }
                zIndex = ExpressCraft.Form.calculateZOrder$1(ExpressCraft.Form.standAloneForms, zIndex);
            }
        },
        inDesign: false,
        allowSizeChange: true,
        allowMoveChange: true,
        forReuse: false,
        self: null,
        _IsDialog: false,
        children: null,
        startPosition: 2,
        topMost: false,
        dialogResult: 0,
        prev_px: 0,
        prev_py: 0,
        prev_width: 0,
        prev_height: 0,
        prev_top: 0,
        prev_left: 0,
        windowState: 0,
        dialogResults: null,
        _seperateInstance: false,
        closeAction: null,
        inDialogResult: false,
        config: {
            properties: {
                Heading: null,
                ButtonClose: null,
                ButtonExpand: null,
                ButtonMinimize: null,
                HeadingTitle: null,
                Body: null,
                BodyOverLay: null,
                Owner: null,
                MinWidth: 200,
                MinHeight: 50
            },
            init: function () {
                this.children = new (System.Collections.Generic.List$1(ExpressCraft.Control))();
                this.dialogResults = new (System.Collections.Generic.List$1(ExpressCraft.DialogResult))();
            }
        },
        ctor: function (font) {
            if (font === void 0) { font = "8.25pt Tahoma"; }

            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "form-base");
            if (!System.String.isNullOrWhiteSpace(font)) {
                this.getStyle().font = font;
            }
            this.setHeading(ExpressCraft.Control.div$1("form-heading"));
            this.getHeading().style.font = ExpressCraft.Settings.Font;

            this.getHeading().oncontextmenu = $asm.$.ExpressCraft.Form.f7;

            this.setHeadingTitle(ExpressCraft.Control.span$1("form-heading-title"));

            this.setBody(ExpressCraft.Control.div$1("form-body"));

            this.getBody().oncontextmenu = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f14);

            this.setBackColor("#F0F0F0");

            this.setBodyOverLay(ExpressCraft.Control.div$1("form-body-overlay"));

            this.getBodyOverLay().style.opacity = ExpressCraft.Form.getShowBodyOverLay() ? "0.5" : "0";

            this.changeHeadingButton(ExpressCraft.FormButtonType.Close);
            this.changeHeadingButton(ExpressCraft.FormButtonType.Maximize);
            this.changeHeadingButton(ExpressCraft.FormButtonType.Minimize);

            this.getBodyOverLay().style.visibility = "collapse";

            this.self = $(this.content);

            this.content.addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f15));

            this.getHeading().addEventListener("dblclick", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f16));

            this.content.addEventListener("mouseleave", $asm.$.ExpressCraft.Form.f17);

            this.getBody().addEventListener("mouseenter", $asm.$.ExpressCraft.Form.f18);

            this.content.addEventListener("mousemove", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f19));

            this.getHeading().addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f20));

            this.getBody().addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f21));

            this.getBody().addEventListener("mousemove", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f22));

            this.getBodyOverLay().addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f23));

            this.getBody().addEventListener("mouseleave", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f24));

            this.getBodyOverLay().addEventListener("mouseenter", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f25));

            $(this.content).css("width", ExpressCraft.Form.getWindow_DefaultWidth()).css("height", ExpressCraft.Form.getWindow_DefaultHeight());

            this.content.appendChild(this.getHeading());
            this.content.appendChild(this.getBody());
            this.content.appendChild(this.getBodyOverLay());

            this.getHeading().appendChild(this.getHeadingTitle());
            this.getHeading().appendChild(this.getButtonClose());
            this.getHeading().appendChild(this.getButtonExpand());
            this.getHeading().appendChild(this.getButtonMinimize());

            this.closeAction = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f26);

            this.initialise();
        },
        getHasSetup: function () {
            return ExpressCraft.Form._hasSetup;
        },
        getControls: function () {
            return this.getBody().children;
        },
        getShowMinimize: function () {
            return this.getButtonMinimize() != null;
        },
        setShowMinimize: function (value) {
            this.changeHeadingButton(ExpressCraft.FormButtonType.Minimize, value);
        },
        getBodyStyle: function () {
            return this.getBody().style;
        },
        getShowClose: function () {
            return this.getButtonClose() != null;
        },
        setShowClose: function (value) {
            this.changeHeadingButton(ExpressCraft.FormButtonType.Close, value);
        },
        getShowMaximize: function () {
            return this.getButtonClose() != null;
        },
        setShowMaximize: function (value) {
            this.changeHeadingButton(ExpressCraft.FormButtonType.Maximize, value);
        },
        getWindowstate: function () {
            return this.windowState;
        },
        setWindowstate: function (value) {
            this.setWindowState(value);
        },
        getText: function () {
            return this.getHeadingTitle().innerHTML;
        },
        setText: function (value) {
            this.getHeadingTitle().innerHTML = value;
        },
        getBackColor: function () {
            return this.getBody().style.backgroundColor;
        },
        setBackColor: function (value) {
            this.getBody().style.backgroundColor = value;
        },
        getForeColor: function () {
            return this.getBody().style.color;
        },
        setForeColor: function (value) {
            this.getBody().style.color = value;
        },
        isDialog: function () {
            return this._IsDialog;
        },
        linkchildToForm: function (child) {
            if (child == null) {
                return;
            }
            this.children.add(child);
            child.linkedForm = this;
        },
        linkchildrenToForm: function (children) {
            if (children === void 0) { children = []; }
            if (children == null || children.length === 0) {
                return;
            }
            this.children.addRange(children);
            for (var i = 0; i < children.length; i = (i + 1) | 0) {
                children[i].linkedForm = this;
            }
        },
        appendChild$1: function (node) {
            this.getBody().appendChild(ExpressCraft.Control.op_Implicit(node));

            return this;
        },
        appendChild: function (node) {
            this.getBody().appendChild(node);

            return this;
        },
        appendChildren$1: function (node) {
            if (node === void 0) { node = []; }
            ExpressCraft.Helper.appendChildren$2(this.getBody(), node);

            return this;
        },
        appendChildren: function (node) {
            if (node === void 0) { node = []; }
            ExpressCraft.Helper.appendChildren$1(this.getBody(), node);

            return this;
        },
        resizeChildren: function (parent) {
            if (!Bridge.staticEquals(this.onResize, null)) {
                this.onResize(this);
            }
            this.onResizing();

            for (var x = 0; x < parent.children.length; x = (x + 1) | 0) {
                if (!parent.children[x].classList.contains("control")) {
                    continue;
                }
                for (var i = 0; i < this.children.getCount(); i = (i + 1) | 0) {
                    if (this.children.getItem(i) != null && !Bridge.staticEquals(this.children.getItem(i).onResize, null)) {
                        if (Bridge.referenceEquals(this.children.getItem(i).content, parent.children[x])) {
                            this.children.getItem(i).onResize(this.children.getItem(i));
                            break;
                        }
                    }
                }
                this.resizeChildren(parent.children[x]);
            }
        },
        resizing: function () {
            if (!Bridge.staticEquals(this.onResize, null)) {
                this.onResize(this);
            }
            this.onResizing();

            for (var i = 0; i < this.children.getCount(); i = (i + 1) | 0) {
                if (this.children.getItem(i) != null && !Bridge.staticEquals(this.children.getItem(i).onResize, null)) {
                    this.children.getItem(i).onResize(this.children.getItem(i));
                }
            }
        },
        onResizing: function () {

        },
        isContentVisible: function () {
            return this.content != null && this.content.style.visibility === "visible";
        },
        changeHeadingButton: function (button, visible) {
            if (visible === void 0) { visible = true; }
            switch (button) {
                case ExpressCraft.FormButtonType.Minimize: 
                    if (this.getButtonMinimize() != null) {
                        ExpressCraft.Helper.delete(this.getButtonMinimize());
                        this.setButtonMinimize(null);
                    }
                    if (visible) {
                        this.setButtonMinimize(this.createFormButton(button));

                    }
                    break;
                case ExpressCraft.FormButtonType.Maximize: 
                    if (this.getButtonExpand() != null) {
                        ExpressCraft.Helper.delete(this.getButtonExpand());
                        this.setButtonExpand(null);
                    }
                    if (visible) {
                        this.setButtonExpand(this.createFormButton(button));
                    }
                    break;
                case ExpressCraft.FormButtonType.Close: 
                    if (this.getButtonClose() != null) {
                        ExpressCraft.Helper.delete(this.getButtonClose());
                        this.setButtonClose(null);
                    }
                    if (visible) {
                        this.setButtonClose(this.createFormButton(button));
                    }
                    break;
                default: 
                    break;
            }
        },
        initialise: function () {

        },
        onShowing: function () {

        },
        onShowed: function () {

        },
        onClosing: function () {

        },
        onClosed: function () {

        },
        showBodyOverLayStyle: function () {
            if (this.getBodyOverLay() != null && this.getBodyOverLay().style.visibility === "collapse") {
                if (this.inDesign) {
                    return;
                }
                this.getBodyOverLay().style.visibility = "visible";
            }

        },
        onGotFocus: function () {

        },
        onLostFocus: function () {

        },
        setWindowState: function (State) {
            if (!this.allowSizeChange) {
                return;
            }

            if (((this.windowState = State)) === ExpressCraft.WindowState.Normal) {
                ExpressCraft.Helper.setBounds(this, this.prev_left, this.prev_top, this.prev_width, this.prev_height);
                this.resizing();
            } else if (this.windowState === ExpressCraft.WindowState.Maximized) {
                this.prev_left = ExpressCraft.Helper.toInt(this.getLeft());
                this.prev_top = ExpressCraft.Helper.toInt(this.getTop());
                this.prev_width = ExpressCraft.Helper.toInt(this.getWidth());
                this.prev_height = ExpressCraft.Helper.toInt(this.getHeight());

                var calc_2px = "calc(100% - 2px)";

                ExpressCraft.Helper.setBounds(this, 0, 0, calc_2px, calc_2px);
            }
            this.resizing();
        },
        changeWindowState: function () {
            if (this.windowState === ExpressCraft.WindowState.Maximized) {
                this.setWindowState(ExpressCraft.WindowState.Normal);
            } else {
                this.setWindowState(ExpressCraft.WindowState.Maximized);
            }
        },
        createFormButton: function (Type) {
            var butt = ExpressCraft.Control.div$1("form-heading-button");

            switch (Type) {
                case ExpressCraft.FormButtonType.Close: 
                    butt.classList.add("form-heading-button-close");
                    butt.innerHTML = "X";
                    butt.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f27);
                    butt.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f28);
                    butt.onmouseenter = $asm.$.ExpressCraft.Form.f29;
                    butt.onmouseleave = $asm.$.ExpressCraft.Form.f30;
                    break;
                case ExpressCraft.FormButtonType.Maximize: 
                    if (this.getShowMinimize()) {
                        this.getButtonMinimize().style.left = "calc(100% - 137px)";
                    }
                    butt.style.left = "calc(100% - 91px)"; // StyleController.Calc(100, 91);				
                    butt.innerHTML = "&#9633;";
                    butt.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f31);
                    break;
                case ExpressCraft.FormButtonType.Minimize: 
                    if (this.getShowMaximize()) {
                        butt.style.left = "calc(100% - 137px)"; // StyleController.Calc(100, 137);
                    } else {
                        butt.style.left = "calc(100% - 91px)"; // StyleController.Calc(100, 91);				
                    }
                    butt.innerHTML = "-";
                    butt.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f32);
                    break;
                case ExpressCraft.FormButtonType.Restore: 
                    break;
                case ExpressCraft.FormButtonType.Help: 
                    break;
                default: 
                    butt.onmouseup = $asm.$.ExpressCraft.Form.f33;
                    break;
            }

            butt.ondblclick = $asm.$.ExpressCraft.Form.f34;

            butt.onmousemove = $asm.$.ExpressCraft.Form.f35;

            if (Type !== ExpressCraft.FormButtonType.Close) {
                butt.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f36);
            }

            return butt;
        },
        titleBarHeight: function () {
            return this.getHeading().clientHeight;
        },
        titleBarWidth: function () {
            return this.getHeading().clientWidth;
        },
        clientX: function () {
            return this.getBody().clientLeft;
        },
        clientY: function () {
            return this.getBody().clientTop;
        },
        getFormCollectionFromForm: function (form) {
            if (form._seperateInstance) {
                var visibleForms = ExpressCraft.Form.standAloneForms.visibleForms;
                for (var x = 0; x < visibleForms.getCount(); x = (x + 1) | 0) {
                    if (Bridge.referenceEquals(visibleForms.getItem(x), this)) {
                        return ExpressCraft.Form.standAloneForms;
                    }
                }
            } else {
                for (var i = 0; i < ExpressCraft.Form.formCollections.getCount(); i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this, ExpressCraft.Form.formCollections.getItem(i).formOwner)) {
                        return ExpressCraft.Form.formCollections.getItem(i);
                    }
                    var visibleForms1 = ExpressCraft.Form.formCollections.getItem(i).visibleForms;
                    for (var x1 = 0; x1 < visibleForms1.getCount(); x1 = (x1 + 1) | 0) {
                        if (Bridge.referenceEquals(visibleForms1.getItem(x1), this)) {
                            return ExpressCraft.Form.formCollections.getItem(i);
                        }
                    }
                }
            }

            return null;
        },
        isActiveFormCollection: function () {
            if (this._seperateInstance) {
                return Bridge.referenceEquals(this.getFormCollectionFromForm(this), ExpressCraft.Form.standAloneForms);
            } else {
                return Bridge.referenceEquals(this.getFormCollectionFromForm(this), ExpressCraft.Form.getActiveFormCollection());
            }
        },
        isVisible: function () {
            return this.getFormCollectionFromForm(this) != null;
        },
        showStartNewLevel: function (owner) {
            if (owner === void 0) { owner = null; }
            if (!this.getHasSetup()) {
                ExpressCraft.Form.setup();
            }

            if (this.isVisible()) {
                // Already Open???
                throw new System.Exception("Invalid request to open form as a dialog that is already visible!");
            }

            if (this.startPosition === ExpressCraft.FormStartPosition.Center) {
                this.centreForm();
            }

            this.addFormToParentElement(owner);

            this.getBody().focus();

            ExpressCraft.Form.formCollections.add(new ExpressCraft.FormCollection(this));

            ExpressCraft.Form.calculateZOrder();

            this.onShowed();

            ExpressCraft.Form.setActiveForm(this);
        },
        showDialog: function (dialogResults) {
            if (dialogResults === void 0) { dialogResults = []; }
            if (!this.getHasSetup()) {
                ExpressCraft.Form.setup();
            }

            this.inDialogResult = false;

            if (this.getButtonMinimize() != null) {
                ExpressCraft.Helper.delete(this.getButtonMinimize());
            }
            if (this.getButtonExpand() != null) {
                ExpressCraft.Helper.delete(this.getButtonExpand());
            }
            if (this.getButtonClose() != null) {
                ExpressCraft.Helper.delete(this.getButtonClose());
            }

            this.startPosition = ExpressCraft.FormStartPosition.Center;

            this._IsDialog = true;

            this.showStartNewLevel(null);

            this.centreForm();

            ExpressCraft.Form.setActiveForm(this);

            if (dialogResults != null && dialogResults.length > 0) {
                this.dialogResults.addRange(dialogResults);
            }
        },
        minZero$1: function (input) {
            return input < 0 ? 0 : input;
        },
        minZero: function (input) {
            return input < 0 ? 0 : input;
        },
        centreForm: function () {
            if (this.getOwner() == null) {
                return;
            }

            this.self.css("left", this.minZero((((((Bridge.Int.div(this.getOwner().clientWidth, 2)) | 0)) - (((Bridge.Int.div(parseInt(ExpressCraft.Helper.toHtmlValue(this.getWidth())), 2)) | 0))) | 0))).css("top", this.minZero((((((Bridge.Int.div(this.getOwner().clientHeight, 2)) | 0)) - (((Bridge.Int.div(parseInt(ExpressCraft.Helper.toHtmlValue(this.getHeight())), 2)) | 0))) | 0)));
        },
        addFormToParentElement: function (owner) {
            if (owner === void 0) { owner = null; }
            if (!this.getHasRendered()) {
                this.render();
                this.setHasRendered(true);
            }

            this.onShowing();

            if (owner == null) {
                ExpressCraft.Form.getWindowHolder().appendChild(this.content);
                owner = ExpressCraft.Form.getWindowHolder();
            } else {
                owner.appendChild(this.content);
            }
            this.shown();

            this.setOwner(owner);
        },
        shown: function () {
            if (this.children == null) {
                return;
            }
            for (var i = 0; i < this.children.getCount(); i = (i + 1) | 0) {
                if (this.children.getItem(i) != null && !Bridge.staticEquals(this.children.getItem(i).onLoaded, null)) {
                    this.children.getItem(i).onLoaded(this.children.getItem(i));
                }
            }
            this.children.remove(null);
        },
        show: function (owner, seperateInstance) {
            if (owner === void 0) { owner = null; }
            if (seperateInstance === void 0) { seperateInstance = false; }
            if (!this.getHasSetup()) {
                ExpressCraft.Form.setup();
            }

            if (this._IsDialog) {
                return;
            }
            this._seperateInstance = seperateInstance;
            if (!seperateInstance && (ExpressCraft.Form.formCollections == null || ExpressCraft.Form.formCollections.getCount() === 0)) {
                this.showStartNewLevel(owner);
                return;
            }

            var activeCollect = !seperateInstance ? ExpressCraft.Form.getActiveFormCollection() : ExpressCraft.Form.standAloneForms;
            var visbileForms = activeCollect.visibleForms;

            if (!visbileForms.contains(this)) {
                this.addFormToParentElement(owner);

                this.content.style.visibility = "visible";
                if (this.startPosition !== ExpressCraft.FormStartPosition.Manual && this.windowState === ExpressCraft.WindowState.Normal) {
                    if (this.startPosition === ExpressCraft.FormStartPosition.Center || (activeCollect == null || visbileForms == null || visbileForms.getCount() === 0 || visbileForms.getItem(((visbileForms.getCount() - 1) | 0)).windowState !== ExpressCraft.WindowState.Normal || visbileForms.getItem(((visbileForms.getCount() - 1) | 0)).content == null)) {
                        this.centreForm();

                    } else if (this.startPosition === ExpressCraft.FormStartPosition.WindowsDefaultLocation) {
                        var obj = visbileForms.getItem(((visbileForms.getCount() - 1) | 0));

                        var x = parseInt(ExpressCraft.Helper.toHtmlValue(obj.getLeft()));
                        var y = parseInt(ExpressCraft.Helper.toHtmlValue(obj.getTop()));

                        var pw25 = this.getOwner().clientWidth * 0.15;
                        var ph25 = this.getOwner().clientHeight * 0.15;

                        var pw75 = this.getOwner().clientWidth * 0.55;
                        var ph75 = this.getOwner().clientHeight * 0.55;

                        if (x < pw25) {
                            x = Bridge.Int.clip32(pw25);
                        }
                        if (y < ph25) {
                            y = Bridge.Int.clip32(ph25);
                        }

                        if (x > pw75) {
                            x = Bridge.Int.clip32(pw25);
                        }
                        if (y > ph75) {
                            y = Bridge.Int.clip32(ph25);
                        }
                        x = (x + 10) | 0;
                        y = (y + 10) | 0;

                        this.self.css("left", this.minZero(x)).css("top", this.minZero(y));
                    }
                }

                this.getBody().focus();

                visbileForms.add(this);

                ExpressCraft.Form.calculateZOrder();

                this.onShowed();
            }

            ExpressCraft.Form.setActiveForm(this);
        },
        bringToFront: function () {
            var activeCollect = ExpressCraft.Form.getActiveFormCollection();
            if (activeCollect != null) {
                if (Bridge.referenceEquals(activeCollect.formOwner, this)) {
                    return;
                }
                var visibleForms = activeCollect.visibleForms;
                if (visibleForms != null && visibleForms.getCount() > 1) {
                    visibleForms.remove(this);
                    visibleForms.add(this);
                }

                ExpressCraft.Form.calculateZOrder();
            }
        },
        setZIndex: function (zIndex) {
            this.content.style.zIndex = (Bridge.identity(zIndex.v, (zIndex.v = (zIndex.v + 1) | 0))).toString();

            //Self.Css("zIndex", zIndex++);
        },
        close: function () {
            if (this._IsDialog && this.inDialogResult) {
                return;
            }
            this.onClosing();

            ExpressCraft.Form.toClean.add(this);

            var ownerFormCollection = this.getFormCollectionFromForm(this);

            if (ownerFormCollection != null) {
                if (Bridge.referenceEquals(ownerFormCollection.formOwner, this)) {
                    ownerFormCollection.formOwner = null;
                    for (var i = 0; i < ownerFormCollection.visibleForms.getCount(); i = (i + 1) | 0) {
                        if (Bridge.referenceEquals(ownerFormCollection.visibleForms.getItem(i), this)) {
                            continue;
                        }
                        ownerFormCollection.visibleForms.getItem(i).close();
                    }
                    if (ExpressCraft.Form.formCollections.getCount() === 1) {
                        ExpressCraft.Form.formCollections = new (System.Collections.Generic.List$1(ExpressCraft.FormCollection))();
                    }
                } else {
                    ownerFormCollection.visibleForms.remove(this);
                }
            }

            if (this.content != null) {
                if (!this.forReuse) {
                    if (ExpressCraft.Settings.formFadeDuration > 0) {
                        this.self.fadeOut(ExpressCraft.Settings.formFadeDuration, this.closeAction);
                    } else {
                        this.closeAction();
                    }
                } else {
                    this.content.style.visibility = "collapse";
                }
            }

            ExpressCraft.Form.calculateZOrder();

            ExpressCraft.Form.setActiveForm(ExpressCraft.Form._PrevActiveForm);
            if (this._IsDialog) {
                this.inDialogResult = true;
                if (this.dialogResult !== ExpressCraft.DialogResultEnum.None && this.dialogResults != null && this.dialogResults.getCount() > 0) {
                    for (var i1 = 0; i1 < this.dialogResults.getCount(); i1 = (i1 + 1) | 0) {
                        this.dialogResults.getItem(i1).invokeIfResult(this.dialogResult);
                    }
                }
            }

            this.onClosed();
        }
    });

    Bridge.ns("ExpressCraft.Form", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.Form, {
        f1: function () {
            if (ExpressCraft.Form._activeToolTipControl != null) {
                ExpressCraft.Form._activeToolTipControl.close();
                ExpressCraft.Form._activeToolTipControl = null;
            }
        },
        f2: function (ev) {
            ev.preventDefault();
        },
        f3: function (ev) {
            if (System.Linq.Enumerable.from(document.body.childNodes).contains(ExpressCraft.Form.getWindowHolder())) {
                document.body.removeChild(ExpressCraft.Form.getWindowHolder());
            }
        },
        f4: function (ev) {
            if (!System.Linq.Enumerable.from(document.body.childNodes).contains(ExpressCraft.Form.getWindowHolder())) {
                document.body.appendChild(ExpressCraft.Form.getWindowHolder());
            }
        },
        f5: function (ev) {
            if (document.activeElement != null) {
                document.activeElement.focus();
                ev.preventDefault();
                ExpressCraft.Form.setCursor("default");
            }
        },
        f6: function (ev) {

            if (ExpressCraft.Form.getActiveForm() != null) {
                var form = ExpressCraft.Form.getActiveForm();
                form.getHeading().classList.add("form-heading-flash");
                Bridge.global.setTimeout(function () {
                    form.getHeading().classList.remove("form-heading-flash");
                }, 800);
            }
        },
        f7: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        },
        f8: function (ev) {
            if (ExpressCraft.Settings.onF2ShowThemeForm && ev.keyCode === ExpressCraft.KeyCodes.F2) {
                ev.preventDefault();
                ExpressCraft.ThemeForm.showThemeForm();
            }
        },
        f9: function (ev) {
            if (ExpressCraft.Form.formCollections == null) {
                return;
            }

            for (var i = 0; i < ExpressCraft.Form.formCollections.getCount(); i = (i + 1) | 0) {
                if (ExpressCraft.Form.formCollections.getItem(i) == null) {
                    continue;
                }
                var fc = ExpressCraft.Form.formCollections.getItem(i);
                if (fc.formOwner != null) {
                    fc.formOwner.resizing();
                }
                for (var x = 0; x < fc.visibleForms.getCount(); x = (x + 1) | 0) {
                    if (fc.visibleForms.getItem(x) != null) {
                        fc.visibleForms.getItem(x).resizing();
                    }
                }
            }
        },
        f10: function (ev) {
            if (ExpressCraft.Form.inExternalMouseEvent) {
                return;
            }

            var mev = ev;

            if (ExpressCraft.Form.movingForm != null) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                ev.stopPropagation();

                if (ExpressCraft.Form.movingForm.getBodyOverLay().style.visibility === "collapse") {
                    if (ExpressCraft.Form.movingForm.inDesign) {
                        ExpressCraft.Form._ActiveForm.getBodyOverLay().style.visibility = "collapse";
                    } else {
                        ExpressCraft.Form.movingForm.getBodyOverLay().style.visibility = "visible";
                    }

                    ExpressCraft.Form.movingForm.getHeading().focus();
                }

                var mousePos = ExpressCraft.Helper.getClientMouseLocation(ev).$clone();

                var mX;
                var mY;

                var newX = (((mX = mousePos.getXf())) + ExpressCraft.Form.movingForm.prev_px);
                var newY = (((mY = mousePos.getYf())) + ExpressCraft.Form.movingForm.prev_py);

                if (ExpressCraft.Form.movingForm.windowState === ExpressCraft.WindowState.Maximized && ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.Move) {
                    ExpressCraft.Form.movingForm.changeWindowState();
                    newX = mousePos.getXf() - (((Bridge.Int.div(ExpressCraft.Form.movingForm.prev_width, 2)) | 0));
                    ExpressCraft.Form.movingForm.prev_px = newX - mousePos.getXf();
                }

                var x = parseFloat(ExpressCraft.Form.movingForm.getStyle().left);
                var y = parseFloat(ExpressCraft.Form.movingForm.getStyle().top);
                var w = parseFloat(ExpressCraft.Form.movingForm.getStyle().width);
                var h = parseFloat(ExpressCraft.Form.movingForm.getStyle().height);

                var px = x;
                var py = y;
                var pw = w;
                var ph = h;

                if (newY < 1) {
                    newY = 1;
                }
                if (newX < 1) {
                    newX = 1;
                }

                if (mX < 1) {
                    mX = 1;
                }
                if (mY < 1) {
                    mY = 1;
                }

                switch (ExpressCraft.Form.moveAction) {
                    case ExpressCraft.MouseMoveAction.Move: 
                        x = newX;
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.TopLeftResize: 
                        w -= newX - x;
                        h -= newY - y;
                        if (w < ExpressCraft.Form.movingForm.getMinWidth()) {
                            newX -= ExpressCraft.Form.movingForm.getMinWidth() - w;
                            w = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        if (h < ExpressCraft.Form.movingForm.getMinHeight()) {
                            newY -= ExpressCraft.Form.movingForm.getMinHeight() - h;
                            h = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        x = newX;
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.TopResize: 
                        h -= newY - y;
                        if (h < ExpressCraft.Form.movingForm.getMinHeight()) {
                            newY -= ExpressCraft.Form.movingForm.getMinHeight() - h;
                            h = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.TopRightResize: 
                        h -= newY - y;
                        w = mX - x;
                        if (h < ExpressCraft.Form.movingForm.getMinHeight()) {
                            newY -= ExpressCraft.Form.movingForm.getMinHeight() - h;
                            h = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        if (w < ExpressCraft.Form.movingForm.getMinWidth()) {
                            w = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.LeftResize: 
                        w -= newX - x;
                        if (w < ExpressCraft.Form.movingForm.getMinWidth()) {
                            newX -= ExpressCraft.Form.movingForm.getMinWidth() - w;
                            w = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        x = newX;
                        break;
                    case ExpressCraft.MouseMoveAction.BottomLeftResize: 
                        w -= newX - x;
                        h = mY - y;
                        if (w < ExpressCraft.Form.movingForm.getMinWidth()) {
                            newX -= ExpressCraft.Form.movingForm.getMinWidth() - w;
                            w = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        if (h < ExpressCraft.Form.movingForm.getMinHeight()) {
                            h = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        x = newX;
                        break;
                    case ExpressCraft.MouseMoveAction.BottomResize: 
                        h = mY - y;
                        if (h < ExpressCraft.Form.movingForm.getMinHeight()) {
                            h = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        break;
                    case ExpressCraft.MouseMoveAction.RightResize: 
                        w = mX - x;
                        if (w < ExpressCraft.Form.movingForm.getMinWidth()) {
                            w = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        break;
                    case ExpressCraft.MouseMoveAction.BottomRightResize: 
                        w = mX - x;
                        h = mY - y;
                        if (h < ExpressCraft.Form.movingForm.getMinHeight()) {
                            h = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        if (w < ExpressCraft.Form.movingForm.getMinWidth()) {
                            w = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        break;
                }
                var changed = false;
                if (px !== x && ((changed = true))) {
                    ExpressCraft.Form.movingForm.getStyle().left = x + 'px';
                }
                if (py !== y && ((changed = true))) {
                    ExpressCraft.Form.movingForm.getStyle().top = y + 'px';
                }
                if (pw !== w && ((changed = true))) {
                    ExpressCraft.Form.movingForm.getStyle().width = w + 'px';
                }
                if (ph !== h && ((changed = true))) {
                    ExpressCraft.Form.movingForm.getStyle().height = h + 'px';
                }

                if (changed) {
                    ExpressCraft.Form.movingForm.resizing();
                }
            }
        },
        f11: function (ev) {
            ExpressCraft.Form.inExternalMouseEvent = false;
            if (ExpressCraft.Form.movingForm != null) {
                ExpressCraft.Form.movingForm.getBodyOverLay().style.visibility = "collapse";
            }

            ExpressCraft.Form.movingForm = null;
            ExpressCraft.Form.setMouse_Down(false);
            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.Move;
            ExpressCraft.Form.setCursor("default");
        },
        f12: function (ev) {
            if (!ExpressCraft.Settings.allowCloseWithoutQuestion) {
                return 'Would you like to close this application?';
            }
        },
        f13: function (message, url, lineNumber, columnNumber, error) {
            if (ExpressCraft.Form.inErrorDialog) {
                return false;
            }
            try {
                ExpressCraft.Form.inErrorDialog = true;
                var errStr;
                if (System.String.isNullOrWhiteSpace(message) || Bridge.referenceEquals(message, "Script error.")) {
                    errStr = "Script Error: See Browser Console for Detail's";
                } else {
                    errStr = System.String.concat("Script Error: ", message);
                }

                if (ExpressCraft.Application.getAplicationDefition() === ExpressCraft.ApplicationDefitnion.ExpressCraftConsole) {
                    ExpressCraft.ConsoleForm.log(errStr, ExpressCraft.ConsoleLogType.Error);
                }

                if (ExpressCraft.Settings.showExceptionDialog) {
                    var msgBox = new ExpressCraft.MessageBoxForm.ctor(errStr, ExpressCraft.MessageBoxLayout.Error);
                    msgBox.showDialog();
                }
            }
            catch ($e1) {
                $e1 = System.Exception.create($e1);

            }
            finally {
                ExpressCraft.Form.inErrorDialog = false;
            }

            return false;
        },
        f14: function (ev) {
            if (Bridge.referenceEquals(ev.target, this.getBody())) {
                ev.stopPropagation();
                ev.preventDefault();
            }
        },
        f15: function (ev) {
            if (ExpressCraft.Form.inExternalMouseEvent) {
                return;
            }
            if (!this.isActiveFormCollection()) {
                return;
            }

            var mev = ev;

            mev.stopPropagation();

            ExpressCraft.Form.setMouse_Down(true);

            ExpressCraft.Form.movingForm = this;
            ExpressCraft.Form.setActiveForm(this);

            ExpressCraft.Form.setBodyOverLay();

            var clientRec = this.content.getBoundingClientRect();

            var mousePos = ExpressCraft.Helper.getClientMouseLocation(ev).$clone();

            this.prev_px = clientRec.left - mousePos.getXf();
            this.prev_py = clientRec.top - mousePos.getYf();

            var width = clientRec.width;
            var height = clientRec.height;

            var X = mousePos.getXf() - clientRec.left;
            var Y = mousePos.getYf() - clientRec.top;

            if (this.windowState === ExpressCraft.WindowState.Maximized) {
                ExpressCraft.Form.setCursor("default");
                ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.Move;
            } else {
                if (this.inDesign) {
                    return;
                }

                if (this.getHeadingTitle() != null && Bridge.referenceEquals(ev.target, this.getHeadingTitle())) {
                    ExpressCraft.Form.setCursor("default");
                    ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.Move;
                } else {
                    if (this.allowSizeChange) {
                        if (X <= ExpressCraft.Form.getResizeCorners() && Y <= ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("nwse-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.TopLeftResize;
                        } else if (Y <= ExpressCraft.Form.getResizeCorners() && X >= width - ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("nesw-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.TopRightResize;
                        } else if (Y <= ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("n-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.TopResize;
                        } else if (X <= ExpressCraft.Form.getResizeCorners() && Y >= height - ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("nesw-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.BottomLeftResize;
                        } else if (Y >= height - ExpressCraft.Form.getResizeCorners() && X >= width - ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("nwse-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.BottomRightResize;
                        } else if (Y >= height - ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("s-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.BottomResize;
                        } else if (X <= ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("w-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.LeftResize;

                        } else if (X >= width - ExpressCraft.Form.getResizeCorners()) {
                            ExpressCraft.Form.setCursor("e-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.RightResize;
                        } else {
                            ExpressCraft.Form.setCursor("default");
                            ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.Move;
                        }
                    }
                }
            }

            if (!this.allowMoveChange && ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.Move) {
                ExpressCraft.Form.setCursor("default");
                ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.None;
            }
        },
        f16: function (ev) {
            if (this.allowSizeChange) {
                this.changeWindowState();
            }
            ev.preventDefault();
            ev.stopPropagation();
        },
        f17: function (ev) {
            if (ExpressCraft.Form.movingForm == null) {
                ExpressCraft.Form.setCursor("default");
            }
        },
        f18: function (ev) {
            ExpressCraft.Form.setCursor("default");
        },
        f19: function (ev) {


            if (ExpressCraft.Form.inExternalMouseEvent) {
                return;
            }

            if (Bridge.referenceEquals(ev.target, this.getHeadingTitle())) {
                return;
            }
            var mev = ev;

            var width = this.content.clientWidth;
            var height = this.content.clientHeight;
            var X = (mev.pageX - this.content.offsetLeft) | 0;
            var Y = (mev.pageY - this.content.offsetTop) | 0;

            if (ExpressCraft.Form.movingForm != null && ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.Move) {
                ExpressCraft.Form.setCursor("default");
                return;
            } else if (this.windowState === ExpressCraft.WindowState.Maximized) {
                ExpressCraft.Form.setCursor("default");
                return;
            }
            if (this.inDesign) {
                return;
            }

            if (this.allowSizeChange) {
                if (ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.TopLeftResize || X <= ExpressCraft.Form.getResizeCorners() && Y <= ExpressCraft.Form.getResizeCorners()) {
                    ExpressCraft.Form.setCursor("nwse-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.TopRightResize || Y <= ExpressCraft.Form.getResizeCorners() && X >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    ExpressCraft.Form.setCursor("nesw-resize");
                } else if (Y <= ExpressCraft.Form.getResizeCorners() || ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.TopResize) {
                    ExpressCraft.Form.setCursor("n-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.BottomLeftResize || X <= ExpressCraft.Form.getResizeCorners() && Y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    ExpressCraft.Form.setCursor("nesw-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.BottomRightResize || Y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0) && X >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    ExpressCraft.Form.setCursor("nwse-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.BottomResize || Y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    ExpressCraft.Form.setCursor("s-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.LeftResize || X <= ExpressCraft.Form.getResizeCorners()) {
                    ExpressCraft.Form.setCursor("w-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.MouseMoveAction.RightResize || X >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    ExpressCraft.Form.setCursor("e-resize");
                } else {
                    ExpressCraft.Form.setCursor("default");
                }
            } else {
                ExpressCraft.Form.setCursor("default");
            }

        },
        f20: function (ev) {
            ExpressCraft.Form.setBodyOverLay();
            if (!this.isActiveFormCollection()) {
                return;
            }

            if (this.windowState === ExpressCraft.WindowState.Maximized) {
                ExpressCraft.Form.movingForm = this;
                ExpressCraft.Form.setCursor("default");

                ExpressCraft.Form.moveAction = ExpressCraft.MouseMoveAction.Move;
            } else {
                ExpressCraft.Form.movingForm = this;
            }

            ExpressCraft.Form.setActiveForm(this);
        },
        f21: function (ev) {
            if (ExpressCraft.Form.inExternalMouseEvent) {
                return;
            }
            if (!this.isActiveFormCollection()) {
                return;
            }

            ExpressCraft.Form.setActiveForm(this);
            ExpressCraft.Form.movingForm = null;
            ev.stopPropagation();
        },
        f22: function (ev) {
            if (ExpressCraft.Form.inExternalMouseEvent) {
                return;
            }

            if (ExpressCraft.Form.movingForm == null) {
                if (!this.isActiveFormCollection()) {
                    return;
                }
                ev.stopPropagation();
            }
        },
        f23: function (ev) {
            if (this.inDesign) {
                this.getBodyOverLay().style.visibility = "collapse";
                return;
            }
            if (!this.isActiveFormCollection()) {
                return;
            }
            this.getBodyOverLay().style.visibility = "collapse";
            ExpressCraft.Form.setActiveForm(this);
        },
        f24: function (ev) {
            if (this.inDesign) {
                this.getBodyOverLay().style.visibility = "collapse";
                return;
            }

            if (ExpressCraft.Form.movingForm == null) {
                ExpressCraft.Form.setBodyOverLay();
            }
        },
        f25: function (ev) {
            if (this.inDesign) {
                this.getBodyOverLay().style.visibility = "collapse";
                return;
            }
            if (ExpressCraft.Form.movingForm == null && this.isActiveFormCollection()) {
                ExpressCraft.Form.setCursor("default");
                this.getBodyOverLay().style.visibility = "collapse";
            } else {
                this.getBodyOverLay().style.visibility = "visible";
            }
        },
        f26: function () {
            ExpressCraft.Helper.empty(this.content);
            if (this.content != null) {
                ExpressCraft.Helper.delete(this.content);
                this.content = null;
            }
        },
        f27: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }
            ExpressCraft.Form.setMouse_Down(true);

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setActiveForm(this);
        },
        f28: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            if (this.inDesign) {
                return;
            }

            this.close();
        },
        f29: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ExpressCraft.Form.setCursor("default");
        },
        f30: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }
        },
        f31: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setMouse_Down(false);

            this.changeWindowState();
        },
        f32: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setMouse_Down(false);

            this.windowState = ExpressCraft.WindowState.Minimized;
        },
        f33: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setMouse_Down(false);
        },
        f34: function (ev) {
            ev.stopPropagation();
        },
        f35: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopImmediatePropagation();
            ev.preventDefault();
        },
        f36: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ExpressCraft.Form.setMouse_Down(true);

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setActiveForm(this);
        }
    });

    Bridge.define("ExpressCraft.ContextMenu", {
        inherits: [ExpressCraft.Control],
        statics: {
            totalContextHandles: 0,
            mainContextMenu: null
        },
        /**
         * For internal use only - so if we click on document - we can close all context menus ---
         *
         * @instance
         */
        subContextOpened: null,
        contextItems: null,
        visible: false,
        config: {
            init: function () {
                this.contextItems = new (System.Collections.Generic.List$1(ExpressCraft.ContextItem))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "contextmenu");
            this.content.onmouseleave = Bridge.fn.bind(this, $asm.$.ExpressCraft.ContextMenu.f1);
        },
        renderContextMenu: function () {
            // What we need to do first is get the maxed size text...
            var x = 0;
            var ii = -1;

            ExpressCraft.Helper.empty(this.content);

            for (var i = 0; i < this.contextItems.getCount(); i = (i + 1) | 0) {
                var y = this.contextItems.getItem(i).caption.length;
                if (y > x) {
                    x = y;
                    ii = i;
                }
            }

            if (ii === -1) {
                return;
            }
            var calwidth = Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(this.contextItems.getItem(ii).caption, ExpressCraft.Settings.defaultFont));
            if (calwidth < ExpressCraft.Settings.contextMenuMinWidth) {
                calwidth = ExpressCraft.Settings.contextMenuMinWidth;
            }
            var width = (((((((calwidth + 34) | 0) + 8) | 0) + 2) | 0));

            var top = 1;

            for (var i1 = 0; i1 < this.contextItems.getCount(); i1 = (i1 + 1) | 0) {
                (function () {
                    var contextItem = this.contextItems.getItem(i1);
                    var y1 = contextItem.caption.length;
                    var item = ExpressCraft.Control.label$1(contextItem.caption, 1, top, ((width - 2) | 0), false, false, "contextitem");

                    item.onclick = Bridge.fn.bind(this, function (ev) {
                        if (contextItem.enabled) {
                            if (!Bridge.staticEquals(contextItem.onItemClick, null)) {
                                contextItem.onItemClick(contextItem);
                            }
                            this.close();
                        }

                    });

                    this.content.appendChild(item);

                    top = (top + 24) | 0;

                    if (this.contextItems.getItem(i1).beginGroup && i1 !== this.contextItems.getCount()) {
                        top = (top + 1) | 0;
                        var sep = ExpressCraft.Control.div$1("contextitemseperator");

                        sep.style.top = ExpressCraft.Helper.toPx(top);
                        sep.style.width = ExpressCraft.Helper.toPx(calwidth);

                        this.content.appendChild(sep);

                        top = (top + 2) | 0;
                    }
                }).call(this);
            }

            top = (top + 1) | 0;

            ExpressCraft.Helper.setSize$1(this.content, width, top);
        },
        show: function (Location) {
            if (ExpressCraft.ContextMenu.mainContextMenu != null) {
                ExpressCraft.ContextMenu.mainContextMenu.close();
                ExpressCraft.ContextMenu.mainContextMenu = null;
            }
            ExpressCraft.ContextMenu.mainContextMenu = this;

            if (this.visible) {
                this.close();
            }
            if (!this.visible) {
                ExpressCraft.Helper.setLocation(this.content, ((Location.getXi() - 5) | 0), ((Location.getYi() - 5) | 0));
                this.renderContextMenu();

                ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles + 1) | 0;
                this.content.style.zIndex = (((ExpressCraft.ContextMenu.totalContextHandles + ExpressCraft.Settings.contextMenuStartingZIndex) | 0)).toString();
                document.body.appendChild(ExpressCraft.Control.op_Implicit(this));
                this.visible = true;
            }
        },
        close: function () {
            if (this.visible) {
                ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles - 1) | 0;
                document.body.removeChild(ExpressCraft.Control.op_Implicit(this));
                this.visible = false;
            }

            if (this.subContextOpened != null) {
                this.subContextOpened.close();
                this.subContextOpened = null;
            }
        }
    });

    Bridge.ns("ExpressCraft.ContextMenu", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ContextMenu, {
        f1: function (ev) {
            this.close();
        }
    });

    Bridge.define("ExpressCraft.DataColumnBool", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(Boolean)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Bool;
        }
    });

    Bridge.define("ExpressCraft.DataColumnByte", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Byte)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Byte;
        }
    });

    Bridge.define("ExpressCraft.DataColumnDateTime", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(Date)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.DateTime;
        }
    });

    Bridge.define("ExpressCraft.DataColumnDecimal", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Decimal)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Decimal;
        }
    });

    Bridge.define("ExpressCraft.DataColumnDouble", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Double)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Double;
        }
    });

    Bridge.define("ExpressCraft.DataColumnFloat", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Single)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Float;
        }
    });

    Bridge.define("ExpressCraft.DataColumnInteger", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int32)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Integer;
        }
    });

    Bridge.define("ExpressCraft.DataColumnLong", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int64)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Long;
        }
    });

    Bridge.define("ExpressCraft.DataColumnObject", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(Object))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Object;
        }
    });

    Bridge.define("ExpressCraft.DataColumnShort", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int16)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Short;
        }
    });

    Bridge.define("ExpressCraft.DataColumnString", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(String))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.String;
        }
    });

    Bridge.define("ExpressCraft.GridLookupEdit", {
        inherits: [ExpressCraft.Control],
        gridView: null,
        fieldName: null,
        displayName: null,
        visible: false,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor4.call(this, "inputcontrol", ExpressCraft.ComboBoxTypes.Default);
            this.gridView = Bridge.merge(new ExpressCraft.GridView(true, true), {
                setSize: new ExpressCraft.Vector2.$ctor1(250, 400)
            } );
            this.gridView.contextMenu = null;
            this.gridView.onFocusedRowChanged = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridLookupEdit.f1);

            this.gridView.content.onmouseleave = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridLookupEdit.f2);
            this.content.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridLookupEdit.f3);
        },
        showPopup: function () {
            if (this.visible) {
                return;
            }
            var x = this.content.getBoundingClientRect();
            this.gridView.setLocation(new ExpressCraft.Vector2.$ctor1(x.left, x.top + x.height));

            ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles + 1) | 0;
            this.content.parentElement.appendChild(ExpressCraft.Control.op_Implicit(this.gridView));

            this.gridView.renderGrid();

            this.gridView.content.style.zIndex = (((ExpressCraft.ContextMenu.totalContextHandles + ExpressCraft.Settings.contextMenuStartingZIndex) | 0)).toString();
            this.visible = true;
        },
        closePopup: function () {
            if (this.visible) {
                this.gridView.content.parentElement.removeChild(ExpressCraft.Control.op_Implicit(this.gridView));
                ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles - 1) | 0;
                this.visible = false;
            }
        }
    });

    Bridge.ns("ExpressCraft.GridLookupEdit", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.GridLookupEdit, {
        f1: function (rowHandle, PrevRowhandle) {
            ExpressCraft.Helper.empty(this.content);

            if (rowHandle > -1) {
                this.content.appendChild(Bridge.merge(document.createElement('option'), {
                    innerHTML: (Bridge.as(this.gridView.getRowCellValue$3(rowHandle, this.displayName), String)),
                    value: (Bridge.as(this.gridView.getRowCellValue$3(rowHandle, this.fieldName), String))
                } ));
            }
            if (this.visible) {
                this.closePopup();
            }
        },
        f2: function (ev) {
            this.closePopup();
        },
        f3: function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            if (this.visible) {
                this.closePopup();
            } else {
                this.showPopup();
            }
        }
    });

    Bridge.define("ExpressCraft.GridView", {
        inherits: [ExpressCraft.Control],
        statics: {
            UnitHeight: 28.0
        },
        gridHeader: null,
        gridHeaderContainer: null,
        gridBodyContainer: null,
        gridBody: null,
        bottonOfTable: null,
        rightOfTable: null,
        rightOfTableHeader: null,
        _dataSource: null,
        onFocusedRowChanged: null,
        onRowDoubleClick: null,
        onCustomRowStyle: null,
        onRowClick: null,
        onDoubleClick: null,
        onCellRowMouseDown: null,
        selectedRows: null,
        visibleRowHandles: null,
        _allowRowDrag: false,
        autoGenerateColumnsFromSource: true,
        allowMultiSelection: true,
        showAutoFilterRow: false,
        _columnAutoWidth: false,
        _focusedcolumn: -1,
        _focusedDataHandle: -1,
        _columnHeadersVisible: true,
        _useEditForm: true,
        sortSettings: null,
        columns: null,
        prevRenderGridScrollId: -1,
        clickTimeDiff: null,
        dragIndex: -1,
        resizeIndex: -1,
        resizePageX: 0,
        resizeSpan: null,
        onColumnOnClick: null,
        onColumnDragStart: null,
        onColumnDragOver: null,
        onColumnDrop: null,
        onColumnMouseDown: null,
        onColumnMouseMove: null,
        onColumnMouseLeave: null,
        onRowDragStart: null,
        lastId: -1,
        prevScroll: -1,
        filterRowOnChange: null,
        renderTime: -1,
        renderGridInternal: null,
        config: {
            init: function () {
                this.selectedRows = new (ExpressCraft.HardSoftList$1(Boolean))(false);
                this.columns = new (System.Collections.Generic.List$1(ExpressCraft.GridViewColumn))();
            }
        },
        ctor: function (autoGenerateColumns, columnAutoWidth) {
            if (autoGenerateColumns === void 0) { autoGenerateColumns = true; }
            if (columnAutoWidth === void 0) { columnAutoWidth = false; }

            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "grid");
            this.content.style.overflow = "hidden";

            this.renderGridInternal = Bridge.fn.bind(this, function () {
                var StartedWith = this.renderTime;

                this.gridHeaderContainer.scrollLeft = this.gridBodyContainer.scrollLeft;
                if (ExpressCraft.Settings.gridViewBlurOnScroll) {
                    this.processBlur();
                }

                this.validateGridSize();

                if (this.columnCount() === 0) {
                    this.clearGrid();
                    return;
                }

                var RawLeftCellIndex = 0;
                var RawLeftCellScrollPadding = 0;

                var RawLeftCellCount = this.columns.getCount();

                var LeftLocation = 0;
                var foundLeftLocation = false;
                var foundRightLocation = false;

                var ClientWidth = this.gridBodyContainer.clientWidth;
                var ViewWidth = (this.gridBodyContainer.scrollLeft + ClientWidth) | 0;
                var _columnAutoWidthSingle = 0.0;
                if (this._columnAutoWidth) {
                    _columnAutoWidthSingle = ClientWidth === 0 ? 0.0 : ((Bridge.Int.div(ClientWidth, this.columns.getCount())) | 0);
                }

                for (var x = 0; x < this.columns.getCount(); x = (x + 1) | 0) {
                    this.columns.getItem(x).cachedX = LeftLocation;
                    LeftLocation += this._columnAutoWidth ? _columnAutoWidthSingle : this.columns.getItem(x).getWidth();
                    if (!foundLeftLocation && LeftLocation >= this.gridBodyContainer.scrollLeft) {
                        foundLeftLocation = true;
                        RawLeftCellIndex = x;
                        RawLeftCellScrollPadding = LeftLocation - this.gridBodyContainer.scrollLeft;
                    }
                    if (foundLeftLocation && !foundRightLocation && LeftLocation >= ViewWidth) {
                        foundRightLocation = true;
                        RawLeftCellCount = (x + 1) | 0;
                        break;
                    }
                    if (StartedWith !== this.renderTime) {
                        return;
                    }
                }

                var Cols = new (System.Collections.Generic.List$1(HTMLSpanElement))();

                var uboundRowCount = (RawLeftCellCount - 1) | 0;
                if (this._columnHeadersVisible) {
                    for (var x1 = RawLeftCellIndex; x1 < RawLeftCellCount; x1 = (x1 + 1) | 0) {
                        if (x1 >= this.columns.getCount()) {
                            break;
                        }
                        var gcol = this.columns.getItem(x1);
                        var colIndex = x1;
                        var apparence = gcol.headingApparence;

                        var col = ExpressCraft.Control.label$3(gcol.caption, (this._columnAutoWidth ? gcol.cachedX : gcol.cachedX), 0, (this._columnAutoWidth ? _columnAutoWidthSingle : gcol.getWidth()) - (x1 === uboundRowCount ? 0 : 1), apparence.isBold, false, "heading", apparence.alignment, apparence.forecolor);
                        if (gcol.sortedMode !== ExpressCraft.GridViewSortMode.None) {
                            var sortImage = ExpressCraft.Control.div$1(gcol.sortedMode === ExpressCraft.GridViewSortMode.Asc ? "grid-sort-up" : "grid-sort-down");
                            ExpressCraft.Helper.setBounds$1(sortImage, "calc(100% - 13px)", 11, 9, 5);
                            col.appendChild(sortImage);
                        }

                        this.setupColumn(col, x1, gcol);

                        Cols.add(col);

                        if (StartedWith !== this.renderTime) {
                            return;
                        }
                    }
                }



                if (this._dataSource == null || this._dataSource.getRowCount() === 0 || this._dataSource.getColumnCount() === 0) {
                    this.clearGrid();
                    ExpressCraft.Helper.appendChildren$1(this.gridHeader, Cols.toArray());
                    return;
                }

                var ppr = this.pixelsPerRow(this._dataSource.getRowCount());

                var RawTopRowIndex = this.getRawTopRowIndex();
                var RawTopRowScrollPadding = RawTopRowIndex % 1.0;
                var RawVisibleRowCount = this.getRawVisibleRowCount();

                var Length = (Bridge.Int.clip32(RawVisibleRowCount + RawTopRowIndex) + 1) | 0;
                var start = Bridge.Int.clip32(RawTopRowIndex);
                for (var x2 = (this.selectedRows.SL.getCount() - 1) | 0; x2 >= 0; x2 = (x2 - 1) | 0) {
                    var Found = false;
                    for (var i = start; i < Length; i = (i + 1) | 0) {
                        if (i < this.getDataSource().getRowCount()) {
                            var DataRowhandle = this.getDataSourceRow(i);
                            if (this.selectedRows.getIndexValueByHardListIndex(this.selectedRows.SL.getItem(x2)).index === DataRowhandle) {
                                Found = true;
                                break;
                            }
                        }
                        if (StartedWith !== this.renderTime) {
                            return;
                        }
                    }
                    if (StartedWith !== this.renderTime) {
                        return;
                    }
                    if (!Found) {
                        this.selectedRows.SL.removeAt(x2);
                    }
                }

                var Rows = new (System.Collections.Generic.List$1(HTMLDivElement))();

                if (ExpressCraft.Settings.gridViewRowScrollPadding > 0) {
                    start = (start - ExpressCraft.Settings.gridViewRowScrollPadding) | 0;
                    Length = (Length + ExpressCraft.Settings.gridViewRowScrollPadding) | 0;
                }

                var Y = (start * (ppr)) - RawTopRowScrollPadding;
                var Last = this.columns.getItem(((RawLeftCellCount - 1) | 0));
                var MaxWidth = (Last.cachedX + Last.getWidth());

                if (this.getShowAutoFilterRow()) {
                    Length = (Length - 1) | 0;
                    Y += ExpressCraft.GridView.UnitHeight;
                }

                // #TODO - CLEAN...
                if (start < 0) {
                    start = 0;
                }
                if (Length > this.getDataSource().getRowCount()) {
                    Length = this.getDataSource().getRowCount();
                }

                for (var i1 = start; i1 < Length; i1 = (i1 + 1) | 0) {
                    var DataRowhandle1 = this.getDataSourceRow(i1);
                    var dr = ExpressCraft.Control.div$1(System.String.concat((i1 % 2 === 0 ? "cellrow even" : "cellrow"), (this.selectedRows.getValue(DataRowhandle1, true) ? " cellrow-selected" : ""), (DataRowhandle1 === this.getFocusedDataHandle() ? " focusedrow" : "")));

                    ExpressCraft.Helper.setBounds$1(dr, 0, Y, this._columnAutoWidth ? ClientWidth : MaxWidth, ExpressCraft.GridView.UnitHeight);
                    dr.setAttribute("i", System.Convert.toString(DataRowhandle1));

                    dr.onclick = this.onRowClick;
                    if (ExpressCraft.Settings.isChrome) {
                        dr.ondblclick = this.onDoubleClick;
                    }

                    for (var x3 = RawLeftCellIndex; x3 < RawLeftCellCount; x3 = (x3 + 1) | 0) {
                        var col1 = this.columns.getItem(x3);
                        var apparence1 = col1.bodyApparence;
                        var useDefault = false;
                        var cell;
                        if (col1.cellDisplay == null || ((useDefault = col1.cellDisplay.useDefaultElement))) {
                            cell = ExpressCraft.Control.label$3(col1.getDisplayValueByDataRowHandle(DataRowhandle1), col1.cachedX, 0, this._columnAutoWidth ? _columnAutoWidthSingle : col1.getWidth(), apparence1.isBold, false, "cell", apparence1.alignment, apparence1.forecolor);

                            dr.appendChild(useDefault ? col1.cellDisplay.onCreateDefault(cell, this, DataRowhandle1, x3) : cell);
                        } else {
                            cell = col1.cellDisplay.onCreate(this, DataRowhandle1, x3);
                            ExpressCraft.Helper.setLocation(cell, col1.cachedX, 0);
                            cell.style.width = ExpressCraft.Helper.toPx((this._columnAutoWidth ? _columnAutoWidthSingle : col1.getWidth()));

                            dr.appendChild(cell);
                        }
                        cell.setAttribute("i", x3.toString());
                        cell.onmousedown = this.onCellRowMouseDown;
                    }

                    if (this.getAllowRowDrag()) {
                        dr.setAttribute("draggable", "true");

                        dr.ondragstart = this.onRowDragStart;
                    }

                    Rows.add(dr);

                    Y += ExpressCraft.GridView.UnitHeight;

                    if (StartedWith !== this.renderTime) {
                        return;
                    }
                }

                if (this.getShowAutoFilterRow()) {
                    var dr1 = ExpressCraft.Control.div$1("cellrow");

                    ExpressCraft.Helper.setBounds$1(dr1, 0, 0, this._columnAutoWidth ? ClientWidth : MaxWidth, ExpressCraft.GridView.UnitHeight);
                    dr1.style.position = "sticky";
                    dr1.style.borderBottomColor = "darkgray";
                    dr1.style.borderBottomStyle = "solid";
                    dr1.style.borderBottomWidth = "thin";

                    for (var x4 = RawLeftCellIndex; x4 < RawLeftCellCount; x4 = (x4 + 1) | 0) {
                        var col2 = this.columns.getItem(x4);
                        var apparence2 = col2.bodyApparence;

                        var cell1;
                        var tx;
                        if (col2.filterEdit == null) {
                            tx = new ExpressCraft.TextInput(col2.column.dataType === ExpressCraft.DataType.DateTime ? "datetime" : "text");
                            ;
                            tx.content.classList.add("cell");
                        } else {
                            tx = col2.filterEdit;
                        }

                        tx.setText((System.String.concat(col2.getFilterValue(), "")));

                        tx.onTextChanged = this.filterRowOnChange;

                        cell1 = tx.content;

                        ExpressCraft.Helper.setLocation(cell1, col2.cachedX, 0);
                        cell1.style.width = ExpressCraft.Helper.toPx((this._columnAutoWidth ? _columnAutoWidthSingle : col2.getWidth()));

                        dr1.appendChild(cell1);

                        cell1.setAttribute("i", x4.toString());
                    }
                    Rows.add(dr1);
                }


                this.clearGrid();

                this.gridHeaderContainer.removeChild(this.gridHeader);
                ExpressCraft.Helper.appendChildren$1(this.gridHeader, Cols.toArray());
                this.gridHeaderContainer.appendChild(this.gridHeader);

                if (Rows.getCount() > 0) {
                    this.gridBodyContainer.removeChild(this.gridBody);

                    var rows = Rows.toArray();

                    ExpressCraft.Helper.appendChildren$1(this.gridBody, rows);
                    var rowLeng = rows.length;

                    for (var i2 = 0; i2 < rowLeng; i2 = (i2 + 1) | 0) {
                        if (StartedWith !== this.renderTime) {
                            return;
                        }
                        this.gridBody.appendChild(rows[i2]);
                    }

                    if (!Bridge.staticEquals(this.onCustomRowStyle, null)) {
                        for (var i3 = 0; i3 < rows.length; i3 = (i3 + 1) | 0) {
                            if (StartedWith !== this.renderTime) {
                                return;
                            }

                            try {
                                this.onCustomRowStyle(rows[i3], parseInt(rows[i3].getAttribute("i")));

                            }
                            catch (ex) {
                                ex = System.Exception.create(ex);
                                if (ExpressCraft.Application.getAplicationDefition() === ExpressCraft.ApplicationDefitnion.ExpressCraftConsole) {
                                    ExpressCraft.ConsoleForm.log(ex.toString(), ExpressCraft.ConsoleLogType.Error);
                                }
                            }
                        }
                    }

                    this.gridBodyContainer.appendChild(this.gridBody);
                }
                if (StartedWith !== this.renderTime) {
                    return;
                }

                this.renderTime = -1;
            });

            this.gridHeaderContainer = ExpressCraft.Control.div$1("heading-container");

            this.gridHeader = ExpressCraft.Control.div();
            ExpressCraft.Helper.setBounds$1(this.gridHeader, "0", "0", "0", "29px");
            this.gridBodyContainer = ExpressCraft.Control.div();

            this.gridBodyContainer.style.overflowX = "auto";
            this.gridBodyContainer.style.overflowY = "auto";

            this.gridHeaderContainer.style.overflow = "hidden";

            this.gridBody = ExpressCraft.Control.div();
            ExpressCraft.Helper.setBounds$1(this.gridBody, "0", "0", "0", "0");

            this.gridBodyContainer.appendChild(this.gridBody);
            this.gridHeaderContainer.appendChild(this.gridHeader);

            this.setDefaultSizes();

            this.content.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f1);

            this.onResize = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f2);
            this.gridBodyContainer.onscroll = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f2);
            this.onLoaded = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f3);
            this.onCellRowMouseDown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f4);
            this.onRowClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f5);
            this.content.tabIndex = 0;
            this.onDoubleClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f6);

            this.content.onkeydown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f7);

            this.contextMenu = new ExpressCraft.ContextMenu();

            this.contextMenu.contextItems.addRange(System.Array.init([new ExpressCraft.ContextItem.$ctor1("Sort Ascending", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f8)), new ExpressCraft.ContextItem.$ctor1("Sort Descending", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f9)), new ExpressCraft.ContextItem.$ctor1("Clear All Sorting", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f10), true), new ExpressCraft.ContextItem.$ctor2("Group By This Column"), new ExpressCraft.ContextItem.$ctor2("Hide Group By Box", true), new ExpressCraft.ContextItem.$ctor2("Hide This Column"), new ExpressCraft.ContextItem.$ctor2("View Columns"), new ExpressCraft.ContextItem.$ctor2("Save Column Layout"), new ExpressCraft.ContextItem.$ctor2("Best Fit"), new ExpressCraft.ContextItem.$ctor2("Best Fit (all columns)", true), new ExpressCraft.ContextItem.$ctor2("Filter Editor..."), new ExpressCraft.ContextItem.$ctor2("Show Find Panel"), new ExpressCraft.ContextItem.$ctor2("Show Auto Filter Row"), new ExpressCraft.ContextItem.$ctor1("Select All", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f11)), new ExpressCraft.ContextItem.$ctor1("Unselect All", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f12))], ExpressCraft.ContextItem));

            this.content.oncontextmenu = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f13);

            this.onColumnOnClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f14);
            this.onColumnDragStart = $asm.$.ExpressCraft.GridView.f15;
            this.onColumnDragOver = $asm.$.ExpressCraft.GridView.f16;
            this.onColumnDrop = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f17);
            this.onColumnMouseDown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f18);
            this.onColumnMouseMove = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f19);

            this.onColumnMouseLeave = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f20);

            this.onRowDragStart = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f21);

            ExpressCraft.Helper.appendChildren$1(this.content, [this.gridHeaderContainer, this.gridBodyContainer]);

            this.filterRowOnChange = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f22);

            this.autoGenerateColumnsFromSource = autoGenerateColumns;
            this.setColumnAutoWidth(columnAutoWidth);
        },
        getAllowRowDrag: function () {
            return this._allowRowDrag;
        },
        setAllowRowDrag: function (value) {
            if (this._allowRowDrag !== value) {
                this._allowRowDrag = value;
                this.renderGrid();
            }
        },
        getShowAutoFilterRow: function () {
            return this.showAutoFilterRow;
        },
        setShowAutoFilterRow: function (value) {
            if (this.showAutoFilterRow !== value) {
                this.showAutoFilterRow = value;
                if (!this.showAutoFilterRow) {
                    // Remove Filter.						
                    for (var i = 0; i < this.columnCount(); i = (i + 1) | 0) {
                        //FilterEdit = null;
                        this.columns.getItem(i).filterEdit = null;
                        this.columns.getItem(i).setFilterValue(null);
                    }
                    this.calculateVisibleRows();
                }
                this.renderGrid();
            }
        },
        getFocusedColumn: function () {
            return this._focusedcolumn;
        },
        setFocusedColumn: function (value) {
            if (value !== this.getFocusedColumn()) {
                var prev = this._focusedcolumn;
                this._focusedcolumn = value;
                //RenderGrid();
            }
        },
        getFocusedDataHandle: function () {
            return this._focusedDataHandle;
        },
        setFocusedDataHandle: function (value) {
            if (value !== this._focusedDataHandle) {
                var prev = this._focusedDataHandle;
                this._focusedDataHandle = value;
                this.renderGrid();
                if (!Bridge.staticEquals(this.onFocusedRowChanged, null)) {
                    this.onFocusedRowChanged(this._focusedDataHandle, prev);
                }
            }
        },
        getColumnHeadersVisible: function () {
            return this._columnHeadersVisible;
        },
        setColumnHeadersVisible: function (value) {
            if (value !== this._columnHeadersVisible) {
                this._columnHeadersVisible = value;

                this.setDefaultSizes();

                this.renderGrid();
            }
        },
        getColumnAutoWidth: function () {
            return this._columnAutoWidth;
        },
        setColumnAutoWidth: function (value) {
            if (value) {
                this.gridBodyContainer.style.overflowX = "hidden";
            } else {
                this.gridBodyContainer.style.overflowX = "auto";
            }

            if (this._columnAutoWidth !== value) {
                this._columnAutoWidth = value;
                this.renderGrid();
            }
        },
        getUseEditForm: function () {
            return this._useEditForm;
        },
        setUseEditForm: function (value) {
            if (value !== this._useEditForm) {
                this._useEditForm = value;
                this.renderGrid();
            }
        },
        getDataSource: function () {
            return this._dataSource;
        },
        setDataSource: function (value) {
            this.setFocusedDataHandle(-1);
            this.selectedRows = new (ExpressCraft.HardSoftList$1(Boolean))(false);
            this.visibleRowHandles = new (System.Collections.Generic.List$1(System.Int32))();

            if (this._dataSource != null) {
                this._dataSource.removeOnDataSourceChanged(Bridge.fn.cacheBind(this, this.dataSource_OnDataSourceChanged));
            }

            this._dataSource = value;

            if (this._dataSource != null) {
                this._dataSource.addOnDataSourceChanged(Bridge.fn.cacheBind(this, this.dataSource_OnDataSourceChanged));

                if (this.columns.getCount() === 0 && this.autoGenerateColumnsFromSource) {
                    var sw = System.Diagnostics.Stopwatch.startNew();

                    for (var i = 0; i < this._dataSource.getColumnCount(); i = (i + 1) | 0) {
                        var sw1 = System.Diagnostics.Stopwatch.startNew();

                        var gvc = new ExpressCraft.GridViewColumn(this);
                        gvc.caption = this._dataSource.columns.getItem(i).fieldName;
                        gvc.column = this._dataSource.columns.getItem(i);
                        gvc.visible = true;

                        switch (this._dataSource.columns.getItem(i).dataType) {
                            case ExpressCraft.DataType.Byte: 
                            case ExpressCraft.DataType.Short: 
                            case ExpressCraft.DataType.Integer: 
                            case ExpressCraft.DataType.Long: 
                            case ExpressCraft.DataType.Float: 
                            case ExpressCraft.DataType.Double: 
                            case ExpressCraft.DataType.Decimal: 
                                gvc.bodyApparence.alignment = "right";
                                break;
                            case ExpressCraft.DataType.DateTime: 
                                if (ExpressCraft.Settings.gridViewAutoColumnFormatDates) {
                                    if (ExpressCraft.Settings.gridViewAutoColumnGenerateFormatAsDate) {
                                        gvc.formatString = "{0:d}";
                                    } else {
                                        gvc.formatString = "{0:yyyy-MM-dd}";
                                    }
                                }
                                break;
                            case ExpressCraft.DataType.Bool: 
                                gvc.cellDisplay = new ExpressCraft.GridViewCellDisplayCheckBox();
                                break;
                        }

                        this.columns.add(gvc);

                        sw.stop();
                        Bridge.Console.log("DataSource AddColumn Auto: " + sw1.milliseconds());
                    }

                    sw.stop();
                    Bridge.Console.log("DataSource AutoColumns: " + sw.milliseconds());
                }
                this.renderGrid();
            }
        },
        setVisibleRowHandles: function (T, Cells, asc) {
            if (asc) {
                var sorted = System.Linq.Enumerable.from(Cells).select(function (x, i) {
                        return new (System.Collections.Generic.KeyValuePair$2(System.Int32,T))(i, x);
                    }).orderBy($asm.$.ExpressCraft.GridView.f23).toList(System.Collections.Generic.KeyValuePair$2(System.Int32,T));

                this.visibleRowHandles = System.Linq.Enumerable.from(sorted).select($asm.$.ExpressCraft.GridView.f24).toList(System.Int32);
            } else {
                var sorted1 = System.Linq.Enumerable.from(Cells).select(function (x, i) {
                        return new (System.Collections.Generic.KeyValuePair$2(System.Int32,T))(i, x);
                    }).orderByDescending($asm.$.ExpressCraft.GridView.f23).toList(System.Collections.Generic.KeyValuePair$2(System.Int32,T));

                this.visibleRowHandles = System.Linq.Enumerable.from(sorted1).select($asm.$.ExpressCraft.GridView.f24).toList(System.Int32);
            }
        },
        calculateVisibleRows: function () {
            var calcVisibleRows = new (System.Collections.Generic.List$1(System.Int32))();

            for (var y = 0; y < this.rowCount(); y = (y + 1) | 0) {
                var AddIndex = true;

                for (var x = 0; x < this.columnCount(); x = (x + 1) | 0) {
                    if (!this.columns.getItem(x).valueMatchFilter(y)) {
                        AddIndex = false;
                        break;
                    }
                }
                if (AddIndex) {
                    calcVisibleRows.add(y);
                }
            }

            this.visibleRowHandles = calcVisibleRows;
            this.renderGrid();
        },
        setDefaultSizes: function () {
            if (this._columnHeadersVisible) {
                ExpressCraft.Helper.setBounds$1(this.gridHeaderContainer, "0", "0", "100%", "29px");
                ExpressCraft.Helper.setBounds$1(this.gridBodyContainer, "0px", "31px", "100%", "calc(100% - 31px)");
                this.gridHeader.style.visibility = "visible";
            } else {
                this.gridHeader.style.visibility = "hidden";
                ExpressCraft.Helper.setBounds$1(this.gridBodyContainer, "0px", "1px", "100%", "calc(100% - 1px)");
            }
        },
        sortColumn: function () {
            if (this.sortSettings != null) {
                this.sortColumn$1(this.sortSettings.column, this.sortSettings.sortMode);
            }
        },
        sortColumn$1: function (column, sort) {
            if (sort === void 0) { sort = 1; }
            column.sortedMode = sort;

            if (this.sortSettings != null && !Bridge.referenceEquals(this.sortSettings.column, column)) {
                this.sortSettings.column.sortedMode = ExpressCraft.GridViewSortMode.None;
                this.visibleRowHandles = null;
            }

            if (sort === ExpressCraft.GridViewSortMode.None) {
                this.visibleRowHandles = null;
            } else {
                var sort1 = sort === ExpressCraft.GridViewSortMode.Asc;

                switch (column.column.dataType) {
                    default: 
                    case ExpressCraft.DataType.Object: 
                        this.setVisibleRowHandles(Object, (Bridge.as(column.column, ExpressCraft.DataColumnObject)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Bool: 
                        this.setVisibleRowHandles(System.Nullable$1(Boolean), (Bridge.as(column.column, ExpressCraft.DataColumnBool)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.DateTime: 
                        this.setVisibleRowHandles(System.Nullable$1(Date), (Bridge.as(column.column, ExpressCraft.DataColumnDateTime)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.String: 
                        this.setVisibleRowHandles(String, (Bridge.as(column.column, ExpressCraft.DataColumnString)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Byte: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Byte), (Bridge.as(column.column, ExpressCraft.DataColumnByte)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Short: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Int16), (Bridge.as(column.column, ExpressCraft.DataColumnShort)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Integer: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Int32), (Bridge.as(column.column, ExpressCraft.DataColumnInteger)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Long: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Int64), (Bridge.as(column.column, ExpressCraft.DataColumnLong)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Float: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Single), (Bridge.as(column.column, ExpressCraft.DataColumnFloat)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Double: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Double), (Bridge.as(column.column, ExpressCraft.DataColumnDouble)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Decimal: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Decimal), (Bridge.as(column.column, ExpressCraft.DataColumnDecimal)).cells, sort1);
                        break;
                }
            }

            this.renderGrid();
            this.sortSettings = Bridge.merge(new ExpressCraft.SortSetting(), {
                column: column,
                sortMode: sort
            } );
        },
        clearSortColumn: function () {
            if (this.sortSettings != null) {
                this.sortColumn$1(this.sortSettings.column, ExpressCraft.GridViewSortMode.None);
            }
        },
        columnCount: function () {
            return this.columns.getCount();
        },
        rowCount: function () {
            if (this._dataSource == null) {
                return 0;
            }
            return this._dataSource.getRowCount();
        },
        scrollToBottom: function () {
            this.gridBodyContainer.scrollTop = (this.gridBody.clientHeight - this.gridBodyContainer.clientHeight) | 0;
        },
        scrollToTop: function () {
            this.gridBodyContainer.scrollTop = 0;
        },
        getColumn: function (i) {
            return this.columns.getItem(i);
        },
        getFocusedRowCellValue$2: function (columnIndex) {
            return this.getFocusedRowCellValue$1(this.columns.getItem(columnIndex));
        },
        getFocusedRowCellValue$3: function (FieldName) {
            return this.getFocusedRowCellValue(this.getColumnByFieldName(FieldName));
        },
        getFocusedRowCellValue$1: function (column) {
            return this.getRowCellValue$1(this.getFocusedDataHandle(), column);
        },
        getFocusedRowCellValue: function (column) {
            return this.getRowCellValue(this.getFocusedDataHandle(), column);
        },
        getGridViewColumnByFieldName: function (FieldName) {
            for (var i = 0; i < this.columnCount(); i = (i + 1) | 0) {
                if (Bridge.referenceEquals(this.columns.getItem(i).column.fieldName, FieldName)) {
                    return this.columns.getItem(i);
                }
            }
            return null;
        },
        getRowCellValue$1: function (Datahandle, column) {
            return this.getRowCellValue(Datahandle, column.column);
        },
        getRowCellValue: function (Datahandle, column) {
            if (Datahandle === -1) {
                return null;
            }
            return column.getCellValue(Datahandle);
        },
        getRowCellValue$3: function (Datahandle, FieldName) {
            return this.getRowCellValue(Datahandle, this.getColumnByFieldName(FieldName));
        },
        getRowCellValue$2: function (Datahandle, columnIndex) {
            return this.getRowCellValue$1(Datahandle, this.columns.getItem(columnIndex));
        },
        getColumnByFieldName: function (fieldName, IgnoreCase) {
            if (IgnoreCase === void 0) { IgnoreCase = false; }
            if (this.getDataSource() == null) {
                return null;
            }

            for (var i = 0; i < this.getDataSource().getColumnCount(); i = (i + 1) | 0) {
                if (this.getDataSource().columns.getItem(i) != null && System.String.compare(this.getDataSource().columns.getItem(i).fieldName, fieldName, IgnoreCase) === 0) {
                    return this.getDataSource().columns.getItem(i);
                }
            }

            return null;
        },
        addColumn$2: function (caption, fieldname, width, formatstring, alignment, forecolor, isBold) {
            if (width === void 0) { width = 100; }
            if (formatstring === void 0) { formatstring = ""; }
            if (alignment === void 0) { alignment = 3; }
            if (forecolor === void 0) { forecolor = null; }
            if (isBold === void 0) { isBold = false; }
            var col = this.getColumnByFieldName(fieldname);
            if (col == null) {
                return;
            }
            this.addColumn$1(caption, col, width, formatstring, alignment, forecolor, isBold);
        },
        addColumn$1: function (caption, column, width, formatstring, alignment, forecolor, isBold) {
            if (width === void 0) { width = 100; }
            if (formatstring === void 0) { formatstring = ""; }
            if (alignment === void 0) { alignment = 3; }
            if (forecolor === void 0) { forecolor = null; }
            if (isBold === void 0) { isBold = false; }
            this.addColumn(Bridge.merge(new ExpressCraft.GridViewColumn(this, width), {
                caption: caption,
                bodyApparence: new ExpressCraft.GridViewCellApparence.$ctor3(isBold, alignment, forecolor),
                formatString: formatstring,
                column: column
            } ));
        },
        addColumn: function (column) {
            if (column == null) {
                return;
            }

            this.columns.add(column);

            this.renderGrid();
        },
        addColumns: function (columns) {
            if (columns === void 0) { columns = []; }
            if (columns == null || columns.length === 0) {
                return;
            }

            this.columns.addRange(columns);

            this.renderGrid();
        },
        removeColumn: function (column) {
            this.columns.remove(column);

            this.renderGrid();
        },
        getDataSourceRow: function (i) {
            if (this.visibleRowHandles == null || this.visibleRowHandles.getCount() === 0) {
                return i;
            }
            return this.visibleRowHandles.getItem(i);
        },
        getColumnWidths: function () {
            if (this._columnAutoWidth) {
                return this.gridBodyContainer.clientWidth;
            } else {
                var width = 0.0;
                for (var i = 0; i < this.columns.getCount(); i = (i + 1) | 0) {
                    width += this.columns.getItem(i).getWidth();
                }
                return width;
            }
        },
        clearSelection: function () {
            this.selectedRows = new (ExpressCraft.HardSoftList$1(Boolean))(false);
            this.renderGrid();
        },
        selectAllRows: function () {
            var length = this.rowCount();
            if (length === 0) {
                this.selectedRows.clearAll();
            } else {
                var index = System.Array.init(length, 0, System.Int32);
                for (var i = 0; i < length; i = (i + 1) | 0) {
                    index[i] = this.getDataSourceRow(i);
                }
                this.selectedRows.clearAllSetHardRange(true, index);
            }
            this.renderGrid();
        },
        delayedRenderGrid: function () {
            if (ExpressCraft.Settings.gridViewScrollDelayed) {
                if (this.prevRenderGridScrollId !== -1) {
                    Bridge.global.clearTimeout(this.prevRenderGridScrollId);
                    this.prevRenderGridScrollId = -1;
                }
                this.prevRenderGridScrollId = Bridge.global.setTimeout(Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f25), Math.max(1, ExpressCraft.Settings.gridViewScrollDelayMS));
            } else {
                this.renderGrid();
            }
        },
        dataSource_OnDataSourceChanged: function (sender, e) {
            this.sortColumn();
            this.renderGrid();
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);
            this.setHasRendered(true);
            this.renderGrid();

            if (this.content.parentElement != null) {

            }
        },
        getRawVisibleRowCount: function () {
            return this.gridBodyContainer.clientHeight === 0 ? 0.0 : this.gridBodyContainer.clientHeight / ExpressCraft.GridView.UnitHeight;
        },
        getRawTopRowIndex: function () {
            return this.gridBodyContainer.scrollTop === 0 ? 0.0 : this.gridBodyContainer.scrollTop / this.pixelsPerRow(this.rowCount());
        },
        validateGridWidth: function () {
            var width = this.getColumnWidths();
            this.gridBody.style.width = ExpressCraft.Helper.toPx((width));
            this.gridHeader.style.width = ExpressCraft.Helper.toPx(((width) + 24)); // (width).ToPx();
            if (this.rightOfTable == null) {
                this.rightOfTable = ExpressCraft.Control.div();
                this.gridBody.appendChild(this.rightOfTable);
            }
            if (this.rightOfTableHeader == null) {
                this.rightOfTableHeader = ExpressCraft.Control.div();
                this.gridHeader.appendChild(this.rightOfTableHeader);
            }
            ExpressCraft.Helper.setBounds$1(this.rightOfTable, width - 1, 0, 1, 1);
            ExpressCraft.Helper.setBounds$1(this.rightOfTableHeader, width - 1, 0, 1, 1);
        },
        pixelsPerRow: function (rowCount) {
            if (rowCount > ExpressCraft.Settings.maximumPixelScrollingRows) {
                return 3.0;
            } else {
                return ExpressCraft.GridView.UnitHeight;
            }
        },
        validateGridHeight: function () {
            var i = this.rowCount();
            var ppr = this.pixelsPerRow(i);
            var height = ppr * i;

            if (i > ExpressCraft.Settings.maximumPixelScrollingRows && this.gridBodyContainer.clientHeight > 0) {
                height += ((this.gridBodyContainer.clientHeight / ExpressCraft.GridView.UnitHeight) * ppr);
            }

            this.gridBody.style.height = ExpressCraft.Helper.toPx(height);
            if (this.bottonOfTable == null) {
                this.bottonOfTable = ExpressCraft.Control.div();
                this.gridBody.appendChild(this.bottonOfTable);
            }
            ExpressCraft.Helper.setBounds$1(this.bottonOfTable, 0, height - 1, 1, 1);
        },
        validateGridSize: function () {
            this.validateGridHeight();
            this.validateGridWidth();
        },
        clearHeader: function () {
            ExpressCraft.Helper.empty(this.gridHeader);
            this.gridHeader.appendChild(this.rightOfTableHeader);
        },
        clearColumns: function () {
            this.columns = new (System.Collections.Generic.List$1(ExpressCraft.GridViewColumn))();
        },
        clearView: function () {
            this.columns = new (System.Collections.Generic.List$1(ExpressCraft.GridViewColumn))();
            this.visibleRowHandles = new (System.Collections.Generic.List$1(System.Int32))();
            this.selectedRows = new (ExpressCraft.HardSoftList$1(Boolean))(false);
            this._dataSource = null;
        },
        clearBody: function () {
            ExpressCraft.Helper.empty(this.gridBody);
            ExpressCraft.Helper.appendChildren$1(this.gridBody, [this.rightOfTable, this.bottonOfTable]);
        },
        clearGrid: function () {
            this.clearHeader();
            this.clearBody();
        },
        setupColumn: function (se, index, gcol) {
            se.setAttribute("i", System.Convert.toString(index));
            se.setAttribute("draggable", "true");
            se.onclick = this.onColumnOnClick;
            se.ondragstart = this.onColumnDragStart;
            se.ondragover = this.onColumnDragOver;
            se.ondrop = this.onColumnDrop;
            se.onmousedown = this.onColumnMouseDown;
            se.onmousemove = this.onColumnMouseMove;
            se.onmouseleave = this.onColumnMouseLeave;
        },
        processBlur: function () {
            if (this.prevScroll !== this.gridBodyContainer.scrollTop) {
                this.gridBody.classList.add("blur");
                if (this.lastId !== -1) {
                    Bridge.global.clearTimeout(this.lastId);
                    this.lastId = -1;
                }

                this.lastId = Bridge.global.setTimeout(Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f26), 100);
            }
            this.prevScroll = this.gridBodyContainer.scrollTop;
        },
        renderGrid: function () {
            if (this.renderTime > -1) {
                Bridge.global.clearTimeout(this.renderTime);
                this.renderTime = Bridge.global.setTimeout(this.renderGridInternal, 1);
            } else {
                this.renderGridInternal();
            }
        }
    });

    Bridge.ns("ExpressCraft.GridView", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.GridView, {
        f1: function (ev) {
            if (this.resizeIndex === -1) {
                return;
            }
            var x = ev.pageX;
            x = (this.columns.getItem(this.resizeIndex).getWidth() + (((x - this.resizePageX) | 0))) | 0;
            if (x < 24) {
                x = 24;
            }
            this.columns.getItem(this.resizeIndex).setWidth(x);

            ExpressCraft.Form.setCursor("default");

            ev.preventDefault();
            ev.stopImmediatePropagation();
            ev.stopPropagation();

            this.resizeIndex = -1;
            this.resizeSpan = null;
        },
        f2: function (ev) {
            this.delayedRenderGrid();
        },
        f3: function (ev) {
            this.renderGrid();
        },
        f4: function (ev) {
            this.setFocusedColumn(parseInt(ev.currentTarget.getAttribute("i")));
        },
        f5: function (ev) {
            if (!ExpressCraft.Settings.isChrome) {
                if (this.clickTimeDiff == null) {
                    this.clickTimeDiff = System.Diagnostics.Stopwatch.startNew();
                } else {
                    this.clickTimeDiff.stop();
                    var ems = this.clickTimeDiff.milliseconds();
                    this.clickTimeDiff = null;

                    if (ems.lt(System.Int64(200))) {
                        this.onDoubleClick(ev);
                    }
                }
            }

            var DataRowHandle = parseInt(ev.currentTarget.getAttribute("i"));

            var mev = ev;
            if (this.allowMultiSelection) {
                if (mev.ctrlKey) {
                    this.selectedRows.addOrSet(true, DataRowHandle, true);
                    this.renderGrid();
                    return;
                } else if (mev.shiftKey) {
                    return;
                }
            }
            this.selectedRows.clearAndAddOrSet(true, DataRowHandle, true);
            if (DataRowHandle !== this._focusedDataHandle) {
                this.setFocusedDataHandle(DataRowHandle);
            } else {
                this.renderGrid();
            }
        },
        f6: function (ev) {
            var drh = parseInt(ev.currentTarget.getAttribute("i"));
            if (!Bridge.staticEquals(this.onRowDoubleClick, null)) {
                this.onRowDoubleClick(drh);
            }

            if (this._useEditForm) {
                var idr = this.getDataSource().getItem(drh);

                var fdre = new ExpressCraft.DataRowEditForm(idr, this, true);
                fdre.showDialog();

            }
        },
        f7: function (ev) {
            var kev = ev;
            //Global.Alert("CONTROL + A");
            if (this.allowMultiSelection && kev.ctrlKey && (kev.keyCode === 65 || kev.keyCode === 97)) {
                // keyCode == 65 || keyCode == 97
                //Global.Alert("AllowMultiSelection = TRUE");
                this.selectAllRows();
            } else {
                //Global.Alert("AllowMultiSelection = FALSE");
            }
        },
        f8: function (cm) {
            if (this.getFocusedColumn() > -1) {
                this.sortColumn$1(this.columns.getItem(this.getFocusedColumn()), ExpressCraft.GridViewSortMode.Asc);
            }
        },
        f9: function (cm) {
            if (this.getFocusedColumn() > -1) {
                this.sortColumn$1(this.columns.getItem(this.getFocusedColumn()), ExpressCraft.GridViewSortMode.Desc);
            }
        },
        f10: function (cm) {
            this.clearSortColumn();
        },
        f11: function (cm) {
            this.selectAllRows();
        },
        f12: function (cm) {
            this.clearSelection();
        },
        f13: function (ev) {
            if (this.contextMenu != null) {
                this.contextMenu.show(ExpressCraft.Helper.getClientMouseLocation(ev).$clone());
                ev.preventDefault();
                ev.stopPropagation();
            }
        },
        f14: function (ev) {
            if (this.resizeIndex >= 0) {
                return;
            }

            var gcol = this.columns.getItem(parseInt(ev.currentTarget.getAttribute("i")));

            for (var i = 0; i < this.columnCount(); i = (i + 1) | 0) {
                if (!Bridge.referenceEquals(this.columns.getItem(i), gcol)) {
                    this.columns.getItem(i).sortedMode = ExpressCraft.GridViewSortMode.None;
                }
            }
            switch (gcol.sortedMode) {
                default: 
                case ExpressCraft.GridViewSortMode.None: 
                    this.sortColumn$1(gcol, ExpressCraft.GridViewSortMode.Asc);
                    break;
                case ExpressCraft.GridViewSortMode.Asc: 
                    this.sortColumn$1(gcol, ExpressCraft.GridViewSortMode.Desc);
                    break;
                case ExpressCraft.GridViewSortMode.Desc: 
                    this.sortColumn$1(gcol, ExpressCraft.GridViewSortMode.None);
                    break;
            }
        },
        f15: function (ev) {
            ev.dataTransfer.setData("gridviewColumnDrag", ev.currentTarget.getAttribute("i"));
        },
        f16: function (ev) {
            ev.preventDefault();
        },
        f17: function (ev) {
            if (ev.target == null || !(Bridge.is(ev.target, HTMLSpanElement))) {
                return;
            }

            var target = ev.target;

            if (!Bridge.referenceEquals(target.parentElement, this.gridHeader)) {
                return;
            }

            var HoverIndex = parseInt(target.getAttribute("i"));
            var SelectedIndex = parseInt(ev.dataTransfer.getData("gridviewColumnDrag"));
            if (SelectedIndex === HoverIndex) {
                return;
            }

            if (HoverIndex < 0) {
                return;
            }

            var x = ev.layerX;
            x = (x - target.clientLeft) | 0;
            var w = (Bridge.Int.div(target.clientWidth, 2)) | 0;

            if (HoverIndex === ((SelectedIndex - 1) | 0) && x > w) {
                return;
            }
            if (HoverIndex === ((SelectedIndex + 1) | 0) && x < w) {
                return;
            }

            if (x < w) {
                this.dragIndex = HoverIndex;
            } else {
                this.dragIndex = (HoverIndex + 1) | 0;
            }

            if (this.dragIndex < 0 || SelectedIndex < 0) {
                return;
            }
            var col = this.columns.getItem(SelectedIndex);
            if (this.dragIndex === this.columns.getCount()) {
                this.columns.remove(col);
                this.columns.add(col);
            } else {
                var col1 = this.columns.getItem(this.dragIndex);
                this.columns.remove(col);
                this.columns.insert(this.columns.indexOf(col1), col);
            }

            this.renderGrid();
        },
        f18: function (ev) {
            var x = ev.layerX;
            var target = ev.target;
            x = (x - target.clientLeft) | 0;
            this.resizePageX = ev.pageX;

            this.setFocusedColumn(parseInt(ev.currentTarget.getAttribute("i")));

            if (x >= ((target.clientWidth - 2) | 0)) {
                this.resizeIndex = parseInt(target.getAttribute("i"));
                this.resizeSpan = target;
                ExpressCraft.Form.setCursor("ew-resize");

                ev.preventDefault();
            } else {
                this.resizeSpan = null;
                this.resizeIndex = -1;
            }
        },
        f19: function (ev) {
            if (this.resizeIndex === -1) {
                var x = ev.layerX;
                var target = ev.target;
                x = (x - target.clientLeft) | 0;

                if (x >= ((target.clientWidth - 2) | 0)) {
                    ExpressCraft.Form.setCursor("ew-resize");
                    return;
                }
                ExpressCraft.Form.setCursor("default");
            }
        },
        f20: function (ev) {
            if (this.resizeIndex === -1) {
                ExpressCraft.Form.setCursor("default");
            }
        },
        f21: function (ev) {
            ev.dataTransfer.setData("gridviewRowDrag", JSON.stringify(this.getDataSource().getItem(parseInt(ev.currentTarget.getAttribute("i"))).getOfflineDataRow()));
        },
        f22: function (te) {
            this.columns.getItem(parseInt(te.content.getAttribute("i"))).setFilterValue(te.getText());
        },
        f23: function (x) {
            return x.value;
        },
        f24: function (x) {
            return x.key;
        },
        f25: function () {
            this.renderGrid();
        },
        f26: function () {
            this.gridBody.classList.remove("blur");
        }
    });

    Bridge.define("ExpressCraft.GridViewCellDisplayCheckBox", {
        inherits: [ExpressCraft.GridViewCellDisplay],
        statics: {
            resource_checked: "checked"
        },
        onCreate: function (gridView, dataRowIndex, columnIndex) {
            var value = gridView.getRowCellValue$2(dataRowIndex, columnIndex);

            var cell = ExpressCraft.Control.div$1("cell");
            var input = ExpressCraft.Control.input("", "checkbox");
            ExpressCraft.Helper.setBoundsFull$1(input);
            ExpressCraft.Helper.setChecked(input, value);
            input.style.margin = "0";
            cell.appendChild(input);

            return cell;
        }
    });

    Bridge.define("ExpressCraft.GridViewCellDisplayImage", {
        inherits: [ExpressCraft.GridViewCellDisplay],
        useBase64Resource: false,
        onCreate: function (gridView, dataRowIndex, columnIndex) {
            var src = ExpressCraft.Helper.htmlUrlEscape((System.String.concat(gridView.getRowCellValue$2(dataRowIndex, columnIndex), "")));
            var imgDiv = ExpressCraft.Control.div$1("cell");

            ExpressCraft.Helper.setImage(imgDiv, src, !this.useBase64Resource);

            return imgDiv;
        }
    });

    Bridge.define("ExpressCraft.ProgressControl", {
        inherits: [ExpressCraft.Control],
        position: 0,
        internalProgressControl: null,
        maximum: 0,
        step: 1,
        disableUpdate: false,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "progressbar");
            this.internalProgressControl = ExpressCraft.Control.div$1("progressbarbody");
        },
        getMaximum: function () {
            return this.maximum;
        },
        setMaximum: function (value) {
            if (value < 1) {
                value = 1;
            }
            if (value < this.position) {
                this.position = value;
            }
            this.maximum = value;
            if (!this.disableUpdate) {
                this.update();
            }
        },
        getPosition: function () {
            return this.position;
        },
        setPosition: function (value) {
            if (value < 0) {
                value = 0;
            } else {
                if (value > this.maximum) {
                    value = this.maximum;
                }
            }
            this.position = value;
            if (!this.disableUpdate) {
                this.update();
            }
        },
        nextStep: function () {
            this.setPosition((this.getPosition() + this.step) | 0);
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);

            this.content.appendChild(this.internalProgressControl);

            this.update();
        },
        update: function () {
            if (this.disableUpdate || this.internalProgressControl == null) {
                return;
            }
            if (this.maximum === 0 || this.position === 0) {
                this.internalProgressControl.style.width = "0%";
            } else {
                var source = ((this.position / this.maximum) * 100.00) + '%';
                this.internalProgressControl.style.width = System.String.concat("calc(", source, " - 2px)");
            }
        }
    });

    Bridge.define("ExpressCraft.RibbonButton", {
        inherits: [ExpressCraft.Control],
        _icon: "",
        _iconURL: "",
        _caption: "",
        beginGroup: false,
        isSmallCaption: false,
        onItemClick: null,
        enabled: true,
        captionDiv: null,
        imageDiv: null,
        ctor: function (caption, _isSmallCaption) {
            if (caption === void 0) { caption = ""; }
            if (_isSmallCaption === void 0) { _isSmallCaption = false; }

            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, _isSmallCaption ? "ribbonbuttonsmall" : "ribbonbutton");
            this._caption = caption;
            this.isSmallCaption = _isSmallCaption;
        },
        getIcon: function () {
            return this._icon;
        },
        setIcon: function (value) {
            if (!Bridge.referenceEquals(this._icon, value)) {
                this._icon = value;
                this.processImage();
            }
        },
        getIconURL: function () {
            return this._iconURL;
        },
        setIconURL: function (value) {
            if (!Bridge.referenceEquals(this._iconURL, value)) {
                this._iconURL = value;
                this.processImage();
            }
        },
        getCaption: function () {
            return this._caption;
        },
        setCaption: function (value) {
            if (!Bridge.referenceEquals(this._caption, value)) {
                this._caption = value;
                this.processCaption();
            }
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.setEnabled$1(value);
        },
        setEnabled$1: function (value) {
            this.changeState(value);
            if (value) {
                if (this.imageDiv != null) {
                    this.imageDiv.classList.remove("disabled");
                }
                if (this.captionDiv != null) {
                    this.captionDiv.classList.remove("disabled");
                }
            } else {
                if (this.imageDiv != null) {
                    this.imageDiv.classList.add("disabled");
                }
                if (this.captionDiv != null) {
                    this.captionDiv.classList.add("disabled");
                }
            }
        },
        render: function () {
            this.setHasRendered(true);
            ExpressCraft.Helper.empty(this.content);

            this.content.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.RibbonButton.f1);

            this.processCaption();
            this.processImage();

            this.setEnabled$1(this.enabled);
        },
        processCaption: function () {
            if (!System.String.isNullOrWhiteSpace(this.getCaption())) {
                this.captionDiv = ExpressCraft.Control.div$1(this.isSmallCaption ? "ribbonbuttonsmallcaption" : "ribbonbuttoncaption");

                this.captionDiv.innerHTML = this.getCaption();

                this.content.appendChild(this.captionDiv);

            } else {
                if (this.captionDiv != null) {
                    this.captionDiv.remove();
                }
            }
        },
        processImage: function () {
            if (this.imageDiv == null) {
                if (!System.String.isNullOrWhiteSpace(this.getIcon())) {
                    this.imageDiv = ExpressCraft.Control.div$1(this.isSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                    this.imageDiv.style.background = ExpressCraft.Control.getImageString(this.getIcon());

                    this.content.appendChild(this.imageDiv);
                } else if (!System.String.isNullOrWhiteSpace(this.getIconURL())) {
                    this.imageDiv = ExpressCraft.Control.div$1(this.isSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                    this.imageDiv.style.background = ExpressCraft.Control.getImageStringURI(this.getIconURL());

                    this.content.appendChild(this.imageDiv);
                }
            } else {
                if (!System.String.isNullOrWhiteSpace(this.getIcon())) {
                    this.imageDiv.style.background = ExpressCraft.Control.getImageString(this.getIcon());
                } else if (!System.String.isNullOrWhiteSpace(this.getIconURL())) {
                    this.imageDiv.style.background = ExpressCraft.Control.getImageStringURI(this.getIconURL());
                }
            }
            if (this.imageDiv != null) {
                this.imageDiv.style.backgroundSize = "100% 100%";

                if (this.captionDiv != null && this.isSmallCaption) {
                    this.captionDiv.style.left = "28px";
                }
            } else {
                if (this.captionDiv != null && this.isSmallCaption) {
                    this.captionDiv.style.left = "6px";
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.RibbonButton", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.RibbonButton, {
        f1: function (ev) {
            if (this.enabled && !Bridge.staticEquals(this.onItemClick, null)) {
                this.onItemClick(this);
            }
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.RibbonControl", {
        inherits: [ExpressCraft.Control],
        iconURL: "fav.ico",
        type: 0,
        applicationIcon: null,
        onSelectedPageChange: null,
        selectedindex: -1,
        config: {
            properties: {
                RibbonPages: null
            },
            init: function () {
                this.RibbonPages = new (System.Collections.Generic.List$1(ExpressCraft.RibbonPage))();
            }
        },
        ctor: function (type) {
            if (type === void 0) { type = 0; }

            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, System.String.concat("ribboncontrol", (type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribboncontrol-compact")));
            this.type = type;

            this.content.oncontextmenu = $asm.$.ExpressCraft.RibbonControl.f1;
        },
        getSelectedIndex: function () {
            return this.selectedindex;
        },
        setSelectedIndex: function (value) {
            if (value < 0) {
                value = 0;
            }
            if (this.selectedindex >= this.getRibbonPages().getCount()) {
                this.selectedindex = (this.getRibbonPages().getCount() - 1) | 0;
            }

            if (this.selectedindex !== value) {
                this.selectedindex = value;
                if (!Bridge.staticEquals(this.onSelectedPageChange, null)) {
                    this.onSelectedPageChange(this.selectedindex, this.getRibbonPages().getItem(this.selectedindex));
                }
            }
            this.setSelectedIndex$1(value);
        },
        addRibbonPages: function (pages) {
            if (pages === void 0) { pages = []; }
            if (pages != null) {
                this.getRibbonPages().addRange(pages);
            }
        },
        setSelectedIndex$1: function (index) {
            if (this.getRibbonPages() != null && this.getRibbonPages().getCount() > 0) {
                for (var i = 0; i < this.getRibbonPages().getCount(); i = (i + 1) | 0) {
                    if (this.getRibbonPages().getItem(i).ribbonHeader != null) {
                        this.getRibbonPages().getItem(i).ribbonHeader.classList.remove("ribbonpageheader-hidden");
                        this.getRibbonPages().getItem(i).ribbonHeader.classList.remove("ribbonpageheader-active");

                        if (i === index) {
                            this.getRibbonPages().getItem(i).ribbonHeader.classList.add("ribbonpageheader-active");
                            this.getRibbonPages().getItem(i).content.style.visibility = "visible";
                        } else {
                            this.getRibbonPages().getItem(i).ribbonHeader.classList.add("ribbonpageheader-hidden");
                            this.getRibbonPages().getItem(i).content.style.visibility = "hidden";
                        }
                    }
                }
            }
        },
        render: function () {
            this.setHasRendered(true);
            if (this.type === ExpressCraft.RibbonControl.RibbonType.Full) {
                if (this.applicationIcon != null) {
                    ExpressCraft.Helper.delete(this.applicationIcon);
                }
                this.applicationIcon = ExpressCraft.Control.div$1("application-icon");
                var appIconImage = ExpressCraft.Control.div$1("fav-icon");
                appIconImage.style.background = ExpressCraft.Control.getImageStringURI(this.iconURL);
                appIconImage.style.backgroundSize = "100% 100%";

                this.applicationIcon.appendChild(appIconImage);

                this.content.appendChild(this.applicationIcon);
            }

            if (this.getRibbonPages() != null && this.getRibbonPages().getCount() > 0) {
                var width = 58;
                for (var i = 0; i < this.getRibbonPages().getCount(); i = (i + 1) | 0) {
                    (function () {
                        if (this.content.contains(ExpressCraft.Control.op_Implicit(this.getRibbonPages().getItem(i)))) {
                            ExpressCraft.Helper.delete(this.getRibbonPages().getItem(i).content);
                            ExpressCraft.Helper.delete(this.getRibbonPages().getItem(i).ribbonHeader);
                        }
                        this.getRibbonPages().getItem(i).render();

                        if (this.type === ExpressCraft.RibbonControl.RibbonType.Compact) {
                            if (!System.String.contains(this.getRibbonPages().getItem(i).content.className,"ribbonpage-compact")) {
                                this.getRibbonPages().getItem(i).content.classList.add("ribbonpage-compact");
                            }
                        } else {
                            if (System.String.contains(this.getRibbonPages().getItem(i).content.className,"ribbonpage-compact")) {
                                this.getRibbonPages().getItem(i).content.classList.remove("ribbonpage-compact");
                            }
                        }

                        var index = i;

                        if (i === this.selectedindex) {
                            this.getRibbonPages().getItem(i).ribbonHeader = ExpressCraft.Control.div$1(System.String.concat("ribbonpageheader ribbonpageheader-active", (this.type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribbonpageheader-compact")));
                            this.getRibbonPages().getItem(i).content.style.visibility = "visible";
                        } else {
                            this.getRibbonPages().getItem(i).ribbonHeader = ExpressCraft.Control.div$1(System.String.concat("ribbonpageheader ribbonpageheader-hidden", (this.type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribbonpageheader-compact")));
                            this.getRibbonPages().getItem(i).content.style.visibility = "hidden";
                        }

                        this.getRibbonPages().getItem(i).ribbonHeader.onmousedown = Bridge.fn.bind(this, function (ev) {
                            this.setSelectedIndex(index);
                        });
                        this.getRibbonPages().getItem(i).ribbonHeader.ontouchstart = Bridge.fn.bind(this, function (ev) {
                            this.setSelectedIndex(index);
                        });

                        this.getRibbonPages().getItem(i).ribbonHeader.innerHTML = this.getRibbonPages().getItem(i).getCaption();

                        var inwidth = 24;

                        if (!System.String.isNullOrEmpty(this.getRibbonPages().getItem(i).getCaption())) {
                            inwidth = (inwidth + Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(this.getRibbonPages().getItem(i).getCaption(), ExpressCraft.Settings.defaultFont))) | 0;
                        }

                        this.getRibbonPages().getItem(i).ribbonHeader.style.left = width + "px";
                        this.getRibbonPages().getItem(i).ribbonHeader.style.width = inwidth + "px";

                        this.content.appendChild(this.getRibbonPages().getItem(i).ribbonHeader);
                        this.content.appendChild(ExpressCraft.Control.op_Implicit(this.getRibbonPages().getItem(i)));

                        width = (width + inwidth) | 0;
                    }).call(this);
                }
            }
            this.setSelectedIndex(this.selectedindex);
        }
    });

    Bridge.ns("ExpressCraft.RibbonControl", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.RibbonControl, {
        f1: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
    });

    Bridge.define("ExpressCraft.RibbonGroup", {
        inherits: [ExpressCraft.Control],
        enabled: true,
        captionDiv: null,
        riList: null,
        config: {
            properties: {
                Caption: null,
                Buttons: null
            }
        },
        ctor: function (_caption) {
            if (_caption === void 0) { _caption = ""; }

            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "ribbongroup");
            this.setCaption(_caption);
            this.setButtons(new (System.Collections.Generic.List$1(ExpressCraft.RibbonButton))());
        },
        $ctor1: function (_caption, buttons) {
            if (buttons === void 0) { buttons = []; }

            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "ribbongroup");
            this.setCaption(_caption);
            this.setButtons(new (System.Collections.Generic.List$1(ExpressCraft.RibbonButton))());
            if (buttons != null) {
                this.getButtons().addRange(buttons);
            }
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.setEnabled$1(value);
        },
        setEnabled$1: function (value) {
            if (this.getButtons().getCount() > 0) {
                for (var i = 0; i < this.getButtons().getCount(); i = (i + 1) | 0) {
                    if (!value) {
                        this.getButtons().getItem(i).setEnabled$1(value);
                    } else {
                        this.getButtons().getItem(i).setEnabled$1(this.getButtons().getItem(i).getEnabled());
                    }
                }
            }
            this.changeState(value);
            if (value) {
                if (this.captionDiv != null) {
                    this.captionDiv.classList.remove("disabled");
                }
            } else {
                if (this.captionDiv != null) {
                    this.captionDiv.classList.add("disabled");
                }
            }
        },
        createVerticalLine: function (height) {
            var htmlDiv = ExpressCraft.Control.div$1("ribbonseperator");
            if (height !== 58) {
                htmlDiv.style.height = height + "px";
            }

            return htmlDiv;
        },
        generateRList: function () {

            var ri = null;

            if (this.riList == null) {
                this.riList = new (System.Collections.Generic.List$1(ExpressCraft.RibbonGroup.RenderInfo))();
                for (var i = 0; i < this.getButtons().getCount(); i = (i + 1) | 0) {
                    if (ri == null) {
                        ri = new ExpressCraft.RibbonGroup.RenderInfo();
                        ri.firstButton = this.getButtons().getItem(i);
                        ri.isSmall = ri.firstButton.isSmallCaption;
                    } else {
                        if (ri.isSmall !== this.getButtons().getItem(i).isSmallCaption || this.getButtons().getItem(i).beginGroup || !this.getButtons().getItem(i).isSmallCaption || (ri.firstButton != null && ri.secondButton != null && ri.thirdButton != null)) {
                            this.riList.add(ri);

                            ri = new ExpressCraft.RibbonGroup.RenderInfo();
                            ri.firstButton = this.getButtons().getItem(i);
                            ri.isSmall = this.getButtons().getItem(i).isSmallCaption;
                            ri.beginGroup = this.getButtons().getItem(i).beginGroup;
                        } else {
                            if (ri.secondButton == null) {
                                ri.secondButton = this.getButtons().getItem(i);
                            } else {
                                ri.thirdButton = this.getButtons().getItem(i);
                            }
                        }
                    }
                }

                if (ri != null) {
                    this.riList.add(ri);
                    ri = null;
                }
            }
        },
        render: function () {
            this.setHasRendered(true);

            this.generateRList();

            ExpressCraft.Helper.empty(this.content);

            var width = 0;

            for (var i = 0; i < this.riList.getCount(); i = (i + 1) | 0) {
                var ri = this.riList.getItem(i);

                if (ri.beginGroup) {
                    width = (width + 3) | 0;
                    var vlbg = this.createVerticalLine(58);
                    vlbg.style.left = width + "px";

                    this.content.appendChild(vlbg);
                }

                width = (width + 3) | 0;

                if (ri.isSmall) {
                    var MaxWidth;

                    if (ri.thirdButton == null) {
                        if (ri.secondButton == null) {
                            MaxWidth = Math.max(((((Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)) + 28) | 0) + 6) | 0), 64);

                            ri.firstButton.render();

                            ri.firstButton.content.style.left = width + "px";
                            ri.firstButton.content.style.width = MaxWidth + "px";

                            ri.firstButton.content.style.top = "26px";

                            this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                            // 1
                        } else {
                            MaxWidth = Math.max(((((Math.max(Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)), Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(ri.secondButton.getCaption(), ExpressCraft.Settings.defaultFont))) + 28) | 0) + 6) | 0), 64);

                            ri.firstButton.render();
                            ri.secondButton.render();

                            ri.firstButton.content.style.left = width + "px";
                            ri.secondButton.content.style.left = width + "px";

                            ri.firstButton.content.style.top = (21) + "px";

                            ri.firstButton.content.style.width = MaxWidth + "px";
                            ri.secondButton.content.style.width = MaxWidth + "px";

                            ri.firstButton.content.style.top = "11px";
                            ri.secondButton.content.style.top = "41px";

                            this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                            this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.secondButton));
                            // 2
                        }
                    } else {
                        MaxWidth = Math.max(((((Math.max(Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)), Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(ri.secondButton.getCaption(), ExpressCraft.Settings.defaultFont)), Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(ri.thirdButton.getCaption(), ExpressCraft.Settings.defaultFont))) + 28) | 0) + 6) | 0), 64);

                        ri.firstButton.render();
                        ri.secondButton.render();
                        ri.thirdButton.render();

                        ri.firstButton.content.style.left = width + "px";
                        ri.secondButton.content.style.left = width + "px";
                        ri.thirdButton.content.style.left = width + "px";

                        ri.firstButton.content.style.width = MaxWidth + "px";
                        ri.secondButton.content.style.width = MaxWidth + "px";
                        ri.thirdButton.content.style.width = MaxWidth + "px";

                        ri.firstButton.content.style.top = "3px";
                        ri.secondButton.content.style.top = "26px";
                        ri.thirdButton.content.style.top = "49px";
                        // 3

                        this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                        this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.secondButton));
                        this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.thirdButton));
                    }

                    width = (width + MaxWidth) | 0;
                } else {
                    ri.firstButton.render();

                    ri.firstButton.content.style.left = width + "px";
                    var inwidth = 0;
                    if (System.String.contains(ri.firstButton.getCaption()," ")) {
                        var strings = ri.firstButton.getCaption().split(" ");
                        var builder = new System.Text.StringBuilder();

                        var length = (Bridge.Int.div(ri.firstButton.getCaption().length, 2)) | 0;

                        for (var j = 0; j < strings.length; j = (j + 1) | 0) {
                            if (builder.getLength() > length) {
                                inwidth = (Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(builder.toString(), ExpressCraft.Settings.defaultFont)) + 20) | 0;
                                break;
                            }
                            if (builder.getLength() > 0) {
                                builder.append(System.String.concat(" ", strings[j]));
                            } else {
                                builder.append(strings[j]);
                            }
                        }
                        if (inwidth === 0) {
                            inwidth = (Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(builder.toString(), ExpressCraft.Settings.defaultFont)) + 20) | 0;
                        }
                    } else {
                        inwidth = (Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)) + 20) | 0;
                    }

                    if (inwidth < 44) {
                        inwidth = 44;
                    }

                    ri.firstButton.content.style.width = inwidth + "px";

                    width = (width + inwidth) | 0;

                    this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                }
            }

            var minWidth = (Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(this.getCaption(), ExpressCraft.Settings.defaultFont)) + 20) | 0;

            if (width < minWidth) {
                width = minWidth;
            }

            width = (width + 3) | 0;

            var vl = this.createVerticalLine(80);
            vl.style.left = ((width - 1) | 0) + "px";

            this.content.appendChild(vl);

            this.content.style.width = width + "px";

            if (!System.String.isNullOrWhiteSpace(this.getCaption())) {
                this.captionDiv = ExpressCraft.Control.div$1("ribbongroupcaption");

                this.captionDiv.innerHTML = this.getCaption();
                this.content.appendChild(this.captionDiv);
            }

            this.setEnabled$1(this.enabled);
        }
    });

    Bridge.define("ExpressCraft.RibbonPage", {
        inherits: [ExpressCraft.Control],
        ribbonHeader: null,
        config: {
            properties: {
                Caption: null,
                RibbonGroups: null
            },
            init: function () {
                this.RibbonGroups = new (System.Collections.Generic.List$1(ExpressCraft.RibbonGroup))();
            }
        },
        ctor: function (_caption) {
            if (_caption === void 0) { _caption = ""; }

            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "ribbonpage");
            this.setCaption(_caption);
        },
        addRibbonGroups: function (pages) {
            if (pages === void 0) { pages = []; }
            if (pages != null) {
                this.getRibbonGroups().addRange(pages);
            }
        },
        render: function () {
            this.setHasRendered(true);
            if (this.getRibbonGroups() == null || this.getRibbonGroups().getCount() === 0) {
                return;
            }
            var width = 0;
            for (var i = 0; i < this.getRibbonGroups().getCount(); i = (i + 1) | 0) {
                this.getRibbonGroups().getItem(i).render();
                this.getRibbonGroups().getItem(i).content.style.left = width + "px";
                width = (width + (parseInt(this.getRibbonGroups().getItem(i).content.style.width))) | 0;
                this.content.appendChild(ExpressCraft.Control.op_Implicit(this.getRibbonGroups().getItem(i)));
            }
        }
    });

    Bridge.define("ExpressCraft.SimpleButton", {
        inherits: [ExpressCraft.Control],
        itemClick: null,
        parentForm: null,
        dialogResult: 0,
        enabled: true,
        ctor: function (button, ac) {
            if (button === void 0) { button = 2; }
            if (ac === void 0) { ac = true; }

            this.$initialize();
            ExpressCraft.Control.$ctor2.call(this, "simplebutton", button, ac);
            this.content.oncontextmenu = $asm.$.ExpressCraft.SimpleButton.f1;

            if (ac) {
                this.getStyle().font = ExpressCraft.Settings.Font;
            }

            ExpressCraft.Helper.setSize(this, "69px", "20px");

            this.content.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.SimpleButton.f2);
            this.content.ondblclick = $asm.$.ExpressCraft.SimpleButton.f3;
            this.content.onmousedown = $asm.$.ExpressCraft.SimpleButton.f3;
            this.content.onmouseup = $asm.$.ExpressCraft.SimpleButton.f3;

        },
        getText: function () {
            return this.content.innerHTML;
        },
        setText: function (value) {
            this.content.innerHTML = value;
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            if (this.enabled) {
                this.content.removeAttribute("disabled");
            } else {
                this.content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
            }
        }
    });

    Bridge.ns("ExpressCraft.SimpleButton", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.SimpleButton, {
        f1: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        },
        f2: function (ev) {
            if (this.enabled) {
                this.content.blur();

                if (this.dialogResult !== ExpressCraft.DialogResultEnum.None && this.parentForm != null && this.parentForm.isDialog()) {
                    this.parentForm.dialogResult = this.dialogResult;
                }

                if (!Bridge.staticEquals(this.itemClick, null)) {
                    this.itemClick(this);
                }

                if (this.dialogResult !== ExpressCraft.DialogResultEnum.None && this.parentForm.dialogResult !== ExpressCraft.DialogResultEnum.None && this.parentForm != null && this.parentForm.isDialog()) {
                    this.parentForm.close();
                }
            }

            ev.stopPropagation();
            ev.stopImmediatePropagation();
        },
        f3: function (ev) {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
        }
    });

    Bridge.define("ExpressCraft.SplitControlContainer", {
        inherits: [ExpressCraft.Control],
        panel1: null,
        panel2: null,
        splitter: null,
        _prevClientRect: null,
        isMouseDown: false,
        _startingSplitterPos: 0,
        _splitterPosition: -1,
        fixedSplitterPostion: 0,
        splitterResizable: true,
        horizontal: false,
        config: {
            init: function () {
                this._mouseDownVector = new ExpressCraft.Vector2();
                this._currentMouseDownVector = new ExpressCraft.Vector2();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "splitcontrol");
            this.panel1 = Bridge.merge(new ExpressCraft.Control.$ctor1(), {
                setLocation: new ExpressCraft.Vector2.$ctor1(0, 0)
            } );
            this.panel2 = new ExpressCraft.Control.$ctor1();
            this.splitter = new ExpressCraft.Control.$ctor1();

            this.splitter.content.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f1);

            this.onResize = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f2);

            this.content.onmousemove = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f3);

            this.content.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f4);

            ExpressCraft.Helper.appendChildren(this, [this.panel1, this.splitter, this.panel2]);
        },
        getFixedSplitterPostion: function () {
            return this.fixedSplitterPostion;
        },
        setFixedSplitterPostion: function (value) {
            this.fixedSplitterPostion = value;
            this.renderControls();
        },
        getSplitterPosition: function () {
            return this._splitterPosition;
        },
        setSplitterPosition: function (value) {
            if (value < 0) {
                value = 0;
            }
            this._splitterPosition = value;
            this.renderControls();
        },
        getHorizontal: function () {
            return this.horizontal;
        },
        setHorizontal: function (value) {
            if (value !== this.horizontal) {
                this.renderControls();
                this.horizontal = value;
            }
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);

            this.renderControls();
        },
        resizeChildren: function () {
            if (this.linkedForm != null && this.content != null) {
                this.linkedForm.resizeChildren(this.content);
            }
        },
        getMaxSplitterSize: function () {
            var maxSize = (Bridge.Int.clip32(this.getHorizontal() ? this.content.getBoundingClientRect().height : this.content.getBoundingClientRect().width) - 12) | 0;
            if (maxSize < 0) {
                maxSize = 0;
            }
            return maxSize;
        },
        renderControls: function () {
            var sp = this.getSplitterPosition();
            var maxSize = this.getMaxSplitterSize();

            if (this._prevClientRect != null) {
                if (sp > maxSize) {
                    sp = maxSize;
                }
            }

            if (this.getHorizontal()) {
                ExpressCraft.Helper.exchangeClass$1(this.panel1, "splitvertical", "splithorizontal");
                ExpressCraft.Helper.exchangeClass$1(this.panel2, "splitvertical", "splithorizontal");
                ExpressCraft.Helper.exchangeClass$1(this.splitter, "splitvertical", "splitvertical");

                this.panel1.setWidth("");
                this.splitter.setWidth("");
                this.panel2.setWidth("");

                if (this.fixedSplitterPostion !== ExpressCraft.FixedSplitterPosition.Panel2) {
                    this.splitter.setLocation(new ExpressCraft.Vector2.$ctor1(0, sp));

                    this.panel1.setHeight(sp);
                    this.panel2.setLocation(new ExpressCraft.Vector2.$ctor1(0, ((sp + 12) | 0)));
                    this.panel2.setHeight("calc(100% - " + (((sp + 12) | 0)) + "px)");
                    ;
                } else {
                    this.splitter.setLocation(new ExpressCraft.Vector2.$ctor1(0, "calc(100% - " + sp + "px)"));

                    this.panel1.setHeight("calc(100% - " + sp + "px)");

                    this.panel2.setHeight(sp);
                    this.panel2.setLocation(new ExpressCraft.Vector2.$ctor1(0, "calc(100% - " + sp + 12 + "px)"));
                }
            } else {
                ExpressCraft.Helper.exchangeClass$1(this.panel1, "splithorizontal", "splitvertical");
                ExpressCraft.Helper.exchangeClass$1(this.panel2, "splithorizontal", "splitvertical");
                ExpressCraft.Helper.exchangeClass$1(this.splitter, "splitterhorizontal", "splittervertical");

                this.panel1.setHeight("");
                this.splitter.setHeight("");
                this.panel2.setHeight("");

                if (this.fixedSplitterPostion !== ExpressCraft.FixedSplitterPosition.Panel2) {
                    this.splitter.setLocation(new ExpressCraft.Vector2.$ctor1(sp, 0));

                    this.panel1.setWidth(sp);

                    this.panel2.setWidth("calc(100% - " + (((sp + 12) | 0)) + "px)");
                    this.panel2.setLocation(new ExpressCraft.Vector2.$ctor1(((sp + 12) | 0), 0));
                } else {
                    this.splitter.setLocation(new ExpressCraft.Vector2.$ctor1("calc(100% - " + sp + "px)", 0));

                    this.panel1.setWidth("calc(100% - " + sp + "px)");

                    this.panel2.setWidth(sp);
                    this.panel2.setLocation(new ExpressCraft.Vector2.$ctor1("calc(100% - " + sp + 12 + "px)", 0));
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.SplitControlContainer", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.SplitControlContainer, {
        f1: function (ev) {
            if (!this.splitterResizable) {
                return;
            }
            this.isMouseDown = true;
            this._mouseDownVector = ExpressCraft.Helper.getClientMouseLocation(ev).$clone();
            var maxSize = this.getMaxSplitterSize();
            this._startingSplitterPos = this._splitterPosition > maxSize ? maxSize : this._splitterPosition;
            ev.stopImmediatePropagation();
        },
        f2: function (ev) {
            if (this.linkedForm != null) {
                if (!this.linkedForm.isVisible()) {
                    return;
                }
            }
            var clientRec = this.content.getBoundingClientRect();

            if (this._prevClientRect == null) {
                this._prevClientRect = clientRec;
            }

            if (this.fixedSplitterPostion === ExpressCraft.FixedSplitterPosition.None) {
                var V1 = 0;
                var V2 = 0;
                var dirty = false;

                if (this.getHorizontal()) {
                    if (clientRec.height !== this._prevClientRect.height) {
                        V1 = clientRec.height;
                        V2 = this._prevClientRect.height;
                        dirty = true;
                    }
                } else {
                    if (clientRec.width !== this._prevClientRect.width) {
                        V1 = clientRec.width;
                        V2 = this._prevClientRect.width;
                        dirty = true;
                    }
                }
                if (dirty) {
                    this.setSplitterPosition(V1 === 0 || V2 === 0 ? 0 : Bridge.Int.clip32(this.getSplitterPosition() * (V1 / V2)));
                }
            }

            this._prevClientRect = clientRec;

            this.renderControls();

            this.resizeChildren();
        },
        f3: function (ev) {
            if (this.isMouseDown) {
                this._currentMouseDownVector = ExpressCraft.Helper.getClientMouseLocation(ev).$clone();
                var x;
                var m = this.horizontal ? (((this._mouseDownVector.getYi() - this._currentMouseDownVector.getYi()) | 0)) : (((this._mouseDownVector.getXi() - this._currentMouseDownVector.getXi()) | 0));

                var y = this.getMaxSplitterSize();
                if (((x = this.fixedSplitterPostion === ExpressCraft.FixedSplitterPosition.Panel2 ? ((this._startingSplitterPos + m) | 0) : ((this._startingSplitterPos - m) | 0))) > y) {
                    x = y;
                }
                this.setSplitterPosition(x);
                this._currentMouseDownVector = this._mouseDownVector.$clone();

                this.resizeChildren();
            }
        },
        f4: function (ev) {
            this.isMouseDown = false;
            this.renderControls();
        }
    });

    Bridge.define("ExpressCraft.TabControl", {
        inherits: [ExpressCraft.Control],
        showClosedButton: false,
        selectedindex: 0,
        config: {
            properties: {
                TabPages: null
            },
            init: function () {
                this.TabPages = new (System.Collections.Generic.List$1(ExpressCraft.TabControlPage))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "tabcontrol");
            this.content.oncontextmenu = $asm.$.ExpressCraft.TabControl.f1;
        },
        getShowClosedButton: function () {
            return this.showClosedButton;
        },
        setShowClosedButton: function (value) {
            if (value !== this.showClosedButton) {
                this.showClosedButton = value;
                this.resizeTabHeaders();
            }
        },
        getSelectedIndex: function () {
            return this.selectedindex;
        },
        setSelectedIndex: function (value) {
            if (value < 0) {
                value = 0;
            }
            this.selectedindex = value;
            if (this.getTabPages() != null && this.getTabPages().getCount() > 0) {
                for (var i = 0; i < this.getTabPages().getCount(); i = (i + 1) | 0) {
                    var page = { v : this.getTabPages().getItem(i) };
                    this.tabControlActiveStyleChange(i, page);
                    this.getTabPages().setItem(i, page.v);
                }
            }
        },
        addPages: function (Pages) {
            if (Pages === void 0) { Pages = []; }
            this.getTabPages().addRange(Pages);
            if (this.getHasRendered()) {
                this.resizeTabHeaders();
            }
        },
        tabControlActiveStyleChange: function (i, page) {
            var Isselected = i === this.selectedindex;

            var state = Isselected ? "active" : "hidden";
            if (page.v.tabPageHeader != null) {
                page.v.tabPageHeader.classList.remove("tabcontrolpageheader-hidden");
                page.v.tabPageHeader.classList.remove("tabcontrolpageheader-active");

                page.v.tabPageHeader.classList.add(System.String.concat("tabcontrolpageheader-", state));
            } else {
                page.v.tabPageHeader = ExpressCraft.Control.div$1(System.String.concat("tabcontrolpageheader tabcontrolpageheader-", state));
            }
            page.v.tabPageHeader.setAttribute("i", i.toString());
            if (this.showClosedButton) {
                if (page.v.tabPageHeaderClose == null) {
                    page.v.tabPageHeaderClose = ExpressCraft.Control.div$1("tabcontrolpageheader-closebutton");
                    page.v.tabPageHeaderClose.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f2);
                    page.v.tabPageHeader.appendChild(page.v.tabPageHeaderClose);
                }
            } else {
                if (page.v.tabPageHeaderClose != null) {
                    page.v.tabPageHeader.removeChild(page.v.tabPageHeaderClose);
                }
            }

            page.v.content.style.visibility = Isselected ? "inherit" : "collapse";
        },
        resizeTabHeaders: function () {
            var $t;
            if (this.getTabPages() != null && this.getTabPages().getCount() > 0) {
                var width = 2;

                for (var i = 0; i < this.getTabPages().getCount(); i = (i + 1) | 0) {
                    var page = { v : this.getTabPages().getItem(i) };

                    page.v.render();

                    if (page.v.tabPageHeader == null) {
                        this.tabControlActiveStyleChange(i, page);
                        if (Bridge.Browser.isAndroid || Bridge.Browser.iOS) {
                            page.v.tabPageHeader.ontouchstart = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f3);
                        } else {
                            page.v.tabPageHeader.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f3);
                        }

                        ExpressCraft.Helper.appendChildren$1(this.content, [page.v.content, page.v.tabPageHeader]);
                    }
                    page.v.tabPageHeader.setAttribute("i", i.toString());

                    var inwidth = 24;

                    if (!System.String.isNullOrEmpty(page.v.getCaption())) {
                        inwidth = (inwidth + Bridge.Int.clip32(ExpressCraft.Control.getTextWidth(page.v.getCaption(), ExpressCraft.Settings.defaultFont))) | 0;
                    }

                    if (this.showClosedButton) {
                        inwidth = (inwidth + 19) | 0;
                    }
                    var span = null;
                    $t = Bridge.getEnumerator(page.v.tabPageHeader.children);
                    while ($t.moveNext()) {
                        var item = $t.getCurrent();
                        if (Bridge.is(item, HTMLSpanElement)) {
                            ((span = item)).innerHTML = page.v.getCaption();
                            break;
                        }
                    }
                    if (span == null) {
                        page.v.tabPageHeader.appendChild(Bridge.merge(document.createElement('span'), {
                            innerHTML: page.v.getCaption()
                        } ));
                    }

                    page.v.tabPageHeader.style.left = ExpressCraft.Helper.toPx(width);
                    page.v.tabPageHeader.style.width = ExpressCraft.Helper.toPx(inwidth);

                    width = (width + (((inwidth + 2) | 0))) | 0;

                    this.getTabPages().setItem(i, page.v);
                }
            }
        },
        render: function () {
            this.setHasRendered(true);
            this.resizeTabHeaders();
        }
    });

    Bridge.ns("ExpressCraft.TabControl", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.TabControl, {
        f1: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        },
        f2: function (ev) {
            var index = parseInt(ev.currentTarget.parentElement.getAttribute("i"));
            var cpage = this.getTabPages().getItem(index);
            if (cpage.content != null) {
                ExpressCraft.Helper.empty(cpage.content);
                ExpressCraft.Helper.delete(cpage.content);
            }
            if (cpage.tabPageHeader != null) {
                ExpressCraft.Helper.empty(cpage.tabPageHeader);
                ExpressCraft.Helper.delete(cpage.tabPageHeader);
            }
            this.getTabPages().remove(cpage);
            if (index > ((this.getTabPages().getCount() - 1) | 0)) {
                index = (this.getTabPages().getCount() - 1) | 0;
            }

            ev.stopPropagation();

            this.setSelectedIndex(index);

            this.resizeTabHeaders();
        },
        f3: function (ev) {
            this.setSelectedIndex(parseInt(ev.currentTarget.getAttribute("i")));
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.TabControlPage", {
        inherits: [ExpressCraft.Control],
        index: 0,
        tabPageHeader: null,
        tabPageHeaderClose: null,
        config: {
            properties: {
                Caption: null
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "tabcontrolpage");

        }
    });

    Bridge.define("ExpressCraft.ToolTipControl", {
        inherits: [ExpressCraft.Control],
        visible: false,
        _toolTip$1: null,
        ctor: function (toolTip) {
            this.$initialize();
            ExpressCraft.Control.$ctor5.call(this, "tool-tip");
            this._toolTip$1 = toolTip;
        },
        show: function (ev) {
            ExpressCraft.Helper.empty(this.content);

            if (this._toolTip$1 != null) {
                if (!ExpressCraft.Helper.isEmpty(this._toolTip$1.heading)) {
                    this.content.appendChild(Bridge.merge(document.createElement('p'), {
                        className: "tool-tip-heading",
                        innerHTML: ExpressCraft.Helper.htmlEscape$1(this._toolTip$1.heading)
                    } ));
                }
                if (!ExpressCraft.Helper.isEmpty(this._toolTip$1.description)) {
                    this.content.appendChild(Bridge.merge(document.createElement('p'), {
                        className: "tool-tip-body",
                        innerHTML: ExpressCraft.Helper.htmlEscape$1(this._toolTip$1.description)
                    } ));
                }
            }
            var mouse = ExpressCraft.Helper.getClientMouseLocation(ev).$clone();

            this.setLocation(new ExpressCraft.Vector2.$ctor1(mouse.x, ((ExpressCraft.Helper.toInt(mouse.y) + 22) | 0)));

            if (!this.visible) {
                this.visible = true;
                ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles + 1) | 0;
                this.content.style.zIndex = (((ExpressCraft.ContextMenu.totalContextHandles + ExpressCraft.Settings.contextMenuStartingZIndex) | 0)).toString();
                document.body.appendChild(ExpressCraft.Control.op_Implicit(this));
            }
        },
        close: function () {
            if (this.visible) {
                if (this.content != null) {
                    $(this.content).fadeOut();
                }
                this.visible = false;
                ExpressCraft.ContextMenu.totalContextHandles = (ExpressCraft.ContextMenu.totalContextHandles - 1) | 0;
            }
        }
    });

    Bridge.define("ExpressCraft.ColorInput", {
        inherits: [ExpressCraft.TextInput],
        ctor: function () {
            this.$initialize();
            ExpressCraft.TextInput.ctor.call(this, "color");

        }
    });

    Bridge.define("ExpressCraft.ConsoleForm", {
        inherits: [ExpressCraft.Form],
        statics: {
            consoleVisible: false,
            _consoleForm: null,
            prevWindowState: 0,
            firstLoad: true,
            config: {
                init: function () {
                    this.prevLocation = new ExpressCraft.Vector2();
                    this.prevSize = ExpressCraft.Settings.consoleDefaultSize.$clone() || new ExpressCraft.Vector2();
                }
            },
            checkConsoleState: function () {
                if (!ExpressCraft.ConsoleForm.consoleVisible) {
                    ExpressCraft.ConsoleForm._consoleForm = new ExpressCraft.ConsoleForm();
                    ExpressCraft.ConsoleForm._consoleForm.show(null, true);
                }
            },
            log: function (source, logType) {
                if (logType === void 0) { logType = 0; }
                ExpressCraft.ConsoleForm.checkConsoleState();
                ExpressCraft.ConsoleForm._consoleForm.internalLog(source, logType);
            },
            clear: function () {
                ExpressCraft.ConsoleForm.checkConsoleState();
                ExpressCraft.ConsoleForm._consoleForm.internalClear();
            }
        },
        logContent: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.logContent = ExpressCraft.Control.div$1("console-body");
            this.getBody().appendChild(this.logContent);
            this.getBody().style.background = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.getBlack().$clone());
            this.getBody().style.overflowY = "scroll";

            this.setText(System.String.concat(document.title, " - Console"));
            if (ExpressCraft.ConsoleForm.firstLoad) {
                this.startPosition = ExpressCraft.FormStartPosition.Center;
                this.setSize(ExpressCraft.ConsoleForm.prevSize.$clone());
            } else {
                this.startPosition = ExpressCraft.FormStartPosition.Manual;
                this.setLocation(ExpressCraft.ConsoleForm.prevLocation.$clone());

                if (ExpressCraft.ConsoleForm.prevWindowState === ExpressCraft.WindowState.Maximized) {
                    ExpressCraft.ConsoleForm.prevSize = ExpressCraft.Settings.consoleDefaultSize.$clone();
                }

                this.setSize(ExpressCraft.ConsoleForm.prevSize.$clone());

                if (ExpressCraft.ConsoleForm.prevWindowState === ExpressCraft.WindowState.Maximized) {
                    this.setWindowState(ExpressCraft.ConsoleForm.prevWindowState);
                }
            }


        },
        internalClear: function () {
            ExpressCraft.Helper.empty(this.logContent);
        },
        internalLog: function (source, logType) {
            if (logType === void 0) { logType = 0; }
            var para = Bridge.merge(document.createElement('p'), {
                className: "console-para"
            } );
            switch (logType) {
                case ExpressCraft.ConsoleLogType.Debug: 
                    para.style.color = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.getForestGreen().$clone());
                    break;
                case ExpressCraft.ConsoleLogType.Error: 
                    para.style.color = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.getRed().$clone());
                    break;
            }

            para.innerHTML = source;
            this.logContent.appendChild(para);
            if (this.logContent.children.length > 1000) {
                this.logContent.removeChild(this.logContent.children[0]);
            }
            para.scrollIntoView(false);
        },
        onGotFocus: function () {
            if (this.content != null) {
                this.getStyle().opacity = "1";
            }
            ExpressCraft.Form.prototype.onGotFocus.call(this);
        },
        onLostFocus: function () {
            if (this.content != null) {
                this.getStyle().opacity = "0.5";
            }
            ExpressCraft.Form.prototype.onLostFocus.call(this);
        },
        onShowed: function () {
            ExpressCraft.Form.prototype.onShowed.call(this);
            ExpressCraft.ConsoleForm.consoleVisible = true;
            ExpressCraft.ConsoleForm.firstLoad = false;
        },
        onClosing: function () {
            ExpressCraft.Form.prototype.onClosing.call(this);

            ExpressCraft.ConsoleForm.prevSize = this.getSize().$clone();
            ExpressCraft.ConsoleForm.prevLocation = this.getLocation().$clone();
            ExpressCraft.ConsoleForm.prevWindowState = this.getWindowstate();
        },
        onClosed: function () {
            ExpressCraft.Form.prototype.onClosed.call(this);
            ExpressCraft.ConsoleForm.consoleVisible = false;
        }
    });

    Bridge.define("ExpressCraft.DialogForm", {
        inherits: [ExpressCraft.Form],
        _buttonCollection: null,
        buttonSection: null,
        ctor: function (text) {
            if (text === void 0) { text = ""; }

            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.setText(text);
            this.getBody().style.backgroundColor = "white";

            this.buttonSection = ExpressCraft.Control.div$1("dialogbuttonsection");
        },
        onShowing: function () {
            this.getBody().appendChild(this.buttonSection);
            ExpressCraft.Form.prototype.onShowing.call(this);
        }
    });

    Bridge.define("ExpressCraft.Network.NetworkProgressForm", {
        inherits: [ExpressCraft.Form],
        progressControl: null,
        buttonCancel: null,
        ctor: function (_text) {
            if (_text === void 0) { _text = "Loading..."; }

            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.setText(_text);
            this.setWidth(400);
            this.setHeight(200);

            this.progressControl = new ExpressCraft.ProgressControl();
            ExpressCraft.Helper.setBounds(this.progressControl, 50, 50, "calc(100% - 100px)", "23px");

            this.buttonCancel = Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                setText: "Cancel"
            } );
            ExpressCraft.Helper.setLocation$1(this.buttonCancel, "calc(100% - 78px)", "calc(100% - 26px)");
            this.buttonCancel.content.tabIndex = 0;

            ExpressCraft.Helper.appendChildren$2(this.getBody(), [this.buttonCancel, this.progressControl]);

            this.allowSizeChange = false;
        }
    });

    Bridge.define("ExpressCraft.PDFPreviewForm", {
        inherits: [ExpressCraft.Form],
        source: null,
        pDFSourceType: 0,
        pdfViewer: null,
        ctor: function (source, pdfSourceType) {
            if (pdfSourceType === void 0) { pdfSourceType = 0; }

            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.source = source;
            this.pDFSourceType = pdfSourceType;

            this.pdfViewer = document.createElement(Bridge.Browser.isIE ? "iframe" : pdfSourceType === ExpressCraft.PdfSourceType.Url ? "embed" : "object");
            this.pdfViewer.className = "control";

            ExpressCraft.Helper.setBounds$1(this.pdfViewer, 0, 0, "100%", "100%");
            this.pdfViewer.setAttribute("alt", "pdf");
            this.pdfViewer.setAttribute("type", "application/pdf");
            //object 		

            this.getBody().appendChild(this.pdfViewer);
        },
        onShowing: function () {
            ExpressCraft.Form.prototype.onShowing.call(this);
            //data
            if (this.pDFSourceType === ExpressCraft.PdfSourceType.Url) {
                this.pdfViewer.setAttribute("Src", this.source);
            } else {
                this.pdfViewer.setAttribute("data", ExpressCraft.Control.getPdfString(this.source));
            }
        }
    });

    Bridge.define("ExpressCraft.SimpleDialogButton", {
        inherits: [ExpressCraft.SimpleButton],
        ctor: function (parentForm, dialogResult) {
            if (dialogResult === void 0) { dialogResult = 0; }

            this.$initialize();
            ExpressCraft.SimpleButton.ctor.call(this);
            this.parentForm = parentForm;
            this.dialogResult = dialogResult;

            ExpressCraft.Helper.setSize(this, 75, 23);
        }
    });

    Bridge.define("ExpressCraft.DataRowEditForm", {
        inherits: [ExpressCraft.DialogForm],
        liveData: false,
        gridView: null,
        dataRow: null,
        panel: null,
        prevData: null,
        ctor: function (_dataRow, _gridView, _liveData) {
            if (_liveData === void 0) { _liveData = true; }

            this.$initialize();
            ExpressCraft.DialogForm.ctor.call(this);
            this.prevData = System.Array.init(_dataRow.parentTable.getColumnCount(), null, Object);

            for (var i = 0; i < _dataRow.parentTable.getColumnCount(); i = (i + 1) | 0) {
                this.prevData[i] = _dataRow.getItem(i);
            }

            this.dataRow = _dataRow;
            this.gridView = _gridView;
            this.liveData = _liveData;

            this.setText("Row Edit Form");
            this.setWidth("400px"); // 25px - 25px 350px width;
            this.setHeight("600px");
            this.getBody().style.overflowY = "auto";

            this.panel = ExpressCraft.Control.div();
            this.panel.style.overflowY = "auto";
            ExpressCraft.Helper.setBounds$1(this.panel, "0", "0", "100%", "calc(100% - 60px)");
            this.getBody().style.backgroundColor = "white";

            this._buttonCollection = Bridge.fn.bind(this, function (_o3) {
                    _o3.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                        setText: "Cancel",
                        itemClick: Bridge.fn.bind(this, function (ev) {
                            for (var i1 = 0; i1 < this.dataRow.parentTable.getColumnCount(); i1 = (i1 + 1) | 0) {
                                _dataRow.setItem(i1, this.prevData[i1]);
                            }

                            this.gridView.renderGrid();
                        })
                    } ));
                    _o3.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                        setText: "OK"
                    } ));
                    return _o3;
                })(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");

            ExpressCraft.Helper.appendChildrenTabIndex(this.buttonSection, this._buttonCollection.toArray());

            this.getBody().appendChild(this.panel);

            this.allowSizeChange = false;
        },
        onClosed: function () {
            this.gridView.getDataSource().endDataUpdate();

            ExpressCraft.DialogForm.prototype.onClosed.call(this);
        },
        onShowed: function () {
            ExpressCraft.DialogForm.prototype.onShowed.call(this);

            if (this.dataRow == null) {
                this.dialogResult = ExpressCraft.DialogResultEnum.Cancel;
                this.close();
            } else {
                this.gridView.getDataSource().beginDataUpdate();

                this.generateForm();
            }
        },
        generateForm: function () {
            var $t;
            ExpressCraft.Helper.empty(this.panel);
            var length = this.gridView.columnCount();

            var col = 0;
            var height = 25;

            var defaultHeight = 54;
            var defaultHeight2X = (defaultHeight * 3) | 0;
            var incrementHeight = defaultHeight;

            var eachWidth = 113;

            for (var i = 0; i < length; i = (i + 1) | 0) {
                $t = (function () {
                    incrementHeight = defaultHeight;
                    var grCol = this.gridView.getColumn(i);

                    if (!grCol.allowEdit) {
                        return {jump:1};
                    }

                    var dtCol = grCol.column;

                    var dtIndex = grCol.getDataColumnIndex();

                    if (Bridge.referenceEquals(grCol.column.fieldName.toLowerCase(), "cntr")) {
                        grCol.readOnly = true;
                    }

                    switch (dtCol.dataType) {
                        case ExpressCraft.DataType.DateTime: 
                            var lbldate = ExpressCraft.Control.label(grCol.caption, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), height);
                            var inputDate = new ExpressCraft.TextInput("date");
                            ExpressCraft.Helper.setBounds(inputDate, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), ((((height + 16) | 0) + 3) | 0), eachWidth, 24);
                            inputDate.setDate(System.Convert.toString(this.dataRow.getItem(dtIndex)));
                            inputDate.setReadonly(grCol.readOnly);
                            if (!grCol.readOnly) {
                                inputDate.onTextChanged = Bridge.fn.bind(this, function (ev) {
                                    this.dataRow.setItem(dtIndex, inputDate.getDate());
                                    if (this.liveData) {
                                        this.gridView.renderGrid();
                                    }
                                });
                            }
                            ExpressCraft.Helper.appendChildren$1(this.panel, [lbldate, ExpressCraft.Control.op_Implicit(inputDate)]);
                            break;
                        case ExpressCraft.DataType.Integer: 
                        case ExpressCraft.DataType.Long: 
                        case ExpressCraft.DataType.Float: 
                        case ExpressCraft.DataType.Double: 
                        case ExpressCraft.DataType.Decimal: 
                        case ExpressCraft.DataType.Bool: 
                        case ExpressCraft.DataType.Byte: 
                        case ExpressCraft.DataType.Short: 
                            var lblnmb = ExpressCraft.Control.label(grCol.caption, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), height);
                            var inputNum;
                            if (Bridge.is(grCol.cellDisplay, ExpressCraft.GridViewCellDisplayCheckBox)) {
                                inputNum = new ExpressCraft.TextInput("checkbox");
                                ExpressCraft.Helper.setChecked$1(inputNum, this.dataRow.getItem(dtIndex));
                            } else {
                                inputNum = new ExpressCraft.TextInput("number");
                                inputNum.setText(System.Convert.toString(this.dataRow.getItem(dtIndex)));
                            }
                            ExpressCraft.Helper.setBounds(inputNum, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), ((((height + 16) | 0) + 3) | 0), eachWidth, 24);
                            inputNum.setReadonly(grCol.readOnly);
                            if (!grCol.readOnly) {
                                inputNum.onTextChanged = Bridge.fn.bind(this, function (ev) {
                                    if (inputNum.type === "checkbox") {
                                        this.dataRow.setItem(dtIndex, ExpressCraft.Helper.isTrue(inputNum.getText()) === 1);
                                    } else {
                                        this.dataRow.setItem(dtIndex, inputNum.getText());
                                    }
                                    if (this.liveData) {
                                        this.gridView.renderGrid();
                                    }
                                });
                            }
                            ExpressCraft.Helper.appendChildren$1(this.panel, [lblnmb, ExpressCraft.Control.op_Implicit(inputNum)]);
                            break;
                        default: 
                        case ExpressCraft.DataType.Object: 
                        case ExpressCraft.DataType.String: 
                            var lblstr = ExpressCraft.Control.label(grCol.caption, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), height);
                            var inputstr = new ExpressCraft.TextInput("text");
                            ExpressCraft.Helper.setBounds(inputstr, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), ((((height + 16) | 0) + 3) | 0), eachWidth, 24);
                            inputstr.setText(System.Convert.toString(this.dataRow.getItem(dtIndex)));
                            inputstr.setReadonly(grCol.readOnly);
                            if (!grCol.readOnly) {
                                inputstr.onTextChanged = Bridge.fn.bind(this, function (ev) {
                                    this.dataRow.setItem(dtIndex, inputstr.getText());

                                    if (this.liveData) {
                                        this.gridView.renderGrid();
                                    }
                                });
                            }
                            ExpressCraft.Helper.appendChildren$1(this.panel, [lblstr, ExpressCraft.Control.op_Implicit(inputstr)]);
                            //if(obj.Length > 100)
                            //{
                            //	incrementHeight = defaultHeight2X;
                            //	col = 2;
                            //}
                            //else
                            //{
                            //}
                            break;
                    }
                    if (col === 2) {
                        height = (height + (((incrementHeight + 3) | 0))) | 0;
                        col = 0;
                    } else {
                        col = (col + 1) | 0;
                    }

                }).call(this) || {};
                if($t.jump == 1) continue;
            }
            // Add Accept Changes
        }
    });

    Bridge.define("ExpressCraft.InputDialogBase", {
        inherits: [ExpressCraft.DialogForm],
        config: {
            properties: {
                QuestionSize: 0,
                Wrapper: null,
                QuestionDiv: null,
                AnswerDiv: null,
                ImageDiv: null
            }
        },
        ctor: function (title, width, question) {
            this.$initialize();
            ExpressCraft.DialogForm.ctor.call(this, title);
            this.setWidth(ExpressCraft.Helper.toPx(width));
            this.setWrapper(ExpressCraft.Control.div());
            this.setQuestionDiv(ExpressCraft.Control.div());
            this.setAnswerDiv(ExpressCraft.Control.div());
            this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.InputDialogBase.f1)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

            this.getWrapper().style.overflowY = "hidden";
            ExpressCraft.Helper.setBounds$1(this.getWrapper(), "0px", "0px", "100%", "calc(100% - 60px)");
            this.getQuestionDiv().style.position = "relative";
            this.getQuestionDiv().style.height = "auto";
            this.getQuestionDiv().style.marginLeft = "10px";
            this.getQuestionDiv().style.marginRight = "10px";
            this.getQuestionDiv().style.marginTop = "10px";
            this.getAnswerDiv().style.position = "relative";
            this.getAnswerDiv().style.height = "auto";
            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 170px)", "calc(100% - 35px)");
            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 85px)", "calc(100% - 35px)");

            var tb = new ExpressCraft.TextBlock(question, ((width - 25) | 0));
            tb.computeString();

            if (!tb.elelemtsOverMax) {
                width = (((Bridge.Int.clip32(tb.maxCalculatedWidth) + 65) | 0) + 37) | 0;
                if (width < ExpressCraft.Settings.messageFormMinimumWidthInPx) {
                    width = ExpressCraft.Settings.messageFormMinimumWidthInPx;
                }
            }
            if (tb.computedHeight > ExpressCraft.Settings.messageFormTextMaximumHeightInPx) {
                tb.computedHeight = ExpressCraft.Settings.messageFormTextMaximumHeightInPx;
            }
            if (tb.computedHeight < ExpressCraft.Settings.messageFormTextMinimumHeightInPx) {
                tb.computedHeight = ExpressCraft.Settings.messageFormTextMinimumHeightInPx;
            }

            this.getQuestionDiv().innerHTML = question;
            this.setQuestionSize(System.Convert.toInt32(tb.computedHeight));
        },
        create: function (height) {
            this.getWrapper().appendChild(this.getQuestionDiv());
            this.getWrapper().appendChild(document.createElement('br'));
            this.getWrapper().appendChild(this.getAnswerDiv());
            this.getBody().appendChild(this.getWrapper());

            ExpressCraft.Helper.appendChildrenTabIndex(this.buttonSection, this._buttonCollection.toArray());

            this.setHeight(ExpressCraft.Helper.toPx(height));
            this.allowSizeChange = false;
        }
    });

    Bridge.ns("ExpressCraft.InputDialogBase", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.InputDialogBase, {
        f1: function (_o1) {
            _o1.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                setText: "Accept"
            } ));
            _o1.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                setText: "Cancel"
            } ));
            return _o1;
        }
    });

    Bridge.define("ExpressCraft.MessageBoxForm", {
        inherits: [ExpressCraft.DialogForm],
        statics: {
            snd: null,
            beep: function () {
                if (!ExpressCraft.Settings.messageFormBeep) {
                    return;
                }
                if (ExpressCraft.MessageBoxForm.snd == null) {
                    ExpressCraft.MessageBoxForm.snd = new Audio(ExpressCraft.ResourceManager.getResourceString("beepSound"));
                }
                ExpressCraft.MessageBoxForm.snd.play();
            }
        },
        _buttons: 0,
        /**
         * Create a new Message Dialog
         *
         * @instance
         * @public
         * @this ExpressCraft.MessageBoxForm
         * @memberof ExpressCraft.MessageBoxForm
         * @param   {string}                           prompt    The text to be displayed in the message box
         * @param   {ExpressCraft.MessageBoxLayout}    ui        The UI settings to be applied to the form
         * @return  {void}
         */
        ctor: function (prompt, ui) {
            ExpressCraft.MessageBoxForm.$ctor2.call(this, prompt, ui, ExpressCraft.MessageBoxButtons.Auto, System.Enum.toString(ExpressCraft.MessageBoxLayout, ui));
        },
        /**
         * Create a new Message Dialog
         *
         * @instance
         * @public
         * @this ExpressCraft.MessageBoxForm
         * @memberof ExpressCraft.MessageBoxForm
         * @param   {string}                           prompt    The text to be displayed in the message box
         * @param   {ExpressCraft.MessageBoxLayout}    ui        The UI settings to be applied to the form
         * @param   {string}                           title     The title of the message box
         * @return  {void}
         */
        $ctor3: function (prompt, ui, title) {
            ExpressCraft.MessageBoxForm.$ctor2.call(this, prompt, ui, ExpressCraft.MessageBoxButtons.Auto, title);
        },
        /**
         * Create a new Message Dialog
         *
         * @instance
         * @public
         * @this ExpressCraft.MessageBoxForm
         * @memberof ExpressCraft.MessageBoxForm
         * @param   {string}                            prompt     The text to be displayed in the message box
         * @param   {ExpressCraft.MessageBoxLayout}     ui         The UI settings to be applied to the form
         * @param   {ExpressCraft.MessageBoxButtons}    buttons    The Type of button to be displayed with this message
         * @return  {void}
         */
        $ctor1: function (prompt, ui, buttons) {
            ExpressCraft.MessageBoxForm.$ctor2.call(this, prompt, ui, buttons, System.Enum.toString(ExpressCraft.MessageBoxLayout, ui));
        },
        /**
         * Create a new Message Dialog
         *
         * @instance
         * @public
         * @this ExpressCraft.MessageBoxForm
         * @memberof ExpressCraft.MessageBoxForm
         * @param   {string}                            prompt     The text to be displayed in the message box
         * @param   {ExpressCraft.MessageBoxLayout}     ui         The UI settings  to be applied to the form
         * @param   {ExpressCraft.MessageBoxButtons}    buttons    The Type of button to be displayed with this message
         * @param   {string}                            title      The title of the message box
         * @return  {void}
         */
        $ctor2: function (prompt, ui, buttons, title) {
            this.$initialize();
            ExpressCraft.DialogForm.ctor.call(this, title);
            var section = ExpressCraft.Control.div();
            var pic = ExpressCraft.Control.div$1("image32");
            var textContent = ExpressCraft.Control.div$1("messag-box-content");

            this._buttons = buttons;

            switch (ui) {
                case ExpressCraft.MessageBoxLayout.Exclamation: 
                    if (this._buttons === ExpressCraft.MessageBoxButtons.Auto) {
                        this._buttons = ExpressCraft.MessageBoxButtons.Ok;
                    }
                    pic.classList.add("imagewarning");
                    break;
                case ExpressCraft.MessageBoxLayout.Information: 
                    if (this._buttons === ExpressCraft.MessageBoxButtons.Auto) {
                        this._buttons = ExpressCraft.MessageBoxButtons.Ok;
                    }
                    pic.classList.add("imageinfo");
                    break;
                case ExpressCraft.MessageBoxLayout.Question: 
                    if (this._buttons === ExpressCraft.MessageBoxButtons.Auto) {
                        this._buttons = ExpressCraft.MessageBoxButtons.YesNo;
                    }
                    pic.classList.add("imageindex");
                    break;
                case ExpressCraft.MessageBoxLayout.Error: 
                    if (this._buttons === ExpressCraft.MessageBoxButtons.Auto) {
                        this._buttons = ExpressCraft.MessageBoxButtons.AbortIgnoreRetry;
                    }
                    pic.classList.add("imageerror");
                    break;
                default: 
                    throw new System.ArgumentOutOfRangeException("ui", null, null, ui);
            }

            switch (this._buttons) {
                case ExpressCraft.MessageBoxButtons.Ok: 
                    this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f1)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(50% - 37.5px)", "calc(100% - 35px)");
                    break;
                case ExpressCraft.MessageBoxButtons.YesNo: 
                    this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f2)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");
                    break;
                case ExpressCraft.MessageBoxButtons.YesNoCancel: 
                    this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f3)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(2), "calc(100% - 255px)", "calc(100% - 35px)");
                    break;
                case ExpressCraft.MessageBoxButtons.AbortIgnoreRetry: 
                    this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f4)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");
                    ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(2), "calc(100% - 255px)", "calc(100% - 35px)");
                    break;
                default: 
                    throw new System.ArgumentOutOfRangeException();
            }
            var tb = new ExpressCraft.TextBlock(prompt, 455);
            tb.computeString();

            var width = 480;
            if (!tb.elelemtsOverMax) {
                width = (((Bridge.Int.clip32(tb.maxCalculatedWidth) + 65) | 0) + 37) | 0;
                if (width < ExpressCraft.Settings.messageFormMinimumWidthInPx) {
                    width = ExpressCraft.Settings.messageFormMinimumWidthInPx;
                }
            }

            if (this._buttonCollection.getCount() > 2) {
                if (width < 320) {
                    width = 320;
                }
            }

            textContent.innerHTML = prompt;

            section.style.overflowY = "auto";
            section.style.height = "100%";
            section.style.maxHeight = ExpressCraft.Helper.toPx(ExpressCraft.Settings.messageFormTextMaximumHeightInPx);
            section.appendChild(textContent);
            section.style.top = "32px";
            section.style.width = "90%";

            ExpressCraft.Helper.appendChildren$1(this.getBody(), [pic, section]);

            if (tb.computedHeight > ExpressCraft.Settings.messageFormTextMaximumHeightInPx) {
                tb.computedHeight = ExpressCraft.Settings.messageFormTextMaximumHeightInPx;
            }
            if (tb.computedHeight < ExpressCraft.Settings.messageFormTextMinimumHeightInPx) {
                tb.computedHeight = ExpressCraft.Settings.messageFormTextMinimumHeightInPx;
            }

            ExpressCraft.Helper.appendChildrenTabIndex(this.buttonSection, this._buttonCollection.toArray());

            this.setHeight(System.Single.format(tb.computedHeight + 77 + 29 + 32, 'G') + "px");
            this.setWidth(ExpressCraft.Helper.toPx(width));
            this.allowSizeChange = false;
        },
        onShowed: function () {
            ExpressCraft.MessageBoxForm.beep();

            ExpressCraft.DialogForm.prototype.onShowed.call(this);
            this._buttonCollection.getItem(0).content.focus();
        }
    });

    Bridge.ns("ExpressCraft.MessageBoxForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.MessageBoxForm, {
        f1: function (_o4) {
            _o4.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                setText: "Ok"
            } ));
            return _o4;
        },
        f2: function (_o5) {
            _o5.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.No), {
                setText: "No"
            } ));
            _o5.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Yes), {
                setText: "Yes"
            } ));
            return _o5;
        },
        f3: function (_o6) {
            _o6.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                setText: "Cancel"
            } ));
            _o6.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.No), {
                setText: "No"
            } ));
            _o6.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Yes), {
                setText: "Yes"
            } ));
            return _o6;
        },
        f4: function (_o7) {
            _o7.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Abort), {
                setText: "Abort"
            } ));
            _o7.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Retry), {
                setText: "Retry"
            } ));
            _o7.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Ignore), {
                setText: "Ignore"
            } ));
            return _o7;
        }
    });

    Bridge.define("ExpressCraft.ThemeForm", {
        inherits: [ExpressCraft.DialogForm],
        statics: {
            _themeVisible: false,
            themeForm: null,
            showThemeForm: function () {
                if (!ExpressCraft.ThemeForm._themeVisible) {
                    ExpressCraft.ThemeForm.themeForm = new ExpressCraft.ThemeForm();
                    ExpressCraft.ThemeForm.themeForm.show(null, true);

                    ExpressCraft.ThemeForm._themeVisible = true;
                }
            }
        },
        currentTheme: null,
        prevTheme: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.DialogForm.ctor.call(this);
            this.prevTheme = ExpressCraft.Settings.getActiveTheme();
            this.currentTheme = Bridge.merge(Bridge.createInstance(ExpressCraft.Theme), JSON.parse(JSON.stringify(this.prevTheme)));

            ExpressCraft.Settings.setActiveTheme(this.currentTheme);

            this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f3)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");

            ExpressCraft.Helper.appendChildrenTabIndex(this.buttonSection, this._buttonCollection.toArray());

            var length = this.currentTheme.getColors().length;
            var y = 20;
            var x = 20;

            var Panel = ExpressCraft.Control.div();
            Panel.style.overflowY = "auto";
            ExpressCraft.Helper.setBounds$1(Panel, 0, 0, "100%", "calc(100% - 60px)");

            this.getBody().style.backgroundColor = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.getWhite().$clone());

            for (var i = 0; i < length; i = (i + 1) | 0) {
                Panel.appendChild(ExpressCraft.Control.op_Implicit(ExpressCraft.Helper.setBounds(Bridge.merge(new ExpressCraft.ColorInput(), {
                    setText: this.currentTheme.getColors()[i].toString(),
                    setToolTip: new ExpressCraft.ToolTip.$ctor1("This is a heading test.", "This is a description test."),
                    onTextChanged: Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f4)
                } ).setAttribute("i", i), x, y, 95, 20)));

                x = (x + 100) | 0;

                if (i % 2 !== 0) {
                    y = (y + 30) | 0;
                    x = 20;
                }
            }

            this.getBody().appendChild(Panel);

            this.setSize(new ExpressCraft.Vector2.$ctor1(250, 300));
            this.setText("Theme Form Editor");

            this.allowMoveChange = true;
            this.allowSizeChange = false;

            this.setShowClose(false);
            this.setShowMaximize(false);
            this.setShowMinimize(false);
        },
        onClosed: function () {
            ExpressCraft.DialogForm.prototype.onClosed.call(this);
            ExpressCraft.ThemeForm._themeVisible = false;
        },
        onGotFocus: function () {
            if (this.content != null) {
                this.getStyle().opacity = "1";
            }
            ExpressCraft.DialogForm.prototype.onGotFocus.call(this);
        },
        onLostFocus: function () {
            if (this.content != null) {
                this.getStyle().opacity = "0.5";
            }
            ExpressCraft.DialogForm.prototype.onLostFocus.call(this);
        }
    });

    Bridge.ns("ExpressCraft.ThemeForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ThemeForm, {
        f1: function (ev) {
            ExpressCraft.Settings.setActiveTheme(this.prevTheme);
            this.close();
        },
        f2: function (ev) {
            ExpressCraft.Settings.applyActiveTheme();
            this.close();
        },
        f3: function (_o2) {
            _o2.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                setText: "Cancel",
                itemClick: Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f1)
            } ));
            _o2.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                setText: "OK",
                itemClick: Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f2)
            } ));
            return _o2;
        },
        f4: function (tx) {
            var index = tx.getAttributei("i");
            this.currentTheme.getColors()[index] = tx.getText();

            ExpressCraft.Settings.applyActiveTheme();
        }
    });

    Bridge.define("ExpressCraft.InputDialogCheckbox", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: false
            }
        },
        /**
         * Creates a Question Dialog with a checkbox
             The Result Property contains a boolean value of the checkbox state
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogCheckbox
         * @memberof ExpressCraft.InputDialogCheckbox
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogCheckbox.$ctor1.call(this, title, question, 360);

        },
        /**
         * Creates a Question Dialog with a checkbox
             The Result Property contains a boolean value of the checkbox state
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogCheckbox
         * @memberof ExpressCraft.InputDialogCheckbox
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "checkbox");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "40px");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(input.checked);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 40) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogColour", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: null
            }
        },
        /**
         * Creates a Question Dialog with a colour selector
             The Result Property contains the HexCode for the selected colour
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogColour
         * @memberof ExpressCraft.InputDialogColour
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogColour.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with a colour selector
             The Result Property contains the HexCode for the selected colour
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogColour
         * @memberof ExpressCraft.InputDialogColour
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "color");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "40px");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(input.value);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 40) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogDate", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: null
            }
        },
        /**
         * Creates a Question Dialog with a Date Selector
             The Result Property contains the selected Date
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogDate
         * @memberof ExpressCraft.InputDialogDate
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogDate.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with a Date Selector
             The Result Property contains the selected Date
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogDate
         * @memberof ExpressCraft.InputDialogDate
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "date");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "auto");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(input.valueAsDate);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 25) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogDateTimeLocal", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: null
            },
            init: function () {
                this.Result = new Date(-864e13);
            }
        },
        /**
         * Creates a Question Dialog with a Date Selector
             The Result Property contains the selected Date
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogDateTimeLocal
         * @memberof ExpressCraft.InputDialogDateTimeLocal
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogDateTimeLocal.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with a Date Selector
             The Result Property contains the selected Date
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogDateTimeLocal
         * @memberof ExpressCraft.InputDialogDateTimeLocal
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            this.setResult(new Date());
            var input = ExpressCraft.Control.input("inputcontrol", "datetime-local");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "auto");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(Bridge.Date.parseExact(input.value, "yyyy-MM-ddTHH:mm", System.Globalization.CultureInfo.invariantCulture));
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 25) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogEmail", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: null
            }
        },
        /**
         * Creates a Question Dialog with an email input
             The Result Property contains the Entered email address
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogEmail
         * @memberof ExpressCraft.InputDialogEmail
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogEmail.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with an email input
             The Result Property contains the Entered email
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogEmail
         * @memberof ExpressCraft.InputDialogEmail
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "email");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "auto");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                //todo css for email input not showing up
                //todo could always validate email here
                this.setResult(input.value);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 25) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogMonth", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: null
            }
        },
        /**
         * Creates a Question Dialog with a Month input
             The Result Property contains the Entered Month
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogMonth
         * @memberof ExpressCraft.InputDialogMonth
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogMonth.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with a Month input
             The Result Property contains the Entered Month
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogMonth
         * @memberof ExpressCraft.InputDialogMonth
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "month");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "auto");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(input.valueAsDate);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 25) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogNumber", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: 0
            }
        },
        /**
         * Creates a Question Dialog with a Number Selector
             The Result Property contains the selected value
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogNumber
         * @memberof ExpressCraft.InputDialogNumber
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogNumber.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with a Number Selector
             The Result Property contains the selected value
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogNumber
         * @memberof ExpressCraft.InputDialogNumber
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "number");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "auto");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(input.valueAsNumber);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 25) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogText", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: null
            }
        },
        /**
         * Creates a Question Dialog with a Text input
             The Result Property contains the Entered Text
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogText
         * @memberof ExpressCraft.InputDialogText
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogText.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with a Text input
             The Result Property contains the Entered Text
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogText
         * @memberof ExpressCraft.InputDialogText
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "text");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "auto");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(input.value);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 25) | 0) + 25) | 0) + 78) | 0));
        }
    });

    Bridge.define("ExpressCraft.InputDialogWeek", {
        inherits: [ExpressCraft.InputDialogBase],
        config: {
            properties: {
                Result: null
            }
        },
        /**
         * Creates a Question Dialog with a Week input
             The Result Property contains the Entered week
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogWeek
         * @memberof ExpressCraft.InputDialogWeek
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @return  {void}
         */
        ctor: function (title, question) {
            ExpressCraft.InputDialogWeek.$ctor1.call(this, title, question, 360);
        },
        /**
         * Creates a Question Dialog with a Week input
             The Result Property contains the Entered Week
         *
         * @instance
         * @public
         * @this ExpressCraft.InputDialogWeek
         * @memberof ExpressCraft.InputDialogWeek
         * @param   {string}    title       The message that will appear in the title bar of the dialog
         * @param   {string}    question    The message that will appear about the input box on the dialog
         * @param   {number}    size        The width of this dialog. The default size is 360
         * @return  {void}
         */
        $ctor1: function (title, question, size) {
            this.$initialize();
            ExpressCraft.InputDialogBase.ctor.call(this, title, size, question);
            var input = ExpressCraft.Control.input("inputcontrol", "week");
            input.id = "DialogAnswerBox";
            ExpressCraft.Helper.setBounds$1(input, "10px", "0px", "90%", "auto");
            input.onchange = Bridge.fn.bind(this, function (ev) {
                this.setResult(input.value);
            });
            this.getAnswerDiv().appendChild(input);
            this.create(((((((this.getQuestionSize() + 25) | 0) + 25) | 0) + 78) | 0));
        }
    });
});
