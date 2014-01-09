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
                        this.Elementos[i].cast();
                }
        };
        
        this.ResolveObjectsSpecialFields = function()
        {
                for(var i = 0; i < this.Elementos.length; i++)
                {
                        /** @type Objetos */
                        var objTmp = this.Elementos[i];
                        objTmp.resolveSpecialFields();
                }
        };
        
        this.ParseObjectsSpecialFields = function()
        {
                for(var i = 0; i < this.Elementos.length; i++)
                {
                        /** @type Objetos */
                        var objTmp = this.Elementos[i];
                        objTmp.parseSpecialFields();
                }
        };
        
        this.CloneWithoutZeroId = function()
        {
                /** @type Paginas */
                var ret = $.extend(true, new Paginas(), this);
                for(var i = 0; i < ret.Elementos.length; i++)
                {
                        /** @type Objetos */
                        var elem = ret.Elementos[i];
                        if(elem.cod === 2147483647)
                        {
                                ret.Elementos.splice(i, 1);
                        }
                        
                        // tira os estados não gravados tbm
                        for(var s = 0; s < elem.estados.length; s++)
                        {
                                /** @type Objetos */
                                var states = elem.estados[s];
                                if(states.cod === 2147483647)
                                {
                                        ret.Elementos[i].estados.splice(s, 1);
                                }
                        }
                        
                        // tira os eventos não gravados
                        for(var v = 0; v < elem.eventos.length; v++)
                        {
                                /** @type Eventos */
                                var events = elem.eventos[v];
                                if(events.cod === 2147483647)
                                {
                                        ret.Elementos[i].eventos.splice(v, 1);
                                }
                        }
                }
                return ret;
        }
}


