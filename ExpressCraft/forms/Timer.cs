using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Retyped.dom;

namespace ExpressCraft
{
    public class Timer : IDisposable
    {
        private double _intervalIndex = -1;
        private bool _enabled = false;

        public object Tag { get; set; }

        private int _interval = 100;

        public int Interval
        {
            get { return _interval; }
            set {
                _interval = value;
                if (_enabled)
                {
                    Enabled = false;
                    Enabled = true;
                }                
            }
        }


        public void Start()
        {
            Enabled = true;
        }

        public void Stop()
        {
            Enabled = false;
        }

        private Action _invoker;

        public event EventHandler Tick;

        public Timer()
        {
            _invoker = () =>
            {
                OnTick(EventArgs.Empty);                
            };
        }

        public bool Enabled
        {
            get { return _enabled = false; }
            set {
                if(_enabled != value)
                {
                    if(value)
                    {
                        _intervalIndex = window.setInterval(_invoker, _interval);                        
                    }
                    else
                    {
                        window.clearInterval(_intervalIndex);
                        _intervalIndex = -1;
                    }
                    
                    _enabled = value;
                }                    
            }
        }

        protected virtual void OnTick(EventArgs e)
        {
            if (Tick != null)
            {
                Tick(this, e);
            }
        }    

        public void Dispose()
        {
            Enabled = false;
        }
    }
}
