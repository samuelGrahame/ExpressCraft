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
}
