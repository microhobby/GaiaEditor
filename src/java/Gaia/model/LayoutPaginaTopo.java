
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
        public double Altura;
        public double Largura;
        public List<LayoutObjetosTopo> Elementos = new ArrayList();
    
        public LayoutPaginaTopo(){}
        
        public LayoutPaginaTopo(String script, double h, double w)
        {
                this.ScriptGeral = script;
                this.Altura = h;
                this.Largura = w;
        }
}

