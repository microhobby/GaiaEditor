package Gaia.model;

import java.util.List;
import java.util.ArrayList;
import mpro.MproEntity.MproEntity;
import org.mongodb.morphia.annotations.Reference;

/**
 *
 * @author matheus
 */
public class Projeto extends MproEntity
{

    public String Nome;
    public double AlturaPaginas;
    public double LarguraPaginas;
    @Reference
    public List<Layout> layout = new ArrayList();
    @Reference
    public List<Paginas> paginas = new ArrayList();
    @Reference
    public List<Recursos> recursos = new ArrayList();
    public String Obs;
    public String JsonEntities;

    public Projeto()
    {
    }

    public Projeto(String nome, double altura, double largura, String obs)
    {
        this.Nome = nome;
        this.AlturaPaginas = altura;
        this.LarguraPaginas = largura;
        this.Obs = obs;
    }

    public void deleteDeleteds()
    {
        for (Paginas pagina : this.paginas)
        {
            pagina.deleteDeleteds();
        }
    }
}
