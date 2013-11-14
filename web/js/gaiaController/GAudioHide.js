
/**
 * Classe que retorna
 * @returns {GAudioHide}
 */
function GAudioHide(largura, altura, topo, esquerda, visivel)
{
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GAudioHide";
        this.JqueryId = "#Haudio" + this.Id;
        
        this.returnCode = function(flag, isPreview)
        {
                var code;
                var display = "none";
                var bgColor = "transparent";
                var what;
                var flash = "";
                var recursoInt = this.recurso;
                //desmembra nome do arquivo para wav
                var fileTypes = (this.recurso !== -1 ?  "../" + LogedUser.UserName + "_" + LogedUser.cod + "/" +
                                                ptrProject.recursos.filter(function(element)
                                                {
                                                        return element.cod === recursoInt;
                                                })[0].Arquivo : "../audio/gaia.mp3").split(".mp3");
                
                if(!flag)
                {
                        if(this._visible)
                                display = "block";
                                flash = 	'<object id="Haudio'+ this.id +'swf" type="application/x-shockwave-flash" data="../swf/HiddenPlay.swf" width="1" height="1">\n'+
                                        '	<param name="allowScriptAccess" value="sameDomain">\n'+
                                        '	<param name="wmode" value="transparent">\n'+
                                        '	<param name="allowScriptAccess" value="sameDomain">\n'+
                                        '	<param name="FlashVars" value="path=' + fileTypes[0] + '.mp3" />\n'+
                                        '</object>\n';
                }
                else
                {
                        display = "block";
                        bgColor = "#9999CC";
                        what = '<img src="../img/ui-audio.png" ondragstart="return false" onselectstart="return false"> </img>';
                }

                code =	'<div id="Haudio' + this.Id + '" style="width: 1px; height: 1px; \n' +
                                'background-color:' + bgColor + '; display: block; position: absolute;\n' +
                                'left: ' + this.L + 'px; top: ' + this.T + 'px; z-index: ' + this.Zindex + '; opacity: ' + (!flag ? "0.001" : "1") + ';">\n'+
                                '<audio id="Haudio' + this.Id + 'aud" style="width: 1px; height:1px;">\n'+
                                        //sources para HTML5
                                ' <source src="' + fileTypes[0] + '.mp3" />\n'+
                                ' <source src="' + fileTypes[0] + '.ogg" />\n'+
                                        //se não tiver suporte flash neles
                                        flash +
                                '</audio>\n'+
                                        what +
                                '</div>';

                return code;
        }
}

GAudioHide.prototype = new Objetos();