using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	[Namespace(true)]
	public class RibbonButton : Control
	{
		private string _icon = "";
		public string Icon { get {
				return _icon;
			} set {				
				if(_icon != value)
				{
					_icon = value;
					ProcessImage();
				}
			}
		}
		private string _iconURL = "";
		public string IconURL
		{
			get
			{
				return _iconURL;
			}
			set
			{
				if(_iconURL != value)
				{
					_iconURL = value;
					ProcessImage();
				}
			}
		}
		private string _caption = "";
		public string Caption
		{
			get
			{
				return _caption;
			}
			set
			{
				if(_caption != value)
				{
					_caption = value;
					ProcessCaption();
				}
			}
		}
		
		public bool BeginGroup = false;
		public readonly bool IsSmallCaption = false;		

		public Action<RibbonButton> OnItemClick;

		private bool enabled = true;

		private HTMLDivElement captionDiv = null;
		private HTMLDivElement imageDiv = null;
		
		public void setEnabled(bool value)
		{
			ChangeState(value);
			if(value)
			{				
				if(imageDiv != null)
				{
					imageDiv.ClassList.Remove("disabled");					
				}
				if(captionDiv != null)
				{
					captionDiv.ClassList.Remove("disabled");
				}
			}
			else
			{				
				if(imageDiv != null)
				{
					imageDiv.ClassList.Add("disabled");					
				}
				if(captionDiv != null)
				{
					captionDiv.ClassList.Add("disabled");
				}
			}
		}

		public bool Enabled { get {
				return enabled;
			} set {
				enabled = value;
				setEnabled(value);
			}
		}
		
		public RibbonButton(string caption = "", bool _isSmallCaption = false) : base(_isSmallCaption ? "ribbonbuttonsmall" : "ribbonbutton")
		{
			Caption = caption;
			IsSmallCaption = _isSmallCaption;
		}

		public override void Render()
		{
			HasRendered = true;
			
			Content.OnClick = (ev) => {
				if(enabled && OnItemClick != null)
					OnItemClick(this);
				ev.StopPropagation();				
			};

            ProcessCaption();
            ProcessImage();
            
            setEnabled(enabled);
		}

		public void ProcessCaption()
		{
            if(captionDiv != null)
            {
                captionDiv.Remove();
                captionDiv = null;
            }
			if(!string.IsNullOrWhiteSpace(Caption))
			{
				captionDiv = Div(IsSmallCaption ? "ribbonbuttonsmallcaption" : "ribbonbuttoncaption");

				captionDiv.InnerHTML = Caption;

				Content.AppendChild(captionDiv);
			}
		}

		public void ProcessImage()
		{
			if(imageDiv == null)
			{
				if(!string.IsNullOrWhiteSpace(Icon))
				{
					imageDiv = Div(IsSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
					imageDiv.Style.Background = GetImageString(Icon);                    
				}
				else if(!string.IsNullOrWhiteSpace(IconURL))
				{
					imageDiv = Div(IsSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
					imageDiv.Style.Background = GetImageStringURI(IconURL);					
				}

                Content.AppendChild(imageDiv);
            }
			else
			{
				if(!string.IsNullOrWhiteSpace(Icon))
				{					
					imageDiv.Style.Background = GetImageString(Icon);
				}
				else if(!string.IsNullOrWhiteSpace(IconURL))
				{					
					imageDiv.Style.Background = GetImageStringURI(IconURL);
				}
			}

			if(imageDiv != null)
			{
				imageDiv.Style.BackgroundSize = "100% 100%";				

				if(captionDiv != null && IsSmallCaption)
					captionDiv.Style.Left = "28px";
			}
			else
			{
				if(captionDiv != null && IsSmallCaption)
					captionDiv.Style.Left = "6px";
			}
		}
	}
}
