using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;
using Bridge.jQuery2;

namespace ExpressCraft
{

	public class Form : Control
	{
		public static HTMLDivElement WindowHolder { get; set; }
		public static HTMLDivElement WindowManager { get; set; }
		public static HTMLDivElement WindowManagerStart { get; set; }
		public static TextInput WindowManagerSearch { get; set; }
				
		private static ToolTip _activeToolTip;
		private static int _toolTipTimerHandle = -1;
		private static Action<MouseEvent> _activeToolTipMouseMove;
		private static ToolTipControl _activeToolTipControl = null;
		private static int _oepntoolTipTimerHandle = -1;
		public static ToolTip ActiveToolTip
		{
			get { return _activeToolTip; }
			set {
				if(_activeToolTip != value)
				{
					if(value != null && value.AttachedControl != null && value.AttachedControl.Content != null)
					{
						if(_activeToolTipMouseMove != null)
						{
							value.AttachedControl.Content.RemoveEventListener(EventType.MouseMove, _activeToolTipMouseMove);
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
						Global.ClearTimeout(_toolTipTimerHandle);
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
								Global.ClearTimeout(_toolTipTimerHandle);								
							}
							_toolTipTimerHandle = Global.SetTimeout(() =>
							{
								if(_activeToolTipControl != null)
								{
									_activeToolTipControl.Close();
									_activeToolTipControl = null;
								}
								if(_oepntoolTipTimerHandle > -1)
								{
									Global.ClearTimeout(_oepntoolTipTimerHandle);
									_oepntoolTipTimerHandle = -1;
								}
								_activeToolTipControl = new ToolTipControl(_activeToolTip);
								_activeToolTipControl.Show(ev);

								_oepntoolTipTimerHandle = Global.SetTimeout(() =>
								{
									if(_activeToolTipControl != null)
									{
										_activeToolTipControl.Close();
										_activeToolTipControl = null;
									}
								}, Math.Max(1000, messageLength * Math.Max(Settings.ToolTipPopupStayOpenDelayPerWordMs, 10)));						

								if(_activeToolTipMouseMove != null)
								{
									value.AttachedControl.Content.RemoveEventListener(EventType.MouseMove, _activeToolTipMouseMove);
									_activeToolTipMouseMove = null;
								}
							}, Math.Max(1, Settings.ToolTipPopupDelayMs));
						};
						value.AttachedControl.Content.AddEventListener(EventType.MouseMove, _activeToolTipMouseMove);
					}
				}
			}
		}
		
		public bool InDesign = false;

		public static int ResizeCorners { get; set; } = 2;
		public static Form MovingForm = null;
		public static HTMLElement Parent = null;
		public static bool Mouse_Down { get; set; } = false;		
        public static HTMLElement FormOverLay;		

		private static HTMLStyleElement WindowCursorManager = null;
		private static bool _hasSetup = false;

		public bool HasSetup { get { return _hasSetup; } }

		public bool AllowSizeChange = true;
		public bool AllowMoveChange = true;

		public HTMLCollection Controls => Body.Children;

		public static bool InExternalMouseEvent = false;
		
		public bool ShowMinimize
		{
			get { return ButtonMinimize != null; }
			set {
				ChangeHeadingButton(FormButtonType.Minimize, value);								
			}
		}

