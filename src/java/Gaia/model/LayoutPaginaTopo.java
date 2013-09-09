
package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class LayoutPaginaTopo extends MproEntityRelation
{
        public String ScriptGeral;
        public int Indice;
        public List<LayoutObjetosTopo> Elementos = new ArrayList();
    
        public LayoutPaginaTopo(){}
        
        public LayoutPaginaTopo(String script, int indice)
        {
                this.ScriptGeral = script;
                this.Indice = indice;
        }
}

