package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntity;
import org.mongodb.morphia.annotations.Reference;

/**
 *
 * @author matheus
 */
public class Paginas extends MproEntity
{

    public String ScriptGeral;
    public int Indice;
    @Reference
    public List<Objetos> Elementos = new ArrayList();

    public Paginas()
    {
    }

    public Paginas(String script, int indice)
    {
        this.ScriptGeral = script;
        this.Indice = indice;
    }

    public void deleteDeleteds()
    {
        for (Objetos Elemento : this.Elementos)
        {
            Elemento.deleteDeleteds();
        }
    }
}
