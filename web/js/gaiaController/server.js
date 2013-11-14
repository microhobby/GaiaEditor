/* 
 * Metodos AJAX
 */

function getUser(fun)
{
        ajax.setData({user: LogedUser.cod, method: "getUser"});
        ajax.onSucces(function(data)
        {
                var objData = JSON.parse(data);
                LogedUser = $.extend(new User(), objData.data);
                LogedUser.cast();
                if(fun !== undefined)
                {
                        fun();
                }
        });
        ajax.execute();
}

function makeProject()
{
        winRef = window.open("");
        var srcPages = new FileFactory();
        var ret = srcPages.makeStrign();
        ajax.setData({user: LogedUser.cod, filesSrc: JSON.stringify(ret), projectCod: ptrProject.cod, method: "makeProject"});
        ajax.onSucces(function(data)
        {
                var objData = JSON.parse(data);
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
        });
        ajax.execute();
}

function newProject()
{
        // Testa a integridade das informações
        if($("#nameProjectText").val() != ""
            && $("#alturaProjectText").val() != ""
            &&  $("#larguraProjectText").val() != "")
        {
                ptrProject = new Projeto($("#nameProjectText").val(), 
                                        parseFloat($("#alturaProjectText").val()), parseFloat($("#larguraProjectText").val()),
                                        $("#obsProjectText").val());
                                        
                ajax.setData({user: LogedUser.cod, project: JSON.stringify(ptrProject), method: "newProject"});
                ajax.onSucces(function(data)
                {
                        //console.log(data);
                        var objData = JSON.parse(data);
                        //var pro = new Projeto(objData.data);
                        var pro = $.extend(new Projeto(), objData.data);
                        LogedUser.Projetos.push(pro);
                        modelProj.add(new Item(pro.Nome, pro));
                        ptrProject = pro;

                        scalePanels("windowProjectsNew", true, function()
                        {
                                  scalePanels("windowLayout");
                        });
                });
                ajax.execute();
        }
        else
                alert("Todos os campos devem ser preenchidos!");
}

function newResource(rec)
{
        ajax.setData({user: LogedUser.cod, resource: JSON.stringify(rec), projectCod: ptrProject.cod, method: "newRecurso"});
        ajax.onSucces(function(data)
        {
                var objData = JSON.parse(data);
                rec.cod = objData.data.cod;
                rec.superCod = objData.data.superCod;
                ptrProject.recursos.push(rec);
                fileUp3.clear("Selecione Midia...");
                if((rec.Arquivo.indexOf(".jpg") !== -1) || (rec.Arquivo.indexOf(".png") !== -1) || (rec.Arquivo.indexOf(".jpeg") !== -1) || (rec.Arquivo.indexOf(".gif") !== -1))
                        modelRecursos.add(new Item(rec.Nome, rec, "../" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo, 120));
                else
                        modelRecursos.add(new Item(rec.Nome, rec, "../img/clipping_sound.png", 120));
                $("#recursoNome").val("");
        });
        ajax.execute();
}

function newPage()
{
        ajax.setData({user: LogedUser.cod, proCod: ptrProject.cod, method: "newPage"});
        ajax.onSucces(function(data)
        {
                var objData = JSON.parse(data);
                var page = new Paginas("", ptrProject.paginas.length + 1);
                page.cod = objData.data.cod;
                page.superCod = objData.data.superCod;
                ptrProject.paginas.push(page);
                modelPaginas.add(new Item("Página " + (page.Indice -2), page));
                openPage(page.Indice -3);
        });
        ajax.execute();
}

function newLayout()
{
         // Testa a integridade das informações
        if(comboLayouts.getSelectedItem() !== null && comboEfeitos.getSelectedItem() !== null)
        {
                var lay = new Layout(comboEfeitos.getSelectedItem().obj, comboLayouts.getSelectedItem().obj);
                lay.BackgroundImage = fileUp1.getRealFileName();
                lay.BackgroundColor = colorPick1.getColor();
                
                ajax.setData({user: LogedUser.cod, layout: JSON.stringify(lay), proCod: ptrProject.cod, method: "newLayout"});
                ajax.onSucces(function(data)
                {
                        var objData = JSON.parse(data);
                        var pro = $.extend(new Projeto(), objData.data);
                        ptrProject = pro;
                        replaceProjeto(pro);
                        scalePanels("windowLayout", true);
                        openProject(pro);
                });
                ajax.execute();
        }
        else
                alert("Selecione tipo do layout e tipo de efeito de transição!");
}

function newObjeto(obj)
{
        ajax.setData({user: LogedUser.cod, objeto: JSON.stringify(obj), projectCod: ptrProject.cod, pageCod: ptrPage.cod, method: "newObjeto"});
        ajax.onSucces(function(data)
        {
                var objData = JSON.parse(data);
                obj.cod = objData.data.cod;
                obj.superCod = objData.data.superCod;
        });
        ajax.execute();
}

function newEvento(obj)
{
        ajax.setData({user: LogedUser.cod, objCod: ptrObject.cod, projectCod: ptrProject.cod, pageCod: ptrPage.cod, evento: JSON.stringify(obj), method: "newEvento"});
        ajax.onSucces(function(data)
        {
                var objData = JSON.parse(data);
                obj.cod = objData.data.cod;
                obj.superCod = objData.data.superCod;
                ptrObject.eventos.push(obj);
        });
        ajax.execute();
}

function savePage(onSucesso)
{
        ajax.setData({user: LogedUser.cod, pagina: JSON.stringify(ptrPage), projectCod: ptrProject.cod, method: "savePagina"});
        ajax.onSucces(onSucesso);
        ajax.execute();
}

function deleteObjeto()
{
        ajax.setData({user: LogedUser.cod, objeto: JSON.stringify(ptrObject), projectCod: ptrProject.cod, pageCod: ptrPage.cod, method: "deleteObjeto"});
        ajax.onSucces(function(data)
        {
                var objData = JSON.parse(data);
                for(var i = 0; i < ptrPage.Elementos.length; i++)
                {
                        /** @type Objetos */
                        var obj = ptrPage.Elementos[i];
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
        ajax.execute();
}

function replaceProjeto(proj)
{
        for(var i = 0; i < LogedUser.Projetos.length; i++)
        {
                if(proj.cod === LogedUser.Projetos[i].cod)
                        LogedUser.Projetos[i] = proj;
        }
}