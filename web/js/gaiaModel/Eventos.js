/* 
 * Classe de EVENTOS
 */

function Eventos(id)
{
        if(id.idEvento == undefined)
        {
                this.idEvento = id;
                this.cod = 2147483647;
                this.superCod = 2147483647;
        }
        else
        {
                this.idEvento = id.idEvento;
                this.cod = id.cod;
                this.superCod = id.superCod;
        }
}


