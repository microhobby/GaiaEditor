
/**
 * Classe que retorna
 * @returns {GDivStatic}
 */
function GDivStatic(largura, altura, topo, esquerda, visivel)
{
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "GDivStatic";
        this.JqueryId = "#divStatic" + this.Id;
        this.Cb = "#6666cc";
        
        this.returnCode = function(flag, isPreview)
        {
                if(flag == undefined)
                        flag = false;
                if(isPreview == undefined)
                        isPreview = false;
                
                var code;
                var display = "none";
                
                  if(!flag)
                {
                        if(this.Visible)
                                display = "block";
                }
                else
                        display = "block";
                
                code =	'\n<div id="divStatic' + this.Id + '"\n' +
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
                                                ' z-index: '+this.Zindex+';">\n' +
                                                        //vai ser o conteudo aqui
                                                '\n</div>\n';
			
                return code;
        };
}

// Herança
GDivStatic.prototype = new Objetos();