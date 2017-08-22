using Bridge;

namespace ExpressCraft
{
    public struct Vector2
    {
        public Union<string, int, float> X;
        public Union<string, int, float> Y;

        public int Xi
        {
            get { return (int)X; }
            set { X = value; }
        }

        public int Yi
        {
            get { return (int)Y; }
            set { Y = value; }
        }

        public float Xf
        {
            get { return (float)X; }
            set { X = value; }
        }

        public float Yf
        {
            get { return (float)Y; }
            set { Y = value; }
        }

        /// <summary>
        /// adds calc to (100% - 50px) turns to calc(100% - 50px)
        /// </summary>
        /// <param name="a"></param>
        /// <returns></returns>
        internal static string pf(string a)
        {
            return !string.IsNullOrWhiteSpace(a) && a.StartsWith("(") && a.EndsWith(")") ? "calc" + a : a;
        }

        public Vector2(Union<string, int, float> x, Union<string, int, float> y)
        {
            X = x;
            Y = y;
        }
    }
}