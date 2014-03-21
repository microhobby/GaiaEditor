
/**
 * ACTIONS DOS COMANDOS POR VOZ
 */

safira.addAction("dicaFerramentas", function()
{
        $("#tool2base").mouseenter();
});

safira.addAction("fechaProj", function()
{
        $("#closeProject").click();
});

safira.addAction("winOpen", function(args)
{
        if(args[1])
        {
                switch (args[1])
                {
                        case "entity":
                                
                        break;
                }
        }
});

safira.addAction("addElem", function(args)
{
        if(args[1])
        {
                switch (args[1])
                {
                        case "datasource":
                                $("#toolObjects").find("#8").click();
                        break;
                        case "texta":
                                $("#toolObjects").find("#7").click();
                        break;
                        case "input":
                                $("#toolObjects").find("#6").click();
                        break;
                        case "button":
                                $("#toolObjects").find("#5").click();
                        break;
                        case "image":
                                $("#toolObjects").find("#4").click();
                        break;
                        case "list":
                                $("#toolObjects").find("#3").click();
                        break;
                        case "containerd":
                                $("#toolObjects").find("#2").click();
                        break;
                        case "container":
                                $("#toolObjects").find("#1").click();
                        break;
                        case "text":
                                $("#toolObjects").find("#0").click();
                        break;
                }
        }
});