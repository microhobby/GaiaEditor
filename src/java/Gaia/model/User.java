package Gaia.model;

import java.util.Calendar;
import mpro.MproEntity.MproEntity;

/**
 *
 * @author matheus
 */
public class User  extends MproEntity
{
        public String Nome;
        public String UserName;
        public String Key;
        public String Email;
        public String DataNascimento;
        public boolean Loged;
        
        /**
         * Construtor
         */
        public User(){}
        
        /**
         * Construtor inicializando as propiedades
         */
        public User(String username, String key, String nome, String email, String datanascimento)
        {
                this.Nome = nome;
                this.UserName = username;
                this.Key = key;
                this.Email = email;
                this.DataNascimento = datanascimento;
        }
        
        /**
           * Pega a idade do individuo
           */
          public int getIdade()
          {
                    String[] parts = this.DataNascimento.split("/");
                    Calendar calendar = Calendar.getInstance();
                    Calendar today = Calendar.getInstance();
                    calendar.set(Integer.parseInt(parts[2]), Integer.parseInt(parts[1]), Integer.parseInt(parts[0]));
                    long lg1 = today.getTime().getTime() - calendar.getTime().getTime();
                    return (int)(lg1 / (1000L * 60 * 60 * 24 *  365));
          }
}
