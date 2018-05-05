
package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntity;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Reference;

/**
 *
 * @author matheus
 */
public class LayoutPaginaTopo extends MproEntity
{
        public String ScriptGeral;
        public double Altura;
        public double Largura;
        @Reference
        public List<LayoutObjetosTopo> Elementos = new ArrayList();
    
        public LayoutPaginaTopo(){}
        
        public LayoutPaginaTopo(String script, double h, double w)
        {
                this.ScriptGeral = script;
                this.Altura = h;
                this.Largura = w;
        }
        
        public void resetAllIds()
        {
            this.cod = new ObjectId();
            
            for (LayoutObjetosTopo elemento : this.Elementos)
            {
                elemento.resetAllIds();
            }
        }
}

