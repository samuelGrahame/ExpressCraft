using Bridge;
using static Retyped.dom;
using System.Collections.Generic;
using System.Linq;
using static Retyped.jquery;
using System;
using Retyped;

namespace ExpressCraft
{
    public class Form : Control
    {
        public static HTMLDivElement WindowHolder;
        public static List<Form> MinimizedForms = new List<Form>();
        public static HTMLDivElement WindowLoader;

        private static ToolTip _activeToolTip;
        private static int _toolTipTimerHandle = -1;
        private static Action<Event> _activeToolTipMouseMove;
        private static ToolTipControl _activeToolTipControl = null;
        private static int _oepntoolTipTimerHandle = -1;

        private HTMLImageElement _formIcon = null;

        private string _icon;

        public string Icon
        {
            get { return _icon; }
            set {
                if(_icon != value)
                {
                    if(string.IsNullOrWhiteSpace(value))
                    {
                        if(_formIcon != null)
                        {
                            _formIcon.Delete();
                        }
                    }
                    else
                    {
                        if(_formIcon == null)
                        {
                            _formIcon = new HTMLImageElement() { className = "control" };
                            _formIcon.SetBounds(6, 6, 16, 16);
                            this.Heading.appendChild(_formIcon);
                        }
                        _formIcon.src = value;
                    }
                    _icon = value;
                }
            }
        }
        
        private bool _disableBoxShadow;

        public bool DisableBoxShadow
        {
            get { return _disableBoxShadow; }
            set {
                _disableBoxShadow = value;
                if(_disableBoxShadow)
                    Content.style.boxShadow = "none";
                else
                    Content.style.boxShadow = null;
            }
        }

        /// <summary>
        /// Will remove header and make body 100% of the form, will also maxamize the screen making take 100% of the page.
        /// </summary>
        public void MakeMainPage()
        {
            this.Body.SetBoundsFull();
            this.Heading.style.visibility = "hidden";

            ShowClose = false;
            ShowMinimize = false;
            ShowMaximize = false;

            this.WindowState = WindowStateType.Maximized;

            this.AllowMoveChange = false;
            this.AllowSizeChange = false;
        }


        public static List<Action<KeyboardEvent>> KeyHooks = new List<Action<KeyboardEvent>>();

        public static ToolTip ActiveToolTip
        {
            get { return _activeToolTip; }
            set
            {
                if(_activeToolTip != value)
                {
                    if(value != null && value.AttachedControl != null && value.AttachedControl.Content != null)
                    {
                        if(_activeToolTipMouseMove != null)
                        {
                            value.AttachedControl.Content.removeEventListener("mousemove", _activeToolTipMouseMove);
                            _activeToolTipMouseMove = null;
                        }
                    }
                    if(_activeToolTipControl != null)
                    {
                        _activeToolTipControl.Close();
                        _activeToolTipControl = null;
                    }
                    if(_toolTipTimerHandle > -1)
                    {
                        clearTimeout(_toolTipTimerHandle);
                        _toolTipTimerHandle = -1;
                    }

                    _activeToolTip = value;

                    int messageLength;
                    if(_activeToolTip != null && (messageLength = _activeToolTip.GetWordCount()) > 0 && _activeToolTip.AttachedControl != null)
                    {
                        _activeToolTipMouseMove = (ev) =>
                        {
                            if(_toolTipTimerHandle > -1)
                            {
                                clearTimeout(_toolTipTimerHandle);
                            }
                            _toolTipTimerHandle = (int)setTimeout((ab) =>
                            {
                                if(_activeToolTipControl != null)
                                {
                                    _activeToolTipControl.Close();
                                    _activeToolTipControl = null;
                                }
                                if(_oepntoolTipTimerHandle > -1)
                                {
                                    clearTimeout(_oepntoolTipTimerHandle);
                                    _oepntoolTipTimerHandle = -1;
                                }
                                _activeToolTipControl = new ToolTipControl(_activeToolTip);
                                _activeToolTipControl.Show(ev.As<MouseEvent>());

                                _oepntoolTipTimerHandle = (int)setTimeout((ab2) =>
                                {
                                    if(_activeToolTipControl != null)
                                    {
                                        _activeToolTipControl.Close();
                                        _activeToolTipControl = null;
                                    }
                                }, Math.Max(1000, messageLength * Math.Max(Settings.ToolTipPopupStayOpenDelayPerWordMs, 10)));

                                if(_activeToolTipMouseMove != null)
                                {
                                    value.AttachedControl.Content.removeEventListener("mousemove", _activeToolTipMouseMove);
                                    _activeToolTipMouseMove = null;
                                }
                            }, Math.Max(1, Settings.ToolTipPopupDelayMs));
                        };
                        value.AttachedControl.Content.addEventListener("mousemove", _activeToolTipMouseMove);
                    }
                }
            }
        }

        public bool InDesign = false;

        public static int ResizeCorners = 2;
        public static Form MovingForm = null;
        public static HTMLElement Parent = null;
        public static bool Mouse_Down = false;
        public static bool MenuOpen = false;
        public static HTMLElement FormOverLay;
        
        private static bool _hasSetup = false;

        public bool HasSetup { get { return _hasSetup; } }

        private bool PreviousSizeChange = true;
        private bool PreviousMoveChange = true;
        private bool PreviousShowMax = true;
        private bool PreviousShowMin = true;
        private string PreviousOpacity = "";
        protected bool HasRemovedPlaceHolder;

        public bool AllowSizeChange = true;
        public bool AllowMoveChange = true;

        public HTMLCollection Controls => Body.children;

        public static bool InExternalMouseEvent = false;

        public bool ShowMinimize
        {
            get { return ButtonMinimize != null; }
            set
            {
                ChangeHeadingButton(FormButtonType.Minimize, value);
            }
        }

        public CSSStyleDeclaration BodyStyle => Body.style;

        public bool ShowClose
        {
            get { return ButtonClose != null; }
            set
            {
                ChangeHeadingButton(FormButtonType.Close, value);
            }
        }

        public bool ShowMaximize
        {
            get { return ButtonExpand != null; }
            set
            {
                ChangeHeadingButton(FormButtonType.Maximize, value);
            }
        }

        public bool ShowMenu
        {
            get { return ButtonMenu != null; }
            set
            {
                ChangeHeadingButton(FormButtonType.Menu, value);
            }
        }

        public bool ForReuse = false;

        protected static bool InErrorDialog = false;

        //public JQuery<HTMLElement> Self;

        protected bool _IsDialog = false;

        public bool IsDialog()
        {
            return _IsDialog;
        }

        private List<Control> Children = new List<Control>();

        public void LinkResize(Control child, bool appendAlso = false)
        {
            if(child == null)
                return;
            Children.Add(child);
            if (appendAlso)
                Body.AppendChild(child);
            child.LinkedForm = this;
        }

        public void LinkResize(params Control[] children)
        {
            if(children == null || children.Length == 0)
                return;
            Children.AddRange(children);
            for(int i = 0; i < children.Length; i++)
            {
                if(children[i] != null)
                    children[i].LinkedForm = this;                
            }
        }

        public Form AppendChild(Control node)
        {
            this.Body.appendChild((Node)node);

            return this;
        }

        public Form AppendChildren(params Control[] node)
        {
            this.Body.AppendChildren(node);

            return this;
        }

        public Form AppendChild(HTMLElement node)
        {
            this.Body.appendChild(node);

            return this;
        }

        public Form AppendChildren(params HTMLElement[] node)
        {
            this.Body.AppendChildren(node);

            return this;
        }

        protected static FormCollection standAloneForms = new FormCollection(null);
        public static List<FormCollection> FormCollections = new List<FormCollection>();

