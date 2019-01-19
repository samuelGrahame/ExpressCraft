using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class DateControl : ExControl
    {
        public SimpleButton btnTop;
        public SimpleButton btnSelectedRange;
        public SimpleButton btnToday;

        public SimpleButton btnLeft;
        public SimpleButton btnRight;

        public ExControl ContentRange;

        private int SelectedYear;
        private int SelectedMonth;
        private int SelectedDay;

        private DisplayMode _activeDisplayMode = DisplayMode.Day;

        public DisplayMode ActiveDisplayMode
        {
            get { return _activeDisplayMode; }
            set
            {
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

            var doc = document.createDocumentFragment();

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
                            Bounds = new Vector4("(100% * " + (offsetStart * 0.1428) + ")", "(((100% - " + (Helper.NotDesktop ? 29 : 16) + "px) * " + ((row - 1) * 0.1666) + ") + " + (Helper.NotDesktop ? 29 : 16) + "px)", "(100% * 0.1428)", "((100% - " + (Helper.NotDesktop ? 29 : 16) + "px) * " + 0.1666 + ")"), //  offsetStart * 30,  (22 * row) - 6, 30, 22
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
                            btn.Style.fontSize = "14px";
                            btn.Style.fontWeight = "bold";
                        }
                        if(curDate == date)
                        {
                            btn.ClassList.add("simplebutton-active");
                        }
                        btn.Style.borderColor = "transparent";

                        if(curDate < startDate || curDate > endDate)
                        {
                            btn.Style.color = "rgb(211, 211, 211)";
                        }
                        else if(curDate.DayOfWeek == DayOfWeek.Saturday || curDate.DayOfWeek == DayOfWeek.Sunday)
                        {
                            btn.Style.color = "rgb(191, 11, 11)";
                            btn.Style.filter = "brightness(110%)";
                        }
                        else
                        {
                            btn.Style.filter = "brightness(110%)";
                        }
                        btn.Content.onkeydown = BlockTabEvent;

                        doc.appendChild((Node)btn);

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
                            label.style.fontSize = "14px";
                        }

                        doc.appendChild(label);
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
            if(ev.keyCode == 9)
            {
                if(OnRequestToClose != null)
                    OnRequestToClose();
                ev.preventDefault();
            }
        }

        public DateControl(DateTime startDate) : base()
        {
            Size = new Vector2(230, 245);


            var doc = document.createDocumentFragment();

            Content.onkeydown = BlockTabEvent;

            btnTop = new SimpleButton();
            btnTop.Style.transform = "translate(-50%, 0)";
            btnTop.Style.left = "50%";
            btnTop.Style.marginRight = "50%";
            btnTop.Top = 6;
            btnTop.Width = "auto";
            btnTop.Style.borderColor = "transparent";
            btnTop.Content.onkeydown = BlockTabEvent;

            btnSelectedRange = new SimpleButton()
            {
                ItemClick = (ev) =>
                {
                    MoveUp();
                }
            };

            btnSelectedRange.Style.transform = "translate(-50%, 0)";
            btnSelectedRange.Style.left = "50%";
            btnSelectedRange.Style.marginRight = "50%";
            btnSelectedRange.Top = 30;
            btnSelectedRange.Width = "auto";
            btnSelectedRange.Style.borderColor = "transparent";
            btnSelectedRange.Content.onkeydown = BlockTabEvent;

            btnLeft = new SimpleButton() { Text = "<", Location = new Vector2(14, 36), Size = new Vector2(13, 13), ItemClick = (ev) => { MoveLeft(); } };
            btnLeft.Content.onkeydown = BlockTabEvent;

            btnRight = new SimpleButton() { Text = ">", Location = new Vector2("(100% - 26px)", 36), Size = new Vector2(13, 13), ItemClick = (ev) => { MoveRight(); } };
            btnRight.Content.onkeydown = new Retyped.dom.HTMLElement.onkeydownFn(BlockTabEvent);

            btnLeft.Style.borderRadius = "50%";
            btnRight.Style.borderRadius = "50%";

            btnLeft.Style.lineHeight = "0";
            btnRight.Style.lineHeight = "0";

            if(Helper.NotDesktop)
            {
                btnSelectedRange.Style.fontSize = "14px";
                btnSelectedRange.Height = 36;
                btnSelectedRange.Top = 42;

                btnTop.Style.fontSize = "14px";
                btnTop.Height = 36;

                btnLeft.Size = new Vector2(36, 36);
                btnLeft.Style.fontSize = "14px";
                btnLeft.Top = 20;

                btnRight.Size = new Vector2(36, 36);
                btnRight.Style.fontSize = "14px";
                btnRight.Top = 20;
                btnRight.Left = "(100% - 50px)";

                ContentRange = new ExControl() { Size = new Vector2("(100% - 20px)", "(100% - 147px)"), Location = new Vector2(11, 90) };
            }
            else
            {
                ContentRange = new ExControl() { Size = new Vector2("(100% - 20px)", "(100% - 92px)"), Location = new Vector2(11, 60) };
            }

            ContentRange.Content.onkeydown = BlockTabEvent;

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

            btnToday.Style.transform = "translate(-50%, 0)";
            btnToday.Style.left = "50%";
            btnToday.Style.marginRight = "50%";

            if(Helper.NotDesktop)
            {
                btnToday.Top = "(100% - 51px)";
                btnToday.Style.fontSize = "14px";
                btnToday.Height = 45;
                btnToday.Style.minWidth = "60px";
                btnToday.Width = "(100% * 0.1428)";
            }
            else
            {
                btnToday.Top = "(100% - 26px)";
            }

            btnToday.Content.onkeydown = BlockTabEvent;

            doc.AppendChildren(btnTop, btnLeft, btnSelectedRange, btnRight, ContentRange, btnToday);
            if(startDate == DateTime.MinValue)
                startDate = DateTime.Today;

            Content.appendChild(doc);

            SetViewDateTime(startDate);
        }

        public void MoveLeft()
        {
            MoveLeftOrRight(-1);
        }

        public void MoveUp()
        {
            return;
            //if(_activeDisplayMode != DisplayMode.Year)
            //{
            //    _activeDisplayMode++;
            //    RefreshView();
            //}
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