using static Retyped.dom;
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
            ClassList.add("inputcontrol");
            Style.backgroundColor = "white";
            
            if(Helper.NotDesktop)
            {
                Content.ontouchstart = (ev) =>
                {
                    dynamic ev2 = ev;
                    __mouseDown = true;
                    __currentCursor = new Vector2(ev2.layerX, ev2.layerY);

                    OnPaint();
                };
                Content.ontouchmove = (ev) =>
                {
                    dynamic ev2 = ev;
                    if(__mouseDown)
                    {
                        var np = new Vector2(ev2.layerX, ev2.layerY);
                        Lines.Add(new Vector4(__currentCursor, np));
                        __currentCursor = np;

                        OnPaint();
                    }
                };
                Content.ontouchend = (ev) =>
                {
                    dynamic ev2 = ev;
                    var np = new Vector2(ev2.layerX, ev2.layerY);
                    if(np.Xi != __currentCursor.Xi || np.Yi != __currentCursor.Yi)
                    {
                        Lines.Add(new Vector4(__currentCursor, np));
                    }
                    __mouseDown = false;

                    OnPaint();
                }; 
            }
            else
            {
                Content.onmousedown = (ev) =>
                {
                    dynamic ev2 = ev;
                    __mouseDown = true;
                    __currentCursor = new Vector2(ev2.layerX, ev2.layerY);

                    OnPaint();
                };
                Content.onmousemove = (ev) =>
                {
                    if(__mouseDown)
                    {
                        dynamic ev2 = ev;
                        var np = new Vector2(ev2.layerX, ev2.layerY);
                        Lines.Add(new Vector4(__currentCursor, np));
                        __currentCursor = np;

                        OnPaint();
                    }
                };
                Content.onmouseup = (ev) =>
                {
                    dynamic ev2 = ev;
                    var np = new Vector2(ev2.layerX, ev2.layerY);
                    if(np.Xi != __currentCursor.Xi || np.Yi != __currentCursor.Yi)
                    {
                        Lines.Add(new Vector4(__currentCursor, np));
                    }
                    __mouseDown = false;

                    OnPaint();
                }; 
            }

            
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
                Context.beginPath();

                for(; i < Lines.Count; i++)
                {

                    var v1 = Lines[i];

                    Context.moveTo(v1.Xi, v1.Yi);
                    Context.lineTo(v1.Zi, v1.Mi);
                }

                Context.stroke();
                __lastDrawn = i;
            }            
            
        }
    }
}
