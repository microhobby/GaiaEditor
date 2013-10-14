/* 
 * Classe PROJETO
 */

function Projeto(nome, altura, largura, obs)
{
        this.Nome = nome;
        this.AlturaPaginas = altura;
        this.LarguraPaginas = largura;
        this.layout = new Array();
        this.paginas = new Array();
        this.recursos = new Array();
        this.Obs = obs;
        this.cod = 2147483647;
        this.superCod = 2147483647;
        
        this.cast = function()
        {
                var i = 0;
                
                for(i = 0; i < this.layout.length; i++)
                {
                        this.layout[i] = $.extend(new Layout(), this.layout[i]);
                }
                
                for(i = 0; i < this.paginas.length; i++)
                {
                        this.paginas[i] = $.extend(new Paginas(), this.paginas[i]);
                }
                
                for(i = 0; i < this.recursos.length; i++)
                {
                        this.recursos[i] = $.extend(new Recursos(), this.recursos[i]);
                }
        };
        
}

