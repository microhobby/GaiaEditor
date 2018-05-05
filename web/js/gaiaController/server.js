/* 
 * Metodos AJAX
 */

var GLOBALURL = null;

function getUser(fun)
{
    ajax.setData({user: LogedUser.cod, method: "getUser"});
    ajax.onSucces(function (data)
    {
        var objData = JSON.parse(data);
        LogedUser = $.extend(new User(), objData.data);
        LogedUser.cast();
        if (fun !== undefined)
        {
            fun();
        }
    });
    ajax.execute();
}

function makePackage()
{
    //winRef = window.open("making.html");
    var srcPages = new FileFactory();
    var ret = srcPages.makeStrign();
    ajax.setData({user: LogedUser.cod, filesSrc: JSON.stringify(ret), projectCod: ptrProject.cod, method: "makePackage"});
    ajax.onSucces(function (data)
    {
        $("#packagePage").find("img").attr("src", "../img/script_binary.png");
        var objData = JSON.parse(data);

        GLOBALURL = objData.data.url;
        scalePanels("windowCompleted");

        /*var int2 = setInterval(function()
         {
         if(window.onbeforeunload === null)
         {
         clearInterval(int2);
         winRef.location = objData.data.url;
         var int = setInterval(function()
         {
         if(winRef.onerror === null)
         {
         winRef.onerror =  setErrorList;
         winRef.onbeforeunload = closeDebug;
         }
         else
         clearInterval(int);
         }, 0);
         }
         }, 0);*/
    });
    ajax.execute();
}

function makeUserEntities()
{
    var srcPages = new FileFactory();
    var ret = srcPages.makeStrign();
    ajax.setData({user: LogedUser.cod, filesSrc: JSON.stringify(ret), projectCod: ptrProject.cod, method: "makeUserEntities"});
    ajax.onSucces(function (data)
    {
        //data = JSON.stringify(data);
        IDE.setUserEntities(JSON.parse(data).data.entities);
    });
    ajax.execute();
}

function makeProject()
{
    //winRef = window.open("making.html");
    var srcPages = new FileFactory();
    var ret = srcPages.makeStrign();
    ajax.setData({user: LogedUser.cod, filesSrc: JSON.stringify(ret), projectCod: ptrProject.cod, method: "makeProject"});
    ajax.onSucces(function (data)
    {
        $("#debugPage").find("img").attr("src", "../img/bug.png");
        var objData = JSON.parse(data);

        GLOBALURL = objData.data.url;
        scalePanels("windowCompleted");

        //winRef = window.open(objData.data.url, "Gaia View");

        /*var int2 = setInterval(function()
         {
         if(window.onbeforeunload === null)
         {
         clearInterval(int2);
         winRef.location = objData.data.url;
         var int = setInterval(function()
         {
         /*if(winRef.onerror === null)
         {
         winRef.onerror =  setErrorList;
         winRef.onbeforeunload = closeDebug;
         }
         else
         clearInterval(int);*/
        /*if(winRef.postMessage !== undefined)
         {
         winRef.postMessage(window.setErrorList, slice_url);
         }
         else
         clearInterval(int);
         }, 0);
         }
         }, 0);*/
    });
    ajax.execute();
}

function saveProject()
{
    var ajaxi = new Ajax();
    ajaxi.Url = slice_url + "server.jsp";

    var dados = new Projeto("dados", ptrProject.AlturaPaginas, ptrProject.LarguraPaginas, "");
    dados.cod = ptrProject.cod;

    ajaxi.setData({user: LogedUser.cod, projeto: JSON.stringify(dados), projectCod: ptrProject.cod, method: "saveProject"});
    ajaxi.onSucces(function ()
    {
        confirmados++;
    });
    ajaxi.execute();
    envios++;
}

