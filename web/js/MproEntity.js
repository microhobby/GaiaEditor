
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
        this.RefObject = null;
        // get name of class
        this.class = this.constructor.name;
        
        /*
         * Construct static help for fields in "class"
         */
        if(window[this.class].class === undefined)
        {
            window[this.class].class = {};
            for(var f in me)
            {
                if((f !== "class") && (f !== "RefObject") && (typeof (me[f]) !== "function"))
                {
                    window[this.class].class[f] = {field: f, class: this.class};
                }
            }
        }
        
        var openshift = getCookie("openshift") === "sim" ? true : false;
        
        if(!MproEntity.serverSeted)
        {
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
        }
        
        if(this.class === undefined)
                this.class = "";
        
        this.Delete = function(classref, codref)
        {
                var sql = new Array();
                var del = "";
                
                //getValues();
                
                if(me.cod === 0)
                {
                        return 0;
                }
                else
                {
                        if(!me.RefObject)
                        {
                                sql.push("DELETE FROM " + me.class + " WHERE cod = " + me.cod + ";");
                                
                                sql.push("DELETE FROM Reference WHERE cod = " + 
                                        me.cod + "  AND class = '" + me.class + "';");
                                
                                /*if(classref && codref)
                                        sql.push("DELETE FROM Reference WHERE cod = " + 
                                        codref + " AND codref = "+ 
                                        me.cod + " AND class = '" + 
                                        classref + "' AND classref = '" + me.class + "';");*/
                        }
                        else
                        {
                               sql.push("DELETE FROM Reference WHERE cod = " + 
                                me.RefObject.cod + " AND codref = "+ 
                                me.cod + " AND class = '" + 
                                me.RefObject.class + "' AND classref = '" + me.class + "';");
                        }
                }
                
                var tmpNamesRelation = $.extend(true, [], namesRelation);
                
                if(!window.mproEntityBridge)
                {
                        var ajax = new Ajax();
                        ajax.Url = MproEntity.scriptExecution;
                        ajax.setData({jsonList: JSON.stringify(sql), ins: del, user: __projectUser__, cod: __projectCod__});
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
                else
                {
                        for(var i = 0; i < sql.length; i++)
                                mproEntityBridge.addSqls(sql[i]);
                        
                        mproEntityBridge.executeSqls();
                        
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
                }
        };
        
        this.Save = function(classref, codref, ix)
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
                
                var tmpNamesRelation = $.extend(true, [], namesRelation);
                
                if(!window.mproEntityBridge)
                {
                        var ajax = new Ajax();
                        ajax.Url = MproEntity.scriptExecution;
                        ajax.setData({jsonList: JSON.stringify(sql), ins: insert, user: __projectUser__, cod: __projectCod__});
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
                                        sql.push("INSERT INTO Reference VALUES('" + classref + "', '" + me.class + "', " + ix +", " + codref + ", " + me.cod + ");");
                                        if(!window.mproEntityBridge)
                                        {
                                                var ajax = new Ajax();
                                                ajax.Url = MproEntity.scriptExecution;
                                                ajax.setData({jsonList: JSON.stringify(sql), user: __projectUser__, cod: __projectCod__});
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
                                                        arr[j].Save(me.class, me.cod, tmpNamesRelation[i].match(/[0-9]+/)[0]);
                                                }
                                        }
                                }
                        });
                        ajax.execute();
                }
                else
                {
                        if(insert === "ver")
                                me.cod = mproEntityBridge.execute(sql[0]);
                        else
                                mproEntityBridge.execute(sql[0]);
                        
                        if(classref && codref)
                        {
                                sql = [];
                                sql.push("INSERT INTO Reference VALUES('" + classref + "', '" + me.class + "', " + ix +", " + codref + ", " + me.cod + ");");
                                mproEntityBridge.execute(sql[0]);  
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
                                                arr[j].Save(me.class, me.cod, tmpNamesRelation[i].match(/[0-9]+/)[0]);
                                        }
                                }
                        }
                }
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
                                ajax.Url = MproEntity.scriptExecution;
                                ajax.setData({jsonList: JSON.stringify(sql), user: __projectUser__, cod: __projectCod__});
                                ajax.onSucces(function(data){  });
                                ajax.execute();
                        }
                        else
                        {
                                for(var i = 0; i < sql.length; i++)
                                        mproEntityBridge.addSqls(sql[i]);
                        
                                mproEntityBridge.executeSqls();
                        }
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

//MproEntity.getWhere = function(classe, superFilter, objFilter)
/**
 * 
 * @param {Entity} classe
 * @returns {unresolved}
 */
