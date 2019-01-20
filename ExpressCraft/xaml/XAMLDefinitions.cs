using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using static Retyped.dom;

namespace ExpressCraft.xaml
{
    public class XAMLDefinitions
    {
        public static bool HasLoaded;
        public static Dictionary<string, string> XAMLFiles = new Dictionary<string, string>();

        public static void BuildUI(ContentPage page)
        {
            if(!HasLoaded)
                return;

            var fileName = page.GetType().Name.ToLower() + ".xaml";

            if(XAMLFiles.ContainsKey(fileName))
            {
                var file = XAMLFiles[fileName];

                var xmlDoc = new DOMParser();
                var document = xmlDoc.parseFromString(file, "text/xml");
                
                ApplyDocument(page, document.documentElement, 
                    page.GetType().GetMethods(BindingFlags.NonPublic | BindingFlags.Instance), page, true);            
            }
        }

        private static string GetNamespace(string namespaceURI)
        {            
            if(string.IsNullOrWhiteSpace(namespaceURI) || !namespaceURI.Contains("clr-namespace:") || !namespaceURI.Contains(";"))
                return namespaceURI;
            return namespaceURI.Replace("clr-namespace:", "").Split(';').FirstOrDefault();            
        }

        private static void ApplyDocument(Control control, Element element, MethodInfo[] pageMethods, ContentPage Page, bool parent = false)
        {
            Control child = null;
            if(!parent)
            {
                string x = GetNamespace(element.namespaceURI);
                if(string.IsNullOrWhiteSpace(x))
                {
                    x = element.tagName;

                }else
                {
                    x = x + "." + element.tagName;
                }
                child = Activator.CreateInstance(Type.GetType(x)).As<Control>();
            }else
            {
                child = control;
            }
            var fields = child.GetType().GetFields();
            var props = child.GetType().GetProperties();
            
            var events = child.GetType().GetEvents();
            //TODO CACHE MethodInfos.
            // CACHE DomParser.
            for(uint i = 0; i < element.attributes.length; i++)
            {
                try
                {
                    var attribute = element.attributes[i];
                    bool found = false;
                    for(int j = 0; j < fields.Length; j++)
                    {
                        if(fields[j].Name == attribute.nodeName)
                        {
                            fields[j].SetValue(child, attribute.value);
                            found = true;
                            break;
                        }
                    }

                    if(!found)
                    {
                        for(int j = 0; j < props.Length; j++)
                        {
                            if(props[j].Name == attribute.nodeName)
                            {
                                props[j].SetValue(child, attribute.value);
                                found = true;
                                break;
                            }
                        }
                    }
                    if(!found && !string.IsNullOrWhiteSpace(attribute.nodeName))
                    {
                        for(int j = 0; j < events.Length; j++)
                        {
                            if(events[j].Name == attribute.nodeName)
                            {
                                for(int jj = 0; jj < pageMethods.Length; jj++)
                                {
                                    if(pageMethods[jj].Name == attribute.value)
                                    {                                        
                                        events[j].AddEventHandler(child, pageMethods[jj].CreateDelegate(Page));
                                        

                                        ////                            Delegate handler =
                                        ////Delegate.CreateDelegate(eventInfo.EventHandlerType,
                                        ////                        p,
                                        ////                        methodInfo);
                                        ////                            eventInfo.AddEventHandler(p, handler);

                                        //events[j].AddEventHandler(child, (pageMethods[jj].CreateDelegate()));
                                        break;
                                    }
                                }                                
                                break;
                            }
                        }
                    }
                }
                catch(Exception)
                {
                    
                }
                
            }

            if(element.childElementCount > 0)
            {
                for(uint i = 0; i < element.childElementCount; i++)
                {
                    ApplyDocument(child, element.children[i], pageMethods, Page, false);
                }
            }

            if(!parent)
            {
                control.Add(child);
            }            
        }

        public static void Load(Assembly ass)
        {
            if(HasLoaded)
                return;

            try
            {
                //System.Console.WriteLine(ass.FullName);

                foreach(var item in ass.GetManifestResourceNames())
                {
                    if(!item.ToLower().EndsWith(".xaml"))
                        continue;
                    //System.Console.WriteLine(item);
                    var doc = window.atob(ass.GetManifestResourceDataAsBase64(item));
                    if(doc.StartsWith("ï»¿"))
                    {
                        doc = doc.Substring("ï»¿".Length);
                    }
                    //System.Console.WriteLine(doc);
                    string name = item;
                    if(name.StartsWith(ass.FullName + "."))
                        name = name.Substring(ass.FullName.Length + 1);
                    XAMLFiles[name.ToLower()] = doc;                    
                }
            }
            catch(Exception)
            {
                
            }
                        
            HasLoaded = true;
        }
    }    
}
