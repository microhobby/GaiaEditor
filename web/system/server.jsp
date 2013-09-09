<%-- 
    Document   : server
    Created on : 08/09/2013, 13:32:44
    Author     : matheus
--%>

<%@page import="Gaia.controller.GaiaController"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Content-Type", "text/html");
            response.setHeader("Cache-Control", "no-cache");

            if(session.getAttribute("isLoged") != null && (Boolean)session.getAttribute("isLoged"))
            {
                    if(request.getParameter("user") != null)
                    {
                            GaiaController gaiaEditor = new GaiaController(request.getParameter("user"), request, out);
                    }
                    else
                            throw new Exception("SAIA DAQUI VOCÊ NÃO SABE O QUE ESTÁ FAZENDO!");
            }
            else
                    throw new Exception("WITHOUT PERMISSION SUCK MY DICK!!");

%>
