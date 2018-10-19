using static Retyped.dom;
using System;
using static Retyped.jquery;

namespace ExpressCraft
{
    public class ComboBoxEdit : Control
    {
        public HTMLSelectElement ComboBoxBase;
        private double previousSelectedIndex = -1;

        public Action<ComboBoxEdit> SelectedIndexChanged = null;

        public ComboBoxEdit(params DataItem[] dataitems) : base("inputcontrol", ComboBoxTypes.Default)
        {
            ComboBoxBase = this.Content as HTMLSelectElement;

            this.Content.oncontextmenu = (ev) =>
            {
                ev.stopPropagation();
            };

            ComboBoxBase.onchange = (ev) =>
            {
                if(previousSelectedIndex != ComboBoxBase.selectedIndex)
                {
                    if(SelectedIndexChanged != null)
                        SelectedIndexChanged(this);

                    previousSelectedIndex = ComboBoxBase.selectedIndex;
                }
                ev.stopPropagation();
            };

            if(dataitems != null)
            {
                FillData(dataitems);
            }
        }

        public void FillData(params DataItem[] dataitems)
        {
            ComboBoxBase.Empty();            

            if(dataitems == null)
            {
                for(int i = 0; i < dataitems.Length; i++)
                {
                    ComboBoxBase.AppendChild(new HTMLOptionElement()
                    {
                        innerHTML = dataitems[i].Text,
                        value = dataitems[i].Value
                    });
                }
            }
        }

        public override void Render()
        {
            base.Render();
        }

        public string Text
        {
            get
            {
                if(ComboBoxBase.selectedIndex == -1)
                    return string.Empty;
                return ComboBoxBase.options[ComboBoxBase.selectedIndex].innerHTML;
            }
            set
            {
                for(int i = 0; i < ComboBoxBase.options.length; i++)
                {
                    if(ComboBoxBase.options[i].innerHTML == value)
                        ComboBoxBase.selectedIndex = i;
                }
                ComboBoxBase.selectedIndex = -1;
            }
        }

        public string Value
        {
            get
            {
                if(ComboBoxBase.selectedIndex == -1)
                    return string.Empty;
                return ComboBoxBase.options[ComboBoxBase.selectedIndex].value;
            }
            set
            {
                for(int i = 0; i < ComboBoxBase.options.length; i++)
                {
                    if(ComboBoxBase.options[i].value == value)
                        ComboBoxBase.selectedIndex = i;
                }
                ComboBoxBase.selectedIndex = -1;
            }
        }

        private bool enabled = true;

        public bool Enabled
        {
            get { return enabled; }
            set
            {
                enabled = value;
                this.Content.setAttribute("disabled", (!enabled).ToString());
            }
        }

        private bool _readonly = false;

        public bool Readonly
        {
            get { return _readonly; }
            set
            {
                _readonly = value;
                this.Content.setAttribute("readonly", (_readonly).ToString());
            }
        }
    }

    public class DataItem
    {
        public string Text;
        public string Value;

        public DataItem(string text, string value)
        {
            Text = text;
            Value = value;
        }

        public DataItem(string text)
        {
            Text = text;
            Value = text;
        }
    }
}