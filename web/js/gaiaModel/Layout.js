/* 
 * Classe Layout
 */

function Layout(efeito, tipo)
{
        if(efeito.Efeito == undefined)
        {
                this.Efeito = efeito;
                this.Tipo = tipo;
                this.Topo = new Array();
                this.Rodape = new Array();
                this.cod = 2147483647;
                this.superCod = 2147483647;
        }
        else
        {
                this.Efeito = efeito.Efeito;
                this.Tipo = efeito.Tipo;
                this.Topo = efeito.Topo;
                this.Rodape = efeito.Rodape; 
                this.cod = efeito.cod;
                this.superCod = efeito.superCod;
        }
}


