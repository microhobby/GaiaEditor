

/* *
 * Classe para Objeto de Fonte de dados
 * @return {DBsource}
 */
function DBsource(entity, max, begin, where)
{
        var __linkedObjs = new Array();
        var __max = max;
        var __begin = begin;
        
        this.EntityName = entity;
        this.Data = new Array();
        this.Where = where;
        
        function dispatch(me)
        {
                setTimeout(function()
                {
                        me.Data = MproEntity.getAll(me.EntityName, [__begin, __max], undefined, me.Where);
                        for(var i = 0; i < __linkedObjs.length; i++)
                        {
                                var mdTmp = __linkedObjs[i];
                                mdTmp.model.clear();
                                
                                for(var j = 0; j < me.Data.length; j++)
                                {
                                        mdTmp.model.add(new Item(me.Data[j][mdTmp.collum], me.Data[j]));
                                }
                        }
                }, 100);
        }
        
        this.addLink = function(obj)
        {
                __linkedObjs.push(obj);
                dispatch(this);
        };
        
        this.setMaxResults = function(max)
        {
                __max = max;
                dispatch(this);
        };
        
        this.setBegin = function(begin)
        {
                __begin = begin;
                dispatch(this);
        };
        
        this.setWhere = function(wh)
        {
                this.Where = wh;
                __begin = 0;
                dispatch(this);
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
}