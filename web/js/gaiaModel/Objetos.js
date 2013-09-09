/* 
 * Classe OBJETOS
 */

function Objetos(id, jqueryId, w, h, t, l, b, p,
                r, s, cb, cs, font, fontid, cf, sizefont, negrito,
                italico, subline, visible, zindex, opacity, script, text, fatherId)
{
        if(id.Id == undefined)
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
                this.recursos = new Array();
                this.eventos = new Array();
                this.cod = 2147483647;
                this.superCod = 2147483647;
        }
        else
        {
                this.Id = id.Id;
                this.JqueryId = id.JqueryId;
                this.W = id.W;
                this.H = id.H;
                this.T = id.T;
                this.L = id.L;
                this.B = id.B;
                this.P = id.P;
                this.R = id.R;
                this.S = id.S;
                this.Cb = id.Cb;
                this.Cs = id.Cs;
                this.Font = id.Font;
                this.FontId = id.FontId;
                this.Cf = id.Cf;
                this.SizeFont = id.SizeFont;
                this.Negrito = id.Negrito;
                this.Italico = id.Italico;
                this.Subline = id.Subline;
                this.Visible = id.Visible;
                this.Zindex = id.Zindex;
                this.Opacity = id.Opacity;
                this.Script = id.Script;
                this.Text = id.Text;
                this.FatherId = id.FatherId;
                this.cod = id.cod;
                this.superCod = id.superCod;
        }
}


