
package Gaia.model;

import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Eventos extends MproEntityRelation
{
        public int idEvento;
        
        public Eventos(){}
        
        public Eventos(int id)
        {
                this.idEvento = id;
        }
}
