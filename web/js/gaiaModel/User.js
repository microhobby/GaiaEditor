/* 
 * Classe USER
 */

function User(username, key, nome, email, datanascimento)
{
        this.Nome = nome;
        this.UserName = username;
        this.Key = key;
        this.Email = email;
        this.DataNascimento = datanascimento;
        this.Loged = false;
        this.Projetos = new Array();
        this.cod = 2147483647;
        
        this.cast = function()
        {
                for(var i = 0; i < this.Projetos.length; i++)
                {
                        this.Projetos[i] = $.extend(new Projeto(), this.Projetos[i]);
                        this.Projetos[i].cast();
                }
        };
        
        /**
        * Pega a idade do individuo
        */
          this.getIdade= function()
          {
                    var parts = this.DataNascimento.split("/");
                    var today = new Date();
                    var calendar = new Date(parseInt(parts[2]), parseInt(parts[1]), parseInt(parts[0]));
                    var lg1 = today.getTime() - calendar.getTime();
                    var result = lg1 / (1000 * 60 * 60 * 24 *  365);
                    return Math.round(result);
          };
}


