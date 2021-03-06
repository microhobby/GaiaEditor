package Gaia.model;

import mpro.MproEntity.MproEntity;
import org.bson.types.ObjectId;

/**
 *
 * @author matheus
 */
public class Eventos extends MproEntity
{

    public int idEvento;
    public int idAction;
    public String TargetJqueryId;
    public String Script;
    public boolean Deleted;
    public String NumApoio;

    public Eventos()
    {
    }

    public Eventos(int id, String target, int action)
    {
        this.idEvento = id;
        this.idAction = action;
        this.TargetJqueryId = target;
        this.Script = "";
        this.Deleted = false;
    }
    
    public void resetAllIds()
    {
        this.cod = new ObjectId();
    }

    public void deleteDeleteds()
    {
        if (this.Deleted)
        {
            this.Delete();
        }
    }
}
