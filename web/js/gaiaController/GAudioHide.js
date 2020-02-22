
/**
 * Classe que retorna
 * @returns {GAudioHide}
 */
function GAudioHide(largura, altura, topo, esquerda, visivel)
{
        var instructs = "";
        var vars = "";
        
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GAudioHide";
        this.Name = "Audio" + this.Id;
        this.JqueryId = "#Haudio" + this.Id;
        
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
                                flash = 	'<script>var ____fuctionHaudio' + this.Id + ' = new Object(); ____fuctionHaudio' + this.Id + 
                                        '.onUpdate = function(){ var clean = false; if(this.position == 0){ clean = true; if(____fuctionHaudio' + this.Id + '._eventsS){ for(var j = 0; j < ____fuctionHaudio' + this.Id + '._eventsS.length; j++){ if(____fuctionHaudio' + this.Id + '._eventsS[i]._runed){ ____fuctionHaudio' + this.Id + '._eventsS[i]._func(); ____fuctionHaudio' + this.Id + '._eventsS[i]._runed = true; }} }}else{ for(var j = 0; j < ____fuctionHaudio' + this.Id + '._eventsS.length; j++){ ____fuctionHaudio' + this.Id + '._eventsS[i]._runed = false; }} for(var i = 0; i < ____fuctionHaudio' + this.Id + '._events.length; i++){ if(clean){ ____fuctionHaudio' + this.Id + '._events[i]._runed = false; } if(____fuctionHaudio' + this.Id + '._events[i]._time <= (this.position * 1000)){ if(____fuctionHaudio' + this.Id + '._events[i]._func && !____fuctionHaudio' + this.Id + '._events[i]._runed){ ____fuctionHaudio' + this.Id + '._events[i]._func(); ____fuctionHaudio' + this.Id + '._events[i]._runed = true; }}} }</script>\n<object id="Haudio'+ this.Id +'swf" type="application/x-shockwave-flash" data="../swf/player_mp3_js.swf" width="1" height="1">\n'+
                                        '	<param name="allowScriptAccess" value="sameDomain">\n'+
                                        '	<param name="wmode" value="transparent">\n'+
                                        '	<param name="allowScriptAccess" value="sameDomain">\n'+
                                        '	<param name="FlashVars" value="listener=____fuctionHaudio' + this.Id + '&amp;interval=100&amp;mp3=' + fileTypes[0] + '.mp3" />\n'+
                                        '</object>\n';
                }
                else
                {
                        display = "block";
                        bgColor = "#9999CC";
                        what = '<img src="../img/ui-audio.png" ondragstart="return false" onselectstart="return false"> </img>';
                }

                code =	'<div id="Haudio' + this.Id + '" class="GAudioHide badWolf" style="width: 1px; height: 1px; \n' +
                                'background-color:' + bgColor + '; display: block; position: absolute;\n' +
                                'left: ' + this.L + 'px; top: ' + this.T + 'px; z-index: ' + this.Zindex + '; opacity: ' + (!flag ? "0.001" : "1") + ';">\n'+
                                '<audio id="Haudio' + this.Id + 'aud" preload="auto" style="width: 1px; height:1px;">\n'+
                                        //sources para HTML5
                                ' <source src="' + fileTypes[0] + '.mp3" />\n'+
                                ' <source src="' + fileTypes[0] + '.ogg" />\n'+
                                        //se não tiver suporte flash neles
                                        flash +
                                '</audio>\n'+
                                        what +
                                '</div>';
                        
                        vars += 'var ' + this.Name + ' = document.getElementById("Haudio' + this.Id + 'aud");\n';
                        instructs += '' + this.Name + ' = $.extend({}, ' + this.Name + ', $("' + this.JqueryId + '"));\n';

                return code;
        }
}

GAudioHide.prototype = new Objetos();