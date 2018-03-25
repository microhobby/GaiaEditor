
/**
 * Classe que retorna
 * @returns {GForm}
 */
function GForm(largura, altura, topo, esquerda, visivel)
{
    var privateAttrs = new Array();
    var instructs = "";
    var vars = "";

    this.init(largura, altura, topo, esquerda, visivel);

    this.ClassType = "GForm";
    this.JqueryId = "#divStatic" + this.Id;
    this.Cb = "#6666cc";
    this.Name = "GForm" + this.Id;

    //@override
    this.returnCodeInstructs = function ()
    {
        return instructs;
    };

    //@override
    this.returnCodeVars = function ()
    {
        return vars;
    };

    //@override
    this.getPrivateAttrs = function ()
    {
        return privateAttrs;
    };

    //@override
    this.resolveSpecialFields = function ()
    {
        if (this.SpecialFields !== "")
        {
            var privateAttrsTmp = JSON.parse(this.SpecialFields);
            for (var i = 0; i < privateAttrsTmp.length; i++)
            {
                privateAttrs[i] = privateAttrsTmp[i];
            }
        }
    };

    //@override
    this.parseSpecialFields = function ()
    {
        this.SpecialFields = JSON.stringify(privateAttrs);
    };

    //@override
    this.canCreateVar = function ()
    {
        return false;
    };

    this.getPrivateAttrs().push(new SpecialAttrs("Entidade", "objCombo", "setEntidade", null, "modelEntities"));
    this.getPrivateAttrs().push(new SpecialAttrs("Botão Novo", "objText", "setButtonNew", ""));
    this.getPrivateAttrs().push(new SpecialAttrs("Botão Salva", "objText", "setButtonSave", ""));
    this.getPrivateAttrs().push(new SpecialAttrs("Recarrega", "objText", "setDBsource", ""));

    this.setEntidade = function (entityName)
    {
        this.getPrivateAttrs()[0].Data = entityName;
    };

    this.setButtonNew = function (buttonNew)
    {
        this.getPrivateAttrs()[1].Data = buttonNew;
    };

    this.setButtonSave = function (buttonSave)
    {
        this.getPrivateAttrs()[2].Data = buttonSave;
    };

    this.setDBsource = function (dbsource)
    {
        this.getPrivateAttrs()[3].Data = dbsource;
    };

    this.returnCode = function (flag, isPreview)
    {
        // zera
        vars = "";
        instructs = "";

        if (flag == undefined)
            flag = false;
        if (isPreview == undefined)
            isPreview = false;

        var code;
        var display = "none";
        var position = "absolute";
        var width = "";
        var height = "";

        if (this.StaticPos)
        {
            width = "auto";
            position = "static";
            height = "auto";
        }
        else
        {
            height = this.H + "px";
            width = this.W + "px";
        }

        if (!flag)
        {
            if (this.Visible)
                display = "block";
        }
        else
            display = "block";

        code = '\n<div id="divStatic' + this.Id + '"\n' +
                ' class="badWolf" style="display:' + display + '; position: ' + position + '; \n' +
                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + width + '; \n' +
                ' height: ' + height + '; padding: ' + this.P + 'px;\n' +
                ' background-color: ' + this.Cb + '; ' +
                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                ' border-radius: ' + this.R + 'px;\n' +
                ' -webkit-transform: rotate(' + this.A + 'deg);\n' +
                ' -moz-transform: rotate(' + this.A + 'deg);\n' +
                ' -o-transform: rotate(' + this.A + 'deg);\n' +
                ' -ms-transform: rotate(' + this.A + 'deg);\n' +
                ' transform: rotate(' + this.A + 'deg);\n' +
                'box-sizing: initial; \n' +
                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; opacity: ' + (this.Opacity / 100) + ';' +
                ' z-index: ' + this.Zindex + ';">\n' +
                //vai ser o conteudo aqui
                '\n</div>\n';

        if (!flag)
        {
            vars += 'var ' + this.Name + ' = new FormCreator(' + this.getPrivateAttrs()[0].Data + ', "' + this.JqueryId + '");\n';
            instructs += '' + this.Name + ' = $.extend({}, ' + this.Name + ', $("' + this.JqueryId + '"));\n';
            if (this.getPrivateAttrs()[1].Data !== "")
                instructs += '' + this.getPrivateAttrs()[1].Data + '.click(function(){ ' + this.Name + '.New(); });\n';
            if (this.getPrivateAttrs()[2].Data !== "")
                instructs += '' + this.getPrivateAttrs()[2].Data + '.click(function(){ ' + this.Name + '.Save(); });\n';
            if (this.getPrivateAttrs()[3].Data !== "")
                instructs += '' + this.Name + '.setDataSourceReload("' + this.getPrivateAttrs()[3].Data + '");\n';
        }

        return code;
    };
}

// Herança
GForm.prototype = new Objetos();