function newProject()
{
    // Testa a integridade das informações
    if ($("#nameProjectText").val() != ""
            && $("#alturaProjectText").val() != ""
            && $("#larguraProjectText").val() != "")
    {
        ptrProject = new Projeto($("#nameProjectText").val(),
                parseFloat($("#alturaProjectText").val()), parseFloat($("#larguraProjectText").val()),
                $("#obsProjectText").val());

        ajax.setData({user: LogedUser.cod, project: JSON.stringify(ptrProject), method: "newProject"});
        ajax.onSucces(function (data)
        {
            //console.log(data);
            var objData = JSON.parse(data);
            //var pro = new Projeto(objData.data);
            var pro = $.extend(new Projeto(), objData.data);
            pro.cast();
            LogedUser.Projetos.push(pro);
            modelProj.add(new Item(pro.Nome, pro));
            ptrProject = pro;
            ptrProject.ParseJsonEntities();

            scalePanels("windowProjectsNew", true, function ()
            {
                scalePanels("windowLayout");
            });
        });
        ajax.execute();
    }
    else
        alert("Todos os campos devem ser preenchidos!");
}

function copyProject () 
{
    ajax.setData ( {
                        user: LogedUser.cod, 
                        projectCod: ptrProject.cod,
                        method: "copyProject"
                    });
    ajax.onSucces(function (data)
    {
        console.warn(data);
        window.location.reload(false); 
    });
    ajax.execute();
}

function newResource(rec)
{
    var ajaxR = new Ajax();
    ajaxR.Url = slice_url + "server.jsp";
    ajaxR.setData({user: LogedUser.cod, resource: JSON.stringify(rec), projectCod: ptrProject.cod, method: "newRecurso"});
    ajaxR.onSucces(function (data)
    {
        var objData = JSON.parse(data);
        rec.cod = objData.data.cod;
        //rec.superCod = objData.data.superCod;
    });
    ajaxR.execute();
    // desbloqueia a ação
    ptrProject.recursos.push(rec);
    fileUp3.clear("Selecione Midia...");
    if ((rec.Arquivo.indexOf(".jpg") !== -1) || (rec.Arquivo.indexOf(".png") !== -1) || (rec.Arquivo.indexOf(".jpeg") !== -1) || (rec.Arquivo.indexOf(".gif") !== -1))
        //modelRecursos.add(new Item(rec.Nome, rec, "../dados/" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo, 120));
        modelRecursos.add(new Item(rec.Nome, rec, "../" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo, 120));
    else
        modelRecursos.add(new Item(rec.Nome, rec, "../img/clipping_sound.png", 120));
    $("#recursoNome").val("");
}

function newPage()
{
    ajax.setData({user: LogedUser.cod, proCod: ptrProject.cod, method: "newPage"});
    ajax.onSucces(function (data)
    {
        var objData = JSON.parse(data);
        var page = new Paginas("", ptrProject.paginas.length);
        page.cod = objData.data.cod;
        //page.superCod = objData.data.superCod;
        ptrProject.paginas.push(page);
        modelPaginas.add(new Item("Página " + (page.Indice - 1), page));
        openPage(page.Indice - 2);
    });
    ajax.execute();
}

function newLayout()
{
    // Testa a integridade das informações
    if (comboLayouts.getSelectedItem() !== null && comboEfeitos.getSelectedItem() !== null)
    {
        var lay = new Layout(comboEfeitos.getSelectedItem().obj, comboLayouts.getSelectedItem().obj);
        lay.BackgroundImage = fileUp1.getRealFileName();
        lay.BackgroundColor = colorPick1.getColor();

        ajax.setData({user: LogedUser.cod, layout: JSON.stringify(lay), proCod: ptrProject.cod, method: "newLayout"});
        ajax.onSucces(function (data)
        {
            var objData = JSON.parse(data);
            var pro = $.extend(new Projeto(), objData.data);
            ptrProject = pro;
            replaceProjeto(pro);
            scalePanels("windowLayout", true);
            ptrProject.cast();
            openProject(pro);
        });
        ajax.execute();
    }
    else
        alert("Selecione tipo do layout e tipo de efeito de transição!");
}

