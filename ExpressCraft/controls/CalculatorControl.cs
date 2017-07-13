using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class CalculatorControl : Control
    {        
        public MemoInput DisplayInput;

        public SimpleButton btnClose;
        public SimpleButton btnBack;
        public SimpleButton btnCE;
        public SimpleButton btnC;
        public SimpleButton btnPTAX;
        public SimpleButton btnMTAX;
        public SimpleButton btnTAX;
        public SimpleButton btnDbl;

        public SimpleButton btn7;
        public SimpleButton btn8;
        public SimpleButton btn9;
        public SimpleButton btnDiv;
        public SimpleButton btnSqrt;

        public SimpleButton btn4;
        public SimpleButton btn5;
        public SimpleButton btn6;
        public SimpleButton btnMul;
        public SimpleButton btnPer;

        public SimpleButton btn1;
        public SimpleButton btn2;
        public SimpleButton btn3;
        public SimpleButton btnMinus;
        public SimpleButton btn1OverX;

        public SimpleButton btn0;
        public SimpleButton btnplusOrNeg;
        public SimpleButton btnDot;
        public SimpleButton btnPlus;
        public SimpleButton btnEq;

        public decimal Value;

        private List<string> _commands = new List<string>();
        private string current_command = "";

        private void AddTextToCommand(SimpleButton button)
        {
            if(button.Text == "." && current_command.Contains("."))
                return;

            if(current_command == "0")
                current_command = "";

            current_command += button.Text;

            RefreshValue();
        }

        public Action<decimal> OnEqual = null;

        public void CalculateAndClose()
        {
            var x = Calculate();

            if(OnEqual != null)
                OnEqual(x);
            if(!DontRefresh)
            {
                if(OnClose != null)
                    OnClose();
            }            
        }

        public Action OnClose;

        public decimal Calculate()
        {
            decimal previousValue = 0;

            string previousOp = "";
            var length = _commands.Count;
            
            for(int i = 0; i < length; i++)
            {
                var command = _commands[i];

                if(command.EndsWith("%"))
                {
                    command = command.Substring(0, command.Length - 1);
                }

                decimal tryDec;
                if(decimal.TryParse(command, out tryDec))
                {
                    if(previousOp != "")
                    {
                        if(_commands[i].EndsWith("%"))
                        {
                            try
                            {
                                tryDec = previousValue * (tryDec / 100);
                            }
                            catch(Exception)
                            {
                                tryDec = 0;
                            }                            
                        }

                        if(previousOp == "+")
                        {
                            previousValue = previousValue + tryDec;
                        }
                        else if(previousOp == "-")
                        {
                            previousValue = previousValue + tryDec;
                        }
                        else if(previousOp == "/")
                        {
                            try
                            {
                                previousValue = previousValue / tryDec;
                            }
                            catch(Exception)
                            {
                                previousValue = 0;
                            }
                        }
                        else if(previousOp == "*")
                        {
                            previousValue = previousValue * tryDec;
                        }
                        else if(previousOp == "*")
                        {
                            previousValue = previousValue * tryDec;
                        }

                        previousOp = "";
                    }
                    else
                    {
                        previousValue = tryDec;
                    }
                }
                else
                {
                    previousOp = command;
                    if(previousOp == "+TAX")
                    {
                        previousValue = Helper.AddTax(previousValue);
                        previousOp = "";
                    }
                    else if(previousOp == "-TAX")
                    {
                        previousValue = Helper.DeductTax(previousValue);
                        previousOp = "";
                    }
                    else if(previousOp == "TAX")
                    {
                        previousValue = Helper.GetPortionTax(previousValue);
                        previousOp = "";
                    }
                    else if(previousOp == "Dbl")
                    {
                        previousValue = previousValue * 2;
                        previousOp = "";
                    }
                    else if(previousOp == "sqrt")
                    {
                        try
                        {
                            previousValue = (decimal)Math.Sqrt((double)previousValue);
                        }
                        catch(Exception)
                        {
                            previousValue = 0;
                        }
                        previousOp = "";
                    }
                    else if(previousOp == "1/x")
                    {
                        try
                        {
                            previousValue = 1.0m / previousValue;
                        }
                        catch(Exception)
                        {
                            previousValue = 0;
                        }

                        previousOp = "";
                    }
                    else if(previousOp == "+/-")
                    {
                        previousValue = -previousValue;
                        previousOp = "";
                    }
                }
            }

            return previousValue;
        }

        public void RefreshValue()
        {
            if(DontRefresh)
                return;
            var builder = new StringBuilder();

            var length = _commands.Count;

            for(int i = 0; i < length; i++)
            {
                builder.Append(_commands[i] + " ");
            }
            builder.Append(current_command);
            DisplayInput.Text = "";
            DisplayInput.Text = builder.ToString();
        }

        public bool IsAllNumbers(string value)
        {
            decimal x;
            return decimal.TryParse(value, out x);
        }

        private void Back(SimpleButton button)
        {
            if(current_command != "")
            {
                current_command = current_command.Substring(0, current_command.Length - 1);
            }
            else
            {
                if(_commands.Count > 0)
                {
                    var x = _commands.Last();
                    if(IsAllNumbers(x))
                    {
                        current_command = x;
                        current_command = current_command.Substring(0, current_command.Length - 1);
                    }
                    else
                    {
                        current_command = "";
                    }
                    _commands.RemoveAt(_commands.Count - 1);
                }
            }
            RefreshValue();
        }

        public bool IsSingleOperator(string x)
        {
            return (x.Contains("TAX") || x == "Dbl" || x == "1/x" || x == "+/-" || x == "sqrt");            
        }
        public bool DontRefresh = false;
        public void AddOperator(SimpleButton button)
        {
            if(IsSingleOperator(button.Text))
            {
                if(_commands.Count > 0)
                {
                    var x = _commands.Last();
                    if(!IsSingleOperator(x))
                    {
                        if(current_command == "" && !IsAllNumbers(x))
                        {
                            return;
                        }
                    }
                }

                if(current_command != "")
                {
                    _commands.Add(current_command);
                    current_command = "";
                }

                _commands.Add(button.Text);
                
                RefreshValue();
            }
            else
            {
                if(current_command == "")
                {
                    if(button.Text == "=")
                    {
                        CalculateAndClose();
                        return;
                    }else
                    {
                        if(_commands.Count > 0)
                        {
                            var x = _commands.Last();
                            if(!IsSingleOperator(x))
                            {
                                return;
                            }
                        }
                        else
                        {
                            return;
                        }
                    }   
                }

                if(button.Text == "%")
                {
                    if(_commands.Count > 0)
                    {
                        var x = _commands.Last();

                        if(!IsSingleOperator(x))
                        {
                            current_command += "%";
                            _commands.Add(current_command);
                            current_command = "";
                        }else
                        {
                            return;
                        }                        
                    }                    
                }
                else
                {
                    _commands.Add(current_command);
                    current_command = "";

                    if(button.Text == "=")
                    {
                        CalculateAndClose();
                    }
                    else
                    {
                        _commands.Add(button.Text);
                    }
                }
                RefreshValue();
            }
        }
        
        public CalculatorControl(decimal startingValue, bool CloseButtonVisible = false) : base()
        {            
            Value = startingValue;

            current_command = Value.ToString();

            int offset = 25;

            Size = new Vector2(182, 132 + offset);

            var doc = Document.CreateDocumentFragment();


            doc.AppendChildren(
                DisplayInput = new MemoInput()
                {
                    Readonly = true,
                    Bounds = new Vector4(4, 3, "calc(100% - 8px)", 22)
                },
                btnClose = new SimpleButton()
                {
                    Text = "&times;",
                    Bounds = new Vector4(4, 3 + offset, 26, 22),
                    ItemClick = (ev) =>
                    {
                        if(OnClose != null)
                            OnClose();                        
                    }
                },
                btnBack = new SimpleButton()
                {
                    Text = "Back",
                    Bounds = new Vector4(35, 3 + offset, 45, 22),
                    ItemClick = Back
                },
                btnCE = new SimpleButton()
                {
                    Text = "CE",
                    Bounds = new Vector4(83, 3 + offset, 45, 22),
                    ItemClick = (ev) => {
                        current_command = "";
                        RefreshValue();
                    }
                },
                btnC = new SimpleButton()
                {
                    Text = "C",
                    Bounds = new Vector4(131, 3 + offset, 45, 22),
                    ItemClick = (ev) => {
                        _commands = new List<string>(); current_command = "";
                        RefreshValue();
                    }
                },
                btnPTAX = new SimpleButton()
                {
                    Text = "+TAX",
                    Bounds = new Vector4(4, 28 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btnMTAX = new SimpleButton()
                {
                    Text = "-TAX",
                    Bounds = new Vector4(4, 54 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btnTAX = new SimpleButton()
                {
                    Text = "TAX",
                    Bounds = new Vector4(4, 78 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btnDbl = new SimpleButton()
                {
                    Text = "Dbl",
                    Bounds = new Vector4(4, 104 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btn7 = new SimpleButton()
                {
                    Text = "7",
                    Bounds = new Vector4(36, 28 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btn8 = new SimpleButton()
                {
                    Text = "8",
                    Bounds = new Vector4(64, 28 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btn9 = new SimpleButton()
                {
                    Text = "9",
                    Bounds = new Vector4(93, 28 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btnDiv = new SimpleButton()
                {
                    Text = "/",
                    Bounds = new Vector4(122, 28 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btnSqrt = new SimpleButton()
                {
                    Text = "sqrt",
                    Bounds = new Vector4(151, 28 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btn4 = new SimpleButton()
                {
                    Text = "4",
                    Bounds = new Vector4(36, 54 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btn5 = new SimpleButton()
                {
                    Text = "5",
                    Bounds = new Vector4(64, 54 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btn6 = new SimpleButton()
                {
                    Text = "6",
                    Bounds = new Vector4(93, 54 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btnMul = new SimpleButton()
                {
                    Text = "*",
                    Bounds = new Vector4(122, 54 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btnPer = new SimpleButton()
                {
                    Text = "%",
                    Bounds = new Vector4(151, 54 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btn1 = new SimpleButton()
                {
                    Text = "1",
                    Bounds = new Vector4(36, 78 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btn2 = new SimpleButton()
                {
                    Text = "2",
                    Bounds = new Vector4(64, 78 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btn3 = new SimpleButton()
                {
                    Text = "3",
                    Bounds = new Vector4(93, 78 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btnMinus = new SimpleButton()
                {
                    Text = "-",
                    Bounds = new Vector4(122, 78 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btn1OverX = new SimpleButton()
                {
                    Text = "1/x",
                    Bounds = new Vector4(151, 78 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btn0 = new SimpleButton()
                {
                    Text = "0",
                    Bounds = new Vector4(36, 104 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btnplusOrNeg = new SimpleButton()
                {
                    Text = "+/-",
                    Bounds = new Vector4(64, 104 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btnDot = new SimpleButton()
                {
                    Text = ".",
                    Bounds = new Vector4(93, 104 + offset, 26, 22),
                    ItemClick = AddTextToCommand
                },
                btnPlus = new SimpleButton()
                {
                    Text = "+",
                    Bounds = new Vector4(122, 104 + offset, 26, 22),
                    ItemClick = AddOperator
                },
                btnEq = new SimpleButton()
                {
                    Text = "=",
                    Bounds = new Vector4(151, 104 + offset, 26, 22),
                    ItemClick = AddOperator
                });

            btnDbl.Style.FontSize = "6.5pt";
            btnTAX.Style.FontSize = "6.5pt";
            btnPTAX.Style.FontSize = "6.5pt";
            btnMTAX.Style.FontSize = "6.5pt";

            btnClose.Style.Color = "red";
            btnClose.Style.FontWeight = "bold";

            if(!CloseButtonVisible)
            {
                btnClose.Style.Visibility = Visibility.Hidden;
            }

            RefreshValue();

            Content.AppendChild(doc);
        }
    }


}
