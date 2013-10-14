
/**
 * Classe para file uploads
 * @returns {FileUpload}
 */
function FileUpload()
{
        'use strict';
        /**
         * @type $
         */
        var _elem = null;
        /**
         * @type String
         */
        var _file = "";
        /**
         * @type String
         */
        var _server = "";
        
        /**
         * Seta o elemento DOM que sera o container da lista
         */
        this.setElement = function(elem)
        {
                _elem = $(elem);
                $(elem + " .fileUpload").fileupload(
                {
                        url: _server,
                        dataType: 'json',
                        send: function()
                        {
                                $("#" + _elem.attr('id') + ' .progress').css("display", "block");
                        },
                        done: function (e, data)
                        {
                                $("#" + _elem.attr('id') + ' .progress').css("display", "none");
                                $.each(data.result.files, function (index, file) 
                                {
                                        $("#" + _elem.attr('id') + ' .fileDesc').html(file.name.split(".")[1] + "." + file.name.split(".")[2]);
                                        _file = file.name;
                                });
                        },
                        progressall: function (e, data) 
                        {
                                var progress = parseInt(data.loaded / data.total * 100, 10);
                                $("#" + _elem.attr('id') + ' .progress .progress-bar').css(
                                    'width',
                                    progress + '%'
                                );
                                $("#" + _elem.attr('id') + ' .fileDesc').html(progress + '%');   
                        },
                        fail: function(e, data)
                        {
                                $.each(data.files, function (index, file) 
                                {
                                        $("#" + _elem.attr('id') + ' .fileDesc').html(" Erro no Servidor!");
                                        $("#" + _elem.attr('id') + ' .progress').css("display", "none");
                                });
                        }
                }).prop('disabled', !$.support.fileInput) .parent().addClass($.support.fileInput ? undefined : 'disabled');
        };
        
        /**
         * Seta o endereço para aonde o arquivo será enviado
         */
        this.setUrl = function(url)
        {
                _server = url;
        };
        
        /**
         * Retorna o nome Default do arquivo
         * @returns {String}
         */
        this.getFileName = function()
        {
                return _file.split(".")[1] + "." + _file.split(".")[2];
        };
        
        /**
         * Retorna o nome do arquivo com seu Timestamp
         * @returns {String}
         */
        this.getRealFileName = function()
        {
                return _file;
        };
}