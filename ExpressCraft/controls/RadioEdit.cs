using static Retyped.dom;
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
                element.Content.setAttribute("name", defaultName);
                this.AppendChild(element);
                RadioElements.Add(element);
                element.ProcessRender();

                element.OnTextChanged = (sender) => {
                    if(OnCheckChanged != null)
                        OnCheckChanged(element);
                };

                if(RadioElements.Count == 1)
                {
                    element.Style.marginLeft = "0";
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
                        element.Content.setAttribute("name", defaultName);
                        
                        this.AppendChild(element);
                        RadioElements.Add(element);

                        element.ProcessRender();
                        if(RadioElements.Count == 1)
                        {
                            element.Style.marginLeft = "0";
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
                labelElement.removeAttribute("disabled");
                labelElement.style.color = "";
                labelElement.style.cursor = "pointer";
            }
            else
            {
                labelElement.setAttribute("disabled", "");
                labelElement.style.color = "grey";
                labelElement.style.cursor = "not-allowed";
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
            get { return  Content.As<HTMLInputElement>().@checked; }
            set { Content.As<HTMLInputElement>().@checked = value; }
        }

        public void ProcessRender()
        {
            if(!HasRendered) // call when added to element
                return;

            if(labelElement == null)
            {
                if(this.Content.parentElement != null)
                {
                    labelElement = new HTMLLabelElement();
                    labelElement.classList.add("control");
                    labelElement.style.marginLeft = "16px";
                    labelElement.style.textIndent = "0";
                    labelElement.style.left = "3px";
                    labelElement.htmlFor = this.Content.id;

                    labelElement.innerHTML = _caption;

                    if(this.Content.nextElementSibling == null)
                        this.Content.parentElement.appendChild(new HTMLBRElement());
                    else
                        this.Content.parentElement.insertBefore(new HTMLBRElement(), this.Content.nextElementSibling);

                    if(this.Content.nextElementSibling == null)
                        this.Content.parentElement.appendChild(labelElement);
                    else
                        this.Content.parentElement.insertBefore(labelElement, this.Content.nextElementSibling);
                }                
            }else
            {
                labelElement.innerHTML = _caption;
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

        public RadioElement() : base("radio")
        {
            RadioId++;
            if(RadioId > 20000)
                RadioId = 0;
            
            this.Content.id = "__radio_internal_" + RadioId.ToString() + "_rng_" + rng.Next(1, 1000).ToString();
            Style.marginLeft = "3px";
            Style.textIndent = "0";
            ClassList.remove("Control");
            ClassList.remove("inputcontrol");            
        }

        
    }
}
