/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Gaia.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author matheus
 */
public class LayoutObjetosRodape extends Objetos
{
        public transient List<LayoutRecursosRodape> recursos = new ArrayList();
        public transient List<LayoutEventosRodape> eventos = new ArrayList();
        
        public LayoutObjetosRodape(){}
        
        public LayoutObjetosRodape(int id, String jqueryId, double w, double h, double t, double l, double b, double p,
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
        }
}
