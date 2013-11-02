/* 
 * Classe Paginas
 */

function Paginas(script, indice)
{
        this.ScriptGeral = script;
        this.Indice = indice;
        this.Elementos = new Array();
        this.cod = 2147483647;
        this.superCod = 2147483647;
        
        this.cast = function()
        {
                for(var i = 0; i < this.Elementos.length; i++)
                {
                        this.Elementos[i] = $.extend(new window[this.Elementos[i].ClassType](), this.Elementos[i]);
                }
        };
}


