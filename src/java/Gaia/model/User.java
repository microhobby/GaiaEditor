package Gaia.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import mpro.MproEntity.MproEntity;
import org.mongodb.morphia.annotations.Reference;

/**
 *
 * @author matheus
 */
public class User extends MproEntity
{

    public String Nome;
    public String UserName;
    public String Chave;
    public String Email;
    public String DataNascimento;
    @Reference
    public List<Projeto> Projetos = new ArrayList();

    /**
        * Construtor
        */
    public User()
    {
    }

    /**
        * Construtor inicializando as propiedades
        */
    public User(String username, String key, String nome, String email, String datanascimento)
    {
        this.Nome = nome;
        this.UserName = username;
        this.Chave = key;
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
        return (int) (lg1 / (1000L * 60 * 60 * 24 * 365));
    }

    public void deleteDeleteds()
    {
        for (Projeto projeto : this.Projetos)
        {
            projeto.deleteDeleteds();
        }
    }
}
