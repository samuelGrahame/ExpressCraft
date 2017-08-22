using Bridge.Html5;
using Bridge.jQuery2;
using System;

namespace ExpressCraft
{
    public class ComboBoxEdit : Control
    {
        public HTMLSelectElement ComboBoxBase;
        private int previousSelectedIndex = -1;

        public Action<ComboBoxEdit> SelectedIndexChanged = null;

        public ComboBoxEdit() : base("inputcontrol", ComboBoxTypes.Default)
        {
            ComboBoxBase = this.Content as HTMLSelectElement;

            this.Content.OnContextMenu = (ev) =>
            {
                ev.StopPropagation();
            };

            ComboBoxBase.OnChange = (ev) =>
            {
                if(previousSelectedIndex != ComboBoxBase.SelectedIndex)
                {
                    if(SelectedIndexChanged != null)
                        SelectedIndexChanged(this);

                    previousSelectedIndex = ComboBoxBase.SelectedIndex;
                }
                ev.StopPropagation();
            };
        }

        public void FillData(params DataItem[] dataitems)
        {
            jQuery.Select(ComboBoxBase).Empty();

            if(dataitems == null)
            {
                for(int i = 0; i < dataitems.Length; i++)
                {
                    ComboBoxBase.AppendChild(new HTMLOptionElement()
                    {
                        InnerHTML = dataitems[i].Text,
                        Value = dataitems[i].Value
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
                if(ComboBoxBase.SelectedIndex == -1)
                    return string.Empty;
                return ComboBoxBase.Options[ComboBoxBase.SelectedIndex].InnerHTML;
            }
            set
            {
                for(int i = 0; i < ComboBoxBase.Options.Length; i++)
                {
                    if(ComboBoxBase.Options[i].InnerHTML == value)
                        ComboBoxBase.SelectedIndex = i;
                }
                ComboBoxBase.SelectedIndex = -1;
            }
        }

        public string Value
        {
            get
            {
                if(ComboBoxBase.SelectedIndex == -1)
                    return string.Empty;
                return ComboBoxBase.Options[ComboBoxBase.SelectedIndex].Value;
            }
            set
            {
                for(int i = 0; i < ComboBoxBase.Options.Length; i++)
                {
                    if(ComboBoxBase.Options[i].Value == value)
                        ComboBoxBase.SelectedIndex = i;
                }
                ComboBoxBase.SelectedIndex = -1;
            }
        }

        private bool enabled = true;

        public bool Enabled
        {
            get { return enabled; }
            set
            {
                enabled = value;
                this.Content.SetAttribute("disabled", (!enabled).ToString());
            }
        }

        private bool _readonly = false;

        public bool Readonly
        {
            get { return _readonly; }
            set
            {
                _readonly = value;
                this.Content.SetAttribute("readonly", (_readonly).ToString());
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