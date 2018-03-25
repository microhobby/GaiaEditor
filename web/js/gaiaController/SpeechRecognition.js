
/* *
 * Classe para API do Reconhecimento de Voz
 * @return {SpeechRecognition}
 */
function SpeechRecognition()
{
        var callBack = null;
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        
        recognition.onend = function()
        {
                recognition.start();
        };
        
        this.setHandller = function(func)
        {
                callBack = func;
                recognition.onresult = function(ev)
                {
                        if(ev.results[ev.results.length -1][0] && callBack)
                                callBack(ev.results[ev.results.length -1][0].transcript);
                };
        };
        
        this.Start = function()
        {
                recognition.start();
        };
        
        this.Stop = function()
        {
                recognition.stop();
        };
}