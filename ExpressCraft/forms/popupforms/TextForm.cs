using Bridge.Html5;
using Bridge.jQuery2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class TextForm : FormPopup
    {
        TextInput ReadInput;
        TextInput EditInput;
        SimpleButton btnDone;

        protected override void OnShowed()
        {
            base.OnShowed();

            string dataP = ReadInput.GetAttribute("data-placeholder");
            if(!string.IsNullOrWhiteSpace(dataP))
            {
                EditInput.SetAttribute("placeholder", dataP);
            }
            else
            {
                if(!string.IsNullOrWhiteSpace(ReadInput.GetAttribute("placeholder")))
                    EditInput.SetAttribute("placeholder", ReadInput.GetAttribute("placeholder"));
            }

            EditInput.Focus();
        }

        public TextForm(TextInput input) : base()
        {
            if(input.Content.ParentElement != null && input.Content.ParentElement.ParentElement != null)
            {
                PreviousScrollTop = input.Content.ParentElement.ParentElement.ScrollTop;
                ParentContainer = input.Content.ParentElement.ParentElement;
            }

            WindowState = WindowStateType.Maximized;

            ReadInput = input;

            if(ReadInput is MemoInput)
            {
                EditInput = new MemoInput();
            }
            else
            {
                EditInput = new TextInput(input.Type) { DisplayFormat = ReadInput.DisplayFormat };
                EditInput.OnKeyDown = (s, ev) => {
                    if(ev.KeyCode == 13)
                    {
                        btnDone.Content.Click();
                    }
                };
            }
            
            EditInput.Text = input.Text;
            EditInput.Style.FontSize = "14px";

            EditInput.DisableFocusPopup = true;
            EditInput.Size = new Vector2("(100% - 112px)", "100%");
            EditInput.Location = new Vector2(0, 0);

            btnDone = new SimpleButton() {
                Text = "&times;", Bounds = new Vector4("(100% - 106px)", "(50% - 22.5px)", 100, 45),
                ItemClick = (sender) => {                    
                    this.Close();
                    if(EditInput.GetEditValue() != ReadInput.GetEditValue())
                    {
                        ReadInput.Text = EditInput.Text;

                        if(ReadInput.IsSubmit)
                        {
                            dynamic e = jQuery.Event("keypress");
                            e.which = 13;
                            e.keyCode = 13;
                            jQuery.Select(ReadInput.Content).Trigger((jQueryEvent)e);
                        }
                        else if(ReadInput.GoNext)
                        {
                            var x = Document.QuerySelectorAll("input, textarea, button");
                            int tabPlus1 = ReadInput.Content.TabIndex + 1;
                            for(int i = 0; i < x.Length; i++)
                            {
                                if(x[i].As<HTMLElement>().TabIndex == tabPlus1)
                                {
                                    x[i].As<HTMLElement>().FocusElement();
                                    break;
                                }
                            }
                        }
                    }
                    
                }
            };

            btnDone.Style.BorderRadius = "4px";
            btnDone.ClassList.Add("primary");
            btnDone.Style.BorderWidth = "0";

            btnDone.Text = "&times;";
            btnDone.Style.FontSize = "26px";
            btnDone.Style.Color = "white";
            btnDone.Style.FontWeight = "bold";

            EditInput.OnTextChanged = (sender) =>
            {
                if(EditInput.GetEditValue() == ReadInput.GetEditValue())
                {
                    btnDone.Text = "&times;";
                    btnDone.Style.FontSize = "26px";                    
                    btnDone.Style.FontWeight = "bold";
                }
                else
                {
                    btnDone.Text = ReadInput.IsSubmit ? "Submit" : ReadInput.GoNext ? "Next" : "Done";
                    btnDone.Style.FontSize = "14px";                    
                    btnDone.Style.FontWeight = "";
                }
            };

            AppendChildren(EditInput, btnDone);                        
        }

        protected override void OnClosed()
        {
            ReadInput.Scroll(PreviousScrollTop, ParentContainer);
            base.OnClosed();
        }
    }
}
