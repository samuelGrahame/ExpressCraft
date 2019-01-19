using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static Retyped.dom;

namespace ExpressCraft
{
    public class CalculatorControl : ExControl
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
                            previousValue = previousValue - tryDec;
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
                    }
                    else
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
                        }
                        else
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

            var doc = document.createDocumentFragment();

            int AddHeight = (Helper.NotDesktop ? 45 : 22);

            //27.77778

            doc.appendChild(
                (DisplayInput = new MemoInput()
                {
                    Readonly = true,
                    Bounds = new Vector4(4, 4, "(100% - 8px)", AddHeight)
                }).Content
                );

            if(Helper.NotDesktop)
            {
                DisplayInput.Style.fontSize = "14px";
                DisplayInput.Height = 45;
            }

            List<SimpleButton> buttons = new List<SimpleButton>();

            buttons.AddRange(
                new SimpleButton[] {
                btnPTAX = new SimpleButton()
                {
                    Text = "+TAX",
                    ItemClick = AddOperator
                },
                btn7 = new SimpleButton()
                {
                    Text = "7",
                    ItemClick = AddTextToCommand
                },
                btn8 = new SimpleButton()
                {
                    Text = "8",
                    ItemClick = AddTextToCommand
                },
                btn9 = new SimpleButton()
                {
                    Text = "9",
                    ItemClick = AddTextToCommand
                },
                btnDiv = new SimpleButton()
                {
                    Text = "/",
                    ItemClick = AddOperator
                },
                btnSqrt = new SimpleButton()
                {
                    Text = "sqrt",
                    ItemClick = AddOperator
                },
                btnMTAX = new SimpleButton()
                {
                    Text = "-TAX",
                    ItemClick = AddOperator
                },
                btn4 = new SimpleButton()
                {
                    Text = "4",
                    ItemClick = AddTextToCommand
                },
                btn5 = new SimpleButton()
                {
                    Text = "5",
                    ItemClick = AddTextToCommand
                },
                btn6 = new SimpleButton()
                {
                    Text = "6",
                    ItemClick = AddTextToCommand
                },
                btnMul = new SimpleButton()
                {
                    Text = "*",
                    ItemClick = AddOperator
                },
                btnPer = new SimpleButton()
                {
                    Text = "%",
                    ItemClick = AddOperator
                },
                btnTAX = new SimpleButton()
                {
                    Text = "TAX",
                    ItemClick = AddOperator
                },
                btn1 = new SimpleButton()
                {
                    Text = "1",
                    ItemClick = AddTextToCommand
                },
                btn2 = new SimpleButton()
                {
                    Text = "2",
                    ItemClick = AddTextToCommand
                },
                btn3 = new SimpleButton()
                {
                    Text = "3",
                    ItemClick = AddTextToCommand
                },
                btnMinus = new SimpleButton()
                {
                    Text = "-",
                    ItemClick = AddOperator
                },
                btn1OverX = new SimpleButton()
                {
                    Text = "1/x",
                    ItemClick = AddOperator
                },
                btnDbl = new SimpleButton()
                {
                    Text = "Dbl",
                    ItemClick = AddOperator
                },
                btn0 = new SimpleButton()
                {
                    Text = "0",
                    ItemClick = AddTextToCommand
                },
                btnplusOrNeg = new SimpleButton()
                {
                    Text = "+/-",
                    ItemClick = AddOperator
                },
                btnDot = new SimpleButton()
                {
                    Text = ".",
                    ItemClick = AddTextToCommand
                },
                btnPlus = new SimpleButton()
                {
                    Text = "+",
                    ItemClick = AddOperator
                },
                btnEq = new SimpleButton()
                {
                    Text = "=",
                    ItemClick = AddOperator
                }}
                );
            int index = 0;
            int y = 0;
            int yOffset = 28 + AddHeight;
            btnClose = new SimpleButton()
            {
                Text = "&times;",
                Size = new Vector2("((100% - 28px) * 0.1666666666666667)", "((100% - " + yOffset + "px) * 0.2)"),
                Location = new Vector2("(((100% - 28px) * " + (5 * 0.1666666666666667m) + ") + " + ((5 * 4) + 4) + "px)", "(((100% - " + yOffset + "px) * " + (y * 0.2m) + ") + " + (((y * 4) + 8) + AddHeight) + "px)"),
                ItemClick = (ev) =>
                    {
                        if(OnClose != null)
                            OnClose();
                    }
            };
            if(Helper.NotDesktop)
            {
                btnClose.Style.fontSize = "26px";
                btnClose.Style.fontWeight = "bold";
            }
            btnBack = new SimpleButton()
            {
                Text = "Back",
                Size = new Vector2("(((100% - 24px) - ((100% - 28px) * 0.1666666666666667)) * 0.333)", "((100% - " + yOffset + "px) * 0.2)"),
                Location = new Vector2("(((((100% - 24px) - ((100% - 28px) * 0.1666666666666667)) * 0.333) * 0) + 4px)", "(((100% - " + yOffset + "px) * " + (y * 0.2m) + ") + " + (((y * 4) + 8) + AddHeight) + "px)"),
                ItemClick = Back
            };
            if(Helper.NotDesktop)
                btnBack.Style.fontSize = "14px";
            btnCE = new SimpleButton()
            {
                Text = "CE",
                Size = new Vector2("(((100% - 24px) - ((100% - 28px) * 0.1666666666666667)) * 0.333)", "((100% - " + yOffset + "px) * 0.2)"),
                Location = new Vector2("(((((100% - 24px) - ((100% - 28px) * 0.1666666666666667)) * 0.333) * 1) + 8px)", "(((100% - " + yOffset + "px) * " + (y * 0.2m) + ") + " + (((y * 4) + 8) + AddHeight) + "px)"),
                ItemClick = (ev) =>
                {
                    current_command = "";
                    RefreshValue();
                }
            };
            if(Helper.NotDesktop)
                btnCE.Style.fontSize = "14px";
            btnC = new SimpleButton()
            {
                Text = "C",
                Size = new Vector2("((((100% - 24px) - ((100% - 28px) * 0.1666666666666667)) * 0.333) + 4px)", "((100% - " + yOffset + "px) * 0.2)"),
                Location = new Vector2("(((((100% - 24px) - ((100% - 28px) * 0.1666666666666667)) * 0.333) * 2) + 12px)", "(((100% - " + yOffset + "px) * " + (y * 0.2m) + ") + " + (((y * 4) + 8) + AddHeight) + "px)"),
                ItemClick = (ev) =>
                {
                    _commands = new List<string>(); current_command = "";
                    RefreshValue();
                }
            };
            if(Helper.NotDesktop)
                btnC.Style.fontSize = "14px";

            doc.AppendChildren(btnClose.Content, btnBack.Content, btnCE.Content, btnC.Content);

            y++;

            for(int i = 0; i < buttons.Count; i++)
            {
                buttons[i].Size = new Vector2("((100% - 28px) * 0.1666666666666667)", "((100% - " + yOffset + "px) * 0.2)");
                buttons[i].Location = new Vector2("(((100% - 28px) * " + (index * 0.1666666666666667m) + ") + " + ((index * 4) + 4) + "px)", "(((100% - " + yOffset + "px) * " + (y * 0.2m) + ") + " + (((y * 4) + 8) + AddHeight) + "px)");
                if(Helper.NotDesktop)
                    buttons[i].Style.fontSize = "14px";

                doc.appendChild(buttons[i].Content);
                index++;
                if(index == 6)
                {
                    index = 0;
                    y++;
                }
            }

            btnDbl.Style.fontSize = "6.5pt";
            btnTAX.Style.fontSize = "6.5pt";
            btnPTAX.Style.fontSize = "6.5pt";
            btnMTAX.Style.fontSize = "6.5pt";

            btnClose.Style.color = "red";
            btnClose.Style.fontWeight = "bold";

            if(!CloseButtonVisible)
            {
                btnClose.Style.visibility = "hidden";
            }

            RefreshValue();

            Content.appendChild(doc);
        }
    }
}