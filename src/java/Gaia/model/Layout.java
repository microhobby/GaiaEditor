
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
        public static final int SMARTPHONE = 1;
        public static final int WEB = 2;
        public static final int EAD = 3;
        public static final int WEBAPP = 4;
        public static final int SMARTPHONEAPP = 5;
        public static final int BOOK = 6;
        public int Efeito;
        public int Tipo;
        public List<LayoutPaginaTopo> Topo = new ArrayList();
        public List<LayoutPaginaRodape> Rodape = new ArrayList();
        public boolean hasFooterTop;
        
        public Layout() {}
        
        public Layout(int efeito, int tipo)
        {
                this.Efeito = efeito;
                this.Tipo = tipo;
                
                switch(tipo)
                {
                        case 3:
                                this.hasFooterTop = true;
                        break;
                        default:
                                this.hasFooterTop = false;
                        break;
                }
        }
}
