<%-- 
    Document   : createTableService
    Created on : 20/02/2015, 13:24:01
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
    if (request.getParameter("createTable") != null)
    {
        if (request.getParameter("user") != null && request.getParameter("cod") != null)
        {
            String user = request.getParameter("user");
            String cod = request.getParameter("cod");
            String path = System.getenv("OPENSHIFT_DATA_DIR") != null
                    ? (System.getenv("OPENSHIFT_DATA_DIR")) : request.getRealPath("/");

            path += "/" + user + "/sandbox/" + cod + "/MproEntity";
            
            JsonElement createTable = new JsonParser().parse(request.getParameter("createTable"));
            LauDB lauDB = new LauDB(path + "/GaiaMproEntities.lau");
            SQLBuilderSQLite sQLBuilderSQLite = new SQLBuilderSQLite();
            sQLBuilderSQLite.setJSONObject(createTable);
            
            ArrayList<String> sqls = sQLBuilderSQLite.createTable();
            
            for(String sql : sqls)
            {
                lauDB.execute(sql);
            }
        }
    }
%>