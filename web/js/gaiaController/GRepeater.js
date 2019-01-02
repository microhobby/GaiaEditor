
/**
 * Classe que retorna
 * @returns {GRepeater}
 */
function GRepeater(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        //var essaLista = new List();
        //var meuModelo = new ItemModel();
        
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "GRepeater";
        this.JqueryId = "#divStatic" + this.Id;
        this.Cb = "#6666cc";
        this.Name = "GRepeater" + this.Id;
        
        //@override
        this.returnCodeInstructs = function()
        {
                return instructs;
        };
        
        //@override
        this.returnCodeVars = function()
        {
                return vars;
        };
        
        //@override
        this.getPrivateAttrs = function()
        {
                return privateAttrs;
        };
        
        //@override
        this.resolveSpecialFields = function()
        {
                var privateAttrsTmp = JSON.parse(this.SpecialFields);
                for(var i = 0; i < privateAttrsTmp.length; i++)
                {
                        privateAttrs[i] = privateAttrsTmp[i];
                }
        };
        
        //@override
        this.parseSpecialFields = function()
        {
                this.SpecialFields = JSON.stringify(privateAttrs);
        };
        
        //@override
        this.canCreateVar = function()
        {
                return false;
        };
        
        this.getPrivateAttrs().push(new SpecialAttrs("Fonte", "objText", "setFonteDados", ""));
        this.getPrivateAttrs().push(new SpecialAttrs("Overflow", "objCombo", "setType", null, "modelOverflowTypes"));
        
        this.setFonteDados = function(nameFonte)
        {
                 this.getPrivateAttrs()[0].Data = nameFonte;
        };
        
        this.setType = function(type)
        {
                this.getPrivateAttrs()[1].Data = type;
                $(this.JqueryId).css("overflow", type);
        };
        
        this.returnCode = function(flag, isPreview)
        {
                // zera
                vars = "";
                instructs = "";
                
                if(flag == undefined)
                        flag = false;
                if(isPreview == undefined)
                        isPreview = false;
                
                var code;
                var display = "none";
                var position = "absolute";
                var width = "";
                var height = "";
                var over = null;
                
                if(this.StaticPos)
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
                
                  if(!flag)
                {
                        if(this.Visible)
                                display = "block";
                }
                else
                        display = "block";
                
                if(this.getPrivateAttrs()[0] !== undefined)
                        over = this.getPrivateAttrs()[0].Data;
                
                if(over)
                {
                        if(over.indexOf("-x") !== -1)
                        {
                                over = "overflow-x: " + over.replace("-x", "");
                        }
                        else if(over.indexOf("-y") !== -1)
                        {
                                over = "overflow-y: " + over.replace("-y", "");
                        }
                        else
                        {
                                over = "overflow: " + over;
                        }
                }
                
                code =	'\n<div id="divStatic' + this.Id + '"\n' +
                                                ' class="GReapeater badWolf" style="display:' + display + '; position: ' + position + '; \n' +
                                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + width + '; \n' +
                                                ' height: ' + height + '; padding: ' + this.P + 'px;\n' + 
                                                ' background-color: ' + this.Cb + '; ' +
                                                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                                                ' border-radius: ' + this.R + 'px;\n' +
                                                ' border-style: solid;\n' +
                                                ' border-color: ' + this.Cbb + ';\n' +
                                                ' border-width: ' + this.B + 'px;\n' +
                                                ' -webkit-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -moz-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -o-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -ms-transform: rotate(' + this.A + 'deg);\n' +
                                                ' transform: rotate(' + this.A + 'deg);\n' +
                                                ' ' + (over ? over :  'overflow: visible') + ';\n' +
                                                'box-sizing: initial; \n' +
                                                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; opacity: ' + (this.Opacity / 100) + ';' +
                                                ' z-index: '+this.Zindex+';">\n' +
                                                        //vai ser o conteudo aqui
                                                '\n</div>\n';
                                                
                        if(!flag)
                        {
                                vars += 'var ' + this.Name + ' = new Repeater("' + this.JqueryId + '");\n';
                                instructs += '' + this.Name + ' = $.extend({}, ' + this.Name + ', $("' + this.JqueryId + '"));\n';
                                if(this.getPrivateAttrs()[0].Data !== "")
                                {
                                        instructs +=    '' + this.Name + '.setDBsource(' + this.getPrivateAttrs()[0].Data + ');\n';
                                }
                        }
                        
                return code;
        };
}

// Herança
GRepeater.prototype = new Objetos();