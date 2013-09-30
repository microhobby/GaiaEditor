
package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntity;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Objetos extends MproEntityRelation
{
        public int Id;
        public String JqueryId;
        public double W;
        public double H;
        public double T;
        public double L;
        public double B;
        public double P;
        public double R;
        public double S;
        public String Cb;
        public String Cs;
        public String Font;
        public int FontId;
        public String Cf;
        public int SizeFont;
        public boolean Negrito;
        public boolean Italico;
        public boolean Subline;
        public boolean Visible;
        public int Zindex;
        public double Opacity;
        public String Script;
        public int recurso;
        public String Text;
        public String FatherId;
        public List<Eventos> eventos = new ArrayList();
        public String ClassType;
        private Recursos _recurso;
        
        public Objetos(){}
        
        public Objetos(int id, String jqueryId, double w, double h, double t, double l, double b, double p,
                double r, double s, String cb, String cs, String font, int fontid, String cf, int sizefont, boolean  negrito,
                boolean italico, boolean subline, boolean visible, int zindex, double opacity, String script, String text, String fatherId)
        {
                this.Id = id;
                this.JqueryId = jqueryId;
                this.W = w;
                this.H = h;
                this.T = t;
                this.L = l;
                this.B = b;
                this.P = p;
                this.R = r;
                this.S = s;
                this.Cb = cb;
                this.Cs = cs;
                this.Font = font;
                this.FontId = fontid;
                this.Cf = cf;
                this.SizeFont = sizefont;
                this.Negrito = negrito;
                this.Italico = italico;
                this.Subline = subline;
                this.Visible = visible;
                this.Zindex = zindex;
                this.Opacity = opacity;
                this.Script = script;
                this.Text = text;
                this.FatherId = fatherId;
                this.ClassType = this.getClass().getName();
        }
        
        
        public void ResourceResolve()
        {
                Recursos r = new Recursos();
                r.cod = this.recurso;
                ArrayList<Recursos> rTmp = MproEntity.getWhere(r);
                
                if(rTmp.size() > 0)
                    this._recurso = rTmp.get(0);
        }
}
