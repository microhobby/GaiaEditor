package mpro.MproEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;
import com.mongodb.MongoClient;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.net.UnknownHostException;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Transient;

/**
 *
 * @author Matheus
 */
@Entity
public abstract class MproEntity
{

    @Id
    public ObjectId cod;
    @Transient
    private final Class _class;
    @Transient
    private static Datastore _ds;
    
    public static Datastore dataStoreSingleton()
    {
        if(_ds == null)
        {
            try
            {
                _ds = new Morphia().createDatastore(new MongoClient("localhost"), "local");
            } 
            catch (UnknownHostException ex)
            {
                Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return _ds;
    }
    
    public static <T> List<T> getAll(Class<T> classe)
    {
        dataStoreSingleton();
        return _ds.find(classe).asList();
    }
    
    public static <T> T getWhere(T filterObj)
    {
        dataStoreSingleton();
        return _ds.get(filterObj);
    }
    
    /**
        * Transforma um JSON para MproEntity
        * @param <T>
        * @param json
        * @param classe
        * @return 
        */
    public static <T> T fromJson(String json, Class<T> classe)
    {
        //Gson gson = new Gson();
        Gson gson = new GsonBuilder().registerTypeAdapter(ObjectId.class, new ObjectIdTypeAdapter()).create();
        T c;
        c = gson.fromJson(json, classe);

        return c;
    }

    public static <T> T fromJson(String json, Type type)
    {
        Gson gson = new GsonBuilder().registerTypeAdapter(ObjectId.class, new ObjectIdTypeAdapter()).create();
        T c;
        c = gson.fromJson(json, type);

        return c;
    }
  
    public MproEntity()
    {
        dataStoreSingleton();
        this._class = this.getClass();
    }

    public void Save()
    {
        for (Field field : this._class.getFields())
        {
            try
            {
                if ((field.getType() == ArrayList.class) || (field.getType() == List.class))
                {
                    ArrayList<MproEntity> arr = (ArrayList<MproEntity>) field.get(this);
                    for (MproEntity arr1 : arr)
                    {
                        arr1.Save();
                    }
                }
            }
            catch (IllegalArgumentException ex)
            {
                Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
            }
            catch (IllegalAccessException ex)
            {
                Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        _ds.save(this);
    }
    
    public void Delete()
    {
        _ds.delete(this);
    }
    
    public ObjectId getId()
    {
        return cod;
    }
    
    public void setId(ObjectId newId)
    {
        cod = newId;
    }
    
    public String toJson()
    {
        String json = "{";

        for (Field field : this._class.getFields())
        {
            json += "\"" + field.getName() + "\":";
            try
            {
                if (field.getType().equals(boolean.class) || field.getType().equals(int.class) || field.getType().equals(long.class) || field.getType().equals(double.class))
                {
                    json += "" + field.get(this).toString() + ",";
                } 
                else if ((field.getType() == ArrayList.class) || (field.getType() == List.class))
                {
                    json += "[";
                    ArrayList<MproEntity> arr = (ArrayList<MproEntity>) field.get(this);
                    for (MproEntity arr1 : arr)
                    {
                        json += arr1.toJson() + ",";
                    }
                    json = json.replaceFirst(",$", "");
                    json += "],";
                } 
                else
                {
                    if (field.get(this) != null)
                    {
                        json += "\"" + field.get(this).toString().replaceAll("\n", "\\\\n").replaceAll("\"", "\\\\\\\"").replaceAll("\\'", "'") + "\",";
                    } 
                    else
                    {
                        json += "null,";
                    }
                }
            }
            catch (IllegalArgumentException ex)
            {
                Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
            }
            catch (IllegalAccessException ex)
            {
                Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        json = json.replaceFirst(",$", "");
        return (json + "}");
    }
    
    private static class ObjectIdTypeAdapter extends TypeAdapter<ObjectId> 
    {
        @Override
        public void write(final JsonWriter out, final ObjectId value) throws IOException 
        {
            if(value != null)
            {
                out.beginObject()
                   .name("cod")
                   .value(value.toString())
                   .endObject();
            }
            else
            {
                out.nullValue();
            }
        }

        @Override
        public ObjectId read(final JsonReader in) throws IOException 
        {
            if(in.peek() != JsonToken.NULL)
            {
                //in.beginObject();
                assert "cod".equals(in.nextName());
                String objectId = in.nextString();
                //in.endObject();
                return new ObjectId(objectId);
            }
            else
            {
                in.nextNull();
                return null;
            }
        }
    }
}
