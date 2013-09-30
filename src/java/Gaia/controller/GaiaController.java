
package Gaia.controller;

import Gaia.model.Projeto;
import Gaia.model.User;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspWriter;
import mpro.MproEntity.MproEntity;

/**
 *
 * @author matheus
 */
public class GaiaController 
{
        User userContext;
        HttpServletRequest request;
        JspWriter out;
        
        public GaiaController(String userCod, HttpServletRequest _request, JspWriter _out)
        {
                this.request = _request;
                this.out = _out;
                User tmpU = new User();
                tmpU.cod = Integer.parseInt(userCod);
                ArrayList<User> users = MproEntity.getWhere(tmpU);
                
                for(User u : users)
                {
                        this.userContext = u;
                }
                
                if(this.userContext != null)
                {
                        if(this.request.getParameter("method") != null)
                        {
                                try 
                                {
                                        this.getClass().getMethod(this.request.getParameter("method")).invoke(this);
                                } 
                                catch (Exception ex) 
                                {
                                        Logger.getLogger(GaiaController.class.getName()).log(Level.SEVERE, null, ex);
                                }
                        }
                }
                else
                    writeStream("Usuário não encontrado.", "null", true);
        }
        
        public void newProject() 
        {
                Projeto newPro = MproEntity.fromJson(this.request.getParameter("project"), Projeto.class);
                this.userContext.Projetos.add(newPro);
                this.userContext.Save();
                writeStream("Projeto retornado", this.userContext.Projetos.get(this.userContext.Projetos.size() -1).toJson(), false);
        }
        
        public void newLayout()
        {
                
        }
        
        public void writeStream(String response, String data, boolean error)
        {
                try 
                {
                        out.print("{\"response\": \"" + response + "\", \"data\": " + data + ", \"error\": "  + (error ? true : false) +  "}");
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(GaiaController.class.getName()).log(Level.SEVERE, null, ex);
                }
        }
}
