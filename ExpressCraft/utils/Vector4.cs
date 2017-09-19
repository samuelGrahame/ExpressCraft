using Bridge;

namespace ExpressCraft
{
    public struct Vector4
    {
        public Union<string, int, float> X;
        public Union<string, int, float> Y;
        public Union<string, int, float> Z;
        public Union<string, int, float> M;

        public Vector4(Union<string, int, float> x, Union<string, int, float> y, Union<string, int, float> z, Union<string, int, float> m)
        {
            X = x;
            Y = y;
            Z = z;
            M = m;
        }

        public Vector4(Vector2 a, Vector2 b)
        {
            X = a.X;
            Y = a.Y;
            Z = b.X;
            M = b.Y;
        }

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

        public int Zi
        {
            get { return (int)Z; }
            set { Z = value; }
        }

        public int Mi
        {
            get { return (int)M; }
            set { M = value; }
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

        public float Zf
        {
            get { return (float)Z; }
            set { Z = value; }
        }

        public float Mf
        {
            get { return (float)M; }
            set { M = value; }
        }
    }
}