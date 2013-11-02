
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
        private static final int SMARTPHONE = 3;
        private static final int WEB = 5;
        private static final int EAD = 2;
        private static final int WEBAPP = 6;
        private static final int SMARTPHONEAPP = 4;
        private static final int BOOK = 1;
        private static final int PAGINA = 1;
        private static final int ZOOM = 2;
        private static final int NENHUM = 0;
        public int Efeito;
        public int Tipo;
        public String BackgroundImage;
        public String BackgroundColor;
        public List<LayoutPaginaTopo> Topo = new ArrayList();
        public List<LayoutPaginaRodape> Rodape = new ArrayList();
        public boolean hasFooterTop;
        
        public Layout() {}
        
        public Layout(int efeito, int tipo)
        {
                this.Efeito = efeito;
                this.Tipo = tipo;
        }
        
        public void resolveHeaderFooter()
        {
                switch(Tipo)
                {
                        case Layout.EAD:
                                this.hasFooterTop = true;
                                LayoutPaginaTopo tp = new LayoutPaginaTopo("", 101.0, 800.0);
                                this.Topo.add(tp);
                                LayoutPaginaRodape rp = new LayoutPaginaRodape("", 50.0, 800.0);
                                this.Rodape.add(rp);
                        break;
                        default:
                                this.hasFooterTop = false;
                        break;
                }
        }
}
