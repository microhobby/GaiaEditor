

/**
 * Classe que retorna
 * @returns {GImage}
 */
function GImage(largura, altura, topo, esquerda, visivel)
{
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GImage";
        this.Name = "Imagem" + this.Id;
        this.JqueryId = "#img" + this.Id;
        //this.recursos.push(new Recursos("Padrão", "Imagem", "../img/question5.png"));
        //this.recurso = -1;
        
        this.returnCode = function(flag, isPreview)
        {
                if(flag == undefined)
                        flag = false;
                if(isPreview == undefined)
                        isPreview = false;
                
                var code;
                var display = "none";
                var recursoInt = this.recurso;
                
                  if(!flag)
                {
                        if(this.Visible)
                                display = "block";
                }
                else
                        display = "block";
                
                code = 	'\n<div id="img' + this.Id + '" \n' +
                                                ' style="display:' + display + '; position: absolute; padding: ' + this.P + 'px; \n' +
                                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; background-color: ' + this.Cb + '; \n' +
                                                ' width: ' + this.W + 'px; height: ' + this.H + 'px;\n' +
                                                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                                                ' border-radius: ' + this.R + 'px; opacity: ' + (this.Opacity / 100) + ';\n' +
                                                ' -webkit-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -moz-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -o-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -ms-transform: rotate(' + this.A + 'deg);\n' +
                                                ' transform: rotate(' + this.A + 'deg);\n' +
                                                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; z-index: '+this.Zindex+';"> \n'+
                                                '<img id="cont_img' + this.Id + '" src="' +
                                                (this.recurso !== -1 ?  
                                                this.GetFileResource(recursoInt) : "img/question5.png") + '" \n' +
                                                ' width="100%" height="100%" ' +
                                                ' ondragstart="return false" onselectstart="return false" />\n' +
                                                '</div>\n';
                
                return code;
        };
}

// Herança
GImage.prototype = new Objetos();