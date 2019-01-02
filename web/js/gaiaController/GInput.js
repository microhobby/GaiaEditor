
/* *
 * Classe para Input tipo text
 * @return {GInput}
 */
function GInput(largura, altura, topo, esquerda, visivel)
{
    var privateAttrs = new Array();
    var instructs = "";
    var vars = "";

    this.init(largura, altura, topo, esquerda, visivel);

    this.ClassType = "GInput";
    this.JqueryId = "#GInput" + this.Id;
    this.Text = "";
    this.Name = "GInput" + this.Id;
    this.Cb = "#66AFE9";

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

    //this.getPrivateAttrs().push(new SpecialAttrs("Tipo", "objText", "setType", "text"));
    this.getPrivateAttrs().push(new SpecialAttrs("Tipo", "objCombo", "setType", null, "modelInputTypes"));
    this.getPrivateAttrs().push(new SpecialAttrs("MproTag", "objText", "setMproTag", ""));

    this.setMproTag = function (tag)
    {
        this.getPrivateAttrs()[1].Data = tag;
    };

    this.setType = function (type)
    {
        this.getPrivateAttrs()[0].Data = type;
        $(this.JqueryId).find("input").get(0).type = type;
    };

    this.parseRGB = function ()
    {
        return parseInt(this.Cb.substring(1, 3), 16) + ',' + parseInt(this.Cb.substring(3, 5), 16) + ',' + parseInt(this.Cb.substring(5, 7), 16);
    };

    //@override
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
        var italico = "italic";
        var negrito = "bold";
        var subline = "underline";
        var position = "absolute";
        var width = "";
        var height = "";

        if (this.StaticPos)
        {
            width = "auto";
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

        if (!this.Italico)
            italico = "normal";
        if (!this.Negrito)
            negrito = "normal";
        if (!this.Subline)
            subline = "normal";

        code = '\n<div id="GInput' + this.Id + '"\n' +
                ' class="GInput badWolf" style="display:' + display + '; position: ' + position + '; \n' +
                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + width + '; \n' +
                ' height: ' + height + '; padding: ' + this.P + 'px;\n' +
                ' /*background-color: ' + this.Cb + '; */ ' +
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
                ' z-index: ' + this.Zindex + '; color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + '" mprotag="'
                + this.getPrivateAttrs()[1].Data
                + '">\n' +
                '<style id="inputDinamic' + this.Id + '">\n' +
                '#GInput' + this.Id + 'input:focus{\n' +
                'border-color: rgba(' + this.parseRGB() + ', 0.8);\n' +
                //'box-shadow: 0 1px 1px rgba(#000, 0.075) inset, 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                'box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                'outline: 0 none;}\n' +
                '</style>\n' +
                '<input id="GInput' + this.Id + 'input" type="'
                + (this.getPrivateAttrs()[0].Data != "" || this.getPrivateAttrs()[0].Data != null ? this.getPrivateAttrs()[0].Data : "text")
                + '" class="form-control" style="height: inherit;' +
                'padding: 5px; color: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit;' +
                ' text-decoration: inherit;" placeholder="' + this.Text + '">\n' +
                '</div>';

        vars += "" + this.Name + " = $('" + this.JqueryId + "');\n";
        instructs += "" + this.Name + ".text = function(arg)"
                + "{ return (arg != undefined ? $('" + this.JqueryId + "').find('input').val(arg) : $('" + this.JqueryId + "').find('input').val()); }\n";

        return code;
    };
}

// Herança
GInput.prototype = new Objetos();