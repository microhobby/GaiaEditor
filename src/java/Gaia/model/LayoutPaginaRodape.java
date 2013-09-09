
package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class LayoutPaginaRodape extends MproEntityRelation
{
        public String ScriptGeral;
        public int Indice;
        public List<LayoutObjetosRodape> Elementos = new ArrayList();
    
        public LayoutPaginaRodape(){}
        
        public LayoutPaginaRodape(String script, int indice)
        {
                this.ScriptGeral = script;
                this.Indice = indice;
        }
}
