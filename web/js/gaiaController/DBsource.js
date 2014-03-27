

/* *
 * Classe para Objeto de Fonte de dados
 * @return {DBsource}
 */
function DBsource(entity, max, begin, where, ord)
{
        var __linkedObjs = new Array();
        var __max = max;
        var __begin = begin;
        var __dataLoaded = false;
        var __funcMouseListener = [];
        
        this.EntityName = entity;
        this.Data = new Array();
        this.Where = where;
        this.OrdBy = ord;
        
        function dispatch(me)
        {
                setTimeout(function()
                {
                        //me.Data = MproEntity.getAll(me.EntityName, [__begin, __max], undefined, me.Where, me.OrdBy);
                        showLoading();
                        MproEntity.getAll(me.EntityName, function(data)
                        {
                                me.Data = data;
                                addDataToModel(me);
                                __dataLoaded = true;
                                for(var i = 0; i < __funcMouseListener.length; i++)
                                        __funcMouseListener[i]();
                                hideLoading();
                                magic();
                        }, [__begin, __max], undefined, me.Where, me.OrdBy);
                }, 100);
        }
        
        function addDataToModel(me)
        {
                for(var i = 0; i < __linkedObjs.length; i++)
                {
                        var mdTmp = __linkedObjs[i];
                        mdTmp.model.clear();

                        for(var j = 0; j < me.Data.length; j++)
                        {
                                mdTmp.model.add(new Item(me.Data[j][mdTmp.collum], me.Data[j]));
                        }
                }
        }
        
        this.addLink = function(obj)
        {
                __linkedObjs.push(obj);
                if(!__dataLoaded)
                        dispatch(this);
                else
                        addDataToModel(this);
        };
        
        this.setMaxResults = function(max, can)
        {
                __max = max;
                if(can === undefined || can === true)
                        dispatch(this);
        };
        
        this.setBegin = function(begin, can)
        {
                __begin = begin;
                if(can === undefined || can === true)
                        dispatch(this);
        };
        
        this.setWhere = function(wh, can)
        {
                this.Where = wh;
                __begin = 0;
                if(can === undefined || can === true)
                        dispatch(this);
        };
        
        this.setOrdBy = function(ord, can)
        {
                this.OrdBy = ord;
                if(can === undefined || can === true)
                        dispatch(this);
        };
        
        this.setListener = function(func)
        {
                __funcMouseListener.push(func);
        };
        
        this.prox = function()
        {
                if(this.Data.length >= __max)
                        __begin += __max;
                dispatch(this);
        };
        
        this.back = function()
        {
                if(__begin > 0)
                        __begin -= __max;
                dispatch(this);
        };
        
        this.getData = function()
        {
                dispatch(this);
        };
        
        //dispatch(this);
}