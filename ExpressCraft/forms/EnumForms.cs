using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
	public enum WindowState
	{
		Normal,
		Minimized,
		Maximized
	}

	public enum FormStartPosition
	{
		Manual,
		Center,
		WindowsDefaultLocation
	}

	public enum MouseMoveAction
	{
		None,
		Move,
		TopLeftResize,
		LeftResize,
		BottomLeftResize,
		BottomResize,
		BottomRightResize,
		RightResize,
		TopResize,
		TopRightResize
	}

	public enum FormButtonType
	{
		Close,
		Maximize,
		Minimize,
		Restore,
		Help
	}

	public enum GoogleCloudPrintingMimeType
	{
		Url,
		DataUrl,
		Google_Drawing,
		Google_Drive,
		Google_Kix,
		Google_Mail,
		Google_Presentation,
		Google_Spreadsheet
	}

	public enum FixedSplitterPosition
	{		
		Panel1,
		Panel2,
		None
	}

//	"url"	URL to be printed
//"dataUrl"	Content of a URL data document as a string
//"google.drawing"	Document ID of a Google Drawing
//"google.drive"	ID of a file in a user's Google Drive
//"google.kix"	ID of a Google Document
//"google.mail"	ID of a Gmail thread
//"google.presentation"	ID of a Google Presentation
//"google.spreadsheet"	ID of a Google Spreadsheet
}
