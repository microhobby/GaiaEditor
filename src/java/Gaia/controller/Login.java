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
        public User LogedUser = null;
        
        public Login()
        {}
        
        public boolean canLog(String user, String key)
        {
                if(user != null && key != null)
                {
                        User us = new User();
                        us.UserName = user;
                        us.Chave = key;
                        int numus = 0;

                        ArrayList<User> thisus = MproEntity.getWhere(us);

                        for(User u : thisus)
                        {
                                numus++;
                                LogedUser = u;
                        }
                        
                        return numus == 1 ? true : false;
                }
                
                return false;
        }
        
        public String UserToJson()
        {
                LogedUser.deleteDeleteds();
                //User u = MproEntity.fromJson("{\"Nome\":\"Matheus de Barros Castello\",\"UserName\":\"matheus\",\"Key\":\"22032010\",\"Email\":\"assyral-v@ig.com.br\",\"DataNascimento\":\"14/11/1990\",\"Loged\":false,\"Projetos\":[{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"}]}", User.class);
                String json = LogedUser.toJson();
                return json;
        }
}
