
package Gaia.model;

import java.util.ArrayList;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Layout extends MproEntityRelation
{
        public int Efeito;
        public String Tipo;
        public ArrayList<Paginas> Topo = new ArrayList();
        public ArrayList<Paginas> Rodape = new ArrayList();
        
        public Layout() {}
        
        public Layout(int efeito, String tipo)
        {
                this.Efeito = efeito;
                this.Tipo = tipo;
        }
}
