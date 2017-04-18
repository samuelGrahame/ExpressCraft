# ExpressCraft

[![NuGet](https://img.shields.io/nuget/v/expresscraft.svg)](https://www.nuget.org/packages/ExpressCraft) [![Built with Bridge.NET](https://img.shields.io/badge/built%20with-Bridge.NET-blue.svg)](http://bridge.net/)

 ExpressCraft.Bootstrap:
 https://github.com/samuelGrahame/ExpressCraft.bootstrap
 
 ExpressCraft.Bootstrap Demo:
 https://rawgit.com/samuelGrahame/ExpressCraft.Bootstrap/master/ExpressCraft.Bootstrap/Bridge/www/rawprev.html

 Demo 1:
 https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftHelloWorldDialog/Bridge/www/rawprev.html
 
 Ribbon 1: 
 https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftRibbonBar/Bridge/www/rawprev.html
 
 Grid View 1: 
 https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftGridView/Bridge/www/rawprev.html
 
 Demo GUI Designer 1: 
 https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftDesign/Bridge/www/rawprev.html

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

this.LinkchildToForm(gridView); // required to manage resize events.
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

# How to choose your Console

```csharp
public enum ApplicationDefitnion
{
	BrowserConsole,
	BridgeConsole,
	ExpressCraftConsole
}  
Application.SetApplicationDefinition(ApplicationDefitnion.BrowserConsole);
Application.SetApplicationDefinition(ApplicationDefitnion.BridgeConsole);
Application.SetApplicationDefinition(ApplicationDefitnion.ExpressCraftConsole);
if(Application.AplicationDefition == ApplicationDefitnion.ExpressCraftConsole)
	// Do Something
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

# Added Custom Themes

```csharp
var Theme Theme2 = new Theme(
"#0173C7", "#C5C5C5", "#CCCCCC",
"#F0F0F0", "#C3C3C3", "#ADADAD",
"#2A8AD0", "#D3D3D3", "#2A8AD4",
"#015C9F", "#E81123", "#F1707A",
"#AEAEAE", "#FAFAFA", "white",
"#CFCFCF", "#B9B9B9", "rgba(1, 115, 199, 0.3)",
"rgba(1, 115, 199, 0.5)", "#A6A6A6",
"#777777", "#80868A", "#404040",
"white", "black");

// Example of how to create a theme.
// How to set the theme in the project

Settings.ActiveTheme = Theme2;

// Will  Add Notes later for what the colors are used for each variable

```
# Open the Theme Form || Press F2 when (Settings.OnF2ShowThemeForm == true)
```csharp
ThemeForm.ShowThemeForm();
```

# Added Support for Tooltips

```csharp
var control = new Control();
control.ToolTip = new ToolTip("This is a heading test.", "This is a description test.");

Settings.ToolTipPopupDelayMs = 1000;
Settings.ToolTipPopupStayOpenDelayPerWordMs = 250;
```
