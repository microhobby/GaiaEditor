/* 
 * Classe Paginas
 */

function Paginas(script, indice)
{
        if(script.ScriptGeral == undefined)
        {
                this.ScriptGeral = script;
                this.Indice = indice;
                this.Elementos = new Array();
                this.cod = 2147483647;
                this.superCod = 2147483647;
        }
        else
        {
                this.ScriptGeral = script.ScriptGeral;
                this.Indice = script.Indice;
                this.Elementos = script.Elementos;
                this.cod = script.cod;
                this.superCod = script.superCod;
        }
}


