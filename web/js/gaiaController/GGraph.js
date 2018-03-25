

/**
 * Classe que retorna
 * @returns {GGraph}
 */
function GGraph(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "GGraph";
        this.JqueryId = "#GGraph" + this.Id;
        this.Cb = "#6666cc";
        this.Name = "GGraph" + this.Id;
        
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
                if(this.SpecialFields !== "")
                {
                        var privateAttrsTmp = JSON.parse(this.SpecialFields);
                        for(var i = 0; i < privateAttrsTmp.length; i++)
                        {
                                privateAttrs[i] = privateAttrsTmp[i];
                        }
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
        this.getPrivateAttrs().push(new SpecialAttrs("Campo", "objText", "setField", ""));
        this.getPrivateAttrs().push(new SpecialAttrs("Tipo", "objCombo", "setTipo", null, "modelChartTypes"));
        
        this.setFonteDados = function(nameFonte)
        {
                 this.getPrivateAttrs()[0].Data = nameFonte;
        };
        
        this.setField = function(collums)
        {
                this.getPrivateAttrs()[1].Data = collums;
        };
        
        this.setTipo = function(typeName)
        {
                this.getPrivateAttrs()[2].Data = typeName;
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
                var italico = "italic";
                var negrito = "bold";
                var subline = "underline";
                
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
                
                if(!this.Italico)
                        italico = "normal";
                if(!this.Negrito)
                        negrito = "normal";
                if(!this.Subline)
                        subline = "normal";
                
                code =	'\n<div id="GGraph' + this.Id + '"\n' +
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
                                                ' color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + ';\n' +
                                                ' z-index: '+this.Zindex+';">\n' +

                                                '<canvas id="canvasGGraph' + this.Id + '" width="' + this.W + '" height="' + this.H + '"></canvas>' +
                                                        //vai ser o conteudo aqui
                                                        //this.Text +
                                                '\n</div>\n';
                                                
                        if(!flag)
                        {
                                vars += 'var ' + this.Name + ' = new MproChart($("' + this.JqueryId + '"), "' +
                                        (this.getPrivateAttrs()[2].Data !== "" ? this.getPrivateAttrs()[2].Data : 'Line') +
                                '");\n';
                                instructs += '' + this.Name + ' = $.extend({}, ' + this.Name + ', $("' + this.JqueryId + '"));\n';


                                if(this.getPrivateAttrs()[0].Data !== "" && this.getPrivateAttrs()[0].Data.indexOf("@") === -1)
                                {
                                        instructs +=    '' + this.Name + '.setDBsource(' + this.getPrivateAttrs()[0].Data + ', 0);\n';
                                }
                                
                                if(this.getPrivateAttrs()[1].Data !== "")
                                {
                                        instructs += '' + this.Name + '.setFieldMap("' + this.getPrivateAttrs()[1].Data + '");\n';
                                }
                        }
                        
                return code;
        };
}

// Herança
GGraph.prototype = new Objetos();