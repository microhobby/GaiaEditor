
package Gaia.model;

import java.util.ArrayList;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Paginas extends MproEntityRelation
{
        public String ScriptGeral;
        public int Indice;
        public ArrayList<Objetos> Elementos = new ArrayList();
        
        public Paginas() {}
        
        public Paginas(String script, int indice)
        {
                this.ScriptGeral = script;
                this.Indice = indice;
        }
}