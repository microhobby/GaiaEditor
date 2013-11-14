
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
        var _ix = 0;
        
        /**
         * @type Item
         */
        var _selected = null;
        var _funcMouseListener = null;
        var _propagate = true;
        
        function arrange()
        {
                _elem.find(".dropdown-menu").html("");
                for(var i = 0; i < _model.getTam(); i++)
                {
                        var tmpElem = _model.get(i);
                         _elem.find(".dropdown-menu").html( _elem.find(".dropdown-menu").html() + '<li><a href="#" id="' + i + '" class="' + 
                                 _model.ObjectId + '">' + tmpElem.string + '</a></li>');
                }
                _elem.find("." + _model.ObjectId).click(function()
                {
                        var retObj = _model.get(parseInt($(this).attr('id')));
                        _ix = parseInt($(this).attr('id'));
                        _selected = retObj;
                        _elem.find("button").html(_selected.string + ' <span class="caret"></span>');
                        if(_funcMouseListener && _propagate)
                                _funcMouseListener(retObj);
                        _propagate = true;
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
         * Seta indice de item selecionado e dispara change
         * @param {Integer} ind
         */
        this.setSelectIndex = function(ind, propagate)
        {
                if(propagate !== undefined)
                        _propagate = propagate;
                _elem.find("#" + ind).click();
        };
        
        this.getSelectIndex = function()
        {
                return _ix;
        };
        
        /**
         * @returns {Item}
         */
        this.getSelectedItem = function()
        {
                return _selected;
        };
        
        this.addMouseActionListener = function(func)
        {
                _funcMouseListener = func;
        };
}