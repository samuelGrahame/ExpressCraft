using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class XMLBuilder
    {
        public static XMLControl Parse(string source)
        {
            //// what we need to do is create a ui from XML...
            //var parser = new DOMParser();
            //var xmlDoc = parser.parseFromString(source, "text/xml");

            //var baseform = xmlDoc.GetElementsByTagName("form");

            //if(baseform.Length == 1)
            //{
            //    var formXML = BuildControl(baseform[0], null);

            //    BuildUI(formXML, baseform[0].Children);

            //    return formXML;
            //}

            

            return null;
        }

        public static void BuildUI(XMLControl parent, HTMLCollection children)
        {
            //foreach(var child in children)
            //{
            //    BuildControl(child, parent);                
            //}
        }

        public static XMLControl BuildControl(HTMLElement element, XMLControl parent)
        {
            var xmlControl = new XMLControl();

           
            string tagName = element.tagName.ToLower();

            if(tagName == "form")
            {
                // parnet is ignored...
                xmlControl.Control = new Form();
            }
            else {
                xmlControl.Parent = parent;
            }
            BuildControlProperties(element, parent, xmlControl);

            return xmlControl;   
        }

        public static void BuildControlProperties(HTMLElement element, XMLControl parent, XMLControl control)
        {
            //var type = control.Control.GetType();
            //var props = type.GetProperties();

            //foreach(var attribute in element.Attributes)
            //{
            //    var nodeName = attribute.NodeName.ToLower();

            //    if(nodeName == "size")
            //    {
            //        if(attribute.NodeValue.Contains(","))
            //        {
            //            var value = attribute.NodeValue.Split(",");
            //            if(value.Length == 2)
            //            {
            //                control.Control.Size = new Vector2(value[0], value[1]);
            //            }
            //        }
                    
            //    }
            //    else if(nodeName == "location")
            //    {
            //        if(attribute.NodeValue.Contains(","))
            //        {
            //            var value = attribute.NodeValue.Split(",");
            //            if(value.Length == 2)
            //            {
            //                control.Control.Location = new Vector2(value[0], value[1]);
            //            }
            //        }
            //    }
            //    else if(nodeName == "bounds")
            //    {
            //        if(attribute.NodeValue.Contains(","))
            //        {
            //            var value = attribute.NodeValue.Split(",");
            //            if(value.Length == 4)
            //            {
            //                control.Control.Bounds = new Vector4(value[0], value[1], value[2], value[3]);
            //            }
            //        }
            //    }
            //    else if(nodeName == "x" || nodeName == "left")
            //    {
            //        control.Control.Left = attribute.NodeValue;

            //    }
            //    else if(nodeName == "y" || nodeName == "top")
            //    {
            //        control.Control.Top = attribute.NodeValue;
            //    }
            //    else if(nodeName == "width")
            //    {
            //        control.Control.Width = attribute.NodeValue;
            //    }
            //    else if(nodeName == "height")
            //    {
            //        control.Control.Height = attribute.NodeValue;
            //    }else
            //    {
            //        foreach(var item in props)
            //        {
            //            if(item.Name.ToLower() == nodeName)
            //            {
            //                item.SetValue(control.Control, attribute.NodeValue);
            //            }
            //        }
            //    }
            //}
        }
    }
}
