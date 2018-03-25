<%-- 
    Document   : dataRequestService
    Created on : 20/02/2015, 14:55:26
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
    if (request.getParameter("dataRequest") != null)
    {
        if (request.getParameter("user") != null && request.getParameter("cod") != null)
        {
            Gson json = new Gson();
            String user = request.getParameter("user");
            String cod = request.getParameter("cod");
            String path = System.getenv("OPENSHIFT_DATA_DIR") != null
                    ? (System.getenv("OPENSHIFT_DATA_DIR")) : request.getRealPath("/");

            path += "/" + user + "/sandbox/" + cod + "/MproEntity";
            
            JsonElement dataRequest = new JsonParser().parse(request.getParameter("dataRequest"));
            LauDB lauDB = new LauDB(path + "/GaiaMproEntities.lau");
            SQLBuilderSQLite sqlBuilder = new SQLBuilderSQLite();
            sqlBuilder.setJSONObject(dataRequest);
            
            String[][] res = lauDB.query(sqlBuilder.selectWhere());
            
            if(res != null)
                out.print(json.toJson(res));
            else
                out.print("[]");
        }
    }
%>
