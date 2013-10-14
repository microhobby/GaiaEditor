/* 
 * Classe Layout
 */

function Layout(efeito, tipo)
{
                this.Efeito = efeito;
                this.Tipo = tipo;
                this.Topo = new Array();
                this.Rodape = new Array();
                this.cod = 2147483647;
                this.superCod = 2147483647;
}

Layout.SMARTPHONE = 1;
Layout.WEB = 2;
Layout.EAD = 3;
Layout.WEBAPP = 4;
Layout.SMARTPHONEAPP = 5;
Layout.BOOK = 6;