        public FormStartPosition StartPosition = FormStartPosition.WindowsDefaultLocation;

        public static bool ShowBodyOverLay = false;

        public static int Window_DefaultHeight = 480;
        public static int Window_DefaultWidth = 640;

        private static Form _ActiveForm;
        private static Form _PrevActiveForm;
        private static MouseMoveAction MoveAction = MouseMoveAction.Move;

        public bool TopMost = false;

        public DialogResultEnum DialogResult = DialogResultEnum.None;

        public static int WindowHolderSelectionBoxX;
        public static int WindowHolderSelectionBoxY;

        public static int WindowHolderSelectionBoxXOff;
        public static int WindowHolderSelectionBoxYOff;

        public HTMLDivElement Heading;
        protected HTMLDivElement ButtonClose;
        protected HTMLDivElement ButtonExpand;
        protected HTMLDivElement ButtonMinimize;
        protected HTMLDivElement ButtonMenu;
        protected HTMLSpanElement HeadingTitle;

        public HTMLDivElement Body;
        public HTMLDivElement BodyOverLay;

        public float prev_px;
        public float prev_py;

        private int prev_width;
        private int prev_height;

        private int prev_top;
        private int prev_left;

        public int MinWidth = 200;
        public int MinHeight = 50;

        public void ResizeChildren(HTMLElement parent)
        {
            if(OnResize != null)
                OnResize(this);
            OnResizing();

            for(uint x = 0; x < parent.children.length; x++)
            {
                if(!parent.children[x].classList.contains("control"))
                    continue;
                for(int i = 0; i < Children.Count; i++)
                {
                    if(Children[i] != null && Children[i].OnResize != null)
                    {
                        if(Children[i].Content == parent.children[x])
                        {
                            Children[i].OnResize(Children[i]);
                            break;
                        }
                    }
                }
                ResizeChildren(parent.children[x].As<HTMLElement>());
            }
        }

        public void Resizing()
        {
            if(OnResize != null)
                OnResize(this);
            OnResizing();

            for(int i = 0; i < Children.Count; i++)
            {
                if(Children[i] != null && Children[i].OnResize != null)
                {
                    Children[i].OnResize(Children[i]);
                }
            }
        }

        protected virtual void OnResizing()
        {
        }

        private WindowStateType windowState;
        private WindowStateType _prevwindowState = WindowStateType.Normal;

        public WindowStateType WindowState
        {
            get { return windowState; }
            set { SetWindowState(value); }
        }

        public static bool MidleOfAction()
        {
            return MovingForm != null; // WindowHolderSelectionBox != null ||
        }

        public bool IsContentVisible()
        {
            return Content != null && Content.style.visibility.Equals("visible");
        }

        public void ChangeHeadingButton(FormButtonType button, bool visible = true)
        {
            switch(button)
            {
                case FormButtonType.Minimize:
                    if(ButtonMinimize != null)
                    {
                        ButtonMinimize.Delete();
                        ButtonMinimize = null;
                    }
                    if(visible)
                    {
                        ButtonMinimize = CreateFormButton(button);
                    }

                    break;

                case FormButtonType.Maximize:
                    if(ButtonExpand != null)
                    {
                        ButtonExpand.Delete();
                        ButtonExpand = null;
                    }
                    if(visible)
                    {
                        ButtonExpand = CreateFormButton(button);
                    }
                    break;

                case FormButtonType.Close:
                    if(ButtonClose != null)
                    {
                        ButtonClose.Delete();
                        ButtonClose = null;
                    }
                    if(visible)
                    {
                        ButtonClose = CreateFormButton(button);
                    }
                    break;

                case FormButtonType.Menu:
                    if(ButtonMenu != null)
                    {
                        ButtonMenu.Delete();
                        ButtonMenu = null;
                    }
                    if(visible)
                    {
                        ButtonMenu = CreateFormButton(button);
                    }
                    break;

                default:
                    break;
            }

            CalculateButtonLocations();
        }

        protected virtual void Initialise()
        {
        }

        protected virtual void OnShowing()
        {
        }

        protected virtual void OnShowed()
        {
        }

        protected virtual void OnClosing()
        {
        }

        protected virtual void OnClosed()
        {
        }

        public Action OnFormClosed = null;

        public static FormCollection GetActiveFormCollection()
        {
            for(int i = FormCollections.Count - 1; i >= 0; i--)
            {
                var frmCol = FormCollections[i];
                if(frmCol.FormOwner == null)
                {
                    for(int x = 0; x < frmCol.VisibleForms.Count; x++)
                    {
                        if(frmCol.VisibleForms[x] != null)
                        {
                            frmCol.VisibleForms[x].Close();
                        }
                    }
                    FormCollections.RemoveAt(i);
                }
                else
                {
                    return frmCol;
                }
            }

            return null;
        }

        public static void SetBodyOverLay()
        {
            var ActiveCollection = GetActiveFormCollection();
            if(ActiveCollection == null)
                return;

            ActiveCollection.FormOwner.ShowBodyOverLayStyle();

            var VisibleForms = ActiveCollection.VisibleForms;

            for(int i = 0; i < VisibleForms.Count; i++)
            {
                var form = VisibleForms[i];
                if(form != null)
                {
                    form.ShowBodyOverLayStyle();
                }
            }
        }

        public void ShowBodyOverLayStyle()
        {
            if(BodyOverLay != null &&
                BodyOverLay.style.visibility.Equals("collapse"))
            {
                if(InDesign)
                {
                    return;
                }
                BodyOverLay.style.visibility = "visible";
            }
        }

        protected virtual void OnGotFocus()
        {
        }

        protected virtual void OnLostFocus()
        {
        }

        public static Form ActiveForm
        {
            get { return _ActiveForm; }
            set
            {
                if(_ActiveForm != value)
                {
                    _PrevActiveForm = _ActiveForm;

                    if(_ActiveForm != null)
                    {
                        _ActiveForm.OnLostFocus();
                        if(_ActiveForm.Content != null)
                        {
                            if(_ActiveForm.InDesign)
                            {
                                _ActiveForm.BodyOverLay.style.visibility = "collapse";
                                return;
                            }
                            _ActiveForm.BodyOverLay.style.visibility = "visible";
                        }
                    }
                    _ActiveForm = value;
                    if(_ActiveForm != null)
                    {
                        _ActiveForm.OnGotFocus();
                        if(_ActiveForm.Content != null)
                        {
                            _ActiveForm.BodyOverLay.style.visibility = "collapse";
                            _ActiveForm.BringToFront();
                        }
                    }
                    if(_PrevActiveForm is FormPopup && ((_ActiveForm != null && !(_ActiveForm is FormPopup)) || _ActiveForm == null))
                    {
                        CloseFormPopups();
                    }
                }
            }
        }

        public static void ChangeStateTextSelection(HTMLElement element, bool state)
        {
            element.style.userSelect = state ? "text" : "none";            
        }

        public static void PerformFocusShake()
        {
            if(ActiveForm != null)
            {
                var form = ActiveForm;
                form.Heading.classList.add("form-heading-flash");
                setTimeout((ab) =>
                {
                    form.Heading.classList.remove("form-heading-flash");
                }, 800);
            }
        }

        public static void DisableStateDrag(HTMLElement element)
        {
            if(element is HTMLImageElement)
            {
                element.As<HTMLImageElement>().ondragstart = (ev) =>
                {
                    ev.preventDefault();
                };
            }
            else
            {
                dynamic el = element;
                el.style.webkitUserDrag = "none";                
            }
        }

