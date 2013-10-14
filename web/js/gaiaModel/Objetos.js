
/* *
 * Classe OBJETOS
 * @return {Objetos}
 */
function Objetos()
{
        this.init = function(largura, altura, topo, esquerda, visivel)
        {
                this.Id = 0;
                this.JqueryId = "";
                this.W = largura;
                this.H = altura;
                this.T = topo;
                this.L = esquerda;
                this.B = 0;
                this.P = 7;
                this.R = 0;
                this.S = -100;
                this.Cb = "transparent";
                this.Cs = "#211620";
                this.Font = "Arial";
                this.FontId = 68;
                this.Cf = "#000000";
                this.SizeFont = 11;
                this.Negrito = false;
                this.Italico = false;
                this.Subline = false;
                this.Visible = visivel;
                this.Zindex = 1;
                this.Opacity = 1.0;
                this.Script = "";
                this.Text = "";
                this.FatherId = 0;
                this.recursos = new Array();
                this.eventos = new Array();
                this.ClassType = "Objetos";
                this.cod = 2147483647;
                this.superCod = 2147483647;
        };
}


