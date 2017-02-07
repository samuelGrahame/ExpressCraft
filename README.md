# ExpressCraft

[![Built with Bridge.NET](https://img.shields.io/badge/built%20with-Bridge.NET-blue.svg)](http://bridge.net/)

Dialog Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftHelloWorldDialog/Bridge/www/rawprev.html

Ribbon Control Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftRibbonBar/Bridge/www/rawprev.html

Grid View Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftGridView/Bridge/www/rawprev.html

GUI Form Designer (Not Finished): https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftDesign/Bridge/www/rawprev.html

# How to create a Form

```csharp
Form.Setup();
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