        public static void SetupHideElementsOnView()
        {
            window.onblur = (ev) =>
            {
                if(document.body.contains(WindowHolder))
                    document.body.removeChild(WindowHolder);
            };

            window.onfocus = (ev) =>
            {
                if(!document.body.contains(WindowHolder))
                    document.body.appendChild(WindowHolder);
            };
        }

        public static void CloseFormPopups()
        {
            try
            {
                var x = GetActiveFormCollection();

                for(int i = 0; i < x.VisibleForms.Count; i++)
                {
                    if(x.VisibleForms[i] != null && x.VisibleForms[i] is FormPopup &&
                        x.VisibleForms[i].IsContentVisible())
                    {
                        x.VisibleForms[i].Close();
                    }
                }
                if(x.FormOwner is FormPopup)
                {
                    x.FormOwner.Close();
                }
            }
            catch(Exception)
            {
            }
        }

        private static int LoadingCount = 0;
        
        public static void BeginLoading()
        {
            LoadingCount++;            
            SetCursor("wait");
            WindowLoader.style.visibility = "visible";
            WindowLoader.style.opacity = "0.4";                      
        }

        public static void EndLoading()
        {
            LoadingCount--;
            if(LoadingCount == 0)
            {                
                SetCursor("default");
                WindowLoader.style.visibility = "hidden";
                WindowLoader.style.opacity = "0";                
            }
        }

        public static void Setup(HTMLElement parent = null)
        {
            //Settings.Setup();
            if(_hasSetup)
                return;
            _hasSetup = true;

            if(parent == null)
                Parent = document.body;
            else
                Parent = parent;
            
            WindowHolder = Div("form-container");

            FormOverLay = Div("system-form-collection-overlay");

            WindowLoader = new HTMLDivElement();
            WindowLoader.className = "ajax-loading-screen";
            WindowLoader.style.visibility = "hidden";
            WindowLoader.style.opacity = "0";
            WindowLoader.style.backgroundColor = "white";
            WindowLoader.SetBoundsFull();
            WindowLoader.style.position = "fixed";
            WindowLoader.style.zIndex = "100000";
            WindowLoader.oncontextmenu = (ev) =>
            {
                ev.preventDefault();
            };
            WindowLoader.onmousedown = (ev) =>
            {
                ev.preventDefault();
                ev.stopPropagation();
            };
            WindowLoader.style.transition = "opacity 1s ease";

            document.body.appendChild(WindowLoader);

            FormOverLay.onmousedown = (ev) =>
            {
                if(ActiveForm is FormPopup)
                {
                    CloseFormPopups();
                }

                if(document.activeElement != null)
                {
                    //FormPopup
                    document.activeElement.As<HTMLElement>().focus();
                    ev.preventDefault();
                    SetCursor("default");
                }
            };
            FormOverLay.onclick = (ev) =>
            {
                PerformFocusShake();
            };
            FormOverLay.oncontextmenu = (ev) =>
            {
                ev.stopPropagation();
                ev.preventDefault();
            };
            FormOverLay.style.visibility = "visible";

            window.onkeydown = (ev) =>
            {
                int length = KeyHooks.Count;
                for(int i = 0; i < length; i++)
                {
                    if(KeyHooks[i] != null)
                        KeyHooks[i](ev);
                }
            };

            window.onresize = (ev) =>
            {
                if(FormCollections == null)
                    return;

                for(int i = 0; i < FormCollections.Count; i++)
                {
                    if(FormCollections[i] == null)
                        continue;
                    var fc = FormCollections[i];
                    if(fc.FormOwner != null)
                        fc.FormOwner.Resizing();
                    for(int x = 0; x < fc.VisibleForms.Count; x++)
                    {
                        if(fc.VisibleForms[x] != null)
                            fc.VisibleForms[x].Resizing();
                    }
                }

                CalculateMinmizedFormsLocation();
            };

            window.onmousemove = (ev) =>
            {
                if(InExternalMouseEvent)
                    return;

                var mev = ev.As<MouseEvent>();

                if(MovingForm != null)
                {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    ev.stopPropagation();

                    if(!MovingForm.DisableBoxShadow)
                        MovingForm.Style.boxShadow = "none"; // box - shadow: none;

                    if(MovingForm.BodyOverLay.style.visibility.Equals("collapse"))
                    {
                        if(MovingForm.InDesign)
                        {
                            _ActiveForm.BodyOverLay.style.visibility = "collapse";
                        }
                        else
                        {
                            MovingForm.BodyOverLay.style.visibility = "visible";
                        }

                        MovingForm.Heading.focus();
                    }

                    var mousePos = Helper.GetClientMouseLocation(ev);

                    float mX;
                    float mY;

                    var newX = ((mX = mousePos.Xf) + MovingForm.prev_px);
                    var newY = ((mY = mousePos.Yf) + MovingForm.prev_py);

                    if(MovingForm.windowState == WindowStateType.Maximized &&
                        MoveAction == MouseMoveAction.Move)
                    {
                        MovingForm.changeWindowState();
                        newX = mousePos.Xf - (MovingForm.prev_width / 2);
                        MovingForm.prev_px = newX - mousePos.Xf;
                    }

                    float x = (float)Script.ParseFloat(MovingForm.Style.left);
                    float y = (float)Script.ParseFloat(MovingForm.Style.top);
                    float w = (float)Script.ParseFloat(MovingForm.Style.width);
                    float h = (float)Script.ParseFloat(MovingForm.Style.height);

                    float px = x;
                    float py = y;
                    float pw = w;
                    float ph = h;

                    if(newY < 1)
                        newY = 1;
                    if(newX < 1)
                        newX = 1;

                    if(mX < 1)
                        mX = 1;
                    if(mY < 1)
                        mY = 1;

                    switch(MoveAction)
                    {
                        case MouseMoveAction.Move:
                            x = newX;
                            y = newY;
                            break;

                        case MouseMoveAction.TopLeftResize:
                            w -= newX - x;
                            h -= newY - y;

                            if(w < MovingForm.MinWidth)
                            {
                                newX -= MovingForm.MinWidth - w;
                                w = MovingForm.MinWidth;
                            }
                            if(h < MovingForm.MinHeight)
                            {
                                newY -= MovingForm.MinHeight - h;
                                h = MovingForm.MinHeight;
                            }
                            x = newX;
                            y = newY;

                            break;

                        case MouseMoveAction.TopResize:
                            h -= newY - y;

                            if(h < MovingForm.MinHeight)
                            {
                                newY -= MovingForm.MinHeight - h;
                                h = MovingForm.MinHeight;
                            }

                            y = newY;

                            break;

                        case MouseMoveAction.TopRightResize:
                            h -= newY - y;
                            w = mX - x;

                            if(h < MovingForm.MinHeight)
                            {
                                newY -= MovingForm.MinHeight - h;
                                h = MovingForm.MinHeight;
                            }
                            if(w < MovingForm.MinWidth)
                                w = MovingForm.MinWidth;

                            y = newY;

                            break;

                        case MouseMoveAction.LeftResize:
                            w -= newX - x;

                            if(w < MovingForm.MinWidth)
                            {
                                newX -= MovingForm.MinWidth - w;
                                w = MovingForm.MinWidth;
                            }

                            x = newX;

                            break;

                        case MouseMoveAction.BottomLeftResize:
                            w -= newX - x;
                            h = mY - y;

                            if(w < MovingForm.MinWidth)
                            {
                                newX -= MovingForm.MinWidth - w;
                                w = MovingForm.MinWidth;
                            }

                            if(h < MovingForm.MinHeight)
                                h = MovingForm.MinHeight;

                            x = newX;

                            break;

                        case MouseMoveAction.BottomResize:
                            h = mY - y;

                            if(h < MovingForm.MinHeight)
                                h = MovingForm.MinHeight;

                            break;

                        case MouseMoveAction.RightResize:
                            w = mX - x;

                            if(w < MovingForm.MinWidth)
                                w = MovingForm.MinWidth;

                            break;

                        case MouseMoveAction.BottomRightResize:
                            w = mX - x;

                            h = mY - y;

                            if(h < MovingForm.MinHeight)
                                h = MovingForm.MinHeight;
                            if(w < MovingForm.MinWidth)
                                w = MovingForm.MinWidth;

                            break;
                    }
                    bool changed = false;
                    if(px != x)
                    {
                        if(Settings.AlignFormToGrid && MoveAction == MouseMoveAction.Move && Settings.AlignmentForForm > 1 && x != 0)
                        {
                            x = ((int)(x / Settings.AlignmentForForm)) * Settings.AlignmentForForm;
                            if(px != x)
                            {
                                MovingForm.Style.left = Script.Write<string>("x + 'px'");
                            }
                        }
                        else
                        {
                            MovingForm.Style.left = Script.Write<string>("x + 'px'");
                        }                        
                    }
                        
                    if(py != y)
                    {
                        if(Settings.AlignFormToGrid && MoveAction == MouseMoveAction.Move && Settings.AlignmentForForm > 1 && y != 0)
                        {
                            y = ((int)(y / Settings.AlignmentForForm)) * Settings.AlignmentForForm;
                            if(py != y)
                            {
                                MovingForm.Style.top = Script.Write<string>("y + 'px'");
                            }
                        }else
                        {
                            MovingForm.Style.top = Script.Write<string>("y + 'px'");
                        }
                    }
                        
                    if(pw != w)
                    {
                        changed = true;
                        MovingForm.Style.width = Script.Write<string>("w + 'px'");
                    }
                        
                    if(ph != h)
                    {
                        changed = true;
                        MovingForm.Style.height = Script.Write<string>("h + 'px'");
                    }

                    if(changed)
                        MovingForm.Resizing();
                }
            };

            window.onmouseup = (ev) =>
            {
                InExternalMouseEvent = false;
                if(MovingForm != null)
                {
                    if(!MovingForm.DisableBoxShadow)
                        MovingForm.Style.boxShadow = null;
                    MovingForm.BodyOverLay.style.visibility = "collapse";
                }

                MovingForm = null;
                Mouse_Down = false;
                MoveAction = MouseMoveAction.Move;
                SetCursor("default");
            };
            window.onbeforeunload = (ev) =>
            {
                if(!Settings.AllowCloseWithoutQuestion)
                {
                    Script.Write("return 'Would you like to close this application?'");
                }
            };
            window.onunload = (ev) =>
            {
                if(Settings.OnApplicationClose != null)
                    Settings.OnApplicationClose();
            };
            
            dynamic window2 = window;

            Func<string, string, int ,int, object, bool> errorFunc = (string message, string url, int lineNumber, int columnNumber, object error) =>
            {
                if(InErrorDialog)
                {
                    return false;
                }
                try
                {
                    InErrorDialog = true;
                    string errStr;
                    if(string.IsNullOrWhiteSpace(message) || message == "Script error.")
                    {
                        errStr = "Script Error: See Browser Console for Detail's";
                    }
                    else
                    {
                        errStr = "Script Error: " + message;
                    }

                    if(Application.AplicationDefition == ApplicationDefitnion.ExpressCraftConsole)
                    {
                        ConsoleForm.Log(errStr, ConsoleLogType.Error);
                    }

                    if(Settings.ShowExceptionDialog)
                    {
                        var msgBox = new MessageBoxForm(errStr, MessageBoxLayout.Error);
                        msgBox.ShowDialog();
                    }
                }
                catch(Exception)
                {
                }
                finally
                {
                    InErrorDialog = false;
                }

                return false;
            };

            window2.onerror = errorFunc;
            
            WindowHolder.appendChild(FormOverLay);

            Parent.AppendChildren(WindowHolder);
        }

