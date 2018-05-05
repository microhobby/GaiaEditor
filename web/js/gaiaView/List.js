
/**
 * Declaração da Classe Listas BootStrap
 * Dependencias: JQUERY
 * @returns {List}
 */
function List()
{
        // Campos privados
        var myId = List.ID;
        List.ID++;
        
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
        var _funcWhellClickListener = null;
        
        this.reArrange = function()
        {
                arrange();
        };
        
        // Metodos privados
        
        function arrange()
        {
                _elem.html("");
                var _check = false;
                
                for(var i = 0; i < _model.getTam(); i++)
                {
                        /** @type Item */
                        var tmpElem = _model.get(i);
                        if(tmpElem.icon !== "check")
                        {
                                _elem.html(_elem.html() + '<a href="javascript:void(0)" id="' + i + '" class="list-group-item ' + _model.ObjectId + '">' 
                                        + (tmpElem.icon !== undefined  ? '<i class="glyphicon "><img src="' + tmpElem.icon + '" '  +
                                        (tmpElem.size !== undefined ? 'width="' + tmpElem.size + '" height="' + tmpElem.size + '"' : "")
                                        +  ' /></i>  ' : "") + tmpElem.string + '</a>');
                        }
                        else
                        {
                                _check = true;
                                _elem.html(_elem.html() + '<a href="javascript:void(0)" id="' + i + '" class="list-group-item labelis">' 
                                        + '<input type="checkbox" id="' + i + '" class="' + _model.ObjectId + '">  ' + tmpElem.string + '</a>');
                        }
                }
                
                if(_check)
                {
                        /* whell click */
                        $("." + _model.ObjectId).mousedown(function(e)
                        {
                            var retObj = _model
                                    .get(parseInt($(this).attr('id')));

                            if(_funcWhellClickListener && e.which == 2) {
                                e.stopPropagation();
                                 _funcWhellClickListener(retObj, 
                                        $(this).is(":checked"));
                            }
                        });
                        $("." + _model.ObjectId).click(function()
                        {
                                var retObj = _model.get(parseInt($(this).attr('id')));
                                if(_funcMouseListener)
                                        _funcMouseListener(retObj, $(this).is(":checked"));
                        });
                        /*$(".labelis").mousedown(function(e)
                        {
                                var retObj = _model.get(parseInt($(this).attr('id')));
                                e.stopPropagation();
                                 _funcMouseListener(retObj, null, 2);
                        });*/
                }
                else
                {
                        /* whell click */
                        $("." + _model.ObjectId).mousedown(function(e)
                        {
                            var retObj = _model
                                    .get(parseInt($(this).attr('id')));

                            if(_funcWhellClickListener && e.which == 2) {
                                e.stopPropagation();
                                 _funcWhellClickListener(retObj, 
                                        $(this).is(":checked"));
                            }
                        });
                        $("." + _model.ObjectId).click(function()
                        {
                                var retObj = _model.get(parseInt($(this).attr('id')));
                                if(_funcMouseListener)
                                        _funcMouseListener(retObj);
                        });
                }
        }
        
        function doFilter()
        {
                if(_input !== null && _input.val() !== "")
                {
                       _elem.html("");
                       var _check = false;
                       
                        for(var i = 0; i < _model.getTam(); i++)
                        {
                                var tmpElem = _model.get(i);
                                if(tmpElem.string.toUpperCase().indexOf(_input.val().toUpperCase()) !== -1)
                                {
                                        //_elem.html(_elem.html() + '<a href="#" id="' + i + '" class="list-group-item ' + _model.ObjectId + '">' + tmpElem.string + '</a>');
                                        if(tmpElem.icon !== "check")
                                        {
                                                _elem.html(_elem.html() + '<a href="#" id="' + i + '" class="list-group-item ' + _model.ObjectId + '">' 
                                                        + (tmpElem.icon !== undefined  ? '<i class="glyphicon "><img src="' + tmpElem.icon + '" '  +
                                                        (tmpElem.size !== undefined ? 'width="' + tmpElem.size + '" height="' + tmpElem.size + '"' : "")
                                                        +  ' /></i>  ' : "") + tmpElem.string + '</a>');
                                        }
                                        else
                                        {
                                                _check = true;
                                                _elem.html(_elem.html() + '<a href="#" id="' + i + '" class="list-group-item">' 
                                                        + '<input type="checkbox" id="' + i + '" class="' + _model.ObjectId + '">  ' + tmpElem.string + '</a>');
                                        }
                                }
                        }
                        
                        if(_check)
                        {
                                /* whell click */
                                $("." + _model.ObjectId).mousedown(function(e)
                                {
                                    var retObj = _model
                                            .get(parseInt($(this).attr('id')));

                                    if(_funcWhellClickListener && e.which == 2) {
                                        e.stopPropagation();
                                         _funcWhellClickListener(retObj, 
                                                $(this).is(":checked"));
                                    }
                                });
                                $("." + _model.ObjectId).change(function()
                                {
                                        var retObj = _model.get(parseInt($(this).attr('id')));
                                        if(_funcMouseListener)
                                                _funcMouseListener(retObj, $(this).is(":checked"));
                                });
                        }
                        else
                        {
                                /* whell click */
                                $("." + _model.ObjectId).mousedown(function(e)
                                {
                                    var retObj = _model
                                            .get(parseInt($(this).attr('id')));

                                    if(_funcWhellClickListener && e.which == 2) {
                                        e.stopPropagation();
                                         _funcWhellClickListener(retObj, 
                                                $(this).is(":checked"));
                                    }
                                });
                                $("." + _model.ObjectId).click(function()
                                {
                                        var retObj = _model.get(parseInt($(this).attr('id')));
                                        if(_funcMouseListener)
                                                _funcMouseListener(retObj);
                                });
                        }
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
        
        /* this will copy the project oremos */
        this.addWhellClickListener = function (func)
        {
            _funcWhellClickListener = func;
        };
        
        this.click = this.addMouseActionListener;
        this.whellclick = this.addWhellClickListener;
}

List.ID = 0;