MproEntity.getWhere = function(classe)
{
        if(!arguments.length <= 1)
        {
                var instance = new classe();
                var relations = new Array();
                var fields = new Array();
                var logics = [];
                var tuples = [];
                var elems = new Array();
                var sync = true;
                var end = true;
                var order = "";
                var sql = "SELECT " + instance.class + ".cod, ";
                
                for(var field in instance)
                {
                        if(instance[field] instanceof Array)
                        {
                                //relations.push(field.replace("Entity", ""));
                                relations.push(field.replace(/Entity[0-9]*/, ""));
                        }
                        else
                        {
                                if((field !== "getAll") && (field !== "cod") && (field !== "class") && (field !== "Save") && (field !== "Delete")
                                        && (field !== "RefObject") && (typeof (instance[field]) !== "function"))
                                {
                                        fields.push(field);
                                        sql += instance.class + "." + field + ", ";
                                }
                        }
                }
                
                sql = sql.replace(/, $/, "");
                sql += " FROM " + instance.class + " ";
                
                // INNER JOINS
                for (var i = 1; i < arguments.length-1; i++) 
                {
                        if(! (typeof(arguments[i]) === "function"))
                        {
                                if(i % 2 !== 0)
                                {
                                        if(arguments[i].class !== instance.class)
                                        {
                                                sql += " INNER JOIN Reference ON Reference.cod = " 
                                                        + instance.class + ".cod "
                                                        + "INNER JOIN " + arguments[i].class + " ON " 
                                                        +  arguments[i].class + ".cod = Reference.codref AND Reference.classref = '" + 
                                                        arguments[i].class + "' ";
                                        }
                                        tuples.push(arguments[i]);
                                }
                                else
                                {
                                        logics.push(arguments[i]);
                                }
                        }
                }
                
                /**
                 * TRATAMENTO DE ERROS
                 */
                
                if(logics.length !== tuples.length)
                {
                        throw new Error("Número de Entidades relacionadas não corresponde ao número de operações Lógicas!");
                        return null;
                }
                
                if(typeof(arguments[(logics.length + tuples.length) + 1]) !== "function")
                {
                        throw new Error("Callback de termino não definido!");
                        return null;
                }
                
                if(typeof(arguments[arguments.length -1]) !== "function")
                {
                        /** @type MproEntity.Order */
                        var orObj = arguments[arguments.length -1];
                        order += " ORDER BY " + orObj.Classe.class + "." + orObj.Classe.field + " " + orObj.OrderBy;
                }
                
                var callBack = arguments[(logics.length + tuples.length) + 1];
                sql += " WHERE ";
                
                // WHERES
                for(var i = 0; i < logics.length; i++)
                {
                        sql += "" + tuples[i].class + "." + tuples[i].field + " " 
                        + logics[i].comparator + " " + 
                        ( typeof(logics[i].val) == "string" ? "'" + 
                        (logics[i].comparator === " LIKE " ? "%" : "") 
                        + logics[i].val 
                        + (logics[i].comparator === " LIKE " ? "%" : "") + "'" : logics[i].val) +
                        " " + (logics[i].logicNext === null ? "" : logics[i].logicNext);
                }
                
                sql += " " + order;
                
                if(!window.mproEntityBridge)
                {
                        var ajax = new Ajax();
                        ajax.Url = MproEntity.scriptQuery;
                        ajax.setData({cmd: sql, user: __projectUser__, cod: __projectCod__});
                        ajax.onSucces(function(data)
                        {
                                //console.log(data);
                                /** @type Array */
                                var arrTmp = JSON.parse(data);
                                var refs = [];

                                for(var j = 0; j < arrTmp.length; j++)
                                {
                                        refs = [];
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
                                                        //var ret = MproEntity.getAll(window[fields[i].replace("Ref", "")], null, 1, undefined, "cod = " + arrM[i+1], undefined, false);
                                                        refs.push(fields[i]);
                                                        var endi = false;
                                                        if(j >= arrTmp.length-1)
                                                                endi = true;

                                                        var funcCall = function(objTmp, fields, i, callBack, elems, endi, len){ return function(ret)
                                                        {
                                                                if(ret)
                                                                        objTmp[fields[i]] = ret[0];

                                                                if(callBack && endi && refs.length === len)
                                                                        callBack(elems);
                                                        } };

                                                        MproEntity.getAll(window[fields[i].replace("Ref", "")], funcCall(objTmp, fields, i, callBack, elems, endi, refs.length), 1, undefined, "cod = " + arrM[i+1], undefined, true, endi);
                                                }
                                        }

                                        if(relations.length > 0)
                                        {      
                                                var entitiesEqCount = [];
                                                for(var k = 0; k < relations.length; k++)
                                                {
                                                        //var objR = MproEntity.getAll(window[relations[k]], undefined, undefined, objTmp, undefined, undefined, false);
                                                        var endi = false;

                                                       if(entitiesEqCount[relations[k]] !== undefined)
                                                                entitiesEqCount[relations[k]] += 1;
                                                        else
                                                                entitiesEqCount[relations[k]] = 1;


                                                        if(k >= relations.length-2 && j >= arrTmp.length-1)
                                                                endi = true;

                                                        var funcCall2 = function(objTmp, relations, k, callBack, endi, entityIx)
                                                        {
                                                                return function(objR, stop)
                                                                {
                                                                        for(var i = 0; i < objR.length; i++)
                                                                        {
                                                                                objR[i].RefObject = objTmp;
                                                                        }

                                                                        if(objR !== null)
                                                                        {
                                                                                objTmp["Entity" + entityIx + "" + relations[k]] = objR;
                                                                                objTmp[relations[k+1]] = objR;
                                                                                //objTmp.RefObject = me;
                                                                                //k++;
                                                                        }
                                                                        if(callBack && endi)
                                                                                setTimeout(function()
                                                                                {
                                                                                        callBack(elems);
                                                                                }, 500);
                                                                };
                                                        };

                                                        if(k % 2 === 0)
                                                                MproEntity.getAll(window[relations[k]], funcCall2(objTmp, relations, k, callBack, endi, entitiesEqCount[relations[k]]), undefined, objTmp, undefined, undefined, true, undefined, entitiesEqCount[relations[k]]);
                                                        //objTmp["Entity" + relations[k]].push(objR[0]);
                                                }
                                        }

                                        elems.push(objTmp);
                                }

                                if(relations.length !== 0 || refs.length !== 0)
                                {
                                        // se tem referencias não faz nada
                                       //callBack(elems);
                                }
                                else
                                {
                                        //hideLoading();
                                        callBack(elems, end);
                                }

                                if(arrTmp.length === 0)
                                        callBack(elems, end);
                        });
                        ajax.execute(sync);
                        //showLoading();
                }
                else
                {
                        /** @type Array */
                        var arrTmp = JSON.parse(mproEntityBridge.query(sql));
                        var refs = [];

                        for(var j = 0; j < arrTmp.length; j++)
                        {
                                refs = [];
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
                                                //var ret = MproEntity.getAll(window[fields[i].replace("Ref", "")], null, 1, undefined, "cod = " + arrM[i+1], undefined, false);
                                                refs.push(fields[i]);
                                                var endi = false;
                                                if(j >= arrTmp.length-1)
                                                        endi = true;

                                                var funcCall = function(objTmp, fields, i, callBack, elems, endi, len){ return function(ret)
                                                {
                                                        if(ret)
                                                                objTmp[fields[i]] = ret[0];

                                                        if(callBack && endi && refs.length === len)
                                                                callBack(elems);
                                                } };

                                                MproEntity.getAll(window[fields[i].replace("Ref", "")], funcCall(objTmp, fields, i, callBack, elems, endi, refs.length), 1, undefined, "cod = " + arrM[i+1], undefined, true, endi);
                                        }
                                }

                                if(relations.length > 0)
                                {      
                                        var entitiesEqCount = [];
                                        for(var k = 0; k < relations.length; k++)
                                        {
                                                //var objR = MproEntity.getAll(window[relations[k]], undefined, undefined, objTmp, undefined, undefined, false);
                                                var endi = false;

                                               if(entitiesEqCount[relations[k]] !== undefined)
                                                        entitiesEqCount[relations[k]] += 1;
                                                else
                                                        entitiesEqCount[relations[k]] = 1;


                                                if(k >= relations.length-2 && j >= arrTmp.length-1)
                                                        endi = true;

                                                var funcCall2 = function(objTmp, relations, k, callBack, endi, entityIx)
                                                {
                                                        return function(objR, stop)
                                                        {
                                                                for(var i = 0; i < objR.length; i++)
                                                                {
                                                                        objR[i].RefObject = objTmp;
                                                                }

                                                                if(objR !== null)
                                                                {
                                                                        objTmp["Entity" + entityIx + "" + relations[k]] = objR;
                                                                        objTmp[relations[k+1]] = objR;
                                                                        //objTmp.RefObject = me;
                                                                        //k++;
                                                                }
                                                                if(callBack && endi)
                                                                        setTimeout(function()
                                                                        {
                                                                                callBack(elems);
                                                                        }, 500);
                                                        };
                                                };

                                                if(k % 2 === 0)
                                                        MproEntity.getAll(window[relations[k]], funcCall2(objTmp, relations, k, callBack, endi, entitiesEqCount[relations[k]]), undefined, objTmp, undefined, undefined, true, undefined, entitiesEqCount[relations[k]]);
                                                //objTmp["Entity" + relations[k]].push(objR[0]);
                                        }
                                }

                                elems.push(objTmp);
                        }

                        if(relations.length !== 0 || refs.length !== 0)
                        {
                                // se tem referencias não faz nada
                               //callBack(elems);
                        }
                        else
                        {
                                //hideLoading();
                                callBack(elems, end);
                        }

                        if(arrTmp.length === 0)
                                callBack(elems, end);
                }

                return elems;
        }
        else
                return null;
};