        public static void SetCursor(string cursor)
        {
            document.body.style.cursor = cursor;
            var x = document.body.style.backgroundColor;
            document.body.style.backgroundColor = "white";
            document.body.style.backgroundColor = x;
        }

        private string previousDisplay;

        public void SetWindowState(WindowStateType State)
        {
            if(State == windowState)
                return;

            _prevwindowState = windowState;

            if(_prevwindowState == WindowStateType.Minimized)
            {
                Body.style.opacity = PreviousOpacity;
                AllowSizeChange = PreviousSizeChange;
                AllowMoveChange = PreviousMoveChange;
                ShowMaximize = PreviousShowMax;
                ShowMinimize = PreviousShowMin;
                HeadingTitle.style.left = "";
                HeadingTitle.style.marginRight = "";
                HeadingTitle.style.transform = "";

                if(ButtonMinimize != null)
                {
                    ButtonMinimize.innerHTML = "-";
                }
                Heading.classList.remove("form-heading-min");

                MinimizedForms.Remove(this);

                Body.style.display = previousDisplay;

                CalculateMinmizedFormsLocation();
            }

            if(!AllowSizeChange)
                return;

            if((windowState = State) == WindowStateType.Normal)
            {
                this.SetBounds(prev_left, prev_top, prev_width, prev_height);
                Resizing();
                Style.borderWidth = "1px";
            }
            else if(windowState == WindowStateType.Maximized)
            {
                if(_prevwindowState == WindowStateType.Normal)
                {
                    prev_left = Left.ToInt();
                    prev_top = Top.ToInt();
                    prev_width = Width.ToInt();
                    prev_height = Height.ToInt();
                }

                Style.borderWidth = "0";

                this.SetBounds(0, 0, "100%", "100%");
            }
            else if(windowState == WindowStateType.Minimized)
            {
                PreviousSizeChange = AllowSizeChange;
                PreviousMoveChange = AllowMoveChange;
                PreviousOpacity = Body.style.opacity;
                PreviousShowMax = ShowMaximize;
                PreviousShowMin = ShowMinimize;

                AllowSizeChange = false;
                Body.style.opacity = "0";
                ShowMaximize = false;
                ShowMinimize = false;
                AllowMoveChange = false;

                if(_prevwindowState == WindowStateType.Normal)
                {
                    prev_left = Left.ToInt();
                    prev_top = Top.ToInt();
                    prev_width = Width.ToInt();
                    prev_height = Height.ToInt();
                }
                else
                {
                    Style.borderWidth = "1px";
                }

                HeadingTitle.style.marginRight = "0";
                HeadingTitle.style.left = "3px";
                HeadingTitle.style.transform = "translate(0, -50%)";

                var offset = (ShowClose ? 45.5f : 0);

                Width = (float)Math.Max(GetTextWidth(Text, "10pt Tahoma") + 32, 100) + offset;
                Height = 30;

                Heading.classList.add("form-heading-min");

                if(ButtonMinimize != null)
                {
                    ButtonMinimize.innerHTML = "+";
                }

                previousDisplay = Body.style.display;
                Body.style.display = "none";

                MinimizedForms.Add(this);

                CalculateMinmizedFormsLocation();
            }

            Resizing();
        }

        private static void CalculateMinmizedFormsLocation()
        {
            if(MinimizedForms.Count > 0 && MinimizedForms.Contains(null))
                MinimizedForms.Remove(null);
            var RemoveList = new List<Form>();
            int count = 0;
            float widthTotal = 0;
            int y = 30;

            var viewSize = (DOMRect)Parent.getBoundingClientRect();

            foreach(var item in MinimizedForms)
            {
                if(item.Content == null || item.windowState != WindowStateType.Minimized)
                {
                    RemoveList.Add(item);
                }
                else
                {
                    var ToIncrement = 3 + item.Width.ToFloat();

                    if(widthTotal + ToIncrement > viewSize.width)
                    {
                        widthTotal = 0;
                        count = 0;
                        y += 33;
                    }

                    item.Location = new Vector2(widthTotal, "(100% - " + (y + 2) + "px)");

                    count++;

                    widthTotal += ToIncrement;
                }
            }
            foreach(var item in RemoveList)
            {
                MinimizedForms.Remove(item);
            }

            //Left = 0;
            //Top = "calc(100% - 30px)";
        }

