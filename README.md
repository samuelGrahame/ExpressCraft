# ExpressCraft

[![Built with Bridge.NET](https://img.shields.io/badge/built%20with-Bridge.NET-blue.svg)](http://bridge.net/)

Dialog Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftHelloWorldDialog/Bridge/www/rawprev.html

Ribbon Control Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftRibbonBar/Bridge/www/rawprev.html

Grid View Test: https://rawgit.com/samuelGrahame/ExpressCraft/master/ExpressCraftGridView/Bridge/www/rawprev.html


# How to create a form

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
