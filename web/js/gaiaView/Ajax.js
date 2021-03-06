
/**
 * Classe para abstrair a manipulação de Ajax
 * @returns {Ajax}
 */
function Ajax()
{
        this.Url = "";
        var _data = "";
        var _funcS = null;
        var _funcE = null;
        $.ajaxSetup({ cache: false });
        
        /**
         * Seta os parametros para o Ajax
         * @param {Object} data
         */
        this.setData = function(data)
        {
                _data = data;
        };
        
        /**
         * Seta listener de sucesso
         */
        this.onSucces = function(funcs)
        {
                _funcS = funcs;
        };
        
        /**
         * Seta listener de erro
         */
        this.onError = function(funce)
        {
               _funcE = funce; 
        };
        
        /**
         * Executa a transação Ajax
         */
        this.execute = function(_async)
        {
                if(_async === undefined)
                        _async = true;
                
                $.ajax({
                            async: _async,
                            type:'post',
                            cache: false,
                            url: this.Url + "?nada=" + new Date().getTime() + Math.random(),
                            data: _data,
                            success: function(data)
                            {
                                        if(_funcS !== null)
                                                _funcS(data);
                            } ,
                            error: function(data)
                            {
                                    console.log(data);
                                    if(_funcE !== null)
                                            _funcE(data);
                            }
                });
        };
}