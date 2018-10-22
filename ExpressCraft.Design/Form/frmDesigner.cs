using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft.Design
{
    public class frmDesigner : Form
    {
        public Form DesigningForm = null;


        public frmDesigner()
        {
            ShowClose = false;
            Text = "ExpressCraft Form Designer";
            WindowState = WindowStateType.Maximized;

            this.Body.style.backgroundColor = "rgb(240, 240, 240)!important";

            var leftToolbarSplitter = new SplitControlContainer();
            leftToolbarSplitter.Content.style.border = "0";
            leftToolbarSplitter.SplitterPosition = 250;
            leftToolbarSplitter.SetBoundsFull();

            var gridview = new GridView(true, true);
            gridview.Bounds = new Vector4(0,0, "(100% - 2px)", "(100% - 2px)");
            gridview.Content.style.border = "0";
            gridview.ShowFindPanel();

            var dt = new DataTable();
            dt.AddColumn("Name", DataType.String);
            dt.AddColumn("Type", DataType.Object);

            foreach (var item in typeof(Control).Assembly.GetTypes().Where((o) => o.BaseType == typeof(Control) && o != typeof(Form)))
            {
                var dr = dt.NewRow();
                var type = item;
                dr[0] = item.Name;
                dr[1] = type;
            }

            dt.AcceptNewRows();

            gridview.DataSource = dt;
            gridview.GetGridViewColumnByFieldName("Type").Visible = false;
            gridview.GetGridViewColumnByFieldName("Name").AllowEdit = false;
            gridview.UseEditForm = false;

            leftToolbarSplitter.Panel1.AppendChild(gridview);

            this.LinkResize(gridview);

            this.LinkResize(leftToolbarSplitter, true);

            var rightToolbarSplitter = new SplitControlContainer();
            rightToolbarSplitter.Content.style.border = "0";
            rightToolbarSplitter.FixedSplitterPostion = FixedSplitterPosition.Panel2;
            rightToolbarSplitter.SplitterPosition = 250;
            rightToolbarSplitter.SetBoundsFull();

            DesigningForm = new Form();
            DesigningForm.Size = new Vector2(640, 480);
            DesigningForm.Content.style.margin = "10px";
            DesigningForm.AllowMoveChange = false;
            DesigningForm.AllowSizeChange = false;
            DesigningForm.ShowClose = false;
            DesigningForm.ShowMaximize = false;
            DesigningForm.ShowMinimize = false;
            DesigningForm.Location = new Vector2(0, 0);
            DesigningForm.Text = "Form1";

            rightToolbarSplitter.Panel1.AppendChild(DesigningForm);


            leftToolbarSplitter.Panel2.AppendChild(rightToolbarSplitter);

            this.LinkResize(rightToolbarSplitter, false);

            var rightMiddleToolbarSplitter = new SplitControlContainer();
            rightMiddleToolbarSplitter.Content.style.border = "0";
            rightMiddleToolbarSplitter.Horizontal = true;
            rightMiddleToolbarSplitter.FixedSplitterPostion = FixedSplitterPosition.Panel1;
            rightMiddleToolbarSplitter.SplitterPosition = 250;
            rightMiddleToolbarSplitter.SetBoundsFull();

            rightToolbarSplitter.Panel2.AppendChild(rightMiddleToolbarSplitter);

            this.LinkResize(rightMiddleToolbarSplitter, false);
        }
    }
}