function newObjeto(obj)
{
    /*console.log("tentando: " + obj.JqueryId);
     ajax.setData({user: LogedUser.cod, objeto: JSON.stringify(obj), projectCod: ptrProject.cod, pageCod: ptrPage.cod, method: "newObjeto"});
     ajax.onSucces(function(data)
     {
     console.log("recebendo: " + obj.JqueryId);
     var objData = JSON.parse(data);
     obj.cod = objData.data.cod;
     obj.superCod = objData.data.superCod;
     });
     ajax.onError(function(data)
     {
     console.log("errando: " + obj.JqueryId);
     });
     ajax.execute();*/
    var newAjax = new Ajax();
    newAjax.Url = slice_url + "server.jsp";
    newAjax.setData({user: LogedUser.cod, objeto: JSON.stringify(obj), projectCod: ptrProject.cod, pageCod: ptrPage.cod, method: "newObjeto"});
    newAjax.onSucces(function (data)
    {
        confirmados++;
        var objData = JSON.parse(data);
        console.log("recebendo: " + obj.JqueryId + " no cod: " + objData.data.cod);
        obj.cod = objData.data.cod;
        //obj.superCod = objData.data.superCod;
        stackObjs.actDeletedItemInZ(obj);
        saveAfter();
    });
    newAjax.execute();
    envios++;
}

function newEvento(obj)
{
    ptrObject.eventos.push(obj);
    var ajaxi = new Ajax();
    ajaxi.Url = slice_url + "server.jsp";
    ajaxi.setData({user: LogedUser.cod, objCod: ptrObject.cod, projectCod: ptrProject.cod, pageCod: ptrPage.cod, evento: JSON.stringify(obj), method: "newEvento"});
    ajaxi.onSucces(function (data)
    {
        confirmados++;
        var objData = JSON.parse(data);
        obj.cod = objData.data.cod;
        //obj.superCod = objData.data.superCod;
        verificaSaves();
    });
    ajaxi.execute();
    envios++;
}

function newState()
{
    /** @type Objetos */
    var tmp = ptrObject.Clone();
    //var tmp = modelEstados.get(0).obj.Clone();
    tmp.Name = tmp.JqueryId.replace("#", "") + "Estado" + (modelEstados.getTam());
    tmp.cod = null;
    //tmp.superCod = modelEstados.get(0).obj.cod;
    // ajax
    var ajaxi = new Ajax();
    ajaxi.Url = slice_url + "server.jsp";
    ajaxi.setData({user: LogedUser.cod, objCod: modelEstados.get(0).obj.cod, projectCod: ptrProject.cod, pageCod: ptrPage.cod, estado: JSON.stringify(tmp), method: "newState"});
    ajaxi.onSucces(function (data)
    {
        confirmados++;
        var objData = JSON.parse(data);
        tmp.cod = objData.data.cod;
        saveAfter();
    });
    ajaxi.execute();
    envios++;
    // desbloqueia a ação
    modelEstados.get(0).obj.estados.push(tmp);
    modelEstados.add(new Item(tmp.Name, tmp));
    objAnimas.setSelectIndex(modelEstados.getTam() - 1);
}

function savePage(onSucesso)
{
    /** @type Paginas */
    var ptrPageTmp = ptrPage.CloneWithoutZeroId();
    ptrPageTmp.ParseObjectsSpecialFields();
    var ajaxi = new Ajax();
    ajaxi.Url = slice_url + "server.jsp";
    ajaxi.setData({user: LogedUser.cod, pagina: JSON.stringify(ptrPageTmp), projectCod: ptrProject.cod, method: "savePagina"});
    ajaxi.onSucces(onSucesso);
    ajaxi.execute();
    envios++;
}

function saveLayout()
{
    var ajaxi = new Ajax();
    ajaxi.Url = slice_url + "server.jsp";
    ajaxi.setData({user: LogedUser.cod, layout: JSON.stringify(ptrProject.layout), projectCod: ptrProject.cod, method: "saveLayout"});
    ajaxi.onSucces(function ()
    {
        confirmados++;
    });
    ajaxi.execute();
    envios++;
}

