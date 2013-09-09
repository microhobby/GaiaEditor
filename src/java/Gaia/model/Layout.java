
package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Layout extends MproEntityRelation
{
        public int Efeito;
        public String Tipo;
        public List<LayoutPaginaTopo> Topo = new ArrayList();
        public List<LayoutPaginaRodape> Rodape = new ArrayList();
        
        public Layout() {}
        
        public Layout(int efeito, String tipo)
        {
                this.Efeito = efeito;
                this.Tipo = tipo;
        }
}
