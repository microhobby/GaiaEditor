
/* *
 * Classe para Input tipo text
 * @return {GInput}
 */
function GInput(largura, altura, topo, esquerda, visivel)
{
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GInput";
        this.JqueryId = "#GInput" + this.Id;
        this.Text = "Seu Texto aqui...";
        this.Name = "GInput" + this.Id;
        
        //@override
        this.returnCode = function(flag, isPreview)
        {
                if(flag == undefined)
                        flag = false;
                if(isPreview == undefined)
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
                
                code =	'\n<div id="GInput' + this.Id + '"\n' +
                                                ' style="display:' + display + '; position: absolute; \n' +
                                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + this.W + 'px; \n' +
                                                ' height: ' + this.H + 'px; padding: ' + this.P + 'px;\n' + 
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
                                                ' z-index: '+this.Zindex+'; color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + '" >\n' +
                                                '<input id="GInput' + this.Id + 'input" type="text" class="form-control" style="height: inherit;'+ 
                                                'padding: 5px; color: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit;'+
                                                ' text-decoration: inherit;" placeholder="">\n'+
                                                '</div>';
                
                return code;
        };
}

// Herança
GInput.prototype = new Objetos();