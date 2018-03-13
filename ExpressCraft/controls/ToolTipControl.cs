using static Retyped.dom;
using System.Text;
using static Retyped.jquery;

namespace ExpressCraft
{
    internal class ToolTipControl : Control
    {
        private bool visible = false;
        private ToolTip _toolTip;

        public ToolTipControl(ToolTip toolTip) : base("tool-tip")
        {
            _toolTip = toolTip;
        }

        public void Show(MouseEvent ev)
        {
            if(Helper.NotDesktop)
                return;

            this.Content.Empty();

            if(_toolTip != null)
            {
                if(!_toolTip.Heading.IsEmpty())
                {
                    this.Content.AppendChild(new HTMLParagraphElement() { className = "tool-tip-heading", innerHTML = _toolTip.Heading.HtmlEscape().Replace("\r\n", "<br>") });
                }
                if(!_toolTip.Description.IsEmpty())
                {
                    this.Content.AppendChild(new HTMLParagraphElement() { className = "tool-tip-body", innerHTML = _toolTip.Description.HtmlEscape().Replace("\r\n", "<br>") });
                }
            }
            var mouse = Helper.GetClientMouseLocation(ev);

            this.Location = new Vector2(mouse.X, mouse.Y.ToInt() + 22);

            if(!visible)
            {
                visible = true;
                ContextMenu.TotalContextHandles++;
                Content.style.zIndex = (ContextMenu.TotalContextHandles + Settings.ContextMenuStartingZIndex).ToString();
                document.body.AppendChild(this);
            }
        }

        public void Close()
        {
            if(visible)
            {
                if(this.Content != null)
                {
                    jQuery.select(this.Content).fadeOut(100, () =>
                    {
                        this.Content.Delete();
                    });
                }
                visible = false;
                ContextMenu.TotalContextHandles--;
            }
        }
    }

    public class ToolTip
    {
        public string Description;
        public string Heading;

        public Control AttachedControl;

        public ToolTip(string content)
        {
            Description = content;
        }

        public ToolTip(string heading, string description)
        {
            Description = description;
            Heading = heading;
        }

        public int GetWordCount()
        {
            var fullContent = string.Concat(Heading, " ", Description).Trim();
            var length = fullContent.Length;
            char prevChar = '\0';
            var builder = new StringBuilder();
            char current;
            int WordCount = 1;
            for(int i = 0; i < length; i++)
            {
                current = fullContent[i];
                if(char.IsWhiteSpace(current))
                {
                    if(char.IsWhiteSpace(prevChar))
                    {
                        prevChar = current;
                        continue;
                    }
                    else
                    {
                        WordCount++;
                    }
                }
                prevChar = current;
            }
            return WordCount;
        }
    }
}