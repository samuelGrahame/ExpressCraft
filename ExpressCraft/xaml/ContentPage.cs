using Bridge;
using ExpressCraft;
using ExpressCraft.xaml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static Retyped.dom;

namespace Xamarin.Forms
{
    public class ContentPage : Form
    {
        static ContentPage()
        {
           
        }        

        public void InitializeComponent()
        {
            XAMLDefinitions.Load(this.GetType().Assembly);
            XAMLDefinitions.BuildUI(this);
        }
    }
}
