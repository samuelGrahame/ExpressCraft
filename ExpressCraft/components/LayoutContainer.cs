using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ExpressCraft
{
    public class LayoutContainer
    {
        public List<LayoutColumn> Columns = new List<LayoutColumn>();
        public int ColumnWidth;
        public int ControlMargin;
        private bool appliedLayout = false;
        public int ButtinWidth = 73;
        public List<LayoutControl> Controls = new List<LayoutControl>();
        public List<LayoutControl> ControlEditable = new List<LayoutControl>();

        public void AddInput(string linkField, TextInput input)
        {
            var cl = new LayoutControl(linkField, input);
            Controls.Add(cl);
            if(!input.Readonly)
            {
                ControlEditable.Add(cl);
            }
        }

        public static int TabIndex = 2;

        public bool AppliedLayout()
        {
            return appliedLayout;
        }

        public LayoutControl GetControl(string name, bool allowReadonly = false)
        {
            name = name.ToLower();
           
            if(allowReadonly)
            {
                for(int i = 0; i < Controls.Count; i++)
                {
                    if(Controls[i].LinkFieldName.ToLower() == name)
                    {
                        return Controls[i];
                    }
                }
            }else
            {
                for(int i = 0; i < ControlEditable.Count; i++)
                {
                    if(ControlEditable[i].LinkFieldName.ToLower() == name)
                    {
                        return ControlEditable[i];
                    }
                }
            }

            return null;
        }

        public string GetText(string name, bool allowReadyOnly = false)
        {
            return GetControl(name, allowReadyOnly)?.Input?.Text;
        }

        public object GetEditValue(string name, bool allowReadyOnly = false)
        {
            return GetControl(name, allowReadyOnly)?.Input?.GetEditValue();
        }

        public void SetText(string name, string value, bool allowReadyOnly = false)
        {
            var input = GetControl(name, allowReadyOnly)?.Input;
            if(input != null)
                input.Text = value;
        }

        public void Focus()
        {
            if(Helper.NotDesktop)
                return;
            if(Controls == null || Controls.Count == 0)
                return;
            var input = Controls.FirstOrDefault().Input;
            var x = input.GetInput();

            if(x != null)
            {
                x.FocusElement();
            }
            else
            {
                input.Content.FocusElement();
            }
        }

        public LayoutContainer(int columnWidth = 500, int controlMargin = 6, params LayoutColumn[] columns)
        {
            ColumnWidth = columnWidth;
            ControlMargin = controlMargin;

            if(columns != null && columns.Length > 0)
                Columns.AddRange(columns);
        }

        public LayoutContainer(int columnWidth = 500, int controlMargin = 6, int buttonWidth = 73, params LayoutColumn[] columns)
        {
            ColumnWidth = columnWidth;
            ControlMargin = controlMargin;
            ButtinWidth = buttonWidth;

            if(columns != null && columns.Length > 0)
                Columns.AddRange(columns);
        }

        public LayoutContainer(params LayoutColumn[] columns)
        {
            ColumnWidth = 500;
            ControlMargin = 6;

            if(columns != null && columns.Length > 0)
                Columns.AddRange(columns);
        }

        public string CreateLoadSQL()
        {
            var builderSQL = new StringBuilder();

            int length = Controls.Count;
            for(int i = 0; i < length; i++)
            {
                if(Controls[i] == null || Controls[i].Input == null || string.IsNullOrWhiteSpace(Controls[i].LinkFieldName))
                    continue;
                builderSQL.Append("`" + Controls[i].LinkFieldName + "`, ");

                var control = Controls[i];

                if(control.Input is SearchInput)
                {
                    var search = control.Input.As<SearchInput>();

                    var editValue = (search.EditValue + "");
                    if(search.DisplayMember == search.ValueMember || search.ValueMember == null)
                    {
                        // documentTransaction.AddCombo(control.LinkFieldName,
                        //search.Text, search.Text);
                    }
                    else
                    {
                        // long editv = 0;
                        // long.TryParse(editValue, out editv);

                        // documentTransaction.AddCombo(control.LinkFieldName,
                        //editv, search.Text);
                    }

                    continue;
                }
                else if(control.Input.Controller != null)
                {
                    if(control.Input.Controller is CheckEdit)
                    {
                        //documentTransaction.AddBoolean(control.LinkFieldName, (control.Input.Controller.As<CheckEdit>().Checked));

                        continue;
                    }
                }

                if(control.Input.IsNumericType())
                {
                    //var dec = control.Input.GetNumberValue();

                    //documentTransaction.AddNumer(control.LinkFieldName,
                    //dec);
                }
                else if(control.Input.IsDateType())
                {
                    //var date = control.Input.GetDateTime();

                    //documentTransaction.AddDate(control.LinkFieldName,
                    //date);
                }
                else
                {
                    //documentTransaction.AddString(control.LinkFieldName,
                    //control.Input.Text);
                }
            }

            return builderSQL.ToString();
        }

        public void ApplyReadOnly(bool documentreadonly)
        {
            int length = ControlEditable.Count;
            for(int i = 0; i < length; i++)
            {
                ApplyReadOnlyOnControl(documentreadonly, ControlEditable[i].Input);
            }
        }

        protected void ApplyReadOnlyOnControl(bool documentreadonly, TextInput input)
        {
            if(input.Controller != null)
            {
                if(input.Controller is CheckEdit)
                {
                    input.Enabled = !documentreadonly;
                }
            }
            else
            {
                if(input is TextInputDropDown)
                {
                    input.As<TextInputDropDown>().GetInput().ReadOnly = documentreadonly;
                }
                input.Readonly = documentreadonly;
            }
        }

        public virtual void OnControlCreated(LayoutControl Control)
        {
        }

        public void Apply(Control parent, bool documentreadonly = false)
        {
            if(parent == null)
                throw new ArgumentNullException();

            if(appliedLayout)
                return;
            appliedLayout = true;

            int leftMargin = 10;
            int topMargin = 5;

            int leftLabel = 15;

            int currentLeft = leftMargin;
            int AppendX = 0;
            int AppendY = 0;

            int EditStartX = 125;

            if(Helper.NotDesktop)
            {
                EditStartX = 15;
            }

            
            int XIncrement = leftMargin + ColumnWidth;

            int inputHeight;
            if(Helper.NotDesktop)
            {
                ButtinWidth = 0;
                inputHeight = 45;
            }
            else
            {
                inputHeight = 20;
            }
            int GroupLabelIncrement = ControlMargin + (Helper.NotDesktop ? (inputHeight - 30) : (inputHeight - 4));
            int RowIncrement = inputHeight + ControlMargin;

            int TinyLabelIncrement = inputHeight - 8;

            foreach(var column in Columns)
            {
                var autoDiv = new Control();
                float y = topMargin;
                if(Helper.NotDesktop)
                {
                    autoDiv.Width = "(100% - 12px)";
                    autoDiv.Top = AppendY;
                }
                else
                {
                    autoDiv.Top = y;
                    autoDiv.Width = ColumnWidth;
                }
                autoDiv.Left = AppendX;

                var docFragment = Document.CreateDocumentFragment();

                var groups = column.Groups;

                foreach(var group in groups)
                {
                    if(!string.IsNullOrWhiteSpace(group.GroupLabel))
                    {
                        var label = Control.Label(group.GroupLabel, currentLeft, y, true);
                        if(Helper.NotDesktop)
                        {
                            label.Style.FontSize = "14px";
                        }
                        docFragment.AppendChild(label);
                        y += GroupLabelIncrement;
                    }
                    var rows = group.Rows;

                    foreach(var row in rows)
                    {
                        if(row is LayoutRowControl)
                        {
                            float height = row.As<LayoutRowControl>().Height;

                            var control = row.As<LayoutRowControl>().Control;

                            if(control != null)
                            {
                                control.Height = height;
                                control.Left = currentLeft + leftLabel;                                
                                control.Top = y;

                                if(Helper.NotDesktop)
                                {
                                    control.Width = "(100% - " + (currentLeft + (leftLabel * 2.0f)) + "px)";                                    
                                }
                                else
                                {
                                    control.Width = ColumnWidth - currentLeft - (leftLabel);
                                }

                                docFragment.AppendChild(control);

                                y += ControlMargin;
                            }

                            y += height;
                            
                            continue;
                        }

                        if(!string.IsNullOrWhiteSpace(row.Label))
                        {
                            var label = Control.Label(row.Label, currentLeft + leftLabel + (float)row.Offset, y, false);
                            if(Helper.NotDesktop)
                            {
                                label.Style.FontSize = "12px";
                                y += GroupLabelIncrement - 5;
                            }
                            docFragment.AppendChild(label);
                        }

                        if(row is LayoutRowGap)
                        {
                            y += row.As<LayoutRowGap>().Height;
                            continue;
                        }                                                

                        if(row.Button != null && !Helper.NotDesktop)
                        {
                            row.Button.Location = new Vector2(ColumnWidth - ButtinWidth + 6, y);
                            row.Button.Width = ButtinWidth;
                            docFragment.AppendChild(row.Button);
                        }

                        var controls = row.Controls;
                        bool HasTinyLabel = false;

                        if(controls.Count > 0)
                        {
                            decimal TotalPercent = 0;

                            TotalPercent = 0;
                            int AddWidth = 0;
                            foreach(var control in controls)
                            {
                                if(control.Percent > 1.0m || control.Percent <= 0.0m)
                                    control.Percent = 1.0m;

                                TotalPercent += control.Percent;

                                if(TotalPercent > 1.0m)
                                {
                                    if(control.Input is MemoInput)
                                    {
                                        y += control.Input.Height.ToInt() + ControlMargin;
                                    }
                                    else
                                    {
                                        y += RowIncrement;
                                    }

                                    if(row.NoGap)
                                        y -= ControlMargin + 1;

                                    if(HasTinyLabel)
                                    {
                                        y += TinyLabelIncrement;
                                        HasTinyLabel = false;
                                    }

                                    TotalPercent -= 1.0m;
                                    AddWidth = 0;
                                }
                                float Add = (currentLeft + AddWidth + EditStartX + ButtinWidth + (float)row.Offset);
                                string o100Percent = "((100% - " + Add.ToPx() + ") * " + (TotalPercent - control.Percent) + ")";
                                string o100Percent2 = "(100% - " + Add.ToPx() + ")";

                                Union<string, int, float> width = "(" + o100Percent2 + " * " + control.Percent + ")";
                                Vector2 loc = new Vector2("(" + o100Percent + " + " + (Add - ButtinWidth).ToPx() + ")", y);
                                if(!row.NoGap)
                                {
                                    AddWidth += 6;
                                }

                                if(control.Input.Controller != null)
                                {
                                    control.Input.Controller.Width = width;
                                    control.Input.Controller.Location = loc;
                                    control.Input.Content.TabIndex = TabIndex;
                                    control.Input.ClassList.Remove("control");
                                    if(control.Input.Controller is CheckEdit)
                                    {
                                        var span = control.Input.Controller.As<CheckEdit>().span;
                                        span.Style.Top = "0";
                                        span.Style.Left = (inputHeight - 2).ToPx();

                                        span.Style.Position = Position.Absolute;

                                        span.Style.WhiteSpace = WhiteSpace.Pre;
                                        //span.Style.Transform = "translate(3px, 50%)";
                                        if(Helper.NotDesktop)
                                        {
                                            span.Style.FontSize = "14px";
                                            span.Style.WhiteSpace = WhiteSpace.Normal;
                                        }

                                        if(control.Input.Content.As<HTMLInputElement>().Type == InputType.Checkbox)
                                        {
                                            control.Input.Width = (inputHeight - 4).ToPx();
                                            control.Input.Height = (inputHeight - 4).ToPx();
                                        }
                                    }

                                    docFragment.AppendChild(control.Input.Controller);
                                }
                                else
                                {
                                    control.Input.Width = width;
                                    control.Input.Location = loc;
                                    control.Input.GetInput().TabIndex = TabIndex;

                                    docFragment.AppendChild(control.Input);
                                }
                                if(Helper.NotDesktop)
                                {
                                    control.Input.Height = inputHeight;
                                    control.Input.Style.FontSize = "14px";

                                    if(control.Input.GetInput() != null)
                                    {
                                        control.Input.GetInput().Style.FontSize = "14px";
                                    }
                                }

                                OnControlCreated(control);

                                if(!row.NoGap && !row.HideTinyLabel && !string.IsNullOrWhiteSpace(control.TinyLabel))
                                {
                                    var label = Control.Label(control.TinyLabel, 0, y + (inputHeight + 3), false, true);
                                    label.Style.Left = "calc(" + o100Percent + " + " + (Add - ButtinWidth).ToPx() + ")";
                                    docFragment.AppendChild(label);
                                    if(Helper.NotDesktop)
                                    {
                                        label.Style.FontSize = "12px";
                                    }
                                    HasTinyLabel = true;
                                }

                                if(row.UsePlaceholder && !string.IsNullOrWhiteSpace(control.TinyLabel))
                                {
                                    control.Input.SetAttribute("placeholder", control.TinyLabel);
                                    if(control.Input.ToolTip == null)
                                    {
                                        if(string.IsNullOrWhiteSpace(row.Label) && string.IsNullOrWhiteSpace(group.GroupLabel))
                                        {
                                            control.Input.ToolTip = new ToolTip(control.TinyLabel);
                                        }
                                        else
                                        {
                                            control.Input.ToolTip = new ToolTip(string.IsNullOrWhiteSpace(row.Label) ? group.GroupLabel : row.Label, control.TinyLabel);
                                        }
                                    }
                                }

                                TabIndex++;

                                if(!control.Input.Readonly)
                                {
                                    ApplyReadOnlyOnControl(documentreadonly, control.Input);
                                    ControlEditable.Add(control);
                                }
                                Controls.Add(control);
                            }

                            if(HasTinyLabel)
                            {
                                y += TinyLabelIncrement;
                            }
                            var last = row.Controls.LastOrDefault();
                            if(last != null && last.Input is MemoInput)
                            {
                                y += last.Input.Height.ToInt() + ControlMargin;
                            }
                            else
                            {
                                y += RowIncrement;
                            }
                        }
                    }
                }
                autoDiv.Height = y;
                if(!Helper.NotDesktop)
                {
                    AppendX += XIncrement;
                }
                else
                {
                    AppendY += (int)y;
                }
                autoDiv.Content.AppendChild(docFragment);
                parent.Content.AppendChild(autoDiv);
            }
            var LastControl = Controls.LastOrDefault();
            if(LastControl != null)
            {
                var FirstControl = Controls.FirstOrDefault();

                Action<KeyboardEvent> PreventDefaultMoveForward = (ev) =>
                {
                    if(ev.KeyCode == 9 && !ev.ShiftKey)
                    {
                        ev.PreventDefault();
                        var x = FirstControl.Input.GetInput();
                        if(x != null)
                            x.FocusElement();
                        else
                        {
                            LastControl.Input.Content.FocusElement();
                        }
                    }
                };

                Action<KeyboardEvent> PreventDefaultMoveBack = (ev) =>
                {
                    if(ev.KeyCode == 9 && ev.ShiftKey)
                    {
                        ev.PreventDefault();
                        var x = LastControl.Input.GetInput();
                        if(x != null)
                            x.FocusElement();
                        else
                        {
                            LastControl.Input.Content.FocusElement();
                        }
                    }
                };

                LastControl.Input.Content.OnKeyDown = PreventDefaultMoveForward;
                FirstControl.Input.Content.OnKeyDown = PreventDefaultMoveBack;
            }
        }
    }

    public class LayoutControl
    {
        public string LinkFieldName { get; set; }
        public TextInput Input { get; set; }
        public string TinyLabel { get; set; }
        public decimal Percent { get; set; }

        /// <summary>
        /// Calculated
        /// </summary>
        public string Width { get; set; }

        /// <summary>
        /// Calculated
        /// </summary>
        public decimal LineNumber { get; set; }

        public LayoutControl(string linkFieldName, TextInput input, string tinyLabel = "", decimal percent = 1)
        {
            LinkFieldName = linkFieldName;
            Input = input;
            TinyLabel = tinyLabel;
            Percent = percent;
        }

        public LayoutControl(string linkFieldName, TextInput input, decimal percent = 1) : this(linkFieldName, input, "", percent)
        {
        }

        public LayoutControl(string linkFieldName, TextInput input) : this(linkFieldName, input, "")
        {
        }
    }

    public class LayoutColumn
    {
        public List<LayoutGroup> Groups = new List<LayoutGroup>();

        public LayoutColumn(params LayoutGroup[] groups)
        {
            if(groups != null && groups.Length > 0)
                Groups.AddRange(groups);
        }
    }

    public class LayoutGroup
    {
        public List<LayoutRow> Rows = new List<LayoutRow>();
        public string GroupLabel { get; set; }

        public LayoutGroup(params LayoutRow[] rows)
        {
            GroupLabel = string.Empty;
            if(rows != null && rows.Length > 0)
                Rows.AddRange(rows);
        }

        public LayoutGroup(string groupLabel, params LayoutRow[] rows)
        {
            GroupLabel = groupLabel;
            if(rows != null && rows.Length > 0)
                Rows.AddRange(rows);
        }
    }

    public class LayoutRowGap : LayoutRow
    {
        public float Height;

        public LayoutRowGap(float height, string label = "")
        {
            Height = height;
            Label = label;
        }
    }

    public class LayoutRowControl : LayoutRow
    {
        public float Height;
        public Control Control;

        public LayoutRowControl(float height, Control control)
        {
            Height = height;
            Label = "";
            Control = control;
        }
    }

    public class LayoutRow
    {
        public List<LayoutControl> Controls = new List<LayoutControl>();
        public string Label { get; set; }
        public SimpleButton Button { get; set; }

        /// <summary>
        /// If this is true - tiny labels are ignored
        /// </summary>
        public bool NoGap { get; set; } = false;

        public bool UsePlaceholder { get; set; } = false;
        public bool HideTinyLabel { get; set; } = false;
        public decimal Offset { get; set; } = 0;

        public LayoutRow(string label, params LayoutControl[] controls)
        {
            Label = label;
            if(controls != null && controls.Length > 0)
                Controls.AddRange(controls);
        }

        public LayoutRow(params LayoutControl[] controls) : this("", controls)
        {
        }

        public LayoutRow(decimal offset, params LayoutControl[] controls) : this("", controls)
        {
            Offset = offset;
        }

        public LayoutRow(string label, SimpleButton button, params LayoutControl[] controls) : this(label, controls)
        {
            Button = button;
        }
    }
}