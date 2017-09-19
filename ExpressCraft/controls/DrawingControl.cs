using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class DrawingControl : CanvasControl
    {
        public List<Vector4> Lines = new List<Vector4>();
        private bool __mouseDown = false;
        private int __lastDrawn = 0;
        private Vector2 __currentCursor;

        public DrawingControl() : base()
        {
            ClassList.Add("inputcontrol");
            Style.BackgroundColor = "white";

            Content.OnMouseDown = (ev) =>
            {
                __mouseDown = true;
                __currentCursor = new Vector2(ev.LayerX, ev.LayerY);
                
                OnPaint();
            };
            Content.OnMouseMove = (ev) =>
            {
                if(__mouseDown)
                {
                    var np = new Vector2(ev.LayerX, ev.LayerY);
                    Lines.Add(new Vector4(__currentCursor, np));
                    __currentCursor = np;

                    OnPaint();
                }                
            };
            Content.OnMouseUp = (ev) =>
            {
                var np = new Vector2(ev.LayerX, ev.LayerY);
                if(np.Xi != __currentCursor.Xi || np.Yi != __currentCursor.Yi)
                {
                    Lines.Add(new Vector4(__currentCursor, np));
                }                               
                __mouseDown = false;

                OnPaint();
            };
        }

        public override void OnClear()
        {
            base.OnClear();
            __lastDrawn = 0;
            OnPaint();
        }

        public override void OnPaint()
        {
            int i = __lastDrawn;
            if(i < Lines.Count)
            {
                Context.BeginPath();

                for(; i < Lines.Count; i++)
                {

                    var v1 = Lines[i];

                    Context.MoveTo(v1.Xi, v1.Yi);
                    Context.LineTo(v1.Zi, v1.Mi);
                }

                Context.Stroke();
                __lastDrawn = i;
            }            
            
        }
    }
}
