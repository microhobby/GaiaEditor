package Gaia.controller;

import Gaia.model.Layout;
import Gaia.model.Paginas;
import Gaia.model.Projeto;
import Gaia.model.User;
import java.util.ArrayList;
import mpro.MproEntity.MproEntity;

/**
 *
 * @author matheus
 */
public class Login 
{
        public static boolean canLog(String user, String key)
        {
                if(user != null && key != null)
                {
                        User us = new User();
                        us.UserName = user;
                        us.Key = key;
                        int numus = 0;

                        ArrayList<User> thisus = MproEntity.getWhere(us);

                        for(User u : thisus)
                        {
                                //u.Projetos.add(new Projeto("Teste", 500, 600, "Teste para ver a coisa coisando"));
                                //u.Projetos.get(0).paginas.add(new Paginas("", 1));
                                u.Projetos.get(0).layout.add(new Layout(0, "FadeIn"));
                                u.Save();
                                numus++;
                        }

                        return numus == 1 ? true : false;
                }
                
                return false;
        }
}
