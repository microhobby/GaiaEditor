
/**
 * Classe que retorna
 * @returns {GAudio}
 */
function GAudio(largura, altura, topo, esquerda, visivel)
{
        var instructs = "";
        var vars = "";
        
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GAudio";
        this.Name = "Audio" + this.Id;
        this.JqueryId = "#GAudio" + this.Id;
        
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
                
                var code;
                var display = "none";
                var bgColor = "transparent";
                var what;
                var flash = "";
                var recursoInt = this.recurso;
                //desmembra nome do arquivo para wav
                var fileTypes = null;
                
                
                if((this.recurso !== null) && (this.GetFileResource(recursoInt).indexOf(".mp3") !== -1))
                        fileTypes = (this.recurso !== null ?  
                                                this.GetFileResource(recursoInt) : "../audio/gaia.mp3").split(".mp3");
                else if((this.recurso !== null) && (this.GetFileResource(recursoInt).indexOf(".ogg") !== -1))
                        fileTypes = (this.recurso !== null ?  
                                                this.GetFileResource(recursoInt) : "../audio/gaia.ogg").split(".ogg");
                else
                        fileTypes = (this.recurso !== null ?  
                                                this.GetFileResource(recursoInt) : "../audio/gaia.mp3").split(".mp3");
                
                if(!flag)
                {
                        if(this.Visible)
                                display = "block";
                                 flash = '<object type="application/x-shockwave-flash" data="../swf/player_mp3_maxi.swf" width="' + this.W + '" height="' + this.H + '">\n'+
                                        '	<param name="movie" value="../swf/player_mp3_maxi.swf" />\n'+
                                        '	<param name="bgcolor" value="#ffffff" />\n'+
                                        '	<param name="FlashVars" value="mp3=' + fileTypes[0] + '.mp3&amp;width=' + this.W + '&amp;height=' + this.H + '&amp;showvolume=1" />\n'+
                                        '</object>\n';
                }
                /*else
                {
                        display = "block";
                        bgColor = "#9999CC";
                        what = '<img src="../img/ui-audio.png" ondragstart="return false" onselectstart="return false"> </img>';
                }*/

                code = '<div id="GAudio' + this.Id + '" class="badWolf" style="width: ' + this.W + 'px; height: ' + this.H + 'px; \n' +
                                'background-color:' + bgColor + '; display: block; position: absolute;\n' +
                                'left: ' + this.L + 'px; top: ' + this.T + 'px; z-index: ' + this.Zindex + '; opacity: ' + (this.Opacity / 100) + ';">\n'+
                                '<audio controls id="GAudio' + this.Id + 'aud" preload="metadata" style="width: inherit; height: inherit;">\n'+
                                        //sources para HTML5
                                ' <source src="' + fileTypes[0] + '.mp3" />\n'+
                                ' <source src="' + fileTypes[0] + '.ogg" />\n'+
                                        //se não tiver suporte flash neles
                                        flash +
                                '</audio>\n'+
                                '</div>';
                        
                   vars += 'var ' + this.Name + ' = document.getElementById("GAudio' + this.Id + 'aud");\n';
                   instructs += '' + this.Name + ' = $.extend({}, ' + this.Name + ', $("' + this.JqueryId + '"));\n';

                return code;
        }
}

GAudio.prototype = new Objetos();