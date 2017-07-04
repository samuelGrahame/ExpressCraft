/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta4
 */
Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.Control", {
        statics: {
            fields: {
                ControlClass: null,
                cva: null
            },
            ctors: {
                init: function () {
                    this.ControlClass = "control";
                }
            },
            methods: {
                BaseClass: function (add, ac) {
                    if (add === void 0) { add = true; }
                    if (ac === void 0) { ac = true; }
                    return ac ? (add ? " control" : ExpressCraft.Control.ControlClass) : "";
                },
                GetImageString: function (s) {
                    //url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==') no-repeat
                    return System.String.format("url('data:image/png;base64,{0}') no-repeat", s);
                },
                GetPdfString: function (s) {
                    //url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==') no-repeat
                    return System.String.format("data:application/pdf;base64,{0}", s);
                },
                GetImageStringURI: function (s, useResourceURL) {
                    if (useResourceURL === void 0) { useResourceURL = true; }
                    //"./Images/"
                    return System.String.format("url('{0}{1}') no-repeat", useResourceURL ? ExpressCraft.Settings.ResourceURL : "", s);
                },
                Div: function (ac) {
                    var $t;
                    if (ac === void 0) { ac = true; }
                    return ($t = document.createElement('div'), $t.className = ExpressCraft.Control.BaseClass(false, ac), $t);
                },
                Div$1: function (cn, ac) {
                    var $t;
                    if (ac === void 0) { ac = true; }
                    return ($t = document.createElement('div'), $t.className = System.String.concat(cn, ExpressCraft.Control.BaseClass(true, ac)), $t);
                },
                Span: function (ac) {
                    var $t;
                    if (ac === void 0) { ac = true; }
                    return ($t = document.createElement('span'), $t.className = ExpressCraft.Control.BaseClass(false, ac), $t);
                },
                Span$1: function (cn, ac) {
                    var $t;
                    if (ac === void 0) { ac = true; }
                    return ($t = document.createElement('span'), $t.className = System.String.concat(cn, ExpressCraft.Control.BaseClass(true, ac)), $t);
                },
                Label$2: function (Caption, X, Y, IsBold, IsTiny, ac) {
                    var $t;
                    if (IsBold === void 0) { IsBold = false; }
                    if (IsTiny === void 0) { IsTiny = false; }
                    if (ac === void 0) { ac = true; }
                    var lbl = ($t = document.createElement('span'), $t.className = ExpressCraft.Control.BaseClass(false, ac), $t);

                    lbl.innerHTML = ExpressCraft.Helper.HtmlEscape$1(Caption);
                    ExpressCraft.Helper.SetLocation(lbl, X, Y);
                    ExpressCraft.Control.SetBT(lbl, IsBold, IsTiny);

                    return lbl;
                },
                Label$4: function (Caption, X, Y, width, height, IsBold, IsTiny, classr, Alignment, Forecolor, ac) {
                    var $t;
                    if (IsBold === void 0) { IsBold = false; }
                    if (IsTiny === void 0) { IsTiny = false; }
                    if (classr === void 0) { classr = ""; }
                    if (Alignment === void 0) { Alignment = 3; }
                    if (Forecolor === void 0) { Forecolor = null; }
                    if (ac === void 0) { ac = true; }
                    var lbl = ($t = document.createElement('span'), $t.className = System.String.concat(classr, ExpressCraft.Control.BaseClass(!System.String.isNullOrWhiteSpace(classr), ac)), $t);

                    lbl.innerHTML = ExpressCraft.Helper.HtmlEscape$1(Caption);
                    ExpressCraft.Helper.SetBounds$1(lbl, X, Y, width, height);
                    if (Alignment !== "left") {
                        lbl.style.textAlign = Alignment;
                    }
                    ExpressCraft.Control.SetBT(lbl, IsBold, IsTiny);
                    if (Forecolor != null) {
                        lbl.style.color = Forecolor;
                    }

                    return lbl;
                },
                Label$3: function (Caption, X, Y, width, IsBold, IsTiny, classr, Alignment, Forecolor, ignoreHtml, ac) {
                    if (IsBold === void 0) { IsBold = false; }
                    if (IsTiny === void 0) { IsTiny = false; }
                    if (classr === void 0) { classr = ""; }
                    if (Alignment === void 0) { Alignment = 3; }
                    if (Forecolor === void 0) { Forecolor = null; }
                    if (ignoreHtml === void 0) { ignoreHtml = false; }
                    if (ac === void 0) { ac = true; }
                    var lbl = document.createElement('span');
                    lbl.className = System.String.concat(classr, ExpressCraft.Control.BaseClass(!System.String.isNullOrWhiteSpace(classr), ac));
                    if (!ignoreHtml) {
                        lbl.textContent = ExpressCraft.Helper.HtmlEscape$1(Caption);
                    } else {
                        lbl.textContent = Caption;
                    }
                    lbl.style.left = ExpressCraft.Helper.ToPx(Bridge.box(X, System.Single, System.Single.format, System.Single.getHashCode));
                    lbl.style.top = ExpressCraft.Helper.ToPx(Bridge.box(Y, System.Single, System.Single.format, System.Single.getHashCode));
                    lbl.style.width = ExpressCraft.Helper.ToPx(Bridge.box(width, System.Single, System.Single.format, System.Single.getHashCode));

                    if (Alignment !== "left") {
                        if (Alignment === "right") {
                            lbl.style.direction = "rtl";
                        } else {
                            lbl.style.textAlign = Alignment;
                        }
                    }
                    ExpressCraft.Control.SetBT(lbl, IsBold, IsTiny);
                    if (Forecolor != null) {
                        lbl.style.color = Forecolor;
                    }

                    return lbl;
                },
                Label$5: function (c, X, Y, width, height, IsBold, IsTiny, classr, ac) {
                    var $t;
                    if (IsBold === void 0) { IsBold = false; }
                    if (IsTiny === void 0) { IsTiny = false; }
                    if (classr === void 0) { classr = ""; }
                    if (ac === void 0) { ac = true; }
                    var lbl = ($t = document.createElement('span'), $t.className = System.String.concat(classr, ExpressCraft.Control.BaseClass(!System.String.isNullOrWhiteSpace(classr), ac)), $t);

                    lbl.innerHTML = ExpressCraft.Helper.HtmlEscape$1(c);
                    ExpressCraft.Helper.SetBounds$1(lbl, X, Y, width, height);
                    ExpressCraft.Control.SetBT(lbl, IsBold, IsTiny);

                    return lbl;
                },
                Label$1: function (c, X, Y, width, IsBold, IsTiny, classr, ac) {
                    var $t;
                    if (IsBold === void 0) { IsBold = false; }
                    if (IsTiny === void 0) { IsTiny = false; }
                    if (classr === void 0) { classr = ""; }
                    if (ac === void 0) { ac = true; }
                    var lbl = ($t = document.createElement('span'), $t.className = System.String.concat(classr, ExpressCraft.Control.BaseClass(!System.String.isNullOrWhiteSpace(classr), ac)), $t);

                    lbl.innerHTML = ExpressCraft.Helper.HtmlEscape$1(c);
                    ExpressCraft.Helper.SetLocation(lbl, X, Y);
                    lbl.style.width = ExpressCraft.Helper.ToPx(Bridge.box(width, System.Int32));
                    ExpressCraft.Control.SetBT(lbl, IsBold, IsTiny);

                    return lbl;
                },
                Label: function (c, X, Y, IsBold, IsTiny, ac) {
                    if (IsBold === void 0) { IsBold = false; }
                    if (IsTiny === void 0) { IsTiny = false; }
                    if (ac === void 0) { ac = true; }
                    return ExpressCraft.Control.Label$2(c, X, Y, IsBold, IsTiny, ac);
                },
                SetBT: function (lbl, IsBold, IsTiny) {
                    if (IsBold) {
                        lbl.style.fontWeight = "bold";
                    }
                    if (IsTiny) {
                        lbl.style.fontSize = "6.75pt";
                    }
                },
                ComboBox: function (cn, ct, ac) {
                    var $t;
                    if (ac === void 0) { ac = true; }
                    var combo = ($t = document.createElement('select'), $t.className = System.String.concat(cn, ExpressCraft.Control.BaseClass(true, ac)), $t);
                    if (ct === ExpressCraft.ComboBoxTypes.Default) {

                    }
                    return combo;
                },
                Button: function (cn, bt, ac) {
                    var $t;
                    if (ac === void 0) { ac = true; }
                    return ($t = document.createElement('button'), $t.className = System.String.concat(cn, ExpressCraft.Control.BaseClass(true, ac)), $t.type = bt, $t);
                },
                Input: function (cn, it, ac) {
                    if (ac === void 0) { ac = true; }
                    var input = document.createElement('input');
                    input.className = System.String.concat(cn, ExpressCraft.Control.BaseClass(!System.String.isNullOrWhiteSpace(cn), ac));
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
                GetTextMetrics: function (t, f) {
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
                GetTextWidth: function (t, f) {
                    return ExpressCraft.Control.GetTextMetrics(t, f).width;
                },
                op_Implicit: function (control) {
                    if (ExpressCraft.Settings.AutoRender && !control.HasRendered) {
                        control.Render();
                    }
                    return control.Content;
                }
            }
        },
        fields: {
            Content: null,
            _toolTip: null,
            _OnMouseEnterToolTip: null,
            _OnMouseLeaveToolTip: null,
            OnResize: null,
            OnLoaded: null,
            ContextMenu: null,
            LinkedForm: null
        },
        props: {
            Name: null,
            HasRendered: false,
            ToolTip: {
                get: function () {
                    return this._toolTip;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._toolTip, value)) {
                        if (value != null) {
                            if (value.AttachedControl != null && !Bridge.referenceEquals(value.AttachedControl, this)) {
                                value = null;
                            } else {
                                value.AttachedControl = this;
                            }
                        }
                        this._toolTip = value;

                        if (this._toolTip != null && (!ExpressCraft.Helper.IsEmpty(this._toolTip.Heading) || !ExpressCraft.Helper.IsEmpty(this._toolTip.Description))) {
                            this._OnMouseEnterToolTip = Bridge.fn.bind(this, $asm.$.ExpressCraft.Control.f1);
                            this._OnMouseLeaveToolTip = Bridge.fn.bind(this, $asm.$.ExpressCraft.Control.f2);

                            this.Content.addEventListener("mouseenter", this._OnMouseEnterToolTip);
                            this.Content.addEventListener("mouseleave", this._OnMouseLeaveToolTip);
                            return;
                        }

                        if (!Bridge.staticEquals(this._OnMouseEnterToolTip, null)) {
                            this.Content.removeEventListener("mouseenter", this._OnMouseEnterToolTip);
                            this._OnMouseEnterToolTip = null;
                        }
                        if (!Bridge.staticEquals(this._OnMouseLeaveToolTip, null)) {
                            this.Content.removeEventListener("mouseleave", this._OnMouseLeaveToolTip);
                            this._OnMouseLeaveToolTip = null;
                        }
                    }
                }
            },
            Style: {
                get: function () {
                    return this.Content.style;
                }
            },
            ClassList: {
                get: function () {
                    return this.Content.classList;
                }
            },
            Width: {
                get: function () {
                    return this.Content.style.width;
                },
                set: function (value) {
                    this.Content.style.width = ExpressCraft.Helper.ToHtmlValue(value);
                }
            },
            Height: {
                get: function () {
                    return this.Content.style.height;
                },
                set: function (value) {
                    this.Content.style.height = ExpressCraft.Helper.ToHtmlValue(value);
                }
            },
            Left: {
                get: function () {
                    return this.Content.style.left;
                },
                set: function (value) {
                    this.Content.style.left = ExpressCraft.Helper.ToHtmlValue(value);
                }
            },
            Top: {
                get: function () {
                    return this.Content.style.top;
                },
                set: function (value) {
                    this.Content.style.top = ExpressCraft.Helper.ToHtmlValue(value);
                }
            },
            Size: {
                get: function () {
                    return new ExpressCraft.Vector2.$ctor1(this.Width, this.Height);
                },
                set: function (value) {
                    this.Width = value.X;
                    this.Height = value.Y;
                }
            },
            Location: {
                get: function () {
                    return new ExpressCraft.Vector2.$ctor1(this.Left, this.Top);
                },
                set: function (value) {
                    this.Left = value.X;
                    this.Top = value.Y;
                }
            },
            Bounds: {
                get: function () {
                    return new ExpressCraft.Vector4.$ctor1(this.Left, this.Top, this.Width, this.Height);
                },
                set: function (value) {
                    this.Left = value.X;
                    this.Top = value.Y;
                    this.Width = value.Z;
                    this.Height = value.M;
                }
            }
        },
        ctors: {
            init: function () {
                this.HasRendered = false;
            },
            $ctor1: function (ac) {
                if (ac === void 0) { ac = true; }

                this.$initialize();
                this.Content = ExpressCraft.Control.Div(ac);
            },
            ctor: function (element) {
                this.$initialize();
                this.Content = element;
            },
            $ctor5: function (cn, ac) {
                if (ac === void 0) { ac = true; }

                this.$initialize();
                this.Content = ExpressCraft.Control.Div$1(cn, ac);
            },
            $ctor2: function (cn, bt, ac) {
                if (ac === void 0) { ac = true; }

                this.$initialize();
                this.Content = ExpressCraft.Control.Button(cn, bt, ac);
            },
            $ctor4: function (cn, ct, ac) {
                if (ac === void 0) { ac = true; }

                this.$initialize();
                this.Content = ExpressCraft.Control.ComboBox(cn, ct, ac);
            },
            $ctor3: function (cn, it, ac) {
                if (ac === void 0) { ac = true; }

                this.$initialize();
                this.Content = ExpressCraft.Control.Input(cn, it, ac);
            }
        },
        methods: {
            SetAttribute: function (name, value) {
                this.Content.setAttribute(name, ExpressCraft.Helper.ToStr(value));

                return this;
            },
            GetAttribute: function (name) {
                return this.Content.getAttribute(name);
            },
            GetAttributei: function (name) {
                return parseInt(this.Content.getAttribute(name));
            },
            GetAttributef: function (name) {
                return parseFloat(this.Content.getAttribute(name));
            },
            Render: function () {
                this.HasRendered = true;
            },
            ChangeState: function (s, sf) {
                if (sf === void 0) { sf = "disabled"; }
                if (s) {
                    this.Content.classList.remove(sf);
                } else {
                    this.Content.classList.add(sf);
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.Control", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.Control, {
        f1: function (ev) {
            if (!(Bridge.is(this, ExpressCraft.ToolTipControl))) {
                ExpressCraft.Form.ActiveToolTip = this._toolTip;
            }
        },
        f2: function (ev) {
            if (!(Bridge.is(this, ExpressCraft.ToolTipControl))) {
                ExpressCraft.Form.ActiveToolTip = null;
            }
        }
    });

    Bridge.define("ExpressCraft.AceModeTypes", {
        $kind: "enum",
        statics: {
            fields: {
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
        }
    });

    Bridge.define("ExpressCraft.AceThemeTypes", {
        $kind: "enum",
        statics: {
            fields: {
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
        }
    });

    Bridge.define("ExpressCraft.App", {
        main: function Main () {
            ExpressCraft.Settings.Setup();
        }
    });

    Bridge.define("ExpressCraft.Application", {
        statics: {
            fields: {
                MainForm: null,
                _applicationDefition: 0
            },
            props: {
                AplicationDefition: {
                    get: function () {
                        return ExpressCraft.Application._applicationDefition;
                    }
                }
            },
            ctors: {
                init: function () {
                    this._applicationDefition = ExpressCraft.ApplicationDefitnion.BridgeConsole;
                }
            },
            methods: {
                Close: function () {
                    if (ExpressCraft.Application.MainForm != null) {
                        ExpressCraft.Application.MainForm.Close();
                    }
                    window.close();
                    window.location.reload();
                },
                SetApplicationDefinition: function (applicationDefition) {
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
                Run: function (_Mainform) {
                    ExpressCraft.Application.MainForm = _Mainform;
                    ExpressCraft.Application.MainForm.ShowStartNewLevel();
                }
            }
        }
    });

    Bridge.define("ExpressCraft.ApplicationDefitnion", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                BrowserConsole: 1,
                BridgeConsole: 2,
                ExpressCraftConsole: 3
            }
        }
    });

    Bridge.define("ExpressCraft.Color", {
        $kind: "struct",
        statics: {
            fields: {
                Empty: null,
                StateKnownColorValid: 0,
                StateARGBValueValid: 0,
                StateValueMask: 0,
                StateNameValid: 0,
                NotDefinedValue: System.Int64(0),
                ARGBAlphaShift: 0,
                ARGBRedShift: 0,
                ARGBGreenShift: 0,
                ARGBBlueShift: 0,
                q: 0
            },
            props: {
                Transparent: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Transparent);
                    }
                },
                AliceBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.AliceBlue);
                    }
                },
                AntiqueWhite: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.AntiqueWhite);
                    }
                },
                Aqua: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Aqua);
                    }
                },
                Aquamarine: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Aquamarine);
                    }
                },
                Azure: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Azure);
                    }
                },
                Beige: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Beige);
                    }
                },
                Bisque: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Bisque);
                    }
                },
                Black: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Black);
                    }
                },
                BlanchedAlmond: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.BlanchedAlmond);
                    }
                },
                Blue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Blue);
                    }
                },
                BlueViolet: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.BlueViolet);
                    }
                },
                Brown: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Brown);
                    }
                },
                BurlyWood: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.BurlyWood);
                    }
                },
                CadetBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.CadetBlue);
                    }
                },
                Chartreuse: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Chartreuse);
                    }
                },
                Chocolate: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Chocolate);
                    }
                },
                Coral: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Coral);
                    }
                },
                CornflowerBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.CornflowerBlue);
                    }
                },
                Cornsilk: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Cornsilk);
                    }
                },
                Crimson: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Crimson);
                    }
                },
                Cyan: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Cyan);
                    }
                },
                DarkBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkBlue);
                    }
                },
                DarkCyan: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkCyan);
                    }
                },
                DarkGoldenrod: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkGoldenrod);
                    }
                },
                DarkGray: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkGray);
                    }
                },
                DarkGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkGreen);
                    }
                },
                DarkKhaki: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkKhaki);
                    }
                },
                DarkMagenta: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkMagenta);
                    }
                },
                DarkOliveGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkOliveGreen);
                    }
                },
                DarkOrange: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkOrange);
                    }
                },
                DarkOrchid: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkOrchid);
                    }
                },
                DarkRed: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkRed);
                    }
                },
                DarkSalmon: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSalmon);
                    }
                },
                DarkSeaGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSeaGreen);
                    }
                },
                DarkSlateBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSlateBlue);
                    }
                },
                DarkSlateGray: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkSlateGray);
                    }
                },
                DarkTurquoise: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkTurquoise);
                    }
                },
                DarkViolet: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DarkViolet);
                    }
                },
                DeepPink: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DeepPink);
                    }
                },
                DeepSkyBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DeepSkyBlue);
                    }
                },
                DimGray: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DimGray);
                    }
                },
                DodgerBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.DodgerBlue);
                    }
                },
                Firebrick: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Firebrick);
                    }
                },
                FloralWhite: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.FloralWhite);
                    }
                },
                ForestGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.ForestGreen);
                    }
                },
                Fuchsia: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Fuchsia);
                    }
                },
                Gainsboro: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Gainsboro);
                    }
                },
                GhostWhite: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.GhostWhite);
                    }
                },
                Gold: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Gold);
                    }
                },
                Goldenrod: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Goldenrod);
                    }
                },
                Gray: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Gray);
                    }
                },
                Green: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Green);
                    }
                },
                GreenYellow: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.GreenYellow);
                    }
                },
                Honeydew: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Honeydew);
                    }
                },
                HotPink: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.HotPink);
                    }
                },
                IndianRed: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.IndianRed);
                    }
                },
                Indigo: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Indigo);
                    }
                },
                Ivory: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Ivory);
                    }
                },
                Khaki: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Khaki);
                    }
                },
                Lavender: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Lavender);
                    }
                },
                LavenderBlush: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LavenderBlush);
                    }
                },
                LawnGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LawnGreen);
                    }
                },
                LemonChiffon: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LemonChiffon);
                    }
                },
                LightBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightBlue);
                    }
                },
                LightCoral: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightCoral);
                    }
                },
                LightCyan: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightCyan);
                    }
                },
                LightGoldenrodYellow: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightGoldenrodYellow);
                    }
                },
                LightGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightGreen);
                    }
                },
                LightGray: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightGray);
                    }
                },
                LightPink: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightPink);
                    }
                },
                LightSalmon: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSalmon);
                    }
                },
                LightSeaGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSeaGreen);
                    }
                },
                LightSkyBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSkyBlue);
                    }
                },
                LightSlateGray: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSlateGray);
                    }
                },
                LightSteelBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightSteelBlue);
                    }
                },
                LightYellow: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LightYellow);
                    }
                },
                Lime: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Lime);
                    }
                },
                LimeGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.LimeGreen);
                    }
                },
                Linen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Linen);
                    }
                },
                Magenta: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Magenta);
                    }
                },
                Maroon: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Maroon);
                    }
                },
                MediumAquamarine: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumAquamarine);
                    }
                },
                MediumBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumBlue);
                    }
                },
                MediumOrchid: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumOrchid);
                    }
                },
                MediumPurple: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumPurple);
                    }
                },
                MediumSeaGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumSeaGreen);
                    }
                },
                MediumSlateBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumSlateBlue);
                    }
                },
                MediumSpringGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumSpringGreen);
                    }
                },
                MediumTurquoise: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumTurquoise);
                    }
                },
                MediumVioletRed: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MediumVioletRed);
                    }
                },
                MidnightBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MidnightBlue);
                    }
                },
                MintCream: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MintCream);
                    }
                },
                MistyRose: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.MistyRose);
                    }
                },
                Moccasin: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Moccasin);
                    }
                },
                NavajoWhite: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.NavajoWhite);
                    }
                },
                Navy: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Navy);
                    }
                },
                OldLace: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.OldLace);
                    }
                },
                Olive: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Olive);
                    }
                },
                OliveDrab: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.OliveDrab);
                    }
                },
                Orange: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Orange);
                    }
                },
                OrangeRed: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.OrangeRed);
                    }
                },
                Orchid: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Orchid);
                    }
                },
                PaleGoldenrod: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleGoldenrod);
                    }
                },
                PaleGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleGreen);
                    }
                },
                PaleTurquoise: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleTurquoise);
                    }
                },
                PaleVioletRed: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PaleVioletRed);
                    }
                },
                PapayaWhip: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PapayaWhip);
                    }
                },
                PeachPuff: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PeachPuff);
                    }
                },
                Peru: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Peru);
                    }
                },
                Pink: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Pink);
                    }
                },
                Plum: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Plum);
                    }
                },
                PowderBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.PowderBlue);
                    }
                },
                Purple: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Purple);
                    }
                },
                Red: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Red);
                    }
                },
                RosyBrown: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.RosyBrown);
                    }
                },
                RoyalBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.RoyalBlue);
                    }
                },
                SaddleBrown: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SaddleBrown);
                    }
                },
                Salmon: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Salmon);
                    }
                },
                SandyBrown: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SandyBrown);
                    }
                },
                SeaGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SeaGreen);
                    }
                },
                SeaShell: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SeaShell);
                    }
                },
                Sienna: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Sienna);
                    }
                },
                Silver: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Silver);
                    }
                },
                SkyBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SkyBlue);
                    }
                },
                SlateBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SlateBlue);
                    }
                },
                SlateGray: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SlateGray);
                    }
                },
                Snow: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Snow);
                    }
                },
                SpringGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SpringGreen);
                    }
                },
                SteelBlue: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.SteelBlue);
                    }
                },
                Tan: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Tan);
                    }
                },
                Teal: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Teal);
                    }
                },
                Thistle: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Thistle);
                    }
                },
                Tomato: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Tomato);
                    }
                },
                Turquoise: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Turquoise);
                    }
                },
                Violet: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Violet);
                    }
                },
                Wheat: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Wheat);
                    }
                },
                White: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.White);
                    }
                },
                WhiteSmoke: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.WhiteSmoke);
                    }
                },
                Yellow: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.Yellow);
                    }
                },
                YellowGreen: {
                    get: function () {
                        return new ExpressCraft.Color.$ctor1(ExpressCraft.KnownColor.YellowGreen);
                    }
                }
            },
            ctors: {
                init: function () {
                    this.Empty = new ExpressCraft.Color();
                    this.ARGBAlphaShift = 24;
                    this.ARGBRedShift = 16;
                    this.ARGBGreenShift = 8;
                    this.ARGBBlueShift = 0;
                    this.q = 255.0;
                },
                ctor: function () {
                    ExpressCraft.Color.Empty = new ExpressCraft.Color.ctor();
                    ExpressCraft.Color.StateKnownColorValid = 1;
                    ExpressCraft.Color.StateARGBValueValid = 2;
                    ExpressCraft.Color.StateValueMask = ExpressCraft.Color.StateARGBValueValid;
                    ExpressCraft.Color.StateNameValid = 8;
                    ExpressCraft.Color.NotDefinedValue = System.Int64(0);
                }
            },
            methods: {
                CheckByte: function (value) {
                    if ((value < 0) || (value > 255)) {
                        throw new System.ArgumentException("InvalidEx2BoundArgument");
                    }
                },
                MakeArgb: function (alpha, red, green, blue) {
                    return System.Int64.clip64(Bridge.Int.clipu64((((red << 16) | (green << 8)) | blue) | (alpha << 24)).and(System.UInt64(System.Int64([-1,0]))));
                },
                FromArgb: function (argb) {
                    return new ExpressCraft.Color.$ctor2(System.Int64(argb).and((System.Int64([-1,0]))), ExpressCraft.Color.StateARGBValueValid, null, 0);
                },
                FromArgb$3: function (alpha, red, green, blue) {
                    ExpressCraft.Color.CheckByte(alpha);
                    ExpressCraft.Color.CheckByte(red);
                    ExpressCraft.Color.CheckByte(green);
                    ExpressCraft.Color.CheckByte(blue);
                    return new ExpressCraft.Color.$ctor2(ExpressCraft.Color.MakeArgb((alpha & 255), (red & 255), (green & 255), (blue & 255)), ExpressCraft.Color.StateARGBValueValid, null, 0);
                },
                FromArgb$1: function (alpha, baseColor) {
                    ExpressCraft.Color.CheckByte(alpha);
                    return new ExpressCraft.Color.$ctor2(ExpressCraft.Color.MakeArgb((alpha & 255), baseColor.R, baseColor.G, baseColor.B), ExpressCraft.Color.StateARGBValueValid, null, 0);
                },
                FromArgb$2: function (red, green, blue) {
                    return ExpressCraft.Color.FromArgb$3(255, red, green, blue);
                },
                IsEnumValid: function (enumValue, value, minValue, maxValue) {
                    return ((value >= minValue) && (value <= maxValue));
                },
                FromKnownColor: function (color) {
                    return new ExpressCraft.Color.$ctor1(color);
                },
                FromHex: function (value) {
                    if (System.String.startsWith(value, "#")) {
                        return ExpressCraft.Color.FromHex(value.substr(1));
                    } else {
                        return ExpressCraft.Color.FromArgb(parseInt(value));
                    }
                },
                op_Implicit$1: function (color) {
                    return color.ToHex();
                },
                op_Implicit: function (hexValue) {
                    return ExpressCraft.Color.FromHex(hexValue);
                },
                op_Equality: function (left, right) {
                    if (((left.value.ne(right.value)) || (left.state !== right.state)) || (left.knownColor !== right.knownColor)) {
                        return false;
                    }
                    return ((Bridge.referenceEquals(left.name, right.name)) || (((left.name != null) && (right.name != null)) && System.String.equals(left.name, right.name)));
                },
                op_Inequality: function (left, right) {
                    return !(ExpressCraft.Color.op_Equality(left.$clone(), right.$clone()));
                },
                getDefaultValue: function () { return new ExpressCraft.Color(); }
            }
        },
        fields: {
            name: null,
            value: System.Int64(0),
            knownColor: 0,
            state: 0
        },
        props: {
            R: {
                get: function () {
                    return System.Int64.clipu8((this.Value.shr(16)).and(System.Int64(255)));
                }
            },
            G: {
                get: function () {
                    return System.Int64.clipu8((this.Value.shr(8)).and(System.Int64(255)));
                }
            },
            B: {
                get: function () {
                    return System.Int64.clipu8(this.Value.and(System.Int64(255)));
                }
            },
            A: {
                get: function () {
                    return System.Int64.clipu8((this.Value.shr(24)).and(System.Int64(255)));
                }
            },
            IsKnownColor: {
                get: function () {
                    return ((this.state & ExpressCraft.Color.StateKnownColorValid) > 0);
                }
            },
            IsEmpty: {
                get: function () {
                    return (this.state === 0);
                }
            },
            IsNamedColor: {
                get: function () {
                    if ((this.state & ExpressCraft.Color.StateNameValid) === 0) {
                        return this.IsKnownColor;
                    }
                    return true;
                }
            },
            IsSystemColor: {
                get: function () {
                    if (!this.IsKnownColor) {
                        return false;
                    }
                    if (this.knownColor > 26) {
                        return (this.knownColor > 167);
                    }
                    return true;
                }
            },
            NameAndARGBValue: {
                get: function () {
                    return System.String.format("{{Name={0}, ARGB=({1}, {2}, {3}, {4})}}", this.Name, Bridge.box(this.A, System.Byte), Bridge.box(this.R, System.Byte), Bridge.box(this.G, System.Byte), Bridge.box(this.B, System.Byte));
                }
            },
            Name: {
                get: function () {
                    if ((this.state & ExpressCraft.Color.StateNameValid) !== 0) {
                        return this.name;
                    }
                    if (!this.IsKnownColor) {
                        return System.Convert.toStringInBase(this.value, 16, 11);
                    }
                    var str = ExpressCraft.KnownColorTable.KnownColorToName(this.knownColor);
                    if (str != null) {
                        return str;
                    }
                    return this.knownColor.toString();
                }
            },
            Value: {
                get: function () {
                    if ((this.state & ExpressCraft.Color.StateValueMask) !== 0) {
                        return this.value;
                    }
                    if (this.IsKnownColor) {
                        return System.Int64(ExpressCraft.KnownColorTable.KnownColorToArgb(this.knownColor));
                    }
                    return ExpressCraft.Color.NotDefinedValue;
                }
            }
        },
        ctors: {
            $ctor1: function (knownColor) {
                this.$initialize();
                this.value = System.Int64(0);
                this.state = ExpressCraft.Color.StateKnownColorValid;
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
            }
        },
        methods: {
            componentToHex: function (value) {
                var x = value.toString(16);
                return System.String.concat((x.length === 1 ? "0" : ""), x);
            },
            ToHex: function () {
                if (this.A !== 255) {
                    return System.String.format("#{0}{1}{2}{3}", this.componentToHex(this.A), this.componentToHex(this.R), this.componentToHex(this.G), this.componentToHex(this.B)); // "#" + (155).toString(16) + (102).toString(16) + (102).toString(16);
                } else {
                    return System.String.format("#{0}{1}{2}", this.componentToHex(this.R), this.componentToHex(this.G), this.componentToHex(this.B)); // "#" + (155).toString(16) + (102).toString(16) + (102).toString(16);
                }
            },
            GetBrightness: function () {
                var z = this.R / ExpressCraft.Color.q;
                var x = this.G / ExpressCraft.Color.q;
                var c = this.B / ExpressCraft.Color.q;
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
            GetHue: function () {
                if ((this.R === this.G) && (this.G === this.B)) {
                    return 0.0;
                }
                var z = this.R / ExpressCraft.Color.q;
                var x = this.G / ExpressCraft.Color.q;
                var c = this.B / ExpressCraft.Color.q;
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
            GetSaturation: function () {
                var z = this.R / ExpressCraft.Color.q;
                var x = this.G / ExpressCraft.Color.q;
                var c = this.B / ExpressCraft.Color.q;
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
            ToArgb: function () {
                return System.Int64.clip32(this.Value);
            },
            ToKnownColor: function () {
                return this.knownColor;
            },
            toString: function () {
                var builder = new System.Text.StringBuilder("", 32);
                builder.append(Bridge.Reflection.getTypeName(Bridge.getType(this)));
                builder.append(" [");
                if ((this.state & ExpressCraft.Color.StateNameValid) !== 0) {
                    builder.append(this.Name);
                } else if ((this.state & ExpressCraft.Color.StateKnownColorValid) !== 0) {
                    builder.append(this.Name);
                } else if ((this.state & ExpressCraft.Color.StateValueMask) !== 0) {
                    builder.appendFormat("A={0}, R={1}, G={2}, B={3}", Bridge.box(this.A, System.Byte), Bridge.box(this.R, System.Byte), Bridge.box(this.G, System.Byte), Bridge.box(this.B, System.Byte));
                } else {
                    builder.append("Empty");
                }
                builder.append("]");
                return builder.toString();
            },
            equals: function (obj) {
                if (Bridge.is(obj, ExpressCraft.Color)) {
                    var color = System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj), ExpressCraft.Color));
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
        }
    });

    Bridge.define("ExpressCraft.ComboBoxTypes", {
        $kind: "enum",
        statics: {
            fields: {
                Default: 0
            }
        }
    });

    Bridge.define("ExpressCraft.ConsoleLogType", {
        $kind: "enum",
        statics: {
            fields: {
                Log: 0,
                Debug: 1,
                Error: 2
            }
        }
    });

    Bridge.define("ExpressCraft.ContextItem", {
        fields: {
            Caption: null,
            OnItemClick: null,
            BeginGroup: false,
            Enabled: false
        },
        ctors: {
            init: function () {
                this.Caption = "";
                this.BeginGroup = false;
                this.Enabled = true;
            },
            ctor: function () {
                this.$initialize();

            },
            $ctor2: function (caption, beginGroup) {
                if (beginGroup === void 0) { beginGroup = false; }

                this.$initialize();
                this.Caption = caption;
                this.BeginGroup = beginGroup;
            },
            $ctor1: function (caption, _OnItemClick, beginGroup) {
                if (beginGroup === void 0) { beginGroup = false; }

                this.$initialize();
                this.Caption = caption;
                this.BeginGroup = beginGroup;
                this.OnItemClick = _OnItemClick;

            }
        }
    });

    Bridge.define("ExpressCraft.DataColumn", {
        fields: {
            FieldName: null,
            DataType: 0
        },
        methods: {
            GetDisplayValue$1: function (rowIndex, formatString) {
                switch (this.DataType) {
                    default: 
                    case ExpressCraft.DataType.Object: 
                        return System.String.format(formatString, (Bridge.cast(this, ExpressCraft.DataColumnObject).Cells.getItem(rowIndex)));
                    case ExpressCraft.DataType.DateTime: 
                        var obj = Bridge.cast(this, ExpressCraft.DataColumnDateTime).Cells.getItem(rowIndex);
                        if (obj == null) {
                            return "";
                        }
                        if (Bridge.is(obj, System.DateTime)) {
                            return System.String.format(formatString, Bridge.box(Bridge.cast(obj, System.DateTime), System.DateTime, System.DateTime.format));
                        }
                        var d = { };
                        if (System.DateTime.tryParse(obj, null, d)) {
                            return System.String.format(formatString, Bridge.box(d.v, System.DateTime, System.DateTime.format));
                        }
                        var str = Bridge.as(obj, System.String);
                        if (System.String.isNullOrWhiteSpace(str)) {
                            return "";
                        }
                        return System.String.format(formatString, str);
                    case ExpressCraft.DataType.String: 
                        return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnString).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.Integer: 
                        return System.String.format(formatString, Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnInteger).Cells.getItem(rowIndex), System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                    case ExpressCraft.DataType.Long: 
                        return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnLong).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.Float: 
                        return System.String.format(formatString, Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnFloat).Cells.getItem(rowIndex), System.Single, System.Nullable.toStringFn(System.Single.format), System.Nullable.getHashCodeFn(System.Single.getHashCode)));
                    case ExpressCraft.DataType.Double: 
                        return System.String.format(formatString, Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnDouble).Cells.getItem(rowIndex), System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                    case ExpressCraft.DataType.Decimal: 
                        return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnDecimal).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.Byte: 
                        return System.String.format(formatString, Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnByte).Cells.getItem(rowIndex), System.Byte, System.Nullable.toString, System.Nullable.getHashCode));
                    case ExpressCraft.DataType.Short: 
                        return System.String.format(formatString, Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnShort).Cells.getItem(rowIndex), System.Int16, System.Nullable.toString, System.Nullable.getHashCode));
                    case ExpressCraft.DataType.Bool: 
                        return System.String.format(formatString, Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnBool).Cells.getItem(rowIndex), System.Boolean, System.Nullable.toStringFn(System.Boolean.toString), System.Nullable.getHashCode));
                }
            },
            GetDisplayValue: function (rowIndex) {
                switch (this.DataType) {
                    default: 
                    case ExpressCraft.DataType.Object: 
                        return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnObject).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.DateTime: 
                        return System.Convert.toString(Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnDateTime).Cells.getItem(rowIndex), System.DateTime, System.Nullable.toStringFn(System.DateTime.format), System.Nullable.getHashCode));
                    case ExpressCraft.DataType.String: 
                        return Bridge.cast(this, ExpressCraft.DataColumnString).Cells.getItem(rowIndex);
                    case ExpressCraft.DataType.Integer: 
                        return System.Convert.toString(Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnInteger).Cells.getItem(rowIndex), System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                    case ExpressCraft.DataType.Long: 
                        return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnLong).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.Float: 
                        return System.Convert.toString(Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnFloat).Cells.getItem(rowIndex), System.Single, System.Nullable.toStringFn(System.Single.format), System.Nullable.getHashCodeFn(System.Single.getHashCode)));
                    case ExpressCraft.DataType.Double: 
                        return System.Convert.toString(Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnDouble).Cells.getItem(rowIndex), System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                    case ExpressCraft.DataType.Decimal: 
                        return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnDecimal).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.Byte: 
                        return System.Convert.toString(Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnByte).Cells.getItem(rowIndex), System.Byte, System.Nullable.toString, System.Nullable.getHashCode));
                    case ExpressCraft.DataType.Bool: 
                        return System.Convert.toString(Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnBool).Cells.getItem(rowIndex), System.Boolean, System.Nullable.toStringFn(System.Boolean.toString), System.Nullable.getHashCode));
                    case ExpressCraft.DataType.Short: 
                        return System.Convert.toString(Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnShort).Cells.getItem(rowIndex), System.Int16, System.Nullable.toString, System.Nullable.getHashCode));
                }
            },
            GetCellValue: function (rowIndex) {
                switch (this.DataType) {
                    default: 
                    case ExpressCraft.DataType.Object: 
                        return Bridge.cast(this, ExpressCraft.DataColumnObject).Cells.getItem(rowIndex);
                    case ExpressCraft.DataType.DateTime: 
                        return Bridge.box(Bridge.cast(this, ExpressCraft.DataColumnDateTime).Cells.getItem(rowIndex), System.DateTime, System.Nullable.toStringFn(System.DateTime.format), System.Nullable.getHashCode);
                    case ExpressCraft.DataType.String: 
                        return Bridge.cast(this, ExpressCraft.DataColumnString).Cells.getItem(rowIndex);
                    case ExpressCraft.DataType.Integer: 
                        return Bridge.box((Bridge.cast(this, ExpressCraft.DataColumnInteger).Cells.getItem(rowIndex)), System.Int32, System.Nullable.toString, System.Nullable.getHashCode);
                    case ExpressCraft.DataType.Long: 
                        return (Bridge.cast(this, ExpressCraft.DataColumnLong).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.Float: 
                        return Bridge.box((Bridge.cast(this, ExpressCraft.DataColumnFloat).Cells.getItem(rowIndex)), System.Single, System.Nullable.toStringFn(System.Single.format), System.Nullable.getHashCodeFn(System.Single.getHashCode));
                    case ExpressCraft.DataType.Double: 
                        return Bridge.box((Bridge.cast(this, ExpressCraft.DataColumnDouble).Cells.getItem(rowIndex)), System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode));
                    case ExpressCraft.DataType.Decimal: 
                        return (Bridge.cast(this, ExpressCraft.DataColumnDecimal).Cells.getItem(rowIndex));
                    case ExpressCraft.DataType.Byte: 
                        return Bridge.box((Bridge.cast(this, ExpressCraft.DataColumnByte).Cells.getItem(rowIndex)), System.Byte, System.Nullable.toString, System.Nullable.getHashCode);
                    case ExpressCraft.DataType.Bool: 
                        return Bridge.box((Bridge.cast(this, ExpressCraft.DataColumnBool).Cells.getItem(rowIndex)), System.Boolean, System.Nullable.toStringFn(System.Boolean.toString), System.Nullable.getHashCode);
                    case ExpressCraft.DataType.Short: 
                        return Bridge.box((Bridge.cast(this, ExpressCraft.DataColumnShort).Cells.getItem(rowIndex)), System.Int16, System.Nullable.toString, System.Nullable.getHashCode);
                }
            }
        }
    });

    Bridge.define("ExpressCraft.DataItem", {
        fields: {
            Text: null,
            Value: null
        },
        ctors: {
            $ctor1: function (text, value) {
                this.$initialize();
                this.Text = text;
                this.Value = value;
            },
            ctor: function (text) {
                this.$initialize();
                this.Text = text;
                this.Value = text;
            }
        }
    });

    Bridge.define("ExpressCraft.DataRow", {
        fields: {
            ParentTable: null,
            RowIndex: 0,
            batchData: null
        },
        ctors: {
            init: function () {
                this.RowIndex = -1;
            },
            ctor: function () {
                this.$initialize();

            },
            $ctor2: function (columnLength) {
                this.$initialize();
                this.ParentTable = null;
                this.RowIndex = -1;
                this.batchData = System.Array.init(columnLength, null, System.Object);
            },
            $ctor1: function (parentTable, rowIndex) {
                if (rowIndex === void 0) { rowIndex = -1; }

                this.$initialize();
                this.ParentTable = parentTable;
                this.RowIndex = rowIndex;
                if (rowIndex === -1) {
                    this.batchData = System.Array.init(parentTable.ColumnCount, null, System.Object);
                }
            }
        },
        methods: {
            getItem: function (columnIndex) {
                var $t;
                if (this.RowIndex === -1) {
                    return this.batchData[System.Array.index(columnIndex, this.batchData)];
                }
                var col = this.ParentTable.Columns.getItem(columnIndex);
                return ($t = col.cells.items)[System.Array.index(this.RowIndex, $t)];
            },
            setItem: function (columnIndex, value) {
                var $t, $t1;
                if (this.RowIndex === -1) {
                    if (!Bridge.referenceEquals(this.batchData[System.Array.index(columnIndex, this.batchData)], value)) {
                        this.batchData[System.Array.index(columnIndex, this.batchData)] = value;
                        this.ParentTable.RequireOnDataChangeEvent();
                    }

                    return;
                }
                var col = this.ParentTable.Columns.getItem(columnIndex);
                if (!Bridge.referenceEquals(($t = col.cells.items)[System.Array.index(this.RowIndex, $t)], value)) {
                    ($t1 = col.cells.items)[System.Array.index(this.RowIndex, $t1)] = Bridge.unbox(value);
                    this.ParentTable.RequireOnDataChangeEvent();
                }
            },
            GetOfflineDataRow: function () {
                var dr = new ExpressCraft.DataRow.$ctor2(this.ParentTable.ColumnCount);
                var data = System.Array.init(this.ParentTable.ColumnCount, null, System.Object);
                for (var i = 0; i < this.ParentTable.ColumnCount; i = (i + 1) | 0) {
                    data[System.Array.index(i, data)] = this.getItem(i);
                }
                dr.batchData = data;
                return dr;
            }
        }
    });

    Bridge.define("ExpressCraft.DataTable", {
        fields: {
            Columns: null,
            _inDataChange: false,
            _requestedOnDataChange: false,
            _ColCount: 0,
            _RowCount: 0,
            NewRows: null
        },
        events: {
            OnDataSourceChanged: null
        },
        props: {
            ColumnCount: {
                get: function () {
                    return this._ColCount;
                }
            },
            RowCount: {
                get: function () {
                    return this._RowCount;
                }
            }
        },
        ctors: {
            init: function () {
                this.Columns = new (System.Collections.Generic.List$1(ExpressCraft.DataColumn))();
                this._inDataChange = false;
                this._requestedOnDataChange = false;
                this.NewRows = new (System.Collections.Generic.List$1(ExpressCraft.DataRow))();
            }
        },
        methods: {
            getItem: function (rowIndex) {
                return new ExpressCraft.DataRow.$ctor1(this, rowIndex);
            },
            RequireOnDataChangeEvent: function () {
                if (!this._inDataChange) {
                    this._requestedOnDataChange = false;
                    if (!Bridge.staticEquals(this.OnDataSourceChanged, null)) {
                        this.OnDataSourceChanged(this, null);
                    }
                } else {
                    this._requestedOnDataChange = true;
                }
            },
            ClearRows: function () {
                this._RowCount = 0;
                for (var i = 0; i < this.Columns.Count; i = (i + 1) | 0) {
                    this.ClearCells(this.Columns.getItem(i));
                }
            },
            ClearCells$1: function (T, _column) {
                var _col = _column;
                _col.cells = new (System.Collections.Generic.List$1(T))();
            },
            ClearCells: function (_column) {
                switch (_column.DataType) {
                    default: 
                    case ExpressCraft.DataType.Object: 
                        this.ClearCells$1(System.Object, _column);
                        break;
                    case ExpressCraft.DataType.DateTime: 
                        this.ClearCells$1(System.Nullable$1(System.DateTime), _column);
                        break;
                    case ExpressCraft.DataType.String: 
                        this.ClearCells$1(System.String, _column);
                        break;
                    case ExpressCraft.DataType.Integer: 
                        this.ClearCells$1(System.Nullable$1(System.Int32), _column);
                        break;
                    case ExpressCraft.DataType.Long: 
                        this.ClearCells$1(System.Nullable$1(System.Int64), _column);
                        break;
                    case ExpressCraft.DataType.Float: 
                        this.ClearCells$1(System.Nullable$1(System.Single), _column);
                        break;
                    case ExpressCraft.DataType.Double: 
                        this.ClearCells$1(System.Nullable$1(System.Double), _column);
                        break;
                    case ExpressCraft.DataType.Decimal: 
                        this.ClearCells$1(System.Nullable$1(System.Decimal), _column);
                        break;
                    case ExpressCraft.DataType.Bool: 
                        this.ClearCells$1(System.Nullable$1(System.Boolean), _column);
                        break;
                    case ExpressCraft.DataType.Byte: 
                        this.ClearCells$1(System.Nullable$1(System.Byte), _column);
                        break;
                    case ExpressCraft.DataType.Short: 
                        this.ClearCells$1(System.Nullable$1(System.Int16), _column);
                        break;
                }
                this.RequireOnDataChangeEvent();
            },
            GetColumnByDataType: function (type) {
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
            AddColumn: function (fieldName, type) {
                if (type === void 0) { type = 0; }
                var col = this.GetColumnByDataType(type);
                col.FieldName = fieldName;

                this.Columns.add(col);
                this._ColCount = this.Columns.Count;

                this.RequireOnDataChangeEvent();
            },
            BeginNewRow: function (EstimatedNewRows) {
                this.NewRows = new (System.Collections.Generic.List$1(ExpressCraft.DataRow))(EstimatedNewRows);
                this.BeginDataUpdate();
            },
            AddRow: function () {
                var dr = new ExpressCraft.DataRow.$ctor1(this, Bridge.identity(this._RowCount, (this._RowCount = (this._RowCount + 1) | 0)));
                var colLength = this.Columns.Count;
                for (var x = 0; x < colLength; x = (x + 1) | 0) {
                    var col = this.Columns.getItem(x);
                    col.cells.add(null);
                }

                this.RequireOnDataChangeEvent();

                return dr;
            },
            AddRow$1: function (row) {
                if (row === void 0) { row = []; }
                if (row.length === this.ColumnCount) {
                    this._RowCount = (this._RowCount + 1) | 0;
                    var colLength = this.Columns.Count;
                    for (var x = 0; x < colLength; x = (x + 1) | 0) {
                        var col = this.Columns.getItem(x);
                        col.cells.add(Bridge.unbox(row[System.Array.index(x, row)]));
                    }
                    this.RequireOnDataChangeEvent();
                }
            },
            NewRow: function () {
                var dr = new ExpressCraft.DataRow.$ctor1(this);

                this.NewRows.add(dr);

                return dr;
            },
            AcceptNewRows: function () {
                var $t, $t1, $t2;
                if (this.NewRows == null || this.NewRows.Count === 0) {
                    return;
                }
                var colLength = this.Columns.Count;
                var rowLength = this.NewRows.Count;
                var colN1 = (colLength - 1) | 0;

                for (var x = 0; x < colLength; x = (x + 1) | 0) {
                    var col = this.Columns.getItem(x);
                    var DataCells = System.Array.init(rowLength, null, System.Object);

                    if (x === 0) {
                        for (var y = 0; y < rowLength; y = (y + 1) | 0) {
                            this.NewRows.getItem(y).RowIndex = Bridge.identity(this._RowCount, (this._RowCount = (this._RowCount + 1) | 0));
                            DataCells[System.Array.index(y, DataCells)] = ($t = this.NewRows.getItem(y).batchData)[System.Array.index(x, $t)];
                        }
                    } else if (x === colN1) {
                        for (var y1 = 0; y1 < rowLength; y1 = (y1 + 1) | 0) {
                            DataCells[System.Array.index(y1, DataCells)] = ($t1 = this.NewRows.getItem(y1).batchData)[System.Array.index(x, $t1)];
                            this.NewRows.getItem(y1).batchData = null;
                        }
                    } else {
                        for (var y2 = 0; y2 < rowLength; y2 = (y2 + 1) | 0) {
                            DataCells[System.Array.index(y2, DataCells)] = ($t2 = this.NewRows.getItem(y2).batchData)[System.Array.index(x, $t2)];
                        }
                    }
                    col.cells.addRange(Bridge.unbox(DataCells));

                }
                this.NewRows.clear();

                this.EndDataUpdate();
            },
            BeginDataUpdate: function () {
                this._inDataChange = true;
                this._requestedOnDataChange = false;
            },
            EndDataUpdate: function () {
                this._inDataChange = false;
                if (this._requestedOnDataChange) {
                    this._requestedOnDataChange = false;
                    if (!Bridge.staticEquals(this.OnDataSourceChanged, null)) {
                        this.OnDataSourceChanged(this, null);
                    }
                }
            },
            RejectNewRows: function () {
                this.NewRows.clear();
                this._inDataChange = false;
            }
        }
    });

    Bridge.define("ExpressCraft.DataType", {
        $kind: "enum",
        statics: {
            fields: {
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
        }
    });

    Bridge.define("ExpressCraft.DialogResult", {
        fields: {
            ResultEnum: 0,
            CallBack: null
        },
        ctors: {
            init: function () {
                this.ResultEnum = ExpressCraft.DialogResultEnum.None;
            },
            ctor: function (resultEnum, callBack) {
                this.$initialize();
                this.ResultEnum = resultEnum;
                this.CallBack = callBack;
            }
        },
        methods: {
            InvokeIfResult: function (resultEnum) {
                if (resultEnum === this.ResultEnum && !Bridge.staticEquals(this.CallBack, null)) {
                    this.CallBack();
                }
            }
        }
    });

    Bridge.define("ExpressCraft.DialogResultEnum", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                OK: 1,
                Cancel: 2,
                Abort: 3,
                Retry: 4,
                Ignore: 5,
                Yes: 6,
                No: 7
            }
        }
    });

    Bridge.define("ExpressCraft.ExternalPlugin", {
        fields: {
            SourceUrl: null,
            SetupCompleted: false,
            InLoad: false,
            OnReady: null
        },
        ctors: {
            init: function () {
                this.SetupCompleted = false;
                this.InLoad = false;
            },
            ctor: function (sourceUrl) {
                this.$initialize();
                this.SourceUrl = sourceUrl;
            }
        },
        methods: {
            Setup: function () {
                var $t;
                if (!this.SetupCompleted) {
                    if (this.InLoad) {
                        return;
                    }
                    this.InLoad = true;

                    document.head.appendChild(($t = document.createElement('script'), $t.onload = Bridge.fn.bind(this, $asm.$.ExpressCraft.ExternalPlugin.f1), $t.src = this.SourceUrl, $t));
                }
            },
            UsageCheck: function () {
                if (!this.SetupCompleted) {
                    throw new System.Exception(System.String.concat("'", this.SourceUrl, "' requires to be setup!"));
                }
                if (this.InLoad) {
                    throw new System.Exception(System.String.concat("'", this.SourceUrl, "' is currently loading, Please try again in a few seconds!"));
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.ExternalPlugin", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ExternalPlugin, {
        f1: function (ele) {
            this.SetupCompleted = true;
            this.InLoad = false;
            if (!Bridge.staticEquals(this.OnReady, null)) {
                this.OnReady();
            }
        }
    });

    Bridge.define("ExpressCraft.Firebase", {
        statics: {
            fields: {
                ExternalFireBase: null,
                DisplayName: null,
                PhotoURL: null,
                UserSignedIn: false
            },
            ctors: {
                init: function () {
                    this.ExternalFireBase = new ExpressCraft.ExternalPlugin("https://www.gstatic.com/firebasejs/3.6.8/firebase.js");
                }
            },
            methods: {
                Setup: function (OnReady) {
                    if (OnReady === void 0) { OnReady = null; }
                    ExpressCraft.Firebase.ExternalFireBase.OnReady = OnReady;
                    ExpressCraft.Firebase.ExternalFireBase.Setup();
                },
                InitializeApp: function (ApiKey, AuthDomain, DatabaseURL, ProjectId, StorageBucket, MessagingSenderId) {
                    ExpressCraft.Firebase.ExternalFireBase.UsageCheck();
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
                SignIn: function () {
                    			
                    			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
                    			
                },
                SignOut: function () {
                    			
                    			firebase.auth().signOut();
                    			
                },
                DatabaseRef: function (name) {
                    var dataRef = firebase.database().ref(name);
                    dataRef.off();
                    return dataRef;
                },
                IsSignedInWithFirebase: function () {
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
        }
    });

    Bridge.define("ExpressCraft.FixedSplitterPosition", {
        $kind: "enum",
        statics: {
            fields: {
                Panel1: 0,
                Panel2: 1,
                None: 2
            }
        }
    });

    Bridge.define("ExpressCraft.FormButtonType", {
        $kind: "enum",
        statics: {
            fields: {
                Close: 0,
                Maximize: 1,
                Minimize: 2,
                Restore: 3,
                Help: 4
            }
        }
    });

    Bridge.define("ExpressCraft.FormCollection", {
        fields: {
            FormOwner: null,
            VisibleForms: null
        },
        ctors: {
            init: function () {
                this.VisibleForms = new (System.Collections.Generic.List$1(ExpressCraft.Form))();
            },
            ctor: function (formOwner) {
                this.$initialize();
                this.FormOwner = formOwner;
            }
        }
    });

    Bridge.define("ExpressCraft.FormStartPosition", {
        $kind: "enum",
        statics: {
            fields: {
                Manual: 0,
                Center: 1,
                WindowsDefaultLocation: 2
            }
        }
    });

    Bridge.define("ExpressCraft.GoogleCloudPrint", {
        statics: {
            fields: {
                ExternalGoogleCloudPrint: null
            },
            ctors: {
                init: function () {
                    this.ExternalGoogleCloudPrint = new ExpressCraft.ExternalPlugin("https://www.google.com/cloudprint/client/cpgadget.js");
                }
            },
            methods: {
                Setup: function () {
                    ExpressCraft.GoogleCloudPrint.ExternalGoogleCloudPrint.Setup();
                }
            }
        },
        fields: {
            _source: null,
            _mimetype: null,
            _encoding: null,
            _title: null,
            _gadget: null
        },
        ctors: {
            init: function () {
                this._encoding = "";
            },
            ctor: function (source, title, gcpmt, encoding) {
                if (title === void 0) { title = ""; }
                if (gcpmt === void 0) { gcpmt = 0; }
                if (encoding === void 0) { encoding = ""; }

                this.$initialize();
                System.Object.call(this);
                this._title = title;
                this._source = source;
                this._encoding = encoding;
                this._mimetype = System.String.replaceAll(System.Enum.format(ExpressCraft.GoogleCloudPrintingMimeType, gcpmt, "G").toLowerCase(), "_", ".");
            }
        },
        methods: {
            Show: function () {
                ExpressCraft.GoogleCloudPrint.ExternalGoogleCloudPrint.UsageCheck();

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
                    ExpressCraft.Helper.Delete($(".__gcp_dialog_container_cls").parent().get(0));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                }
            },
            Close: function () {
                if (this._gadget != null) {
                    			
                    				this._gadget.closePrintDialog();
                    				this._gadget = null;
                    				
                }
            }
        }
    });

    Bridge.define("ExpressCraft.GoogleCloudPrintingMimeType", {
        $kind: "enum",
        statics: {
            fields: {
                Url: 0,
                DataUrl: 1,
                Google_Drawing: 2,
                Google_Drive: 3,
                Google_Kix: 4,
                Google_Mail: 5,
                Google_Presentation: 6,
                Google_Spreadsheet: 7
            }
        }
    });

    Bridge.define("ExpressCraft.GridViewCellApparence", {
        fields: {
            IsBold: false,
            Alignment: "inherit",
            Forecolor: null
        },
        ctors: {
            init: function () {
                this.IsBold = false;
                this.Alignment = "left";
            },
            ctor: function () {
                this.$initialize();

            },
            $ctor1: function (isBold) {
                this.$initialize();
                this.IsBold = isBold;
            },
            $ctor2: function (isBold, alignment) {
                this.$initialize();
                this.IsBold = isBold;
                this.Alignment = alignment;
            },
            $ctor3: function (isBold, alignment, forecolor) {
                this.$initialize();
                this.IsBold = isBold;
                this.Alignment = alignment;
                this.Forecolor = forecolor;
            }
        }
    });

    Bridge.define("ExpressCraft.GridViewCellDisplay", {
        fields: {
            UseDefaultElement: false
        },
        methods: {
            OnCreate: function (gridView, dataRowIndex, columnIndex) {
                return null;
            },
            OnCreateDefault: function (originalElement, gridView, dataRowIndex, columnIndex) {
                return originalElement;
            }
        }
    });

    Bridge.define("ExpressCraft.GridViewColumn", {
        fields: {
            Column: null,
            View: null,
            Caption: null,
            Visible: false,
            CachedX: 0,
            FormatString: null,
            HeadingApparence: null,
            BodyApparence: null,
            CellDisplay: null,
            SortedMode: 0,
            FilterEdit: null,
            filterValue: null,
            AllowEdit: false,
            ReadOnly: false,
            _width: 0
        },
        props: {
            FilterValue: {
                get: function () {
                    return this.filterValue;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this.filterValue, value)) {
                        this.filterValue = value;
                        if (this.View.ShowAutoFilterRow) {
                            this.View.CalculateVisibleRows();
                        }
                    }
                }
            },
            Width: {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    if (value < 24) {
                        value = 24;
                    }
                    if (this._width !== value) {
                        this._width = value;
                        this.View.RenderGrid();
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this.FormatString = "";
                this.HeadingApparence = new ExpressCraft.GridViewCellApparence.ctor();
                this.BodyApparence = new ExpressCraft.GridViewCellApparence.ctor();
                this.SortedMode = ExpressCraft.GridViewSortMode.None;
                this.AllowEdit = true;
                this.ReadOnly = false;
            },
            ctor: function (view, width) {
                if (width === void 0) { width = 100; }

                this.$initialize();
                this.View = view;
                this._width = width;
            }
        },
        methods: {
            ValueMatchFilter: function (index) {
                if (this.filterValue == null) {
                    return true;
                }

                var abc = this.GetDisplayValueByDataRowHandle(index);

                switch (this.Column.DataType) {
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
            GetDataColumnIndex: function () {
                var length = this.View.DataSource.ColumnCount;
                for (var i = 0; i < length; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.View.DataSource.Columns.getItem(i), this.Column)) {
                        return i;
                    }
                }
                return -1;
            },
            GetDisplayValueByDataRowHandle: function (RowHandle) {
                if (System.String.isNullOrWhiteSpace(this.FormatString)) {
                    return this.Column.GetDisplayValue(RowHandle);
                } else {
                    return this.Column.GetDisplayValue$1(RowHandle, this.FormatString);
                }
            },
            GetDisplayValue: function (RowHandle) {
                if (this.View.VisibleRowHandles != null) {
                    RowHandle = this.View.VisibleRowHandles.getItem(RowHandle);
                }

                if (System.String.isNullOrWhiteSpace(this.FormatString)) {
                    return this.Column.GetDisplayValue(RowHandle);
                } else {
                    return this.Column.GetDisplayValue$1(RowHandle, this.FormatString);
                }
            }
        }
    });

    Bridge.define("ExpressCraft.GridViewSortMode", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Asc: 1,
                Desc: 2
            }
        }
    });

    Bridge.define("ExpressCraft.HardSoftList$1", function (T) { return {
        fields: {
            _hhl: null,
            _hl: null,
            SL: null,
            Limit: 0,
            HardLength: 0,
            DefaultValue: Bridge.getDefaultValue(T)
        },
        ctors: {
            init: function () {
                this._hhl = new (System.Collections.Generic.List$1(T))();
                this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                this.SL = new (System.Collections.Generic.List$1(System.Int32))();
                this.HardLength = 0;
            },
            ctor: function (defaultValue, limit) {
                if (limit === void 0) { limit = 10000; }

                this.$initialize();
                this.DefaultValue = defaultValue;
                this.Limit = limit;
            }
        },
        methods: {
            GetIndexValueByHardListIndex: function (index) {
                return this._hl.getItem(index);
            },
            ClearAll: function () {
                this._hhl = new (System.Collections.Generic.List$1(T))();
                this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                this.SL = new (System.Collections.Generic.List$1(System.Int32))();
                this.HardLength = 0;
            },
            ClearAllSetHardRange: function (value, Indexs) {
                if (Indexs === void 0) { Indexs = []; }
                this.HardLength = 0;
                if (Indexs == null || Indexs.length === 0) {
                    this.ClearAll();
                } else {
                    if (Indexs.length > this.Limit) {
                        this.HardLength = Indexs.length;
                        this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                        this.SL = new (System.Collections.Generic.List$1(System.Int32))();

                        var max = 0;
                        for (var i = 0; i < this.HardLength; i = (i + 1) | 0) {
                            if (Indexs[System.Array.index(i, Indexs)] > max) {
                                max = Indexs[System.Array.index(i, Indexs)];
                            }
                        }
                        var length = (max + 1) | 0;
                        this._hhl = new (System.Collections.Generic.List$1(T))(length);

                        if (length === Indexs.length) {
                            for (var i1 = 0; i1 < this.HardLength; i1 = (i1 + 1) | 0) {
                                this._hhl.add(value);
                            }
                        } else {
                            for (var i2 = 0; i2 < length; i2 = (i2 + 1) | 0) {
                                this._hhl.add(this.DefaultValue);
                            }
                            for (var i3 = 0; i3 < this.HardLength; i3 = (i3 + 1) | 0) {
                                this._hhl.setItem(Indexs[System.Array.index(i3, Indexs)], value);
                            }
                        }


                    } else {
                        this._hhl = new (System.Collections.Generic.List$1(T))();
                        this.HardLength = Indexs.length;
                        this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))(this.HardLength);
                        for (var i4 = 0; i4 < this.HardLength; i4 = (i4 + 1) | 0) {
                            this._hl.add(new (ExpressCraft.IndexValue$1(T))(Indexs[System.Array.index(i4, Indexs)], value));
                        }
                        this.SL = new (System.Collections.Generic.List$1(System.Int32))();
                    }
                }
            },
            ClearSoftList: function () {
                this.SL = new (System.Collections.Generic.List$1(System.Int32))();
            },
            ClearAndAddOrSet: function (value, index, AddToSoftList) {
                if (AddToSoftList === void 0) { AddToSoftList = false; }
                this._hhl = new (System.Collections.Generic.List$1(T))();
                this._hl = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                this.SL = new (System.Collections.Generic.List$1(System.Int32))();
                this.HardLength = 0;
                this.AddOrSet(value, index, AddToSoftList);
            },
            GetHardOrSoftIndexValue: function (index, AddToSoftList) {
                if (AddToSoftList === void 0) { AddToSoftList = false; }
                var length = this.SL.Count;
                for (var i = 0; i < length; i = (i + 1) | 0) {
                    var slI = this.SL.getItem(i);
                    if (this._hl.getItem(slI).Index === index) {
                        return this._hl.getItem(slI);
                    }
                }

                length = this._hl.Count;

                for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                    var hli = this._hl.getItem(i1);
                    if (hli.Index === index) {
                        if (AddToSoftList) {
                            this.SL.add(i1);
                        }
                        return hli;
                    }
                }

                return null;
            },
            GetHardIndexValue: function (index) {
                var length = this._hl.Count;

                for (var i = 0; i < length; i = (i + 1) | 0) {
                    var hli = this._hl.getItem(i);
                    if (hli.Index === index.v) {
                        index.v = i;
                        return hli;
                    }
                }
                index.v = length;

                return null;
            },
            GetValue: function (index, AddToSoftList) {
                if (AddToSoftList === void 0) { AddToSoftList = false; }
                if (this.HardLength > this.Limit) {
                    return this._hhl.getItem(index);
                }
                var hiv = this.GetHardOrSoftIndexValue(index, AddToSoftList);
                if (hiv == null) {
                    return this.DefaultValue;
                }
                return hiv.Value;
            },
            GetIndex: function (index) {
                if (this.HardLength > this.Limit) {
                    return index;
                }

                var hiv = this.GetHardOrSoftIndexValue(index);
                if (hiv == null) {
                    return -1;
                }
                return hiv.Index;
            },
            AddOrSet: function (value, index, AddToSoftList) {
                if (AddToSoftList === void 0) { AddToSoftList = false; }
                if (this.HardLength > this.Limit) {
                    if (index >= this.HardLength) {
                        var addDiff = ((((index + 1) | 0)) - this._hhl.Count) | 0;
                        if (addDiff > 0) {
                            var data = System.Array.init(addDiff, function (){
                                return Bridge.getDefaultValue(T);
                            }, T);
                            for (var i = 0; i < addDiff; i = (i + 1) | 0) {
                                data[System.Array.index(i, data)] = this.DefaultValue;
                            }
                            this._hhl.addRange(data);
                        }
                        this._hhl.add(value);
                        this.HardLength = this._hhl.Count;
                    } else {
                        this._hhl.setItem(index, value);
                    }
                    return;
                }

                var length = this.SL.Count;
                for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                    var hli = this._hl.getItem(this.SL.getItem(i1));
                    if (hli.Index === index) {
                        hli.Value = value;
                        return;
                    }
                }

                var hindex = { v : index };
                var hiv = this.GetHardIndexValue(hindex);
                if (hiv == null) {
                    this._hl.add(((hiv = new (ExpressCraft.IndexValue$1(T))(index, value))));
                } else {
                    hiv.Value = value;
                }

                if (AddToSoftList) {
                    this.SL.add(hindex.v);
                }
            },
            Remove: function (index, OnlySoftList) {
                if (OnlySoftList === void 0) { OnlySoftList = false; }
                if (this.HardLength > this.Limit) {
                    if (((this.HardLength - 1) | 0) > this.Limit) {
                        this._hhl.setItem(index, this.DefaultValue);
                    } else {
                        for (var i = 0; i < this.HardLength; i = (i + 1) | 0) {
                            if (i !== index && !Bridge.equals(this._hhl.getItem(i), this.DefaultValue)) {
                                this._hl.add(new (ExpressCraft.IndexValue$1(T))(i, this._hhl.getItem(i)));
                            }
                        }

                        this.HardLength = (this.HardLength - 1) | 0;
                    }
                } else {
                    var Length = this.SL.Count;
                    for (var i1 = 0; i1 < Length; i1 = (i1 + 1) | 0) {
                        var sli = this.SL.getItem(i1);
                        if (this._hl.getItem(sli).Index === index) {
                            this.SL.removeAt(i1);
                            if (OnlySoftList) {
                                return;
                            }
                            this._hl.removeAt(sli);
                            return;
                        }
                    }
                    var length = this._hl.Count;

                    for (var i2 = 0; i2 < length; i2 = (i2 + 1) | 0) {
                        var hli = this._hl.getItem(i2);
                        if (hli.Index === index) {
                            this._hl.removeAt(i2);
                            return;
                        }
                    }
                }
            }
        }
    }; });

    Bridge.define("ExpressCraft.Helper", {
        statics: {
            methods: {
                IsTrue: function (value) {
                    return (Bridge.referenceEquals(((value = value.toLowerCase())), "true") || Bridge.referenceEquals(value, "1") || Bridge.referenceEquals(value, "on")) ? 1 : 0;
                },
                ToInt: function (value) {
                    return parseInt(value);
                },
                ToFloat: function (value) {
                    return parseFloat(value);
                },
                ToStr: function (value) {
                    return value;
                },
                IsNumber: function (value) {
                    return Bridge.is(value, System.SByte) || Bridge.is(value, System.Byte) || Bridge.is(value, System.Int16) || Bridge.is(value, System.UInt16) || Bridge.is(value, System.Int32) || Bridge.is(value, System.UInt32) || Bridge.is(value, System.Int64) || Bridge.is(value, System.UInt64) || Bridge.is(value, System.Single) || Bridge.is(value, System.Double) || Bridge.is(value, System.Decimal);
                },
                Empty: function (element) {
                    			var len = element.childNodes.length;
                    			while(len--)
                    			{
                    				element.removeChild(element.lastChild);
                    			};
                    			
                },
                GetClientMouseLocation: function (e) {
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
                SetChecked$1: function (input, value) {
                    ExpressCraft.Helper.SetChecked(input.Content, value);
                },
                SetChecked: function (input, value) {
                    var check = false;
                    if (value != null) {
                        if (Bridge.is(value, System.Boolean) || ExpressCraft.Helper.IsNumber(value)) {
                            check = System.Nullable.getValue(Bridge.cast(Bridge.unbox(value), System.Boolean));
                        } else if (Bridge.is(value, System.String)) {
                            var strValue = Bridge.cast(value, System.String);
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
                Delete: function (c) {
                    if (c != null && c.parentElement != null && c.parentElement.contains(c)) {
                        c.parentElement.removeChild(c);
                    }
                },
                ToPx: function (i) {
                    return i + 'px';
                },
                Log: function (jso) {
                    console.log(Bridge.unbox(jso));
                },
                AppendChildren$1: function (c, Nodes) {
                    if (Nodes === void 0) { Nodes = []; }
                    if (Nodes != null && Nodes.length > 0) {
                        for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                            c.appendChild(Nodes[System.Array.index(i, Nodes)]);
                        }
                    }
                },
                AppendChildren: function (c, Nodes) {
                    if (Nodes === void 0) { Nodes = []; }
                    ExpressCraft.Helper.AppendChildren$2(c.Content, Nodes);

                    return c;
                },
                AppendChildren$2: function (c, Nodes) {
                    if (Nodes === void 0) { Nodes = []; }
                    if (Nodes != null && Nodes.length > 0) {
                        for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                            c.appendChild(ExpressCraft.Control.op_Implicit(Nodes[System.Array.index(i, Nodes)]));
                        }
                    }


                },
                AppendChildrenTabIndex: function (c, Nodes) {
                    if (Nodes === void 0) { Nodes = []; }
                    if (Nodes != null && Nodes.length > 0) {
                        for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                            Nodes[System.Array.index(i, Nodes)].Content.tabIndex = i;
                            c.appendChild(ExpressCraft.Control.op_Implicit(Nodes[System.Array.index(i, Nodes)]));
                        }
                    }
                },
                AppendChildrenTabIndex$1: function (c, Nodes) {
                    if (Nodes === void 0) { Nodes = []; }
                    ExpressCraft.Helper.AppendChildrenTabIndex(c.Content, Nodes);
                },
                AppendChild: function (c, Node) {
                    c.Content.appendChild(ExpressCraft.Control.op_Implicit(Node));
                    return c;
                },
                SetBounds: function (c, left, top, width, height) {
                    ExpressCraft.Helper.SetBounds$1(c.Content, left, top, width, height);

                    return c;
                },
                SetBounds$1: function (c, left, top, width, height) {
                    c.style.left = ExpressCraft.Helper.ToHtmlValue(left);
                    c.style.top = ExpressCraft.Helper.ToHtmlValue(top);
                    c.style.width = ExpressCraft.Helper.ToHtmlValue(width);
                    c.style.height = ExpressCraft.Helper.ToHtmlValue(height);
                },
                SetBoundsFull: function (c) {
                    ExpressCraft.Helper.SetBoundsFull$1(c.Content);

                    return c;
                },
                SetBoundsFull$1: function (c) {
                    ExpressCraft.Helper.SetBounds$1(c, 0, 0, "100%", "100%");
                },
                SetSize: function (c, width, height) {
                    ExpressCraft.Helper.SetSize$1(c.Content, width, height);

                    return c;
                },
                SetSize$1: function (c, width, height) {
                    c.style.width = ExpressCraft.Helper.ToHtmlValue(width);
                    c.style.height = ExpressCraft.Helper.ToHtmlValue(height);
                },
                ToHtmlValue: function (value) {
                    if (Bridge.is(value, System.String)) {
                        return value;
                    } else {
                        if (Bridge.is(value, System.Int32)) {
                            return ExpressCraft.Helper.ToPx(Bridge.box(value, System.Int32));
                        } else {
                            return ExpressCraft.Helper.ToPx(Bridge.box(value, System.Single, System.Single.format, System.Single.getHashCode));
                        }
                    }
                },
                SetImage$1: function (c, str, useURL) {
                    if (useURL === void 0) { useURL = true; }
                    if (!System.String.startsWith(str, "url(")) {
                        str = useURL ? ExpressCraft.Control.GetImageStringURI(str) : ExpressCraft.Control.GetImageString(str);
                    }
                    ExpressCraft.Helper.SetImage(c.Content, str, useURL);
                },
                SetImage: function (c, str, useURL) {
                    if (useURL === void 0) { useURL = true; }
                    if (System.String.isNullOrWhiteSpace(str)) {
                        c.style.background = "";
                        c.style.backgroundSize = "";
                        return;
                    } else if (!System.String.startsWith(str, "url(")) {
                        str = useURL ? ExpressCraft.Control.GetImageStringURI(str) : ExpressCraft.Control.GetImageString(str);
                    }
                    c.style.background = str;
                    c.style.backgroundSize = "100% 100%";
                },
                SetLocation$2: function (c, left, top) {
                    ExpressCraft.Helper.SetLocation(c.Content, ExpressCraft.Helper.ToPx(Bridge.box(left, System.Int32)), ExpressCraft.Helper.ToPx(Bridge.box(top, System.Int32)));
                },
                SetLocation$1: function (c, left, top) {
                    ExpressCraft.Helper.SetLocation(c.Content, left, top);
                },
                SetLocation: function (c, left, top) {
                    c.style.left = ExpressCraft.Helper.ToHtmlValue(left);
                    c.style.top = ExpressCraft.Helper.ToHtmlValue(top);
                },
                /**
                 * HtmlEscape XSS
                 *
                 * @static
                 * @public
                 * @this ExpressCraft.Helper
                 * @memberof ExpressCraft.Helper
                 * @param   {System.Object}    obj
                 * @return  {string}
                 */
                HtmlEscape: function (obj) {
                    return ExpressCraft.Helper.HtmlEscape$1((Bridge.as(obj, System.String)));
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
                HtmlEscape$1: function (input) {
                    return !System.String.isNullOrEmpty(input) ? System.String.replaceAll(System.String.replaceAll(ExpressCraft.Helper.HtmlUrlEscape(input), "\\/", "&#x2F"), "\"", "&quot") : "";
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
                HtmlUrlUnescape: function (input) {
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
                HtmlUrlEscape: function (input) {
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
                HtmlUnescape: function (input) {
                    return !System.String.isNullOrEmpty(input) ? System.String.replaceAll(System.String.replaceAll(ExpressCraft.Helper.HtmlUrlUnescape(input), "&#x2F", "\\/"), "&quot", "\"") : "";
                },
                ExchangeClass$1: function (control, oldClass, newClass) {
                    ExpressCraft.Helper.ExchangeClass(control.Content, oldClass, newClass);

                },
                ExchangeClass: function (control, oldClass, newClass) {
                    if (control.classList.contains(oldClass)) {
                        control.classList.remove(oldClass);
                    }
                    if (!control.classList.contains(newClass)) {
                        control.classList.add(newClass);
                    }
                },
                IsEmpty: function (value) {
                    return System.String.isNullOrWhiteSpace(value);
                },
                StopAndLog: function (sw, logName) {
                    if (logName === void 0) { logName = "Task"; }
                    sw.stop();
                    ExpressCraft.ConsoleForm.Log(System.String.concat(logName, " took ", sw.milliseconds(), "ms to finish"));
                }
            }
        }
    });

    Bridge.define("ExpressCraft.Helper.DataTableJson", {
        statics: {
            methods: {
                FromExternal: function (o) {
                    var x;
                    x = Bridge.merge(Bridge.createInstance(ExpressCraft.Helper.DataTableJson), o);
                    return x;
                },
                Parse: function (o) {
                    var $t, $t1, $t2;
                    var dt = new ExpressCraft.DataTable();
                    var length = o.fieldNames.length;
                    for (var i = 0; i < length; i = (i + 1) | 0) {
                        dt.AddColumn(($t = o.fieldNames)[System.Array.index(i, $t)], ($t1 = o.dataTypes)[System.Array.index(i, $t1)]);
                    }
                    if (o.rows != null) {
                        length = o.rows.length;
                        dt.BeginNewRow(length);

                        for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                            var dr = dt.NewRow();
                            dr.batchData = ($t2 = o.rows)[System.Array.index(i1, $t2)];
                        }
                        dt.AcceptNewRows();
                    }
                    return dt;
                }
            }
        },
        fields: {
            fieldNames: null,
            rows: null,
            dataTypes: null
        },
        methods: {
            ToTable: function () {
                var dt = new ExpressCraft.DataTable();

                for (var i = 0; i < this.fieldNames.length; i = (i + 1) | 0) {
                    dt.AddColumn(this.fieldNames[System.Array.index(i, this.fieldNames)], this.dataTypes[System.Array.index(i, this.dataTypes)]);
                }

                if (this.rows != null) {
                    dt.BeginNewRow(this.rows.length);

                    for (var i1 = 0; i1 < this.rows.length; i1 = (i1 + 1) | 0) {
                        var dr = dt.NewRow();
                        dr.batchData = this.rows[System.Array.index(i1, this.rows)];
                    }
                    dt.AcceptNewRows();
                }

                return dt;
            }
        }
    });

    Bridge.define("ExpressCraft.IndexValue$1", function (T) { return {
        fields: {
            Index: 0,
            Value: Bridge.getDefaultValue(T)
        },
        ctors: {
            ctor: function (index, value) {
                this.$initialize();
                this.Index = index;
                this.Value = value;
            }
        }
    }; });

    Bridge.define("ExpressCraft.KeyCodes", {
        statics: {
            fields: {
                Modifiers: 0,
                None: 0,
                LButton: 0,
                RButton: 0,
                Cancel: 0,
                MButton: 0,
                XButton1: 0,
                XButton2: 0,
                Back: 0,
                Tab: 0,
                LineFeed: 0,
                Clear: 0,
                Return: 0,
                Enter: 0,
                ShiftKey: 0,
                ControlKey: 0,
                Menu: 0,
                Pause: 0,
                Capital: 0,
                CapsLock: 0,
                KanaMode: 0,
                HanguelMode: 0,
                HangulMode: 0,
                JunjaMode: 0,
                FinalMode: 0,
                HanjaMode: 0,
                KanjiMode: 0,
                Escape: 0,
                IMEConvert: 0,
                IMENonconvert: 0,
                IMEAccept: 0,
                IMEAceept: 0,
                IMEModeChange: 0,
                Space: 0,
                Prior: 0,
                PageUp: 0,
                Next: 0,
                PageDown: 0,
                End: 0,
                Home: 0,
                Left: 0,
                Up: 0,
                Right: 0,
                Down: 0,
                Select: 0,
                Print: 0,
                Execute: 0,
                Snapshot: 0,
                PrintScreen: 0,
                Insert: 0,
                Delete: 0,
                Help: 0,
                D0: 0,
                D1: 0,
                D2: 0,
                D3: 0,
                D4: 0,
                D5: 0,
                D6: 0,
                D7: 0,
                D8: 0,
                D9: 0,
                A: 0,
                B: 0,
                C: 0,
                D: 0,
                E: 0,
                F: 0,
                G: 0,
                H: 0,
                I: 0,
                J: 0,
                K: 0,
                L: 0,
                M: 0,
                N: 0,
                O: 0,
                P: 0,
                Q: 0,
                R: 0,
                S: 0,
                T: 0,
                U: 0,
                V: 0,
                W: 0,
                X: 0,
                Y: 0,
                Z: 0,
                LWin: 0,
                RWin: 0,
                Apps: 0,
                Sleep: 0,
                NumPad0: 0,
                NumPad1: 0,
                NumPad2: 0,
                NumPad3: 0,
                NumPad4: 0,
                NumPad5: 0,
                NumPad6: 0,
                NumPad7: 0,
                NumPad8: 0,
                NumPad9: 0,
                Multiply: 0,
                Add: 0,
                Separator: 0,
                Subtract: 0,
                Decimal: 0,
                Divide: 0,
                F1: 0,
                F2: 0,
                F3: 0,
                F4: 0,
                F5: 0,
                F6: 0,
                F7: 0,
                F8: 0,
                F9: 0,
                F10: 0,
                F11: 0,
                F12: 0,
                F13: 0,
                F14: 0,
                F15: 0,
                F16: 0,
                F17: 0,
                F18: 0,
                F19: 0,
                F20: 0,
                F21: 0,
                F22: 0,
                F23: 0,
                F24: 0,
                NumLock: 0,
                Scroll: 0,
                LShiftKey: 0,
                RShiftKey: 0,
                LControlKey: 0,
                RControlKey: 0,
                LMenu: 0,
                RMenu: 0,
                BrowserBack: 0,
                BrowserForward: 0,
                BrowserRefresh: 0,
                BrowserStop: 0,
                BrowserSearch: 0,
                BrowserFavorites: 0,
                BrowserHome: 0,
                VolumeMute: 0,
                VolumeDown: 0,
                VolumeUp: 0,
                MediaNextTrack: 0,
                MediaPreviousTrack: 0,
                MediaStop: 0,
                MediaPlayPause: 0,
                LaunchMail: 0,
                SelectMedia: 0,
                LaunchApplication1: 0,
                LaunchApplication2: 0,
                OemSemicolon: 0,
                Oem1: 0,
                Oemplus: 0,
                Oemcomma: 0,
                OemMinus: 0,
                OemPeriod: 0,
                OemQuestion: 0,
                Oem2: 0,
                Oemtilde: 0,
                Oem3: 0,
                OemOpenBrackets: 0,
                Oem4: 0,
                OemPipe: 0,
                Oem5: 0,
                OemCloseBrackets: 0,
                Oem6: 0,
                OemQuotes: 0,
                Oem7: 0,
                Oem8: 0,
                OemBackslash: 0,
                Oem102: 0,
                ProcessKey: 0,
                Packet: 0,
                Attn: 0,
                Crsel: 0,
                Exsel: 0,
                EraseEof: 0,
                Play: 0,
                Zoom: 0,
                NoName: 0,
                Pa1: 0,
                OemClear: 0,
                KeyCode: 0,
                Shift: 0,
                Control: 0,
                Alt: 0
            },
            ctors: {
                init: function () {
                    this.Modifiers = -65536;
                    this.None = 0;
                    this.LButton = 1;
                    this.RButton = 2;
                    this.Cancel = 3;
                    this.MButton = 4;
                    this.XButton1 = 5;
                    this.XButton2 = 6;
                    this.Back = 8;
                    this.Tab = 9;
                    this.LineFeed = 10;
                    this.Clear = 12;
                    this.Return = 13;
                    this.Enter = 13;
                    this.ShiftKey = 16;
                    this.ControlKey = 17;
                    this.Menu = 18;
                    this.Pause = 19;
                    this.Capital = 20;
                    this.CapsLock = 20;
                    this.KanaMode = 21;
                    this.HanguelMode = 21;
                    this.HangulMode = 21;
                    this.JunjaMode = 23;
                    this.FinalMode = 24;
                    this.HanjaMode = 25;
                    this.KanjiMode = 25;
                    this.Escape = 27;
                    this.IMEConvert = 28;
                    this.IMENonconvert = 29;
                    this.IMEAccept = 30;
                    this.IMEAceept = 30;
                    this.IMEModeChange = 31;
                    this.Space = 32;
                    this.Prior = 33;
                    this.PageUp = 33;
                    this.Next = 34;
                    this.PageDown = 34;
                    this.End = 35;
                    this.Home = 36;
                    this.Left = 37;
                    this.Up = 38;
                    this.Right = 39;
                    this.Down = 40;
                    this.Select = 41;
                    this.Print = 42;
                    this.Execute = 43;
                    this.Snapshot = 44;
                    this.PrintScreen = 44;
                    this.Insert = 45;
                    this.Delete = 46;
                    this.Help = 47;
                    this.D0 = 48;
                    this.D1 = 49;
                    this.D2 = 50;
                    this.D3 = 51;
                    this.D4 = 52;
                    this.D5 = 53;
                    this.D6 = 54;
                    this.D7 = 55;
                    this.D8 = 56;
                    this.D9 = 57;
                    this.A = 65;
                    this.B = 66;
                    this.C = 67;
                    this.D = 68;
                    this.E = 69;
                    this.F = 70;
                    this.G = 71;
                    this.H = 72;
                    this.I = 73;
                    this.J = 74;
                    this.K = 75;
                    this.L = 76;
                    this.M = 77;
                    this.N = 78;
                    this.O = 79;
                    this.P = 80;
                    this.Q = 81;
                    this.R = 82;
                    this.S = 83;
                    this.T = 84;
                    this.U = 85;
                    this.V = 86;
                    this.W = 87;
                    this.X = 88;
                    this.Y = 89;
                    this.Z = 90;
                    this.LWin = 91;
                    this.RWin = 92;
                    this.Apps = 93;
                    this.Sleep = 95;
                    this.NumPad0 = 96;
                    this.NumPad1 = 97;
                    this.NumPad2 = 98;
                    this.NumPad3 = 99;
                    this.NumPad4 = 100;
                    this.NumPad5 = 101;
                    this.NumPad6 = 102;
                    this.NumPad7 = 103;
                    this.NumPad8 = 104;
                    this.NumPad9 = 105;
                    this.Multiply = 106;
                    this.Add = 107;
                    this.Separator = 108;
                    this.Subtract = 109;
                    this.Decimal = 110;
                    this.Divide = 111;
                    this.F1 = 112;
                    this.F2 = 113;
                    this.F3 = 114;
                    this.F4 = 115;
                    this.F5 = 116;
                    this.F6 = 117;
                    this.F7 = 118;
                    this.F8 = 119;
                    this.F9 = 120;
                    this.F10 = 121;
                    this.F11 = 122;
                    this.F12 = 123;
                    this.F13 = 124;
                    this.F14 = 125;
                    this.F15 = 126;
                    this.F16 = 127;
                    this.F17 = 128;
                    this.F18 = 129;
                    this.F19 = 130;
                    this.F20 = 131;
                    this.F21 = 132;
                    this.F22 = 133;
                    this.F23 = 134;
                    this.F24 = 135;
                    this.NumLock = 144;
                    this.Scroll = 145;
                    this.LShiftKey = 160;
                    this.RShiftKey = 161;
                    this.LControlKey = 162;
                    this.RControlKey = 163;
                    this.LMenu = 164;
                    this.RMenu = 165;
                    this.BrowserBack = 166;
                    this.BrowserForward = 167;
                    this.BrowserRefresh = 168;
                    this.BrowserStop = 169;
                    this.BrowserSearch = 170;
                    this.BrowserFavorites = 171;
                    this.BrowserHome = 172;
                    this.VolumeMute = 173;
                    this.VolumeDown = 174;
                    this.VolumeUp = 175;
                    this.MediaNextTrack = 176;
                    this.MediaPreviousTrack = 177;
                    this.MediaStop = 178;
                    this.MediaPlayPause = 179;
                    this.LaunchMail = 180;
                    this.SelectMedia = 181;
                    this.LaunchApplication1 = 182;
                    this.LaunchApplication2 = 183;
                    this.OemSemicolon = 186;
                    this.Oem1 = 186;
                    this.Oemplus = 187;
                    this.Oemcomma = 188;
                    this.OemMinus = 189;
                    this.OemPeriod = 190;
                    this.OemQuestion = 191;
                    this.Oem2 = 191;
                    this.Oemtilde = 192;
                    this.Oem3 = 192;
                    this.OemOpenBrackets = 219;
                    this.Oem4 = 219;
                    this.OemPipe = 220;
                    this.Oem5 = 220;
                    this.OemCloseBrackets = 221;
                    this.Oem6 = 221;
                    this.OemQuotes = 222;
                    this.Oem7 = 222;
                    this.Oem8 = 223;
                    this.OemBackslash = 226;
                    this.Oem102 = 226;
                    this.ProcessKey = 229;
                    this.Packet = 231;
                    this.Attn = 246;
                    this.Crsel = 247;
                    this.Exsel = 248;
                    this.EraseEof = 249;
                    this.Play = 250;
                    this.Zoom = 251;
                    this.NoName = 252;
                    this.Pa1 = 253;
                    this.OemClear = 254;
                    this.KeyCode = 65535;
                    this.Shift = 65536;
                    this.Control = 131072;
                    this.Alt = 262144;
                }
            }
        }
    });

    Bridge.define("ExpressCraft.KnownColor", {
        $kind: "enum",
        statics: {
            fields: {
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
        }
    });

    Bridge.define("ExpressCraft.KnownColorTable", {
        statics: {
            fields: {
                AlphaShift: 0,
                BlueShift: 0,
                colorNameTable: null,
                colorTable: null,
                GreenShift: 0,
                RedShift: 0,
                Win32BlueShift: 0,
                Win32GreenShift: 0,
                Win32RedShift: 0
            },
            ctors: {
                init: function () {
                    this.AlphaShift = 24;
                    this.BlueShift = 0;
                    this.GreenShift = 8;
                    this.RedShift = 16;
                    this.Win32BlueShift = 16;
                    this.Win32GreenShift = 8;
                    this.Win32RedShift = 0;
                }
            },
            methods: {
                ArgbToKnownColor: function (targetARGB) {
                    ExpressCraft.KnownColorTable.EnsureColorTable();
                    for (var i = 0; i < ExpressCraft.KnownColorTable.colorTable.length; i = (i + 1) | 0) {
                        var num2 = ExpressCraft.KnownColorTable.colorTable[System.Array.index(i, ExpressCraft.KnownColorTable.colorTable)];
                        if (num2 === targetARGB) {
                            var color = ExpressCraft.Color.FromKnownColor(i);
                            if (!color.IsSystemColor) {
                                return color.$clone();
                            }
                        }
                    }
                    return ExpressCraft.Color.FromArgb(targetARGB);
                },
                Encode: function (alpha, red, green, blue) {
                    return ((((red << 16) | (green << 8)) | blue) | (alpha << 24));
                },
                EnsureColorNameTable: function () {
                    if (ExpressCraft.KnownColorTable.colorNameTable == null) {
                        ExpressCraft.KnownColorTable.InitColorNameTable();
                    }
                },
                EnsureColorTable: function () {
                    if (ExpressCraft.KnownColorTable.colorTable == null) {
                        ExpressCraft.KnownColorTable.InitColorTable();
                    }
                },
                FromWin32Value: function (value) {
                    return ExpressCraft.KnownColorTable.Encode(255, value & 255, (value >> 8) & 255, (value >> 16) & 255);
                },
                InitColorNameTable: function () {
                    var s = System.Array.init(175, null, System.String);
                    s[System.Array.index(1, s)] = "ActiveBorder";
                    s[System.Array.index(2, s)] = "ActiveCaption";
                    s[System.Array.index(3, s)] = "ActiveCaptionText";
                    s[System.Array.index(4, s)] = "AppWorkspace";
                    s[System.Array.index(168, s)] = "ButtonFace";
                    s[System.Array.index(169, s)] = "ButtonHighlight";
                    s[System.Array.index(170, s)] = "ButtonShadow";
                    s[System.Array.index(5, s)] = "Control";
                    s[System.Array.index(6, s)] = "ControlDark";
                    s[System.Array.index(7, s)] = "ControlDarkDark";
                    s[System.Array.index(8, s)] = "ControlLight";
                    s[System.Array.index(9, s)] = "ControlLightLight";
                    s[System.Array.index(10, s)] = "ControlText";
                    s[System.Array.index(11, s)] = "Desktop";
                    s[System.Array.index(171, s)] = "GradientActiveCaption";
                    s[System.Array.index(172, s)] = "GradientInactiveCaption";
                    s[System.Array.index(12, s)] = "GrayText";
                    s[System.Array.index(13, s)] = "Highlight";
                    s[System.Array.index(14, s)] = "HighlightText";
                    s[System.Array.index(15, s)] = "HotTrack";
                    s[System.Array.index(16, s)] = "InactiveBorder";
                    s[System.Array.index(17, s)] = "InactiveCaption";
                    s[System.Array.index(18, s)] = "InactiveCaptionText";
                    s[System.Array.index(19, s)] = "Info";
                    s[System.Array.index(20, s)] = "InfoText";
                    s[System.Array.index(21, s)] = "Menu";
                    s[System.Array.index(173, s)] = "MenuBar";
                    s[System.Array.index(174, s)] = "MenuHighlight";
                    s[System.Array.index(22, s)] = "MenuText";
                    s[System.Array.index(23, s)] = "ScrollBar";
                    s[System.Array.index(24, s)] = "Window";
                    s[System.Array.index(25, s)] = "WindowFrame";
                    s[System.Array.index(26, s)] = "WindowText";
                    s[System.Array.index(27, s)] = "Transparent";
                    s[System.Array.index(28, s)] = "AliceBlue";
                    s[System.Array.index(29, s)] = "AntiqueWhite";
                    s[System.Array.index(30, s)] = "Aqua";
                    s[System.Array.index(31, s)] = "Aquamarine";
                    s[System.Array.index(32, s)] = "Azure";
                    s[System.Array.index(33, s)] = "Beige";
                    s[System.Array.index(34, s)] = "Bisque";
                    s[System.Array.index(35, s)] = "Black";
                    s[System.Array.index(36, s)] = "BlanchedAlmond";
                    s[System.Array.index(37, s)] = "Blue";
                    s[System.Array.index(38, s)] = "BlueViolet";
                    s[System.Array.index(39, s)] = "Brown";
                    s[System.Array.index(40, s)] = "BurlyWood";
                    s[System.Array.index(41, s)] = "CadetBlue";
                    s[System.Array.index(42, s)] = "Chartreuse";
                    s[System.Array.index(43, s)] = "Chocolate";
                    s[System.Array.index(44, s)] = "Coral";
                    s[System.Array.index(45, s)] = "CornflowerBlue";
                    s[System.Array.index(46, s)] = "Cornsilk";
                    s[System.Array.index(47, s)] = "Crimson";
                    s[System.Array.index(48, s)] = "Cyan";
                    s[System.Array.index(49, s)] = "DarkBlue";
                    s[System.Array.index(50, s)] = "DarkCyan";
                    s[System.Array.index(51, s)] = "DarkGoldenrod";
                    s[System.Array.index(52, s)] = "DarkGray";
                    s[System.Array.index(53, s)] = "DarkGreen";
                    s[System.Array.index(54, s)] = "DarkKhaki";
                    s[System.Array.index(55, s)] = "DarkMagenta";
                    s[System.Array.index(56, s)] = "DarkOliveGreen";
                    s[System.Array.index(57, s)] = "DarkOrange";
                    s[System.Array.index(58, s)] = "DarkOrchid";
                    s[System.Array.index(59, s)] = "DarkRed";
                    s[System.Array.index(60, s)] = "DarkSalmon";
                    s[System.Array.index(61, s)] = "DarkSeaGreen";
                    s[System.Array.index(62, s)] = "DarkSlateBlue";
                    s[System.Array.index(63, s)] = "DarkSlateGray";
                    s[System.Array.index(64, s)] = "DarkTurquoise";
                    s[System.Array.index(65, s)] = "DarkViolet";
                    s[System.Array.index(66, s)] = "DeepPink";
                    s[System.Array.index(67, s)] = "DeepSkyBlue";
                    s[System.Array.index(68, s)] = "DimGray";
                    s[System.Array.index(69, s)] = "DodgerBlue";
                    s[System.Array.index(70, s)] = "Firebrick";
                    s[System.Array.index(71, s)] = "FloralWhite";
                    s[System.Array.index(72, s)] = "ForestGreen";
                    s[System.Array.index(73, s)] = "Fuchsia";
                    s[System.Array.index(74, s)] = "Gainsboro";
                    s[System.Array.index(75, s)] = "GhostWhite";
                    s[System.Array.index(76, s)] = "Gold";
                    s[System.Array.index(77, s)] = "Goldenrod";
                    s[System.Array.index(78, s)] = "Gray";
                    s[System.Array.index(79, s)] = "Green";
                    s[System.Array.index(80, s)] = "GreenYellow";
                    s[System.Array.index(81, s)] = "Honeydew";
                    s[System.Array.index(82, s)] = "HotPink";
                    s[System.Array.index(83, s)] = "IndianRed";
                    s[System.Array.index(84, s)] = "Indigo";
                    s[System.Array.index(85, s)] = "Ivory";
                    s[System.Array.index(86, s)] = "Khaki";
                    s[System.Array.index(87, s)] = "Lavender";
                    s[System.Array.index(88, s)] = "LavenderBlush";
                    s[System.Array.index(89, s)] = "LawnGreen";
                    s[System.Array.index(90, s)] = "LemonChiffon";
                    s[System.Array.index(91, s)] = "LightBlue";
                    s[System.Array.index(92, s)] = "LightCoral";
                    s[System.Array.index(93, s)] = "LightCyan";
                    s[System.Array.index(94, s)] = "LightGoldenrodYellow";
                    s[System.Array.index(95, s)] = "LightGray";
                    s[System.Array.index(96, s)] = "LightGreen";
                    s[System.Array.index(97, s)] = "LightPink";
                    s[System.Array.index(98, s)] = "LightSalmon";
                    s[System.Array.index(99, s)] = "LightSeaGreen";
                    s[System.Array.index(100, s)] = "LightSkyBlue";
                    s[System.Array.index(101, s)] = "LightSlateGray";
                    s[System.Array.index(102, s)] = "LightSteelBlue";
                    s[System.Array.index(103, s)] = "LightYellow";
                    s[System.Array.index(104, s)] = "Lime";
                    s[System.Array.index(105, s)] = "LimeGreen";
                    s[System.Array.index(106, s)] = "Linen";
                    s[System.Array.index(107, s)] = "Magenta";
                    s[System.Array.index(108, s)] = "Maroon";
                    s[System.Array.index(109, s)] = "MediumAquamarine";
                    s[System.Array.index(110, s)] = "MediumBlue";
                    s[System.Array.index(111, s)] = "MediumOrchid";
                    s[System.Array.index(112, s)] = "MediumPurple";
                    s[System.Array.index(113, s)] = "MediumSeaGreen";
                    s[System.Array.index(114, s)] = "MediumSlateBlue";
                    s[System.Array.index(115, s)] = "MediumSpringGreen";
                    s[System.Array.index(116, s)] = "MediumTurquoise";
                    s[System.Array.index(117, s)] = "MediumVioletRed";
                    s[System.Array.index(118, s)] = "MidnightBlue";
                    s[System.Array.index(119, s)] = "MintCream";
                    s[System.Array.index(120, s)] = "MistyRose";
                    s[System.Array.index(121, s)] = "Moccasin";
                    s[System.Array.index(122, s)] = "NavajoWhite";
                    s[System.Array.index(123, s)] = "Navy";
                    s[System.Array.index(124, s)] = "OldLace";
                    s[System.Array.index(125, s)] = "Olive";
                    s[System.Array.index(126, s)] = "OliveDrab";
                    s[System.Array.index(127, s)] = "Orange";
                    s[System.Array.index(128, s)] = "OrangeRed";
                    s[System.Array.index(129, s)] = "Orchid";
                    s[System.Array.index(130, s)] = "PaleGoldenrod";
                    s[System.Array.index(131, s)] = "PaleGreen";
                    s[System.Array.index(132, s)] = "PaleTurquoise";
                    s[System.Array.index(133, s)] = "PaleVioletRed";
                    s[System.Array.index(134, s)] = "PapayaWhip";
                    s[System.Array.index(135, s)] = "PeachPuff";
                    s[System.Array.index(136, s)] = "Peru";
                    s[System.Array.index(137, s)] = "Pink";
                    s[System.Array.index(138, s)] = "Plum";
                    s[System.Array.index(139, s)] = "PowderBlue";
                    s[System.Array.index(140, s)] = "Purple";
                    s[System.Array.index(141, s)] = "Red";
                    s[System.Array.index(142, s)] = "RosyBrown";
                    s[System.Array.index(143, s)] = "RoyalBlue";
                    s[System.Array.index(144, s)] = "SaddleBrown";
                    s[System.Array.index(145, s)] = "Salmon";
                    s[System.Array.index(146, s)] = "SandyBrown";
                    s[System.Array.index(147, s)] = "SeaGreen";
                    s[System.Array.index(148, s)] = "SeaShell";
                    s[System.Array.index(149, s)] = "Sienna";
                    s[System.Array.index(150, s)] = "Silver";
                    s[System.Array.index(151, s)] = "SkyBlue";
                    s[System.Array.index(152, s)] = "SlateBlue";
                    s[System.Array.index(153, s)] = "SlateGray";
                    s[System.Array.index(154, s)] = "Snow";
                    s[System.Array.index(155, s)] = "SpringGreen";
                    s[System.Array.index(156, s)] = "SteelBlue";
                    s[System.Array.index(157, s)] = "Tan";
                    s[System.Array.index(158, s)] = "Teal";
                    s[System.Array.index(159, s)] = "Thistle";
                    s[System.Array.index(160, s)] = "Tomato";
                    s[System.Array.index(161, s)] = "Turquoise";
                    s[System.Array.index(162, s)] = "Violet";
                    s[System.Array.index(163, s)] = "Wheat";
                    s[System.Array.index(164, s)] = "White";
                    s[System.Array.index(165, s)] = "WhiteSmoke";
                    s[System.Array.index(166, s)] = "Yellow";
                    s[System.Array.index(167, s)] = "YellowGreen";
                    ExpressCraft.KnownColorTable.colorNameTable = s;
                },
                InitColorTable: function () {
                    var c = System.Array.init(175, 0, System.Int32);

                    c[System.Array.index(27, c)] = 16777215;
                    c[System.Array.index(28, c)] = -984833;
                    c[System.Array.index(29, c)] = -332841;
                    c[System.Array.index(30, c)] = -16711681;
                    c[System.Array.index(31, c)] = -8388652;
                    c[System.Array.index(32, c)] = -983041;
                    c[System.Array.index(33, c)] = -657956;
                    c[System.Array.index(34, c)] = -6972;
                    c[System.Array.index(35, c)] = -16777216;
                    c[System.Array.index(36, c)] = -5171;
                    c[System.Array.index(37, c)] = -16776961;
                    c[System.Array.index(38, c)] = -7722014;
                    c[System.Array.index(39, c)] = -5952982;
                    c[System.Array.index(40, c)] = -2180985;
                    c[System.Array.index(41, c)] = -10510688;
                    c[System.Array.index(42, c)] = -8388864;
                    c[System.Array.index(43, c)] = -2987746;
                    c[System.Array.index(44, c)] = -32944;
                    c[System.Array.index(45, c)] = -10185235;
                    c[System.Array.index(46, c)] = -1828;
                    c[System.Array.index(47, c)] = -2354116;
                    c[System.Array.index(48, c)] = -16711681;
                    c[System.Array.index(49, c)] = -16777077;
                    c[System.Array.index(50, c)] = -16741493;
                    c[System.Array.index(51, c)] = -4684277;
                    c[System.Array.index(52, c)] = -5658199;
                    c[System.Array.index(53, c)] = -16751616;
                    c[System.Array.index(54, c)] = -4343957;
                    c[System.Array.index(55, c)] = -7667573;
                    c[System.Array.index(56, c)] = -11179217;
                    c[System.Array.index(57, c)] = -29696;
                    c[System.Array.index(58, c)] = -6737204;
                    c[System.Array.index(59, c)] = -7667712;
                    c[System.Array.index(60, c)] = -1468806;
                    c[System.Array.index(61, c)] = -7357301;
                    c[System.Array.index(62, c)] = -12042869;
                    c[System.Array.index(63, c)] = -13676721;
                    c[System.Array.index(64, c)] = -16724271;
                    c[System.Array.index(65, c)] = -7077677;
                    c[System.Array.index(66, c)] = -60269;
                    c[System.Array.index(67, c)] = -16728065;
                    c[System.Array.index(68, c)] = -9868951;
                    c[System.Array.index(69, c)] = -14774017;
                    c[System.Array.index(70, c)] = -5103070;
                    c[System.Array.index(71, c)] = -1296;
                    c[System.Array.index(72, c)] = -14513374;
                    c[System.Array.index(73, c)] = -65281;
                    c[System.Array.index(74, c)] = -2302756;
                    c[System.Array.index(75, c)] = -460545;
                    c[System.Array.index(76, c)] = -10496;
                    c[System.Array.index(77, c)] = -2448096;
                    c[System.Array.index(78, c)] = -8355712;
                    c[System.Array.index(79, c)] = -16744448;
                    c[System.Array.index(80, c)] = -5374161;
                    c[System.Array.index(81, c)] = -983056;
                    c[System.Array.index(82, c)] = -38476;
                    c[System.Array.index(83, c)] = -3318692;
                    c[System.Array.index(84, c)] = -11861886;
                    c[System.Array.index(85, c)] = -16;
                    c[System.Array.index(86, c)] = -989556;
                    c[System.Array.index(87, c)] = -1644806;
                    c[System.Array.index(88, c)] = -3851;
                    c[System.Array.index(89, c)] = -8586240;
                    c[System.Array.index(90, c)] = -1331;
                    c[System.Array.index(91, c)] = -5383962;
                    c[System.Array.index(92, c)] = -1015680;
                    c[System.Array.index(93, c)] = -2031617;
                    c[System.Array.index(94, c)] = -329006;
                    c[System.Array.index(95, c)] = -2894893;
                    c[System.Array.index(96, c)] = -7278960;
                    c[System.Array.index(97, c)] = -18751;
                    c[System.Array.index(98, c)] = -24454;
                    c[System.Array.index(99, c)] = -14634326;
                    c[System.Array.index(100, c)] = -7876870;
                    c[System.Array.index(101, c)] = -8943463;
                    c[System.Array.index(102, c)] = -5192482;
                    c[System.Array.index(103, c)] = -32;
                    c[System.Array.index(104, c)] = -16711936;
                    c[System.Array.index(105, c)] = -13447886;
                    c[System.Array.index(106, c)] = -331546;
                    c[System.Array.index(107, c)] = -65281;
                    c[System.Array.index(108, c)] = -8388608;
                    c[System.Array.index(109, c)] = -10039894;
                    c[System.Array.index(110, c)] = -16777011;
                    c[System.Array.index(111, c)] = -4565549;
                    c[System.Array.index(112, c)] = -7114533;
                    c[System.Array.index(113, c)] = -12799119;
                    c[System.Array.index(114, c)] = -8689426;
                    c[System.Array.index(115, c)] = -16713062;
                    c[System.Array.index(116, c)] = -12004916;
                    c[System.Array.index(117, c)] = -3730043;
                    c[System.Array.index(118, c)] = -15132304;
                    c[System.Array.index(119, c)] = -655366;
                    c[System.Array.index(120, c)] = -6943;
                    c[System.Array.index(121, c)] = -6987;
                    c[System.Array.index(122, c)] = -8531;
                    c[System.Array.index(123, c)] = -16777088;
                    c[System.Array.index(124, c)] = -133658;
                    c[System.Array.index(125, c)] = -8355840;
                    c[System.Array.index(126, c)] = -9728477;
                    c[System.Array.index(127, c)] = -23296;
                    c[System.Array.index(128, c)] = -47872;
                    c[System.Array.index(129, c)] = -2461482;
                    c[System.Array.index(130, c)] = -1120086;
                    c[System.Array.index(131, c)] = -6751336;
                    c[System.Array.index(132, c)] = -5247250;
                    c[System.Array.index(133, c)] = -2396013;
                    c[System.Array.index(134, c)] = -4139;
                    c[System.Array.index(135, c)] = -9543;
                    c[System.Array.index(136, c)] = -3308225;
                    c[System.Array.index(137, c)] = -16181;
                    c[System.Array.index(138, c)] = -2252579;
                    c[System.Array.index(139, c)] = -5185306;
                    c[System.Array.index(140, c)] = -8388480;
                    c[System.Array.index(141, c)] = -65536;
                    c[System.Array.index(142, c)] = -4419697;
                    c[System.Array.index(143, c)] = -12490271;
                    c[System.Array.index(144, c)] = -7650029;
                    c[System.Array.index(145, c)] = -360334;
                    c[System.Array.index(146, c)] = -744352;
                    c[System.Array.index(147, c)] = -13726889;
                    c[System.Array.index(148, c)] = -2578;
                    c[System.Array.index(149, c)] = -6270419;
                    c[System.Array.index(150, c)] = -4144960;
                    c[System.Array.index(151, c)] = -7876885;
                    c[System.Array.index(152, c)] = -9807155;
                    c[System.Array.index(153, c)] = -9404272;
                    c[System.Array.index(154, c)] = -1286;
                    c[System.Array.index(155, c)] = -16711809;
                    c[System.Array.index(156, c)] = -12156236;
                    c[System.Array.index(157, c)] = -2968436;
                    c[System.Array.index(158, c)] = -16744320;
                    c[System.Array.index(159, c)] = -2572328;
                    c[System.Array.index(160, c)] = -40121;
                    c[System.Array.index(161, c)] = -12525360;
                    c[System.Array.index(162, c)] = -1146130;
                    c[System.Array.index(163, c)] = -663885;
                    c[System.Array.index(164, c)] = -1;
                    c[System.Array.index(165, c)] = -657931;
                    c[System.Array.index(166, c)] = -256;
                    c[System.Array.index(167, c)] = -6632142;
                    ExpressCraft.KnownColorTable.colorTable = c;
                },
                KnownColorToArgb: function (color) {
                    ExpressCraft.KnownColorTable.EnsureColorTable();
                    if (color <= ExpressCraft.KnownColor.MenuHighlight) {
                        return ExpressCraft.KnownColorTable.colorTable[System.Array.index(color, ExpressCraft.KnownColorTable.colorTable)];
                    }
                    return 0;
                },
                KnownColorToName: function (color) {
                    ExpressCraft.KnownColorTable.EnsureColorNameTable();
                    if (color <= ExpressCraft.KnownColor.MenuHighlight) {
                        return ExpressCraft.KnownColorTable.colorNameTable[System.Array.index(color, ExpressCraft.KnownColorTable.colorNameTable)];
                    }
                    return null;
                }
            }
        }
    });

    Bridge.define("ExpressCraft.MessageBoxButtons", {
        $kind: "enum",
        statics: {
            fields: {
                Auto: 0,
                Ok: 1,
                YesNo: 2,
                YesNoCancel: 3,
                AbortIgnoreRetry: 4
            }
        }
    });

    Bridge.define("ExpressCraft.MessageBoxLayout", {
        $kind: "enum",
        statics: {
            fields: {
                Information: 0,
                Exclamation: 1,
                Question: 2,
                Error: 3
            }
        }
    });

    Bridge.define("ExpressCraft.MouseMoveAction", {
        $kind: "enum",
        statics: {
            fields: {
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
        }
    });

    Bridge.define("ExpressCraft.Network", {
        statics: {
            methods: {
                GetAjaxOptions: function (JsonFile, Async) {
                    if (Async === void 0) { Async = true; }
                    return { async: Async, url: ExpressCraft.Settings.NetworkURL, cache: false, data: JsonFile == null ? "" : JSON.stringify(Bridge.unbox(JsonFile)), dataType: "json", contentType: "application/json", type: "POST" };
                },
                InvokeMethodUI: function (interfaceName, method, Success, Error, $arguments) {
                    if (Success === void 0) { Success = null; }
                    if (Error === void 0) { Error = null; }
                    if ($arguments === void 0) { $arguments = []; }
                    ExpressCraft.Network.PostJsonProgressForm(new ExpressCraft.Network.MethodRequest(interfaceName, method, $arguments), Success, Error);
                },
                InvokeMethodUIControl: function (interfaceName, method, progressControl, Success, Error, $arguments) {
                    if (Success === void 0) { Success = null; }
                    if (Error === void 0) { Error = null; }
                    if ($arguments === void 0) { $arguments = []; }
                    ExpressCraft.Network.PostJsonProgressControl(new ExpressCraft.Network.MethodRequest(interfaceName, method, $arguments), progressControl, Success, Error);
                },
                InvokeMethod: function (interfaceName, method, Success, Error, $arguments) {
                    if (Success === void 0) { Success = null; }
                    if (Error === void 0) { Error = null; }
                    if ($arguments === void 0) { $arguments = []; }
                    ExpressCraft.Network.PostJson(new ExpressCraft.Network.MethodRequest(interfaceName, method, $arguments), Success, Error);
                },
                PostJson: function (JsonFile, Success, Error, Async) {
                    if (Success === void 0) { Success = null; }
                    if (Error === void 0) { Error = null; }
                    if (Async === void 0) { Async = true; }
                    // lets convert the JsonFileObject to a string;			
                    var ajo = ExpressCraft.Network.GetAjaxOptions(JsonFile, Async);
                    ajo.success = Success;
                    ajo.error = Error;

                    $.ajax(ajo);
                },
                PostJsonProgressControl: function (JsonFile, progressControl, Success, Error, Async) {
                    if (Success === void 0) { Success = null; }
                    if (Error === void 0) { Error = null; }
                    if (Async === void 0) { Async = true; }
                    // lets convert the JsonFileObject to a string;			
                    var ajo = ExpressCraft.Network.GetAjaxOptions(JsonFile, Async);
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
                            pc.internalProgressControl.style.width = System.String.concat(System.Single.format(Percent), "%");
                        });

                        return xmlRequest;
                    };
                    ajo.success = Success;
                    ajo.error = Error;

                    $.ajax(ajo);
                },
                PostJsonProgressForm: function (JsonFile, Success, Error, Async) {
                    if (Success === void 0) { Success = null; }
                    if (Error === void 0) { Error = null; }
                    if (Async === void 0) { Async = true; }
                    // lets convert the JsonFileObject to a string;
                    var npf = new ExpressCraft.Network.NetworkProgressForm();

                    var ajo = ExpressCraft.Network.GetAjaxOptions(JsonFile, Async);
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
                            pc.internalProgressControl.style.width = System.String.concat(System.Single.format(Percent), "%");
                        });

                        return xmlRequest;
                    };
                    ajo.success = function (o, s, jq) {
                        npf.DialogResult = ExpressCraft.DialogResultEnum.OK;
                        Success(o, s, jq);
                    };
                    ajo.error = function (jq, s1, s2) {
                        npf.DialogResult = ExpressCraft.DialogResultEnum.Cancel;
                        Error(jq, s1, s2);
                    };
                    ajo.complete = function (jq, str) {
                        npf.Close();
                    };

                    var ajr = $.ajax(ajo);

                    npf.ShowDialog([new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.Cancel, function () {
                        ajr.abort();
                    })]);
                }
            }
        }
    });

    Bridge.define("ExpressCraft.Network.MethodRequest", {
        fields: {
            Method: null,
            Arguments: null,
            Interface: null
        },
        ctors: {
            ctor: function (interfaceName, method, $arguments) {
                if ($arguments === void 0) { $arguments = []; }

                this.$initialize();
                this.Method = method;
                this.Arguments = $arguments;
                this.Interface = interfaceName;
            }
        }
    });

    Bridge.define("ExpressCraft.PdfSourceType", {
        $kind: "enum",
        statics: {
            fields: {
                Url: 0,
                Base64: 1
            }
        }
    });

    Bridge.define("ExpressCraft.ResourceManager", {
        statics: {
            fields: {
                cacheResourceString: null
            },
            ctors: {
                init: function () {
                    this.cacheResourceString = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
                }
            },
            methods: {
                GetResourceString: function (name) {
                    var $t;
                    if (ExpressCraft.ResourceManager.cacheResourceString.containsKey(name)) {
                        return ExpressCraft.ResourceManager.cacheResourceString.get(name);
                    }
                    return (($t = ExpressCraft.Settings.GetStyleRuleValue$1(ExpressCraft.Settings.resourceManangerSheets, "content", System.String.concat(".", name)), ExpressCraft.ResourceManager.cacheResourceString.set(name, $t), $t));
                }
            }
        }
    });

    Bridge.define("ExpressCraft.RibbonControl.RibbonType", {
        $kind: "enum",
        statics: {
            fields: {
                Full: 0,
                Compact: 1
            }
        }
    });

    Bridge.define("ExpressCraft.RibbonGroup.RenderInfo", {
        fields: {
            Left: 0,
            Width: 0,
            IsSmall: false,
            FirstButton: null,
            SecondButton: null,
            ThirdButton: null,
            BeginGroup: false
        },
        ctors: {
            init: function () {
                this.IsSmall = false;
                this.BeginGroup = false;
            }
        }
    });

    Bridge.define("ExpressCraft.Settings", {
        statics: {
            fields: {
                NetworkURL: null,
                ResourceURL: null,
                AutoRender: false,
                Font: null,
                DefaultFont: null,
                DefaultStyleSheet: null,
                PluginStyleSheet: null,
                resourceManangerSheets: null,
                GridViewAutoColumnGenerateFormatAsDate: false,
                GridViewAutoColumnFormatDates: false,
                GridViewBlurOnScroll: false,
                GridViewRowScrollPadding: 0,
                GridViewScrollDelayed: false,
                GridViewScrollDelayMS: 0,
                ContextMenuStartingZIndex: 0,
                ContextMenuMinWidth: 0,
                MessageFormTextMaximumHeightInPx: 0,
                MessageFormTextMinimumHeightInPx: 0,
                MessageFormMinimumWidthInPx: 0,
                ConsoleDefaultSize: null,
                MessageFormBeep: false,
                MaximumPixelScrollingRows: 0,
                _WindowManagerVisible: false,
                IsChrome: false,
                AllowCloseWithoutQuestion: false,
                ShowExceptionDialog: false,
                FormFadeDuration: 0,
                themeElement: null,
                _includeFocusRegion: false,
                _activeTheme: null,
                themefocusValue: null,
                themeTemplate: null,
                OnF2ShowThemeForm: false,
                ToolTipPopupDelayMs: 0,
                ToolTipPopupStayOpenDelayPerWordMs: 0
            },
            props: {
                WindowManagerVisible: {
                    get: function () {
                        return ExpressCraft.Settings._WindowManagerVisible;
                    },
                    set: function (value) {
                        if (value !== ExpressCraft.Settings._WindowManagerVisible) {
                            ExpressCraft.Settings._WindowManagerVisible = value;
                            ExpressCraft.Form.SetupWindowManager();
                        }
                    }
                },
                IncludeFocusRegion: {
                    get: function () {
                        return ExpressCraft.Settings._includeFocusRegion;
                    },
                    set: function (value) {
                        if (ExpressCraft.Settings._includeFocusRegion !== value) {
                            ExpressCraft.Settings._includeFocusRegion = value;
                            ExpressCraft.Settings.ApplyActiveTheme();
                        }
                    }
                },
                ActiveTheme: {
                    get: function () {
                        return ExpressCraft.Settings._activeTheme;
                    },
                    set: function (value) {
                        if (!Bridge.referenceEquals(ExpressCraft.Settings._activeTheme, value)) {
                            ExpressCraft.Settings._activeTheme = value;
                            ExpressCraft.Settings.ApplyActiveTheme();
                        }
                    }
                }
            },
            ctors: {
                init: function () {
                    this.ConsoleDefaultSize = new ExpressCraft.Vector2();
                    this.NetworkURL = "Host.ashx";
                    this.ResourceURL = "./images/";
                    this.AutoRender = true;
                    this.Font = "8.25pt Tahoma";
                    this.DefaultFont = ExpressCraft.Settings.Font;
                    this.resourceManangerSheets = new (System.Collections.Generic.List$1(StyleSheet))();
                    this.GridViewAutoColumnGenerateFormatAsDate = false;
                    this.GridViewAutoColumnFormatDates = true;
                    this.GridViewBlurOnScroll = false;
                    this.GridViewRowScrollPadding = 0;
                    this.GridViewScrollDelayed = false;
                    this.GridViewScrollDelayMS = 25;
                    this.ContextMenuStartingZIndex = 500;
                    this.ContextMenuMinWidth = 200;
                    this.MessageFormTextMaximumHeightInPx = 500;
                    this.MessageFormTextMinimumHeightInPx = 32;
                    this.MessageFormMinimumWidthInPx = 195;
                    this.ConsoleDefaultSize = new ExpressCraft.Vector2.$ctor1(540, 240);
                    this.MessageFormBeep = false;
                    this.MaximumPixelScrollingRows = 500000;
                    this.IsChrome = Bridge.Browser.isChrome;
                    this.AllowCloseWithoutQuestion = false;
                    this.ShowExceptionDialog = true;
                    this.FormFadeDuration = 100;
                    this._includeFocusRegion = true;
                    this.themefocusValue = ".{25}:focus:not(.grid){{\r\noutline: dashed 1px {0};\r\n}}";
                    this.themeTemplate = ".{25}{{\r\n    color:{22};\r\n}}\r\n#focusLine;\r\n.{25}::selection{{\r\n{26}:{1};\r\n}}\r\n.{25}::-moz-selection{{\r\n{26}:{1};\r\n}}\r\n.{25}:disabled{{\r\n{26}:{2};\r\n}}\r\n.input{25}:read-only{{\r\n{26}:{3};\r\n}}\r\n.{28}{25}{{\r\n{26}:{0};\r\n{27}{29}:{0};\r\n{27}{31}:{0};\r\n{27}{32}:{1};\r\n}}\r\n.{28}page{{\r\n{26}:{3};\r\n}}\r\n.{28}group{{\r\n{26}:{3};\r\n}}\r\n.{28}{33}{{\r\n{26}:{3};\r\n}}\r\n.{28}{33}:hover:not(:active):not(.disabled)\r\n{{\r\n{26}:{4};\r\n}}\r\n.{28}{33}:active:not(.disabled){{\r\n{26}:{5};\r\n}}\r\n.{28}{33}small{{\r\n{26}:{3}; \r\n}}\r\n.{28}{33}small:hover:not(:active):not(.disabled)\r\n{{\r\n{26}:{4};\r\n}}\r\n.{28}{33}small:active:not(.disabled){{\r\n{26}:{5};\r\n}}\r\n.{28}seperator{{\r\n{26}:{1};\r\n}}\r\n.{28}{35}-hidden{{\r\n{26}:{0};\r\ncolor:{23};\r\n}}\r\n.{28}{35}-hidden:hover{{\r\n{26}:{6};\r\n}}\r\n.{28}{35}-active{{\r\n{26}:{3};\r\n}}\r\n.tab{25}{{\r\n{26}:{3};\r\n}}\r\n.tab{25}page{{\r\n{26}:{3};\r\n{27}{30}:{1};\r\n{27}{29}:{1};\r\n{27}{31}:{1};\r\n{27}{32}:{1};\r\n}}\r\n.tab{25}{35} {{\r\n{26}:{3};   \r\n}}\r\n.tab{25}{35}-hidden{{\r\n{27}{30}:{3};\r\n{27}{29}:{3};\r\n{27}{31}:{3};\r\n{27}{32}:{1};\r\n}}\r\n.tab{25}{35}-hidden:hover{{\r\n{26}:{7};\r\n{27}{29}:{7};\r\n{27}{31}:{7};\r\n}}\r\n.tab{25}{35}-active{{\r\n{27}{30}:{1};\r\n{27}{29}:{1};\r\n{27}{31}:{1};\r\n{27}{32}:{3};\r\n}}\r\n.tab{25}{35}-close{33}{{\r\ncolor:{1};\t\r\n}}\r\n.tab{25}{35}-close{33}:hover{{\r\ncolor:{24};\r\n\t{26}:{2};\r\n\t{27}:1px solid {19};\r\n}}\r\n.input{25} {{\r\n{27}:1px solid {1};   \r\n{26}:{14};\r\n}}\r\n.simple{33}{{\r\n{27}:1px solid {19};\r\n{26}:{3};\r\n}}\r\n.simple{33}:hover:not(.disabled)\r\n{{\r\n\t{26}:{1};\r\n}}\r\n.simple{33}:active:not(.disabled)\r\n{{\r\n\t{26}:{12};\r\n{27}: 1px solid {20};\r\n}}\r\n@keyframes ColorFlash {{\r\nfrom {{ {26}: {23};}}\r\nto {{ {26}: {0};}}\r\n}}\r\n.form-base{{\r\n{27}-color:{0};\r\n}}\r\n.{34}{{\r\n{26}:{0};  \r\n}}\r\n.{34}-title{{\r\ncolor:{23}; \r\n}}\r\n.{34}-{33}{{\r\ncolor:{23};\r\n}}\r\n.{34}-{33}:hover:not(.{34}-{33}-close){{\r\n{26}:{8};\r\n}}\r\n.{34}-{33}:active:not(.{34}-{33}-close){{\r\n{26}:{9};\r\n}}\r\n.{34}-{33}-close:hover{{\r\n{26}:{10};\r\n}}\r\n.{34}-{33}-close:active{{\r\n{26}:{11};\r\n}}\r\n.cell{{\r\n{27}: 1px solid {3};   \r\n}}\r\n.cellrow{{\r\n{26}:{14};\r\n}}\r\n.cellrow:hover{{\r\n{26}:{3} !important;\r\n}}\r\n.cellrow:active{{\r\n{26}:{12} !important;\r\n}}\r\n.even{{\r\n   {26}:{13} !important;\r\n}}\r\n.cellrow-selected{{\r\n{26}:{17} !important;\r\n}}\r\n.cellrow-selected:hover{{\r\n{26}:{18} !important;\r\n}}\r\n.{36}{{\r\n{26}:{3};\r\n{27}-right:1px solid {19} !important;\r\n}}\r\n.{36}:hover{{\r\n{26}:{1};\r\n}}\r\n.{36}:active{{\r\n{26}:{12};\r\n}}\r\n.{36}-container{{\r\n{26}:{3};\r\n{27}-bottom:1px solid {19} !important;\t\r\n}}\r\n.grid{{\r\n{26}:{14};\r\n{27}:1px solid {19}; \r\n}}\r\n.progressbar{{\r\n{27}:1px solid {19};\r\n{26}:{14};\r\n}}\r\n.progressbarbody{{\r\n{26}:{0};\r\n}}\r\n.contextmenu{{\r\n{26}:{14}; \r\n{27}: solid 1px {21};\r\n}}\r\n.contextitem:hover{{\r\n{26}:{15};\r\n}}\r\n.contextitemseperator{{\r\n{26}:{16};\r\n}}\r\n.dialog{33}section{{\r\n{26}:{3};\r\n}}\r\n.split{25}\r\n{{\r\n{27}:1px solid {19};\r\n}}\r\n.splittervertical {{\r\n{27}-left: 1px {4} solid;\r\n{27}-right: 1px {4} solid;\r\n}}\r\n.splitterhorizontal {{\r\n{27}-top: 1px {4} solid;\r\n{27}-bottom: 1px {4} solid;\r\n}}\r\n.splitterhorizontal:hover {{\r\n{26}:{4};\r\n}}\r\n.splittervertical:hover {{\r\n{26}:{4};\r\n}}\r\n.tool-tip{{\r\n{26}:{14};\r\n{27}: solid 1px {21};\r\n}}\r\n";
                    this.OnF2ShowThemeForm = true;
                    this.ToolTipPopupDelayMs = 1000;
                    this.ToolTipPopupStayOpenDelayPerWordMs = 250;
                }
            },
            methods: {
                Setup: function () {
                    ExpressCraft.Settings.ActiveTheme = ExpressCraft.Theme.Theme1;
                    ExpressCraft.Settings.SetupStyleDefaults();
                },
                SetupStyleDefaults: function () {
                    try {
                        var sheets = document.styleSheets;
                        for (var i = 0; i < sheets.length; i = (i + 1) | 0) {
                            var ownerNode = Bridge.as(sheets[System.Array.index(i, sheets)].ownerNode, HTMLLinkElement);
                            if (ownerNode == null) {
                                continue;
                            }
                            if (Bridge.referenceEquals(ownerNode.id.toLowerCase(), "expresscraft")) {
                                ExpressCraft.Settings.DefaultStyleSheet = sheets[System.Array.index(i, sheets)];
                            }
                            if (Bridge.referenceEquals(ownerNode.id.toLowerCase(), "expresscraftplugin")) {
                                ExpressCraft.Settings.PluginStyleSheet = sheets[System.Array.index(i, sheets)];
                            }
                            if (Bridge.referenceEquals(ownerNode.id.toLowerCase(), "resourcemanager")) {
                                ExpressCraft.Settings.resourceManangerSheets.add(sheets[System.Array.index(i, sheets)]);
                            }
                        }
                        if (ExpressCraft.Settings.DefaultStyleSheet == null) {
                            return;
                        }
                        var df = ExpressCraft.Settings.GetExpressStyleRuleValue("font", ".control");
                        if (df != null) {
                            ExpressCraft.Settings.DefaultFont = df;
                        }
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);

                    }

                },
                GetStyleRuleValue$1: function (cssFile, style, className) {
                    var $t;
                    try {
                        if (cssFile != null) {
                            $t = Bridge.getEnumerator(cssFile);
                            try {
                                while ($t.moveNext()) {
                                    var item = $t.Current;
                                    var value = ExpressCraft.Settings.GetStyleRuleValue(item, style, className);
                                    if (value != null) {
                                        return value;
                                    }
                                }
                            } finally {
                                if (Bridge.is($t, System.IDisposable)) {
                                    $t.System$IDisposable$dispose();
                                }
                            }}
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);

                    }
                    return null;
                },
                GetStyleRuleValue: function (cssFile, style, className) {
                    var $t, $t1;
                    try {
                        if (cssFile != null) {
                            var pStyles = cssFile;
                            if (pStyles.cssRules) {
                                for (var i = 0; i < pStyles.cssRules.length; i = (i + 1) | 0) {
                                    var rule = ($t = pStyles.cssRules)[System.Array.index(i, $t)];
                                    if (rule.selectorText && !Bridge.referenceEquals(rule.selectorText.split(44).indexOf(className), -1)) {
                                        return ($t1 = rule.style)[System.Array.index(style, $t1)];
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
                GetExpressStyleRuleValue: function (style, className) {
                    var value = ExpressCraft.Settings.GetStyleRuleValue(ExpressCraft.Settings.PluginStyleSheet, style, className);
                    if (value == null) {
                        value = ExpressCraft.Settings.GetStyleRuleValue(ExpressCraft.Settings.DefaultStyleSheet, style, className);
                    }
                    return value;
                },
                ApplyActiveTheme: function () {
                    var $t;
                    if (ExpressCraft.Settings.themeElement != null) {
                        ExpressCraft.Settings.themeElement.parentElement.removeChild(ExpressCraft.Settings.themeElement);
                    }
                    if (ExpressCraft.Settings._activeTheme == null) {
                        ExpressCraft.Settings._activeTheme = ExpressCraft.Theme.Theme1;
                    }
                    var objList = new (System.Collections.Generic.List$1(System.Object))();
                    objList.addRange(ExpressCraft.Settings._activeTheme.Colors);
                    objList.addRange(System.Array.init(["control", "background-color", "border", "ribbon", "-left-color", "-top-color", "-right-color", "-bottom-color", "button", "form-heading", "pageheader", "heading"], System.Object));


                    ExpressCraft.Settings.themeElement = ($t = document.createElement('style'), $t.innerHTML = System.String.format.apply(System.String, [System.String.replaceAll(ExpressCraft.Settings.themeTemplate, "#focusLine;", ExpressCraft.Settings._includeFocusRegion ? ExpressCraft.Settings.themefocusValue : "")].concat(objList.toArray())), $t);

                    document.body.appendChild(ExpressCraft.Settings.themeElement);
                }
            }
        }
    });

    Bridge.define("ExpressCraft.SortSetting", {
        fields: {
            Column: null,
            SortMode: 0
        }
    });

    Bridge.define("ExpressCraft.TextBlock", {
        fields: {
            OriginalSource: null,
            MaxWidth: 0,
            ComputedHeight: 0,
            LinesComputed: 0,
            ElelemtsOverMax: false,
            MaxCalculatedWidth: 0
        },
        ctors: {
            init: function () {
                this.ElelemtsOverMax = false;
                this.MaxCalculatedWidth = 0;
            },
            ctor: function (source, maxWidth) {
                this.$initialize();
                this.OriginalSource = source;
                this.MaxWidth = maxWidth;
            }
        },
        methods: {
            ComputeString: function () {
                this.ElelemtsOverMax = false;
                var Lines = System.String.split(this.OriginalSource, System.Array.init([13, 10], System.Char).map(function(i) {{ return String.fromCharCode(i); }}));

                var sizePerChar = ExpressCraft.Control.GetTextWidth("M", ExpressCraft.Settings.DefaultFont);

                this.LinesComputed = 0;

                for (var i = 0; i < Lines.length; i = (i + 1) | 0) {
                    var line = Lines[System.Array.index(i, Lines)];

                    var lineWidth = ExpressCraft.Control.GetTextWidth(this.OriginalSource, ExpressCraft.Settings.DefaultFont);

                    if (lineWidth > this.MaxWidth) {
                        this.ElelemtsOverMax = true;
                        this.MaxCalculatedWidth = this.MaxWidth;
                        var yy = 0;
                        for (var x = 0; x < line.length; x = (x + 1) | 0) {
                            yy = (yy + 1) | 0;

                            if (yy * sizePerChar > this.MaxWidth) {
                                this.LinesComputed = (this.LinesComputed + 1) | 0;
                                yy = 0;
                            }
                        }

                        if (yy > 0) {
                            this.LinesComputed = (this.LinesComputed + 1) | 0;
                        }
                    } else {
                        this.LinesComputed = (this.LinesComputed + 1) | 0;
                        if (lineWidth > this.MaxCalculatedWidth) {
                            this.MaxCalculatedWidth = lineWidth;
                        }
                    }
                }
                this.ComputedHeight = this.GetFontSize(ExpressCraft.Settings.DefaultFont) * this.LinesComputed;
            },
            GetFontSize: function (fontWithSize) {
                var strs = System.String.split(fontWithSize, System.Array.init([32], System.Char).map(function(i) {{ return String.fromCharCode(i); }}), null, 1);

                for (var i = 0; i < strs.length; i = (i + 1) | 0) {
                    if (System.String.endsWith(strs[System.Array.index(i, strs)], "pt")) {
                        return parseFloat(strs[System.Array.index(i, strs)]) * 1.333333;
                    } else if (System.String.endsWith(strs[System.Array.index(i, strs)], "px")) {
                        return parseFloat(strs[System.Array.index(i, strs)]);
                    }
                }

                return 10.9999971;
            }
        }
    });

    Bridge.define("ExpressCraft.Theme", {
        statics: {
            fields: {
                Theme1: null
            },
            ctors: {
                init: function () {
                    this.Theme1 = new ExpressCraft.Theme(["#0173C7", "#C5C5C5", "#CCCCCC", "#F0F0F0", "#C3C3C3", "#ADADAD", "#2A8AD0", "#D3D3D3", "#2A8AD4", "#015C9F", "#E81123", "#F1707A", "#AEAEAE", "#FAFAFA", "#ffffff", "#CFCFCF", "#B9B9B9", "rgba(1, 115, 199, 0.3)", "rgba(1, 115, 199, 0.5)", "#A6A6A6", "#777777", "#80868A", "#404040", "#ffffff", "#000000"]);
                }
            }
        },
        props: {
            Colors: null
        },
        ctors: {
            ctor: function (colors) {
                if (colors === void 0) { colors = []; }

                this.$initialize();
                if (colors != null && colors.length === 25) {
                    this.Colors = colors;
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
        }
    });

    Bridge.define("ExpressCraft.ToolTip", {
        fields: {
            Description: null,
            Heading: null,
            AttachedControl: null
        },
        ctors: {
            ctor: function (content) {
                this.$initialize();
                this.Description = content;
            },
            $ctor1: function (heading, description) {
                this.$initialize();
                this.Description = description;
                this.Heading = heading;
            }
        },
        methods: {
            GetWordCount: function () {
                var fullContent = System.String.concat(this.Heading, " ", this.Description).trim();
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
        }
    });

    Bridge.define("ExpressCraft.Vector2", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new ExpressCraft.Vector2(); }
            }
        },
        fields: {
            X: null,
            Y: null
        },
        props: {
            Xi: {
                get: function () {
                    return this.X;
                },
                set: function (value) {
                    this.X = value;
                }
            },
            Yi: {
                get: function () {
                    return this.Y;
                },
                set: function (value) {
                    this.Y = value;
                }
            },
            Xf: {
                get: function () {
                    return this.X;
                },
                set: function (value) {
                    this.X = value;
                }
            },
            Yf: {
                get: function () {
                    return this.Y;
                },
                set: function (value) {
                    this.Y = value;
                }
            }
        },
        ctors: {
            $ctor1: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1955977157, this.X, this.Y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, ExpressCraft.Vector2)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y);
            },
            $clone: function (to) {
                var s = to || new ExpressCraft.Vector2();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("ExpressCraft.Vector4", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new ExpressCraft.Vector4(); }
            }
        },
        fields: {
            X: null,
            Y: null,
            Z: null,
            M: null
        },
        ctors: {
            $ctor1: function (x, y, z, m) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.M = m;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1956108229, this.X, this.Y, this.Z, this.M]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, ExpressCraft.Vector4)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y) && Bridge.equals(this.Z, o.Z) && Bridge.equals(this.M, o.M);
            },
            $clone: function (to) {
                var s = to || new ExpressCraft.Vector4();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                s.M = this.M;
                return s;
            }
        }
    });

    Bridge.define("ExpressCraft.WindowState", {
        $kind: "enum",
        statics: {
            fields: {
                Normal: 0,
                Minimized: 1,
                Maximized: 2
            }
        }
    });

    Bridge.define("ExpressCraft.AceCodeEditor", {
        inherits: [ExpressCraft.Control],
        statics: {
            fields: {
                ExternalAceCodeEditor: null
            },
            ctors: {
                init: function () {
                    this.ExternalAceCodeEditor = new ExpressCraft.ExternalPlugin("https://ace.c9.io/build/src/ace.js");
                }
            },
            methods: {
                Setup: function () {
                    ExpressCraft.AceCodeEditor.ExternalAceCodeEditor.Setup();
                }
            }
        },
        fields: {
            editor: null,
            _modeType: 0,
            _themeType: 0
        },
        props: {
            ReadOnly: {
                get: function () {
                    return this.editor.getReadOnly();
                },
                set: function (value) {
                    this.editor.setReadOnly(value);
                }
            },
            Source: {
                get: function () {
                    return this.editor.getValue();
                },
                set: function (value) {
                    this.editor.setValue(value);
                }
            }
        },
        ctors: {
            ctor: function (modeType, themeType) {
                if (modeType === void 0) { modeType = 17; }
                if (themeType === void 0) { themeType = 11; }

                this.$initialize();
                ExpressCraft.Control.ctor.call(this);
                this._modeType = modeType;
                this._themeType = themeType;
            }
        },
        methods: {
            ClearSelection: function () {
                this.editor.clearSelection();
            },
            Render: function () {
                ExpressCraft.AceCodeEditor.ExternalAceCodeEditor.UsageCheck();

                var theme = System.Enum.format(ExpressCraft.AceModeTypes, this._modeType, "G");
                var mode = System.Enum.format(ExpressCraft.AceModeTypes, this._modeType, "G");

                			
                			this.editor = ace.edit(this.content);
                			this.editor.setTheme("ace/theme/" + theme);
                			this.editor.getSession().setMode("ace/mode/" + mode);	
                			
                this.OnResize = $asm.$.ExpressCraft.AceCodeEditor.f1;

                this.Content.addEventListener("mousedown", $asm.$.ExpressCraft.AceCodeEditor.f2);

                this.Content.addEventListener("mouseup", $asm.$.ExpressCraft.AceCodeEditor.f3);

                ExpressCraft.Control.prototype.Render.call(this);
            }
        }
    });

    Bridge.ns("ExpressCraft.AceCodeEditor", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.AceCodeEditor, {
        f1: function (cont) {
            				this.editor.resize(true);
            				
        },
        f2: function (ev) {
            ExpressCraft.Form.InExternalMouseEvent = true;
        },
        f3: function (ev) {
            ExpressCraft.Form.InExternalMouseEvent = false;
        }
    });

    Bridge.define("ExpressCraft.TextInput", {
        inherits: [ExpressCraft.Control],
        fields: {
            prevText: null,
            OnTextChanged: null,
            OnKeyDown: null,
            OnKeyUp: null,
            OnKeyPress: null,
            Type: "button",
            enabled: false,
            _readonly: false
        },
        props: {
            Text: {
                get: function () {
                    if (this.Type === "checkbox") {
                        return System.Boolean.toString(this.Content.checked);
                    } else {
                        return this.Content.value;
                    }
                },
                set: function (value) {
                    if (this.Type === "checkbox") {
                        value = value.toLowerCase();
                        this.Content.checked = ExpressCraft.Helper.IsTrue(value) === 1;
                    } else {
                        this.Content.value = value;
                    }


                    this.CheckTextChanged();
                }
            },
            Enabled: {
                get: function () {
                    return this.enabled;
                },
                set: function (value) {
                    this.enabled = value;
                    this.Content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
                }
            },
            Readonly: {
                get: function () {
                    return this._readonly;
                },
                set: function (value) {
                    this._readonly = value;
                    if (this._readonly) {
                        this.Content.setAttribute("readonly", System.Boolean.toString((this._readonly)));
                    } else {
                        this.Content.removeAttribute("readonly");
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this.prevText = "";
                this.enabled = true;
                this._readonly = false;
            },
            ctor: function (type, ac) {
                if (type === void 0) { type = 19; }
                if (ac === void 0) { ac = true; }

                this.$initialize();
                ExpressCraft.Control.$ctor3.call(this, "inputcontrol", type, ac);
                this.Type = type;
                this.Content.onchange = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f1);
                this.Content.oncontextmenu = $asm.$.ExpressCraft.TextInput.f2;
                this.Content.onkeypress = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f3);
                this.Content.onkeydown = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f4);
                this.Content.onkeyup = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f5);
                this.Content.addEventListener("paste", Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f6));
                this.Content.addEventListener("cut", Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f6));
            }
        },
        methods: {
            CheckTextChanged: function () {
                if (!Bridge.referenceEquals(this.Text, this.prevText)) {
                    if (!Bridge.staticEquals(this.OnTextChanged, null)) {
                        this.OnTextChanged(this);
                    }
                    this.prevText = this.Text;
                }
            },
            Render: function () {
                ExpressCraft.Control.prototype.Render.call(this);
                this.prevText = this.Text;
            },
            SetDate: function (date) {
                var obj = this.Content;

                if (date != null) {
                    var dt = { };
                    if (System.DateTime.tryParse(date, null, dt) && !Bridge.equals(dt.v, System.DateTime.getDefaultValue())) {
                        obj.value = System.DateTime.format(dt.v, "yyyy-MM-dd");
                    } else {
                        obj.value = null;
                    }
                } else {
                    obj.value = null;
                }
                //obj.value = DateTime.Parse(Convert.ToString(date)).ToString("yyyy-MM-dd");
            },
            GetDate: function () {
                var obj = this.Content;
                var str = obj.value;
                var dt = { };

                if (System.DateTime.tryParse(str, null, dt)) {
                    return System.DateTime.format(dt.v, "yyyy-MM-dd");
                } else {
                    return "0001-01-01";
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.TextInput", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.TextInput, {
        f1: function (ev) {
            this.CheckTextChanged();
        },
        f2: function (ev) {
            ev.stopPropagation();
        },
        f3: function (ev) {
            this.CheckTextChanged();
            if (!Bridge.staticEquals(this.OnKeyPress, null)) {
                this.OnKeyPress(this, ev);
            }
        },
        f4: function (ev) {
            this.CheckTextChanged();
            if (!Bridge.staticEquals(this.OnKeyDown, null)) {
                this.OnKeyDown(this, ev);
            }
        },
        f5: function (ev) {
            this.CheckTextChanged();
            if (!Bridge.staticEquals(this.OnKeyUp, null)) {
                this.OnKeyUp(this, ev);
            }
        },
        f6: function () {
            this.CheckTextChanged();
        }
    });

    Bridge.define("ExpressCraft.ComboBoxEdit", {
        inherits: [ExpressCraft.Control],
        fields: {
            ComboBoxBase: null,
            previousSelectedIndex: 0,
            SelectedIndexChanged: null,
            enabled: false,
            _readonly: false
        },
        props: {
            Text: {
                get: function () {
                    var $t;
                    if (this.ComboBoxBase.selectedIndex === -1) {
                        return "";
                    }
                    return ($t = this.ComboBoxBase.options)[System.Array.index(this.ComboBoxBase.selectedIndex, $t)].innerHTML;
                },
                set: function (value) {
                    var $t;
                    for (var i = 0; i < this.ComboBoxBase.options.length; i = (i + 1) | 0) {
                        if (Bridge.referenceEquals(($t = this.ComboBoxBase.options)[System.Array.index(i, $t)].innerHTML, value)) {
                            this.ComboBoxBase.selectedIndex = i;
                        }
                    }
                    this.ComboBoxBase.selectedIndex = -1;
                }
            },
            Value: {
                get: function () {
                    var $t;
                    if (this.ComboBoxBase.selectedIndex === -1) {
                        return "";
                    }
                    return ($t = this.ComboBoxBase.options)[System.Array.index(this.ComboBoxBase.selectedIndex, $t)].value;
                },
                set: function (value) {
                    var $t;
                    for (var i = 0; i < this.ComboBoxBase.options.length; i = (i + 1) | 0) {
                        if (Bridge.referenceEquals(($t = this.ComboBoxBase.options)[System.Array.index(i, $t)].value, value)) {
                            this.ComboBoxBase.selectedIndex = i;
                        }
                    }
                    this.ComboBoxBase.selectedIndex = -1;
                }
            },
            Enabled: {
                get: function () {
                    return this.enabled;
                },
                set: function (value) {
                    this.enabled = value;
                    this.Content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
                }
            },
            Readonly: {
                get: function () {
                    return this._readonly;
                },
                set: function (value) {
                    this._readonly = value;
                    this.Content.setAttribute("readonly", System.Boolean.toString((this._readonly)));
                }
            }
        },
        ctors: {
            init: function () {
                this.previousSelectedIndex = -1;
                this.enabled = true;
                this._readonly = false;
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.Control.$ctor4.call(this, "inputcontrol", ExpressCraft.ComboBoxTypes.Default);
                this.ComboBoxBase = Bridge.as(this.Content, HTMLSelectElement);

                this.Content.oncontextmenu = $asm.$.ExpressCraft.ComboBoxEdit.f1;

                this.ComboBoxBase.onchange = Bridge.fn.bind(this, $asm.$.ExpressCraft.ComboBoxEdit.f2);
            }
        },
        methods: {
            FillData: function (dataitems) {
                var $t;
                if (dataitems === void 0) { dataitems = []; }
                $(this.ComboBoxBase).empty();

                if (dataitems == null) {
                    for (var i = 0; i < dataitems.length; i = (i + 1) | 0) {
                        this.ComboBoxBase.appendChild(($t = document.createElement('option'), $t.innerHTML = dataitems[System.Array.index(i, dataitems)].Text, $t.value = dataitems[System.Array.index(i, dataitems)].Value, $t));
                    }
                }
            },
            Render: function () {
                ExpressCraft.Control.prototype.Render.call(this);
            }
        }
    });

    Bridge.ns("ExpressCraft.ComboBoxEdit", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ComboBoxEdit, {
        f1: function (ev) {
            ev.stopPropagation();
        },
        f2: function (ev) {
            if (this.previousSelectedIndex !== this.ComboBoxBase.selectedIndex) {
                if (!Bridge.staticEquals(this.SelectedIndexChanged, null)) {
                    this.SelectedIndexChanged(this);
                }

                this.previousSelectedIndex = this.ComboBoxBase.selectedIndex;
            }
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.Form", {
        inherits: [ExpressCraft.Control],
        statics: {
            fields: {
                _activeToolTip: null,
                _toolTipTimerHandle: 0,
                _activeToolTipMouseMove: null,
                _activeToolTipControl: null,
                _oepntoolTipTimerHandle: 0,
                MovingForm: null,
                Parent: null,
                FormOverLay: null,
                WindowCursorManager: null,
                _hasSetup: false,
                InExternalMouseEvent: false,
                InErrorDialog: false,
                standAloneForms: null,
                FormCollections: null,
                _ActiveForm: null,
                _PrevActiveForm: null,
                MoveAction: 0,
                WindowHolderSelectionBoxX: 0,
                WindowHolderSelectionBoxY: 0,
                WindowHolderSelectionBoxXOff: 0,
                WindowHolderSelectionBoxYOff: 0,
                ToClean: null
            },
            props: {
                WindowHolder: null,
                WindowManager: null,
                WindowManagerStart: null,
                WindowManagerSearch: null,
                ActiveToolTip: {
                    get: function () {
                        return ExpressCraft.Form._activeToolTip;
                    },
                    set: function (value) {
                        if (!Bridge.referenceEquals(ExpressCraft.Form._activeToolTip, value)) {
                            if (value != null && value.AttachedControl != null && value.AttachedControl.Content != null) {
                                if (!Bridge.staticEquals(ExpressCraft.Form._activeToolTipMouseMove, null)) {
                                    value.AttachedControl.Content.removeEventListener("mousemove", ExpressCraft.Form._activeToolTipMouseMove);
                                    ExpressCraft.Form._activeToolTipMouseMove = null;
                                }
                            }
                            if (ExpressCraft.Form._activeToolTipControl != null) {
                                ExpressCraft.Form._activeToolTipControl.Close();
                                ExpressCraft.Form._activeToolTipControl = null;
                            }
                            if (ExpressCraft.Form._toolTipTimerHandle > -1) {
                                Bridge.global.clearTimeout(ExpressCraft.Form._toolTipTimerHandle);
                                ExpressCraft.Form._toolTipTimerHandle = -1;
                            }

                            ExpressCraft.Form._activeToolTip = value;


                            var messageLength;
                            if (ExpressCraft.Form._activeToolTip != null && ((messageLength = ExpressCraft.Form._activeToolTip.GetWordCount())) > 0 && ExpressCraft.Form._activeToolTip.AttachedControl != null) {
                                ExpressCraft.Form._activeToolTipMouseMove = function (ev) {
                                    if (ExpressCraft.Form._toolTipTimerHandle > -1) {
                                        Bridge.global.clearTimeout(ExpressCraft.Form._toolTipTimerHandle);
                                    }
                                    ExpressCraft.Form._toolTipTimerHandle = Bridge.global.setTimeout(function () {
                                        if (ExpressCraft.Form._activeToolTipControl != null) {
                                            ExpressCraft.Form._activeToolTipControl.Close();
                                            ExpressCraft.Form._activeToolTipControl = null;
                                        }
                                        if (ExpressCraft.Form._oepntoolTipTimerHandle > -1) {
                                            Bridge.global.clearTimeout(ExpressCraft.Form._oepntoolTipTimerHandle);
                                            ExpressCraft.Form._oepntoolTipTimerHandle = -1;
                                        }
                                        ExpressCraft.Form._activeToolTipControl = new ExpressCraft.ToolTipControl(ExpressCraft.Form._activeToolTip);
                                        ExpressCraft.Form._activeToolTipControl.Show(ev);

                                        ExpressCraft.Form._oepntoolTipTimerHandle = Bridge.global.setTimeout($asm.$.ExpressCraft.Form.f1, Math.max(1000, ((messageLength * Math.max(ExpressCraft.Settings.ToolTipPopupStayOpenDelayPerWordMs, 10)) | 0)));

                                        if (!Bridge.staticEquals(ExpressCraft.Form._activeToolTipMouseMove, null)) {
                                            value.AttachedControl.Content.removeEventListener("mousemove", ExpressCraft.Form._activeToolTipMouseMove);
                                            ExpressCraft.Form._activeToolTipMouseMove = null;
                                        }
                                    }, Math.max(1, ExpressCraft.Settings.ToolTipPopupDelayMs));
                                };
                                value.AttachedControl.Content.addEventListener("mousemove", ExpressCraft.Form._activeToolTipMouseMove);
                            }
                        }
                    }
                },
                ResizeCorners: 0,
                Mouse_Down: false,
                ShowBodyOverLay: false,
                Window_DefaultHeight: 0,
                Window_DefaultWidth: 0,
                ActiveForm: {
                    get: function () {
                        return ExpressCraft.Form._ActiveForm;
                    },
                    set: function (value) {
                        if (!Bridge.referenceEquals(ExpressCraft.Form._ActiveForm, value)) {
                            ExpressCraft.Form._PrevActiveForm = ExpressCraft.Form._ActiveForm;

                            if (ExpressCraft.Form._ActiveForm != null) {
                                ExpressCraft.Form._ActiveForm.OnLostFocus();
                                if (ExpressCraft.Form._ActiveForm.Content != null) {
                                    if (ExpressCraft.Form._ActiveForm.InDesign) {
                                        ExpressCraft.Form._ActiveForm.BodyOverLay.style.visibility = "collapse";
                                        return;
                                    }
                                    ExpressCraft.Form._ActiveForm.BodyOverLay.style.visibility = "visible";
                                }
                            }
                            ExpressCraft.Form._ActiveForm = value;
                            if (ExpressCraft.Form._ActiveForm != null) {
                                ExpressCraft.Form._ActiveForm.OnGotFocus();
                                if (ExpressCraft.Form._ActiveForm.Content != null) {
                                    ExpressCraft.Form._ActiveForm.BodyOverLay.style.visibility = "collapse";
                                    ExpressCraft.Form._ActiveForm.BringToFront();
                                }

                                if (ExpressCraft.Form.GetActiveFormCollection() != null && ExpressCraft.Form.GetActiveFormCollection().FormOwner != null && Bridge.referenceEquals(ExpressCraft.Form._ActiveForm, ExpressCraft.Form.GetActiveFormCollection().FormOwner)) {
                                    ExpressCraft.Form.ClearZIndex();
                                } else {
                                    ExpressCraft.Form.ApplyZIndex();
                                }
                            }
                        }

                    }
                }
            },
            ctors: {
                init: function () {
                    this._toolTipTimerHandle = -1;
                    this._oepntoolTipTimerHandle = -1;
                    this._hasSetup = false;
                    this.InExternalMouseEvent = false;
                    this.InErrorDialog = false;
                    this.standAloneForms = new ExpressCraft.FormCollection(null);
                    this.FormCollections = new (System.Collections.Generic.List$1(ExpressCraft.FormCollection))();
                    this.MoveAction = ExpressCraft.MouseMoveAction.Move;
                    this.ToClean = new (System.Collections.Generic.List$1(ExpressCraft.Form))();
                    this.ResizeCorners = 2;
                    this.Mouse_Down = false;
                    this.ShowBodyOverLay = false;
                    this.Window_DefaultHeight = 480;
                    this.Window_DefaultWidth = 640;
                }
            },
            methods: {
                MidleOfAction: function () {
                    return ExpressCraft.Form.MovingForm != null; // WindowHolderSelectionBox != null ||
                },
                GetActiveFormCollection: function () {
                    for (var i = (ExpressCraft.Form.FormCollections.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                        var frmCol = ExpressCraft.Form.FormCollections.getItem(i);
                        if (frmCol.FormOwner == null) {
                            for (var x = 0; x < frmCol.VisibleForms.Count; x = (x + 1) | 0) {
                                if (frmCol.VisibleForms.getItem(x) != null) {
                                    frmCol.VisibleForms.getItem(x).Close();
                                }
                            }
                            ExpressCraft.Form.FormCollections.removeAt(i);
                        } else {
                            return frmCol;
                        }
                    }

                    return null;
                },
                SetBodyOverLay: function () {
                    var ActiveCollection = ExpressCraft.Form.GetActiveFormCollection();
                    if (ActiveCollection == null) {
                        return;
                    }

                    ActiveCollection.FormOwner.ShowBodyOverLayStyle();

                    var VisibleForms = ActiveCollection.VisibleForms;

                    for (var i = 0; i < VisibleForms.Count; i = (i + 1) | 0) {
                        var form = VisibleForms.getItem(i);
                        if (form != null) {
                            form.ShowBodyOverLayStyle();
                        }
                    }
                },
                ChangeStateTextSelection: function (element, state) {
                    if (state) {
                        $(element).css("user-select", "text");
                    } else {
                        $(element).css("user-select", "none");
                    }
                },
                DisableStateDrag: function (element) {
                    if (Bridge.is(element, HTMLImageElement)) {
                        element.ondragstart = $asm.$.ExpressCraft.Form.f2;
                    } else {
                        $(element).css("user-drag:", "none");
                    }
                },
                SetupHideElementsOnView: function () {
                    window.onblur = $asm.$.ExpressCraft.Form.f3;

                    window.onfocus = $asm.$.ExpressCraft.Form.f4;
                },
                SetupWindowManager: function () {
                    if (ExpressCraft.Form.Parent == null || ExpressCraft.Form.WindowHolder == null) {
                        return;
                    }

                    if (ExpressCraft.Settings.WindowManagerVisible) {
                        ExpressCraft.Form.WindowHolder.style.height = "calc(100% - 40px)";
                        if (!System.Linq.Enumerable.from(ExpressCraft.Form.Parent.children).contains(ExpressCraft.Form.WindowManager)) {
                            ExpressCraft.Form.Parent.appendChild(ExpressCraft.Form.WindowManager);
                        }
                    } else {
                        ExpressCraft.Form.WindowHolder.style.height = "100%";
                        if (System.Linq.Enumerable.from(ExpressCraft.Form.Parent.children).contains(ExpressCraft.Form.WindowManager)) {
                            ExpressCraft.Form.Parent.removeChild(ExpressCraft.Form.WindowManager);
                        }
                    }
                },
                Setup: function (parent) {
                    if (parent === void 0) { parent = null; }
                    //Settings.Setup();
                    if (ExpressCraft.Form._hasSetup) {
                        return;
                    }
                    ExpressCraft.Form._hasSetup = true;

                    if (parent == null) {
                        ExpressCraft.Form.Parent = document.body;
                    } else {
                        ExpressCraft.Form.Parent = parent;
                    }

                    ExpressCraft.Form.WindowCursorManager = document.createElement('style');

                    ExpressCraft.Form.WindowHolder = ExpressCraft.Control.Div$1("form-container");
                    ExpressCraft.Form.WindowManager = ExpressCraft.Control.Div$1("form-manager");
                    ExpressCraft.Form.WindowManagerStart = ExpressCraft.Control.Div$1("form-manager-start");

                    ExpressCraft.Form.WindowManagerSearch = new ExpressCraft.TextInput();
                    ExpressCraft.Form.WindowManagerSearch.ClassList.add("form-manager-search");

                    ExpressCraft.Form.FormOverLay = ExpressCraft.Control.Div$1("system-form-collection-overlay");
                    ExpressCraft.Form.FormOverLay.onmousedown = $asm.$.ExpressCraft.Form.f5;
                    ExpressCraft.Form.FormOverLay.onclick = $asm.$.ExpressCraft.Form.f6;
                    ExpressCraft.Form.FormOverLay.oncontextmenu = $asm.$.ExpressCraft.Form.f7;
                    ExpressCraft.Form.FormOverLay.style.visibility = "visible";

                    window.onkeyup = $asm.$.ExpressCraft.Form.f8;

                    window.onresize = $asm.$.ExpressCraft.Form.f9;
                    window.onmousemove = $asm.$.ExpressCraft.Form.f10;

                    window.onmouseup = $asm.$.ExpressCraft.Form.f11;
                    window.onbeforeunload = $asm.$.ExpressCraft.Form.f12;
                    window.onerror = Bridge.fn.combine(window.onerror, $asm.$.ExpressCraft.Form.f13);

                    ExpressCraft.Form.WindowHolder.appendChild(ExpressCraft.Form.FormOverLay);
                    ExpressCraft.Helper.AppendChildren$1(ExpressCraft.Form.WindowManager, [ExpressCraft.Form.WindowManagerStart, ExpressCraft.Control.op_Implicit(ExpressCraft.Form.WindowManagerSearch)]);

                    ExpressCraft.Helper.AppendChildren$1(ExpressCraft.Form.Parent, [ExpressCraft.Form.WindowHolder, ExpressCraft.Form.WindowCursorManager]);

                    ExpressCraft.Form.SetupWindowManager();
                },
                SetCursor: function (cursor) {
                    ExpressCraft.Form.WindowCursorManager.innerHTML = System.String.format("\r\n\t\t\t\t.control{    \r\n\t\t\t\t\tcursor:{0} !important;    \r\n\t\t\t\t}", cursor);
                },
                ClearZIndex: function () {
                    var $t, $t1, $t2;
                    var x = ExpressCraft.Form.GetActiveFormCollection().FormOwner;
                    ExpressCraft.Form.WindowHolder.style.zIndex = "-" + ExpressCraft.Form.WindowHolder.childElementCount;
                    var Found = false;

                    for (var i = 0; i < ExpressCraft.Form.WindowHolder.childElementCount; i = (i + 1) | 0) {
                        if (Found || Bridge.referenceEquals(x.Content, ($t = ExpressCraft.Form.WindowHolder.children)[System.Array.index(i, $t)])) {
                            ($t1 = ExpressCraft.Form.WindowHolder.children)[System.Array.index(i, $t1)].style.zIndex = "";
                            Found = true;
                        } else {
                            ($t2 = ExpressCraft.Form.WindowHolder.children)[System.Array.index(i, $t2)].style.zIndex = (((((i - ExpressCraft.Form.WindowHolder.childElementCount) | 0) - 1) | 0)).toString();
                        }

                    }
                },
                ApplyZIndex: function () {
                    var $t;
                    ExpressCraft.Form.WindowHolder.style.zIndex = "";
                    for (var i = 0; i < ExpressCraft.Form.WindowHolder.childElementCount; i = (i + 1) | 0) {
                        ($t = ExpressCraft.Form.WindowHolder.children)[System.Array.index(i, $t)].style.zIndex = i.toString();
                    }
                },
                CalculateZOrder$1: function (formCollection, zIndex) {
                    var TopMostForms = new (System.Collections.Generic.List$1(ExpressCraft.Form))();

                    var VisibleForms = formCollection.VisibleForms;

                    if (formCollection.FormOwner != null) {
                        //formCollection.FormOwner.Content.Delete();

                        ExpressCraft.Form.WindowHolder.appendChild(ExpressCraft.Control.op_Implicit(formCollection.FormOwner));
                        //formCollection.FormOwner.SetZIndex(ref zIndex);
                    }

                    for (var i = 0; i < VisibleForms.Count; i = (i + 1) | 0) {
                        if (VisibleForms.getItem(i).Content == null) {
                            ExpressCraft.Form.ToClean.add(VisibleForms.getItem(i));
                        } else {
                            if (VisibleForms.getItem(i).TopMost) {
                                TopMostForms.add(VisibleForms.getItem(i));
                            }
                        }
                    }
                    for (var i1 = 0; i1 < ExpressCraft.Form.ToClean.Count; i1 = (i1 + 1) | 0) {
                        if (VisibleForms.contains(ExpressCraft.Form.ToClean.getItem(i1))) {
                            VisibleForms.remove(ExpressCraft.Form.ToClean.getItem(i1));
                            ExpressCraft.Form.ToClean.setItem(i1, null);
                        }

                    }
                    ExpressCraft.Form.ToClean.remove(null); // Removes all nulls..

                    for (var i2 = 0; i2 < TopMostForms.Count; i2 = (i2 + 1) | 0) {
                        var form = TopMostForms.getItem(i2);
                        VisibleForms.remove(form);
                        VisibleForms.add(form);
                    }
                    for (var i3 = 0; i3 < VisibleForms.Count; i3 = (i3 + 1) | 0) {
                        if (VisibleForms.getItem(i3) != null && VisibleForms.getItem(i3).Content != null) {
                            //VisibleForms[i].Content.Delete();
                            ExpressCraft.Form.WindowHolder.appendChild(VisibleForms.getItem(i3).Content);

                            //VisibleForms[i].SetZIndex(ref zIndex);
                        }
                    }

                    return zIndex;
                },
                CalculateZOrder: function () {
                    ExpressCraft.Form.GetActiveFormCollection();

                    if (ExpressCraft.Form.FormCollections == null && ExpressCraft.Form.standAloneForms.VisibleForms.Count === 0) {
                        return;
                    }
                    ExpressCraft.Form.FormCollections.remove(null);

                    var zIndex = 1;
                    if (ExpressCraft.Form.FormCollections.Count === 0) {
                        ExpressCraft.Form.FormOverLay.style.zIndex = "";
                    } else {
                        if (ExpressCraft.Form.FormCollections.Count === 1) {
                            ExpressCraft.Form.FormOverLay.style.opacity = "0";
                        } else {
                            ExpressCraft.Form.FormOverLay.style.opacity = "0.4";
                        }
                    }

                    //			FormOverLay.Delete();
                    ExpressCraft.Helper.Empty(ExpressCraft.Form.WindowHolder);

                    for (var x = 0; x < ExpressCraft.Form.FormCollections.Count; x = (x + 1) | 0) {
                        if (x === ((ExpressCraft.Form.FormCollections.Count - 1) | 0)) {
                            //FormOverLay.Style.ZIndex = (zIndex++).ToString();
                            ExpressCraft.Form.WindowHolder.appendChild(ExpressCraft.Form.FormOverLay);
                        }
                        zIndex = ExpressCraft.Form.CalculateZOrder$1(ExpressCraft.Form.FormCollections.getItem(x), zIndex);
                    }
                    zIndex = ExpressCraft.Form.CalculateZOrder$1(ExpressCraft.Form.standAloneForms, zIndex);

                    if (ExpressCraft.Form.ActiveForm != null) {
                        ExpressCraft.Form.ActiveForm.Body.focus();
                    }
                }
            }
        },
        fields: {
            InDesign: false,
            AllowSizeChange: false,
            AllowMoveChange: false,
            ForReuse: false,
            Self: null,
            _IsDialog: false,
            Children: null,
            StartPosition: 0,
            TopMost: false,
            DialogResult: 0,
            prev_px: 0,
            prev_py: 0,
            prev_width: 0,
            prev_height: 0,
            prev_top: 0,
            prev_left: 0,
            windowState: 0,
            DialogResults: null,
            _seperateInstance: false,
            closeAction: null,
            InDialogResult: false
        },
        props: {
            HasSetup: {
                get: function () {
                    return ExpressCraft.Form._hasSetup;
                }
            },
            Controls: {
                get: function () {
                    return this.Body.children;
                }
            },
            ShowMinimize: {
                get: function () {
                    return this.ButtonMinimize != null;
                },
                set: function (value) {
                    this.ChangeHeadingButton(ExpressCraft.FormButtonType.Minimize, value);
                }
            },
            BodyStyle: {
                get: function () {
                    return this.Body.style;
                }
            },
            ShowClose: {
                get: function () {
                    return this.ButtonClose != null;
                },
                set: function (value) {
                    this.ChangeHeadingButton(ExpressCraft.FormButtonType.Close, value);
                }
            },
            ShowMaximize: {
                get: function () {
                    return this.ButtonClose != null;
                },
                set: function (value) {
                    this.ChangeHeadingButton(ExpressCraft.FormButtonType.Maximize, value);
                }
            },
            Heading: null,
            ButtonClose: null,
            ButtonExpand: null,
            ButtonMinimize: null,
            HeadingTitle: null,
            Body: null,
            BodyOverLay: null,
            Owner: null,
            MinWidth: 0,
            MinHeight: 0,
            Windowstate: {
                get: function () {
                    return this.windowState;
                },
                set: function (value) {
                    this.SetWindowState(value);
                }
            },
            Text: {
                get: function () {
                    return this.HeadingTitle.innerHTML;
                },
                set: function (value) {
                    this.HeadingTitle.innerHTML = value;
                }
            },
            BackColor: {
                get: function () {
                    return this.Body.style.backgroundColor;
                },
                set: function (value) {
                    this.Body.style.backgroundColor = value;
                }
            },
            ForeColor: {
                get: function () {
                    return this.Body.style.color;
                },
                set: function (value) {
                    this.Body.style.color = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.InDesign = false;
                this.AllowSizeChange = true;
                this.AllowMoveChange = true;
                this.ForReuse = false;
                this._IsDialog = false;
                this.Children = new (System.Collections.Generic.List$1(ExpressCraft.Control))();
                this.StartPosition = ExpressCraft.FormStartPosition.WindowsDefaultLocation;
                this.TopMost = false;
                this.DialogResult = ExpressCraft.DialogResultEnum.None;
                this.DialogResults = new (System.Collections.Generic.List$1(ExpressCraft.DialogResult))();
                this._seperateInstance = false;
                this.InDialogResult = false;
                this.MinWidth = 200;
                this.MinHeight = 50;
            },
            ctor: function (font) {
                if (font === void 0) { font = "8.25pt Tahoma"; }

                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "form-base");
                if (!System.String.isNullOrWhiteSpace(font)) {
                    this.Style.font = font;
                }
                this.Heading = ExpressCraft.Control.Div$1("form-heading");
                this.Heading.style.font = font;

                this.Heading.oncontextmenu = $asm.$.ExpressCraft.Form.f7;

                this.HeadingTitle = ExpressCraft.Control.Span$1("form-heading-title");

                this.Body = ExpressCraft.Control.Div$1("form-body");

                this.Body.oncontextmenu = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f14);

                this.BackColor = "#F0F0F0";

                this.BodyOverLay = ExpressCraft.Control.Div$1("form-body-overlay");

                this.BodyOverLay.style.opacity = ExpressCraft.Form.ShowBodyOverLay ? "0.5" : "0";

                this.ChangeHeadingButton(ExpressCraft.FormButtonType.Close);
                this.ChangeHeadingButton(ExpressCraft.FormButtonType.Maximize);
                this.ChangeHeadingButton(ExpressCraft.FormButtonType.Minimize);

                this.BodyOverLay.style.visibility = "collapse";

                this.Self = $(this.Content);

                this.Content.addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f15));

                this.Heading.addEventListener("dblclick", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f16));

                this.Content.addEventListener("mouseleave", $asm.$.ExpressCraft.Form.f17);

                this.Body.addEventListener("mouseenter", $asm.$.ExpressCraft.Form.f18);

                this.Content.addEventListener("mousemove", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f19));

                this.Heading.addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f20));

                this.Body.addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f21));

                this.Body.addEventListener("mousemove", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f22));

                this.BodyOverLay.addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f23));

                this.Body.addEventListener("mouseleave", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f24));

                this.BodyOverLay.addEventListener("mouseenter", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f25));

                $(this.Content).css("width", ExpressCraft.Form.Window_DefaultWidth).css("height", ExpressCraft.Form.Window_DefaultHeight);

                this.Content.appendChild(this.Heading);
                this.Content.appendChild(this.Body);
                this.Content.appendChild(this.BodyOverLay);

                this.Heading.appendChild(this.HeadingTitle);
                this.Heading.appendChild(this.ButtonClose);
                this.Heading.appendChild(this.ButtonExpand);
                this.Heading.appendChild(this.ButtonMinimize);

                this.closeAction = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f26);

                this.Initialise();
            }
        },
        methods: {
            IsDialog: function () {
                return this._IsDialog;
            },
            LinkchildToForm: function (child) {
                if (child == null) {
                    return;
                }
                this.Children.add(child);
                child.LinkedForm = this;
            },
            LinkchildrenToForm: function (children) {
                if (children === void 0) { children = []; }
                if (children == null || children.length === 0) {
                    return;
                }
                this.Children.addRange(children);
                for (var i = 0; i < children.length; i = (i + 1) | 0) {
                    children[System.Array.index(i, children)].LinkedForm = this;
                }
            },
            AppendChild$1: function (node) {
                this.Body.appendChild(ExpressCraft.Control.op_Implicit(node));

                return this;
            },
            AppendChild: function (node) {
                this.Body.appendChild(node);

                return this;
            },
            AppendChildren$1: function (node) {
                if (node === void 0) { node = []; }
                ExpressCraft.Helper.AppendChildren$2(this.Body, node);

                return this;
            },
            AppendChildren: function (node) {
                if (node === void 0) { node = []; }
                ExpressCraft.Helper.AppendChildren$1(this.Body, node);

                return this;
            },
            ResizeChildren: function (parent) {
                if (!Bridge.staticEquals(this.OnResize, null)) {
                    this.OnResize(this);
                }
                this.OnResizing();

                for (var x = 0; x < parent.children.length; x = (x + 1) | 0) {
                    if (!parent.children[System.Array.index(x, parent.children)].classList.contains("control")) {
                        continue;
                    }
                    for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                        if (this.Children.getItem(i) != null && !Bridge.staticEquals(this.Children.getItem(i).OnResize, null)) {
                            if (Bridge.referenceEquals(this.Children.getItem(i).Content, parent.children[System.Array.index(x, parent.children)])) {
                                this.Children.getItem(i).OnResize(this.Children.getItem(i));
                                break;
                            }
                        }
                    }
                    this.ResizeChildren(parent.children[System.Array.index(x, parent.children)]);
                }
            },
            Resizing: function () {
                if (!Bridge.staticEquals(this.OnResize, null)) {
                    this.OnResize(this);
                }
                this.OnResizing();

                for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                    if (this.Children.getItem(i) != null && !Bridge.staticEquals(this.Children.getItem(i).OnResize, null)) {
                        this.Children.getItem(i).OnResize(this.Children.getItem(i));
                    }
                }
            },
            OnResizing: function () {

            },
            IsContentVisible: function () {
                return this.Content != null && Bridge.equals(this.Content.style.visibility, "visible");
            },
            ChangeHeadingButton: function (button, visible) {
                if (visible === void 0) { visible = true; }
                switch (button) {
                    case ExpressCraft.FormButtonType.Minimize: 
                        if (this.ButtonMinimize != null) {
                            ExpressCraft.Helper.Delete(this.ButtonMinimize);
                            this.ButtonMinimize = null;
                        }
                        if (visible) {
                            this.ButtonMinimize = this.CreateFormButton(button);

                        }
                        break;
                    case ExpressCraft.FormButtonType.Maximize: 
                        if (this.ButtonExpand != null) {
                            ExpressCraft.Helper.Delete(this.ButtonExpand);
                            this.ButtonExpand = null;
                        }
                        if (visible) {
                            this.ButtonExpand = this.CreateFormButton(button);
                        }
                        break;
                    case ExpressCraft.FormButtonType.Close: 
                        if (this.ButtonClose != null) {
                            ExpressCraft.Helper.Delete(this.ButtonClose);
                            this.ButtonClose = null;
                        }
                        if (visible) {
                            this.ButtonClose = this.CreateFormButton(button);
                        }
                        break;
                    default: 
                        break;
                }
            },
            Initialise: function () {

            },
            OnShowing: function () {

            },
            OnShowed: function () {

            },
            OnClosing: function () {

            },
            OnClosed: function () {

            },
            ShowBodyOverLayStyle: function () {
                if (this.BodyOverLay != null && Bridge.equals(this.BodyOverLay.style.visibility, "collapse")) {
                    if (this.InDesign) {
                        return;
                    }
                    this.BodyOverLay.style.visibility = "visible";
                }
            },
            OnGotFocus: function () {

            },
            OnLostFocus: function () {

            },
            SetWindowState: function (State) {
                if (!this.AllowSizeChange) {
                    return;
                }

                if (((this.windowState = State)) === ExpressCraft.WindowState.Normal) {
                    ExpressCraft.Helper.SetBounds(this, this.prev_left, this.prev_top, this.prev_width, this.prev_height);
                    this.Resizing();
                    this.Style.borderWidth = "1px";
                } else if (this.windowState === ExpressCraft.WindowState.Maximized) {
                    this.prev_left = ExpressCraft.Helper.ToInt(this.Left);
                    this.prev_top = ExpressCraft.Helper.ToInt(this.Top);
                    this.prev_width = ExpressCraft.Helper.ToInt(this.Width);
                    this.prev_height = ExpressCraft.Helper.ToInt(this.Height);

                    this.Style.borderWidth = "0";

                    var calc_2px = "100%";

                    ExpressCraft.Helper.SetBounds(this, 0, 0, calc_2px, calc_2px);
                }
                this.Resizing();
            },
            changeWindowState: function () {
                if (this.windowState === ExpressCraft.WindowState.Maximized) {
                    this.SetWindowState(ExpressCraft.WindowState.Normal);
                } else {
                    this.SetWindowState(ExpressCraft.WindowState.Maximized);
                }
            },
            CreateFormButton: function (Type) {
                var butt = ExpressCraft.Control.Div$1("form-heading-button");

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
                        if (this.ShowMinimize) {
                            this.ButtonMinimize.style.left = "calc(100% - 137px)";
                        }
                        butt.style.left = "calc(100% - 91px)"; // StyleController.Calc(100, 91);				
                        butt.innerHTML = "&#9633;";
                        butt.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f31);
                        break;
                    case ExpressCraft.FormButtonType.Minimize: 
                        if (this.ShowMaximize) {
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
            TitleBarHeight: function () {
                return this.Heading.clientHeight;
            },
            TitleBarWidth: function () {
                return this.Heading.clientWidth;
            },
            ClientX: function () {
                return this.Body.clientLeft;
            },
            ClientY: function () {
                return this.Body.clientTop;
            },
            GetFormCollectionFromForm: function (form) {
                if (form._seperateInstance) {
                    var visibleForms = ExpressCraft.Form.standAloneForms.VisibleForms;
                    for (var x = 0; x < visibleForms.Count; x = (x + 1) | 0) {
                        if (Bridge.referenceEquals(visibleForms.getItem(x), this)) {
                            return ExpressCraft.Form.standAloneForms;
                        }
                    }
                } else {
                    for (var i = 0; i < ExpressCraft.Form.FormCollections.Count; i = (i + 1) | 0) {
                        if (Bridge.referenceEquals(this, ExpressCraft.Form.FormCollections.getItem(i).FormOwner)) {
                            return ExpressCraft.Form.FormCollections.getItem(i);
                        }
                        var visibleForms1 = ExpressCraft.Form.FormCollections.getItem(i).VisibleForms;
                        for (var x1 = 0; x1 < visibleForms1.Count; x1 = (x1 + 1) | 0) {
                            if (Bridge.referenceEquals(visibleForms1.getItem(x1), this)) {
                                return ExpressCraft.Form.FormCollections.getItem(i);
                            }
                        }
                    }
                }

                return null;
            },
            IsActiveFormCollection: function () {
                if (this._seperateInstance) {
                    return Bridge.referenceEquals(this.GetFormCollectionFromForm(this), ExpressCraft.Form.standAloneForms);
                } else {
                    return Bridge.referenceEquals(this.GetFormCollectionFromForm(this), ExpressCraft.Form.GetActiveFormCollection());
                }
            },
            IsVisible: function () {
                return this.GetFormCollectionFromForm(this) != null;
            },
            ShowStartNewLevel: function (owner) {
                if (owner === void 0) { owner = null; }
                if (!this.HasSetup) {
                    ExpressCraft.Form.Setup();
                }

                if (this.IsVisible()) {
                    // Already Open???
                    throw new System.Exception("Invalid request to open form as a dialog that is already visible!");
                }

                if (this.StartPosition === ExpressCraft.FormStartPosition.Center) {
                    this.CentreForm();
                }

                this.AddFormToParentElement(owner);

                this.Body.focus();

                ExpressCraft.Form.FormCollections.add(new ExpressCraft.FormCollection(this));

                ExpressCraft.Form.CalculateZOrder();

                this.OnShowed();

                ExpressCraft.Form.ActiveForm = this;
            },
            ShowDialog: function (dialogResults) {
                if (dialogResults === void 0) { dialogResults = []; }
                if (!this.HasSetup) {
                    ExpressCraft.Form.Setup();
                }

                this.InDialogResult = false;

                if (this.ButtonMinimize != null) {
                    ExpressCraft.Helper.Delete(this.ButtonMinimize);
                }
                if (this.ButtonExpand != null) {
                    ExpressCraft.Helper.Delete(this.ButtonExpand);
                }
                if (this.ButtonClose != null) {
                    ExpressCraft.Helper.Delete(this.ButtonClose);
                }

                if (!(Bridge.Browser.isPhone || Bridge.Browser.isTablet || Bridge.Browser.isiPhone || Bridge.Browser.isAndroid || Bridge.Browser.isiPad)) {
                    this.StartPosition = ExpressCraft.FormStartPosition.Center;
                }

                this._IsDialog = true;

                this.ShowStartNewLevel(null);

                if (dialogResults != null && dialogResults.length > 0) {
                    this.DialogResults.addRange(dialogResults);
                }
            },
            MinZero$1: function (input) {
                return input < 0 ? 0 : input;
            },
            MinZero: function (input) {
                return input < 0 ? 0 : input;
            },
            CentreForm: function () {
                if (this.Owner == null) {
                    return;
                }

                this.Self.css("left", this.MinZero((((((Bridge.Int.div(this.Owner.clientWidth, 2)) | 0)) - (((Bridge.Int.div(parseInt(ExpressCraft.Helper.ToHtmlValue(this.Width)), 2)) | 0))) | 0))).css("top", this.MinZero((((((Bridge.Int.div(this.Owner.clientHeight, 2)) | 0)) - (((Bridge.Int.div(parseInt(ExpressCraft.Helper.ToHtmlValue(this.Height)), 2)) | 0))) | 0)));
            },
            AddFormToParentElement: function (owner) {
                if (owner === void 0) { owner = null; }
                if (!this.HasRendered) {
                    this.Render();
                    this.HasRendered = true;
                }

                this.OnShowing();

                if (owner == null) {
                    ExpressCraft.Form.WindowHolder.appendChild(this.Content);
                    owner = ExpressCraft.Form.WindowHolder;
                } else {
                    owner.appendChild(this.Content);
                }
                this.Shown();

                this.Owner = owner;
            },
            Shown: function () {
                if (this.Children == null) {
                    return;
                }
                for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                    if (this.Children.getItem(i) != null && !Bridge.staticEquals(this.Children.getItem(i).OnLoaded, null)) {
                        this.Children.getItem(i).OnLoaded(this.Children.getItem(i));
                    }
                }
                this.Children.remove(null);
            },
            Show: function (owner, seperateInstance) {
                if (owner === void 0) { owner = null; }
                if (seperateInstance === void 0) { seperateInstance = false; }
                if (!this.HasSetup) {
                    ExpressCraft.Form.Setup();
                }

                if (this._IsDialog) {
                    return;
                }
                this._seperateInstance = seperateInstance;
                if (!seperateInstance && (ExpressCraft.Form.FormCollections == null || ExpressCraft.Form.FormCollections.Count === 0)) {
                    this.ShowStartNewLevel(owner);
                    return;
                }

                var activeCollect = !seperateInstance ? ExpressCraft.Form.GetActiveFormCollection() : ExpressCraft.Form.standAloneForms;
                var visbileForms = activeCollect.VisibleForms;

                if (!visbileForms.contains(this)) {
                    this.AddFormToParentElement(owner);

                    this.Content.style.visibility = "visible";
                    if (this.StartPosition !== ExpressCraft.FormStartPosition.Manual && this.windowState === ExpressCraft.WindowState.Normal) {
                        if (this.StartPosition === ExpressCraft.FormStartPosition.Center || (activeCollect == null || visbileForms == null || visbileForms.Count === 0 || visbileForms.getItem(((visbileForms.Count - 1) | 0)).windowState !== ExpressCraft.WindowState.Normal || visbileForms.getItem(((visbileForms.Count - 1) | 0)).Content == null)) {
                            this.CentreForm();

                        } else if (this.StartPosition === ExpressCraft.FormStartPosition.WindowsDefaultLocation) {
                            var obj = visbileForms.getItem(((visbileForms.Count - 1) | 0));

                            var x = parseInt(ExpressCraft.Helper.ToHtmlValue(obj.Left));
                            var y = parseInt(ExpressCraft.Helper.ToHtmlValue(obj.Top));

                            var pw25 = this.Owner.clientWidth * 0.15;
                            var ph25 = this.Owner.clientHeight * 0.15;

                            var pw75 = this.Owner.clientWidth * 0.55;
                            var ph75 = this.Owner.clientHeight * 0.55;

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

                            this.Self.css("left", this.MinZero(x)).css("top", this.MinZero(y));
                        }
                    }

                    this.Body.focus();

                    visbileForms.add(this);

                    ExpressCraft.Form.CalculateZOrder();

                    this.OnShowed();
                }

                ExpressCraft.Form.ActiveForm = this;
            },
            BringToFront: function () {
                var activeCollect = ExpressCraft.Form.GetActiveFormCollection();
                if (activeCollect != null) {
                    if (Bridge.referenceEquals(activeCollect.FormOwner, this)) {
                        return;
                    }
                    var visibleForms = activeCollect.VisibleForms;
                    if (visibleForms != null && visibleForms.Count > 1) {
                        visibleForms.remove(this);
                        visibleForms.add(this);
                    }

                    ExpressCraft.Form.CalculateZOrder();
                }
            },
            SetZIndex: function (zIndex) {
                this.Content.style.zIndex = (Bridge.identity(zIndex.v, (zIndex.v = (zIndex.v + 1) | 0))).toString();

                //Self.Css("zIndex", zIndex++);
            },
            Close: function () {
                if (this._IsDialog && this.InDialogResult) {
                    return;
                }
                this.OnClosing();

                ExpressCraft.Form.ToClean.add(this);

                var ownerFormCollection = this.GetFormCollectionFromForm(this);

                if (ownerFormCollection != null) {
                    if (Bridge.referenceEquals(ownerFormCollection.FormOwner, this)) {
                        ownerFormCollection.FormOwner = null;
                        for (var i = 0; i < ownerFormCollection.VisibleForms.Count; i = (i + 1) | 0) {
                            if (Bridge.referenceEquals(ownerFormCollection.VisibleForms.getItem(i), this)) {
                                continue;
                            }
                            ownerFormCollection.VisibleForms.getItem(i).Close();
                        }
                        if (ExpressCraft.Form.FormCollections.Count === 1) {
                            ExpressCraft.Form.FormCollections = new (System.Collections.Generic.List$1(ExpressCraft.FormCollection))();
                        }
                    } else {
                        ownerFormCollection.VisibleForms.remove(this);
                    }
                }

                if (this.Content != null) {
                    if (!this.ForReuse) {
                        if (ExpressCraft.Settings.FormFadeDuration > 0) {
                            this.Self.fadeOut(ExpressCraft.Settings.FormFadeDuration, this.closeAction);
                        } else {
                            this.closeAction();
                        }
                    } else {
                        this.Content.style.visibility = "collapse";
                    }
                }

                ExpressCraft.Form.CalculateZOrder();

                ExpressCraft.Form.ActiveForm = ExpressCraft.Form._PrevActiveForm;
                if (this._IsDialog) {
                    this.InDialogResult = true;
                    if (this.DialogResult !== ExpressCraft.DialogResultEnum.None && this.DialogResults != null && this.DialogResults.Count > 0) {
                        for (var i1 = 0; i1 < this.DialogResults.Count; i1 = (i1 + 1) | 0) {
                            this.DialogResults.getItem(i1).InvokeIfResult(this.DialogResult);
                        }
                    }
                }

                this.OnClosed();
            }
        }
    });

    Bridge.ns("ExpressCraft.Form", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.Form, {
        f1: function () {
            if (ExpressCraft.Form._activeToolTipControl != null) {
                ExpressCraft.Form._activeToolTipControl.Close();
                ExpressCraft.Form._activeToolTipControl = null;
            }
        },
        f2: function (ev) {
            ev.preventDefault();
        },
        f3: function (ev) {
            if (System.Linq.Enumerable.from(document.body.childNodes).contains(ExpressCraft.Form.WindowHolder)) {
                document.body.removeChild(ExpressCraft.Form.WindowHolder);
            }
        },
        f4: function (ev) {
            if (!System.Linq.Enumerable.from(document.body.childNodes).contains(ExpressCraft.Form.WindowHolder)) {
                document.body.appendChild(ExpressCraft.Form.WindowHolder);
            }
        },
        f5: function (ev) {
            if (document.activeElement != null) {
                document.activeElement.focus();
                ev.preventDefault();
                ExpressCraft.Form.SetCursor("default");
            }
        },
        f6: function (ev) {

            if (ExpressCraft.Form.ActiveForm != null) {
                var form = ExpressCraft.Form.ActiveForm;
                form.Heading.classList.add("form-heading-flash");
                Bridge.global.setTimeout(function () {
                    form.Heading.classList.remove("form-heading-flash");
                }, 800);
            }
        },
        f7: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        },
        f8: function (ev) {
            if (ExpressCraft.Settings.OnF2ShowThemeForm && ev.keyCode === ExpressCraft.KeyCodes.F2) {
                ev.preventDefault();
                ExpressCraft.ThemeForm.ShowThemeForm();
            }
        },
        f9: function (ev) {
            if (ExpressCraft.Form.FormCollections == null) {
                return;
            }

            for (var i = 0; i < ExpressCraft.Form.FormCollections.Count; i = (i + 1) | 0) {
                if (ExpressCraft.Form.FormCollections.getItem(i) == null) {
                    continue;
                }
                var fc = ExpressCraft.Form.FormCollections.getItem(i);
                if (fc.FormOwner != null) {
                    fc.FormOwner.Resizing();
                }
                for (var x = 0; x < fc.VisibleForms.Count; x = (x + 1) | 0) {
                    if (fc.VisibleForms.getItem(x) != null) {
                        fc.VisibleForms.getItem(x).Resizing();
                    }
                }
            }
        },
        f10: function (ev) {
            if (ExpressCraft.Form.InExternalMouseEvent) {
                return;
            }

            var mev = ev;

            if (ExpressCraft.Form.MovingForm != null) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                ev.stopPropagation();

                if (Bridge.equals(ExpressCraft.Form.MovingForm.BodyOverLay.style.visibility, "collapse")) {
                    if (ExpressCraft.Form.MovingForm.InDesign) {
                        ExpressCraft.Form._ActiveForm.BodyOverLay.style.visibility = "collapse";
                    } else {
                        ExpressCraft.Form.MovingForm.BodyOverLay.style.visibility = "visible";
                    }

                    ExpressCraft.Form.MovingForm.Heading.focus();
                }

                var mousePos = ExpressCraft.Helper.GetClientMouseLocation(ev);

                var mX;
                var mY;

                var newX = (((mX = mousePos.Xf)) + ExpressCraft.Form.MovingForm.prev_px);
                var newY = (((mY = mousePos.Yf)) + ExpressCraft.Form.MovingForm.prev_py);

                if (ExpressCraft.Form.MovingForm.windowState === ExpressCraft.WindowState.Maximized && ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.Move) {
                    ExpressCraft.Form.MovingForm.changeWindowState();
                    newX = mousePos.Xf - (((Bridge.Int.div(ExpressCraft.Form.MovingForm.prev_width, 2)) | 0));
                    ExpressCraft.Form.MovingForm.prev_px = newX - mousePos.Xf;
                }

                var x = parseFloat(ExpressCraft.Form.MovingForm.Style.left);
                var y = parseFloat(ExpressCraft.Form.MovingForm.Style.top);
                var w = parseFloat(ExpressCraft.Form.MovingForm.Style.width);
                var h = parseFloat(ExpressCraft.Form.MovingForm.Style.height);

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

                switch (ExpressCraft.Form.MoveAction) {
                    case ExpressCraft.MouseMoveAction.Move: 
                        x = newX;
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.TopLeftResize: 
                        w -= newX - x;
                        h -= newY - y;
                        if (w < ExpressCraft.Form.MovingForm.MinWidth) {
                            newX -= ExpressCraft.Form.MovingForm.MinWidth - w;
                            w = ExpressCraft.Form.MovingForm.MinWidth;
                        }
                        if (h < ExpressCraft.Form.MovingForm.MinHeight) {
                            newY -= ExpressCraft.Form.MovingForm.MinHeight - h;
                            h = ExpressCraft.Form.MovingForm.MinHeight;
                        }
                        x = newX;
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.TopResize: 
                        h -= newY - y;
                        if (h < ExpressCraft.Form.MovingForm.MinHeight) {
                            newY -= ExpressCraft.Form.MovingForm.MinHeight - h;
                            h = ExpressCraft.Form.MovingForm.MinHeight;
                        }
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.TopRightResize: 
                        h -= newY - y;
                        w = mX - x;
                        if (h < ExpressCraft.Form.MovingForm.MinHeight) {
                            newY -= ExpressCraft.Form.MovingForm.MinHeight - h;
                            h = ExpressCraft.Form.MovingForm.MinHeight;
                        }
                        if (w < ExpressCraft.Form.MovingForm.MinWidth) {
                            w = ExpressCraft.Form.MovingForm.MinWidth;
                        }
                        y = newY;
                        break;
                    case ExpressCraft.MouseMoveAction.LeftResize: 
                        w -= newX - x;
                        if (w < ExpressCraft.Form.MovingForm.MinWidth) {
                            newX -= ExpressCraft.Form.MovingForm.MinWidth - w;
                            w = ExpressCraft.Form.MovingForm.MinWidth;
                        }
                        x = newX;
                        break;
                    case ExpressCraft.MouseMoveAction.BottomLeftResize: 
                        w -= newX - x;
                        h = mY - y;
                        if (w < ExpressCraft.Form.MovingForm.MinWidth) {
                            newX -= ExpressCraft.Form.MovingForm.MinWidth - w;
                            w = ExpressCraft.Form.MovingForm.MinWidth;
                        }
                        if (h < ExpressCraft.Form.MovingForm.MinHeight) {
                            h = ExpressCraft.Form.MovingForm.MinHeight;
                        }
                        x = newX;
                        break;
                    case ExpressCraft.MouseMoveAction.BottomResize: 
                        h = mY - y;
                        if (h < ExpressCraft.Form.MovingForm.MinHeight) {
                            h = ExpressCraft.Form.MovingForm.MinHeight;
                        }
                        break;
                    case ExpressCraft.MouseMoveAction.RightResize: 
                        w = mX - x;
                        if (w < ExpressCraft.Form.MovingForm.MinWidth) {
                            w = ExpressCraft.Form.MovingForm.MinWidth;
                        }
                        break;
                    case ExpressCraft.MouseMoveAction.BottomRightResize: 
                        w = mX - x;
                        h = mY - y;
                        if (h < ExpressCraft.Form.MovingForm.MinHeight) {
                            h = ExpressCraft.Form.MovingForm.MinHeight;
                        }
                        if (w < ExpressCraft.Form.MovingForm.MinWidth) {
                            w = ExpressCraft.Form.MovingForm.MinWidth;
                        }
                        break;
                }
                var changed = false;
                if (px !== x) {
                    ExpressCraft.Form.MovingForm.Style.left = x + 'px';
                }
                if (py !== y) {
                    ExpressCraft.Form.MovingForm.Style.top = y + 'px';
                }
                if (pw !== w && ((changed = true))) {
                    ExpressCraft.Form.MovingForm.Style.width = w + 'px';
                }
                if (ph !== h && ((changed = true))) {
                    ExpressCraft.Form.MovingForm.Style.height = h + 'px';
                }

                if (changed) {
                    ExpressCraft.Form.MovingForm.Resizing();
                }
            }
        },
        f11: function (ev) {
            ExpressCraft.Form.InExternalMouseEvent = false;
            if (ExpressCraft.Form.MovingForm != null) {
                ExpressCraft.Form.MovingForm.BodyOverLay.style.visibility = "collapse";
            }

            ExpressCraft.Form.MovingForm = null;
            ExpressCraft.Form.Mouse_Down = false;
            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.Move;
            ExpressCraft.Form.SetCursor("default");


        },
        f12: function (ev) {
            if (!ExpressCraft.Settings.AllowCloseWithoutQuestion) {
                return 'Would you like to close this application?';
            }
        },
        f13: function (message, url, lineNumber, columnNumber, error) {
            if (ExpressCraft.Form.InErrorDialog) {
                return false;
            }
            try {
                ExpressCraft.Form.InErrorDialog = true;
                var errStr;
                if (System.String.isNullOrWhiteSpace(message) || Bridge.referenceEquals(message, "Script error.")) {
                    errStr = "Script Error: See Browser Console for Detail's";
                } else {
                    errStr = System.String.concat("Script Error: ", message);
                }

                if (ExpressCraft.Application.AplicationDefition === ExpressCraft.ApplicationDefitnion.ExpressCraftConsole) {
                    ExpressCraft.ConsoleForm.Log(errStr, ExpressCraft.ConsoleLogType.Error);
                }

                if (ExpressCraft.Settings.ShowExceptionDialog) {
                    var msgBox = new ExpressCraft.MessageBoxForm.ctor(errStr, ExpressCraft.MessageBoxLayout.Error);
                    msgBox.ShowDialog();
                }
            }
            catch ($e1) {
                $e1 = System.Exception.create($e1);

            }
            finally {
                ExpressCraft.Form.InErrorDialog = false;
            }

            return false;
        },
        f14: function (ev) {
            if (Bridge.referenceEquals(ev.target, this.Body)) {
                ev.stopPropagation();
                ev.preventDefault();
            }
        },
        f15: function (ev) {
            if (ExpressCraft.Form.InExternalMouseEvent) {
                return;
            }
            var mev = ev;

            mev.stopPropagation();
            mev.stopImmediatePropagation();

            if (!this.IsActiveFormCollection()) {
                return;
            }

            ExpressCraft.Form.Mouse_Down = true;

            ExpressCraft.Form.MovingForm = this;
            ExpressCraft.Form.ActiveForm = this;

            ExpressCraft.Form.SetBodyOverLay();

            var clientRec = this.Content.getBoundingClientRect();

            var mousePos = ExpressCraft.Helper.GetClientMouseLocation(ev);

            this.prev_px = clientRec.left - mousePos.Xf;
            this.prev_py = clientRec.top - mousePos.Yf;

            var width = clientRec.width;
            var height = clientRec.height;

            var X = mousePos.Xf - clientRec.left;
            var Y = mousePos.Yf - clientRec.top;

            if (this.windowState === ExpressCraft.WindowState.Maximized) {
                ExpressCraft.Form.SetCursor("default");
                ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.Move;
            } else {
                if (this.InDesign) {
                    return;
                }

                if (this.HeadingTitle != null && Bridge.referenceEquals(ev.target, this.HeadingTitle)) {
                    ExpressCraft.Form.SetCursor("default");
                    ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.Move;
                } else {
                    if (this.AllowSizeChange) {
                        if (X <= ExpressCraft.Form.ResizeCorners && Y <= ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("nwse-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.TopLeftResize;
                        } else if (Y <= ExpressCraft.Form.ResizeCorners && X >= width - ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("nesw-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.TopRightResize;
                        } else if (Y <= ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("n-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.TopResize;
                        } else if (X <= ExpressCraft.Form.ResizeCorners && Y >= height - ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("nesw-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.BottomLeftResize;
                        } else if (Y >= height - ExpressCraft.Form.ResizeCorners && X >= width - ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("nwse-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.BottomRightResize;
                        } else if (Y >= height - ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("s-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.BottomResize;
                        } else if (X <= ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("w-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.LeftResize;

                        } else if (X >= width - ExpressCraft.Form.ResizeCorners) {
                            ExpressCraft.Form.SetCursor("e-resize");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.RightResize;
                        } else {
                            ExpressCraft.Form.SetCursor("default");
                            ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.Move;
                        }
                    }
                }
            }

            if (!this.AllowMoveChange && ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.Move) {
                ExpressCraft.Form.SetCursor("default");
                ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.None;
            }
        },
        f16: function (ev) {
            if (this.AllowSizeChange) {
                this.changeWindowState();
            }
            ev.preventDefault();
            ev.stopPropagation();
        },
        f17: function (ev) {
            if (ExpressCraft.Form.MovingForm == null) {
                ExpressCraft.Form.SetCursor("default");
            }
        },
        f18: function (ev) {
            ExpressCraft.Form.SetCursor("default");
        },
        f19: function (ev) {


            if (ExpressCraft.Form.InExternalMouseEvent) {
                return;
            }

            if (Bridge.referenceEquals(ev.target, this.HeadingTitle)) {
                return;
            }
            var mev = ev;

            var width = this.Content.clientWidth;
            var height = this.Content.clientHeight;
            var X = (mev.pageX - this.Content.offsetLeft) | 0;
            var Y = (mev.pageY - this.Content.offsetTop) | 0;

            if (ExpressCraft.Form.MovingForm != null && ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.Move) {
                ExpressCraft.Form.SetCursor("default");
                return;
            } else if (this.windowState === ExpressCraft.WindowState.Maximized) {
                ExpressCraft.Form.SetCursor("default");
                return;
            }
            if (this.InDesign) {
                return;
            }

            if (this.AllowSizeChange) {
                if (ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.TopLeftResize || X <= ExpressCraft.Form.ResizeCorners && Y <= ExpressCraft.Form.ResizeCorners) {
                    ExpressCraft.Form.SetCursor("nwse-resize");
                } else if (ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.TopRightResize || Y <= ExpressCraft.Form.ResizeCorners && X >= ((width - ExpressCraft.Form.ResizeCorners) | 0)) {
                    ExpressCraft.Form.SetCursor("nesw-resize");
                } else if (Y <= ExpressCraft.Form.ResizeCorners || ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.TopResize) {
                    ExpressCraft.Form.SetCursor("n-resize");
                } else if (ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.BottomLeftResize || X <= ExpressCraft.Form.ResizeCorners && Y >= ((height - ExpressCraft.Form.ResizeCorners) | 0)) {
                    ExpressCraft.Form.SetCursor("nesw-resize");
                } else if (ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.BottomRightResize || Y >= ((height - ExpressCraft.Form.ResizeCorners) | 0) && X >= ((width - ExpressCraft.Form.ResizeCorners) | 0)) {
                    ExpressCraft.Form.SetCursor("nwse-resize");
                } else if (ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.BottomResize || Y >= ((height - ExpressCraft.Form.ResizeCorners) | 0)) {
                    ExpressCraft.Form.SetCursor("s-resize");
                } else if (ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.LeftResize || X <= ExpressCraft.Form.ResizeCorners) {
                    ExpressCraft.Form.SetCursor("w-resize");
                } else if (ExpressCraft.Form.MoveAction === ExpressCraft.MouseMoveAction.RightResize || X >= ((width - ExpressCraft.Form.ResizeCorners) | 0)) {
                    ExpressCraft.Form.SetCursor("e-resize");
                } else {
                    ExpressCraft.Form.SetCursor("default");
                }
            } else {
                ExpressCraft.Form.SetCursor("default");
            }

        },
        f20: function (ev) {
            ExpressCraft.Form.SetBodyOverLay();
            if (!this.IsActiveFormCollection()) {
                return;
            }

            if (this.windowState === ExpressCraft.WindowState.Maximized) {
                ExpressCraft.Form.MovingForm = this;
                ExpressCraft.Form.SetCursor("default");

                ExpressCraft.Form.MoveAction = ExpressCraft.MouseMoveAction.Move;
            } else {
                ExpressCraft.Form.MovingForm = this;
            }

            ExpressCraft.Form.ActiveForm = this;
        },
        f21: function (ev) {
            if (ExpressCraft.Form.InExternalMouseEvent) {
                return;
            }
            if (!this.IsActiveFormCollection()) {
                return;
            }

            ExpressCraft.Form.ActiveForm = this;
            ExpressCraft.Form.MovingForm = null;
            ev.stopPropagation();
        },
        f22: function (ev) {
            if (ExpressCraft.Form.InExternalMouseEvent) {
                return;
            }

            if (ExpressCraft.Form.MovingForm == null) {
                if (!this.IsActiveFormCollection()) {
                    return;
                }
                ev.stopPropagation();
            }
        },
        f23: function (ev) {
            if (this.InDesign) {
                this.BodyOverLay.style.visibility = "collapse";
                return;
            }
            if (!this.IsActiveFormCollection()) {
                return;
            }
            this.BodyOverLay.style.visibility = "collapse";
            ExpressCraft.Form.ActiveForm = this;
        },
        f24: function (ev) {
            if (this.InDesign) {
                this.BodyOverLay.style.visibility = "collapse";
                return;
            }

            if (ExpressCraft.Form.MovingForm == null) {
                ExpressCraft.Form.SetBodyOverLay();
            }
        },
        f25: function (ev) {
            if (this.InDesign) {
                this.BodyOverLay.style.visibility = "collapse";
                return;
            }
            if (ExpressCraft.Form.MovingForm == null && this.IsActiveFormCollection()) {
                ExpressCraft.Form.SetCursor("default");
                this.BodyOverLay.style.visibility = "collapse";
            } else {
                this.BodyOverLay.style.visibility = "visible";
            }
        },
        f26: function () {
            ExpressCraft.Helper.Empty(this.Content);
            if (this.Content != null) {
                ExpressCraft.Helper.Delete(this.Content);
                this.Content = null;
            }
        },
        f27: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }
            ExpressCraft.Form.Mouse_Down = true;

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.ActiveForm = this;
        },
        f28: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            if (this.InDesign) {
                return;
            }

            this.Close();
        },
        f29: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }

            ExpressCraft.Form.SetCursor("default");
        },
        f30: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }
        },
        f31: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.Mouse_Down = false;

            this.changeWindowState();
        },
        f32: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.Mouse_Down = false;

            this.windowState = ExpressCraft.WindowState.Minimized;
        },
        f33: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.Mouse_Down = false;
        },
        f34: function (ev) {
            ev.stopPropagation();
        },
        f35: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }

            ev.stopImmediatePropagation();
            ev.preventDefault();
        },
        f36: function (ev) {
            if (ExpressCraft.Form.MovingForm != null) {
                return;
            }

            ExpressCraft.Form.Mouse_Down = true;

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.ActiveForm = this;
        }
    });

    Bridge.define("ExpressCraft.ContextMenu", {
        inherits: [ExpressCraft.Control],
        statics: {
            fields: {
                TotalContextHandles: 0,
                MainContextMenu: null
            },
            ctors: {
                init: function () {
                    this.TotalContextHandles = 0;
                }
            }
        },
        fields: {
            /**
             * For internal use only - so if we click on document - we can close all context menus ---
             *
             * @instance
             * @protected
             * @memberof ExpressCraft.ContextMenu
             * @type ExpressCraft.ContextMenu
             */
            SubContextOpened: null,
            ContextItems: null,
            Visible: false
        },
        ctors: {
            init: function () {
                this.ContextItems = new (System.Collections.Generic.List$1(ExpressCraft.ContextItem))();
                this.Visible = false;
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "contextmenu");
                this.Content.onmouseleave = Bridge.fn.bind(this, $asm.$.ExpressCraft.ContextMenu.f1);
            }
        },
        methods: {
            RenderContextMenu: function () {
                // What we need to do first is get the maxed size text...
                var x = 0;
                var ii = -1;

                ExpressCraft.Helper.Empty(this.Content);

                for (var i = 0; i < this.ContextItems.Count; i = (i + 1) | 0) {
                    var y = this.ContextItems.getItem(i).Caption.length;
                    if (y > x) {
                        x = y;
                        ii = i;
                    }
                }

                if (ii === -1) {
                    return;
                }
                var calwidth = Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(this.ContextItems.getItem(ii).Caption, ExpressCraft.Settings.DefaultFont));
                if (calwidth < ExpressCraft.Settings.ContextMenuMinWidth) {
                    calwidth = ExpressCraft.Settings.ContextMenuMinWidth;
                }
                var width = (((((((calwidth + 34) | 0) + 8) | 0) + 2) | 0));

                var top = 1;

                for (var i1 = 0; i1 < this.ContextItems.Count; i1 = (i1 + 1) | 0) {
                    var contextItem = { v : this.ContextItems.getItem(i1) };
                    var y1 = contextItem.v.Caption.length;
                    var item = ExpressCraft.Control.Label$1(contextItem.v.Caption, 1, top, ((width - 2) | 0), false, false, "contextitem");

                    item.onclick = (function ($me, contextItem) {
                        return Bridge.fn.bind($me, function (ev) {
                            if (contextItem.v.Enabled) {
                                if (!Bridge.staticEquals(contextItem.v.OnItemClick, null)) {
                                    contextItem.v.OnItemClick(contextItem.v);
                                }
                                this.Close();
                            }

                        });
                    })(this, contextItem);

                    this.Content.appendChild(item);

                    top = (top + 24) | 0;

                    if (this.ContextItems.getItem(i1).BeginGroup && i1 !== this.ContextItems.Count) {
                        top = (top + 1) | 0;
                        var sep = ExpressCraft.Control.Div$1("contextitemseperator");

                        sep.style.top = ExpressCraft.Helper.ToPx(Bridge.box(top, System.Int32));
                        sep.style.width = ExpressCraft.Helper.ToPx(Bridge.box(calwidth, System.Int32));

                        this.Content.appendChild(sep);

                        top = (top + 2) | 0;
                    }
                }

                top = (top + 1) | 0;

                ExpressCraft.Helper.SetSize$1(this.Content, width, top);
            },
            Show: function (Location) {
                if (ExpressCraft.ContextMenu.MainContextMenu != null) {
                    ExpressCraft.ContextMenu.MainContextMenu.Close();
                    ExpressCraft.ContextMenu.MainContextMenu = null;
                }
                ExpressCraft.ContextMenu.MainContextMenu = this;

                if (this.Visible) {
                    this.Close();
                }
                if (!this.Visible) {
                    ExpressCraft.Helper.SetLocation(this.Content, ((Location.Xi - 5) | 0), ((Location.Yi - 5) | 0));
                    this.RenderContextMenu();

                    ExpressCraft.ContextMenu.TotalContextHandles = (ExpressCraft.ContextMenu.TotalContextHandles + 1) | 0;
                    this.Content.style.zIndex = (((ExpressCraft.ContextMenu.TotalContextHandles + ExpressCraft.Settings.ContextMenuStartingZIndex) | 0)).toString();
                    document.body.appendChild(ExpressCraft.Control.op_Implicit(this));
                    this.Visible = true;
                }
            },
            Close: function () {
                if (this.Visible) {
                    ExpressCraft.ContextMenu.TotalContextHandles = (ExpressCraft.ContextMenu.TotalContextHandles - 1) | 0;
                    document.body.removeChild(ExpressCraft.Control.op_Implicit(this));
                    this.Visible = false;
                }

                if (this.SubContextOpened != null) {
                    this.SubContextOpened.Close();
                    this.SubContextOpened = null;
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.ContextMenu", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ContextMenu, {
        f1: function (ev) {
            this.Close();
        }
    });

    Bridge.define("ExpressCraft.DataColumnBool", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Boolean)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Bool;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnByte", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Byte)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Byte;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnDateTime", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.DateTime)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.DateTime;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnDecimal", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Decimal)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Decimal;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnDouble", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Double)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Double;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnFloat", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Single)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Float;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnInteger", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int32)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Integer;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnLong", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int64)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Long;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnObject", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Object))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Object;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnShort", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int16)))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.Short;
            }
        }
    });

    Bridge.define("ExpressCraft.DataColumnString", {
        inherits: [ExpressCraft.DataColumn],
        fields: {
            Cells: null
        },
        ctors: {
            init: function () {
                this.Cells = new (System.Collections.Generic.List$1(System.String))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.DataColumn.ctor.call(this);
                this.DataType = ExpressCraft.DataType.String;
            }
        }
    });

    Bridge.define("ExpressCraft.GridLookupEdit", {
        inherits: [ExpressCraft.Control],
        fields: {
            gridView: null,
            FieldName: null,
            DisplayName: null,
            Visible: false
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.Control.$ctor4.call(this, "inputcontrol", ExpressCraft.ComboBoxTypes.Default);
                var $t;
                this.gridView = ($t = new ExpressCraft.GridView(true, true), $t.Size = new ExpressCraft.Vector2.$ctor1(250, 400), $t);
                this.gridView.ContextMenu = null;
                this.gridView.OnFocusedRowChanged = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridLookupEdit.f1);

                this.gridView.Content.onmouseleave = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridLookupEdit.f2);
                this.Content.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridLookupEdit.f3);
        }
    },
    methods: {
        ShowPopup: function () {
            if (this.Visible) {
                return;
            }
            var x = this.Content.getBoundingClientRect();
            this.gridView.Location = new ExpressCraft.Vector2.$ctor1(x.left, x.top + x.height);

            ExpressCraft.ContextMenu.TotalContextHandles = (ExpressCraft.ContextMenu.TotalContextHandles + 1) | 0;
            this.Content.parentElement.appendChild(ExpressCraft.Control.op_Implicit(this.gridView));

            this.gridView.RenderGrid();

            this.gridView.Content.style.zIndex = (((ExpressCraft.ContextMenu.TotalContextHandles + ExpressCraft.Settings.ContextMenuStartingZIndex) | 0)).toString();
            this.Visible = true;
        },
        ClosePopup: function () {
            if (this.Visible) {
                this.gridView.Content.parentElement.removeChild(ExpressCraft.Control.op_Implicit(this.gridView));
                ExpressCraft.ContextMenu.TotalContextHandles = (ExpressCraft.ContextMenu.TotalContextHandles - 1) | 0;
                this.Visible = false;
            }
        }
    }
    });

    Bridge.ns("ExpressCraft.GridLookupEdit", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.GridLookupEdit, {
        f1: function (rowHandle, PrevRowhandle) {
            var $t1;
            ExpressCraft.Helper.Empty(this.Content);

            if (rowHandle > -1) {
                this.Content.appendChild(($t1 = document.createElement('option'), $t1.innerHTML = (Bridge.as(this.gridView.GetRowCellValue$3(rowHandle, this.DisplayName), System.String)), $t1.value = (Bridge.as(this.gridView.GetRowCellValue$3(rowHandle, this.FieldName), System.String)), $t1));
            }
            if (this.Visible) {
                this.ClosePopup();
            }
        },
        f2: function (ev) {
            this.ClosePopup();
        },
        f3: function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            if (this.Visible) {
                this.ClosePopup();
            } else {
                this.ShowPopup();
            }
        }
    });

    Bridge.define("ExpressCraft.GridView", {
        inherits: [ExpressCraft.Control],
        statics: {
            fields: {
                UnitHeight: 0
            },
            ctors: {
                init: function () {
                    this.UnitHeight = 28.0;
                }
            }
        },
        fields: {
            GridHeader: null,
            GridHeaderContainer: null,
            GridBodyContainer: null,
            GridBody: null,
            BottonOfTable: null,
            RightOfTable: null,
            RightOfTableHeader: null,
            _dataSource: null,
            OnFocusedRowChanged: null,
            OnRowDoubleClick: null,
            OnCustomRowStyle: null,
            OnRowClick: null,
            OnDoubleClick: null,
            OnCellRowMouseDown: null,
            SelectedRows: null,
            VisibleRowHandles: null,
            _allowRowDrag: false,
            AutoGenerateColumnsFromSource: false,
            AllowMultiSelection: false,
            showAutoFilterRow: false,
            _columnAutoWidth: false,
            _focusedcolumn: 0,
            _focusedDataHandle: 0,
            _columnHeadersVisible: false,
            _useEditForm: false,
            SortSettings: null,
            Columns: null,
            PrevRenderGridScrollId: 0,
            clickTimeDiff: null,
            DragIndex: 0,
            ResizeIndex: 0,
            ResizePageX: 0,
            ResizeSpan: null,
            OnColumnOnClick: null,
            OnColumnDragStart: null,
            OnColumnDragOver: null,
            OnColumnDrop: null,
            OnColumnMouseDown: null,
            OnColumnMouseMove: null,
            OnColumnMouseLeave: null,
            OnRowDragStart: null,
            lastId: 0,
            PrevScroll: 0,
            FilterRowOnChange: null,
            RenderTime: 0,
            renderGridInternal: null
        },
        props: {
            AllowRowDrag: {
                get: function () {
                    return this._allowRowDrag;
                },
                set: function (value) {
                    if (this._allowRowDrag !== value) {
                        this._allowRowDrag = value;
                        this.RenderGrid();
                    }
                }
            },
            ShowAutoFilterRow: {
                get: function () {
                    return this.showAutoFilterRow;
                },
                set: function (value) {
                    if (this.showAutoFilterRow !== value) {
                        this.showAutoFilterRow = value;
                        if (!this.showAutoFilterRow) {
                            // Remove Filter.						
                            for (var i = 0; i < this.ColumnCount(); i = (i + 1) | 0) {
                                //FilterEdit = null;
                                this.Columns.getItem(i).FilterEdit = null;
                                this.Columns.getItem(i).FilterValue = null;
                            }
                            this.CalculateVisibleRows();
                        }
                        this.RenderGrid();
                    }
                }
            },
            FocusedColumn: {
                get: function () {
                    return this._focusedcolumn;
                },
                set: function (value) {
                    if (value !== this.FocusedColumn) {
                        var prev = this._focusedcolumn;
                        this._focusedcolumn = value;
                        //RenderGrid();
                    }
                }
            },
            FocusedDataHandle: {
                get: function () {
                    return this._focusedDataHandle;
                },
                set: function (value) {
                    if (value !== this._focusedDataHandle) {
                        var prev = this._focusedDataHandle;
                        this._focusedDataHandle = value;
                        this.RenderGrid();
                        if (!Bridge.staticEquals(this.OnFocusedRowChanged, null)) {
                            this.OnFocusedRowChanged(this._focusedDataHandle, prev);
                        }
                    }
                }
            },
            ColumnHeadersVisible: {
                get: function () {
                    return this._columnHeadersVisible;
                },
                set: function (value) {
                    if (value !== this._columnHeadersVisible) {
                        this._columnHeadersVisible = value;

                        this.SetDefaultSizes();

                        this.RenderGrid();
                    }
                }
            },
            ColumnAutoWidth: {
                get: function () {
                    return this._columnAutoWidth;
                },
                set: function (value) {
                    if (value) {
                        this.GridBodyContainer.style.overflowX = "hidden";
                    } else {
                        this.GridBodyContainer.style.overflowX = "auto";
                    }

                    if (this._columnAutoWidth !== value) {
                        this._columnAutoWidth = value;
                        this.RenderGrid();
                    }
                }
            },
            UseEditForm: {
                get: function () {
                    return this._useEditForm;
                },
                set: function (value) {
                    if (value !== this._useEditForm) {
                        this._useEditForm = value;
                        this.RenderGrid();
                    }
                }
            },
            DataSource: {
                get: function () {
                    return this._dataSource;
                },
                set: function (value) {
                    this.FocusedDataHandle = -1;
                    this.SelectedRows = new (ExpressCraft.HardSoftList$1(System.Boolean))(false);
                    this.VisibleRowHandles = new (System.Collections.Generic.List$1(System.Int32))();

                    if (this._dataSource != null) {
                        this._dataSource.removeOnDataSourceChanged(Bridge.fn.cacheBind(this, this.DataSource_OnDataSourceChanged));
                    }

                    this._dataSource = value;

                    if (this._dataSource != null) {
                        this._dataSource.addOnDataSourceChanged(Bridge.fn.cacheBind(this, this.DataSource_OnDataSourceChanged));

                        if (this.Columns.Count === 0 && this.AutoGenerateColumnsFromSource) {
                            var sw = System.Diagnostics.Stopwatch.startNew();

                            for (var i = 0; i < this._dataSource.ColumnCount; i = (i + 1) | 0) {
                                var sw1 = System.Diagnostics.Stopwatch.startNew();

                                var gvc = new ExpressCraft.GridViewColumn(this);
                                gvc.Caption = this._dataSource.Columns.getItem(i).FieldName;
                                gvc.Column = this._dataSource.Columns.getItem(i);
                                gvc.Visible = true;

                                switch (this._dataSource.Columns.getItem(i).DataType) {
                                    case ExpressCraft.DataType.Byte: 
                                    case ExpressCraft.DataType.Short: 
                                    case ExpressCraft.DataType.Integer: 
                                    case ExpressCraft.DataType.Long: 
                                    case ExpressCraft.DataType.Float: 
                                    case ExpressCraft.DataType.Double: 
                                    case ExpressCraft.DataType.Decimal: 
                                        gvc.BodyApparence.Alignment = "right";
                                        break;
                                    case ExpressCraft.DataType.DateTime: 
                                        if (ExpressCraft.Settings.GridViewAutoColumnFormatDates) {
                                            if (ExpressCraft.Settings.GridViewAutoColumnGenerateFormatAsDate) {
                                                gvc.FormatString = "{0:d}";
                                            } else {
                                                gvc.FormatString = "{0:yyyy-MM-dd}";
                                            }
                                        }
                                        break;
                                    case ExpressCraft.DataType.Bool: 
                                        gvc.CellDisplay = new ExpressCraft.GridViewCellDisplayCheckBox();
                                        break;
                                }

                                this.Columns.add(gvc);

                                sw.stop();
                                System.Console.WriteLine("DataSource AddColumn Auto: " + sw1.milliseconds());
                            }

                            sw.stop();
                            System.Console.WriteLine("DataSource AutoColumns: " + sw.milliseconds());
                        }
                        this.RenderGrid();
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this.SelectedRows = new (ExpressCraft.HardSoftList$1(System.Boolean))(false);
                this._allowRowDrag = false;
                this.AutoGenerateColumnsFromSource = true;
                this.AllowMultiSelection = true;
                this.showAutoFilterRow = false;
                this._columnAutoWidth = false;
                this._focusedcolumn = -1;
                this._focusedDataHandle = -1;
                this._columnHeadersVisible = true;
                this._useEditForm = true;
                this.Columns = new (System.Collections.Generic.List$1(ExpressCraft.GridViewColumn))();
                this.PrevRenderGridScrollId = -1;
                this.DragIndex = -1;
                this.ResizeIndex = -1;
                this.ResizePageX = 0;
                this.lastId = -1;
                this.PrevScroll = -1;
                this.RenderTime = -1;
            },
            ctor: function (autoGenerateColumns, columnAutoWidth) {
                if (autoGenerateColumns === void 0) { autoGenerateColumns = true; }
                if (columnAutoWidth === void 0) { columnAutoWidth = false; }

                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "grid");
                this.Content.style.overflow = "hidden";

                this.renderGridInternal = Bridge.fn.bind(this, function () {
                    var StartedWith = this.RenderTime;

                    this.GridHeaderContainer.scrollLeft = this.GridBodyContainer.scrollLeft;
                    if (ExpressCraft.Settings.GridViewBlurOnScroll) {
                        this.ProcessBlur();
                    }

                    this.ValidateGridSize();

                    if (this.ColumnCount() === 0) {
                        this.ClearGrid();
                        return;
                    }

                    var RawLeftCellIndex = 0;
                    var RawLeftCellScrollPadding = 0;

                    var RawLeftCellCount = this.Columns.Count;

                    var LeftLocation = 0;
                    var foundLeftLocation = false;
                    var foundRightLocation = false;

                    var ClientWidth = this.GridBodyContainer.clientWidth;
                    var ViewWidth = (this.GridBodyContainer.scrollLeft + ClientWidth) | 0;
                    var _columnAutoWidthSingle = 0.0;
                    if (this._columnAutoWidth) {
                        _columnAutoWidthSingle = ClientWidth === 0 ? 0.0 : ((Bridge.Int.div(ClientWidth, this.Columns.Count)) | 0);
                    }

                    for (var x = 0; x < this.Columns.Count; x = (x + 1) | 0) {
                        this.Columns.getItem(x).CachedX = LeftLocation;
                        LeftLocation += this._columnAutoWidth ? _columnAutoWidthSingle : this.Columns.getItem(x).Width;
                        if (!foundLeftLocation && LeftLocation >= this.GridBodyContainer.scrollLeft) {
                            foundLeftLocation = true;
                            RawLeftCellIndex = x;
                            RawLeftCellScrollPadding = LeftLocation - this.GridBodyContainer.scrollLeft;
                        }
                        if (foundLeftLocation && !foundRightLocation && LeftLocation >= ViewWidth) {
                            foundRightLocation = true;
                            RawLeftCellCount = (x + 1) | 0;
                            break;
                        }
                        if (StartedWith !== this.RenderTime) {
                            return;
                        }
                    }

                    var Cols = new (System.Collections.Generic.List$1(HTMLSpanElement))();

                    var uboundRowCount = (RawLeftCellCount - 1) | 0;
                    if (this._columnHeadersVisible) {
                        for (var x1 = RawLeftCellIndex; x1 < RawLeftCellCount; x1 = (x1 + 1) | 0) {
                            if (x1 >= this.Columns.Count) {
                                break;
                            }
                            var gcol = this.Columns.getItem(x1);
                            var colIndex = x1;
                            var apparence = gcol.HeadingApparence;

                            var col = ExpressCraft.Control.Label$3(gcol.Caption, (this._columnAutoWidth ? gcol.CachedX : gcol.CachedX), 0, (this._columnAutoWidth ? _columnAutoWidthSingle : gcol.Width) - (x1 === uboundRowCount ? 0 : 1), apparence.IsBold, false, "heading", apparence.Alignment, apparence.Forecolor);
                            if (gcol.SortedMode !== ExpressCraft.GridViewSortMode.None) {
                                var sortImage = ExpressCraft.Control.Div$1(gcol.SortedMode === ExpressCraft.GridViewSortMode.Asc ? "grid-sort-up" : "grid-sort-down");
                                ExpressCraft.Helper.SetBounds$1(sortImage, "calc(100% - 13px)", 11, 9, 5);
                                col.appendChild(sortImage);
                            }

                            this.SetupColumn(col, x1, gcol);

                            Cols.add(col);

                            if (StartedWith !== this.RenderTime) {
                                return;
                            }
                        }
                    }



                    if (this._dataSource == null || this._dataSource.RowCount === 0 || this._dataSource.ColumnCount === 0) {
                        this.ClearGrid();
                        ExpressCraft.Helper.AppendChildren$1(this.GridHeader, Cols.toArray());
                        return;
                    }

                    var ppr = this.PixelsPerRow(this._dataSource.RowCount);

                    var RawTopRowIndex = this.GetRawTopRowIndex();
                    var RawTopRowScrollPadding = RawTopRowIndex % 1.0;
                    var RawVisibleRowCount = this.GetRawVisibleRowCount();

                    var Length = (Bridge.Int.clip32((RawVisibleRowCount + RawTopRowIndex)) + 1) | 0;
                    var start = Bridge.Int.clip32(RawTopRowIndex);
                    for (var x2 = (this.SelectedRows.SL.Count - 1) | 0; x2 >= 0; x2 = (x2 - 1) | 0) {
                        var Found = false;
                        for (var i = start; i < Length; i = (i + 1) | 0) {
                            if (i < this.DataSource.RowCount) {
                                var DataRowhandle = this.GetDataSourceRow(i);
                                if (this.SelectedRows.GetIndexValueByHardListIndex(this.SelectedRows.SL.getItem(x2)).Index === DataRowhandle) {
                                    Found = true;
                                    break;
                                }
                            }
                            if (StartedWith !== this.RenderTime) {
                                return;
                            }
                        }
                        if (StartedWith !== this.RenderTime) {
                            return;
                        }
                        if (!Found) {
                            this.SelectedRows.SL.removeAt(x2);
                        }
                    }

                    var Rows = new (System.Collections.Generic.List$1(HTMLDivElement))();

                    if (ExpressCraft.Settings.GridViewRowScrollPadding > 0) {
                        start = (start - ExpressCraft.Settings.GridViewRowScrollPadding) | 0;
                        Length = (Length + ExpressCraft.Settings.GridViewRowScrollPadding) | 0;
                    }

                    var Y = (start * (ppr)) - RawTopRowScrollPadding;
                    var Last = this.Columns.getItem(((RawLeftCellCount - 1) | 0));
                    var MaxWidth = (Last.CachedX + Last.Width);

                    if (this.ShowAutoFilterRow) {
                        Length = (Length - 1) | 0;
                        Y += ExpressCraft.GridView.UnitHeight;
                    }

                    // #TODO - CLEAN...
                    if (start < 0) {
                        start = 0;
                    }
                    if (Length > this.DataSource.RowCount) {
                        Length = this.DataSource.RowCount;
                    }

                    for (var i1 = start; i1 < Length; i1 = (i1 + 1) | 0) {
                        var DataRowhandle1 = this.GetDataSourceRow(i1);
                        var dr = ExpressCraft.Control.Div$1(System.String.concat((i1 % 2 === 0 ? "cellrow even" : "cellrow"), (this.SelectedRows.GetValue(DataRowhandle1, true) ? " cellrow-selected" : ""), (DataRowhandle1 === this.FocusedDataHandle ? " focusedrow" : "")));

                        ExpressCraft.Helper.SetBounds$1(dr, 0, Y, this._columnAutoWidth ? ClientWidth : MaxWidth, ExpressCraft.GridView.UnitHeight);
                        dr.setAttribute("i", System.Convert.toString(Bridge.box(DataRowhandle1, System.Int32)));

                        dr.onclick = this.OnRowClick;
                        if (ExpressCraft.Settings.IsChrome) {
                            dr.ondblclick = this.OnDoubleClick;
                        }

                        for (var x3 = RawLeftCellIndex; x3 < RawLeftCellCount; x3 = (x3 + 1) | 0) {
                            var col1 = this.Columns.getItem(x3);
                            var apparence1 = col1.BodyApparence;
                            var useDefault = false;
                            var cell;
                            if (col1.CellDisplay == null || ((useDefault = col1.CellDisplay.UseDefaultElement))) {
                                cell = ExpressCraft.Control.Label$3(col1.GetDisplayValueByDataRowHandle(DataRowhandle1), col1.CachedX, 0, this._columnAutoWidth ? _columnAutoWidthSingle : col1.Width, apparence1.IsBold, false, "cell", apparence1.Alignment, apparence1.Forecolor);

                                dr.appendChild(useDefault ? col1.CellDisplay.OnCreateDefault(cell, this, DataRowhandle1, x3) : cell);
                            } else {
                                cell = col1.CellDisplay.OnCreate(this, DataRowhandle1, x3);
                                ExpressCraft.Helper.SetLocation(cell, col1.CachedX, 0);
                                cell.style.width = ExpressCraft.Helper.ToPx(Bridge.box((this._columnAutoWidth ? _columnAutoWidthSingle : col1.Width), System.Single, System.Single.format, System.Single.getHashCode));

                                dr.appendChild(cell);
                            }
                            cell.setAttribute("i", x3.toString());
                            cell.onmousedown = this.OnCellRowMouseDown;
                        }

                        if (this.AllowRowDrag) {
                            dr.setAttribute("draggable", "true");

                            dr.ondragstart = this.OnRowDragStart;
                        }

                        Rows.add(dr);

                        Y += ExpressCraft.GridView.UnitHeight;

                        if (StartedWith !== this.RenderTime) {
                            return;
                        }
                    }

                    if (this.ShowAutoFilterRow) {
                        var dr1 = ExpressCraft.Control.Div$1("cellrow");

                        ExpressCraft.Helper.SetBounds$1(dr1, 0, 0, this._columnAutoWidth ? ClientWidth : MaxWidth, ExpressCraft.GridView.UnitHeight);
                        dr1.style.position = "sticky";
                        dr1.style.borderBottomColor = "darkgray";
                        dr1.style.borderBottomStyle = "solid";
                        dr1.style.borderBottomWidth = "thin";

                        for (var x4 = RawLeftCellIndex; x4 < RawLeftCellCount; x4 = (x4 + 1) | 0) {
                            var col2 = this.Columns.getItem(x4);
                            var apparence2 = col2.BodyApparence;

                            var cell1;
                            var tx;
                            if (col2.FilterEdit == null) {
                                tx = new ExpressCraft.TextInput(col2.Column.DataType === ExpressCraft.DataType.DateTime ? "datetime" : "text");
                                ;
                                tx.Content.classList.add("cell");
                            } else {
                                tx = col2.FilterEdit;
                            }

                            tx.Text = (System.String.concat(col2.FilterValue, ""));

                            tx.OnTextChanged = this.FilterRowOnChange;

                            cell1 = tx.Content;

                            ExpressCraft.Helper.SetLocation(cell1, col2.CachedX, 0);
                            cell1.style.width = ExpressCraft.Helper.ToPx(Bridge.box((this._columnAutoWidth ? _columnAutoWidthSingle : col2.Width), System.Single, System.Single.format, System.Single.getHashCode));

                            dr1.appendChild(cell1);

                            cell1.setAttribute("i", x4.toString());
                        }
                        Rows.add(dr1);
                    }


                    this.ClearGrid();

                    this.GridHeaderContainer.removeChild(this.GridHeader);
                    ExpressCraft.Helper.AppendChildren$1(this.GridHeader, Cols.toArray());
                    this.GridHeaderContainer.appendChild(this.GridHeader);

                    if (Rows.Count > 0) {
                        this.GridBodyContainer.removeChild(this.GridBody);

                        var rows = Rows.toArray();

                        ExpressCraft.Helper.AppendChildren$1(this.GridBody, rows);
                        var rowLeng = rows.length;

                        for (var i2 = 0; i2 < rowLeng; i2 = (i2 + 1) | 0) {
                            if (StartedWith !== this.RenderTime) {
                                return;
                            }
                            this.GridBody.appendChild(rows[System.Array.index(i2, rows)]);
                        }

                        if (!Bridge.staticEquals(this.OnCustomRowStyle, null)) {
                            for (var i3 = 0; i3 < rows.length; i3 = (i3 + 1) | 0) {
                                if (StartedWith !== this.RenderTime) {
                                    return;
                                }

                                try {
                                    this.OnCustomRowStyle(rows[System.Array.index(i3, rows)], parseInt(rows[System.Array.index(i3, rows)].getAttribute("i")));

                                }
                                catch (ex) {
                                    ex = System.Exception.create(ex);
                                    if (ExpressCraft.Application.AplicationDefition === ExpressCraft.ApplicationDefitnion.ExpressCraftConsole) {
                                        ExpressCraft.ConsoleForm.Log(ex.toString(), ExpressCraft.ConsoleLogType.Error);
                                    }
                                }
                            }
                        }

                        this.GridBodyContainer.appendChild(this.GridBody);
                    }
                    if (StartedWith !== this.RenderTime) {
                        return;
                    }

                    this.RenderTime = -1;
                });

                this.GridHeaderContainer = ExpressCraft.Control.Div$1("heading-container");

                this.GridHeader = ExpressCraft.Control.Div();
                ExpressCraft.Helper.SetBounds$1(this.GridHeader, "0", "0", "0", "29px");
                this.GridBodyContainer = ExpressCraft.Control.Div();

                this.GridBodyContainer.style.overflowX = "auto";
                this.GridBodyContainer.style.overflowY = "auto";

                this.GridHeaderContainer.style.overflow = "hidden";

                this.GridBody = ExpressCraft.Control.Div();
                ExpressCraft.Helper.SetBounds$1(this.GridBody, "0", "0", "0", "0");

                this.GridBodyContainer.appendChild(this.GridBody);
                this.GridHeaderContainer.appendChild(this.GridHeader);

                this.SetDefaultSizes();

                this.Content.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f1);

                this.OnResize = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f2);
                this.GridBodyContainer.onscroll = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f2);
                this.OnLoaded = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f3);
                this.OnCellRowMouseDown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f4);
                this.OnRowClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f5);
                this.Content.tabIndex = 0;
                this.OnDoubleClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f6);

                this.Content.onkeydown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f7);

                this.ContextMenu = new ExpressCraft.ContextMenu();

                this.ContextMenu.ContextItems.addRange(System.Array.init([new ExpressCraft.ContextItem.$ctor1("Sort Ascending", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f8)), new ExpressCraft.ContextItem.$ctor1("Sort Descending", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f9)), new ExpressCraft.ContextItem.$ctor1("Clear All Sorting", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f10), true), new ExpressCraft.ContextItem.$ctor2("Group By This Column"), new ExpressCraft.ContextItem.$ctor2("Hide Group By Box", true), new ExpressCraft.ContextItem.$ctor2("Hide This Column"), new ExpressCraft.ContextItem.$ctor2("View Columns"), new ExpressCraft.ContextItem.$ctor2("Save Column Layout"), new ExpressCraft.ContextItem.$ctor2("Best Fit"), new ExpressCraft.ContextItem.$ctor2("Best Fit (all columns)", true), new ExpressCraft.ContextItem.$ctor2("Filter Editor..."), new ExpressCraft.ContextItem.$ctor2("Show Find Panel"), new ExpressCraft.ContextItem.$ctor2("Show Auto Filter Row"), new ExpressCraft.ContextItem.$ctor1("Select All", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f11)), new ExpressCraft.ContextItem.$ctor1("Unselect All", Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f12))], ExpressCraft.ContextItem));

                this.Content.oncontextmenu = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f13);

                this.OnColumnOnClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f14);
                this.OnColumnDragStart = $asm.$.ExpressCraft.GridView.f15;
                this.OnColumnDragOver = $asm.$.ExpressCraft.GridView.f16;
                this.OnColumnDrop = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f17);
                this.OnColumnMouseDown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f18);
                this.OnColumnMouseMove = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f19);

                this.OnColumnMouseLeave = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f20);

                this.OnRowDragStart = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f21);

                ExpressCraft.Helper.AppendChildren$1(this.Content, [this.GridHeaderContainer, this.GridBodyContainer]);

                this.FilterRowOnChange = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f22);

                this.AutoGenerateColumnsFromSource = autoGenerateColumns;
                this.ColumnAutoWidth = columnAutoWidth;
            }
        },
        methods: {
            SetVisibleRowHandles: function (T, Cells, asc) {
                if (asc) {
                    var sorted = System.Linq.Enumerable.from(Cells).select(function (x, i) {
                            return new (System.Collections.Generic.KeyValuePair$2(System.Int32,T))(i, x);
                        }).orderBy($asm.$.ExpressCraft.GridView.f23).toList(System.Collections.Generic.KeyValuePair$2(System.Int32,T));

                    this.VisibleRowHandles = System.Linq.Enumerable.from(sorted).select($asm.$.ExpressCraft.GridView.f24).toList(System.Int32);
                } else {
                    var sorted1 = System.Linq.Enumerable.from(Cells).select(function (x, i) {
                            return new (System.Collections.Generic.KeyValuePair$2(System.Int32,T))(i, x);
                        }).orderByDescending($asm.$.ExpressCraft.GridView.f23).toList(System.Collections.Generic.KeyValuePair$2(System.Int32,T));

                    this.VisibleRowHandles = System.Linq.Enumerable.from(sorted1).select($asm.$.ExpressCraft.GridView.f24).toList(System.Int32);
                }
            },
            CalculateVisibleRows: function () {
                var calcVisibleRows = new (System.Collections.Generic.List$1(System.Int32))();

                for (var y = 0; y < this.RowCount(); y = (y + 1) | 0) {
                    var AddIndex = true;

                    for (var x = 0; x < this.ColumnCount(); x = (x + 1) | 0) {
                        if (!this.Columns.getItem(x).ValueMatchFilter(y)) {
                            AddIndex = false;
                            break;
                        }
                    }
                    if (AddIndex) {
                        calcVisibleRows.add(y);
                    }
                }

                this.VisibleRowHandles = calcVisibleRows;
                this.RenderGrid();
            },
            SetDefaultSizes: function () {
                if (this._columnHeadersVisible) {
                    ExpressCraft.Helper.SetBounds$1(this.GridHeaderContainer, "0", "0", "100%", "29px");
                    ExpressCraft.Helper.SetBounds$1(this.GridBodyContainer, "0px", "31px", "100%", "calc(100% - 31px)");
                    this.GridHeader.style.visibility = "visible";
                } else {
                    this.GridHeader.style.visibility = "hidden";
                    ExpressCraft.Helper.SetBounds$1(this.GridBodyContainer, "0px", "1px", "100%", "calc(100% - 1px)");
                }
            },
            SortColumn: function () {
                if (this.SortSettings != null) {
                    this.SortColumn$1(this.SortSettings.Column, this.SortSettings.SortMode);
                }
            },
            SortColumn$1: function (column, sort) {
                var $t;
                if (sort === void 0) { sort = 1; }
                column.SortedMode = sort;

                if (this.SortSettings != null && !Bridge.referenceEquals(this.SortSettings.Column, column)) {
                    this.SortSettings.Column.SortedMode = ExpressCraft.GridViewSortMode.None;
                    this.VisibleRowHandles = null;
                }

                if (sort === ExpressCraft.GridViewSortMode.None) {
                    this.VisibleRowHandles = null;
                } else {
                    var sort1 = sort === ExpressCraft.GridViewSortMode.Asc;

                    switch (column.Column.DataType) {
                        default: 
                        case ExpressCraft.DataType.Object: 
                            this.SetVisibleRowHandles(System.Object, (Bridge.as(column.Column, ExpressCraft.DataColumnObject)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Bool: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Boolean), (Bridge.as(column.Column, ExpressCraft.DataColumnBool)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.DateTime: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.DateTime), (Bridge.as(column.Column, ExpressCraft.DataColumnDateTime)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.String: 
                            this.SetVisibleRowHandles(System.String, (Bridge.as(column.Column, ExpressCraft.DataColumnString)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Byte: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Byte), (Bridge.as(column.Column, ExpressCraft.DataColumnByte)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Short: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Int16), (Bridge.as(column.Column, ExpressCraft.DataColumnShort)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Integer: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Int32), (Bridge.as(column.Column, ExpressCraft.DataColumnInteger)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Long: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Int64), (Bridge.as(column.Column, ExpressCraft.DataColumnLong)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Float: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Single), (Bridge.as(column.Column, ExpressCraft.DataColumnFloat)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Double: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Double), (Bridge.as(column.Column, ExpressCraft.DataColumnDouble)).Cells, sort1);
                            break;
                        case ExpressCraft.DataType.Decimal: 
                            this.SetVisibleRowHandles(System.Nullable$1(System.Decimal), (Bridge.as(column.Column, ExpressCraft.DataColumnDecimal)).Cells, sort1);
                            break;
                    }
                }

                this.RenderGrid();
                this.SortSettings = ($t = new ExpressCraft.SortSetting(), $t.Column = column, $t.SortMode = sort, $t);
            },
            ClearSortColumn: function () {
                if (this.SortSettings != null) {
                    this.SortColumn$1(this.SortSettings.Column, ExpressCraft.GridViewSortMode.None);
                }
            },
            ColumnCount: function () {
                return this.Columns.Count;
            },
            RowCount: function () {
                if (this._dataSource == null) {
                    return 0;
                }
                return this._dataSource.RowCount;
            },
            ScrollToBottom: function () {
                this.GridBodyContainer.scrollTop = (this.GridBody.clientHeight - this.GridBodyContainer.clientHeight) | 0;
            },
            ScrollToTop: function () {
                this.GridBodyContainer.scrollTop = 0;
            },
            GetColumn: function (i) {
                return this.Columns.getItem(i);
            },
            GetFocusedRowCellValue$2: function (columnIndex) {
                return this.GetFocusedRowCellValue$1(this.Columns.getItem(columnIndex));
            },
            GetFocusedRowCellValue$3: function (FieldName) {
                return this.GetFocusedRowCellValue(this.GetColumnByFieldName(FieldName));
            },
            GetFocusedRowCellValue$1: function (column) {
                return this.GetRowCellValue$1(this.FocusedDataHandle, column);
            },
            GetFocusedRowCellValue: function (column) {
                return this.GetRowCellValue(this.FocusedDataHandle, column);
            },
            GetGridViewColumnByFieldName: function (FieldName) {
                for (var i = 0; i < this.ColumnCount(); i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.Columns.getItem(i).Column.FieldName, FieldName)) {
                        return this.Columns.getItem(i);
                    }
                }
                return null;
            },
            GetRowCellValue$1: function (Datahandle, column) {
                return this.GetRowCellValue(Datahandle, column.Column);
            },
            GetRowCellValue: function (Datahandle, column) {
                if (Datahandle === -1) {
                    return null;
                }
                return column.GetCellValue(Datahandle);
            },
            GetRowCellValue$3: function (Datahandle, FieldName) {
                return this.GetRowCellValue(Datahandle, this.GetColumnByFieldName(FieldName));
            },
            GetRowCellValue$2: function (Datahandle, columnIndex) {
                return this.GetRowCellValue$1(Datahandle, this.Columns.getItem(columnIndex));
            },
            GetColumnByFieldName: function (fieldName, IgnoreCase) {
                if (IgnoreCase === void 0) { IgnoreCase = false; }
                if (this.DataSource == null) {
                    return null;
                }

                for (var i = 0; i < this.DataSource.ColumnCount; i = (i + 1) | 0) {
                    if (this.DataSource.Columns.getItem(i) != null && System.String.compare(this.DataSource.Columns.getItem(i).FieldName, fieldName, IgnoreCase) === 0) {
                        return this.DataSource.Columns.getItem(i);
                    }
                }

                return null;
            },
            AddColumn$2: function (caption, fieldname, width, formatstring, alignment, forecolor, isBold) {
                if (width === void 0) { width = 100; }
                if (formatstring === void 0) { formatstring = ""; }
                if (alignment === void 0) { alignment = 3; }
                if (forecolor === void 0) { forecolor = null; }
                if (isBold === void 0) { isBold = false; }
                var col = this.GetColumnByFieldName(fieldname);
                if (col == null) {
                    return;
                }
                this.AddColumn$1(caption, col, width, formatstring, alignment, forecolor, isBold);
            },
            AddColumn$1: function (caption, column, width, formatstring, alignment, forecolor, isBold) {
                var $t;
                if (width === void 0) { width = 100; }
                if (formatstring === void 0) { formatstring = ""; }
                if (alignment === void 0) { alignment = 3; }
                if (forecolor === void 0) { forecolor = null; }
                if (isBold === void 0) { isBold = false; }
                this.AddColumn(($t = new ExpressCraft.GridViewColumn(this, width), $t.Caption = caption, $t.BodyApparence = new ExpressCraft.GridViewCellApparence.$ctor3(isBold, alignment, forecolor), $t.FormatString = formatstring, $t.Column = column, $t));
            },
            AddColumn: function (column) {
                if (column == null) {
                    return;
                }

                this.Columns.add(column);

                this.RenderGrid();
            },
            AddColumns: function (columns) {
                if (columns === void 0) { columns = []; }
                if (columns == null || columns.length === 0) {
                    return;
                }

                this.Columns.addRange(columns);

                this.RenderGrid();
            },
            RemoveColumn: function (column) {
                this.Columns.remove(column);

                this.RenderGrid();
            },
            GetDataSourceRow: function (i) {
                if (this.VisibleRowHandles == null || this.VisibleRowHandles.Count === 0) {
                    return i;
                }
                return this.VisibleRowHandles.getItem(i);
            },
            GetColumnWidths: function () {
                if (this._columnAutoWidth) {
                    return this.GridBodyContainer.clientWidth;
                } else {
                    var width = 0.0;
                    for (var i = 0; i < this.Columns.Count; i = (i + 1) | 0) {
                        width += this.Columns.getItem(i).Width;
                    }
                    return width;
                }
            },
            ClearSelection: function () {
                this.SelectedRows = new (ExpressCraft.HardSoftList$1(System.Boolean))(false);
                this.RenderGrid();
            },
            SelectAllRows: function () {
                var length = this.RowCount();
                if (length === 0) {
                    this.SelectedRows.ClearAll();
                } else {
                    var index = System.Array.init(length, 0, System.Int32);
                    for (var i = 0; i < length; i = (i + 1) | 0) {
                        index[System.Array.index(i, index)] = this.GetDataSourceRow(i);
                    }
                    this.SelectedRows.ClearAllSetHardRange(true, index);
                }
                this.RenderGrid();
            },
            DelayedRenderGrid: function () {
                if (ExpressCraft.Settings.GridViewScrollDelayed) {
                    if (this.PrevRenderGridScrollId !== -1) {
                        Bridge.global.clearTimeout(this.PrevRenderGridScrollId);
                        this.PrevRenderGridScrollId = -1;
                    }
                    this.PrevRenderGridScrollId = Bridge.global.setTimeout(Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f25), Math.max(1, ExpressCraft.Settings.GridViewScrollDelayMS));
                } else {
                    this.RenderGrid();
                }
            },
            DataSource_OnDataSourceChanged: function (sender, e) {
                this.SortColumn();
                this.RenderGrid();
            },
            Render: function () {
                ExpressCraft.Control.prototype.Render.call(this);
                this.HasRendered = true;
                this.RenderGrid();

                if (this.Content.parentElement != null) {

                }
            },
            GetRawVisibleRowCount: function () {
                return this.GridBodyContainer.clientHeight === 0 ? 0.0 : this.GridBodyContainer.clientHeight / ExpressCraft.GridView.UnitHeight;
            },
            GetRawTopRowIndex: function () {
                return this.GridBodyContainer.scrollTop === 0 ? 0.0 : this.GridBodyContainer.scrollTop / this.PixelsPerRow(this.RowCount());
            },
            ValidateGridWidth: function () {
                var width = this.GetColumnWidths();
                this.GridBody.style.width = ExpressCraft.Helper.ToPx(Bridge.box((width), System.Single, System.Single.format, System.Single.getHashCode));
                this.GridHeader.style.width = ExpressCraft.Helper.ToPx(Bridge.box(((width) + 24), System.Single, System.Single.format, System.Single.getHashCode)); // (width).ToPx();
                if (this.RightOfTable == null) {
                    this.RightOfTable = ExpressCraft.Control.Div();
                    this.GridBody.appendChild(this.RightOfTable);
                }
                if (this.RightOfTableHeader == null) {
                    this.RightOfTableHeader = ExpressCraft.Control.Div();
                    this.GridHeader.appendChild(this.RightOfTableHeader);
                }
                ExpressCraft.Helper.SetBounds$1(this.RightOfTable, width - 1, 0, 1, 1);
                ExpressCraft.Helper.SetBounds$1(this.RightOfTableHeader, width - 1, 0, 1, 1);
            },
            PixelsPerRow: function (rowCount) {
                if (rowCount > ExpressCraft.Settings.MaximumPixelScrollingRows) {
                    return 3.0;
                } else {
                    return ExpressCraft.GridView.UnitHeight;
                }
            },
            ValidateGridHeight: function () {
                var i = this.RowCount();
                var ppr = this.PixelsPerRow(i);
                var height = ppr * i;

                if (i > ExpressCraft.Settings.MaximumPixelScrollingRows && this.GridBodyContainer.clientHeight > 0) {
                    height += ((this.GridBodyContainer.clientHeight / ExpressCraft.GridView.UnitHeight) * ppr);
                }

                this.GridBody.style.height = ExpressCraft.Helper.ToPx(Bridge.box(height, System.Single, System.Single.format, System.Single.getHashCode));
                if (this.BottonOfTable == null) {
                    this.BottonOfTable = ExpressCraft.Control.Div();
                    this.GridBody.appendChild(this.BottonOfTable);
                }
                ExpressCraft.Helper.SetBounds$1(this.BottonOfTable, 0, height - 1, 1, 1);
            },
            ValidateGridSize: function () {
                this.ValidateGridHeight();
                this.ValidateGridWidth();
            },
            ClearHeader: function () {
                ExpressCraft.Helper.Empty(this.GridHeader);
                this.GridHeader.appendChild(this.RightOfTableHeader);
            },
            ClearColumns: function () {
                this.Columns = new (System.Collections.Generic.List$1(ExpressCraft.GridViewColumn))();
            },
            ClearView: function () {
                this.Columns = new (System.Collections.Generic.List$1(ExpressCraft.GridViewColumn))();
                this.VisibleRowHandles = new (System.Collections.Generic.List$1(System.Int32))();
                this.SelectedRows = new (ExpressCraft.HardSoftList$1(System.Boolean))(false);
                this._dataSource = null;
            },
            ClearBody: function () {
                ExpressCraft.Helper.Empty(this.GridBody);
                ExpressCraft.Helper.AppendChildren$1(this.GridBody, [this.RightOfTable, this.BottonOfTable]);
            },
            ClearGrid: function () {
                this.ClearHeader();
                this.ClearBody();
            },
            SetupColumn: function (se, index, gcol) {
                se.setAttribute("i", System.Convert.toString(Bridge.box(index, System.Int32)));
                se.setAttribute("draggable", "true");
                se.onclick = this.OnColumnOnClick;
                se.ondragstart = this.OnColumnDragStart;
                se.ondragover = this.OnColumnDragOver;
                se.ondrop = this.OnColumnDrop;
                se.onmousedown = this.OnColumnMouseDown;
                se.onmousemove = this.OnColumnMouseMove;
                se.onmouseleave = this.OnColumnMouseLeave;
            },
            ProcessBlur: function () {
                if (this.PrevScroll !== this.GridBodyContainer.scrollTop) {
                    this.GridBody.classList.add("blur");
                    if (this.lastId !== -1) {
                        Bridge.global.clearTimeout(this.lastId);
                        this.lastId = -1;
                    }

                    this.lastId = Bridge.global.setTimeout(Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f26), 100);
                }
                this.PrevScroll = this.GridBodyContainer.scrollTop;
            },
            RenderGrid: function () {
                if (this.RenderTime > -1) {
                    Bridge.global.clearTimeout(this.RenderTime);
                    this.RenderTime = Bridge.global.setTimeout(this.renderGridInternal, 1);
                } else {
                    this.renderGridInternal();
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.GridView", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.GridView, {
        f1: function (ev) {
            if (this.ResizeIndex === -1) {
                return;
            }
            var x = ev.pageX;
            x = (this.Columns.getItem(this.ResizeIndex).Width + (((x - this.ResizePageX) | 0))) | 0;
            if (x < 24) {
                x = 24;
            }
            this.Columns.getItem(this.ResizeIndex).Width = x;

            ExpressCraft.Form.SetCursor("default");

            ev.preventDefault();
            ev.stopImmediatePropagation();
            ev.stopPropagation();

            this.ResizeIndex = -1;
            this.ResizeSpan = null;
        },
        f2: function (ev) {
            this.DelayedRenderGrid();
        },
        f3: function (ev) {
            this.RenderGrid();
        },
        f4: function (ev) {
            this.FocusedColumn = parseInt(ev.currentTarget.getAttribute("i"));
        },
        f5: function (ev) {
            if (!ExpressCraft.Settings.IsChrome) {
                if (this.clickTimeDiff == null) {
                    this.clickTimeDiff = System.Diagnostics.Stopwatch.startNew();
                } else {
                    this.clickTimeDiff.stop();
                    var ems = this.clickTimeDiff.milliseconds();
                    this.clickTimeDiff = null;

                    if (ems.lt(System.Int64(200))) {
                        this.OnDoubleClick(ev);
                    }
                }
            }

            var DataRowHandle = parseInt(ev.currentTarget.getAttribute("i"));

            var mev = ev;
            if (this.AllowMultiSelection) {
                if (mev.ctrlKey) {
                    this.SelectedRows.AddOrSet(true, DataRowHandle, true);
                    this.RenderGrid();
                    return;
                } else if (mev.shiftKey) {
                    return;
                }
            }
            this.SelectedRows.ClearAndAddOrSet(true, DataRowHandle, true);
            if (DataRowHandle !== this._focusedDataHandle) {
                this.FocusedDataHandle = DataRowHandle;
            } else {
                this.RenderGrid();
            }
        },
        f6: function (ev) {
            var drh = parseInt(ev.currentTarget.getAttribute("i"));
            if (!Bridge.staticEquals(this.OnRowDoubleClick, null)) {
                this.OnRowDoubleClick(drh);
            }

            if (this._useEditForm) {
                var idr = this.DataSource.getItem(drh);

                var fdre = new ExpressCraft.DataRowEditForm(idr, this, true);
                fdre.ShowDialog();

            }
        },
        f7: function (ev) {
            var kev = ev;
            //Global.Alert("CONTROL + A");
            if (this.AllowMultiSelection && kev.ctrlKey && (kev.keyCode === 65 || kev.keyCode === 97)) {
                // keyCode == 65 || keyCode == 97
                //Global.Alert("AllowMultiSelection = TRUE");
                this.SelectAllRows();
            } else {
                //Global.Alert("AllowMultiSelection = FALSE");
            }
        },
        f8: function (cm) {
            if (this.FocusedColumn > -1) {
                this.SortColumn$1(this.Columns.getItem(this.FocusedColumn), ExpressCraft.GridViewSortMode.Asc);
            }
        },
        f9: function (cm) {
            if (this.FocusedColumn > -1) {
                this.SortColumn$1(this.Columns.getItem(this.FocusedColumn), ExpressCraft.GridViewSortMode.Desc);
            }
        },
        f10: function (cm) {
            this.ClearSortColumn();
        },
        f11: function (cm) {
            this.SelectAllRows();
        },
        f12: function (cm) {
            this.ClearSelection();
        },
        f13: function (ev) {
            if (this.ContextMenu != null) {
                this.ContextMenu.Show(ExpressCraft.Helper.GetClientMouseLocation(ev));
                ev.preventDefault();
                ev.stopPropagation();
            }
        },
        f14: function (ev) {
            if (this.ResizeIndex >= 0) {
                return;
            }

            var gcol = this.Columns.getItem(parseInt(ev.currentTarget.getAttribute("i")));

            for (var i = 0; i < this.ColumnCount(); i = (i + 1) | 0) {
                if (!Bridge.referenceEquals(this.Columns.getItem(i), gcol)) {
                    this.Columns.getItem(i).SortedMode = ExpressCraft.GridViewSortMode.None;
                }
            }
            switch (gcol.SortedMode) {
                default: 
                case ExpressCraft.GridViewSortMode.None: 
                    this.SortColumn$1(gcol, ExpressCraft.GridViewSortMode.Asc);
                    break;
                case ExpressCraft.GridViewSortMode.Asc: 
                    this.SortColumn$1(gcol, ExpressCraft.GridViewSortMode.Desc);
                    break;
                case ExpressCraft.GridViewSortMode.Desc: 
                    this.SortColumn$1(gcol, ExpressCraft.GridViewSortMode.None);
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

            if (!Bridge.referenceEquals(target.parentElement, this.GridHeader)) {
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
                this.DragIndex = HoverIndex;
            } else {
                this.DragIndex = (HoverIndex + 1) | 0;
            }

            if (this.DragIndex < 0 || SelectedIndex < 0) {
                return;
            }
            var col = this.Columns.getItem(SelectedIndex);
            if (this.DragIndex === this.Columns.Count) {
                this.Columns.remove(col);
                this.Columns.add(col);
            } else {
                var col1 = this.Columns.getItem(this.DragIndex);
                this.Columns.remove(col);
                this.Columns.insert(this.Columns.indexOf(col1), col);
            }

            this.RenderGrid();
        },
        f18: function (ev) {
            var x = ev.layerX;
            var target = ev.target;
            x = (x - target.clientLeft) | 0;
            this.ResizePageX = ev.pageX;

            this.FocusedColumn = parseInt(ev.currentTarget.getAttribute("i"));

            if (x >= ((target.clientWidth - 2) | 0)) {
                this.ResizeIndex = parseInt(target.getAttribute("i"));
                this.ResizeSpan = target;
                ExpressCraft.Form.SetCursor("ew-resize");

                ev.preventDefault();
            } else {
                this.ResizeSpan = null;
                this.ResizeIndex = -1;
            }
        },
        f19: function (ev) {
            if (this.ResizeIndex === -1) {
                var x = ev.layerX;
                var target = ev.target;
                x = (x - target.clientLeft) | 0;

                if (x >= ((target.clientWidth - 2) | 0)) {
                    ExpressCraft.Form.SetCursor("ew-resize");
                    return;
                }
                ExpressCraft.Form.SetCursor("default");
            }
        },
        f20: function (ev) {
            if (this.ResizeIndex === -1) {
                ExpressCraft.Form.SetCursor("default");
            }
        },
        f21: function (ev) {
            ev.dataTransfer.setData("gridviewRowDrag", JSON.stringify(this.DataSource.getItem(parseInt(ev.currentTarget.getAttribute("i"))).GetOfflineDataRow()));
        },
        f22: function (te) {
            this.Columns.getItem(parseInt(te.Content.getAttribute("i"))).FilterValue = te.Text;
        },
        f23: function (x) {
            return x.value;
        },
        f24: function (x) {
            return x.key;
        },
        f25: function () {
            this.RenderGrid();
        },
        f26: function () {
            this.GridBody.classList.remove("blur");
        }
    });

    Bridge.define("ExpressCraft.GridViewCellDisplayCheckBox", {
        inherits: [ExpressCraft.GridViewCellDisplay],
        statics: {
            fields: {
                resource_checked: null
            },
            ctors: {
                init: function () {
                    this.resource_checked = "checked";
                }
            }
        },
        methods: {
            OnCreate: function (gridView, dataRowIndex, columnIndex) {
                var value = gridView.GetRowCellValue$2(dataRowIndex, columnIndex);

                var cell = ExpressCraft.Control.Div$1("cell");
                var input = ExpressCraft.Control.Input("", "checkbox");
                ExpressCraft.Helper.SetBoundsFull$1(input);
                ExpressCraft.Helper.SetChecked(input, value);
                input.style.margin = "0";
                cell.appendChild(input);

                return cell;
            }
        }
    });

    Bridge.define("ExpressCraft.GridViewCellDisplayImage", {
        inherits: [ExpressCraft.GridViewCellDisplay],
        fields: {
            UseBase64Resource: false
        },
        methods: {
            OnCreate: function (gridView, dataRowIndex, columnIndex) {
                var src = ExpressCraft.Helper.HtmlUrlEscape((System.String.concat(gridView.GetRowCellValue$2(dataRowIndex, columnIndex), "")));
                var imgDiv = ExpressCraft.Control.Div$1("cell");

                ExpressCraft.Helper.SetImage(imgDiv, src, !this.UseBase64Resource);

                return imgDiv;
            }
        }
    });

    Bridge.define("ExpressCraft.ProgressControl", {
        inherits: [ExpressCraft.Control],
        fields: {
            position: 0,
            internalProgressControl: null,
            maximum: 0,
            Step: 0,
            DisableUpdate: false
        },
        props: {
            Maximum: {
                get: function () {
                    return this.maximum;
                },
                set: function (value) {
                    if (value < 1) {
                        value = 1;
                    }
                    if (value < this.position) {
                        this.position = value;
                    }
                    this.maximum = value;
                    if (!this.DisableUpdate) {
                        this.Update();
                    }
                }
            },
            Position: {
                get: function () {
                    return this.position;
                },
                set: function (value) {
                    if (value < 0) {
                        value = 0;
                    } else {
                        if (value > this.maximum) {
                            value = this.maximum;
                        }
                    }
                    this.position = value;
                    if (!this.DisableUpdate) {
                        this.Update();
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this.Step = 1;
                this.DisableUpdate = false;
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "progressbar");
                this.internalProgressControl = ExpressCraft.Control.Div$1("progressbarbody");
            }
        },
        methods: {
            NextStep: function () {
                this.Position = (this.Position + this.Step) | 0;
            },
            Render: function () {
                ExpressCraft.Control.prototype.Render.call(this);

                this.Content.appendChild(this.internalProgressControl);

                this.Update();
            },
            Update: function () {
                if (this.DisableUpdate || this.internalProgressControl == null) {
                    return;
                }
                if (this.maximum === 0 || this.position === 0) {
                    this.internalProgressControl.style.width = "0%";
                } else {
                    var source = ((this.position / this.maximum) * 100.00) + '%';
                    this.internalProgressControl.style.width = System.String.concat("calc(", source, " - 2px)");
                }
            }
        }
    });

    Bridge.define("ExpressCraft.RibbonButton", {
        inherits: [ExpressCraft.Control],
        fields: {
            _icon: null,
            _iconURL: null,
            _caption: null,
            BeginGroup: false,
            IsSmallCaption: false,
            OnItemClick: null,
            enabled: false,
            captionDiv: null,
            imageDiv: null
        },
        props: {
            Icon: {
                get: function () {
                    return this._icon;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._icon, value)) {
                        this._icon = value;
                        this.ProcessImage();
                    }
                }
            },
            IconURL: {
                get: function () {
                    return this._iconURL;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._iconURL, value)) {
                        this._iconURL = value;
                        this.ProcessImage();
                    }
                }
            },
            Caption: {
                get: function () {
                    return this._caption;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._caption, value)) {
                        this._caption = value;
                        this.ProcessCaption();
                    }
                }
            },
            Enabled: {
                get: function () {
                    return this.enabled;
                },
                set: function (value) {
                    this.enabled = value;
                    this.setEnabled(value);
                }
            }
        },
        ctors: {
            init: function () {
                this._icon = "";
                this._iconURL = "";
                this._caption = "";
                this.BeginGroup = false;
                this.IsSmallCaption = false;
                this.enabled = true;
            },
            ctor: function (caption, _isSmallCaption) {
                if (caption === void 0) { caption = ""; }
                if (_isSmallCaption === void 0) { _isSmallCaption = false; }

                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, _isSmallCaption ? "ribbonbuttonsmall" : "ribbonbutton");
                this._caption = caption;
                this.IsSmallCaption = _isSmallCaption;
            }
        },
        methods: {
            setEnabled: function (value) {
                this.ChangeState(value);
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
            Render: function () {
                this.HasRendered = true;
                ExpressCraft.Helper.Empty(this.Content);

                this.Content.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.RibbonButton.f1);

                this.ProcessCaption();
                this.ProcessImage();

                this.setEnabled(this.enabled);
            },
            ProcessCaption: function () {
                if (!System.String.isNullOrWhiteSpace(this.Caption)) {
                    this.captionDiv = ExpressCraft.Control.Div$1(this.IsSmallCaption ? "ribbonbuttonsmallcaption" : "ribbonbuttoncaption");

                    this.captionDiv.innerHTML = this.Caption;

                    this.Content.appendChild(this.captionDiv);

                } else {
                    if (this.captionDiv != null) {
                        this.captionDiv.remove();
                    }
                }
            },
            ProcessImage: function () {
                if (this.imageDiv == null) {
                    if (!System.String.isNullOrWhiteSpace(this.Icon)) {
                        this.imageDiv = ExpressCraft.Control.Div$1(this.IsSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                        this.imageDiv.style.background = ExpressCraft.Control.GetImageString(this.Icon);

                        this.Content.appendChild(this.imageDiv);
                    } else if (!System.String.isNullOrWhiteSpace(this.IconURL)) {
                        this.imageDiv = ExpressCraft.Control.Div$1(this.IsSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                        this.imageDiv.style.background = ExpressCraft.Control.GetImageStringURI(this.IconURL);

                        this.Content.appendChild(this.imageDiv);
                    }
                } else {
                    if (!System.String.isNullOrWhiteSpace(this.Icon)) {
                        this.imageDiv.style.background = ExpressCraft.Control.GetImageString(this.Icon);
                    } else if (!System.String.isNullOrWhiteSpace(this.IconURL)) {
                        this.imageDiv.style.background = ExpressCraft.Control.GetImageStringURI(this.IconURL);
                    }
                }
                if (this.imageDiv != null) {
                    this.imageDiv.style.backgroundSize = "100% 100%";

                    if (this.captionDiv != null && this.IsSmallCaption) {
                        this.captionDiv.style.left = "28px";
                    }
                } else {
                    if (this.captionDiv != null && this.IsSmallCaption) {
                        this.captionDiv.style.left = "6px";
                    }
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.RibbonButton", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.RibbonButton, {
        f1: function (ev) {
            if (this.enabled && !Bridge.staticEquals(this.OnItemClick, null)) {
                this.OnItemClick(this);
            }
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.RibbonControl", {
        inherits: [ExpressCraft.Control],
        fields: {
            IconURL: null,
            Type: 0,
            ApplicationIcon: null,
            OnSelectedPageChange: null,
            selectedindex: 0
        },
        props: {
            RibbonPages: null,
            SelectedIndex: {
                get: function () {
                    return this.selectedindex;
                },
                set: function (value) {
                    if (value < 0) {
                        value = 0;
                    }
                    if (this.selectedindex >= this.RibbonPages.Count) {
                        this.selectedindex = (this.RibbonPages.Count - 1) | 0;
                    }

                    if (this.selectedindex !== value) {
                        this.selectedindex = value;
                        if (!Bridge.staticEquals(this.OnSelectedPageChange, null)) {
                            this.OnSelectedPageChange(this.selectedindex, this.RibbonPages.getItem(this.selectedindex));
                        }
                    }
                    this.SetSelectedIndex(value);
                }
            }
        },
        ctors: {
            init: function () {
                this.IconURL = "fav.ico";
                this.selectedindex = -1;
                this.RibbonPages = new (System.Collections.Generic.List$1(ExpressCraft.RibbonPage))();
            },
            ctor: function (type) {
                if (type === void 0) { type = 0; }

                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, System.String.concat("ribboncontrol", (type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribboncontrol-compact")));
                this.Type = type;

                this.Content.oncontextmenu = $asm.$.ExpressCraft.RibbonControl.f1;
            }
        },
        methods: {
            AddRibbonPages: function (pages) {
                if (pages === void 0) { pages = []; }
                if (pages != null) {
                    this.RibbonPages.addRange(pages);
                }
            },
            SetSelectedIndex: function (index) {
                if (this.RibbonPages != null && this.RibbonPages.Count > 0) {
                    for (var i = 0; i < this.RibbonPages.Count; i = (i + 1) | 0) {
                        if (this.RibbonPages.getItem(i).RibbonHeader != null) {
                            this.RibbonPages.getItem(i).RibbonHeader.classList.remove("ribbonpageheader-hidden");
                            this.RibbonPages.getItem(i).RibbonHeader.classList.remove("ribbonpageheader-active");

                            if (i === index) {
                                this.RibbonPages.getItem(i).RibbonHeader.classList.add("ribbonpageheader-active");
                                this.RibbonPages.getItem(i).Content.style.visibility = "visible";
                            } else {
                                this.RibbonPages.getItem(i).RibbonHeader.classList.add("ribbonpageheader-hidden");
                                this.RibbonPages.getItem(i).Content.style.visibility = "hidden";
                            }
                        }
                    }
                }
            },
            Render: function () {
                this.HasRendered = true;
                if (this.Type === ExpressCraft.RibbonControl.RibbonType.Full) {
                    if (this.ApplicationIcon != null) {
                        ExpressCraft.Helper.Delete(this.ApplicationIcon);
                    }
                    this.ApplicationIcon = ExpressCraft.Control.Div$1("application-icon");
                    var appIconImage = ExpressCraft.Control.Div$1("fav-icon");
                    appIconImage.style.background = ExpressCraft.Control.GetImageStringURI(this.IconURL);
                    appIconImage.style.backgroundSize = "100% 100%";

                    this.ApplicationIcon.appendChild(appIconImage);

                    this.Content.appendChild(this.ApplicationIcon);
                }

                if (this.RibbonPages != null && this.RibbonPages.Count > 0) {
                    var width = 58;
                    for (var i = 0; i < this.RibbonPages.Count; i = (i + 1) | 0) {
                        if (this.Content.contains(ExpressCraft.Control.op_Implicit(this.RibbonPages.getItem(i)))) {
                            ExpressCraft.Helper.Delete(this.RibbonPages.getItem(i).Content);
                            ExpressCraft.Helper.Delete(this.RibbonPages.getItem(i).RibbonHeader);
                        }
                        this.RibbonPages.getItem(i).Render();

                        if (this.Type === ExpressCraft.RibbonControl.RibbonType.Compact) {
                            if (!System.String.contains(this.RibbonPages.getItem(i).Content.className,"ribbonpage-compact")) {
                                this.RibbonPages.getItem(i).Content.classList.add("ribbonpage-compact");
                            }
                        } else {
                            if (System.String.contains(this.RibbonPages.getItem(i).Content.className,"ribbonpage-compact")) {
                                this.RibbonPages.getItem(i).Content.classList.remove("ribbonpage-compact");
                            }
                        }

                        var index = { v : i };

                        if (i === this.selectedindex) {
                            this.RibbonPages.getItem(i).RibbonHeader = ExpressCraft.Control.Div$1(System.String.concat("ribbonpageheader ribbonpageheader-active", (this.Type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribbonpageheader-compact")));
                            this.RibbonPages.getItem(i).Content.style.visibility = "visible";
                        } else {
                            this.RibbonPages.getItem(i).RibbonHeader = ExpressCraft.Control.Div$1(System.String.concat("ribbonpageheader ribbonpageheader-hidden", (this.Type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribbonpageheader-compact")));
                            this.RibbonPages.getItem(i).Content.style.visibility = "hidden";
                        }

                        this.RibbonPages.getItem(i).RibbonHeader.onmousedown = (function ($me, index) {
                            return Bridge.fn.bind($me, function (ev) {
                                this.SelectedIndex = index.v;
                            });
                        })(this, index);
                        this.RibbonPages.getItem(i).RibbonHeader.ontouchstart = (function ($me, index) {
                            return Bridge.fn.bind($me, function (ev) {
                                this.SelectedIndex = index.v;
                            });
                        })(this, index);

                        this.RibbonPages.getItem(i).RibbonHeader.innerHTML = this.RibbonPages.getItem(i).Caption;

                        var inwidth = 24;

                        if (!System.String.isNullOrEmpty(this.RibbonPages.getItem(i).Caption)) {
                            inwidth = (inwidth + Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(this.RibbonPages.getItem(i).Caption, ExpressCraft.Settings.DefaultFont))) | 0;
                        }

                        this.RibbonPages.getItem(i).RibbonHeader.style.left = width + "px";
                        this.RibbonPages.getItem(i).RibbonHeader.style.width = inwidth + "px";

                        this.Content.appendChild(this.RibbonPages.getItem(i).RibbonHeader);
                        this.Content.appendChild(ExpressCraft.Control.op_Implicit(this.RibbonPages.getItem(i)));

                        width = (width + inwidth) | 0;
                    }
                }
                this.SelectedIndex = this.selectedindex;
            }
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
        fields: {
            enabled: false,
            captionDiv: null,
            riList: null
        },
        props: {
            Caption: null,
            Buttons: null,
            Enabled: {
                get: function () {
                    return this.enabled;
                },
                set: function (value) {
                    this.enabled = value;
                    this.setEnabled(value);
                }
            }
        },
        ctors: {
            init: function () {
                this.enabled = true;
            },
            ctor: function (_caption) {
                if (_caption === void 0) { _caption = ""; }

                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "ribbongroup");
                this.Caption = _caption;
                this.Buttons = new (System.Collections.Generic.List$1(ExpressCraft.RibbonButton))();
            },
            $ctor1: function (_caption, buttons) {
                if (buttons === void 0) { buttons = []; }

                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "ribbongroup");
                this.Caption = _caption;
                this.Buttons = new (System.Collections.Generic.List$1(ExpressCraft.RibbonButton))();
                if (buttons != null) {
                    this.Buttons.addRange(buttons);
                }
            }
        },
        methods: {
            setEnabled: function (value) {
                if (this.Buttons.Count > 0) {
                    for (var i = 0; i < this.Buttons.Count; i = (i + 1) | 0) {
                        if (!value) {
                            this.Buttons.getItem(i).setEnabled(value);
                        } else {
                            this.Buttons.getItem(i).setEnabled(this.Buttons.getItem(i).Enabled);
                        }
                    }
                }
                this.ChangeState(value);
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
            CreateVerticalLine: function (height) {
                var htmlDiv = ExpressCraft.Control.Div$1("ribbonseperator");
                if (height !== 58) {
                    htmlDiv.style.height = height + "px";
                }

                return htmlDiv;
            },
            GenerateRList: function () {

                var ri = null;

                if (this.riList == null) {
                    this.riList = new (System.Collections.Generic.List$1(ExpressCraft.RibbonGroup.RenderInfo))();
                    for (var i = 0; i < this.Buttons.Count; i = (i + 1) | 0) {
                        if (ri == null) {
                            ri = new ExpressCraft.RibbonGroup.RenderInfo();
                            ri.FirstButton = this.Buttons.getItem(i);
                            ri.IsSmall = ri.FirstButton.IsSmallCaption;
                        } else {
                            if (ri.IsSmall !== this.Buttons.getItem(i).IsSmallCaption || this.Buttons.getItem(i).BeginGroup || !this.Buttons.getItem(i).IsSmallCaption || (ri.FirstButton != null && ri.SecondButton != null && ri.ThirdButton != null)) {
                                this.riList.add(ri);

                                ri = new ExpressCraft.RibbonGroup.RenderInfo();
                                ri.FirstButton = this.Buttons.getItem(i);
                                ri.IsSmall = this.Buttons.getItem(i).IsSmallCaption;
                                ri.BeginGroup = this.Buttons.getItem(i).BeginGroup;
                            } else {
                                if (ri.SecondButton == null) {
                                    ri.SecondButton = this.Buttons.getItem(i);
                                } else {
                                    ri.ThirdButton = this.Buttons.getItem(i);
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
            Render: function () {
                this.HasRendered = true;

                this.GenerateRList();

                ExpressCraft.Helper.Empty(this.Content);

                var width = 0;

                for (var i = 0; i < this.riList.Count; i = (i + 1) | 0) {
                    var ri = this.riList.getItem(i);

                    if (ri.BeginGroup) {
                        width = (width + 3) | 0;
                        var vlbg = this.CreateVerticalLine(58);
                        vlbg.style.left = width + "px";

                        this.Content.appendChild(vlbg);
                    }

                    width = (width + 3) | 0;

                    if (ri.IsSmall) {
                        var MaxWidth;

                        if (ri.ThirdButton == null) {
                            if (ri.SecondButton == null) {
                                MaxWidth = Math.max(((((Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(ri.FirstButton.Caption, ExpressCraft.Settings.DefaultFont)) + 28) | 0) + 6) | 0), 64);

                                ri.FirstButton.Render();

                                ri.FirstButton.Content.style.left = width + "px";
                                ri.FirstButton.Content.style.width = MaxWidth + "px";

                                ri.FirstButton.Content.style.top = "26px";

                                this.Content.appendChild(ExpressCraft.Control.op_Implicit(ri.FirstButton));
                                // 1
                            } else {
                                MaxWidth = Math.max(((((Math.max(Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(ri.FirstButton.Caption, ExpressCraft.Settings.DefaultFont)), Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(ri.SecondButton.Caption, ExpressCraft.Settings.DefaultFont))) + 28) | 0) + 6) | 0), 64);

                                ri.FirstButton.Render();
                                ri.SecondButton.Render();

                                ri.FirstButton.Content.style.left = width + "px";
                                ri.SecondButton.Content.style.left = width + "px";

                                ri.FirstButton.Content.style.top = (21) + "px";

                                ri.FirstButton.Content.style.width = MaxWidth + "px";
                                ri.SecondButton.Content.style.width = MaxWidth + "px";

                                ri.FirstButton.Content.style.top = "11px";
                                ri.SecondButton.Content.style.top = "41px";

                                this.Content.appendChild(ExpressCraft.Control.op_Implicit(ri.FirstButton));
                                this.Content.appendChild(ExpressCraft.Control.op_Implicit(ri.SecondButton));
                                // 2
                            }
                        } else {
                            MaxWidth = Math.max(((((Math.max(Math.max(Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(ri.FirstButton.Caption, ExpressCraft.Settings.DefaultFont)), Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(ri.SecondButton.Caption, ExpressCraft.Settings.DefaultFont))), Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(ri.ThirdButton.Caption, ExpressCraft.Settings.DefaultFont))) + 28) | 0) + 6) | 0), 64);

                            ri.FirstButton.Render();
                            ri.SecondButton.Render();
                            ri.ThirdButton.Render();

                            ri.FirstButton.Content.style.left = width + "px";
                            ri.SecondButton.Content.style.left = width + "px";
                            ri.ThirdButton.Content.style.left = width + "px";

                            ri.FirstButton.Content.style.width = MaxWidth + "px";
                            ri.SecondButton.Content.style.width = MaxWidth + "px";
                            ri.ThirdButton.Content.style.width = MaxWidth + "px";

                            ri.FirstButton.Content.style.top = "3px";
                            ri.SecondButton.Content.style.top = "26px";
                            ri.ThirdButton.Content.style.top = "49px";
                            // 3

                            this.Content.appendChild(ExpressCraft.Control.op_Implicit(ri.FirstButton));
                            this.Content.appendChild(ExpressCraft.Control.op_Implicit(ri.SecondButton));
                            this.Content.appendChild(ExpressCraft.Control.op_Implicit(ri.ThirdButton));
                        }

                        width = (width + MaxWidth) | 0;
                    } else {
                        ri.FirstButton.Render();

                        ri.FirstButton.Content.style.left = width + "px";
                        var inwidth = 0;
                        if (System.String.contains(ri.FirstButton.Caption," ")) {
                            var strings = System.String.split(ri.FirstButton.Caption, [32].map(function(i) {{ return String.fromCharCode(i); }}));
                            var builder = new System.Text.StringBuilder();

                            var length = (Bridge.Int.div(ri.FirstButton.Caption.length, 2)) | 0;

                            for (var j = 0; j < strings.length; j = (j + 1) | 0) {
                                if (builder.getLength() > length) {
                                    inwidth = (Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(builder.toString(), ExpressCraft.Settings.DefaultFont)) + 20) | 0;
                                    break;
                                }
                                if (builder.getLength() > 0) {
                                    builder.append(System.String.concat(" ", strings[System.Array.index(j, strings)]));
                                } else {
                                    builder.append(strings[System.Array.index(j, strings)]);
                                }
                            }
                            if (inwidth === 0) {
                                inwidth = (Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(builder.toString(), ExpressCraft.Settings.DefaultFont)) + 20) | 0;
                            }
                        } else {
                            inwidth = (Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(ri.FirstButton.Caption, ExpressCraft.Settings.DefaultFont)) + 20) | 0;
                        }

                        if (inwidth < 44) {
                            inwidth = 44;
                        }

                        ri.FirstButton.Content.style.width = inwidth + "px";

                        width = (width + inwidth) | 0;

                        this.Content.appendChild(ExpressCraft.Control.op_Implicit(ri.FirstButton));
                    }
                }

                var minWidth = (Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(this.Caption, ExpressCraft.Settings.DefaultFont)) + 20) | 0;

                if (width < minWidth) {
                    width = minWidth;
                }

                width = (width + 3) | 0;

                var vl = this.CreateVerticalLine(80);
                vl.style.left = ((width - 1) | 0) + "px";

                this.Content.appendChild(vl);

                this.Content.style.width = width + "px";

                if (!System.String.isNullOrWhiteSpace(this.Caption)) {
                    this.captionDiv = ExpressCraft.Control.Div$1("ribbongroupcaption");

                    this.captionDiv.innerHTML = this.Caption;
                    this.Content.appendChild(this.captionDiv);
                }

                this.setEnabled(this.enabled);
            }
        }
    });

    Bridge.define("ExpressCraft.RibbonPage", {
        inherits: [ExpressCraft.Control],
        fields: {
            RibbonHeader: null
        },
        props: {
            Caption: null,
            RibbonGroups: null
        },
        ctors: {
            init: function () {
                this.RibbonGroups = new (System.Collections.Generic.List$1(ExpressCraft.RibbonGroup))();
            },
            ctor: function (_caption) {
                if (_caption === void 0) { _caption = ""; }

                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "ribbonpage");
                this.Caption = _caption;
            }
        },
        methods: {
            AddRibbonGroups: function (pages) {
                if (pages === void 0) { pages = []; }
                if (pages != null) {
                    this.RibbonGroups.addRange(pages);
                }
            },
            Render: function () {
                this.HasRendered = true;
                if (this.RibbonGroups == null || this.RibbonGroups.Count === 0) {
                    return;
                }
                var width = 0;
                for (var i = 0; i < this.RibbonGroups.Count; i = (i + 1) | 0) {
                    this.RibbonGroups.getItem(i).Render();
                    this.RibbonGroups.getItem(i).Content.style.left = width + "px";
                    width = (width + (parseInt(this.RibbonGroups.getItem(i).Content.style.width))) | 0;
                    this.Content.appendChild(ExpressCraft.Control.op_Implicit(this.RibbonGroups.getItem(i)));
                }
            }
        }
    });

    Bridge.define("ExpressCraft.SimpleButton", {
        inherits: [ExpressCraft.Control],
        fields: {
            ItemClick: null,
            ParentForm: null,
            DialogResult: 0,
            enabled: false
        },
        props: {
            Text: {
                get: function () {
                    return this.Content.innerHTML;
                },
                set: function (value) {
                    this.Content.innerHTML = value;
                }
            },
            Enabled: {
                get: function () {
                    return this.enabled;
                },
                set: function (value) {
                    this.enabled = value;
                    if (this.enabled) {
                        this.Content.removeAttribute("disabled");
                    } else {
                        this.Content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this.DialogResult = ExpressCraft.DialogResultEnum.None;
                this.enabled = true;
            },
            ctor: function (button, ac) {
                if (button === void 0) { button = 2; }
                if (ac === void 0) { ac = true; }

                this.$initialize();
                ExpressCraft.Control.$ctor2.call(this, "simplebutton", button, ac);
                this.Content.oncontextmenu = $asm.$.ExpressCraft.SimpleButton.f1;

                if (ac) {
                    this.Style.font = ExpressCraft.Settings.Font;
                }

                ExpressCraft.Helper.SetSize(this, "69px", "20px");

                this.Content.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.SimpleButton.f2);
                this.Content.ondblclick = $asm.$.ExpressCraft.SimpleButton.f3;
                this.Content.onmousedown = $asm.$.ExpressCraft.SimpleButton.f3;
                this.Content.onmouseup = $asm.$.ExpressCraft.SimpleButton.f3;

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
                this.Content.blur();

                if (this.DialogResult !== ExpressCraft.DialogResultEnum.None && this.ParentForm != null && this.ParentForm.IsDialog()) {
                    this.ParentForm.DialogResult = this.DialogResult;
                }

                if (!Bridge.staticEquals(this.ItemClick, null)) {
                    this.ItemClick(this);
                }

                if (this.DialogResult !== ExpressCraft.DialogResultEnum.None && this.ParentForm.DialogResult !== ExpressCraft.DialogResultEnum.None && this.ParentForm != null && this.ParentForm.IsDialog()) {
                    this.ParentForm.Close();
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
        fields: {
            Panel1: null,
            Panel2: null,
            Splitter: null,
            _prevClientRect: null,
            IsMouseDown: false,
            _mouseDownVector: null,
            _currentMouseDownVector: null,
            _startingSplitterPos: 0,
            _splitterPosition: 0,
            fixedSplitterPostion: 0,
            SplitterResizable: false,
            horizontal: false
        },
        props: {
            FixedSplitterPostion: {
                get: function () {
                    return this.fixedSplitterPostion;
                },
                set: function (value) {
                    this.fixedSplitterPostion = value;
                    this.RenderControls();
                }
            },
            SplitterPosition: {
                get: function () {
                    return this._splitterPosition;
                },
                set: function (value) {
                    if (value < 0) {
                        value = 0;
                    }
                    this._splitterPosition = value;
                    this.RenderControls();
                }
            },
            Horizontal: {
                get: function () {
                    return this.horizontal;
                },
                set: function (value) {
                    if (value !== this.horizontal) {
                        this.RenderControls();
                        this.horizontal = value;
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this._mouseDownVector = new ExpressCraft.Vector2();
                this._currentMouseDownVector = new ExpressCraft.Vector2();
                this.IsMouseDown = false;
                this._splitterPosition = -1;
                this.fixedSplitterPostion = ExpressCraft.FixedSplitterPosition.Panel1;
                this.SplitterResizable = true;
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "splitcontrol");
                var $t;
                this.Panel1 = ($t = new ExpressCraft.Control.$ctor1(), $t.Location = new ExpressCraft.Vector2.$ctor1(0, 0), $t);
                this.Panel2 = new ExpressCraft.Control.$ctor1();
                this.Splitter = new ExpressCraft.Control.$ctor1();

                this.Splitter.Content.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f1);

                this.OnResize = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f2);

                this.Content.onmousemove = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f3);

                this.Content.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.SplitControlContainer.f4);

                ExpressCraft.Helper.AppendChildren(this, [this.Panel1, this.Splitter, this.Panel2]);
        }
    },
    methods: {
        Render: function () {
            ExpressCraft.Control.prototype.Render.call(this);

            this.RenderControls();
        },
        ResizeChildren: function () {
            if (this.LinkedForm != null && this.Content != null) {
                this.LinkedForm.ResizeChildren(this.Content);
            }
        },
        GetMaxSplitterSize: function () {
            var maxSize = (Bridge.Int.clip32((this.Horizontal ? this.Content.getBoundingClientRect().height : this.Content.getBoundingClientRect().width)) - 12) | 0;
            if (maxSize < 0) {
                maxSize = 0;
            }
            return maxSize;
        },
        RenderControls: function () {
            var sp = this.SplitterPosition;
            var maxSize = this.GetMaxSplitterSize();

            if (this._prevClientRect != null) {
                if (sp > maxSize) {
                    sp = maxSize;
                }
            }

            if (this.Horizontal) {
                ExpressCraft.Helper.ExchangeClass$1(this.Panel1, "splitvertical", "splithorizontal");
                ExpressCraft.Helper.ExchangeClass$1(this.Panel2, "splitvertical", "splithorizontal");
                ExpressCraft.Helper.ExchangeClass$1(this.Splitter, "splitvertical", "splitvertical");

                this.Panel1.Width = "";
                this.Splitter.Width = "";
                this.Panel2.Width = "";

                if (this.fixedSplitterPostion !== ExpressCraft.FixedSplitterPosition.Panel2) {
                    this.Splitter.Location = new ExpressCraft.Vector2.$ctor1(0, sp);

                    this.Panel1.Height = sp;
                    this.Panel2.Location = new ExpressCraft.Vector2.$ctor1(0, ((sp + 12) | 0));
                    this.Panel2.Height = "calc(100% - " + (((sp + 12) | 0)) + "px)";
                    ;
                } else {
                    this.Splitter.Location = new ExpressCraft.Vector2.$ctor1(0, "calc(100% - " + sp + "px)");

                    this.Panel1.Height = "calc(100% - " + sp + "px)";

                    this.Panel2.Height = sp;
                    this.Panel2.Location = new ExpressCraft.Vector2.$ctor1(0, "calc(100% - " + sp + 12 + "px)");
                }
            } else {
                ExpressCraft.Helper.ExchangeClass$1(this.Panel1, "splithorizontal", "splitvertical");
                ExpressCraft.Helper.ExchangeClass$1(this.Panel2, "splithorizontal", "splitvertical");
                ExpressCraft.Helper.ExchangeClass$1(this.Splitter, "splitterhorizontal", "splittervertical");

                this.Panel1.Height = "";
                this.Splitter.Height = "";
                this.Panel2.Height = "";

                if (this.fixedSplitterPostion !== ExpressCraft.FixedSplitterPosition.Panel2) {
                    this.Splitter.Location = new ExpressCraft.Vector2.$ctor1(sp, 0);

                    this.Panel1.Width = sp;

                    this.Panel2.Width = "calc(100% - " + (((sp + 12) | 0)) + "px)";
                    this.Panel2.Location = new ExpressCraft.Vector2.$ctor1(((sp + 12) | 0), 0);
                } else {
                    this.Splitter.Location = new ExpressCraft.Vector2.$ctor1("calc(100% - " + sp + "px)", 0);

                    this.Panel1.Width = "calc(100% - " + sp + "px)";

                    this.Panel2.Width = sp;
                    this.Panel2.Location = new ExpressCraft.Vector2.$ctor1("calc(100% - " + sp + 12 + "px)", 0);
                }
            }
        }
    }
    });

    Bridge.ns("ExpressCraft.SplitControlContainer", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.SplitControlContainer, {
        f1: function (ev) {
            if (!this.SplitterResizable) {
                return;
            }
            this.IsMouseDown = true;
            this._mouseDownVector = ExpressCraft.Helper.GetClientMouseLocation(ev);
            var maxSize = this.GetMaxSplitterSize();
            this._startingSplitterPos = this._splitterPosition > maxSize ? maxSize : this._splitterPosition;
            ev.stopImmediatePropagation();
        },
        f2: function (ev) {
            if (this.LinkedForm != null) {
                if (!this.LinkedForm.IsVisible()) {
                    return;
                }
            }
            var clientRec = this.Content.getBoundingClientRect();

            if (this._prevClientRect == null) {
                this._prevClientRect = clientRec;
            }

            if (this.fixedSplitterPostion === ExpressCraft.FixedSplitterPosition.None) {
                var V1 = 0;
                var V2 = 0;
                var dirty = false;

                if (this.Horizontal) {
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
                    this.SplitterPosition = V1 === 0 || V2 === 0 ? 0 : Bridge.Int.clip32(this.SplitterPosition * (V1 / V2));
                }
            }

            this._prevClientRect = clientRec;

            this.RenderControls();

            this.ResizeChildren();
        },
        f3: function (ev) {
            if (this.IsMouseDown) {
                this._currentMouseDownVector = ExpressCraft.Helper.GetClientMouseLocation(ev);
                var x;
                var m = this.horizontal ? (((this._mouseDownVector.Yi - this._currentMouseDownVector.Yi) | 0)) : (((this._mouseDownVector.Xi - this._currentMouseDownVector.Xi) | 0));

                var y = this.GetMaxSplitterSize();
                if (((x = this.fixedSplitterPostion === ExpressCraft.FixedSplitterPosition.Panel2 ? ((this._startingSplitterPos + m) | 0) : ((this._startingSplitterPos - m) | 0))) > y) {
                    x = y;
                }
                this.SplitterPosition = x;
                this._currentMouseDownVector = this._mouseDownVector.$clone();

                this.ResizeChildren();
            }
        },
        f4: function (ev) {
            this.IsMouseDown = false;
            this.RenderControls();
        }
    });

    Bridge.define("ExpressCraft.TabControl", {
        inherits: [ExpressCraft.Control],
        fields: {
            showClosedButton: false,
            selectedindex: 0
        },
        props: {
            TabPages: null,
            ShowClosedButton: {
                get: function () {
                    return this.showClosedButton;
                },
                set: function (value) {
                    if (value !== this.showClosedButton) {
                        this.showClosedButton = value;
                        this.ResizeTabHeaders();
                    }
                }
            },
            SelectedIndex: {
                get: function () {
                    return this.selectedindex;
                },
                set: function (value) {
                    if (value < 0) {
                        value = 0;
                    }
                    this.selectedindex = value;
                    if (this.TabPages != null && this.TabPages.Count > 0) {
                        for (var i = 0; i < this.TabPages.Count; i = (i + 1) | 0) {
                            var page = { v : this.TabPages.getItem(i) };
                            this.TabControlActiveStyleChange(i, page);
                            this.TabPages.setItem(i, page.v);
                        }
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this.selectedindex = 0;
                this.TabPages = new (System.Collections.Generic.List$1(ExpressCraft.TabControlPage))();
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "tabcontrol");
                this.Content.oncontextmenu = $asm.$.ExpressCraft.TabControl.f1;
            }
        },
        methods: {
            AddPages: function (Pages) {
                if (Pages === void 0) { Pages = []; }
                this.TabPages.addRange(Pages);
                if (this.HasRendered) {
                    this.ResizeTabHeaders();
                }
            },
            TabControlActiveStyleChange: function (i, page) {
                var Isselected = i === this.selectedindex;

                var state = Isselected ? "active" : "hidden";
                if (page.v.TabPageHeader != null) {
                    page.v.TabPageHeader.classList.remove("tabcontrolpageheader-hidden");
                    page.v.TabPageHeader.classList.remove("tabcontrolpageheader-active");

                    page.v.TabPageHeader.classList.add(System.String.concat("tabcontrolpageheader-", state));
                } else {
                    page.v.TabPageHeader = ExpressCraft.Control.Div$1(System.String.concat("tabcontrolpageheader tabcontrolpageheader-", state));
                }
                page.v.TabPageHeader.setAttribute("i", i.toString());
                if (this.showClosedButton) {
                    if (page.v.TabPageHeaderClose == null) {
                        page.v.TabPageHeaderClose = ExpressCraft.Control.Div$1("tabcontrolpageheader-closebutton");
                        page.v.TabPageHeaderClose.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f2);
                        page.v.TabPageHeader.appendChild(page.v.TabPageHeaderClose);
                    }
                } else {
                    if (page.v.TabPageHeaderClose != null) {
                        page.v.TabPageHeader.removeChild(page.v.TabPageHeaderClose);
                    }
                }

                page.v.Content.style.visibility = Isselected ? "inherit" : "collapse";
            },
            ResizeTabHeaders: function () {
                var $t, $t1;
                if (this.TabPages != null && this.TabPages.Count > 0) {
                    var width = 2;

                    for (var i = 0; i < this.TabPages.Count; i = (i + 1) | 0) {
                        var page = { v : this.TabPages.getItem(i) };

                        page.v.Render();

                        if (page.v.TabPageHeader == null) {
                            this.TabControlActiveStyleChange(i, page);
                            if (Bridge.Browser.isAndroid || Bridge.Browser.iOS) {
                                page.v.TabPageHeader.ontouchstart = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f3);
                            } else {
                                page.v.TabPageHeader.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f3);
                            }

                            ExpressCraft.Helper.AppendChildren$1(this.Content, [page.v.Content, page.v.TabPageHeader]);
                        }
                        page.v.TabPageHeader.setAttribute("i", i.toString());

                        var inwidth = 24;

                        if (!System.String.isNullOrEmpty(page.v.Caption)) {
                            inwidth = (inwidth + Bridge.Int.clip32(ExpressCraft.Control.GetTextWidth(page.v.Caption, ExpressCraft.Settings.DefaultFont))) | 0;
                        }

                        if (this.showClosedButton) {
                            inwidth = (inwidth + 19) | 0;
                        }
                        var span = null;
                        $t = Bridge.getEnumerator(page.v.TabPageHeader.children);
                        try {
                            while ($t.moveNext()) {
                                var item = $t.Current;
                                if (Bridge.is(item, HTMLSpanElement)) {
                                    ((span = item)).innerHTML = page.v.Caption;
                                    break;
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$dispose();
                            }
                        }if (span == null) {
                            page.v.TabPageHeader.appendChild(($t1 = document.createElement('span'), $t1.innerHTML = page.v.Caption, $t1));
                        }

                        page.v.TabPageHeader.style.left = ExpressCraft.Helper.ToPx(Bridge.box(width, System.Int32));
                        page.v.TabPageHeader.style.width = ExpressCraft.Helper.ToPx(Bridge.box(inwidth, System.Int32));

                        width = (width + (((inwidth + 2) | 0))) | 0;

                        this.TabPages.setItem(i, page.v);
                    }
                }
            },
            Render: function () {
                this.HasRendered = true;
                this.ResizeTabHeaders();
            }
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
            var cpage = this.TabPages.getItem(index);
            if (cpage.Content != null) {
                ExpressCraft.Helper.Empty(cpage.Content);
                ExpressCraft.Helper.Delete(cpage.Content);
            }
            if (cpage.TabPageHeader != null) {
                ExpressCraft.Helper.Empty(cpage.TabPageHeader);
                ExpressCraft.Helper.Delete(cpage.TabPageHeader);
            }
            this.TabPages.remove(cpage);
            if (index > ((this.TabPages.Count - 1) | 0)) {
                index = (this.TabPages.Count - 1) | 0;
            }

            ev.stopPropagation();

            this.SelectedIndex = index;

            this.ResizeTabHeaders();
        },
        f3: function (ev) {
            this.SelectedIndex = parseInt(ev.currentTarget.getAttribute("i"));
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.TabControlPage", {
        inherits: [ExpressCraft.Control],
        fields: {
            index: 0,
            TabPageHeader: null,
            TabPageHeaderClose: null
        },
        props: {
            Caption: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "tabcontrolpage");

            }
        }
    });

    Bridge.define("ExpressCraft.ToolTipControl", {
        inherits: [ExpressCraft.Control],
        fields: {
            visible: false,
            _toolTip$1: null
        },
        ctors: {
            init: function () {
                this.visible = false;
            },
            ctor: function (toolTip) {
                this.$initialize();
                ExpressCraft.Control.$ctor5.call(this, "tool-tip");
                this._toolTip$1 = toolTip;
            }
        },
        methods: {
            Show: function (ev) {
                var $t;
                if (Bridge.Browser.isPhone || Bridge.Browser.isTablet || Bridge.Browser.isiPhone || Bridge.Browser.isAndroid || Bridge.Browser.isiPad) {
                    return;
                }

                ExpressCraft.Helper.Empty(this.Content);

                if (this._toolTip$1 != null) {
                    if (!ExpressCraft.Helper.IsEmpty(this._toolTip$1.Heading)) {
                        this.Content.appendChild(($t = document.createElement('p'), $t.className = "tool-tip-heading", $t.innerHTML = System.String.replaceAll(ExpressCraft.Helper.HtmlEscape$1(this._toolTip$1.Heading), "\r\n", "<br>"), $t));
                    }
                    if (!ExpressCraft.Helper.IsEmpty(this._toolTip$1.Description)) {
                        this.Content.appendChild(($t = document.createElement('p'), $t.className = "tool-tip-body", $t.innerHTML = System.String.replaceAll(ExpressCraft.Helper.HtmlEscape$1(this._toolTip$1.Description), "\r\n", "<br>"), $t));
                    }
                }
                var mouse = ExpressCraft.Helper.GetClientMouseLocation(ev);

                this.Location = new ExpressCraft.Vector2.$ctor1(mouse.X, ((ExpressCraft.Helper.ToInt(mouse.Y) + 22) | 0));

                if (!this.visible) {
                    this.visible = true;
                    ExpressCraft.ContextMenu.TotalContextHandles = (ExpressCraft.ContextMenu.TotalContextHandles + 1) | 0;
                    this.Content.style.zIndex = (((ExpressCraft.ContextMenu.TotalContextHandles + ExpressCraft.Settings.ContextMenuStartingZIndex) | 0)).toString();
                    document.body.appendChild(ExpressCraft.Control.op_Implicit(this));
                }
            },
            Close: function () {
                if (this.visible) {
                    if (this.Content != null) {
                        $(this.Content).fadeOut();
                    }
                    this.visible = false;
                    ExpressCraft.ContextMenu.TotalContextHandles = (ExpressCraft.ContextMenu.TotalContextHandles - 1) | 0;
                }
            }
        }
    });

    Bridge.define("ExpressCraft.ColorInput", {
        inherits: [ExpressCraft.TextInput],
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.TextInput.ctor.call(this, "color");

            }
        }
    });

    Bridge.define("ExpressCraft.ConsoleForm", {
        inherits: [ExpressCraft.Form],
        statics: {
            fields: {
                ConsoleVisible: false,
                _consoleForm: null,
                prevWindowState: 0,
                firstLoad: false,
                prevLocation: null,
                prevSize: null
            },
            ctors: {
                init: function () {
                    this.prevLocation = new ExpressCraft.Vector2();
                    this.prevSize = new ExpressCraft.Vector2();
                    this.ConsoleVisible = false;
                    this.prevWindowState = ExpressCraft.WindowState.Normal;
                    this.firstLoad = true;
                    this.prevSize = ExpressCraft.Settings.ConsoleDefaultSize.$clone();
                }
            },
            methods: {
                CheckConsoleState: function () {
                    if (!ExpressCraft.ConsoleForm.ConsoleVisible) {
                        ExpressCraft.ConsoleForm._consoleForm = new ExpressCraft.ConsoleForm();
                        ExpressCraft.ConsoleForm._consoleForm.Show(null, true);
                    }
                },
                Log: function (source, logType) {
                    if (logType === void 0) { logType = 0; }
                    ExpressCraft.ConsoleForm.CheckConsoleState();
                    ExpressCraft.ConsoleForm._consoleForm.InternalLog(source, logType);
                },
                Clear: function () {
                    ExpressCraft.ConsoleForm.CheckConsoleState();
                    ExpressCraft.ConsoleForm._consoleForm.InternalClear();
                }
            }
        },
        fields: {
            logContent: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.Form.ctor.call(this);
                this.logContent = ExpressCraft.Control.Div$1("console-body");
                this.Body.appendChild(this.logContent);
                this.Body.style.background = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.Black.$clone());
                this.Body.style.overflowY = "scroll";

                this.Text = System.String.concat(document.title, " - Console");
                if (ExpressCraft.ConsoleForm.firstLoad) {
                    this.StartPosition = ExpressCraft.FormStartPosition.Center;
                    this.Size = ExpressCraft.ConsoleForm.prevSize.$clone();
                } else {
                    this.StartPosition = ExpressCraft.FormStartPosition.Manual;
                    this.Location = ExpressCraft.ConsoleForm.prevLocation.$clone();

                    if (ExpressCraft.ConsoleForm.prevWindowState === ExpressCraft.WindowState.Maximized) {
                        ExpressCraft.ConsoleForm.prevSize = ExpressCraft.Settings.ConsoleDefaultSize.$clone();
                    }

                    this.Size = ExpressCraft.ConsoleForm.prevSize.$clone();

                    if (ExpressCraft.ConsoleForm.prevWindowState === ExpressCraft.WindowState.Maximized) {
                        this.SetWindowState(ExpressCraft.ConsoleForm.prevWindowState);
                    }
                }


            }
        },
        methods: {
            InternalClear: function () {
                ExpressCraft.Helper.Empty(this.logContent);
            },
            InternalLog: function (source, logType) {
                var $t;
                if (logType === void 0) { logType = 0; }
                var para = ($t = document.createElement('p'), $t.className = "console-para", $t);
                switch (logType) {
                    case ExpressCraft.ConsoleLogType.Debug: 
                        para.style.color = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.ForestGreen.$clone());
                        break;
                    case ExpressCraft.ConsoleLogType.Error: 
                        para.style.color = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.Red.$clone());
                        break;
                }

                para.innerHTML = source;
                this.logContent.appendChild(para);
                if (this.logContent.children.length > 1000) {
                    this.logContent.removeChild(($t = this.logContent.children)[System.Array.index(0, $t)]);
                }
                para.scrollIntoView(false);
            },
            OnGotFocus: function () {
                if (this.Content != null) {
                    this.Style.opacity = "1";
                }
                ExpressCraft.Form.prototype.OnGotFocus.call(this);
            },
            OnLostFocus: function () {
                if (this.Content != null) {
                    this.Style.opacity = "0.5";
                }
                ExpressCraft.Form.prototype.OnLostFocus.call(this);
            },
            OnShowed: function () {
                ExpressCraft.Form.prototype.OnShowed.call(this);
                ExpressCraft.ConsoleForm.ConsoleVisible = true;
                ExpressCraft.ConsoleForm.firstLoad = false;
            },
            OnClosing: function () {
                ExpressCraft.Form.prototype.OnClosing.call(this);

                ExpressCraft.ConsoleForm.prevSize = this.Size.$clone();
                ExpressCraft.ConsoleForm.prevLocation = this.Location.$clone();
                ExpressCraft.ConsoleForm.prevWindowState = this.Windowstate;
            },
            OnClosed: function () {
                ExpressCraft.Form.prototype.OnClosed.call(this);
                ExpressCraft.ConsoleForm.ConsoleVisible = false;
            }
        }
    });

    Bridge.define("ExpressCraft.DialogForm", {
        inherits: [ExpressCraft.Form],
        fields: {
            _buttonCollection: null,
            ButtonSection: null
        },
        ctors: {
            ctor: function (text) {
                if (text === void 0) { text = ""; }

                this.$initialize();
                ExpressCraft.Form.ctor.call(this);
                this.Text = text;
                this.Body.style.backgroundColor = "white";

                this.ButtonSection = ExpressCraft.Control.Div$1("dialogbuttonsection");
            }
        },
        methods: {
            OnShowing: function () {
                this.Body.appendChild(this.ButtonSection);
                ExpressCraft.Form.prototype.OnShowing.call(this);
            }
        }
    });

    Bridge.define("ExpressCraft.Network.NetworkProgressForm", {
        inherits: [ExpressCraft.Form],
        fields: {
            progressControl: null,
            buttonCancel: null
        },
        ctors: {
            ctor: function (_text) {
                if (_text === void 0) { _text = "Loading..."; }

                this.$initialize();
                ExpressCraft.Form.ctor.call(this);
                var $t;
                this.Text = _text;
                this.Width = 400;
                this.Height = 200;

                this.progressControl = new ExpressCraft.ProgressControl();
                ExpressCraft.Helper.SetBounds(this.progressControl, 50, 50, "calc(100% - 100px)", "23px");

                this.buttonCancel = ($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), $t.Text = "Cancel", $t);
                ExpressCraft.Helper.SetLocation$1(this.buttonCancel, "calc(100% - 78px)", "calc(100% - 26px)");
                this.buttonCancel.Content.tabIndex = 0;

                ExpressCraft.Helper.AppendChildren$2(this.Body, [this.buttonCancel, this.progressControl]);

                this.AllowSizeChange = false;
        }
    }
    });

    Bridge.define("ExpressCraft.PDFPreviewForm", {
        inherits: [ExpressCraft.Form],
        fields: {
            Source: null,
            PDFSourceType: 0,
            PdfViewer: null
        },
        ctors: {
            ctor: function (source, pdfSourceType) {
                if (pdfSourceType === void 0) { pdfSourceType = 0; }

                this.$initialize();
                ExpressCraft.Form.ctor.call(this);
                this.Source = source;
                this.PDFSourceType = pdfSourceType;

                this.PdfViewer = document.createElement(Bridge.Browser.isIE ? "iframe" : pdfSourceType === ExpressCraft.PdfSourceType.Url ? "embed" : "object");
                this.PdfViewer.className = "control";

                ExpressCraft.Helper.SetBounds$1(this.PdfViewer, 0, 0, "100%", "100%");
                this.PdfViewer.setAttribute("alt", "pdf");
                this.PdfViewer.setAttribute("type", "application/pdf");
                //object 		

                this.Body.appendChild(this.PdfViewer);
            }
        },
        methods: {
            OnShowing: function () {
                ExpressCraft.Form.prototype.OnShowing.call(this);
                //data
                if (this.PDFSourceType === ExpressCraft.PdfSourceType.Url) {
                    this.PdfViewer.setAttribute("Src", this.Source);
                } else {
                    this.PdfViewer.setAttribute("data", ExpressCraft.Control.GetPdfString(this.Source));
                }
            }
        }
    });

    Bridge.define("ExpressCraft.SimpleDialogButton", {
        inherits: [ExpressCraft.SimpleButton],
        ctors: {
            ctor: function (parentForm, dialogResult) {
                if (dialogResult === void 0) { dialogResult = 0; }

                this.$initialize();
                ExpressCraft.SimpleButton.ctor.call(this);
                this.ParentForm = parentForm;
                this.DialogResult = dialogResult;

                ExpressCraft.Helper.SetSize(this, 75, 23);
            }
        }
    });

    Bridge.define("ExpressCraft.DataRowEditForm", {
        inherits: [ExpressCraft.DialogForm],
        fields: {
            LiveData: false,
            GridView: null,
            DataRow: null,
            Panel: null,
            prevData: null
        },
        ctors: {
            ctor: function (_dataRow, _gridView, _liveData) {
                if (_liveData === void 0) { _liveData = true; }

                this.$initialize();
                ExpressCraft.DialogForm.ctor.call(this);
                this.prevData = System.Array.init(_dataRow.ParentTable.ColumnCount, null, System.Object);

                for (var i = 0; i < _dataRow.ParentTable.ColumnCount; i = (i + 1) | 0) {
                    this.prevData[System.Array.index(i, this.prevData)] = _dataRow.getItem(i);
                }

                this.DataRow = _dataRow;
                this.GridView = _gridView;
                this.LiveData = _liveData;

                this.Text = "Row Edit Form";
                this.Width = "400px"; // 25px - 25px 350px width;
                this.Height = "600px";
                this.Body.style.overflowY = "auto";

                this.Panel = ExpressCraft.Control.Div();
                this.Panel.style.overflowY = "auto";
                ExpressCraft.Helper.SetBounds$1(this.Panel, "0", "0", "100%", "calc(100% - 60px)");
                this.Body.style.backgroundColor = "white";

                this._buttonCollection = Bridge.fn.bind(this, function (_o3) {
                        var $t;
                        _o3.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), $t.Text = "Cancel", $t.ItemClick = Bridge.fn.bind(this, function (ev) {
                            for (var i1 = 0; i1 < this.DataRow.ParentTable.ColumnCount; i1 = (i1 + 1) | 0) {
                                _dataRow.setItem(i1, this.prevData[System.Array.index(i1, this.prevData)]);
                            }

                            this.GridView.RenderGrid();
                        }), $t));
                        _o3.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), $t.Text = "OK", $t));
                        return _o3;
                    })(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");

                ExpressCraft.Helper.AppendChildrenTabIndex(this.ButtonSection, this._buttonCollection.toArray());

                this.Body.appendChild(this.Panel);

                this.AllowSizeChange = false;
            }
        },
        methods: {
            OnClosed: function () {
                this.GridView.DataSource.EndDataUpdate();

                ExpressCraft.DialogForm.prototype.OnClosed.call(this);
            },
            OnShowed: function () {
                ExpressCraft.DialogForm.prototype.OnShowed.call(this);

                if (this.DataRow == null) {
                    this.DialogResult = ExpressCraft.DialogResultEnum.Cancel;
                    this.Close();
                } else {
                    this.GridView.DataSource.BeginDataUpdate();

                    this.GenerateForm();
                }
            },
            GenerateForm: function () {
                ExpressCraft.Helper.Empty(this.Panel);
                var length = this.GridView.ColumnCount();

                var col = 0;
                var height = 25;

                var defaultHeight = 54;
                var defaultHeight2X = (defaultHeight * 3) | 0;
                var incrementHeight = defaultHeight;

                var eachWidth = 113;

                for (var i = 0; i < length; i = (i + 1) | 0) {
                    incrementHeight = defaultHeight;
                    var grCol = this.GridView.GetColumn(i);

                    if (!grCol.AllowEdit) {
                        continue;
                    }

                    var dtCol = grCol.Column;

                    var dtIndex = { v : grCol.GetDataColumnIndex() };

                    if (Bridge.referenceEquals(grCol.Column.FieldName.toLowerCase(), "cntr")) {
                        grCol.ReadOnly = true;
                    }

                    switch (dtCol.DataType) {
                        case ExpressCraft.DataType.DateTime: 
                            var lbldate = ExpressCraft.Control.Label(grCol.Caption, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), height);
                            var inputDate = { v : new ExpressCraft.TextInput("date") };
                            ExpressCraft.Helper.SetBounds(inputDate.v, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), ((((height + 16) | 0) + 3) | 0), eachWidth, 24);
                            inputDate.v.SetDate(System.Convert.toString(this.DataRow.getItem(dtIndex.v)));
                            inputDate.v.Readonly = grCol.ReadOnly;
                            if (!grCol.ReadOnly) {
                                inputDate.v.OnTextChanged = (function ($me, dtIndex, inputDate) {
                                    return Bridge.fn.bind($me, function (ev) {
                                        this.DataRow.setItem(dtIndex.v, inputDate.v.GetDate());
                                        if (this.LiveData) {
                                            this.GridView.RenderGrid();
                                        }
                                    });
                                })(this, dtIndex, inputDate);
                            }
                            ExpressCraft.Helper.AppendChildren$1(this.Panel, [lbldate, ExpressCraft.Control.op_Implicit(inputDate.v)]);
                            break;
                        case ExpressCraft.DataType.Integer: 
                        case ExpressCraft.DataType.Long: 
                        case ExpressCraft.DataType.Float: 
                        case ExpressCraft.DataType.Double: 
                        case ExpressCraft.DataType.Decimal: 
                        case ExpressCraft.DataType.Bool: 
                        case ExpressCraft.DataType.Byte: 
                        case ExpressCraft.DataType.Short: 
                            var lblnmb = ExpressCraft.Control.Label(grCol.Caption, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), height);
                            var inputNum = { };
                            if (Bridge.is(grCol.CellDisplay, ExpressCraft.GridViewCellDisplayCheckBox)) {
                                inputNum.v = new ExpressCraft.TextInput("checkbox");
                                ExpressCraft.Helper.SetChecked$1(inputNum.v, this.DataRow.getItem(dtIndex.v));
                            } else {
                                inputNum.v = new ExpressCraft.TextInput("number");
                                inputNum.v.Text = System.Convert.toString(this.DataRow.getItem(dtIndex.v));
                            }
                            ExpressCraft.Helper.SetBounds(inputNum.v, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), ((((height + 16) | 0) + 3) | 0), eachWidth, 24);
                            inputNum.v.Readonly = grCol.ReadOnly;
                            if (!grCol.ReadOnly) {
                                inputNum.v.OnTextChanged = (function ($me, inputNum, dtIndex) {
                                    return Bridge.fn.bind($me, function (ev) {
                                        if (inputNum.v.Type === "checkbox") {
                                            this.DataRow.setItem(dtIndex.v, Bridge.box(ExpressCraft.Helper.IsTrue(inputNum.v.Text) === 1, System.Boolean, System.Boolean.toString));
                                        } else {
                                            this.DataRow.setItem(dtIndex.v, inputNum.v.Text);
                                        }
                                        if (this.LiveData) {
                                            this.GridView.RenderGrid();
                                        }
                                    });
                                })(this, inputNum, dtIndex);
                            }
                            ExpressCraft.Helper.AppendChildren$1(this.Panel, [lblnmb, ExpressCraft.Control.op_Implicit(inputNum.v)]);
                            break;
                        default: 
                        case ExpressCraft.DataType.Object: 
                        case ExpressCraft.DataType.String: 
                            var lblstr = ExpressCraft.Control.Label(grCol.Caption, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), height);
                            var inputstr = { v : new ExpressCraft.TextInput("text") };
                            ExpressCraft.Helper.SetBounds(inputstr.v, ((25 + (((((col * eachWidth) | 0) + (((col * 3) | 0))) | 0))) | 0), ((((height + 16) | 0) + 3) | 0), eachWidth, 24);
                            inputstr.v.Text = System.Convert.toString(this.DataRow.getItem(dtIndex.v));
                            inputstr.v.Readonly = grCol.ReadOnly;
                            if (!grCol.ReadOnly) {
                                inputstr.v.OnTextChanged = (function ($me, dtIndex, inputstr) {
                                    return Bridge.fn.bind($me, function (ev) {
                                        this.DataRow.setItem(dtIndex.v, inputstr.v.Text);

                                        if (this.LiveData) {
                                            this.GridView.RenderGrid();
                                        }
                                    });
                                })(this, dtIndex, inputstr);
                            }
                            ExpressCraft.Helper.AppendChildren$1(this.Panel, [lblstr, ExpressCraft.Control.op_Implicit(inputstr.v)]);
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

                }
                // Add Accept Changes
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogBase", {
        inherits: [ExpressCraft.DialogForm],
        props: {
            QuestionSize: 0,
            Wrapper: null,
            QuestionDiv: null,
            AnswerDiv: null,
            ImageDiv: null
        },
        ctors: {
            ctor: function (title, width, question) {
                this.$initialize();
                ExpressCraft.DialogForm.ctor.call(this, title);
                this.Width = ExpressCraft.Helper.ToPx(Bridge.box(width, System.Int32));
                this.Wrapper = ExpressCraft.Control.Div();
                this.QuestionDiv = ExpressCraft.Control.Div();
                this.AnswerDiv = ExpressCraft.Control.Div();
                this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.InputDialogBase.f1)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

                this.Wrapper.style.overflowY = "hidden";
                ExpressCraft.Helper.SetBounds$1(this.Wrapper, "0px", "0px", "100%", "calc(100% - 60px)");
                this.QuestionDiv.style.position = "relative";
                this.QuestionDiv.style.height = "auto";
                this.QuestionDiv.style.marginLeft = "10px";
                this.QuestionDiv.style.marginRight = "10px";
                this.QuestionDiv.style.marginTop = "10px";
                this.AnswerDiv.style.position = "relative";
                this.AnswerDiv.style.height = "auto";
                ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(0), "calc(100% - 170px)", "calc(100% - 35px)");
                ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(1), "calc(100% - 85px)", "calc(100% - 35px)");

                var tb = new ExpressCraft.TextBlock(question, ((width - 25) | 0));
                tb.ComputeString();

                if (!tb.ElelemtsOverMax) {
                    width = (((Bridge.Int.clip32(tb.MaxCalculatedWidth) + 65) | 0) + 37) | 0;
                    if (width < ExpressCraft.Settings.MessageFormMinimumWidthInPx) {
                        width = ExpressCraft.Settings.MessageFormMinimumWidthInPx;
                    }
                }
                if (tb.ComputedHeight > ExpressCraft.Settings.MessageFormTextMaximumHeightInPx) {
                    tb.ComputedHeight = ExpressCraft.Settings.MessageFormTextMaximumHeightInPx;
                }
                if (tb.ComputedHeight < ExpressCraft.Settings.MessageFormTextMinimumHeightInPx) {
                    tb.ComputedHeight = ExpressCraft.Settings.MessageFormTextMinimumHeightInPx;
                }

                this.QuestionDiv.innerHTML = question;
                this.QuestionSize = System.Convert.toInt32(Bridge.box(tb.ComputedHeight, System.Single, System.Single.format, System.Single.getHashCode));
            }
        },
        methods: {
            Create: function (height) {
                this.Wrapper.appendChild(this.QuestionDiv);
                this.Wrapper.appendChild(document.createElement('br'));
                this.Wrapper.appendChild(this.AnswerDiv);
                this.Body.appendChild(this.Wrapper);

                ExpressCraft.Helper.AppendChildrenTabIndex(this.ButtonSection, this._buttonCollection.toArray());

                this.Height = ExpressCraft.Helper.ToPx(Bridge.box(height, System.Int32));
                this.AllowSizeChange = false;
            }
        }
    });

    Bridge.ns("ExpressCraft.InputDialogBase", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.InputDialogBase, {
        f1: function (_o1) {
            var $t;
            _o1.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), $t.Text = "Accept", $t));
            _o1.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), $t.Text = "Cancel", $t));
            return _o1;
        }
    });

    Bridge.define("ExpressCraft.MessageBoxForm", {
        inherits: [ExpressCraft.DialogForm],
        statics: {
            fields: {
                snd: null
            },
            methods: {
                Beep: function () {
                    if (!ExpressCraft.Settings.MessageFormBeep) {
                        return;
                    }
                    if (ExpressCraft.MessageBoxForm.snd == null) {
                        ExpressCraft.MessageBoxForm.snd = new Audio(ExpressCraft.ResourceManager.GetResourceString("beepSound"));
                    }
                    ExpressCraft.MessageBoxForm.snd.play();
                }
            }
        },
        fields: {
            _buttons: 0
        },
        ctors: {
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
                var section = ExpressCraft.Control.Div();
                var pic = ExpressCraft.Control.Div$1("image32");
                var textContent = ExpressCraft.Control.Div$1("messag-box-content");

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
                        throw new System.ArgumentOutOfRangeException("ui", null, null, Bridge.box(ui, ExpressCraft.MessageBoxLayout, System.Enum.toStringFn(ExpressCraft.MessageBoxLayout)));
                }

                switch (this._buttons) {
                    case ExpressCraft.MessageBoxButtons.Ok: 
                        this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f1)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(0), "calc(50% - 37.5px)", "calc(100% - 35px)");
                        break;
                    case ExpressCraft.MessageBoxButtons.YesNo: 
                        this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f2)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");
                        break;
                    case ExpressCraft.MessageBoxButtons.YesNoCancel: 
                        this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f3)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(2), "calc(100% - 255px)", "calc(100% - 35px)");
                        break;
                    case ExpressCraft.MessageBoxButtons.AbortIgnoreRetry: 
                        this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.MessageBoxForm.f4)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");
                        ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(2), "calc(100% - 255px)", "calc(100% - 35px)");
                        break;
                    default: 
                        throw new System.ArgumentOutOfRangeException();
                }
                var tb = new ExpressCraft.TextBlock(prompt, 455);
                tb.ComputeString();

                var width = 480;
                if (!tb.ElelemtsOverMax) {
                    width = (((Bridge.Int.clip32(tb.MaxCalculatedWidth) + 65) | 0) + 37) | 0;
                    if (width < ExpressCraft.Settings.MessageFormMinimumWidthInPx) {
                        width = ExpressCraft.Settings.MessageFormMinimumWidthInPx;
                    }
                }

                if (this._buttonCollection.Count > 2) {
                    if (width < 320) {
                        width = 320;
                    }
                }

                textContent.innerHTML = prompt;

                section.style.overflowY = "auto";
                section.style.height = "100%";
                section.style.maxHeight = ExpressCraft.Helper.ToPx(Bridge.box(ExpressCraft.Settings.MessageFormTextMaximumHeightInPx, System.Int32));
                section.appendChild(textContent);
                section.style.top = "32px";
                section.style.width = "90%";

                ExpressCraft.Helper.AppendChildren$1(this.Body, [pic, section]);

                if (tb.ComputedHeight > ExpressCraft.Settings.MessageFormTextMaximumHeightInPx) {
                    tb.ComputedHeight = ExpressCraft.Settings.MessageFormTextMaximumHeightInPx;
                }
                if (tb.ComputedHeight < ExpressCraft.Settings.MessageFormTextMinimumHeightInPx) {
                    tb.ComputedHeight = ExpressCraft.Settings.MessageFormTextMinimumHeightInPx;
                }

                ExpressCraft.Helper.AppendChildrenTabIndex(this.ButtonSection, this._buttonCollection.toArray());

                this.Height = System.Single.format(tb.ComputedHeight + 77 + 29 + 32) + "px";
                this.Width = ExpressCraft.Helper.ToPx(Bridge.box(width, System.Int32));
                this.AllowSizeChange = false;
            }
        },
        methods: {
            OnShowed: function () {
                ExpressCraft.MessageBoxForm.Beep();

                ExpressCraft.DialogForm.prototype.OnShowed.call(this);
                this._buttonCollection.getItem(0).Content.focus();
            }
        }
    });

    Bridge.ns("ExpressCraft.MessageBoxForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.MessageBoxForm, {
        f1: function (_o4) {
            var $t;
            _o4.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), $t.Text = "Ok", $t));
            return _o4;
        },
        f2: function (_o5) {
            var $t;
            _o5.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.No), $t.Text = "No", $t));
            _o5.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Yes), $t.Text = "Yes", $t));
            return _o5;
        },
        f3: function (_o6) {
            var $t;
            _o6.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), $t.Text = "Cancel", $t));
            _o6.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.No), $t.Text = "No", $t));
            _o6.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Yes), $t.Text = "Yes", $t));
            return _o6;
        },
        f4: function (_o7) {
            var $t;
            _o7.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Abort), $t.Text = "Abort", $t));
            _o7.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Retry), $t.Text = "Retry", $t));
            _o7.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Ignore), $t.Text = "Ignore", $t));
            return _o7;
        }
    });

    Bridge.define("ExpressCraft.ThemeForm", {
        inherits: [ExpressCraft.DialogForm],
        statics: {
            fields: {
                _themeVisible: false,
                themeForm: null
            },
            methods: {
                ShowThemeForm: function () {
                    if (!ExpressCraft.ThemeForm._themeVisible) {
                        ExpressCraft.ThemeForm.themeForm = new ExpressCraft.ThemeForm();
                        ExpressCraft.ThemeForm.themeForm.Show(null, true);

                        ExpressCraft.ThemeForm._themeVisible = true;
                    }
                }
            }
        },
        fields: {
            currentTheme: null,
            prevTheme: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.DialogForm.ctor.call(this);
                var $t, $t1;
                this.prevTheme = ExpressCraft.Settings.ActiveTheme;
                this.currentTheme = Bridge.merge(Bridge.createInstance(ExpressCraft.Theme), JSON.parse(JSON.stringify(this.prevTheme)));

                ExpressCraft.Settings.ActiveTheme = this.currentTheme;

                this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f3)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

                ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
                ExpressCraft.Helper.SetLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");

                ExpressCraft.Helper.AppendChildrenTabIndex(this.ButtonSection, this._buttonCollection.toArray());

                var length = this.currentTheme.Colors.length;
                var y = 20;
                var x = 20;

                var Panel = ExpressCraft.Control.Div();
                Panel.style.overflowY = "auto";
                ExpressCraft.Helper.SetBounds$1(Panel, 0, 0, "100%", "calc(100% - 60px)");

                this.Body.style.backgroundColor = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.White.$clone());

                for (var i = 0; i < length; i = (i + 1) | 0) {
                    Panel.appendChild(ExpressCraft.Control.op_Implicit(ExpressCraft.Helper.SetBounds(($t = new ExpressCraft.ColorInput(), $t.Text = ($t1 = this.currentTheme.Colors)[System.Array.index(i, $t1)].toString(), $t.ToolTip = new ExpressCraft.ToolTip.$ctor1("This is a heading test.", "This is a description test."), $t.OnTextChanged = Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f4), $t).SetAttribute("i", i), x, y, 95, 20)));

                    x = (x + 100) | 0;

                    if (i % 2 !== 0) {
                        y = (y + 30) | 0;
                        x = 20;
                    }
                }

                this.Body.appendChild(Panel);

                this.Size = new ExpressCraft.Vector2.$ctor1(250, 300);
                this.Text = "Theme Form Editor";

                this.AllowMoveChange = true;
                this.AllowSizeChange = false;

                this.ShowClose = false;
                this.ShowMaximize = false;
                this.ShowMinimize = false;
        }
    },
    methods: {
        OnClosed: function () {
            ExpressCraft.DialogForm.prototype.OnClosed.call(this);
            ExpressCraft.ThemeForm._themeVisible = false;
        },
        OnGotFocus: function () {
            if (this.Content != null) {
                this.Style.opacity = "1";
            }
            ExpressCraft.DialogForm.prototype.OnGotFocus.call(this);
        },
        OnLostFocus: function () {
            if (this.Content != null) {
                this.Style.opacity = "0.5";
            }
            ExpressCraft.DialogForm.prototype.OnLostFocus.call(this);
        }
    }
    });

    Bridge.ns("ExpressCraft.ThemeForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ThemeForm, {
        f1: function (ev) {
            ExpressCraft.Settings.ActiveTheme = this.prevTheme;
            this.Close();
        },
        f2: function (ev) {
            ExpressCraft.Settings.ApplyActiveTheme();
            this.Close();
        },
        f3: function (_o2) {
            var $t;
            _o2.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), $t.Text = "Cancel", $t.ItemClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f1), $t));
            _o2.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), $t.Text = "OK", $t.ItemClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.ThemeForm.f2), $t));
            return _o2;
        },
        f4: function (tx) {
            var $t2;
            var index = tx.GetAttributei("i");
            ($t2 = this.currentTheme.Colors)[System.Array.index(index, $t2)] = tx.Text;

            ExpressCraft.Settings.ApplyActiveTheme();
        }
    });

    Bridge.define("ExpressCraft.InputDialogCheckbox", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: false
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "checkbox");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "40px");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = input.checked;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 40) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogColour", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: null
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "color");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "40px");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = input.value;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 40) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogDate", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: null
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "date");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "auto");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = input.value;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 25) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogDateTimeLocal", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: null
        },
        ctors: {
            init: function () {
                this.Result = System.DateTime.getDefaultValue();
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
                this.Result = new Date();
                var input = ExpressCraft.Control.Input("inputcontrol", "datetime-local");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "auto");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = System.DateTime.parseExact(input.value, "yyyy-MM-ddTHH:mm", System.Globalization.CultureInfo.invariantCulture);
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 25) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogEmail", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: null
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "email");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "auto");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    //todo css for email input not showing up
                    //todo could always validate email here
                    this.Result = input.value;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 25) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogMonth", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: null
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "month");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "auto");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = input.value;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 25) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogNumber", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: 0
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "number");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "auto");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = input.valueAsNumber;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 25) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogText", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: null
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "text");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "auto");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = input.value;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 25) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });

    Bridge.define("ExpressCraft.InputDialogWeek", {
        inherits: [ExpressCraft.InputDialogBase],
        props: {
            Result: null
        },
        ctors: {
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
                var input = ExpressCraft.Control.Input("inputcontrol", "week");
                input.id = "DialogAnswerBox";
                ExpressCraft.Helper.SetBounds$1(input, "10px", "0px", "90%", "auto");
                input.onchange = Bridge.fn.bind(this, function (ev) {
                    this.Result = input.value;
                });
                this.AnswerDiv.appendChild(input);
                this.Create(((((((this.QuestionSize + 25) | 0) + 25) | 0) + 78) | 0));
            }
        }
    });
});
