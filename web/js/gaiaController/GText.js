
/**
 * Classe que retorna HTML de texto
 * @returns {GText}
 */
function GText(largura, altura, topo, esquerda, visivel)
{
        var instructs = "";
        var vars = "";
        
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "GText";
        this.JqueryId = "#text" + this.Id;
        this.Text = "Seu Texto aqui...";
        this.Name = "GText" + this.Id;
        
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
        this.canCreateVar = function()
        {
                return false;
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
                var italico = "italic";
                var negrito = "bold";
                var subline = "underline";
                var position = "absolute";
                var width = "";

                if(!flag)
                {
                        if(this.Visible)
                                display = "block";
                }
                else
                        display = "block";

                if(this.StaticPos)
                {
                        width = "auto";
                        position = "static";
                }
                else
                        width = this.W + "px";

                if(!this.Italico)
                        italico = "normal";
                if(!this.Negrito)
                        negrito = "normal";
                if(!this.Subline)
                        subline = "normal";
                
                code =	'\n<div id="text' + this.Id + '"\n' +
                                                ' class="badWolf" style="display:' + display + '; position: ' + position + '; \n' +
                                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + width + '; \n' +
                                                ' height: ' + this.H + 'px; padding: ' + this.P + 'px;\n' + 
                                                ' background-color: ' + this.Cb + '; ' +
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
                                                'box-sizing: initial; \n' +
                                                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; z-index: '+this.Zindex+';\n' +
                                                ' color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + '">\n' +
                                                        this.Text +
                                        '\n</div>\n';
                                
                                
                                if(!flag)
                                {
                                        vars += 'var ' + this.Name + ' = $("' + this.JqueryId + '");\n';
                                        instructs += '' + this.Name + '.text = function(t){ return (t != undefined ? $("' + this.JqueryId + '").html(t) : $("' + this.JqueryId + '").html()); };\n';
                                }
			
                return code;
        };
}

// Herança
GText.prototype = new Objetos();