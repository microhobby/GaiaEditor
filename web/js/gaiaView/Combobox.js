
/**
 * Declaração da Classe de Combobox BootStrap
 * Dependencias: JQUERY
 * @returns {Combobox}
 */
function Combobox()
{
        // campos privados
        
        /**  
         * @type ItemModel 
         */
        var _model = null;
        
        /** 
         * @type $ 
         */
        var _elem = null;
        
        /**
         * @type Item
         */
        var _selected = null;
        var _funcMouseListener = null;
        
        function arrange()
        {
                _elem.find(".dropdown-menu").html("");
                for(var i = 0; i < _model.getTam(); i++)
                {
                        var tmpElem = _model.get(i);
                         _elem.find(".dropdown-menu").html( _elem.find(".dropdown-menu").html() + '<li><a href="#" id="' + i + '" class="' + 
                                 _model.ObjectId + '">' + tmpElem.string + '</a></li>');
                }
                $("." + _model.ObjectId).click(function()
                {
                        var retObj = _model.get(parseInt($(this).attr('id')));
                        _selected = retObj;
                        _elem.find("button").html(_selected.string + ' <span class="caret"></span>');
                });
        }
        
        // Metodos publicos
        
        /**
         * Seta o elemento DOM que sera o container da lista
         */
        this.setElement = function(elem)
        {
                _elem = $(elem);
        };
        
        /**
         * @param {ItemModel} model
         */
        this.setModel = function(model)
        {
                _model = model;
                _model.addEventListener(function()
                {
                        arrange();
                });
                //arrange();
        };
        
        /**
         * @returns {Item}
         */
        this.getSelectedItem = function()
        {
                return _selected;
        };
}