# ExpressCraft

[![NuGet](https://img.shields.io/nuget/v/expresscraft.svg)](https://www.nuget.org/packages/ExpressCraft) [![Built with Bridge.NET](https://img.shields.io/badge/built%20with-Bridge.NET-blue.svg)](http://bridge.net/)

 Demo Rep:
 
  https://github.com/samuelGrahame/ExpressCraftDemo
  
  #Projects created with ExpressCraft
  
  https://realitypunting.com/ 
  
  
# How Resize works

```
// Instead of trying to resize all conponents - if the control uses "(100% - 10px)" - it will scale with the screen.
//but if you would like things where when you resize the form or container it will resize and handle the resize redraw event you can attach the control using this function:

// inside the form:

this.LinkResize(control); // things like GridView and SplitContainer require this when adding controls
```

# How to create a Form

```csharp
Form.Setup(); // This is no longer needed with version 0.0.2 - nuget package
var x = new Form();
x.Text = "Hello World";
x.Show();
```

# How to use SplitterContainerControl

```csharp
var splitContainerControl = new SplitControlContainer();

splitContainerControl.SplitterPosition = 150;
splitContainerControl.SetBoundsFull();

this.LinkchildToForm(splitContainerControl);
this.AppendChild(splitContainerControl);
```

# How to use TabControl

```csharp
tabControl1 = new TabControl();
tabControl1.ShowClosedButton = true; // Show the Close on the Tab
tabControl1.SetBoundsFull();
tabControl1.AddPages(new TabControlPage() { Caption = "Tab1" }, new TabControlPage() { Caption = "Tab2" });
this.AppendChild(tabControl1);
```

# How to use Google Cloud Print

```csharp
GoogleCloudPrint.Setup();
var x = new GoogleCloudPrint("www.google.com", "title", GoogleCloudPrintingMimeType.Url);
x.Show();
```

# How to use DataTable Class

```csharp
var dataTable = new DataTable();				

dataTable.AddColumn("FieldName", DataType.String);

// Update direcly to datatable

dataTable.BeginDataUpdate();

dataTable.AddRow("Value");

dataTable.EndDataUpdate();

// Batch adding

dataTable.BeginNewRow(1000); //  It calls BeginDataUpdate...

for(int i = 0; i < 1000; i++)
{
  var x = dataTable.NewRow();
  x[0] = i.ToString();
}

dataTable.AcceptNewRows(); // It calls EndDataUpdate...
```

# How to use the GridView with the DataTable

```csharp
// Requirements - dataTable filled with data, Inside a Form class.

var gridView = new GridView(true, true);

gridView.SetBoundsFull(); // Dock the gridView Full
gridView.DataSource = dataTable;

this.LinkResize(gridView); // required to manage resize events.
this.Body.AppendChild(gridView); // add the control to the working form
```

# How to access the HTML Element for Control Clases

```csharp
var x = new Control();

HTMLElement element =  x.Content;

var y = new Form();

HTMLElement body = y.Body;
HTMLElement baseContent = y.Content;

```

# How to use the Color Class

```csharp
var color = Color.Blue;
color = Color.FromKnownColor(KnownColor.Brown);
color = Color.FromArgb(100, Color.Black);

color = Color.FromArgb(10, 10, 10);

Document.Body.Style.BackgroundColor = color;

// The color implicitly is casted to string using a Hex value. 

```

# How to use the GridLookupEdit

```csharp
var gridLookupEdit = new GridLookupEdit() { DisplayName = "RowContent", FieldName = "RowId" };
gridLookupEdit.Width = 150;
gridLookupEdit.gridView.DataSource = GetTestData();

public static DataTable GetTestData()
{
  var dt = new DataTable();

  dt.AddColumn("RowId", DataType.Long);
  dt.AddColumn("RowContent", DataType.String);

  dt.BeginDataUpdate();

  for(int i = 0; i < 1000; i++)
  {				
    dt.AddRow(i, "Content_Value" + i.ToString());
  }

  dt.EndDataUpdate();

  return dt;
}

```

# Application Settings

```csharp
Settings.NetworkURL = "Host.ashx"; // Default Network asp.net ashx page
Settings.ResourceURL = "./images/"; // Resource Directory
Settings.AutoRender = true; // Auto render when added to parent. appendChild(x);
Settings.DefaultFont = "8.25pt Tahoma";

Settings.GridViewAutoColumnGenerateFormatAsDate = false;
Settings.GridViewBlurOnScroll = false;
Settings.GridViewRowScrollPadding = 0;
Settings.GridViewScrollDelayed = false;
Settings.GridViewScrollDelayMS = 25;

Settings.ContextMenuStartingZIndex = 500;
Settings.ContextMenuMinWidth = 200;

Settings.MessageFormTextMaximumHeightInPx = 500;
Settings.MessageFormTextMinimumHeightInPx = 32;
Settings.MessageFormMinimumWidthInPx = 195;
Settings.MessageFormBeep = false; // Beep when a message box shows

Settings.MaximumPixelScrollingRows = 500000;
Settings.WindowManagerVisible = false; // Show Window Manager
Settings.AllowCloseWithoutQuestion = false; // Disable Question to close browser tab/page
Settings.ShowExceptionDialog = true; // Show the Exception Dialog
Settings.FormFadeDuration = 100; // Fade Duration when closing a Form

Settings.ConsoleDefaultSize = new Vector2(540, 240); // Size of the Console Form

Settings.OnF2ShowThemeForm = true; // Show the Theme Form on F2

Settings.ToolTipPopupDelayMs = 1000;
Settings.ToolTipPopupStayOpenDelayPerWordMs = 250;
```

# Stand Alone Form Instance's

```csharp
new Form().Show(null, true);

// The form does not follow the modal system.
// in a seperate List<Form>
```

# Added Support for Tooltips

```csharp
var control = new Control();
control.ToolTip = new ToolTip("This is a heading test.", "This is a description test.");

Settings.ToolTipPopupDelayMs = 1000;
Settings.ToolTipPopupStayOpenDelayPerWordMs = 250;
```

# How to create the mainscreen maximised always.

```csharp
public class frmMain : Form
    {
        public static void Main()
        {
            new frmMain().Show();
        }
        public frmMain()
        {
            this.Body.SetBoundsFull();
            this.Heading.style.visibility = "hidden";

            ShowClose = false;
            ShowMinimize = false;
            ShowMaximize = false;

            this.WindowState = WindowStateType.Maximized;

            this.AllowMoveChange = false;
            this.AllowSizeChange = false;

            this.BackColor = "red";
            
            
            // or use 
            
            this.MakeMainPage(); // when using version >= 0.6.9 
        }
    }
```

# How to create menu

```csharp
var x = new Form();
x.StartPosition = FormStartPosition.Center;

var menu = new MenuBar(new MenuItem("Menu",
    new MenuItem("Button 1", true),
    new MenuItem("Button 2", true),
    new MenuItem("Menu 1",
        new MenuItem("Button 3", true),
        new MenuItem("Button 4")
    )
),
new MenuItem("Menu 3",
    new MenuItem("Button 1", true),
        new MenuItem("Button 2", true),
        new MenuItem("Menu 1",
            new MenuItem("Button 3", true),
            new MenuItem("Button 4")
        ))
);

x.Body.AppendChild(menu);

x.Show();

```
