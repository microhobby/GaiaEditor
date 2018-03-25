<%-- 
    Document   : Executions
    Created on : 09/06/2014, 17:33:53
    Author     : matheus
--%>

<%@page import="java.util.List"%>
<%@page import="com.google.gson.reflect.TypeToken"%>
<%@page import="java.lang.reflect.Type"%>
<%@page isThreadSafe="false" %>
<%@page import="com.google.gson.Gson"%>
<%@page import="br.com.mpro3.MproEntity.LauDB"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    if (request.getParameter("jsonList") != null)
    {
        if (request.getParameter("user") != null && request.getParameter("cod") != null)
        {
            String jsonList = request.getParameter("jsonList");
            String user = request.getParameter("user");
            String cod = request.getParameter("cod");

            String ins = "";

            if (request.getParameter("ins") != null)
            {
                ins = request.getParameter("ins");
            }

            String path = System.getenv("OPENSHIFT_DATA_DIR") != null
                    ? (System.getenv("OPENSHIFT_DATA_DIR")) : request.getRealPath("/");

            path += "/" + user + "/sandbox/" + cod + "/MproEntity";

            LauDB laudb = new LauDB(path + "/GaiaMproEntities.lau");
            Gson json = new Gson();

            laudb.execute("CREATE TABLE IF NOT EXISTS Reference (class TEXT, classref TEXT, ix INTEGER, cod INTEGER, codref INTEGER, PRIMARY KEY(class, classref, cod, codref));");

            Type type = new TypeToken<List<String>>()
            {
            }.getType();
            List<String> list = json.fromJson(jsonList, type);

            for (String cmd : list)
            {
                laudb.execute(cmd);
            }

            if (ins.equals("ver"))
            {
                out.print(laudb.get_last_insert_rowid());
            } else
            {
                out.print("SUCESSO");
            }
        }
    }
%>
