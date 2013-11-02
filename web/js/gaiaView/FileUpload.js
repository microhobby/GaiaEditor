
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
         * @returns {function}
         */
        var _func = null;
        
        /**
         * Seta o elemento DOM que sera o container da lista
         */
        this.setElement = function(elem)
        {
                _elem = $(elem);
                
                _elem.find("input").change(function()
                {
                        var file = this.files[0];
                        
                        /*if(file.size > 1000000)
                                alert("Arquivo muito grande!");
                        else
                        {*/
                                var formData = new FormData();
                                formData.append("files[]", file);
                                $.ajax(
                                {
                                        url: _server,
                                        type: 'POST',
                                        xhr: function() 
                                        {
                                                $("#" + _elem.attr('id') + ' .progress').css("display", "block");
                                                var myXhr = $.ajaxSettings.xhr();
                                                if(myXhr.upload)
                                                {
                                                        myXhr.upload.addEventListener('progress', function(data)
                                                        {
                                                                var progress = parseInt(data.loaded / data.total * 100, 10);
                                                                $("#" + _elem.attr('id') + ' .progress .progress-bar').css(
                                                                    'width',
                                                                    progress + '%'
                                                                );
                                                                $("#" + _elem.attr('id') + ' .fileDesc').html(progress + '%');  
                                                        }, false);
                                                }
                                                return myXhr;
                                        },
                                        success: function(data) 
                                        {
                                                $("#" + _elem.attr('id') + ' .progress').css("display", "none");
                                                data = $.parseJSON(data);
                                                $.each(data.files, function (index, file) 
                                                {
                                                        $("#" + _elem.attr('id') + ' .fileDesc').html(file.name.split(".")[1] + "." + file.name.split(".")[2]);
                                                        _file = file.name;
                                                        $("#" + _elem.attr('id') + ' .fileDesc').attr("title", file.name.split(".")[1] + "." + file.name.split(".")[2]);
                                                });

                                                if(_func !== null && _file !== "0.Erro no servidor!. ")
                                                {
                                                        _func();
                                                }
                                        },
                                        error: function(err) 
                                        {
                                                $("#" + _elem.attr('id') + ' .fileDesc').html(" Erro no Servidor!");
                                                $("#" + _elem.attr('id') + ' .progress').css("display", "none");
                                        },
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false
                                    }, 'json');
                        /*}*/
                        
                        console.log(this.files[0]);
                });
                
               /* $(elem + " .fileUpload").fileupload(
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
                                        $("#" + _elem.attr('id') + ' .fileDesc').attr("title", file.name.split(".")[1] + "." + file.name.split(".")[2]);
                                });
                                
                                if(_func !== null && _file !== "0.Erro no servidor!. ")
                                {
                                        _func();
                                }
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
                }).prop('disabled', !$.support.fileInput) .parent().addClass($.support.fileInput ? undefined : 'disabled');*/
        };
        
        /**
         * Seta o endereço para aonde o arquivo será enviado
         */
        this.setUrl = function(url)
        {
                _server = url;
        };
        
        /**
         * Seta o nome do arquivo
         * @param {String} str
         */
        this.setFile = function(str)
        {
                $("#" + _elem.attr('id') + ' .fileDesc').html(str.split(".")[1] + "." + str.split(".")[2]);
                _file = str;
                 $("#" + _elem.attr('id') + ' .fileDesc').attr("title", str.split(".")[1] + "." + str.split(".")[2]);
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
        
        /**
         * Seta função para ser disparada ao completar o upload
         */
        this.onComplete = function(func)
        {
                _func = func;
        };
}