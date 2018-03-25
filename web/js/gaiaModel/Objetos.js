
/* *
 * Classe OBJETOS
 * @return {Objetos}
 */
function Objetos()
{
    //var privateAttrs;

    this.getPrivateAttrs = function ()
    {
        return [];
    };

    this.resolveSpecialFields = function ()
    {
        //privateAttrs = JSON.parse(this.SpecialFields);
    };

    this.parseSpecialFields = function ()
    {
        //this.SpecialFields = JSON.stringify(privateAttrs);
    };

    this.canCreateVar = function ()
    {
        return true;
    };

    this.returnCodeVars = function ()
    {
        return "";
    };

    this.returnCodeInstructs = function ()
    {
        return "";
    };

    this.init = function (largura, altura, topo, esquerda, visivel)
    {
        //privateAttrs = new Array();
        this.Id = Objetos.counterId++;
        this.JqueryId = "";
        this.W = largura;
        this.H = altura;
        this.T = topo;
        this.L = esquerda;
        this.A = 0;
        this.B = 0;
        this.P = 7;
        this.R = 0;
        this.S = -100;
        this.Cb = "transparent";                               // Color Background
        this.Cbb = "#211620";                                   // Color border
        this.Cs = "#211620";
        this.Font = "Arial";
        this.FontId = 0;
        this.Cf = "#000000";
        this.SizeFont = 11;
        this.Negrito = false;
        this.Italico = false;
        this.Subline = false;
        this.Visible = visivel;
        this.Zindex = 1;
        this.Opacity = 100;
        //this.Script = "";
        this.Text = "";
        this.FatherId = 0;
        //this.recursos = new Array();
        this.recurso = null;
        this.eventos = new Array();
        this.estados = new Array();
        this.ClassType = "Objetos";
        this.Name = "";
        this.Deleted = false;
        this.SpecialFields = "";
        this.StaticPos = false;
        this.Vss = 0.0;
        this.returned = false;
        this.cod = null;
        //this.superCod = 2147483647;
    };

    this.cast = function ()
    {
        for (var i = 0; i < this.eventos.length; i++)
        {
            this.eventos[i] = $.extend(new Eventos(), this.eventos[i]);
        }

        for (var i = 0; i < this.estados.length; i++)
        {
            this.estados[i] = $.extend(new window[this.estados[i].ClassType], this.estados[i]);
        }
    };

    this.setWidth = function (num)
    {
        this.W = num;
        $(this.JqueryId).css("width", num + "px");
    };

    this.setHeight = function (num)
    {
        this.H = num;
        $(this.JqueryId).css("height", num + "px");
    };

    this.setTop = function (num)
    {
        this.T = num;
        $(this.JqueryId).css("top", num + "px");
    }

    this.setLeft = function (num)
    {
        this.L = num;
        $(this.JqueryId).css("left", num + "px");
    };

    this.setPadding = function (num)
    {
        this.P = num;
        $(this.JqueryId).css("padding", num + "px");
    };

    this.setRadius = function (num)
    {
        this.R = num;
        $(this.JqueryId).css("border-radius", num + "px");
    };

    this.setShadow = function (num)
    {
        this.S = num;
        $(this.JqueryId).css("box-shadow", "9px 20px 18px " + num + "px " + this.Cs);
    };

    this.setShadowColor = function (hex)
    {
        this.Cs = hex;
        $(this.JqueryId).css("box-shadow", "9px 20px 18px " + this.S + "px " + this.Cs);
    };

    this.setZindex = function (num)
    {
        this.Zindex = num;
        $(this.JqueryId).css("z-index", num);
    };

    this.setBackgroundColor = function (hex)
    {
        this.Cb = hex;
        if (this.ClassType === "GButton" || this.ClassType === "GComboBox" || this.ClassType === "GUpload")
            $("#btDinamic" + this.Id).text('#myItems' + this.Id + ' > li > a:hover { background-image: linear-gradient(to bottom, #' + this.calculeHexHUE() + ' 0, ' + this.Cb + ' 100%); } #bt' + this.Id + '{ text-shadow: initial; background-image: linear-gradient(to bottom, #' + this.calculeHexHUE() + ' 0, ' + this.Cb + ' 100%); border-radius: 4px; -webkit-border-radius: 4px; -mox-border-radius: 4px; } #bt' + this.Id + ':active { background-color: ' + this.Cb + '; background-image: none;} border-radius: 4px; -webkit-border-radius: 4px; -mox-border-radius: 4px;');
        else if (this.ClassType === "GInput")
            $("#inputDinamic" + this.Id).text('#GInput' + this.Id + 'input:focus{\n' +
                    'border-color: rgba(' + this.parseRGB() + ', 0.8);\n' +
                    //'box-shadow: 0 1px 1px rgba(#000, 0.075) inset, 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                    'box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                    'outline: 0 none;}\n');
        else if (this.ClassType === "GCheckBox")
            $("#inputDinamic" + this.Id).text('#GCheckBox' + this.Id + 'input:focus{\n' +
                    'border-color: rgba(' + this.parseRGB() + ', 0.8);\n' +
                    //'box-shadow: 0 1px 1px rgba(#000, 0.075) inset, 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                    'box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                    'outline: 0 none;}\n');
        else if (this.ClassType === "GTextArea")
            $("#inputDinamic" + this.Id).text('#GTextArea' + this.Id + 'input:focus{\n' +
                    'border-color: rgba(' + this.parseRGB() + ', 0.8);\n' +
                    //'box-shadow: 0 1px 1px rgba(#000, 0.075) inset, 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                    'box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                    'outline: 0 none;}\n');
        else
        {
            $(this.JqueryId).css("background-color", hex);
        }
    };

    this.setBorder = function (num)
    {
        this.B = num;
        $(this.JqueryId).css("border-style", "solid");
        $(this.JqueryId).css("border-width", num);
        $(this.JqueryId).css("border-color", this.Cbb);
    };

    this.setBorderColor = function (hex)
    {
        this.Cbb = hex;
        $(this.JqueryId).css("border-color", this.Cbb);
    };

    this.setOpacity = function (num)
    {
        this.Opacity = num;
        $(this.JqueryId).css("opacity", this.Opacity / 100);
    };

    this.setSizeFont = function (num)
    {
        this.SizeFont = num;
        changeSizeFont(this.JqueryId, num);
    };

    this.setFontColor = function (cor)
    {
        this.Cf = cor;
        changeColorFont(this.JqueryId, cor);
    };

    this.setNegrito = function (val)
    {
        this.Negrito = val;
        changeFontN(this.JqueryId, (this.Negrito ? "bold" : "normal"));
    };

    this.setItalico = function (val)
    {
        this.Italico = val;
        changeFontI(this.JqueryId, (this.Italico ? "italic" : "normal"));
    };

    this.setSubline = function (val)
    {
        this.Subline = val;
        changeFontS(this.JqueryId, (this.Subline ? "underline" : "initial"));
    };

    this.setText = function (val)
    {
        this.Text = val;
        if (this.JqueryId.indexOf("GTable") !== -1)
            ;
        else if (this.JqueryId.indexOf("GInput") !== -1)
            $(this.JqueryId).find("input").attr("placeholder", this.Text);
        else if (this.JqueryId.indexOf("GTextArea") !== -1)
            $(this.JqueryId).find("textarea").attr("placeholder", this.Text);
        else if (this.JqueryId.indexOf("GTextEditor") !== -1)
            $("#GTextEditor" + this.Id + "Container").code(this.Text);
        else if (this.JqueryId.indexOf("GCheckBox") !== -1)
            $(this.JqueryId).find("#label").html(this.Text);
        else if ((this.JqueryId.indexOf("bt") === -1) && (this.JqueryId.indexOf("ComboBox") === -1))
            changeT(this.JqueryId, val);
        else
        {
            //$("#bt" + this.Id).html(val);
            $("#bt" + this.Id).find("#textHere").html(val);
        }
    };

    this.setVisible = function (val)
    {
        this.Visible = val;
    };

    this.setAngle = function (val)
    {
        this.A = val;
        $(this.JqueryId).rotate({angle: val});
    };

    this.setVar = function (vari)
    {
        this.Name = vari;
    };

    this.Clone = function ()
    {
        var obj = new window[this.ClassType]();
        $.extend(true, obj, this);
        return obj;
    };

    this.GetFileResource = function (recursoInt)
    {
        return "../" + LogedUser.UserName + "_" + LogedUser.cod + "/" + ptrProject.recursos.filter(function(element)
        {
            return element.cod === recursoInt;
        })[0].Arquivo;
        /*return "../dados/" + LogedUser.UserName + "_" + LogedUser.cod + "/" + ptrProject.recursos.filter(function (element)
        {
            return element.cod === recursoInt;
        })[0].Arquivo;*/
    };

    this.copy = function ()
    {
        /** @type Objetos */
        this.parseSpecialFields();
        var objRet = new window[this.ClassType]();
        objRet.A = this.A;
        objRet.B = this.B;
        objRet.Cb = this.Cb;
        objRet.Cbb = this.Cbb;
        objRet.Cf = this.Cf;
        objRet.ClassType = this.ClassType;
        objRet.Cs = this.Cs;
        objRet.Deleted = this.Deleted;
        objRet.FatherId = this.FatherId;
        objRet.Font = this.Font;
        objRet.H = this.H;
        objRet.Italico = this.Italico;
        objRet.L = this.L;
        objRet.Negrito = this.Negrito;
        objRet.Opacity = this.Opacity;
        objRet.P = this.P;
        objRet.R = this.R;
        objRet.S = this.S;
        objRet.SizeFont = this.SizeFont;
        objRet.SpecialFields = this.SpecialFields;
        objRet.StaticPos = this.StaticPos;
        objRet.Subline = this.Subline;
        objRet.T = this.T;
        objRet.Text = this.Text;
        objRet.Visible = this.Visible;
        objRet.Vss = this.Vss;
        objRet.W = this.W;
        objRet.Zindex = this.Zindex;

        // TODO copia field dos estados e eventos
        /*objRet.estados = $.extend(true, [], this.estados);
         objRet.eventos = $.extend(true, [], this.eventos);*/

        objRet.recurso = this.recurso;
        objRet.resolveSpecialFields();

        return objRet;
    };

    /**
     * Implementa rotinas de eventos dos elementos
     */
    this.implementGaiaEvents = function ()
    {
        var me = this;

        if (!this.StaticPos)
        {
            $(this.JqueryId).multidraggable({drag: function ()
                {
                    $(me.JqueryId).removeClass('gaiaFocused');
                    setTimeout(function ()
                    {
                        $(me.JqueryId).addClass('gaiaFocused');
                    }, 100);
                }, cancel: false});
            $(this.JqueryId).resizable();
        }

        // mostra label com o id do objeto
        $(this.JqueryId).mouseover(function (evt)
        {
            evt.stopPropagation();
            $(Objetos.jqueryLabel).text("#" + $(this).attr("id"));
            $(Objetos.jqueryLabel).show();
        }).mouseout(function (evt)
        {
            evt.stopPropagation();
            $(Objetos.jqueryLabel).hide();
        });
        // seleciona o cara
        $(this.JqueryId).bind("mousedown", function (event)
        {
            //event.preventDefault();
            event.stopPropagation();
            if (Objetos.grid)
            {
                $(".gaiaFocused").removeClass("gaiaFocused");
            }
            else
            {
                $(".gaiaFocused").removeClass("gaiaFocused")
            }
            $(this).addClass("gaiaFocused");

            if (event.ctrlKey)
                $(this).addClass('ui-multidraggable');

            /*for(var i = 0; i < Objetos.selectAssigns.length; i++)
             {
             Objetos.selectAssigns[i](me);
             }*/
        }).bind("mouseup", function (event)
        {
            //event.stopPropagation();
            //event.preventDefault();
            for (var i = 0; i < Objetos.selectAssigns.length; i++)
            {
                Objetos.selectAssigns[i](me);
            }
            /*$(me.JqueryId).multidraggable("destroy");
             $(me.JqueryId).multidraggable({cancel:false});*/
        });
    };
}

function SpecialAttrs(name, type, method, data, model)
{
    this.Name = name;
    this.Type = type;
    this.Method = method;
    this.Data = data;
    this.Model = model;
}

// Estaticos
Objetos.counterId = 0;
Objetos.grid = false;
Objetos.jqueryLabel = null;
Objetos.selectAssigns = [];

Objetos.addSelectListener = function (func)
{
    Objetos.selectAssigns.push(func);
};