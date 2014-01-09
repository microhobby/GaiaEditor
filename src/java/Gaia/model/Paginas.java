
package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Paginas extends MproEntityRelation
{
        public String ScriptGeral;
        public int Indice;
        public List<Objetos> Elementos = new ArrayList();
        
        public Paginas() {}
        
        public Paginas(String script, int indice)
        {
                this.ScriptGeral = script;
                this.Indice = indice;
        }
        
        public void deleteDeleteds()
          {
                  for(int i =0; i < this.Elementos.size(); i++)
                  {
                          this.Elementos.get(i).deleteDeleteds();
                  }
          }
}