MproEntity.getAll = function(classe, callBack, limiter, superFilter, where, ordBy, sync, end, ix)
{
        
        if(classe === undefined)
                return null;
        
        if(where === undefined)
                where = "";
        
        if((ordBy === undefined) || (ordBy === ""))
                ordBy = "cod asc";
        
        if(sync === undefined)
                sync = true;
        
        if(end === undefined)
                end = true;
        
        var instance = new classe();
        var relations = new Array();
        var fields = new Array();
        var elems = new Array();
        var sql = "";
        
        for(var field in instance)
        {
                if(instance[field] instanceof Array)
                {
                        //relations.push(field.replace("Entity", ""));
                        relations.push(field.replace(/Entity[0-9]*/, ""));
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
                        superFilter.cod + " AND classref = '" + instance.class + "' " + (ix !== undefined ? " AND ix = " + ix + " " : "") + ") "
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
                ajax.Url = MproEntity.scriptQuery;
                ajax.setData({cmd: sql, user: __projectUser__, cod: __projectCod__});
                ajax.onSucces(function(data)
                {
                        //console.log(data);
                        /** @type Array */
                        var arrTmp = JSON.parse(data);
                        var refs = [];
                        
                        for(var j = 0; j < arrTmp.length; j++)
                        {
                                refs = [];
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
                                                //var ret = MproEntity.getAll(window[fields[i].replace("Ref", "")], null, 1, undefined, "cod = " + arrM[i+1], undefined, false);
                                                refs.push(fields[i]);
                                                var endi = false;
                                                if(j >= arrTmp.length-1)
                                                        endi = true;
                                                
                                                var funcCall = function(objTmp, fields, i, callBack, elems, endi, len){ return function(ret)
                                                {
                                                        if(ret)
                                                                objTmp[fields[i]] = ret[0];
                                                        
                                                        if(callBack && endi && refs.length === len)
                                                                callBack(elems);
                                                } };
                                                
                                                MproEntity.getAll(window[fields[i].replace("Ref", "")], funcCall(objTmp, fields, i, callBack, elems, endi, refs.length), 1, undefined, "cod = " + arrM[i+1], undefined, true, endi);
                                        }
                                }
                                
                                if(relations.length > 0)
                                {      
                                        var entitiesEqCount = [];
                                        for(var k = 0; k < relations.length; k++)
                                        {
                                                //var objR = MproEntity.getAll(window[relations[k]], undefined, undefined, objTmp, undefined, undefined, false);
                                                var endi = false;
                                               
                                               if(entitiesEqCount[relations[k]] !== undefined)
                                                        entitiesEqCount[relations[k]] += 1;
                                                else
                                                        entitiesEqCount[relations[k]] = 1;
                                                
                                                
                                                if(k >= relations.length-2 && j >= arrTmp.length-1)
                                                        endi = true;
                                                
                                                var funcCall2 = function(objTmp, relations, k, callBack, endi, entityIx)
                                                {
                                                        return function(objR, stop)
                                                        {
                                                                for(var i = 0; i < objR.length; i++)
                                                                {
                                                                        objR[i].RefObject = objTmp;
                                                                }

                                                                if(objR !== null)
                                                                {
                                                                        objTmp["Entity" + entityIx + "" + relations[k]] = objR;
                                                                        objTmp[relations[k+1]] = objR;
                                                                        //objTmp.RefObject = me;
                                                                        //k++;
                                                                }
                                                                if(callBack && endi)
                                                                        setTimeout(function()
                                                                        {
                                                                                callBack(elems);
                                                                        }, 500);
                                                        };
                                                };
                         
                                                if(k % 2 === 0)
                                                        MproEntity.getAll(window[relations[k]], funcCall2(objTmp, relations, k, callBack, endi, entitiesEqCount[relations[k]]), undefined, objTmp, undefined, undefined, true, undefined, entitiesEqCount[relations[k]]);
                                                //objTmp["Entity" + relations[k]].push(objR[0]);
                                        }
                                }
                                
                                elems.push(objTmp);
                        }
                        
                        if(relations.length !== 0 || refs.length !== 0)
                        {
                                // se tem referencias não faz nada
                               //callBack(elems);
                        }
                        else
                        {
                                //hideLoading();
                                callBack(elems, end);
                        }
                        
                        if(arrTmp.length === 0)
                                callBack(elems, end);
                });
                ajax.execute(sync);
                //showLoading();
        }
        else
        {
                /** @type Array */
                var arrTmp = JSON.parse(mproEntityBridge.query(sql));
                var refs = [];
                
                for(var j = 0; j < arrTmp.length; j++)
                {
                        refs = [];
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
                                        //var ret = MproEntity.getAll(window[fields[i].replace("Ref", "")], null, 1, undefined, "cod = " + arrM[i+1], undefined, false);
                                        refs.push(fields[i]);
                                        var endi = false;
                                        if(j >= arrTmp.length-1)
                                                endi = true;

                                        var funcCall = function(objTmp, fields, i, callBack, elems, endi, len){ return function(ret)
                                        {
                                                if(ret)
                                                        objTmp[fields[i]] = ret[0];

                                                if(callBack && endi && refs.length === len)
                                                        callBack(elems);
                                        } };

                                        MproEntity.getAll(window[fields[i].replace("Ref", "")], funcCall(objTmp, fields, i, callBack, elems, endi, refs.length), 1, undefined, "cod = " + arrM[i+1], undefined, true, endi);
                                }
                        }

                        if(relations.length > 0)
                        {      
                                var entitiesEqCount = [];
                                for(var k = 0; k < relations.length; k++)
                                {
                                        //var objR = MproEntity.getAll(window[relations[k]], undefined, undefined, objTmp, undefined, undefined, false);
                                        var endi = false;

                                       if(entitiesEqCount[relations[k]] !== undefined)
                                                entitiesEqCount[relations[k]] += 1;
                                        else
                                                entitiesEqCount[relations[k]] = 1;


                                        if(k >= relations.length-2 && j >= arrTmp.length-1)
                                                endi = true;

                                        var funcCall2 = function(objTmp, relations, k, callBack, endi, entityIx)
                                        {
                                                return function(objR, stop)
                                                {
                                                        for(var i = 0; i < objR.length; i++)
                                                        {
                                                                objR[i].RefObject = objTmp;
                                                        }

                                                        if(objR !== null)
                                                        {
                                                                objTmp["Entity" + entityIx + "" + relations[k]] = objR;
                                                                objTmp[relations[k+1]] = objR;
                                                                //objTmp.RefObject = me;
                                                                //k++;
                                                        }
                                                        if(callBack && endi)
                                                                setTimeout(function()
                                                                {
                                                                        callBack(elems);
                                                                }, 500);
                                                };
                                        };

                                        if(k % 2 === 0)
                                                MproEntity.getAll(window[relations[k]], funcCall2(objTmp, relations, k, callBack, endi, entitiesEqCount[relations[k]]), undefined, objTmp, undefined, undefined, true, undefined, entitiesEqCount[relations[k]]);
                                        //objTmp["Entity" + relations[k]].push(objR[0]);
                                }
                        }

                        elems.push(objTmp);
                }

                if(relations.length !== 0 || refs.length !== 0)
                {
                        // se tem referencias não faz nada
                       //callBack(elems);
                }
                else
                {
                        //hideLoading();
                        callBack(elems, end);
                }

                if(arrTmp.length === 0)
                        callBack(elems, end);
        }
        
        return elems;
};

MproEntity.scriptExecution = "";
MproEntity.scriptQuery = "";
MproEntity.serverSeted = false;

MproEntity.setServer = function(url, tec)
{     
        window.mproEntityBridge = undefined;
        MproEntity.scriptExecution =  url + "/Executions" + (tec == undefined ? "" : ("." + tec));
        MproEntity.scriptQuery =  url + "/Query" + (tec == undefined ? "" : ("." + tec));
        MproEntity.serverSeted = true;
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