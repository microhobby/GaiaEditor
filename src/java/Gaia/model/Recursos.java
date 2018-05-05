package Gaia.model;

import mpro.MproEntity.MproEntityRelation;
import org.bson.types.ObjectId;

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
        
        public void resetAllIds()
        {
            /* Recursos are used in recursoInt and have to be a same cod
               than the copied project */
            //this.cod = new ObjectId();
        }
}
