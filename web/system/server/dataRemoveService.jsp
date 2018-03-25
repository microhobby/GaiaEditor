<%-- 
    Document   : dataRemoveService
    Created on : 20/02/2015, 14:41:24
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
    if (request.getParameter("dataRemove") != null)
    {
        if (request.getParameter("user") != null && request.getParameter("cod") != null)
        {
            String user = request.getParameter("user");
            String cod = request.getParameter("cod");
            String path = System.getenv("OPENSHIFT_DATA_DIR") != null
                    ? (System.getenv("OPENSHIFT_DATA_DIR")) : request.getRealPath("/");

            path += "/" + user + "/sandbox/" + cod + "/MproEntity";
            
            JsonElement dataRemove = new JsonParser().parse(request.getParameter("dataRemove"));
            LauDB lauDB = new LauDB(path + "/GaiaMproEntities.lau");
            SQLBuilderSQLite sqlBuilder = new SQLBuilderSQLite();
            sqlBuilder.setJSONObject(dataRemove);
            
            ArrayList<String> sqls = sqlBuilder.delete();
            
            for(String sql : sqls)
            {
                lauDB.execute(sql);
            }
        }
    }
%>
