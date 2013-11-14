
/**
 * Classe que retorna HTML de button
 * @returns {GButton}
 */
function GButton(largura, altura, topo, esquerda, visivel)
{
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "GButton";
        this.JqueryId = "#cont_bt" + this.Id;
        this.Text = "Ok";
        this.SizeFont = 11;
        
        this.returnCode = function(flag, isPreview)
        {
                 if(flag === undefined)
                        flag = false;
                if(isPreview === undefined)
                        isPreview = false;
                
                var code;
                var display = "none";
                var italico = "italic";
                var negrito = "bold";
                var subline = "underline";

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
                
                
                code =    '\n<div id="cont_bt' + this.Id +'"\n' +
                                ' style="display: ' + display + '; position:absolute;\n' +
                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; ' +
                                ' height: ' + this.H + 'px; width: ' + this.W + 'px; \n' +
                                ' background-color: ' + this.Cb + '; padding: ' + this._p + "px; \n" +
                                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                                ' border-radius: ' + this.R + 'px; opacity: ' + this.Opacity + ';\n' +
                                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; z-index: '+this.Zindex+';' +
                                ' color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + ';\n' +
                                '" class="">\n' +
                                '	<button id="bt'+this.Id+'" class="btn btn-primary buttonOk">' + this.Text + '</button>\n' +
                                '</div>\n\n';

                return code;
        }
}

// Herança
GButton.prototype = new Objetos();