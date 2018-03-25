<%-- 
    Document   : index
    Created on : 08/06/2014, 16:23:35
    Author     : matheus
--%>

<%@page isThreadSafe="false" %>
<%@page import="com.google.gson.Gson"%>
<%@page import="br.com.mpro3.MproEntity.LauDB"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
        if(request.getParameter("cmd") != null)
        {
                if(request.getParameter("user") != null && request.getParameter("cod") != null)
                {
                        String cmd = request.getParameter("cmd");
                        String user = request.getParameter("user");
                        String cod = request.getParameter("cod"); 
                        String path = System.getenv("OPENSHIFT_DATA_DIR") != null
                                ? (System.getenv("OPENSHIFT_DATA_DIR")) : request.getRealPath("/");
                        
                        path += "/" + user + "/sandbox/" + cod + "/MproEntity";
                        
                        //String cmd = "SELECT * FROM Blog";
                        
                        LauDB laudb = new LauDB(path + "/GaiaMproEntities.lau");
                        Gson json = new Gson();

                        String[][] res = laudb.query(cmd);

                        if(res != null)
                                out.print(json.toJson(res));
                        else
                                out.print("[]");
                }
        }
 %>