        private void changeWindowState()
        {
            if(windowState == WindowStateType.Maximized)
            {
                SetWindowState(WindowStateType.Normal);
            }
            else if(windowState == WindowStateType.Minimized)
            {
                SetWindowState(_prevwindowState);
            }
            else
            {
                SetWindowState(WindowStateType.Maximized);
            }
        }

        public void CalculateButtonLocations()
        {
            float RightOffset = 0;
            float append = 45.5f;

            if(Helper.NotDesktop)
            {
                append = 65.5f;
            }

            if(ShowClose)
            {
                if(Helper.NotDesktop)
                {
                    ButtonClose.style.left = "calc(100% - " + append + "px)";
                }
                RightOffset += append;
                if(!Heading.contains(ButtonClose))
                    Heading.AppendChild(ButtonClose);
            }

            if(ShowMaximize)
            {
                RightOffset += append;
                ButtonExpand.style.left = "calc(100% - " + RightOffset + "px)";
                if(!Heading.contains(ButtonExpand))
                    Heading.AppendChild(ButtonExpand);
            }
            if(ShowMinimize)
            {
                RightOffset += append;
                ButtonMinimize.style.left = "calc(100% - " + RightOffset + "px)";
                if(!Heading.contains(ButtonMinimize))
                    Heading.AppendChild(ButtonMinimize);
            }

            if(ShowMenu)
            {
                ButtonMenu.style.left = "0";
                if(!Heading.contains(ButtonMenu))
                    Heading.AppendChild(ButtonMenu);
            }
        }

        private HTMLDivElement CreateFormButton(FormButtonType Type)
        {
            var butt = Div("form-heading-button");

            switch(Type)
            {
                case FormButtonType.Close:
                    butt.classList.add("form-heading-button-close");
                    butt.innerHTML = "&times;";

                    butt.onmousedown = (ev) =>
                    {
                        if(MovingForm != null) //  || WindowHolderSelectionBox != null
                            return;
                        Mouse_Down = true;

                        ev.stopPropagation();
                        ev.preventDefault();

                        ActiveForm = this;
                    };

                    butt.onmouseup = (ev) =>
                    {
                        if(MovingForm != null) //|| WindowHolderSelectionBox != null
                            return;

                        ev.stopPropagation();
                        ev.preventDefault();

                        if(InDesign)
                            return;

                        Close();
                    };
                    break;

                case FormButtonType.Maximize:
                    butt.innerHTML = "&#9633;";

                    butt.onmouseup = (ev) =>
                    {
                        if(MovingForm != null) //  || WindowHolderSelectionBox != null
                            return;

                        ev.stopPropagation();
                        ev.preventDefault();

                        Mouse_Down = false;

                        changeWindowState();
                    };

                    break;

                case FormButtonType.Minimize:
                    butt.innerHTML = "-";

                    butt.onmouseup = (ev) =>
                    {
                        if(MovingForm != null) // || WindowHolderSelectionBox != null
                            return;

                        ev.stopPropagation();
                        ev.preventDefault();

                        if(butt.innerHTML == "-")
                        {
                            butt.innerHTML = "+";
                            WindowState = WindowStateType.Minimized;
                        }
                        else
                        {
                            WindowState = _prevwindowState == WindowStateType.Minimized ? WindowStateType.Normal : _prevwindowState;
                            butt.innerHTML = "-";
                        }

                        Mouse_Down = false;
                    };

                    break;

                case FormButtonType.Restore:

                    break;

                case FormButtonType.Help:
                    break;

                default:
                    butt.onmouseup = (ev) =>
                    {
                        if(MovingForm != null) //  || WindowHolderSelectionBox != null
                            return;

                        ev.stopPropagation();
                        ev.preventDefault();

                        Mouse_Down = false;
                    };
                    break;

                case FormButtonType.Menu:
                    butt.innerHTML = "&#9776;";

                    butt.onmouseup = (ev) =>
                    {
                        if(MovingForm != null) //  || WindowHolderSelectionBox != null
                            return;

                        ev.stopPropagation();
                        ev.preventDefault();

                        Mouse_Down = false;

                        OnMenuClick();
                    };

                    break;
            }

            butt.onmouseenter = (ev) =>
            {
                if(MovingForm != null) //  || WindowHolderSelectionBox != null
                    return;
                SetCursor("default");
            };

            butt.ondblclick = (ev) =>
            {
                ev.stopPropagation();
            };

            butt.onmousemove = (ev) =>
            {
                if(MovingForm != null) //  || WindowHolderSelectionBox != null
                    return;

                ev.stopImmediatePropagation();
                ev.preventDefault();
            };

            if(Type != FormButtonType.Close)
            {
                butt.onmousedown = (ev) =>
                {
                    if(MovingForm != null) // || WindowHolderSelectionBox != null
                        return;

                    Mouse_Down = true;

                    ev.stopPropagation();
                    ev.preventDefault();

                    ActiveForm = this;
                };
            }

            if(Helper.NotDesktop)
            {
                butt.style.width = "65px";
                butt.style.height = "49px";
                butt.style.fontSize = "16pt";
                butt.style.lineHeight = "49px";
                butt.ExchangeClass("primary", "primary");
                butt.style.filter = "brightness(110%)";
            }

            return butt;
        }

        public virtual void OnMenuClick()
        {
        }

