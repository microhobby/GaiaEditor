
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
        
        if(this.class === undefined)
                this.class = "";
        
        this.Delete = function(classref, codref)
        {
                var sql = new Array();
                var del = "";
                
                if(me.cod === 0)
                {
                        return 0;
                }
                else
                {
                        if(!me.RefObject)
                        {
                                sql.push("DELETE FROM " + me.class + " WHERE cod = " + me.cod + ";");
                                if(classref && codref)
                                        sql.push("DELETE FROM Reference WHERE cod = " + 
                                        codref + " AND codref = "+ 
                                        me.cod + " AND class = '" + 
                                        classref + "' AND classref = '" + me.class + "';");
                        }
                        else
                        {
                               sql.push("DELETE FROM Reference WHERE cod = " + 
                                me.RefObject.cod + " AND codref = "+ 
                                me.cod + " AND class = '" + 
                                me.RefObject.class + "' AND classref = '" + me.class + "';");
                        }
                }
                
                if(!window.mproEntityBridge)
                {
                        var tmpNamesRelation = $.extend(true, [], namesRelation);
                        var ajax = new Ajax();
                        ajax.Url = "../MproEntity/Executions.php";
                        ajax.setData({jsonList: JSON.stringify(sql), ins: del});
                        ajax.onSucces(function(data)
                        { 
                                //console.log(data); 
                                
                                if(joined)
                                {
                                        for(var i = 0; i < tmpNamesRelation.length; i++)
                                        {
                                                /** @type Array */
                                                var arr = me[tmpNamesRelation[i]];
                                                for(var j = 0; j < arr.length; j++)
                                                {
                                                        arr[j].Delete(tmpNamesRelation[i], me.cod);
                                                }
                                        }
                                }
                        });
                        ajax.execute();
                }
        };
        
        this.Save = function(classref, codref)
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
                                //console.log(data); 
                                if(insert === "ver")
                                {
                                        me.cod = parseInt(data);
                                }
                                
                                if(classref && codref)
                                {
                                        sql = [];
                                        sql.push("INSERT INTO Reference VALUES('" + classref + "', '" + me.class + "', " + codref + ", " + me.cod + ");");
                                        if(!window.mproEntityBridge)
                                        {
                                                var ajax = new Ajax();
                                                ajax.Url = "../MproEntity/Executions.php";
                                                ajax.setData({jsonList: JSON.stringify(sql)});
                                                ajax.onSucces(function(data){  });
                                                ajax.execute();
                                        }
                                        else
                                                window.mproEntityBridge.Table();
                                }
                                
                                if(joined)
                                {
                                        for(var i = 0; i < tmpNamesRelation.length; i++)
                                        {
                                                /** @type Array */
                                                var arr = me[tmpNamesRelation[i]];
                                                for(var j = 0; j < arr.length; j++)
                                                {
                                                        //arr[j].superCod = me.cod;
                                                        arr[j].Save(me.class, me.cod);
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
                        if((field !== "getAll") && (field !== "class") && (field !== "Save") && (field !== "cod") && (field !== "Delete")
                                && (field !== "RefObject") && ((typeof (me[field]) !== "function")))
                        {
                                if(!(me[field] instanceof Array))
                                {
                                        if(field.indexOf("Ref") !== -1)
                                        {
                                                var fieldTmp = me[field].cod;
                                                string += (typeof(fieldTmp) === "string" ? "'" : "") + fieldTmp + (typeof(fieldTmp) === "string" ? "'" : "") + ", ";
                                        }
                                        else if(field.indexOf("Crypt") !== -1)
                                        {
                                                if(me[field].indexOf("{}") === -1)
                                                {
                                                        me[field] = "{}" + CryptoJS.SHA1(me[field]);
                                                        string += (typeof(me[field]) === "string" ? "'" : "") + me[field] + (typeof(me[field]) === "string" ? "'" : "") + ", ";
                                                }
                                                else
                                                {
                                                        string += (typeof(me[field]) === "string" ? "'" : "") + me[field] + (typeof(me[field]) === "string" ? "'" : "") + ", ";
                                                }
                                        }
                                        else
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
                        if((field !== "getAll") && (field !== "class") && (field !== "Save") && (field !== "cod") && (field !== "Delete")
                               && (field !== "RefObject") && (typeof (me[field]) !== "function"))
                        {
                                if(!(me[field] instanceof Array))
                                {
                                        if(field.indexOf("Ref") !== -1)
                                        {
                                                var fieldTmp = me[field].cod;
                                                string += field + " = " + (typeof(fieldTmp) === "string" ? "'" : "") + fieldTmp+ (typeof(fieldTmp) === "string" ? "'" : "") + ", ";
                                        }
                                        else if(field.indexOf("Crypt") !== -1)
                                        {
                                                var fieldTmp = me[field];
                                                if(fieldTmp.indexOf("{}") === -1)
                                                {
                                                        fieldTmp = "{}" + CryptoJS.SHA1(fieldTmp);
                                                }
                                                string += field + " = " + (typeof(fieldTmp) === "string" ? "'" : "") + fieldTmp+ (typeof(fieldTmp) === "string" ? "'" : "") + ", ";
                                        }
                                        else
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
                                if((field !== "getAll") && (field !== "cod") && (field !== "class") && (field !== "Save") && (field !== "Delete")
                                       && (field !== "RefObject") && (typeof (me[field]) !== "function"))
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
                                ajax.onSucces(function(data){  });
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
                        ////console.log(field);
                        if((field !== "getAll") && (field !== "class") && (field !== "Save") && (field !== "Delete") && (typeof (me[field]) !== "function")
                                && (field !== "RefObject") && (typeof (me[field]) !== "function"))
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

MproEntity.getAll = function(classe, callBack, limiter, superFilter, where, ordBy, sync, data)
{
        
        if(classe === undefined)
                return null;
        
        if(where === undefined)
                where = "";
        
        if((ordBy === undefined) || (ordBy === ""))
                ordBy = "cod asc";
        
        if(sync === undefined)
                sync = true;
        
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
                        if((field !== "getAll") && (field !== "cod") && (field !== "class") && (field !== "Save") && (field !== "Delete")
                                && (field !== "RefObject") && (typeof (instance[field]) !== "function"))
                        {
                                fields.push(field);
                        }
                }
        }
        
        if(superFilter === undefined)
                sql = "SELECT * FROM " + instance.class + " " +  (where === "" ? "ORDER BY " : (" WHERE (" + where + ") ORDER BY ")) + ordBy;
        else
        {
                sql = "SELECT * FROM " + instance.class + " WHERE cod in "
                        + "(SELECT codref FROM Reference WHERE class = '" + superFilter.class + "' and cod = " + 
                        superFilter.cod + " AND classref = '" + instance.class + "') "
                        + " " + 
                        (where === "" ? "ORDER BY " : (" AND (" + where + ") ORDER BY ")) + ordBy;
        }
        
        if(limiter && limiter.length && (limiter.length === 2))
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
                        //console.log(data);
                        /** @type Array */
                        var arrTmp = JSON.parse(data);
                        var refs = [];
                        
                        for(var j = 0; j < arrTmp.length; j++)
                        {
                                /** @type Array */
                                var arrM = arrTmp[j];
                                /** @type MproEntity */
                                var objTmp = new classe();

                                objTmp.cod = arrM[0];

                                for(var i = 0; i < fields.length; i++)
                                {
                                        if(fields[i].indexOf("Ref") === -1)
                                                objTmp[fields[i]] = arrM[i+1];
                                        else
                                        {
                                                var ret = MproEntity.getAll(window[fields[i].replace("Ref", "")], null, 1, undefined, "cod = " + arrM[i+1], undefined, false);
                                                if(ret)
                                                        objTmp[fields[i]] = ret[0];
                                        }
                                }
                                
                                if(relations.length > 0)
                                {
                                        for(var k = 0; k < relations.length; k++)
                                        {
                                                var objR = MproEntity.getAll(window[relations[k]], undefined, undefined, objTmp, undefined, undefined, false);
                                                
                                                for(var i = 0; i < objR.length; i++)
                                                {
                                                        objR[i].RefObject = objTmp;
                                                }
                                                
                                                if(objR !== null)
                                                {
                                                        objTmp["Entity" + relations[k]] = objR;
                                                        objTmp[relations[k+1]] = objR;
                                                        objTmp.RefObject = 
                                                        k++;
                                                }
                                                        //objTmp["Entity" + relations[k]].push(objR[0]);
                                        }
                                }
                                
                                elems.push(objTmp);
                        }
                        
                        if(callBack)
                        {
                                hideLoading();
                                callBack(elems);
                        }
                });
                ajax.execute(sync);
                 showLoading();
                        
        }
        else
                elems = window.mproEntityBridge.getAll();
        
        return elems;
};