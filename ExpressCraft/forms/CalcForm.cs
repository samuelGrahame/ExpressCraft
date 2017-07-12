using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class CalcForm : FormPopup
    {
        public TextInput InputControl;

        public SimpleButton btnClose;
        public SimpleButton btnBack;
        public SimpleButton btnCE;
        public SimpleButton btnC;
        public SimpleButton btnMC;
        public SimpleButton btnMR;
        public SimpleButton btnMS;
        public SimpleButton btnMPlus;

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

        public CalcForm(TextInput inputControl)
        {
            InputControl = inputControl;
            Size = new Vector2(182, 132);

            var doc = Document.CreateDocumentFragment();
            
            doc.AppendChildren(
                btnClose = new SimpleButton()
                {
                    Text = "&times;",
                    Bounds = new Vector4(4, 3, 26, 22),
                    ItemClick = (ev) =>
                    {
                        this.Close();
                    }
                },
                btnBack = new SimpleButton() { Text = "Back",
                    Bounds = new Vector4(35, 3, 45, 22) },
                btnCE = new SimpleButton() { Text = "CE",
                    Bounds = new Vector4(83, 3, 45, 22)
                },
                btnC = new SimpleButton() { Text = "C",
                    Bounds = new Vector4(131, 3, 45, 22)
                },
                btnMC = new SimpleButton() { Text = "MC",
                    Bounds = new Vector4(4, 28, 26, 22) },
                btnMR = new SimpleButton() { Text = "MR",
                    Bounds = new Vector4(4, 54, 26, 22)
                },
                btnMS = new SimpleButton() { Text = "MS",
                    Bounds = new Vector4(4, 78, 26, 22)
                },
                btnMPlus = new SimpleButton() { Text = "M+",
                    Bounds = new Vector4(4, 104, 26, 22)
                },
                btn7 = new SimpleButton() { Text = "7",
                    Bounds = new Vector4(36, 28, 26, 22)
                },
                btn8 = new SimpleButton() { Text = "8",
                    Bounds = new Vector4(64, 28, 26, 22)
                },
                btn9 = new SimpleButton() { Text = "9",
                    Bounds = new Vector4(93, 28, 26, 22)
                },
                btnDiv = new SimpleButton() { Text = "/",
                    Bounds = new Vector4(122, 28, 26, 22)
                },
                btnSqrt = new SimpleButton() { Text = "sqrt",
                    Bounds = new Vector4(151, 28, 26, 22)
                },
                btn4 = new SimpleButton() { Text = "4",
                    Bounds = new Vector4(36, 54, 26, 22)
                },
                btn5 = new SimpleButton() { Text = "5",
                    Bounds = new Vector4(64, 54, 26, 22)
                },
                btn6 = new SimpleButton() { Text = "6",
                    Bounds = new Vector4(93, 54, 26, 22)
                },
                btnMul = new SimpleButton() { Text = "*",
                    Bounds = new Vector4(122, 54, 26, 22)
                },
                btnPer = new SimpleButton() { Text = "%",
                    Bounds = new Vector4(151, 54, 26, 22)
                },           
                btn1 = new SimpleButton() { Text = "1",
                    Bounds = new Vector4(36, 78, 26, 22)
                },
                btn2 = new SimpleButton() { Text = "2",
                    Bounds = new Vector4(64, 78, 26, 22)
                },
                btn3 = new SimpleButton() { Text = "3",
                    Bounds = new Vector4(93, 78, 26, 22)
                },
                btnMinus = new SimpleButton() { Text = "-",
                    Bounds = new Vector4(122, 78, 26, 22)
                },
                btn1OverX = new SimpleButton() { Text = "1/x",
                    Bounds = new Vector4(151, 78, 26, 22)
                },
                btn0 = new SimpleButton() { Text = "0",
                    Bounds = new Vector4(36, 104, 26, 22)
                },
                btnplusOrNeg = new SimpleButton() { Text = "+/-",
                    Bounds = new Vector4(64, 104, 26, 22)
                },
                btnDot = new SimpleButton() { Text = ".",
                    Bounds = new Vector4(93, 104, 26, 22)
                },
                btnPlus = new SimpleButton() { Text = "+",
                    Bounds = new Vector4(122, 104, 26, 22)
                },
                btnEq = new SimpleButton() { Text = "=",
                    Bounds = new Vector4(151, 104, 26, 22)
                });

            btnClose.Style.Color = "red";
            btnClose.Style.FontWeight = "bold";

            Content.AppendChild(doc);
        }

        protected override void OnShowed()
        {
            base.OnShowed();
            if(InputControl == null)
                this.Close();

            btnEq.Focus();
        }
    }
}
