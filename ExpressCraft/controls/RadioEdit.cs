using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class RadioEdit : Control
    {
        public List<RadioElement> RadioElements = new List<RadioElement>();
        private static long RadioId;
        private string defaultName = "";
        private static Random rng = new Random();
        public Action<RadioElement> OnCheckChanged;

        public RadioEdit() : base("inputcontrol popup")
        {
            RadioId++;
            if(RadioId > 20000)
                RadioId = 0;
             
            defaultName = "__radio_group_internal_" + RadioId.ToString() + "_rng_" + rng.Next(1, 1000);
        }
        
        public RadioElement SelectedRadioElement
        {
            get
            {
                var si = SelectedIndex;
                if(si == -1 || si >= RadioElements.Count)
                    return null;
                return RadioElements[si];
            }
        }

        public void AddItems(params string[] items)
        {
            if(items == null || items.Length == 0)
                return;
            foreach(var item in items)
            {
                AddElement(new RadioElement() { Caption = item });
            }
        }

        public int SelectedIndex
        {
            get {
                if(RadioElements == null || RadioElements.Count == 0)
                    return -1;
                int i = 0;
                foreach(var item in RadioElements)
                {
                    if(item.Checked)
                        return i;
                    i++;
                }
                return -1;
            }
            set {
                int i = 0;
                foreach(var item in RadioElements)
                {
                    if(i == value)
                        item.Checked = true;
                    else
                        item.Checked = false;
                    i++;
                }                
            }
        }


        public void AddElement(RadioElement element)
        {
            if(element != null && element.Content != null)
            {
                element.Content.SetAttribute("name", defaultName);
                this.AppendChild(element);
                RadioElements.Add(element);
                element.ProcessRender();

                element.OnTextChanged = (sender) => {
                    if(OnCheckChanged != null)
                        OnCheckChanged(element);
                };

                if(RadioElements.Count == 1)
                {
                    element.Style.MarginLeft = "0";
                }
            }
        }

        public void AddElements(params RadioElement[] elements)
        {
            if(elements != null)
            {
                foreach(var element in elements)
                {
                    if(element != null && element.Content != null)
                    {
                        element.Content.SetAttribute("name", defaultName);
                        
                        this.AppendChild(element);
                        RadioElements.Add(element);

                        element.ProcessRender();
                        if(RadioElements.Count == 1)
                        {
                            element.Style.MarginLeft = "0";
                        }                        
                    }
                }
            }         
        }
    }

    public class RadioElement : TextInput
    {
        public string _caption;
        public string Tag;

        public void ProcessIsEnabled()
        {
            if(labelElement == null)
                return;

            if(Enabled)
            {
                labelElement.RemoveAttribute("disabled");
                labelElement.Style.Color = "";
                labelElement.Style.Cursor = Cursor.Pointer;
            }
            else
            {
                labelElement.SetAttribute("disabled", "");
                labelElement.Style.Color = "grey";
                labelElement.Style.Cursor = Cursor.NotAllowed;
            }
        }

        public HTMLLabelElement labelElement = null;
        public string Caption
        {
            get { return _caption; }
            set {
                if(_caption != value)
                {
                    _caption = value;
                    ProcessRender();                    
                }
            }
        }

        public bool Checked
        {
            get { return  Content.As<HTMLInputElement>().Checked; }
            set { Content.As<HTMLInputElement>().Checked = value; }
        }

        public void ProcessRender()
        {
            if(!HasRendered) // call when added to element
                return;

            if(labelElement == null)
            {
                if(this.Content.ParentElement != null)
                {
                    labelElement = new HTMLLabelElement();
                    labelElement.ClassList.Add("control");
                    labelElement.Style.MarginLeft = "16px";
                    labelElement.Style.TextIndent = "0";
                    labelElement.Style.Left = "3px";
                    labelElement.HtmlFor = this.Content.Id;

                    labelElement.InnerHTML = _caption;

                    if(this.Content.NextElementSibling == null)
                        this.Content.ParentElement.AppendChild(new HTMLBRElement());
                    else
                        this.Content.ParentElement.InsertBefore(new HTMLBRElement(), this.Content.NextElementSibling);

                    if(this.Content.NextElementSibling == null)
                        this.Content.ParentElement.AppendChild(labelElement);
                    else
                        this.Content.ParentElement.InsertBefore(labelElement, this.Content.NextElementSibling);
                }                
            }else
            {
                labelElement.InnerHTML = _caption;
            }

            ProcessIsEnabled();
        }

        public override void Render()
        {
            HasRendered = true;
            
            base.Render();
        }

        private static long RadioId;
        private static Random rng = new Random();

        public RadioElement() : base(Bridge.Html5.InputType.Radio)
        {
            RadioId++;
            if(RadioId > 20000)
                RadioId = 0;
            
            this.Content.Id = "__radio_internal_" + RadioId.ToString() + "_rng_" + rng.Next(1, 1000).ToString();
            Style.MarginLeft = "3px";
            Style.TextIndent = "0";
            ClassList.Remove("Control");
            ClassList.Remove("inputcontrol");            
        }

        
    }
}
