<%-- 
    Document   : dataRecordService
    Created on : 20/02/2015, 14:34:11
    Author     : matheus
--%>

<%@page import="java.util.ArrayList"%>
<%@page import="com.google.gson.JsonElement"%>
<%@page import="com.google.gson.JsonParser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page isThreadSafe="false" %>
<%@page import="com.google.gson.Gson"%>
<%@page import="br.com.mpro3.MproEntity.LauDB"%>
<%@page import="br.com.mpro3.MproEntity.utils.SQLBuilderSQLite"%>

<%
    if (request.getParameter("dataRecord") != null)
    {
        if (request.getParameter("user") != null && request.getParameter("cod") != null)
        {
            String user = request.getParameter("user");
            String cod = request.getParameter("cod");
            String path = System.getenv("OPENSHIFT_DATA_DIR") != null
                    ? (System.getenv("OPENSHIFT_DATA_DIR")) : request.getRealPath("/");

            path += "/" + user + "/sandbox/" + cod + "/MproEntity";
            
            JsonElement dataRecord = new JsonParser().parse(request.getParameter("dataRecord"));
            LauDB lauDB = new LauDB(path + "/GaiaMproEntities.lau");
            SQLBuilderSQLite sqlBuilder = new SQLBuilderSQLite();
            sqlBuilder.setJSONObject(dataRecord);
            
            if(dataRecord.getAsJsonObject().has("CodRef"))
            {
                lauDB.execute(sqlBuilder.createRefTable());
                lauDB.execute(sqlBuilder.insertRef());
            }
            else if(dataRecord.getAsJsonObject().get("Cod").getAsInt() == 2147483647)
            {
                lauDB.execute(sqlBuilder.insert());
                out.print(lauDB.get_last_insert_rowid());
            }
            else
            {
                lauDB.execute(sqlBuilder.update());
            }
        }
    }
%>