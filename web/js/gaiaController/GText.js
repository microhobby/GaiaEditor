
/**
 * Classe que retorna HTML de texto
 * @returns {GText}
 */

function GText(id, jqueryId, w, h, t, l, b, p,
                r, s, cb, cs, font, fontid, cf, sizefont, negrito,
                italico, subline, visible, zindex, opacity, script, text, fatherId)
{
        this.init(id, jqueryId, w, h, t, l, b, p,
                r, s, cb, cs, font, fontid, cf, sizefont, negrito,
                italico, subline, visible, zindex, opacity, script, text, fatherId);
                
        this.ClassType = "GText";
        this.JqueryId = "#text" + this.Id;
}

// Herança
GText.prototype = new Objetos();