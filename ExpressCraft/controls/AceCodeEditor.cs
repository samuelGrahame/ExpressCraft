using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
    public class AceCodeEditor : Control
    {
        private static ExternalPlugin ExternalAceCodeEditor = new ExternalPlugin("https://ace.c9.io/build/src/ace.js");
        public object editor = null;

        public void ClearSelection()
        {
            Script.Call("this.editor.clearSelection");
        }

        public bool ReadOnly
        {
            get
            {
                return Script.Write<bool>("this.editor.getReadOnly()");
            }
            set { Script.Call("this.editor.setReadOnly", value); }
        }

        public string Source
        {
            get
            {
                return Script.Write<string>("this.editor.getValue()");
            }

            set { Script.Call("this.editor.setValue", value); }
        }

        public static void Setup()
        {
            ExternalAceCodeEditor.Setup();
        }

        private AceModeTypes _modeType;
        private AceThemeTypes _themeType;

        public AceCodeEditor(AceModeTypes modeType = AceModeTypes.csharp, AceThemeTypes themeType = AceThemeTypes.xcode)
        {
            _modeType = modeType;
            _themeType = themeType;
        }

        public override void Render()
        {
            ExternalAceCodeEditor.UsageCheck();

            var theme = _modeType.ToString("G");
            var mode = _modeType.ToString("G");

            /*@
			this.editor = ace.edit(this.content);
			this.editor.setTheme("ace/theme/" + theme);
			this.editor.getSession().setMode("ace/mode/" + mode);
			*/
            this.OnResize = (cont) =>
            {
                /*@
				this.editor.resize(true);
				*/
            };

            this.Content.AddEventListener(EventType.MouseDown, (ev) =>
            {
                Form.InExternalMouseEvent = true;
            });

            this.Content.AddEventListener(EventType.MouseUp, (ev) =>
            {
                Form.InExternalMouseEvent = false;
            });

            base.Render();
        }
    }

    public enum AceThemeTypes
    {
        label, // bright
        chrome, // chrome
        clouds, // clouds
        crimson_editor, // crimson_editor
        dawn, // dawn
        dreamweaver, // dreamweaver
        eclipse, // eclipse
        github, // github
        solarized_light, // solarized_light
        textmate, // textmate
        tomorrow, // tomorrow
        xcode, // xcode
        clouds_midnight, // clouds_midnight
        cobalt, // cobalt
        idle_fingers, // idle_fingers
        kr_theme, // kr_theme
        merbivore, // merbivore
        merbivore_soft, // merbivore_soft
        mono_industrial, // mono_industrial
        monokai, // monokai
        pastel_on_dark, // pastel_on_dark
        solarized_dark, // solarized_dark
        terminal, // terminal
        tomorrow_night, // tomorrow_night
        tomorrow_night_blue, // tomorrow_night_blue
        tomorrow_night_bright, // tomorrow_night_bright
        tomorrow_night_eighties, // tomorrow_night_eighties
        twilight, // twilight
        vibrant_ink // vibrant_ink</option></optgroup>
    }

    public enum AceModeTypes
    {
        abap, // ABAP
        abc, // ABC
        actionscript, // ActionScript
        ada, // ADA
        apache_conf, // Apache, // Conf
        asciidoc, // AsciiDoc
        assembly_x86, // Assembly, // x86
        autohotkey, // AutoHotKey
        batchfile, // BatchFile
        bro, // Bro
        c_cpp, // C, // and, // C++
        c9search, // C9Search
        cirru, // Cirru
        clojure, // Clojure
        cobol, // Cobol
        coffee, // CoffeeScript
        coldfusion, // ColdFusion
        csharp, // C#
        css, // CSS
        curly, // Curly
        d, // D
        dart, // Dart
        diff, // Diff
        dockerfile, // Dockerfile
        dot, // Dot
        drools, // Drools
        dummy, // Dummy
        dummysyntax, // DummySyntax
        eiffel, // Eiffel
        ejs, // EJS
        elixir, // Elixir
        elm, // Elm
        erlang, // Erlang
        forth, // Forth
        fortran, // Fortran
        ftl, // FreeMarker
        gcode, // Gcode
        gherkin, // Gherkin
        gitignore, // Gitignore
        glsl, // Glsl
        gobstones, // Gobstones
        golang, // Go
        groovy, // Groovy
        haml, // HAML
        handlebars, // Handlebars
        haskell, // Haskell
        haskell_cabal, // Haskell, // Cabal
        haxe, // haXe
        hjson, // Hjson
        html, // HTML
        html_elixir, // HTML, // (Elixir)
        html_ruby, // HTML, // (Ruby)
        ini, // INI
        io, // Io
        jack, // Jack
        jade, // Jade
        java, // Java
        javascript, // JavaScript
        json, // JSON
        jsoniq, // JSONiq
        jsp, // JSP
        jsx, // JSX
        julia, // Julia
        kotlin, // Kotlin
        latex, // LaTeX
        less, // LESS
        liquid, // Liquid
        lisp, // Lisp
        livescript, // LiveScript
        logiql, // LogiQL
        lsl, // LSL
        lua, // Lua
        luapage, // LuaPage
        lucene, // Lucene
        makefile, // Makefile
        markdown, // Markdown
        mask, // Mask
        matlab, // MATLAB
        maze, // Maze
        mel, // MEL
        mushcode, // MUSHCode
        mysql, // MySQL
        nix, // Nix
        nsis, // NSIS
        objectivec, // Objective-C
        ocaml, // OCaml
        pascal, // Pascal
        perl, // Perl
        pgsql, // pgSQL
        php, // PHP
        powershell, // Powershell
        praat, // Praat
        prolog, // Prolog
        properties, // Properties
        protobuf, // Protobuf
        python, // Python
        r, // R
        razor, // Razor
        rdoc, // RDoc
        rhtml, // RHTML
        rst, // RST
        ruby, // Ruby
        rust, // Rust
        sass, // SASS
        scad, // SCAD
        scala, // Scala
        scheme, // Scheme
        scss, // SCSS
        sh, // SH
        sjs, // SJS
        smarty, // Smarty
        snippets, // snippets
        soy_template, // Soy, // Template
        space, // Space
        sql, // SQL
        sqlserver, // SQLServer
        stylus, // Stylus
        svg, // SVG
        swift, // Swift
        tcl, // Tcl
        tex, // Tex
        text, // Text
        textile, // Textile
        toml, // Toml
        tsx, // TSX
        twig, // Twig
        typescript, // Typescript
        vala, // Vala
        vbscript, // VBScript
        velocity, // Velocity
        verilog, // Verilog
        vhdl, // VHDL
        wollok, // Wollok
        xml, // XML
        xquery, // XQuery
        yaml, // YAML
        django // Django
    }
}