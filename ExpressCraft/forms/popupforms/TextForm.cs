using static Retyped.dom;
using static Retyped.jquery;
using System;
using Retyped;
using Bridge;

namespace ExpressCraft
{
    public class TextForm : FormPopup
    {
        private TextInput ReadInput;
        private TextInput EditInput;
        private SimpleButton btnDone;

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
            if(input.Content.parentElement != null && input.Content.parentElement.parentElement != null)
            {
                PreviousScrollTop = input.Content.parentElement.parentElement.scrollTop;
                ParentContainer = input.Content.parentElement.parentElement;
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
                EditInput.OnKeyDown = (s, ev) =>
                {
                    if(ev.keyCode == 13)
                    {
                        btnDone.Content.click();
                    }
                };
            }

            EditInput.Text = input.Text;
            EditInput.Style.fontSize = "14px";

            EditInput.DisableFocusPopup = true;
            EditInput.Size = new Vector2("(100% - 112px)", "100%");
            EditInput.Location = new Vector2(0, 0);

            btnDone = new SimpleButton()
            {
                Text = "&times;",
                Bounds = new Vector4("(100% - 106px)", "(50% - 22.5px)", 100, 45),
                ItemClick = (sender) =>
                {
                    this.Close();
                    if(EditInput.GetEditValue() != ReadInput.GetEditValue())
                    {
                        ReadInput.Text = EditInput.Text;

                        if(ReadInput.IsSubmit)
                        {
                            dynamic jQuery2 = jQuery;                            
                            dynamic e = jQuery2.Event("keypress");
                            e.which = 13;
                            e.keyCode = 13;
                            jQuery.select((JQuery.TypeOrArray<Element>)ReadInput.Content).trigger(e);
                            //jQuery.select(ReadInput.Content).trigger((JQueryEventObject)e);
                        }
                        else if(ReadInput.GoNext)
                        {
                            var x = document.querySelectorAll("input, textarea, button");
                            int tabPlus1 = (int)ReadInput.Content.tabIndex + 1;
                            for(int i = 0; i < x.length; i++)
                            {
                                if(x[i].As<HTMLElement>().tabIndex == tabPlus1)
                                {
                                    x[i].As<HTMLElement>().FocusElement();
                                    break;
                                }
                            }
                        }
                    }
                }
            };

            btnDone.Style.borderRadius = "4px";
            btnDone.ClassList.add("primary");
            btnDone.Style.borderWidth = "0";

            btnDone.Text = "&times;";
            btnDone.Style.fontSize = "26px";
            btnDone.Style.color = "white";
            btnDone.Style.fontWeight = "bold";

            EditInput.OnTextChanged = (sender) =>
            {
                if(EditInput.GetEditValue() == ReadInput.GetEditValue())
                {
                    btnDone.Text = "&times;";
                    btnDone.Style.fontSize = "26px";
                    btnDone.Style.fontWeight = "bold";
                }
                else
                {
                    btnDone.Text = ReadInput.IsSubmit ? "Submit" : ReadInput.GoNext ? "Next" : "Done";
                    btnDone.Style.fontSize = "14px";
                    btnDone.Style.fontWeight = "";
                }
            };

            AppendChildren(EditInput, btnDone);
        }

        protected override void OnClosed()
        {
            ReadInput.Scroll((int)PreviousScrollTop, ParentContainer);
            ReadInput.ValidateData();
            base.OnClosed();
        }
    }
}