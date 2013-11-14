<%-- 
    Document   : server
    Created on : 08/09/2013, 13:32:44
    Author     : matheus
--%>

<%@page import="mpro.MproEntity.MproEntity"%>
<%@page import="Gaia.controller.GaiaController"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Content-Type", "text/html");
            /**
        * CACHE
        */
       HttpServletResponse httpResponse = (HttpServletResponse) response;
       httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
       httpResponse.setHeader("Pragma", "no-cache"); // HTTP 1.0
       httpResponse.setDateHeader("Expires", 0); // Proxies.

            //MproEntity.setBasePath("c:\\MproEntity\\");
            MproEntity.setBasePath("/home/matheus");
            MproEntity.setProjectName("GaiaEditor");
            
            if(session.getAttribute("isLoged") != null && (Boolean)session.getAttribute("isLoged"))
            {
                    if(request.getParameter("user") != null)
                    {
                            GaiaController gaiaEditor = new GaiaController(request.getParameter("user"), request, out, getServletContext());
                    }
                    else
                            throw new Exception("SAIA DAQUI VOCÊ NÃO SABE O QUE ESTÁ FAZENDO!");
            }
            else
                    throw new Exception("WITHOUT PERMISSION SUCK MY DICK!!");

%>
