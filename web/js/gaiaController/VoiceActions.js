
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

safira.addAction("saveProject", function()
{
        $("#savePage").click();
});

safira.addAction("debugPage", function()
{
        $("#debugPage").click();
});

safira.addAction("downPage", function()
{
        $("#packagePage").click();
});

safira.addAction("uiSelect", function(args)
{
        if(args[1])
        {
                switch (args[1])
                {
                        case "var":
                                $("#objVar").focus(); $("#objVar").select();
                        break;
                        case "altura":
                                $("#objAltura").focus(); $("#objAltura").select();
                        break;
                        case "backColor":
                                $("#tool1base").mouseenter(); $('#colorPicker2').find("input").focus();
                        break;
                        case "projAltura":
                                $("#tool1base").mouseenter(); $('#projAltura').focus();
                        break;
                        case "projLargura":
                                $("#tool1base").mouseenter(); $('#projLargura').focus();
                        break;
                        case "layAltura":
                                $("#tool1base").mouseenter(); $('#setLayoutH').focus();
                        break;
                        case "projEffect":
                                $("#tool1base").mouseenter(); $('#projEfeito').find("button").focus();
                        break;
                        case "addPage":
                                $("#tool1base").mouseenter(); $('#addPage').focus();
                        break;
                }
        }
});

safira.addAction("winOpen", function(args)
{
        if(args[1])
        {
                switch (args[1])
                {
                        case "entity":
                                $("#addEntities").click();
                        break;
                        case "topo":
                                $("#projLayout").find("ul").find("li #0").click();
                        break;
                        case "footer":
                                $("#projLayout").find("ul").find("li #1").click();
                        break;
                        case "code":
                                $("#scriptPage").click();
                        break;
                        case "resource":
                                $("#addRecurso").click();
                        break;
                        case "elems":
                                $("#elementoPage").click();
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
                        case "datasource": //ok
                                $("#toolObjects").find("#18").click();
                        break;
                        case "haudio": //ok
                                $("#toolObjects").find("#17").click();
                        break;
                        case "audio": //ok
                                $("#toolObjects").find("#16").click();
                        break;
                        case "autoform": //ok
                                $("#toolObjects").find("#15").click();
                        break;
                        case "texte": //ok
                                $("#toolObjects").find("#14").click();
                        break;
                        case "texta": //ok
                                $("#toolObjects").find("#13").click();
                        break;
                        case "check": //ok
                                $("#toolObjects").find("#12").click();
                        break;
                        case "input": //ok
                                $("#toolObjects").find("#10").click();
                        break;
                        case "button": // ok
                                $("#toolObjects").find("#9").click();
                        break;
                        case "image": //ok
                                $("#toolObjects").find("#8").click();
                        break;
                        case "chart": //ok
                                $("#toolObjects").find("#7").click();
                        break;
                        case "table": //ok
                                $("#toolObjects").find("#6").click();
                        break;
                        case "combobox": //ok
                                $("#toolObjects").find("#5").click();
                        break;
                        case "list": //ok
                                $("#toolObjects").find("#4").click();
                        break;
                        case "repetidor": //ok
                                $("#toolObjects").find("#3").click();
                        break;
                        case "containerd": //ok
                                $("#toolObjects").find("#2").click();
                        break;
                        case "container": //ok
                                $("#toolObjects").find("#1").click();
                        break;
                        case "text": //ok
                                $("#toolObjects").find("#0").click();
                        break;
                }
        }
});