function saveEntity()
{
    ptrProject.EntitiesToJson();
    var ajaxi = new Ajax();
    ajaxi.Url = slice_url + "server.jsp";
    ajaxi.setData({user: LogedUser.cod, entities: ptrProject.JsonEntities, projectCod: ptrProject.cod, method: "saveEntity"});
    ajaxi.onSucces(function ()
    {
        confirmados++;
    });
    ajaxi.execute();
    envios++;
}

function deleteObjeto()
{
    /** @type Array */
    var selecionados = _stack();
    if (selecionados.length > 0)
    {
        for (var i = 0; i < ptrPage.Elementos.length; i++)
        {
            /** @type Objetos */
            var obj = ptrPage.Elementos[i];
            for (var j = 0; j < selecionados.length; j++)
            {
                if (obj.JqueryId === selecionados[j])
                {
                    obj.Deleted = true;
                    //ptrPage.Elementos.splice(i, 1);
                    $(obj.JqueryId).off();
                    $(obj.JqueryId).empty();
                    $(obj.JqueryId).remove();

                    $("#idSelected").text("");
                    // seta forms
                    $("#objAltura").val("");
                    $("#objLargura").val("");
                    $("#objTopo").val("");
                    $("#objEsquerda").val("");
                    $("#objPadding").val("");
                    $("#objRadius").val("");
                    $("#objSombra").val("");
                    $("#objZindex").val("");
                    $("#objBorda").val("");
                    $("#objOpacity").val("");
                }
            }
        }
        ptrObject = null;
        saveAfter(true);
    }
    else if (ptrObject !== null)
    {
        for (var i = 0; i < ptrPage.Elementos.length; i++)
        {
            /** @type Objetos */
            var obj = ptrPage.Elementos[i];

            if (obj.cod === ptrObject.cod)
            {
                obj.Deleted = true;
                //ptrPage.Elementos.splice(i, 1);
                $(obj.JqueryId).off();
                $(obj.JqueryId).empty();
                $(obj.JqueryId).remove();

                $("#idSelected").text("");
                // seta forms
                $("#objAltura").val("");
                $("#objLargura").val("");
                $("#objTopo").val("");
                $("#objEsquerda").val("");
                $("#objPadding").val("");
                $("#objRadius").val("");
                $("#objSombra").val("");
                $("#objZindex").val("");
                $("#objBorda").val("");
                $("#objOpacity").val("");
            }

            saveAfter(true);
        }
        ptrObject = null;
    }

    /*var ajaxi = new Ajax();
     ajaxi.Url = slice_url + "server.jsp";
     ajaxi.setData({user: LogedUser.cod, objeto: JSON.stringify(ptrObject), projectCod: ptrProject.cod, pageCod: ptrPage.cod, method: "deleteObjeto"});
     ajaxi.onSucces(function(data)
     {
     var objData = JSON.parse(data);
     for(var i = 0; i < ptrPage.Elementos.length; i++)
     {
     /** @type Objetos */
    /*var obj = ptrPage.Elementos[i];
     if(obj.cod === objData.data.cod)
     {
     ptrPage.Elementos.splice(i, 1);
     $(obj.JqueryId).remove();
     }
     }
     
     ptrObject = null;
     $("#idSelected").text("");
     // seta forms
     $("#objAltura").val("");
     $("#objLargura").val("");
     $("#objTopo").val("");
     $("#objEsquerda").val("");
     $("#objPadding").val("");
     $("#objRadius").val("");
     $("#objSombra").val("");
     $("#objZindex").val("");
     $("#objBorda").val("");
     $("#objOpacity").val("");
     });
     ajaxi.execute();*/
}

function replaceProjeto(proj)
{
    for (var i = 0; i < LogedUser.Projetos.length; i++)
    {
        if (proj.cod === LogedUser.Projetos[i].cod)
            LogedUser.Projetos[i] = proj;
    }
}