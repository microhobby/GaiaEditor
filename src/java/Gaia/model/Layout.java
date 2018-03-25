package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntity;
import org.mongodb.morphia.annotations.Reference;

/**
 *
 * @author matheus
 */
public class Layout extends MproEntity
{

    private static final int SMARTPHONE = 3;
    private static final int WEB = 5;
    private static final int EAD = 2;
    private static final int WEBAPP = 6;
    private static final int SMARTPHONEAPP = 4;
    private static final int BOOK = 1;
    private static final int DESKTOP = 7;
    private static final int PAGINA = 1;
    private static final int ZOOM = 2;
    private static final int NENHUM = 0;
    public int Efeito;
    public int Tipo;
    public String BackgroundImage;
    public String BackgroundColor;
    @Reference
    public List<LayoutPaginaTopo> Topo = new ArrayList();
    @Reference
    public List<LayoutPaginaRodape> Rodape = new ArrayList();
    public boolean hasFooterTop;

    public Layout()
    {
    }

    public Layout(int efeito, int tipo)
    {
        this.Efeito = efeito;
        this.Tipo = tipo;
    }

    public List<Paginas> resolveHeaderFooter(Projeto p)
    {
        List<Paginas> projsLayout = new ArrayList();
        LayoutPaginaTopo tp;
        LayoutPaginaRodape rp;
        switch (Tipo)
        {
            case Layout.EAD:
                this.hasFooterTop = true;
                tp = new LayoutPaginaTopo("", 100, p.LarguraPaginas);
                this.Topo.add(tp);
                rp = new LayoutPaginaRodape("", 50, p.LarguraPaginas);
                this.Rodape.add(rp);
                projsLayout.add(new Paginas("", 0));
                projsLayout.add(new Paginas("", 1));
                break;
            case Layout.WEB:
                this.hasFooterTop = true;
                tp = new LayoutPaginaTopo("", 100, p.LarguraPaginas);
                this.Topo.add(tp);
                rp = new LayoutPaginaRodape("", 100, p.LarguraPaginas);
                this.Rodape.add(rp);
                projsLayout.add(new Paginas("", 0));
                projsLayout.add(new Paginas("", 1));
                break;
            default:
                this.hasFooterTop = false;
                tp = new LayoutPaginaTopo("", 0, p.LarguraPaginas);
                this.Topo.add(tp);
                rp = new LayoutPaginaRodape("", 0, p.LarguraPaginas);
                this.Rodape.add(rp);
                projsLayout.add(new Paginas("", 0));
                projsLayout.add(new Paginas("", 1));
                break;
        }
        return projsLayout;
    }
}
