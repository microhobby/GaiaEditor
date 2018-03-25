/* 
 * Classe PROJETO
 */

function Projeto(nome, altura, largura, obs)
{
    var projEntities = null;
    this.Nome = nome;
    this.AlturaPaginas = altura;
    this.LarguraPaginas = largura;
    this.layout = new Array();
    this.paginas = new Array();
    this.recursos = new Array();
    this.Obs = obs;
    this.JsonEntities = "";
    this.cod = null;
    //this.superCod = 2147483647;

    this.ParseJsonEntities = function ()
    {
        projEntities = JSON.parse(this.JsonEntities);
    };

    this.EntitiesToJson = function ()
    {
        this.JsonEntities = JSON.stringify(projEntities);
    };

    this.getEntities = function ()
    {
        return projEntities;
    };

    this.cast = function ()
    {
        var i = 0;

        for (i = 0; i < this.layout.length; i++)
        {
            this.layout[i] = $.extend(new Layout(), this.layout[i]);
        }

        for (i = 0; i < this.paginas.length; i++)
        {
            this.paginas[i] = $.extend(new Paginas(), this.paginas[i]);
            this.paginas[i].cast();
        }

        for (i = 0; i < this.recursos.length; i++)
        {
            this.recursos[i] = $.extend(new Recursos(), this.recursos[i]);
        }
    };

}

