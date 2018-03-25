/* 
 * Classe Layout
 */

function Layout(efeito, tipo)
{
    this.Efeito = efeito;
    this.Tipo = tipo;
    this.BackgroundImage = "";
    this.BackgroundColor = "";
    this.hasFooterTop = false;
    this.Topo = new Array();
    this.Rodape = new Array();
    this.cod = null;
    //this.superCod = 2147483647;
}

Layout.SMARTPHONE = 3;
Layout.WEB = 5;
Layout.EAD = 2;
Layout.WEBAPP = 6;
Layout.SMARTPHONEAPP = 4;
Layout.BOOK = 1;

