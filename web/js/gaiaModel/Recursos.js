/* 
 * Classe RECURSOS
 */

function Recursos(nome, tipo, arquivo)
{
        if(nome.Nome == undefined)
        {
                this.Nome = nome;
                this.Tipo = tipo;
                this.Arquivo = arquivo;
                this.cod = 2147483647;
                this.superCod = 2147483647;
        }
        else
        {
                this.Nome = nome.Nome;
                this.Tipo = nome.Tipo;
                this.Arquivo = nome.Arquivo;
                this.cod = nome.cod;
                this.superCod = nome.superCod;
        }
}

