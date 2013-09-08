package Gaia.model;

import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Recursos extends MproEntityRelation
{
        public String Nome;
        public int Tipo;
        public String Arquivo;
        
        public Recursos() {}
        
        public Recursos(String nome, int tipo, String arquivo)
        {
                this.Nome = nome;
                this.Tipo = tipo;
                this.Arquivo = arquivo;
        }
}