        public Form() : base("form-base")
        {
            Heading = Div("form-heading");

            Heading.oncontextmenu = (ev) =>
            {
                ev.stopPropagation();
                ev.preventDefault();
            };

            HeadingTitle = Span("form-heading-title");

            Body = Div("form-body");

            Body.oncontextmenu = (ev) =>
            {
                if(ev.target == Body)
                {
                    ev.stopPropagation();
                    ev.preventDefault();
                }
            };

            BackColor = "#F0F0F0";

            BodyOverLay = Div("form-body-overlay");

            BodyOverLay.style.opacity = ShowBodyOverLay ? "0.5" : "0";

            ChangeHeadingButton(FormButtonType.Close);
            if(!Helper.NotDesktop)
            {
                ChangeHeadingButton(FormButtonType.Maximize);
                ChangeHeadingButton(FormButtonType.Minimize);
            }

            if(Helper.NotDesktop)
            {
                Heading.style.height = "50px";
                HeadingTitle.style.fontSize = "14px";

                Body.style.top = "50px";
                Body.style.height = "calc(100% - 50px)";

                BodyOverLay.style.top = "50px";
                BodyOverLay.style.height = "calc(100% - 50px)";
            }

            BodyOverLay.style.visibility = "collapse";
            
            Content.addEventListener("mousedown", (ev) =>
            {
                if(InExternalMouseEvent)
                    return;
                var mev = ev.As<MouseEvent>();

                mev.stopPropagation();
                mev.stopImmediatePropagation();

                if(!IsActiveFormCollection())
                    return;

                Mouse_Down = true;

                MovingForm = this;
                ActiveForm = this;

                SetBodyOverLay();

                var clientRec = (DOMRect)this.Content.getBoundingClientRect();

                var mousePos = Helper.GetClientMouseLocation(ev);

                prev_px = (float)clientRec.left - mousePos.Xf;
                prev_py = (float)clientRec.top - mousePos.Yf;

                var width = (float)clientRec.width;
                var height = (float)clientRec.height;

                float X = mousePos.Xf - (float)clientRec.left;
                float Y = mousePos.Yf - (float)clientRec.top;

                if(windowState == WindowStateType.Maximized)
                {
                    SetCursor("default");
                    MoveAction = MouseMoveAction.Move;
                }
                else if(windowState == WindowStateType.Minimized)
                {
                    SetCursor("default");
                    MoveAction = MouseMoveAction.None;
                    changeWindowState();
                }
                else
                {
                    if(InDesign)
                        return;

                    if(HeadingTitle != null && ev.target == HeadingTitle)
                    {
                        SetCursor("default");
                        MoveAction = MouseMoveAction.Move;
                    }
                    else
                    {
                        if(AllowSizeChange)
                        {
                            if(X <= ResizeCorners && Y <= ResizeCorners)
                            {
                                SetCursor("nwse-resize");
                                MoveAction = MouseMoveAction.TopLeftResize;
                            }
                            else if(Y <= ResizeCorners && X >= width - ResizeCorners)
                            {
                                SetCursor("nesw-resize");
                                MoveAction = MouseMoveAction.TopRightResize;
                            }
                            else if(Y <= ResizeCorners)
                            {
                                SetCursor("n-resize");
                                MoveAction = MouseMoveAction.TopResize;
                            }
                            else if(X <= ResizeCorners && Y >= height - ResizeCorners)
                            {
                                SetCursor("nesw-resize");
                                MoveAction = MouseMoveAction.BottomLeftResize;
                            }
                            else if(Y >= height - ResizeCorners && X >= width - ResizeCorners)
                            {
                                SetCursor("nwse-resize");
                                MoveAction = MouseMoveAction.BottomRightResize;
                            }
                            else if(Y >= height - ResizeCorners)
                            {
                                SetCursor("s-resize");
                                MoveAction = MouseMoveAction.BottomResize;
                            }
                            else if(X <= ResizeCorners)
                            {
                                SetCursor("w-resize");
                                MoveAction = MouseMoveAction.LeftResize;
                            }
                            else if(X >= width - ResizeCorners)
                            {
                                SetCursor("e-resize");
                                MoveAction = MouseMoveAction.RightResize;
                            }
                            else
                            {
                                SetCursor("default");
                                MoveAction = MouseMoveAction.Move;
                            }
                        }
                    }
                }

                if(!AllowMoveChange && MoveAction == MouseMoveAction.Move)
                {
                    SetCursor("default");
                    MoveAction = MouseMoveAction.None;
                }
            });

            Heading.addEventListener("dblclick", (ev) =>
            {
                if(AllowSizeChange)
                {
                    changeWindowState();
                }

                ev.preventDefault();
                ev.stopPropagation();
            });

            Content.addEventListener("mouseleave", (ev) =>
            {
                if(MovingForm == null)
                {
                    SetCursor("default");
                }
            });

            Body.addEventListener("mouseenter", (ev) =>
            {
                SetCursor("default");
            });

            Content.addEventListener("mousemove", (ev) =>
            {
                if(InExternalMouseEvent)
                    return;

                if(ev.target == HeadingTitle)
                    return;
                var mev = ev.As<MouseEvent>();

                var width = Content.clientWidth;
                var height = Content.clientHeight;
                var X = mev.pageX - Content.offsetLeft;
                var Y = mev.pageY - Content.offsetTop;

                if(MovingForm != null && MoveAction == MouseMoveAction.Move)
                {
                    SetCursor("default");
                    return;
                }
                else if(windowState == WindowStateType.Maximized)
                {
                    SetCursor("default");
                    return;
                }
                if(InDesign)
                    return;

                if(AllowSizeChange)
                {
                    if(MoveAction == MouseMoveAction.TopLeftResize || X <= ResizeCorners && Y <= ResizeCorners)
                    {
                        SetCursor("nwse-resize");
                    }
                    else if(MoveAction == MouseMoveAction.TopRightResize || Y <= ResizeCorners && X >= width - ResizeCorners)
                    {
                        SetCursor("nesw-resize");
                    }
                    else if(Y <= ResizeCorners || MoveAction == MouseMoveAction.TopResize)
                    {
                        SetCursor("n-resize");
                    }
                    else if(MoveAction == MouseMoveAction.BottomLeftResize || X <= ResizeCorners && Y >= height - ResizeCorners)
                    {
                        SetCursor("nesw-resize");
                    }
                    else if(MoveAction == MouseMoveAction.BottomRightResize || Y >= height - ResizeCorners && X >= width - ResizeCorners)
                    {
                        SetCursor("nwse-resize");
                    }
                    else if(MoveAction == MouseMoveAction.BottomResize || Y >= height - ResizeCorners)
                    {
                        SetCursor("s-resize");
                    }
                    else if(MoveAction == MouseMoveAction.LeftResize || X <= ResizeCorners)
                    {
                        SetCursor("w-resize");
                    }
                    else if(MoveAction == MouseMoveAction.RightResize || X >= width - ResizeCorners)
                    {
                        SetCursor("e-resize");
                    }
                    else
                    {
                        SetCursor("default");
                    }
                }
                else
                {
                    SetCursor("default");
                }
            });

            Heading.addEventListener("mousedown", (ev) =>
            {
                SetBodyOverLay();
                if(!IsActiveFormCollection())
                    return;

                if(windowState == WindowStateType.Maximized)
                {
                    MovingForm = this;
                    SetCursor("default");

                    MoveAction = MouseMoveAction.Move;
                }
                else
                {
                    MovingForm = this;
                }

                ActiveForm = this;
            });

            Body.addEventListener("mousedown", (ev) =>
            {
                if(InExternalMouseEvent)
                    return;
                if(!IsActiveFormCollection())
                    return;

                ActiveForm = this;
                MovingForm = null;
                ev.stopPropagation();
            });

            Body.addEventListener("mousemove", (ev) =>
            {
                if(InExternalMouseEvent)
                    return;

                if(MovingForm == null)
                {
                    if(!IsActiveFormCollection())
                        return;
                    ev.stopPropagation();
                }
            });

            BodyOverLay.addEventListener("mousedown", (ev) =>
            {
                if(InDesign)
                {
                    BodyOverLay.style.visibility = "collapse";
                    return;
                }
                if(!IsActiveFormCollection())
                    return;
                BodyOverLay.style.visibility = "collapse";
                ActiveForm = this;
            });

            Body.addEventListener("mouseleave", (ev) =>
            {
                if(InDesign)
                {
                    BodyOverLay.style.visibility = "collapse";
                    return;
                }

                if(MovingForm == null)
                {
                    SetBodyOverLay();
                }
            });

            BodyOverLay.addEventListener("mouseenter", (ev) =>
            {
                if(InDesign)
                {
                    BodyOverLay.style.visibility = "collapse";
                    return;
                }
                if(MovingForm == null && IsActiveFormCollection()) // WindowHolderSelectionBox == null &&
                {
                    SetCursor("default");
                    BodyOverLay.style.visibility = "collapse";
                }
                else
                {
                    BodyOverLay.style.visibility = "visible";
                }
            });

            Content.style.width = Window_DefaultWidth.ToPx();
            Content.style.height = Window_DefaultHeight.ToPx();            

            Content.AppendChild(Heading);
            Content.AppendChild(Body);
            Content.AppendChild(BodyOverLay);

            Heading.AppendChild(HeadingTitle);

            closeAction = () =>
            {
                Content.Empty();
                if(Content != null)
                {
                    Content.Delete(); Content = null;
                }
            };

            Initialise();
        }

        public int TitleBarHeight()
        {
            return (int)Heading.clientHeight;
        }

