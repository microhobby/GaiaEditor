/* 
 * Classe PROJETO
 */

function Projeto(nome, altura, largura, obs)
{
        if(nome.Nome == undefined)
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
        }
        else
        {
                this.Nome = nome.Nome;
                this.AlturaPaginas = nome.AlturaPaginas;
                this.LarguraPaginas = nome.LarguraPaginas;
                this.layout = nome.layout;
                this.paginas = nome.paginas;
                this.recursos = nome.recursos;
                this.Obs = nome.Obs;
                this.cod = nome.cod;
                this.superCod = nome.superCod;
        }
}

