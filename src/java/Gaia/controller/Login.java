package Gaia.controller;

import Gaia.model.User;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import mpro.MproEntity.MproEntity;

/**
 *
 * @author matheus
 */
public class Login 
{
    public User LogedUser = null;

    static String sha1(String input) throws NoSuchAlgorithmException 
    {
        MessageDigest mDigest = MessageDigest.getInstance("SHA1");
        byte[] result = mDigest.digest(input.getBytes());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < result.length; i++) 
        {
            sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
        }

        return sb.toString();
    }

    public Login()
    {}

    public boolean canLog(String user, String key)
    {   
        if(user != null && key != null)
        {
            User us = new User();
            us.UserName = user;
            try 
            {
                us.Chave = Login.sha1(key);
            } 
            catch (NoSuchAlgorithmException ex) 
            {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
            int numus = 0;

            User u =   MproEntity.dataStoreSingleton()
                        .createQuery(User.class)
                        .filter("UserName =", us.UserName)
                        .filter("Chave =", us.Chave).get();

            if(u != null)
            {
                numus++;
                LogedUser = u;
                LogedUser.deleteDeleteds();
            }

            return numus == 1;
        }

        return false;
    }

    public String UserToJson()
    {
        LogedUser.deleteDeleteds();
        //User u = MproEntity.fromJson("{\"Nome\":\"Matheus de Barros Castello\",\"UserName\":\"make\",\"Key\":\"22032010\",\"Email\":\"assyral-v@ig.com.br\",\"DataNascimento\":\"14/11/1990\",\"Loged\":false,\"Projetos\":[{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"},{\"Nome\":\"Teste\",\"AlturaPaginas\":500,\"LarguraPaginas\":600,\"layout\":[],\"paginas\":[],\"recursos\":[],\"Obs\":\"teste\"}]}", User.class);
        //u.Save();
        String json = LogedUser.toJson();
        return json;
    }
}
