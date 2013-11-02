
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
        this.execute = function()
        {
                $.ajax({
                            async: true,
                            type:'post',
                            cache:false,
                            url: this.Url,
                            data: _data,
                            success: function(data)
                            {
                                        if(_funcS !== null)
                                                _funcS(data);
                            } ,
                            error: function(data)
                            {
                                    if(_funcE !== null)
                                            _funcE(data);
                            }
                });
        };
}