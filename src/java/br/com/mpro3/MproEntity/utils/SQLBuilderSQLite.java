package br.com.mpro3.MproEntity.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.util.ArrayList;

/**
 *
 * @author matheus
 */
public class SQLBuilderSQLite implements SQLBuilder
{
    private JsonObject obj;
    
    @Override
    public ArrayList<String> createTable()
    {
        ArrayList<String> sql = new ArrayList<String>();
        sql.add("CREATE TABLE " + this.obj.get("Name").getAsString() + " (cod INTEGER PRIMARY KEY)");
        
        JsonArray fields = this.obj.get("Fields").getAsJsonArray();
        JsonArray types = this.obj.get("Types").getAsJsonArray();
        
        for(int i = 0; i < fields.size(); i++)
        {
            sql.add("ALTER TABLE " + this.obj.get("Name").getAsString() + " ADD " + fields.get(i).getAsString() + " " + types.get(i).getAsString());
        }
        
        return sql;
    }

    @Override
    public void setJSONObject(JsonElement obj)
    {
        this.obj = obj.getAsJsonObject();
    }

    @Override
    public String insert()
    {
        return "INSERT INTO " + this.obj.get("Name").getAsString() + " VALUES(NULL, "
                +
                this.obj.get("Fields").getAsString()
                + ")";
    }

    @Override
    public String createRefTable()
    {
        return "CREATE TABLE IF NOT EXISTS Reference (class TEXT, classref TEXT, ix INTEGER, cod INTEGER, codref INTEGER, PRIMARY KEY(class, classref, cod, codref));";
    }

    @Override
    public String insertRef()
    {
        return "INSERT INTO Reference VALUES('" +
                this.obj.get("NameRef").getAsString() + "', '" +
                this.obj.get("Name").getAsString() + "', " +
                this.obj.get("Ix").getAsString() + ", " +
                this.obj.get("CodRef").getAsString() + ", " +
                this.obj.get("Cod").getAsString() + ");";
    }

    @Override
    public String update()
    {
        String update = "UPDATE " + this.obj.get("Name").getAsString() + " SET " + this.obj.get("Fields").getAsString();
        update += " WHERE cod = " + this.obj.get("Cod").getAsString();
        
        return update;
    }

    @Override
    public ArrayList<String> delete()
    {
        ArrayList<String> sqls = new ArrayList<String>();
        if(this.obj.get("NameRef").getAsString().equals(""))
        {
            sqls.add("DELETE FROM " + this.obj.get("Name").getAsString() + " WHERE cod = " + this.obj.get("Cod").getAsString() + ";");
            sqls.add("DELETE FROM Reference WHERE cod = " + this.obj.get("Cod").getAsString() + "  AND class = '" + this.obj.get("Name").getAsString() +"';");
        }
        else
        {
            sqls.add("DELETE FROM Reference WHERE cod = " + this.obj.get("CodRef").getAsString() + " AND codref = " +
                        this.obj.get("Cod").getAsString() + " AND class = '" +
                        this.obj.get("NameRef").getAsString() + "' AND classref = '" + this.obj.get("Name").getAsString() + "';");
        }
        return sqls;
    }

    @Override
    public String selectAll()
    {
        String sql;
        
        if(this.obj.get("NameRef").getAsString().equals(""))
        {
            sql = "SELECT * FROM " + this.obj.get("Name").getAsString() + " " + (this.obj.get("Where").getAsString().equals("") ? "ORDER BY " : (" WHERE (" + this.obj.get("Where").getAsString() + ") ORDER BY ")) + this.obj.get("OrderBy").getAsString();
        }
        else
        {
            sql =  "SELECT * FROM " + this.obj.get("Name").getAsString() + " WHERE cod in " +
                    "(SELECT codref FROM Reference WHERE class = '" + this.obj.get("NameRef").getAsString() + "' and cod = " +
                    this.obj.get("CodRef").getAsString() + " AND classref = '" + this.obj.get("Name").getAsString() + "' " + (this.obj.get("Ix").getAsInt() != 2147483647 ? " AND ix = " + this.obj.get("Ix").getAsString() + " " : "") + ") "
                    + " " +
                    (this.obj.get("Where").getAsString().equals("") ? "ORDER BY " : (" AND (" + this.obj.get("Where").getAsString() + ") ORDER BY ")) + this.obj.get("OrderBy").getAsString();
        }
        
        if(this.obj.get("Limiter").getAsJsonArray().size() > 0)
        {
            sql += " LIMIT " + this.obj.get("Limiter").getAsJsonArray().get(0).getAsInt() + ", " + this.obj.get("Limiter").getAsJsonArray().get(1).getAsInt();
        }
        
        return sql;
    }

    @Override
    public String selectWhere()
    {
        String sql = "SELECT " + this.obj.get("Name").getAsString() + ".cod, ";
        String sqlInner = "";
        String sqlWhere = "";
        
        JsonArray fields = this.obj.get("Fields").getAsJsonArray();
        JsonArray nameRefs = this.obj.get("NameRefs").getAsJsonArray();
        JsonArray fieldsRefs = this.obj.get("FieldsRefs").getAsJsonArray();
        JsonArray comparators = this.obj.get("Comparators").getAsJsonArray();
        JsonArray logicVals = this.obj.get("LogicVals").getAsJsonArray();
        JsonArray logicNexts = this.obj.get("LogicNexts").getAsJsonArray();
        
        for(int i = 0; i < fields.size(); i++)
        {
            sql += this.obj.get("Name").getAsString() + "." + fields.get(i).getAsString() + ", ";
        }
        
        sql = sql.replaceAll("/, $/", sql);
        sql += " FROM " + this.obj.get("Name").getAsString() + " ";
        
        // inner joins
        for(int i = 0; i < nameRefs.size(); i++)
        {
            sqlInner +=    " INNER JOIN Reference ON Reference.cod = " +
                            this.obj.get("Name").getAsString() + ".cod " +
                            "INNER JOIN " + nameRefs.get(i).getAsString() + " ON " +
                            nameRefs.get(i).getAsString() + ".cod = Reference.codref AND Reference.classref = '" +
                            nameRefs.get(i).getAsString() + "' ";
            
            sqlWhere +=    "" + nameRefs.get(i).getAsString() + "." + fieldsRefs.get(i).getAsString() + " " +
                            comparators.get(i).getAsString() + " " +
                            (logicVals.get(i).getAsJsonPrimitive().isString() ? "'" +
                                    (comparators.get(i).getAsString().equals(" LIKE ") ? "%" : "")
                                    + logicVals.get(i).getAsString()
                                    + (comparators.get(i).getAsString().equals(" LIKE ") ? "%" : "") + "'" : logicVals.get(i).getAsString()) +
                            " " + (logicNexts.get(i).isJsonNull() ? "" : logicNexts.get(i).getAsString());
        }
        
        sql += sqlInner + " WHERE " + sqlWhere + " " + this.obj.get("OrderBy").getAsString();
        
        return sql;
    }
}