        public int TitleBarWidth()
        {
            return (int)Heading.clientWidth;
        }

        public int ClientX()
        {
            return (int)Body.clientLeft;
        }

        public int ClientY()
        {
            return (int)Body.clientTop;
        }

        public string Text
        {
            get { return HeadingTitle.innerHTML; }
            set { HeadingTitle.innerHTML = value; }
        }

        public string BackColor
        {
            get {                
                return Body.style.backgroundColor;
            }
            set {
                Body.style.backgroundColor = value;
            }
        }

        public string ForeColor
        {
            get { return Body.style.color; }
            set { Body.style.color = value; }
        }

        public List<DialogResult> DialogResults = new List<DialogResult>();

        public FormCollection GetFormCollectionFromForm(Form form)
        {
            if(form._seperateInstance)
            {
                var visibleForms = standAloneForms.VisibleForms;
                for(int x = 0; x < visibleForms.Count; x++)
                {
                    if(visibleForms[x] == this)
                        return standAloneForms;
                }
            }
            else
            {
                for(int i = 0; i < FormCollections.Count; i++)
                {
                    if(this == FormCollections[i].FormOwner)
                        return FormCollections[i];
                    var visibleForms = FormCollections[i].VisibleForms;
                    for(int x = 0; x < visibleForms.Count; x++)
                    {
                        if(visibleForms[x] == this)
                            return FormCollections[i];
                    }
                }
            }

            return null;
        }

        public bool IsActiveFormCollection()
        {
            if(this._seperateInstance)
            {
                return GetFormCollectionFromForm(this) == standAloneForms;
            }
            else
            {
                return GetFormCollectionFromForm(this) == GetActiveFormCollection();
            }
        }

        public bool IsVisible()
        {
            return GetFormCollectionFromForm(this) != null;
        }

        public void ShowStartNewLevel()
        {
            if(!HasSetup)
                Setup();

            if(IsVisible())
            {
                // Already Open???
                throw new Exception("Invalid request to open form as a dialog that is already visible!");
            }

            FormCollections.Add(new FormCollection(this));
            WindowHolder.AppendChild(this);

            CalculateZOrder();

            if(StartPosition == FormStartPosition.Center)
            {
                CentreForm();
            }

            OnShowed();

            Resizing();

            ActiveForm = this;

            Body.FocusElement();
        }

        public void ShowDialog(params DialogResult[] dialogResults)
        {
            if(!HasSetup)
                Setup();

            InDialogResult = false;

            if(ButtonMinimize != null)
                ButtonMinimize.Delete();
            if(ButtonExpand != null)
                ButtonExpand.Delete();
            if(ButtonClose != null)
                ButtonClose.Delete();

            _IsDialog = true;
            if(StartPosition != FormStartPosition.Manual)
            {
                if(!Helper.NotDesktop)
                    StartPosition = FormStartPosition.Center;
            }
            ShowStartNewLevel();

            if(dialogResults != null && dialogResults.Length > 0)
            {
                DialogResults.AddRange(dialogResults);
            }
        }

        private float MinZero(float input)
        {
            return input < 0 ? 0 : input;
        }

        private int MinZero(int input)
        {
            return input < 0 ? 0 : input;
        }

        public void CentreForm()
        {
            if(WindowHolder == null)
                return;

            Content.style.left = MinZero((float)(WindowHolder.clientWidth / 2) - (Script.ParseInt(this.Width.ToHtmlValue()) / 2)).ToPx();
            Content.style.top = MinZero((float)(WindowHolder.clientHeight / 2) - (Script.ParseInt(this.Height.ToHtmlValue()) / 2)).ToPx();            
        }

        public override void Render()
        {
            if(!HasRendered)
            {
                base.Render();
                OnShowing();                
                Shown();
            }
        }

        public void Shown()
        {
            InClose = false;
            if(Children == null)
                return;
            for(int i = 0; i < Children.Count; i++)
            {
                if(Children[i] != null &&
                    Children[i].OnLoaded != null)
                {
                    Children[i].OnLoaded(Children[i]);
                }
            }
            Children.Remove(null);            
        }

        protected bool _seperateInstance = false;

        public void Show(bool seperateInstance = false)
        {
            if(!HasSetup)
                Setup();

            if(_IsDialog)
                return;
            _seperateInstance = seperateInstance;
            if(!seperateInstance && (FormCollections == null || FormCollections.Count == 0))
            {
                ShowStartNewLevel();
                return;
            }

            var activeCollect = !seperateInstance ? GetActiveFormCollection() : standAloneForms;
            var visbileForms = activeCollect.VisibleForms;

            if(!visbileForms.Contains(this))
            {
                visbileForms.Add(this);
                WindowHolder.AppendChild(this);

                Content.style.visibility = "visible";

                CalculateZOrder();

                if(StartPosition != FormStartPosition.Manual && windowState == WindowStateType.Normal)
                {
                    if(StartPosition == FormStartPosition.Center || (activeCollect == null || visbileForms == null || visbileForms.Count == 0 || visbileForms[visbileForms.Count - 1].windowState != WindowStateType.Normal || visbileForms[visbileForms.Count - 1].Content == null))
                    {
                        CentreForm();
                    }
                    else if(StartPosition == FormStartPosition.WindowsDefaultLocation)
                    {
                        var obj = visbileForms[visbileForms.Count - 1];

                        object x = Script.ParseInt(obj.Left.ToHtmlValue());
                        object y = Script.ParseInt(obj.Top.ToHtmlValue());

                        if(Script.IsNaN(x))
                        {
                            x = 0;
                        }
                        if(Script.IsNaN(y))
                        {
                            y = 0;
                        }

                        var rec = (DOMRect)WindowHolder.getBoundingClientRect();

                        double pw25 = rec.width * 0.15;
                        double ph25 = rec.height * 0.15;

                        double pw75 = rec.width * 0.55;
                        double ph75 = rec.height * 0.55;

                        if((int)x < pw25)
                            x = (int)pw25;
                        if((int)y < ph25)
                            y = (int)ph25;

                        if((int)x > pw75)
                            x = (int)pw25;
                        if((int)y > ph75)
                            y = (int)ph25;
                        x = (int)x + 10;
                        y = (int)y + 10;

                        this.Content.style.left = MinZero((int)x).ToPx();
                        this.Content.style.top = MinZero((int)x).ToPx();                        
                    }
                }
                
                OnShowed();

                Resizing();
            }

            ActiveForm = this;
            
            if(Helper.NotDesktop)
            {
                setTimeout((a) => {
                    this.Content.focus();
                    this.Content.click();                    
                }, 0);               
            }
        }

        public void BringToFront()
        {
            var activeCollect = GetActiveFormCollection();
            if(activeCollect != null)
            {
                if(activeCollect.FormOwner == this)
                    return;
                var visibleForms = activeCollect.VisibleForms;
                if(visibleForms != null && visibleForms.Count > 1)
                {
                    visibleForms.Remove(this);
                    visibleForms.Add(this);
                }

                CalculateZOrder();
            }
        }

        public void SetZIndex(ref int zIndex)
        {
            this.Content.style.zIndex = (zIndex++).ToString();
        }

        private static void ClearZIndex()
        {
            var x = GetActiveFormCollection().FormOwner;
            WindowHolder.style.zIndex = "-" + WindowHolder.childElementCount;
            bool Found = false;

            for(uint i = 0; i < WindowHolder.childElementCount; i++)
            {
                if(Found || x.Content == WindowHolder.children[i])
                {
                    WindowHolder.children[i].As<HTMLElement>().style.zIndex = "";
                    Found = true;
                }
                else
                {
                    WindowHolder.children[i].As<HTMLElement>().style.zIndex = (i - WindowHolder.childElementCount - 1).ToString();
                }
            }
        }

