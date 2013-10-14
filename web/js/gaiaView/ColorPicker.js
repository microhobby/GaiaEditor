
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
                        _color = ev.color.toHex();
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
}