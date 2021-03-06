

/**
 * Classe que retorna
 * @returns {GImage}
 */
function GImage(largura, altura, topo, esquerda, visivel)
{
    var privateAttrs = new Array();
    var instructs = "";
    var vars = "";

    this.init(largura, altura, topo, esquerda, visivel);

    this.ClassType = "GImage";
    this.Name = "Imagem" + this.Id;
    this.JqueryId = "#img" + this.Id;
    //this.recursos.push(new Recursos("Padrão", "Imagem", "../img/question5.png"));
    //this.recurso = -1;

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
            for (var i = 0; i < privateAttrs.length; i++)
            {
                this[privateAttrs[i].Method](privateAttrs[i].Data);
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

    this.getPrivateAttrs().push(new SpecialAttrs("Float", "objText", "setFloat", "none"));
    this.getPrivateAttrs().push(new SpecialAttrs("Cursor", "objText", "setCursor", "auto"));

    this.setFloat = function (floatTo)
    {
        this.getPrivateAttrs()[0].Data = floatTo;
        $(this.JqueryId).css("float", floatTo);
    };

    this.setCursor = function (cursorType)
    {
        this.getPrivateAttrs()[1].Data = cursorType;
        $(this.JqueryId).css("cursor", cursorType);
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
        var recursoInt = this.recurso;
        var position = "absolute";
        var width = "";
        var height = "";

        if (this.StaticPos)
        {
            width = this.W + "px";
            position = "static";
            height = this.H + "px";
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

        code = '\n<div id="img' + this.Id + '" \n' +
                ' class="GImage badWolf" style="display:' + display + '; position: ' + position + '; padding: ' + this.P + 'px; \n' +
                ' left: ' + this.L + 'px; top: ' + this.T + 'px; background-color: ' + this.Cb + '; float: '
                + (this.getPrivateAttrs()[0].Data !== "" ? this.getPrivateAttrs()[0].Data + ";" : 'none;') + ' \n' +
                ' width: ' + width + '; height: ' + height + ';\n' +
                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                ' border-radius: ' + this.R + 'px; opacity: ' + (this.Opacity / 100) + ';\n' +
                ' border-style: solid;\n' +
                ' border-color: ' + this.Cbb + ';\n' +
                ' border-width: ' + this.B + 'px;\n' +
                ' -webkit-transform: rotate(' + this.A + 'deg);\n' +
                ' -moz-transform: rotate(' + this.A + 'deg);\n' +
                ' -o-transform: rotate(' + this.A + 'deg);\n' +
                ' -ms-transform: rotate(' + this.A + 'deg);\n' +
                ' transform: rotate(' + this.A + 'deg);\n' +
                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; cursor : '
                + (this.getPrivateAttrs()[1].Data !== "" ? this.getPrivateAttrs()[1].Data + ";" : 'auto;')
                + ' \n' +
                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; z-index: ' + this.Zindex + ';"> \n' +
                '<img id="cont_img' + this.Id + '" src="' +
                (this.recurso !== null ?
                        this.GetFileResource(recursoInt) : "img/question5.png") + '" \n' +
                ' width="100%" height="100%" ' +
                ' ondragstart="return false" onselectstart="return false" />\n' +
                '</div>\n';

        if (!flag)
        {
            vars += '' + this.Name + ' = $("' + this.JqueryId + '");\n';
            instructs += '' + this.Name + '.image = function(i){ return (i != undefined ? $("' + this.JqueryId + '").find("#cont_img' + this.Id + '").attr("src", i) : $("' + this.JqueryId + '").find("#cont_img' + this.Id + '").attr("src")); };\n';
        }


        return code;
    };
}

// Herança
GImage.prototype = new Objetos();