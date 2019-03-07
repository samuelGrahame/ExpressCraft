using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Retyped.dom;

namespace ExpressCraft
{
    public class Sheet : CanvasControl
    {
        //Row/Cell
        private List<List<SheetCell>> data = new List<List<SheetCell>>();
        private int ScrollColumnIndex;
        private int ScrollRowIndex;
        
        private List<SheetColumn> columns = new List<SheetColumn>();
        private List<SheetRow> rows = new List<SheetRow>();

        internal bool _inDataUpdate;

        public void RequestRefresh()
        {
            if(_inDataUpdate)
                return;
            Refresh();
        }

        public void BeginDataUpdate()
        {
            _inDataUpdate = true;
        }

        public void EndDataUpdate()
        {
            _inDataUpdate = false;
            Refresh();
        }

        public Sheet()
        {
            Style.backgroundColor = "white";
            Content.contentEditable = "true";
            Content.addEventListener("keydown", (e) => {
                var ev = e.As<KeyboardEvent>();

                if(ev.keyCode == 40)
                {
                    ScrollRowIndex++;
                    Refresh();
                }
                else if(ev.keyCode == 38)
                {
                    ScrollRowIndex--;
                    if(ScrollRowIndex < 0)
                        ScrollRowIndex = 0;
                    Refresh();
                }
                else if(ev.keyCode == 37)
                {
                    ScrollColumnIndex--;
                    if(ScrollColumnIndex < 0)
                        ScrollColumnIndex = 0;
                    Refresh();
                }
                else if(ev.keyCode == 39)
                {
                    ScrollColumnIndex++;
                    Refresh();
                }

            });            
        }

        private void increaseListBy<T>(IList<T> list, int count) where T : class
        {            
            for(int i = 0; i < count; i++)
            {
                list.Add(null);
            }
        }

        public SheetCell GetCell(int x, int y)
        {
            if(data == null)
            {
                data = new List<List<SheetCell>>();                
            }

            if(y >= data.Count)
            {
                increaseListBy(rows, y + 1 - rows.Count);
                increaseListBy(data, y + 1 - data.Count);                
            }

            if(data[y] == null)
            {
                data[y] = new List<SheetCell>();
            }

            if(x >= data[y].Count)
            {
                increaseListBy(columns, x + 1 - columns.Count);
                increaseListBy(data[y], x + 1 - data[y].Count);                
            }
            var value = data[y][x];
            if(value == null)
            {
                value = (data[y][x] = new SheetCell(this));
            }

            return value;
        }

        public SheetCell this[int x, int y]
        {
            get { return GetCell(x, y); }
        }

        public string GetColumnLetters(int column)
        {
            string col = "A";
            for(int i = 0; i < column; i++)
            {
                col = IncrementColumn(col);
            }
            return col;
        }

        public string IncrementColumn(string column)
        {
            List<char> columnChars = new List<char>(column.ToUpper().ToCharArray());

            int leftOver = 1;

            for(int i = columnChars.Count - 1; i >= 0; i--)
            {
                if((columnChars[i]++) == '[')
                {
                    columnChars[i] = 'A';
                }
                else
                {
                    leftOver = 0;
                    break;
                }
            }
            if(leftOver == 1)
            {
                columnChars.Insert(0, 'A');
            }
            return new string(columnChars.ToArray());
        }

        public override void OnPaint(Graphics graphics)
        {
            base.OnPaint(graphics);
            var g = graphics;

            // what we need to do is draw from x to x + (total next columns until larger then width)
            
            double widthSoFar = 45;
            double heightSoFar = 25;

            var defaultBorderColor = new Pen(new SolidBrush(Color.FromArgb(218, 218, 218)));
            var columnBorderColor = new Pen(new SolidBrush(Color.FromArgb(192, 192, 192)));
            // draw default borders...
            var columnHeader = new SolidBrush(Color.FromArgb(243, 243, 243));

            for(int x = ScrollColumnIndex; x < columns.Count; x++)
            {
                if(columns[x] == null)
                    columns[x] = new SheetColumn(this);
                var pre = widthSoFar;
                widthSoFar += columns[x].Width;

                // draw column
                g.FillRectangle(columnHeader, (float)pre, 0, columns[x].Width, 25);
                g.DrawRectangle(columnBorderColor, (float)pre, 0, columns[x].Width, 25);

                g.DrawString(GetColumnLetters(x), new Font("Arial 10pt"), new SolidBrush(Color.Black), (float)pre + (columns[x].Width / 2), 6, columns[x].Width, true, true);

                g.DrawLine(defaultBorderColor, (float)widthSoFar, 25, (float)widthSoFar, (float)Canvas.height);
            }            
            for(int y = ScrollRowIndex; y < rows.Count; y++)
            {
                if(rows[y] == null)
                    rows[y] = new SheetRow(this);
                var pre = heightSoFar;
                heightSoFar += rows[y].Height;

                g.FillRectangle(columnHeader, 0, (float)pre, 45, rows[y].Height);
                g.DrawRectangle(columnBorderColor, 0, (float)pre, 45, rows[y].Height);

                g.DrawString((y + 1).ToString(), new Font("Arial 10pt"), new SolidBrush(Color.Black), 23, (float)pre + (rows[y].Height / 2) - 6, 45, true, true);

                g.DrawLine(defaultBorderColor, 45, (float)heightSoFar, (float)Canvas.width, (float)heightSoFar);
            }

            widthSoFar = 45;
            heightSoFar = 25;            

            for(int x = ScrollColumnIndex; x < columns.Count; x++)
            {
                heightSoFar = 25;
                if(columns[x] == null)
                    columns[x] = new SheetColumn(this);

                var columnWidth = columns[x].Width;
                for(int y = ScrollRowIndex; y < rows.Count; y++)
                {
                    // render cell.
                    var cell = GetCell(x, y);

                    // draw style

                    var value = cell.Value;

                    if(value != null)
                    {
                        var displayValue = Convert.ToString(value);
                        if(!string.IsNullOrWhiteSpace(displayValue))
                        {
                            // get font from cell...
                            g.DrawString(displayValue, new Font("Arial 10pt"), new SolidBrush(Color.Black), widthSoFar + 2, heightSoFar + 2, columnWidth - 4);
                        }
                    }

                    if(rows[y] == null)
                        rows[y] = new SheetRow(this);

                    heightSoFar += rows[y].Height;
                    if(heightSoFar > Canvas.height)
                        break;
                }
                widthSoFar += columnWidth;
                if(widthSoFar > Canvas.width)
                    break;
            }            
        }
    }
}
