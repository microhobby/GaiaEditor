
/**
 * Declaração da Classe de ColorPicker Bootstrap
 * @returns {ColorPicker}
 */
function ColorPicker()
{
        /**
         * @type String
         */
        var _color = "#ffff";
        var _func = null;
        var _trans = false;
        /**
         * @type $
         */
        var _elem = null;
        
        /**
         * Seta o elemento DOM que sera o container da lista
         */
        this.setElement = function(elem)
        {
                _elem = $(elem);
                _elem.colorpicker();
                _elem.colorpicker().on('changeColor', function(ev)
                {
                        if(_trans)
                        {
                                ev.color.a = 0;
                                _trans = false;
                        }
                        else
                        {
                                _color = ev.color.toHex();
                                ev.color.a = 1;
                        }
                        
                        if(_func !== null && _func !== undefined)
                                _func(ev.color.toHex());
                });
                _elem.find("input").change(function()
                {
                        _color = $(this).val();
                        if($(this).val() === "transparent")
                                _trans = true;
                        
                        _elem.colorpicker('setValue', $(this).val());
                        if(_func !== null && _func !== undefined)
                                _func($(this).val());
                });
        };
        
        /**
         * Pega o valor de cor hexa escolhido
         * @returns {String}
         */
        this.getColor = function()
        {
                return _color;
        };
        
        /**
         * Seta o valor hexa da cor do elemento
         * @param {Strnig} hex
         */
        this.setColor = function(hex)
        {
                _color = hex;
                
                if(hex === "transparent")
                        _trans = true;
                
                _elem.colorpicker('setValue', hex);
                _elem.find("input").val(hex);
        };
        
        this.onColorChange = function(func)
        {
                _func = func;
        };
}