using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class DateControl : Control
    {
        public SimpleButton btnTop;
        public SimpleButton btnSelectedRange;
        public SimpleButton btnToday;

        public SimpleButton btnLeft;
        public SimpleButton btnRight;

        public Control ContentRange;
        
        private int SelectedYear;
        private int SelectedMonth;
        private int SelectedDay;        

        private DisplayMode _activeDisplayMode = DisplayMode.Day;

        public DisplayMode ActiveDisplayMode
        {
            get { return _activeDisplayMode; }
            set {
                if(_activeDisplayMode != value)
                {
                    _activeDisplayMode = value;
                    RefreshView();
                }
            }
        }

        public DateTime GetViewDateTime()
        {
            return new DateTime(SelectedYear, SelectedMonth, SelectedDay);
        }

        public void SetViewDateTime(DateTime date)
        {
            var newSelectedYear = date.Year;
            var newSelectedMonth = date.Month;
            var newSelectedDay = date.Day;

            if(newSelectedYear != SelectedYear || 
                newSelectedMonth != SelectedMonth || 
                newSelectedDay != SelectedDay || date == DateTime.Today)
            {
                SelectedYear = newSelectedYear;
                SelectedMonth = newSelectedMonth;
                SelectedDay = newSelectedDay;

                if(OnDateChanged != null)
                    OnDateChanged(date);

                RefreshView();
            }
        }

        public Action<DateTime> OnDateChanged;

        private static string[] Days = new string[] {
            "MO",
            "TU",
            "WE",
            "TH",
            "FR",
            "SA",
            "SU"
        };

        public void RefreshView()
        {
            var date = GetViewDateTime();
            btnTop.Text = date.ToString("ddd, dd MMM yyyy");
            
            var doc = Document.CreateDocumentFragment();

            switch(_activeDisplayMode)
            {
                case DisplayMode.Day:
                    btnSelectedRange.Text = date.ToString("MMM yyyy");

                    DateTime startDate = new DateTime(date.Year, date.Month, 1);
                    DateTime endDate = startDate.AddMonths(1).AddDays(-1);


                    int TotalDays = (endDate - startDate).Days;

                    var startDayIndex = (startDate.DayOfWeek == DayOfWeek.Sunday ? 7 : (int)startDate.DayOfWeek) - 1;
                    int offsetStart = 0;
                    int row = 1;

                    DateTime startOutside = startDayIndex == 0 ?
                        startDate : startDate.AddDays(-startDayIndex);

                    var endDayIndex = (endDate.DayOfWeek == DayOfWeek.Sunday ? 7 : (int)endDate.DayOfWeek) - 1;
                    
                    for(int i = 0; i < 42; i++)
                    {
                        DateTime curDate = startOutside;
                         
                        var btn = new SimpleButton()
                        {
                            Text = curDate.Day.ToString(),
                            Bounds = new Vector4("(100% * " + (offsetStart * 0.1428) + ")", "(((100% - " + (Helper.NotDesktop ? 26 : 13) + "px) * " + ((row - 1) * 0.1666) + ") + " + (Helper.NotDesktop ? 26 : 13) + "px)", "(100% * 0.1428)", "((100% - " + (Helper.NotDesktop ? 26 : 13) + "px) * " + 0.1666 + ")"), //  offsetStart * 30,  (22 * row) - 6, 30, 22
                            ItemClick = (ev) =>
                            {
                                if(GetViewDateTime() == curDate)
                                {
                                    if(OnRequestToClose != null)
                                        OnRequestToClose();
                                }
                                SetViewDateTime(curDate);
                            }
                        };                        
                        if(Helper.NotDesktop)
                        {
                            btn.Style.FontSize = "14px";
                            btn.Style.FontWeight = "bold";
                        }
                        if(curDate == date)
                        {
                            btn.ClassList.Add("simplebutton-active");
                        }
                        btn.Style.BorderColor = "transparent";

                        if(curDate < startDate || curDate > endDate)
                        {
                            //btn.Style.Color = "rgb(211, 211, 211)";
                        }else if (curDate.DayOfWeek == DayOfWeek.Saturday || curDate.DayOfWeek == DayOfWeek.Sunday)
                        {
                            btn.Style.Color = "rgb(191, 11, 11)";
                            btn.Style.Filter = "brightness(110%)";
                        }
                        else
                        {
                            btn.Style.Filter = "brightness(110%)";
                        }
                        btn.Content.OnKeyDown = BlockTabEvent;

                        doc.AppendChild(btn);

                        offsetStart++;

                        if(offsetStart > 6)
                        {
                            row++;
                            offsetStart = 0;
                        }

                        startOutside = startOutside.Date.AddDays(1);
                        if(startOutside.Hour == 23)
                        {
                            startOutside = startOutside.AddHours(1);                            
                        }
                    }
                    
                    for(int x = 0; x < 7; x++)
                    {
                        var label = Label(Days[x], 0, 0);
                        label.SetLocation("(100% * " + (x * 0.1428) + " + ((100% * 0.1428) * 0.45) - 6px)", 0);
                            //Bounds = new Vector4("(100% * " + (offsetStart * 0.1428) + ")", "((100% * " + (row * 0.1666) + ") + (100% * 0.1666))", "(100% * 0.1428)", "((100% * " + 0.1666 + ") + (100% * 0.1666))"), //  offsetStart * 30,  (22 * row) - 6, 30, 22
                        if(Helper.NotDesktop)
                        {
                            label.Style.FontSize = "14px";
                        }

                        doc.AppendChild(label);

                    }

                    break;
                case DisplayMode.Month:
                    break;
                case DisplayMode.Year:
                    break;
                default:
                    break;
            }

            ContentRange.Content.Empty(); // empty and re-create
            ContentRange.Content.AppendChild(doc);
        }

        public Action OnRequestToClose;

        public void BlockTabEvent(KeyboardEvent ev)
        {
            if(ev.KeyCode == 9)
            {
                if(OnRequestToClose != null)
                    OnRequestToClose();
                ev.PreventDefault();
            }
        }

        public DateControl(DateTime startDate) : base()
        {
            Size = new Vector2(230, 245);

            var doc = Document.CreateDocumentFragment();

            Content.OnKeyDown = BlockTabEvent;

            btnTop = new SimpleButton();
            btnTop.Style.Transform = "translate(-50%, 0)";
            btnTop.Style.Left = "50%";
            btnTop.Style.MarginRight = "50%";
            btnTop.Top = 6;
            btnTop.Width = "auto";
            btnTop.Style.BorderColor = "transparent";
            btnTop.Content.OnKeyDown = BlockTabEvent;


            btnSelectedRange = new SimpleButton() { ItemClick = (ev) => {
                MoveUp();
            } };

            btnSelectedRange.Style.Transform = "translate(-50%, 0)";
            btnSelectedRange.Style.Left = "50%";
            btnSelectedRange.Style.MarginRight = "50%";
            btnSelectedRange.Top =  30;
            btnSelectedRange.Width = "auto";
            btnSelectedRange.Style.BorderColor = "transparent";
            btnSelectedRange.Content.OnKeyDown = BlockTabEvent;

            btnLeft = new SimpleButton() { Text = "<", Location = new Vector2(14, 36), Size = new Vector2(13, 13), ItemClick = (ev) => { MoveLeft(); } };
            btnLeft.Content.OnKeyDown = BlockTabEvent;

            btnRight = new SimpleButton() { Text = ">", Location = new Vector2("(100% - 26px)", 36), Size = new Vector2(13, 13), ItemClick = (ev) => { MoveRight(); } };
            btnRight.Content.OnKeyDown = BlockTabEvent;

            btnLeft.Style.BorderRadius = "50%";            
            btnRight.Style.BorderRadius = "50%";

            btnLeft.Style.LineHeight = "0";
            btnRight.Style.LineHeight = "0";

            if(Helper.NotDesktop)
            {
                btnSelectedRange.Style.FontSize = "14px";
                btnSelectedRange.Height = 36;
                btnSelectedRange.Top = 42;

                btnTop.Style.FontSize = "14px";
                btnTop.Height = 36;

                btnLeft.Size = new Vector2(36, 36);
                btnLeft.Style.FontSize = "14px";
                btnLeft.Top = 20;

                btnRight.Size = new Vector2(36, 36);                
                btnRight.Style.FontSize = "14px";
                btnRight.Top = 20;
                btnRight.Left = "(100% - 50px)";

                ContentRange = new Control() { Size = new Vector2("(100% - 20px)", "(100% - 147px)"), Location = new Vector2(11, 90) };
            }
            else
            {
                ContentRange = new Control() { Size = new Vector2("(100% - 20px)", "(100% - 92px)"), Location = new Vector2(11, 60) };
            }

            
            ContentRange.Content.OnKeyDown = BlockTabEvent;

            btnToday = new SimpleButton()
            {
                Text = "Today",
                Width = 50,
                ItemClick = (ev) =>
                {                    
                    ActiveDisplayMode = DisplayMode.Day;                    
                    SetViewDateTime(DateTime.Today);
                    
                    if(OnDateChanged != null)
                        OnDateChanged(DateTime.Today);

                    if(GetViewDateTime() == DateTime.Today)
                    {
                        if(OnRequestToClose != null)
                            OnRequestToClose();
                    }
                }
            };

            btnToday.Style.Transform = "translate(-50%, 0)";
            btnToday.Style.Left = "50%";
            btnToday.Style.MarginRight = "50%";

            if(Helper.NotDesktop)
            {
                btnToday.Top = "(100% - 51px)";
                btnToday.Style.FontSize = "14px";
                btnToday.Height = 45;
                btnToday.Style.MinWidth = "60px";
                btnToday.Width = "(100% * 0.1428)";
            }
            else
            {
                btnToday.Top = "(100% - 26px)";
            }

            
            btnToday.Content.OnKeyDown = BlockTabEvent;

            doc.AppendChildren(btnTop, btnLeft, btnSelectedRange, btnRight, ContentRange, btnToday);
            if(startDate == DateTime.MinValue)
                startDate = DateTime.Today;

            Content.AppendChild(doc);

            SetViewDateTime(startDate);
        }

        public void MoveLeft()
        {
            MoveLeftOrRight(-1);

        }

        public void MoveUp()
        {
            return;
            if(_activeDisplayMode != DisplayMode.Year)
            {
                _activeDisplayMode++;
                RefreshView();
            }
        }   
        
        public void MoveLeftOrRight(int timesValue)
        {
            var date = GetViewDateTime();

            switch(_activeDisplayMode)
            {
                default:                    
                case DisplayMode.Day:
                    date = date.AddMonths((1 * timesValue));                     
                    break;
                case DisplayMode.Month:
                    date = date.AddMonths((12 * timesValue));
                    break;
                case DisplayMode.Year:
                    date = date.AddYears((120 * timesValue));
                    break;                
            }

            SetViewDateTime(date);                   
        }

        public void MoveRight()
        {
            MoveLeftOrRight(1);
        }

        public enum DisplayMode
        {
            Day,
            Month,
            Year
        }
    }


}
