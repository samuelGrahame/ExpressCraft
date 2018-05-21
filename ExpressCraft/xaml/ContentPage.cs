using ExpressCraft;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Xamarin.Forms
{
    public class ContentPage : Form
    {
        static ContentPage()
        {
            foreach(var item in Assembly.GetExecutingAssembly().GetManifestResourceNames())
            {
                Console.WriteLine(item);
            } 
        }

        public ContentPage() : base()
        {
            InitializeComponent();
        }

        public void InitializeComponent()
        {            
            foreach(var item in this.GetType().Assembly.GetManifestResourceNames())
            {
                Console.WriteLine(item);
            }
        }
    }
}
