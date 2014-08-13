<%-- 
    Document   : upload
    Created on : 14/10/2013, 15:42:24
    Author     : matheus
--%>

<%@page import="Gaia.model.User"%>
<%@ page import="java.io.*,java.util.*, javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.io.output.*" %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%

        /**
         * CACHE
         */
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
        httpResponse.setHeader("Pragma", "no-cache"); // HTTP 1.0
        httpResponse.setDateHeader("Expires", 0); // Proxies.
        
        if(session.getAttribute("isLoged") != null && (Boolean)session.getAttribute("isLoged"))
        {
                User u = (User) session.getAttribute("userObject");
                File file ;
                int maxFileSize = 50000 * 1024;
                int maxMemSize = 50000 * 1024;
                String context = (System.getenv("OPENSHIFT_DATA_DIR") != null ? 
                        System.getenv("OPENSHIFT_DATA_DIR") : getServletContext().getRealPath("/"));
                //String filePath = "/home/matheus/gaiaData/User_" + u.UserName + "_" + u.cod + "/";
                String filePath = context + "/" +  u.UserName + "_" + u.cod + "/";
                new File(filePath).mkdir();
                String retJSON = "{\"files\":[";

                // Verify the content type
                String contentType = request.getContentType();
                if ((contentType.indexOf("multipart/form-data") >= 0)) 
                {
                        DiskFileItemFactory factory = new DiskFileItemFactory();
                        // maximum size that will be stored in memory
                        factory.setSizeThreshold(maxMemSize);
                        // Location to save data that is larger than maxMemSize.
                        factory.setRepository(new File("/home/matheus/gaiaData/temp"));

                        // Create a new file upload handler
                        ServletFileUpload upload = new ServletFileUpload(factory);
                        // maximum file size to be uploaded.
                        upload.setSizeMax( maxFileSize );
                        try
                        { 
                                // Parse the request to get file items.
                                List fileItems = upload.parseRequest(request);

                                // Process the uploaded file items
                                Iterator i = fileItems.iterator();

                                while ( i.hasNext () ) 
                                {
                                        FileItem fi = (FileItem)i.next();

                                        if ( !fi.isFormField () )	
                                        {
                                                // Get the uploaded file parameters
                                                String fieldName = fi.getFieldName();
                                                String fileName = fi.getName();
                                                String finalName = "";
                                                boolean isInMemory = fi.isInMemory();
                                                long sizeInBytes = fi.getSize();
                                                
                                                
                                                // Write the file
                                                if( fileName.lastIndexOf("\\") >= 0 )
                                                {
                                                        finalName = System.currentTimeMillis() + "." + fileName.substring( fileName.lastIndexOf("\\"));
                                                }
                                                else
                                                {
                                                        finalName = System.currentTimeMillis() + "." + fileName.substring(fileName.lastIndexOf("\\")+1);
                                                }
                                                file = new File(filePath + finalName);
                                                fi.write( file ) ;
                                                retJSON += "{\"name\":\""  + finalName + "\", \"size\":\"" + fi.getSize() + "\", \"type\": \"multipart form-data;\"}";
                                        }
                                }
                                retJSON += "]}";
                                out.println(retJSON);
                        }
                        catch(Exception ex) 
                        {
                                retJSON += "{\"name\":\"0.Erro no servidor!. \", \"size\":\"1024\", \"type\": \"multipart form-data;\", \"error\":\"" + ex.getMessage() + "\"}";
                                retJSON += "]}";
                                out.println(retJSON);
                        }
                }
                else
                {
                        retJSON += "{\"name\":\"0.Erro no servidor!. \", \"size\":\"1024\", \"type\": \"multipart form-data;\", \"error\":\"abort\"}";
                        retJSON += "]}";
                        out.println(retJSON);
                }
        }
%>

