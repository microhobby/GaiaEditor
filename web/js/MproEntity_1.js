
/**
 * Declaração da Classe MproEntity
 * @returns {MproEntity}
 */
function MproEntity()
{
        var me = this;
        var joined = false;
        var namesRelation = new Array();
        this.cod = 2147483647;
        this.superCod = 2147483647;
        this.RefObject = null;
        MproEntity.scriptExecution = "";
        MproEntity.scriptQuery = "";
        var openshift = getCookie("openshift") === "sim" ? true : false;
        
        if(openshift)
        {
                MproEntity.scriptExecution = "http://gaia.mpro3.com.br/system/Executions.jsp";
                MproEntity.scriptQuery = "http://gaia.mpro3.com.br/system/Query.jsp"; 
                /*MproEntity.scriptExecution = "http://localhost:8084/GaiaEditor/system/Executions.jsp";
                MproEntity.scriptQuery = "http://localhost:8084/GaiaEditor/system/Query.jsp";  */
        }
        else
        {
                MproEntity.scriptExecution = "../MproEntity/Executions.php";
                MproEntity.scriptQuery = "../MproEntity/Query.php"
        }
        
        if(this.class === undefined)
                this.class = "";
        
        this.Delete = function(classref, codref)
        {    };
        
        this.Save = function(classref, codref, ix)
        { };
        
        function getValues()
        {
                var string = "";
                return string;
        }
        
        function getValuesUpdates()
        {
                var string = "";
                return string;
        }
        
        function init()
        { }
        
        function toNull()
        { }
        
        toNull();
        init();
}

//MproEntity.getWhere = function(classe, superFilter, objFilter)
/**
 * 
 * @param {Entity} classe
 * @returns {unresolved}
 */
MproEntity.getWhere = function(classe)
{
        return [];
};

MproEntity.getAll = function(classe, callBack, limiter, superFilter, where, ordBy, sync, end, ix)
{
        return [];
};

MproEntity.setServer = function(url, tec)
{     
        window.mproEntityBridge = undefined;
        MproEntity.scriptExecution =  url + "/Executions" + (tec == undefined ? "" : ("." + tec));
        MproEntity.scriptQuery =  url + "/Query" + (tec == undefined ? "" : ("." + tec));
};

MproEntity.Logic = function(val, comparator, logicNext)
{
        this.val = val;
        this.comparator = comparator;
        this.logicNext = logicNext;
};

MproEntity.Order = function(classType, desc)
{
        this.Classe = classType;
        this.OrderBy = desc;
};

MproEntity.GT = " > ";
MproEntity.GTE = " >= ";
MproEntity.LT = " < ";
MproEntity.LTE = " <= ";
MproEntity.LIKE = " LIKE ";
MproEntity.EQUAL = " = ";
MproEntity.AND = " AND ";
MproEntity.OR = " OR ";