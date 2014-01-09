
package Gaia.model;

import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Eventos extends MproEntityRelation
{
        public int idEvento;
        public int idAction;
        public String TargetJqueryId;
        public String Script;
        public boolean Deleted;
        
        public Eventos(){}
        
        public Eventos(int id, String target, int action)
        {
                this.idEvento = id;
                this.idAction = action;
                this.TargetJqueryId = target;
                this.Script = "";
                this.Deleted = false;
        }
        
        public void deleteDeleteds()
          {
                  if(this.Deleted)
                          this.Delete();
          }
}
