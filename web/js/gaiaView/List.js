
/**
 * Declaração da Classe Listas BootStrap
 * Dependencias: JQUERY
 * @returns {List}
 */
function List()
{
        // Campos privados
        
        /**
         * @type ItemModel
         */
        var _model = null;
        /**
         * @type $
         */
        var _elem = null;
        /**
         * @type $
         */
        var _input = null;
        var _funcMouseListener = null;
        
        // Metodos privados
        
        function arrange()
        {
                _elem.html("");
                for(var i = 0; i < _model.getTam(); i++)
                {
                        /** @type Item */
                        var tmpElem = _model.get(i);
                        _elem.html(_elem.html() + '<a href="#" id="' + i + '" class="list-group-item ' + _model.ObjectId + '">' 
                                + (tmpElem.icon !== undefined  ? '<i class="glyphicon "><img src="' + tmpElem.icon + '" '  +
                                (tmpElem.size !== undefined ? 'width="' + tmpElem.size + '" height="' + tmpElem.size + '"' : "")
                                +  ' /></i>  ' : "") + tmpElem.string + '</a>');
                }
                $("." + _model.ObjectId).click(function()
                {
                        var retObj = _model.get(parseInt($(this).attr('id')));
                        if(_funcMouseListener)
                                _funcMouseListener(retObj);
                });
        }
        
        function doFilter()
        {
                if(_input !== null && _input.val() !== "")
                {
                       _elem.html("");
                        for(var i = 0; i < _model.getTam(); i++)
                        {
                                var tmpElem = _model.get(i);
                                if(tmpElem.string.toUpperCase().indexOf(_input.val().toUpperCase()) !== -1)
                                {
                                        //_elem.html(_elem.html() + '<a href="#" id="' + i + '" class="list-group-item ' + _model.ObjectId + '">' + tmpElem.string + '</a>');
                                        _elem.html(_elem.html() + '<a href="#" id="' + i + '" class="list-group-item ' + _model.ObjectId + '">' 
                                                + (tmpElem.icon !== undefined  ? '<i class="glyphicon "><img src="' + tmpElem.icon + '" '  +
                                                (tmpElem.size !== undefined ? 'width="' + tmpElem.size + '" height="' + tmpElem.size + '"' : "")
                                                +  ' /></i>  ' : "") + tmpElem.string + '</a>');
                                }
                        }
                        $("." + _model.ObjectId).click(function()
                        {
                                var retObj = _model.get(parseInt($(this).attr('id')));
                                if(_funcMouseListener)
                                        _funcMouseListener(retObj);
                        });
                }
                else
                        arrange();
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
         * Seta um input para filtro
         */
        this.setInputFilter = function(elem)
        {
                _input = $(elem);
                _input.on('input', function()
                {
                        doFilter();
                });
        };
        
        this.addMouseActionListener = function(func)
        {
                _funcMouseListener = func;
        };
        
        this.click = this.addMouseActionListener;
}