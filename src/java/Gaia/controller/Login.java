package Gaia.controller;

import Gaia.model.User;
import com.google.gson.Gson;
import java.util.ArrayList;
import mpro.MproEntity.MproEntity;

/**
 *
 * @author matheus
 */
public class Login 
{
        public static User LogedUser = null;
        
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
                                Login.LogedUser = u;
                        }
                        
                        return numus == 1 ? true : false;
                }
                
                return false;
        }
        
        public static String UserToJson()
        {
                //User u = MproEntity.fromJson("{\"Nome\":\"Matheus de Barros Castello\",\"UserName\":\"matheus\",\"Key\":\"22032010\",\"Email\":\"assyral-v@ig.com.br\",\"DataNascimento\":\"14/11/1990\",\"Loged\":false,\"Projetos\":[{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"}]}", User.class);
                String json = Login.LogedUser.toJson();
                return json;
        }
}