		public CSSStyleDeclaration BodyStyle => Body.Style;

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
			get { return ButtonClose != null; }
			set
			{
				ChangeHeadingButton(FormButtonType.Maximize, value);
			}
		}
		
		public bool ForReuse = false;

        protected static bool InErrorDialog = false;

        public jQuery Self;

        protected bool _IsDialog = false;

        public bool IsDialog()
        {
            return _IsDialog;
        }

		private List<Control> Children = new List<Control>();

		public void LinkchildToForm(Control child)
		{
			if(child == null)
				return;
			Children.Add(child);
			child.LinkedForm = this;
		}

		public void LinkchildrenToForm(params Control[] children)
		{
			if(children == null || children.Length == 0)
				return;
			Children.AddRange(children);
			for(int i = 0; i < children.Length; i++)
			{
				children[i].LinkedForm = this;
			}
		}

		public Form AppendChild(Control node)
		{
			this.Body.AppendChild(node);

			return this;
		}

		public Form AppendChildren(params Control[] node)
		{
			this.Body.AppendChildren(node);

			return this;
		}

		public Form AppendChild(HTMLElement node)
		{
			this.Body.AppendChild(node);

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

		public static bool ShowBodyOverLay { get; set; } = false;

		public static int Window_DefaultHeight { get; set; } = 480;
		public static int Window_DefaultWidth { get; set; } = 640;

		private static Form _ActiveForm;
		private static Form _PrevActiveForm;
		private static MouseMoveAction MoveAction = MouseMoveAction.Move;
        
		public bool TopMost = false;

        public DialogResultEnum DialogResult = DialogResultEnum.None;

		public static int WindowHolderSelectionBoxX;
		public static int WindowHolderSelectionBoxY;

		public static int WindowHolderSelectionBoxXOff;
		public static int WindowHolderSelectionBoxYOff;
		
		protected HTMLDivElement Heading { get; set; }
		protected HTMLDivElement ButtonClose { get; set; }
		protected HTMLDivElement ButtonExpand { get; set; }
		protected HTMLDivElement ButtonMinimize { get; set; }
		protected HTMLSpanElement HeadingTitle { get; set; }

		public HTMLDivElement Body { get; set; }
		public HTMLDivElement BodyOverLay { get; set; }
		public HTMLElement Owner { get; set; } = null;

		public float prev_px;
		public float prev_py;

		private int prev_width;
		private int prev_height;

		private int prev_top;
		private int prev_left;

		public int MinWidth { get; set; } = 200;
		public int MinHeight { get; set; } = 50;

		public void ResizeChildren(HTMLElement parent)
		{
			if(OnResize != null)
				OnResize(this);
			OnResizing();

			for(int x = 0; x < parent.Children.Length; x++)
			{
				if(!parent.Children[x].ClassList.Contains("control"))
					continue;
				for(int i = 0; i < Children.Count; i++)
				{
					if(Children[i] != null && Children[i].OnResize != null)
					{
						if(Children[i].Content == parent.Children[x])
						{
							Children[i].OnResize(Children[i]);
							break;						
						}
					}
				}
				ResizeChildren(parent.Children[x]);
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
		
		private WindowState windowState;

		public WindowState Windowstate
		{
			get { return windowState; }
			set { SetWindowState(value); }
		}


		public static bool MidleOfAction()
		{
			return  MovingForm != null; // WindowHolderSelectionBox != null ||
		}

		public bool IsContentVisible()
		{
			return Content != null && Content.Style.Visibility == Visibility.Visible;
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
				default:
					break;
			}
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

        public static FormCollection GetActiveFormCollection()
        {
            for (int i = FormCollections.Count - 1; i >= 0; i--)
            {
                var frmCol = FormCollections[i];
                if (frmCol.FormOwner == null)
                {
                    for (int x = 0; x < frmCol.VisibleForms.Count; x++)
                    {
                        if (frmCol.VisibleForms[x] != null)
                        {
                            frmCol.VisibleForms[x].Close();
                        }
                    }
                    FormCollections.RemoveAt(i);
                }else
                {
                    return frmCol;
                }
            }
            
            return null;
        }

		public static void SetBodyOverLay()
		{
            var ActiveCollection = GetActiveFormCollection();
            if (ActiveCollection == null)
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
            if (BodyOverLay != null &&
                BodyOverLay.Style.Visibility == Visibility.Collapse)
			{
				if(InDesign)
				{					
					return;
				}
				BodyOverLay.Style.Visibility = Visibility.Visible;
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
								_ActiveForm.BodyOverLay.Style.Visibility = Visibility.Collapse;
								return;
							}
							_ActiveForm.BodyOverLay.Style.Visibility = Visibility.Visible;							
						}
					}
					_ActiveForm = value;
					if(_ActiveForm != null)
					{
						_ActiveForm.OnGotFocus();
						if(_ActiveForm.Content != null)
						{
							_ActiveForm.BodyOverLay.Style.Visibility = Visibility.Collapse;							
							_ActiveForm.BringToFront();
						}

						if(GetActiveFormCollection() != null && GetActiveFormCollection().FormOwner != null &&  _ActiveForm == GetActiveFormCollection().FormOwner)
						{
							ClearZIndex();
						}
						else
						{
							ApplyZIndex();
						}
					}
				}

			}
		}
		
		public static void ChangeStateTextSelection(HTMLElement element, bool state)
		{
			if(state)
			{
				jQuery.Select(element).Css("user-select", "text");
			}
			else
			{
				jQuery.Select(element).Css("user-select", "none");
			}
		}

		public static void DisableStateDrag(HTMLElement element)
		{
			if(element is HTMLImageElement)
			{
				element.As<HTMLImageElement>().OnDragStart = (ev) =>
				{
					ev.PreventDefault();
				};
			}
			else
			{
				jQuery.Select(element).Css("user-drag:", "none");
			}
		}		

		public static void SetupHideElementsOnView()
		{
			Window.OnBlur = (ev) =>
			{
				if(Document.Body.ChildNodes.Contains(WindowHolder))
					Document.Body.RemoveChild(WindowHolder);
			};

			Window.OnFocus = (ev) =>
			{
				if(!Document.Body.ChildNodes.Contains(WindowHolder))
					Document.Body.AppendChild(WindowHolder);
			};
		}

		public static void SetupWindowManager()
		{
			if(Parent == null || WindowHolder == null)
				return;

			if(Settings.WindowManagerVisible)
			{
				WindowHolder.Style.Height = "calc(100% - 40px)";
				if(!Parent.Children.Contains(WindowManager))
					Parent.AppendChild(WindowManager);
			}
			else
			{
				WindowHolder.Style.Height = "100%";
				if(Parent.Children.Contains(WindowManager))
					Parent.RemoveChild(WindowManager);
			}			
		}


		public static void Setup(HTMLElement parent = null)
		{
			//Settings.Setup();
			if(_hasSetup)
				return;
			_hasSetup = true;			
			
			if (parent == null)
				Parent = Document.Body;
			else
				Parent = parent;

			WindowCursorManager = new HTMLStyleElement();
			
			WindowHolder = Div("form-container");
			WindowManager = Div("form-manager");
			WindowManagerStart = Div("form-manager-start");

			WindowManagerSearch = new TextInput();
			WindowManagerSearch.ClassList.Add("form-manager-search");

            FormOverLay = Div("system-form-collection-overlay");			
			FormOverLay.OnMouseDown = (ev) =>
			{
				if(Document.ActiveElement != null)
				{
					Document.ActiveElement.Focus();
					ev.PreventDefault();
					SetCursor(Cursor.Default);
				}
			};
            FormOverLay.OnClick = (ev) => {                

                if(ActiveForm != null)
                {
                    var form = ActiveForm;
                    form.Heading.ClassList.Add("form-heading-flash");
                    Global.SetTimeout(() =>
                    {
                        form.Heading.ClassList.Remove("form-heading-flash");
                    }, 800);
                }
            };
            FormOverLay.OnContextMenu = (ev) => {
                ev.StopPropagation();
                ev.PreventDefault();
            };
            FormOverLay.Style.Visibility = Visibility.Visible;

			Window.OnKeyUp = (ev) => {
				if(Settings.OnF2ShowThemeForm && ev.KeyCode == KeyCodes.F2)
				{
					ev.PreventDefault();
					ThemeForm.ShowThemeForm();
				}
			};

			Window.OnResize = (ev) => {
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
			};
			Window.OnMouseMove = (ev) =>
			{
				if( InExternalMouseEvent)
					return;

				var mev = ev.As<MouseEvent>();

				if(MovingForm != null)
				{
					ev.PreventDefault();
					ev.StopImmediatePropagation();
					ev.StopPropagation();

					if(MovingForm.BodyOverLay.Style.Visibility == Visibility.Collapse)
					{
						if(MovingForm.InDesign)
						{
							_ActiveForm.BodyOverLay.Style.Visibility = Visibility.Collapse;
						}
						else
						{
							MovingForm.BodyOverLay.Style.Visibility = Visibility.Visible;
						}						
						
						MovingForm.Heading.Focus();
					}

					var mousePos = Helper.GetClientMouseLocation(ev);
                    
                    float mX;
                    float mY;

                    var newX = ((mX = mousePos.Xf) + MovingForm.prev_px);
                    var newY = ((mY = mousePos.Yf) + MovingForm.prev_py);					

					if(MovingForm.windowState == WindowState.Maximized &&
                        MoveAction == MouseMoveAction.Move)
					{
						MovingForm.changeWindowState();
						newX = mousePos.Xf - (MovingForm.prev_width / 2);
						MovingForm.prev_px = newX - mousePos.Xf;
					}
                    
					float x = (float)Global.ParseFloat(MovingForm.Style.Left);
					float y = (float)Global.ParseFloat(MovingForm.Style.Top);
					float w =(float)Global.ParseFloat(MovingForm.Style.Width);
					float h = (float)Global.ParseFloat(MovingForm.Style.Height);

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
                    if (px != x)
                        MovingForm.Style.Left = Script.Write<string>("x + 'px'");
                    if (py != y)
                        MovingForm.Style.Top = Script.Write<string>("y + 'px'");
                    if (pw != w && (changed = true))
                        MovingForm.Style.Width = Script.Write<string>("w + 'px'");
                    if (ph != h && (changed = true))
                        MovingForm.Style.Height = Script.Write<string>("h + 'px'");

                    if (changed)                    
                        MovingForm.Resizing();                    
				}
			};

			Window.OnMouseUp = (ev) =>
			{
				InExternalMouseEvent = false;
				if(MovingForm != null)
				{
					MovingForm.BodyOverLay.Style.Visibility = Visibility.Collapse;				
				}

				MovingForm = null;
				Mouse_Down = false;
				MoveAction = MouseMoveAction.Move;
				SetCursor(Cursor.Default);
				

			};
            Window.OnBeforeUnload = (ev) =>
            {
				if(!Settings.AllowCloseWithoutQuestion)
				{
					Script.Write("return 'Would you like to close this application?'");
				}
            };
            Window.OnError += new ErrorEventHandler((string message, string url, int lineNumber, int columnNumber, object error) => {				
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
                catch (Exception)
                {
                    
                } finally
                {
                    InErrorDialog = false;
                }
                
                return false;
            });

            WindowHolder.AppendChild(FormOverLay);
			WindowManager.AppendChildren(WindowManagerStart, WindowManagerSearch);

			Parent.AppendChildren(WindowHolder, WindowCursorManager);
			
			SetupWindowManager();			
		}		
		public static void SetCursor(Cursor cursor)
		{			
			WindowCursorManager.InnerHTML = string.Format(@"
				.control{    
					cursor:{0} !important;    
				}", cursor);			
		}

		public void SetWindowState(WindowState State)
		{    
            if(!AllowSizeChange)
				return;
            
			if((windowState = State) == WindowState.Normal)
			{				
				this.SetBounds(prev_left, prev_top, prev_width, prev_height);				
				Resizing();
				Style.BorderWidthString = "1px";
			}
			else if(windowState == WindowState.Maximized)
			{
				prev_left = Left.ToInt();
				prev_top = Top.ToInt();
				prev_width = Width.ToInt();
				prev_height = Height.ToInt();

				Style.BorderWidthString = "0";

				var calc_2px = "100%";

				this.SetBounds(0, 0, calc_2px, calc_2px);				
			}
			Resizing();
		}

		private void changeWindowState()
		{
			if(windowState == WindowState.Maximized)
			{
				SetWindowState(WindowState.Normal);
			}
			else
			{
				SetWindowState(WindowState.Maximized);
			}
		}

		private HTMLDivElement CreateFormButton(FormButtonType Type)
		{
			var butt = Div("form-heading-button");			
			
			switch(Type)
			{
				case FormButtonType.Close:
					butt.ClassList.Add("form-heading-button-close");
					butt.InnerHTML = "X";

					butt.OnMouseDown = (ev) =>
					{
						if(MovingForm != null) //  || WindowHolderSelectionBox != null
							return;
						Mouse_Down = true;

						ev.StopPropagation();
						ev.PreventDefault();

						ActiveForm = this;
					};					

					butt.OnMouseUp = (ev) =>
					{
						if(MovingForm != null) //|| WindowHolderSelectionBox != null
							return;

						ev.StopPropagation();
						ev.PreventDefault();

						if(InDesign)
							return;

						Close();
					};

					butt.OnMouseEnter = (ev) =>
					{
						if(MovingForm != null) //  || WindowHolderSelectionBox != null
							return;

						SetCursor(Cursor.Default);
					};

					butt.OnMouseLeave = (ev) =>
					{
						if(MovingForm != null) //  || WindowHolderSelectionBox != null
							return;					
					};

					break;
				case FormButtonType.Maximize:
					if(ShowMinimize)
					{
						ButtonMinimize.Style.Left = "calc(100% - 137px)";
					}

					butt.Style.Left = "calc(100% - 91px)"; // StyleController.Calc(100, 91);				
					butt.InnerHTML = "&#9633;";
			
					butt.OnMouseUp = (ev) =>
					{
						if(MovingForm != null) //  || WindowHolderSelectionBox != null
							return;

						ev.StopPropagation();
						ev.PreventDefault();

						Mouse_Down = false;
						
						changeWindowState();
					};

					break;
				case FormButtonType.Minimize:
					if(ShowMaximize)
					{
						butt.Style.Left = "calc(100% - 137px)"; // StyleController.Calc(100, 137);
					}
					else
					{
						butt.Style.Left = "calc(100% - 91px)"; // StyleController.Calc(100, 91);				
					}
					
					butt.InnerHTML = "-";

					butt.OnMouseUp = (ev) =>
					{
						if(MovingForm != null) // || WindowHolderSelectionBox != null
							return;

						ev.StopPropagation();
						ev.PreventDefault();

						Mouse_Down = false;						

						windowState = WindowState.Minimized;
					};

					break;
				case FormButtonType.Restore:
					break;
				case FormButtonType.Help:
					break;
				default:
					butt.OnMouseUp = (ev) =>
					{
						if(MovingForm != null) //  || WindowHolderSelectionBox != null
							return;

						ev.StopPropagation();
						ev.PreventDefault();

						Mouse_Down = false;
					};
					break;
			}

			butt.OnDblClick = (ev) => {
				ev.StopPropagation();
			};

			butt.OnMouseMove = (ev) =>
			{
				if(MovingForm != null) //  || WindowHolderSelectionBox != null
					return;

				ev.StopImmediatePropagation();
				ev.PreventDefault();
			};

			if(Type != FormButtonType.Close)
			{
				butt.OnMouseDown = (ev) =>
				{
					if(MovingForm != null) // || WindowHolderSelectionBox != null
						return;

					Mouse_Down = true;

					ev.StopPropagation();
					ev.PreventDefault();
				
					ActiveForm = this;
				};
			}

			return butt;
		}
        
		public Form(string font = Settings.Font) : base("form-base")
		{
			if(!string.IsNullOrWhiteSpace(font))
				Style.Font = font;			
			Heading = Div("form-heading");
			Heading.Style.Font = font;
			
			Heading.OnContextMenu = (ev) => {
                ev.StopPropagation();
                ev.PreventDefault();
            };
			
			HeadingTitle = Span("form-heading-title");		
				
			Body = Div("form-body");

			Body.OnContextMenu = (ev) => {
				if(ev.Target == Body)
				{
					ev.StopPropagation();
					ev.PreventDefault();
				}
			};

			BackColor = "#F0F0F0";

            BodyOverLay = Div("form-body-overlay");

			BodyOverLay.Style.Opacity = ShowBodyOverLay ? "0.5" : "0";

			ChangeHeadingButton(FormButtonType.Close);
			ChangeHeadingButton(FormButtonType.Maximize);
			ChangeHeadingButton(FormButtonType.Minimize);			

			BodyOverLay.Style.Visibility = Visibility.Collapse;

            Self = jQuery.Select(Content);
			
            Content.AddEventListener(EventType.MouseDown, (ev) => {			
				if(InExternalMouseEvent)
					return;
				var mev = ev.As<MouseEvent>();

				mev.StopPropagation();
				mev.StopImmediatePropagation();

				if (!IsActiveFormCollection())
                    return;
				
				Mouse_Down = true;
				
				MovingForm = this;
				ActiveForm = this;
				
				SetBodyOverLay();

				var clientRec = this.Content.GetBoundingClientRect();

				var mousePos = Helper.GetClientMouseLocation(ev);

				prev_px = (float)clientRec.Left - mousePos.Xf;
				prev_py = (float)clientRec.Top - mousePos.Yf;
				
				var width = (float)clientRec.Width;
				var height = (float)clientRec.Height;				

				float X = mousePos.Xf - (float)clientRec.Left;
				float Y = mousePos.Yf - (float)clientRec.Top;

				if(windowState == WindowState.Maximized)
				{
					SetCursor(Cursor.Default);
					MoveAction = MouseMoveAction.Move;                    
				}else
				{
					if(InDesign)
						return;

					if(HeadingTitle != null && ev.Target == HeadingTitle)
					{
						SetCursor(Cursor.Default);						
						MoveAction = MouseMoveAction.Move;						
					}else
					{
						if(AllowSizeChange)
						{
							if(X <= ResizeCorners && Y <= ResizeCorners)
							{
								SetCursor(Cursor.NorthWestSouthEastResize);
								MoveAction = MouseMoveAction.TopLeftResize;
							}
							else if(Y <= ResizeCorners && X >= width - ResizeCorners)
							{
								SetCursor(Cursor.NorthEastSouthWestResize);
								MoveAction = MouseMoveAction.TopRightResize;
							}
							else if(Y <= ResizeCorners)
							{
								SetCursor(Cursor.NorthResize);
								MoveAction = MouseMoveAction.TopResize;
							}
							else if(X <= ResizeCorners && Y >= height - ResizeCorners)
							{
								SetCursor(Cursor.NorthEastSouthWestResize);
								MoveAction = MouseMoveAction.BottomLeftResize;
							}
							else if(Y >= height - ResizeCorners && X >= width - ResizeCorners)
							{
								SetCursor(Cursor.NorthWestSouthEastResize);
								MoveAction = MouseMoveAction.BottomRightResize;
							}
							else if(Y >= height - ResizeCorners)
							{
								SetCursor(Cursor.SouthResize);							
								MoveAction = MouseMoveAction.BottomResize;
							}
							else if(X <= ResizeCorners)
							{
								SetCursor(Cursor.WestResize);
								MoveAction = MouseMoveAction.LeftResize;

							}
							else if(X >= width - ResizeCorners)
							{
								SetCursor(Cursor.EastResize);
								MoveAction = MouseMoveAction.RightResize;
							}
							else
							{
								SetCursor(Cursor.Default);
								MoveAction = MouseMoveAction.Move;
							}
						}												
					}
				}

				if(!AllowMoveChange && MoveAction == MouseMoveAction.Move)
				{
					SetCursor(Cursor.Default);
					MoveAction = MouseMoveAction.None;
				}
			});

			Heading.AddEventListener(EventType.DblClick, (ev) => {				
				if(AllowSizeChange)
                {
                    changeWindowState();
                }				
				ev.PreventDefault();
				ev.StopPropagation();
			});

			Content.AddEventListener(EventType.MouseLeave, (ev) => {
				if(MovingForm == null)
				{
					SetCursor(Cursor.Default);
				}
			});

			Body.AddEventListener(EventType.MouseEnter, (ev) => {
				SetCursor(Cursor.Default);
			});

			Content.AddEventListener(EventType.MouseMove, (ev) => {


				if(InExternalMouseEvent)
					return;
				
				if(ev.Target == HeadingTitle)
					return;
				var mev = ev.As<MouseEvent>();

				var width = Content.ClientWidth;
				var height = Content.ClientHeight;
				int X = mev.PageX - Content.OffsetLeft;
				int Y = mev.PageY - Content.OffsetTop;							

				if(MovingForm != null && MoveAction == MouseMoveAction.Move)
				{
					SetCursor(Cursor.Default);
					return;
				}
				else if(windowState == WindowState.Maximized)
				{
					SetCursor(Cursor.Default);
					return;
				}
				if(InDesign)
					return;

				if(AllowSizeChange)
                {
                    if (MoveAction == MouseMoveAction.TopLeftResize || X <= ResizeCorners && Y <= ResizeCorners)
                    {
                        SetCursor(Cursor.NorthWestSouthEastResize);
                    }
                    else if (MoveAction == MouseMoveAction.TopRightResize || Y <= ResizeCorners && X >= width - ResizeCorners)
                    {
                        SetCursor(Cursor.NorthEastSouthWestResize);
                    }
                    else if (Y <= ResizeCorners || MoveAction == MouseMoveAction.TopResize)
                    {
                        SetCursor(Cursor.NorthResize);
                    }
                    else if (MoveAction == MouseMoveAction.BottomLeftResize || X <= ResizeCorners && Y >= height - ResizeCorners)
                    {
                        SetCursor(Cursor.NorthEastSouthWestResize);
                    }
                    else if (MoveAction == MouseMoveAction.BottomRightResize || Y >= height - ResizeCorners && X >= width - ResizeCorners)
                    {
                        SetCursor(Cursor.NorthWestSouthEastResize);
                    }
                    else if (MoveAction == MouseMoveAction.BottomResize || Y >= height - ResizeCorners)
                    {
                        SetCursor(Cursor.SouthResize);
                    }
                    else if (MoveAction == MouseMoveAction.LeftResize || X <= ResizeCorners)
                    {
                        SetCursor(Cursor.WestResize);
                    }
                    else if (MoveAction == MouseMoveAction.RightResize || X >= width - ResizeCorners)
                    {
                        SetCursor(Cursor.EastResize);
                    }
                    else
                    {
                        SetCursor(Cursor.Default);
                    }
                }else
                {
                    SetCursor(Cursor.Default);
                }
				
			});
						
			Heading.AddEventListener(EventType.MouseDown, (ev) => {
				SetBodyOverLay();
                if (!IsActiveFormCollection())
                    return;

				if(windowState == WindowState.Maximized)
				{
					MovingForm = this;
					SetCursor(Cursor.Default);

					MoveAction = MouseMoveAction.Move;
				}
				else
				{
					MovingForm = this;
				}

				ActiveForm = this;
			});												

			Body.AddEventListener(EventType.MouseDown, (ev) => {
				if(InExternalMouseEvent)
					return;				
				if (!IsActiveFormCollection())
                    return;
				
				ActiveForm = this;
				MovingForm = null;								
				ev.StopPropagation();
			});

			Body.AddEventListener(EventType.MouseMove, (ev) => {				
				if(InExternalMouseEvent)
					return;

				if(MovingForm == null)
				{
                    if (!IsActiveFormCollection())
                        return;										
					ev.StopPropagation();
				}
			});			

			BodyOverLay.AddEventListener(EventType.MouseDown, (ev) =>
			{
				if(InDesign)
				{
					BodyOverLay.Style.Visibility = Visibility.Collapse;
					return;
				}
				if (!IsActiveFormCollection())
                    return;
				BodyOverLay.Style.Visibility = Visibility.Collapse;
				ActiveForm = this;
			});
			
			Body.AddEventListener(EventType.MouseLeave, (ev) =>
			{
				if(InDesign)
				{
					BodyOverLay.Style.Visibility = Visibility.Collapse;
					return;
				}

				if(MovingForm == null)
				{
					SetBodyOverLay();
				}
			});

			BodyOverLay.AddEventListener(EventType.MouseEnter, (ev) =>
			{				
				if(InDesign)
				{
					BodyOverLay.Style.Visibility = Visibility.Collapse;
					return;
				}
				if(MovingForm == null && IsActiveFormCollection()) // WindowHolderSelectionBox == null && 
				{
					SetCursor(Cursor.Default);
					BodyOverLay.Style.Visibility = Visibility.Collapse;
				}
				else
				{
					BodyOverLay.Style.Visibility = Visibility.Visible;
				}
			});

			jQuery.Select(Content)
				.Css("width", Window_DefaultWidth)
				.Css("height", Window_DefaultHeight);

			Content.AppendChild(Heading);
			Content.AppendChild(Body);
			Content.AppendChild(BodyOverLay);

			Heading.AppendChild(HeadingTitle);
			Heading.AppendChild(ButtonClose);
			Heading.AppendChild(ButtonExpand);
			Heading.AppendChild(ButtonMinimize);

			 closeAction = () => {
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
			return Heading.ClientHeight;
		}

		public int TitleBarWidth()
		{
			return Heading.ClientWidth;
		}

		public int ClientX()
		{
			return Body.ClientLeft;
		}

		public int ClientY()
		{
			return Body.ClientTop;
		}		

		public string Text
		{
			get { return HeadingTitle.InnerHTML; }
			set { HeadingTitle.InnerHTML = value; }
		}

		public string BackColor
		{
			get { return Body.Style.BackgroundColor; }
			set { Body.Style.BackgroundColor = value; }
		}

		public string ForeColor
		{
			get { return Body.Style.Color; }
			set { Body.Style.Color = value; }
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

        public void ShowStartNewLevel(HTMLElement owner = null)
        {
			if(!HasSetup)
				Setup();

			if (IsVisible())
            {
                // Already Open???
                throw new Exception("Invalid request to open form as a dialog that is already visible!");
            }

			if(StartPosition == FormStartPosition.Center)
			{
				CentreForm();
			}

            AddFormToParentElement(owner);
            
            Body.Focus();

            FormCollections.Add(new FormCollection(this));

            CalculateZOrder();

            OnShowed();

            ActiveForm = this;
        }		

		public void ShowDialog(params DialogResult[] dialogResults)
		{
			if(!HasSetup)
				Setup();

			InDialogResult = false;

			if (ButtonMinimize != null)
                ButtonMinimize.Delete();
            if (ButtonExpand != null)
                ButtonExpand.Delete();
            if (ButtonClose != null)
                ButtonClose.Delete();
            
            StartPosition = FormStartPosition.Center;

            _IsDialog = true;                        

            ShowStartNewLevel(null);

            CentreForm();

            ActiveForm = this;

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
            if (Owner == null)
                return;
		
			Self
            .Css("left", MinZero((Owner.ClientWidth / 2) - (Global.ParseInt(this.Width.ToHtmlValue()) / 2)))
            .Css("top", MinZero((Owner.ClientHeight / 2) - (Global.ParseInt(this.Height.ToHtmlValue()) / 2)));
        }

        protected void AddFormToParentElement(HTMLElement owner = null)
        {
            if (!HasRendered)
            {
                Render();
                HasRendered = true;
            }

            OnShowing();

			if(owner == null)
			{
				WindowHolder.AppendChild(Content);
				owner = WindowHolder;				
			}
			else
				owner.AppendChild(Content);				
			Shown();

			Owner = owner;
        }

		public void Shown()
		{
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
		public void Show(HTMLElement owner = null, bool seperateInstance = false)
		{
			if(!HasSetup)
				Setup();

            if (_IsDialog)
                return;
			_seperateInstance = seperateInstance;
			if(!seperateInstance && (FormCollections == null || FormCollections.Count == 0))
			{
				ShowStartNewLevel(owner);
				return;
			}

            var activeCollect = !seperateInstance ? GetActiveFormCollection() : standAloneForms;
            var visbileForms = activeCollect.VisibleForms;
            
			if(!visbileForms.Contains(this))
			{				
                AddFormToParentElement(owner);

                Content.Style.Visibility = Visibility.Visible;
				if(StartPosition != FormStartPosition.Manual && windowState == WindowState.Normal)
				{
                    if (StartPosition == FormStartPosition.Center || (activeCollect == null || visbileForms == null || visbileForms.Count == 0 || visbileForms[visbileForms.Count - 1].windowState != WindowState.Normal || visbileForms[visbileForms.Count - 1].Content == null))
					{
                        CentreForm();

                    }
					else if(StartPosition == FormStartPosition.WindowsDefaultLocation)
					{
						var obj = visbileForms[visbileForms.Count - 1];

						int x = Global.ParseInt(obj.Left.ToHtmlValue());
						int y = Global.ParseInt(obj.Top.ToHtmlValue());

						double pw25 = Owner.ClientWidth * 0.15;
						double ph25 = Owner.ClientHeight * 0.15;

						double pw75 = Owner.ClientWidth * 0.55;
						double ph75 = Owner.ClientHeight * 0.55;						

						if(x < pw25)						
							x = (int)pw25;						
						if(y < ph25)						
							y = (int)ph25;						

						if(x > pw75)
							x = (int)pw25;
						if(y > ph75)
							y = (int)ph25;
						x += 10;
						y += 10;

						Self.Css("left", MinZero(x))
							.Css("top", MinZero(y));
					}
				}				

				Body.Focus();

                visbileForms.Add(this);

				CalculateZOrder();

				OnShowed();
			}

			ActiveForm = this;
		}

		public void BringToFront()
		{
            var activeCollect = GetActiveFormCollection();
            if(activeCollect != null)
            {
                if (activeCollect.FormOwner == this)
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
			this.Content.Style.ZIndex = (zIndex++).ToString();

			//Self.Css("zIndex", zIndex++);
        }

		private static void ClearZIndex()
		{
			var x = GetActiveFormCollection().FormOwner;
			WindowHolder.Style.ZIndex = "-" + WindowHolder.ChildElementCount;
			bool Found = false;

			for(int i = 0; i < WindowHolder.ChildElementCount; i++)
			{
				if(Found || x.Content == WindowHolder.Children[i])
				{
					WindowHolder.Children[i].Style.ZIndex = "";
					Found = true;
				}
				else
				{
					WindowHolder.Children[i].Style.ZIndex = (i - WindowHolder.ChildElementCount - 1).ToString();
				}
				
			}
		}

		private static void ApplyZIndex()
		{
			WindowHolder.Style.ZIndex = "";
			for(int i = 0; i < WindowHolder.ChildElementCount; i++)
			{
				WindowHolder.Children[i].Style.ZIndex = i.ToString();
			}
		}

		private static int CalculateZOrder(FormCollection formCollection, int zIndex)
		{
			List<Form> TopMostForms = new List<Form>();

			var VisibleForms = formCollection.VisibleForms;

			if(formCollection.FormOwner != null)
			{
				//formCollection.FormOwner.Content.Delete();

				WindowHolder.AppendChild(formCollection.FormOwner);
				//formCollection.FormOwner.SetZIndex(ref zIndex);
			}

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
			ToClean.Remove(null); // Removes all nulls..

			for(int i = 0; i < TopMostForms.Count; i++)
			{
				var form = TopMostForms[i];
				VisibleForms.Remove(form);
				VisibleForms.Add(form);
			}
			for(int i = 0; i < VisibleForms.Count; i++)
			{
				if(VisibleForms[i] != null &&
					VisibleForms[i].Content != null)
				{
					//VisibleForms[i].Content.Delete();
					WindowHolder.AppendChild(VisibleForms[i].Content);

					//VisibleForms[i].SetZIndex(ref zIndex);
				}
			}

			return zIndex;
		}

		public static void CalculateZOrder()
		{			
			GetActiveFormCollection();

			if(FormCollections == null && standAloneForms.VisibleForms.Count == 0)
				return;
			FormCollections.Remove(null);

            int zIndex = 1;
			if (FormCollections.Count == 0)
                FormOverLay.Style.ZIndex = "";
            else if(FormCollections.Count == 1)
                FormOverLay.Style.Opacity = "0";            
            else
                FormOverLay.Style.Opacity = "0.4";

			//			FormOverLay.Delete();
				WindowHolder.Empty();

			for (int x = 0; x < FormCollections.Count; x++)
            {                
                if(x == FormCollections.Count - 1)
                {
					//FormOverLay.Style.ZIndex = (zIndex++).ToString();
					WindowHolder.AppendChild(FormOverLay);
				}
				zIndex = CalculateZOrder(FormCollections[x], zIndex);
			}
			zIndex = CalculateZOrder(standAloneForms, zIndex);
						
			if(ActiveForm != null)
			{
				ActiveForm.Body.Focus();
			}			
		}

		public static List<Form> ToClean = new List<Form>();
		private Action closeAction;
		public void Close()
		{
			if(_IsDialog && InDialogResult)
				return;
			OnClosing();           

			ToClean.Add(this);

            var ownerFormCollection = GetFormCollectionFromForm(this);

            if(ownerFormCollection != null)
            {
                if(ownerFormCollection.FormOwner == this)
                {
                    ownerFormCollection.FormOwner = null;
                    for (int i = 0; i < ownerFormCollection.VisibleForms.Count; i++)
                    {
                        if (ownerFormCollection.VisibleForms[i] == this)
                            continue;
                        ownerFormCollection.VisibleForms[i].Close();
                    }
                    if (FormCollections.Count == 1)
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
						Self.FadeOut(Settings.FormFadeDuration, closeAction);
					}else
					{
						closeAction();						
					}					
				}
				else
				{
					Content.Style.Visibility = Visibility.Collapse;
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

            OnClosed();			
		}

		private bool InDialogResult = false;				
	}
}
