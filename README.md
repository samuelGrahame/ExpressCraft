# ExpressCraft

[![Built with Bridge.NET](https://img.shields.io/badge/built%20with-Bridge.NET-blue.svg)](http://bridge.net/)

Dialog Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftHelloWorldDialog/Bridge/www/rawprev.html

Ribbon Control Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftRibbonBar/Bridge/www/rawprev.html

Grid View Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftGridView/Bridge/www/rawprev.html


# How to create a Form

```csharp
Form.Setup();
var x = new Form();
x.Text = "Hello World";
x.Show();
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
