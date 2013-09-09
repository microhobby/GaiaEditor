
package Gaia.controller;

import Gaia.model.User;
import java.io.IOException;
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
        
        public GaiaController(String userJson, HttpServletRequest _request, JspWriter _out)
        {
                this.userContext = MproEntity.fromJson(userJson, User.class);
                this.request = _request;
                this.out = _out;
                
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
        
        public void newProject() throws IOException
        {
                this.userContext.Save();
                out.print(this.userContext.Projetos.get(this.userContext.Projetos.size() -1).Nome);
        }
}