        private static void ApplyZIndex()
        {
            WindowHolder.style.zIndex = "";
            for(uint i = 0; i < WindowHolder.childElementCount; i++)
            {
                WindowHolder.children[i].As<HTMLElement>().style.zIndex = i.ToString();
            }
        }

        private static int CalculateZOrder(FormCollection formCollection, int zIndex) // , DocumentFragment frag
        {
            List<Form> TopMostForms = new List<Form>();

            var VisibleForms = formCollection.VisibleForms;
            if(VisibleForms != null)
            {
                for(int i = 0; i < VisibleForms.Count; i++)
                {
                    if(VisibleForms[i].Content == null)
                    {
                        ToClean.Add(VisibleForms[i]);
                    }
                    else
                    {
                        if(VisibleForms[i].TopMost)
                            TopMostForms.Add(VisibleForms[i]);
                    }
                }
                for(int i = 0; i < ToClean.Count; i++)
                {
                    if(VisibleForms.Contains(ToClean[i]))
                    {
                        VisibleForms.Remove(ToClean[i]);
                        ToClean[i] = null;
                    }
                }

                ToClean.Remove(null);

                if(formCollection.FormOwner != null)
                {
                    formCollection.FormOwner.ManagePlaceHolders();
                    formCollection.FormOwner.Style.zIndex = zIndex.ToString();
                    zIndex++;
                    //frag.AppendChild(formCollection.FormOwner);

                    //if(Helper.NotDesktop)
                    //{
                    //    if(VisibleForms.Count == 0)
                    //    {
                    //        formCollection.FormOwner.ManagePlaceHolders();
                    //        frag.AppendChild(formCollection.FormOwner);
                    //        return zIndex;
                    //    }
                    //}
                    //else
                    //{
                    //    formCollection.FormOwner.ManagePlaceHolders();
                    //    frag.AppendChild(formCollection.FormOwner);
                    //}
                }

                for(int i = 0; i < TopMostForms.Count; i++)
                {
                    var form = TopMostForms[i];
                    VisibleForms.Remove(form);
                    VisibleForms.Add(form);
                }
                int length = VisibleForms.Count;
                for(int i = 0; i < length; i++)
                {
                    if(VisibleForms[i] != null &&
                        VisibleForms[i].Content != null)
                    {
                        VisibleForms[i].ManagePlaceHolders();
                        VisibleForms[i].Style.zIndex = zIndex.ToString();
                        zIndex++;
                        //frag.AppendChild(VisibleForms[i]);

                        //if(Helper.NotDesktop)
                        //{
                        //    if(length - 1 == i)
                        //    {
                        //        VisibleForms[i].ManagePlaceHolders();
                        //        frag.AppendChild(VisibleForms[i]);
                        //        return zIndex;
                        //    }
                        //}else
                        //{
                        //    VisibleForms[i].ManagePlaceHolders();
                        //    frag.AppendChild(VisibleForms[i]);
                        //}
                    }
                }
            }

            return zIndex;
        }

        protected override HTMLElement GetControlBase()
        {
            return this.Body;
        }


        protected void ManagePlaceHolders()
        {
            if(!Settings.RemoveAttributesOffElementsWhenLoseFocus)
                return;

            bool shouldHidePlaceholders = ActiveForm != this;

            if(shouldHidePlaceholders != HasRemovedPlaceHolder)
            {
                HasRemovedPlaceHolder = shouldHidePlaceholders;
                var que = new Queue<HTMLElement>();
                que.Enqueue(Body);

                while(que.Count > 0)
                {
                    var element = que.Dequeue();
                    if(shouldHidePlaceholders)
                    {
                        var a = element.getAttribute("placeholder");
                        if(!string.IsNullOrWhiteSpace(a))
                        {
                            element.removeAttribute("placeholder");
                            element.setAttribute("data-placeholder", a);
                        }
                    }
                    else
                    {
                        var a = element.getAttribute("data-placeholder");
                        if(!string.IsNullOrWhiteSpace(a))
                        {
                            element.removeAttribute("data-placeholder");
                            element.setAttribute("placeholder", a);
                        }
                    }
                    int length = (int)element.childElementCount;
                    if(length > 0)
                    {
                        for(uint i = 0; i < length; i++)
                        {
                            que.Enqueue(element.children[i].As<HTMLElement>());
                        }
                    }
                }
            }
        }

        public static void CalculateZOrder()
        {
            GetActiveFormCollection();

            if(FormCollections == null && standAloneForms.VisibleForms.Count == 0)
                return;
            FormCollections.Remove(null);
            var count = FormCollections.Count;
            int zIndex = 1;

            //var frag = Document.CreateDocumentFragment();

            FormOverLay.style.opacity = count == 0 ? "" : count == 1 ? "0" : "0.4";

            for(int x = 0; x < count; x++)
            {
                //if(Helper.NotDesktop)
                //{
                //    if(x == count - 1)
                //    {
                //        frag.AppendChild(FormOverLay);
                //        zIndex = CalculateZOrder(FormCollections[x], zIndex, frag);
                //    }
                //}
                //else
                //{
                //}
                if(x == count - 1)
                {
                    //frag.AppendChild(FormOverLay);
                    FormOverLay.style.zIndex = zIndex.ToString();
                    zIndex++;
                }
                zIndex = CalculateZOrder(FormCollections[x], zIndex); // frag
            }
            zIndex = CalculateZOrder(standAloneForms, zIndex); // frag

            //WindowHolder.Empty();
            //WindowHolder.AppendChild(frag);

            if(ActiveForm != null)
            {
                ActiveForm.Body.focus();
            }
        }

        public static List<Form> ToClean = new List<Form>();
        private Action closeAction;
        protected bool InClose = false;

        public void Close()
        {
            if(_IsDialog && InDialogResult)
                return;

            InClose = true;

            OnClosing();

            ToClean.Add(this);

            var ownerFormCollection = GetFormCollectionFromForm(this);

            if(ownerFormCollection != null)
            {
                if(ownerFormCollection.FormOwner == this)
                {
                    ownerFormCollection.FormOwner = null;
                    for(int i = 0; i < ownerFormCollection.VisibleForms.Count; i++)
                    {
                        if(ownerFormCollection.VisibleForms[i] == this)
                            continue;
                        ownerFormCollection.VisibleForms[i].Close();
                    }
                    if(FormCollections.Count == 1)
                    {
                        FormCollections = new List<FormCollection>();
                    }
                }
                else
                {
                    ownerFormCollection.VisibleForms.Remove(this);
                }
            }

            if(Content != null)
            {
                if(!ForReuse)
                {
                    if(Settings.FormFadeDuration > 0)
                    {             
                                   
                        //Self.fadeOut(Settings.FormFadeDuration, closeAction);
                    }
                    else
                    {
                        closeAction();
                    }
                    closeAction();
                }
                else
                {
                    Content.style.visibility = "collapse";
                }
            }

            CalculateZOrder();

            ActiveForm = _PrevActiveForm;
            if(_IsDialog)
            {
                InDialogResult = true;
                if(DialogResult != DialogResultEnum.None &&
                DialogResults != null && DialogResults.Count > 0)
                {
                    for(int i = 0; i < DialogResults.Count; i++)
                    {
                        DialogResults[i].InvokeIfResult(DialogResult);
                    }
                }
            }

            if(OnFormClosed != null)
                OnFormClosed();
            OnClosed();

            if(WindowState == WindowStateType.Minimized)
            {
                MinimizedForms.Remove(this);
                CalculateMinmizedFormsLocation();
            }

            InClose = false;
        }

        private bool InDialogResult = false;
    }
}