package Gaia.controller;

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
                                numus++;
                        }

                        return numus == 1 ? true : false;
                }
                
                return false;
        }
}
