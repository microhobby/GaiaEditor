
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
        
        if(this.class === undefined)
                this.class = "";
        
        this.Save = function()
        {
                var sql = new Array();
                var insert = "";
                
                if(me.cod === 2147483647)
                {
                        sql.push("INSERT INTO " + me.class + " VALUES(NULL, " + getValues() + ")");
                        insert = "ver";
                }
                else
                {
                        sql.push("UPDATE " + me.class + " SET " + getValuesUpdates() + " WHERE cod = " + me.cod);
                }
                
                if(!window.mproEntityBridge)
                {
                        var tmpNamesRelation = $.extend(true, [], namesRelation);
                        var ajax = new Ajax();
                        ajax.Url = "../MproEntity/Executions.php";
                        ajax.setData({jsonList: JSON.stringify(sql), ins: insert});
                        ajax.onSucces(function(data)
                        { 
                                console.log(data); 
                                if(insert === "ver")
                                {
                                        me.cod = parseInt(data);
                                }
                                
                                if(joined)
                                {
                                        for(var i = 0; i < tmpNamesRelation.length; i++)
                                        {
                                                /** @type Array */
                                                var arr = me[tmpNamesRelation[i]];
                                                for(var j = 0; j < arr.length; j++)
                                                {
                                                        arr[j].superCod = me.cod;
                                                        arr[j].Save();
                                                }
                                        }
                                }
                        });
                        ajax.execute();
                }
                else
                        window.mproEntityBridge.Save();
        };
        
        function getValues()
        {
                var string = "";
                namesRelation = new Array();
                for(var field in me)
                {
                        if((field !== "getAll") && (field !== "class") && (field !== "Save") && (field !== "cod"))
                        {
                                if(!(me[field] instanceof Array))
                                {
                                        string += (typeof(me[field]) === "string" ? "'" : "") + me[field] + (typeof(me[field]) === "string" ? "'" : "") + ", ";
                                }
                                else
                                {
                                        joined = true;
                                        if(field.indexOf("Entity") !== -1)
                                                namesRelation.push(field);
                                }
                        }
                }
                string = string.replace(/, $/, "");
                
                return string;
        }
        
        function getValuesUpdates()
        {
                var string = "";
                namesRelation = new Array();
                for(var field in me)
                {
                        if((field !== "getAll") && (field !== "class") && (field !== "Save") && (field !== "cod"))
                        {
                                if(!(me[field] instanceof Array))
                                {
                                        string += field + " = " + (typeof(me[field]) === "string" ? "'" : "") + me[field] + (typeof(me[field]) === "string" ? "'" : "") + ", ";
                                }
                                else
                                {
                                        joined = true;
                                        if(field.indexOf("Entity") !== -1)
                                                namesRelation.push(field);
                                }
                        }
                }
                string = string.replace(/, $/, "");
                
                return string;
        }
        
        function init()
        {
                var sql = new Array();
                if(me.class !== "")
                {
                        sql.push("CREATE TABLE " + me.class + " (cod INTEGER PRIMARY KEY)");

                        for(var field in me)
                        {
                                if((field !== "getAll") && (field !== "cod") && (field !== "class") && (field !== "Save"))
                                {
                                        if(!(me[field] instanceof Array))
                                        {
                                                sql.push("ALTER TABLE " + me.class + " ADD " + field + " " + (typeof(me[field]) === "number" ? "NUMERIC" : "TEXT"));
                                        }
                                }
                        }

                        if(!window.mproEntityBridge)
                        {
                                var ajax = new Ajax();
                                ajax.Url = "../MproEntity/Executions.php";
                                ajax.setData({jsonList: JSON.stringify(sql)});
                                ajax.onSucces(function(data){ console.log(data); });
                                ajax.execute();
                        }
                        else
                                window.mproEntityBridge.Table();
                }
        }
        
        function toNull()
        {
                for(var field in me)
                {
                        //console.log(field);
                        if((field !== "getAll") && (field !== "class") && (field !== "Save"))
                        {
                                if(typeof(me[field]) === "string")
                                        me[field] = null;
                                else if(typeof(me[field]) === "number")
                                        me[field] = 2147483647;
                        }
                }
        }
        
        toNull();
        init();
}

MproEntity.getWhere = function(classe, superFilter, objFilter)
{
        if(classe === undefined)
                return null;
};

MproEntity.getAll = function(classe, limiter, superFilter, where)
{
        
        if(classe === undefined)
                return null;
        
        var instance = new classe();
        var relations = new Array();
        var fields = new Array();
        var elems = new Array();
        var sql = "";
        
        for(var field in instance)
        {
                if(instance[field] instanceof Array)
                {
                        relations.push(field.replace("Entity", ""));
                }
                else
                {
                        if((field !== "getAll") && (field !== "cod") && (field !== "class") && (field !== "Save"))
                        {
                                fields.push(field);
                        }
                }
        }
        
        if(superFilter === undefined)
                sql = "SELECT * FROM " + instance.class + " " +  (where === "" ? "" : (" WHERE (" + where + ")"));
        else
                sql = "SELECT * FROM " + instance.class + " WHERE superCod = " + superFilter + " " + 
                        (where === "" ? "" : (" AND (" + where + ")"));
        
        if(limiter.length && (limiter.length === 2))
        {
                sql += " LIMIT " + limiter[0] + ", " + limiter[1];
        }
        
        if(!window.mproEntityBridge)
        {
                var ajax = new Ajax();
                ajax.Url = "../MproEntity/Query.php";
                ajax.setData({cmd: sql});
                ajax.onSucces(function(data)
                {
                        console.log(data);
                        /** @type Array */
                        var arrTmp = JSON.parse(data);
                        
                        for(var j = 0; j < arrTmp.length; j++)
                        {
                                /** @type Array */
                                var arrM = arrTmp[j];
                                /** @type MproEntity */
                                var objTmp = new classe();

                                objTmp.cod = arrM[0];

                                for(var i = 0; i < fields.length; i++)
                                {
                                        objTmp[fields[i]] = arrM[i+1];
                                }
                                
                                if(relations.length > 0)
                                {
                                        for(var k = 0; k < relations.length; k++)
                                        {
                                                var objR = MproEntity.getAll(window[relations[k]], undefined, objTmp.cod);
                                                if(objR !== null)
                                                        objTmp["Entity" + relations[k]].push(objR[0]);
                                        }
                                }
                                
                                elems.push(objTmp);
                        }
                });
                ajax.execute(false);
        }
        else
                elems = window.mproEntityBridge.getAll();
        
        return elems;
};