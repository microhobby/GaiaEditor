package mpro.MproEntity;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 *
 * @author Matheus
 */
public abstract class MproEntity
{
          private static String ProjectName = "";
          private static String BasePath = "";
          private static LauDB _conn = null;
          private Class _class;
          public int cod;
          private boolean joined = false;
          private String nameRelation = "";
          private ArrayList<String> namesRelation = new ArrayList();
          
          public static void setProjectName(String project)
          {
                ProjectName = project;
          }
          
          public static void setBasePath(String path)
          {
                BasePath = path;
          }
          
          /**
           * Retorna a tabela inteira sem exeção 
           */
          public static <T> ArrayList<T> getAll(Class<T> classe)
          {
                    if(_conn == null)
                            _conn = new LauDB(BasePath + "/MproEntity"  + ProjectName +  ".lau");
              
                    ArrayList<T> list = new ArrayList();
                    ArrayList<Field> contains = new ArrayList();
                    try 
                    {
                              T c = classe.newInstance();
                              String[][] res;
                              T tmp;
                              //Class arrT = null;
                              //Field join = null;
                              ArrayList<Class> arrT = new ArrayList();
                              ArrayList<Field> join = new ArrayList();
                              
                              
                              for(int j = 0; j < c.getClass().getFields().length; j++)
                              {
                                        if(c.getClass().getFields()[j].getType().equals(ArrayList.class))
                                        {
                                                  //join = c.getClass().getFields()[j];
                                                  join.add(c.getClass().getFields()[j]);
                                                  //arrT = (Class)((ParameterizedType) c.getClass().getFields()[j].getGenericType()).getActualTypeArguments()[0];
                                                  arrT.add((Class)((ParameterizedType) c.getClass().getFields()[j].getGenericType()).getActualTypeArguments()[0]);
                                        }
                                        else
                                                  contains.add(c.getClass().getFields()[j]);
                              }
                              
                              res = _conn.query("SELECT * FROM " + c.getClass().getName().replace('.', '_') + ";");
                              for(int i = 0; i < res.length; i++)
                              {
                                        tmp = classe.newInstance();
                                        
                                        for(int j = 0; j < contains.size(); j++)
                                        {
                                                  Field f = contains.get(j);
                                                  if(f.getType().equals(int.class))
                                                            f.set(tmp, Integer.parseInt(res[i][j])); 
                                                   else if(f.getType().equals(boolean.class))
                                                             f.set(tmp, (res[i][j].equals("1") ? true : false));
                                                   else if(f.getType().equals(double.class))
                                                            f.set(tmp, Double.parseDouble(res[i][j]));  
                                                   else if(f.getType().equals(long.class))
                                                            f.set(tmp, Long.parseLong(res[i][j])); 
                                                   else
                                                   {
                                                            Class<?> theClass = f.getType();
                                                            f.set(tmp, theClass.cast(res[i][j]));
                                                   }
                                        }
                                        
                                        //if(join != null)
                                        if(join.size() > 0)
                                        {
                                                  for(int k = 0; k < join.size(); k++)
                                                  {
                                                        MproEntityRelation t = (MproEntityRelation) arrT.get(k).newInstance();
                                                        t.superCod = ((MproEntity)tmp).cod;
                                                        ArrayList<?> mpR = MproEntity.getWhere(arrT.get(k).cast(t));
                                                        join.get(k).set(tmp, mpR);
                                                  }
                                        }
                                        
                                        list.add(tmp);
                              }
                    }
                    catch (InstantiationException ex) 
                    {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } 
                    catch (IllegalAccessException ex) 
                    {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SecurityException ex) {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return list;
          }
          
          public static <T> ArrayList<T> getWhere(T filterObj)
          {
                    if(_conn == null)
                            _conn = new LauDB(BasePath + "/MproEntity"  + ProjectName +  ".lau");
              
                    return getWhere(filterObj, false);
          }
          
          /**
           * Pega os campos não nulos filtrados
           */
          public static <T> ArrayList<T> getWhere(T filterObj, boolean enaB)
          {
                    ArrayList<T> list = new ArrayList();
                    ArrayList<String> fildsnames = new ArrayList();
                    Class c = filterObj.getClass();
                    String where = "";
                    String filds = "";
                    String sql = "SELECT ";
                    //Field cf = null;
                    ArrayList<Field> cf = new ArrayList();
                    
                    try {
                              // constroi o where
                              for(int j = 0; j < c.getFields().length; j++)
                              {
                                        /*if(!"cod".equals(c.getFields()[j].getName()))
                                        {*/
                                                  
                                                  if (c.getFields()[j].getType().equals(ArrayList.class)) 
                                                  {
                                                            //cf = c.getFields()[j];
                                                            cf.add(c.getFields()[j]);
                                                            continue;
                                                  }
                                                  else
                                                            fildsnames.add(c.getFields()[j].getName());
                                                  
                                                  if((c.getFields()[j].getType() == int.class) && !(c.getFields()[j].get(filterObj).equals(Integer.MAX_VALUE)))
                                                  {
                                                            where += c.getFields()[j].getName() + " = " + c.getFields()[j].get(filterObj).toString() + ", ";
                                                            filds += c.getFields()[j].getName() + ", ";
                                                  }
                                                  else if((c.getFields()[j].getType() == long.class) && !(c.getFields()[j].get(filterObj).equals(Long.MAX_VALUE)))
                                                  {
                                                            where += c.getFields()[j].getName() + " = " + c.getFields()[j].get(filterObj).toString() + ", ";
                                                            filds += c.getFields()[j].getName() + ", ";
                                                  }
                                                  else if((c.getFields()[j].getType() == double.class) && !(c.getFields()[j].get(filterObj).equals(Double.MAX_VALUE )))
                                                  {
                                                            where += c.getFields()[j].getName() + " = " + c.getFields()[j].get(filterObj).toString() + ", ";
                                                            filds += c.getFields()[j].getName() + ", ";
                                                  }
                                                  else if((c.getFields()[j].getType() == boolean.class) && enaB)
                                                  {
                                                            where += c.getFields()[j].getName() + " = " + (c.getFields()[j].get(filterObj).toString().equals("true") ? "1" : "0") + ", ";
                                                            filds += c.getFields()[j].getName() + ", ";
                                                  }
                                                  else if((c.getFields()[j].getType() != long.class) && (c.getFields()[j].getType() != double.class) 
                                                                      && (c.getFields()[j].getType() != int.class) && (c.getFields()[j].getType() != boolean.class)  
                                                                      && (c.getFields()[j].get(filterObj) != null))
                                                  {
                                                            where += c.getFields()[j].getName() + " = '" + c.getFields()[j].get(filterObj).toString() + "', ";
                                                            filds += c.getFields()[j].getName() + ", ";
                                                  }
                                        //}
                              }
                              where = where.replaceAll(", ", " AND ");
                              where = where.replaceFirst("AND $", " ");
                              filds = filds.replaceFirst(", $", " ");
                              //sql += filds + " FROM " + c.getName().replace('.', '_') + " WHERE " + where + ";";
                              sql += "* FROM " + c.getName().replace('.', '_') + " WHERE " + where + ";";
                              String[][] res = _conn.query(sql);
                              for(int i = 0; i < res.length; i++)
                              {
                                        T tmp = (T) c.newInstance();
                                        //for(int j = 0; j < c.getFields().length; j++)
                                        for(int j = 0; j < fildsnames.size(); j++)
                                        {
                                                  if(res[i][j] != null)
                                                  {
                                                            if(tmp.getClass().getField(fildsnames.get(j)).getType().equals(int.class))
                                                                     tmp.getClass().getField(fildsnames.get(j)).set(tmp, Integer.parseInt(res[i][j])); 
                                                            else if(tmp.getClass().getField(fildsnames.get(j)).getType().equals(double.class))
                                                                     tmp.getClass().getField(fildsnames.get(j)).set(tmp, Double.parseDouble(res[i][j]));  
                                                            else if(tmp.getClass().getField(fildsnames.get(j)).getType().equals(long.class))
                                                                     tmp.getClass().getField(fildsnames.get(j)).set(tmp, Long.parseLong(res[i][j])); 
                                                            else if(tmp.getClass().getField(fildsnames.get(j)).getType().equals(boolean.class))
                                                                      tmp.getClass().getField(fildsnames.get(j)).set(tmp, (res[i][j].equals("1") ? true : false));
                                                            else
                                                            {
                                                                     Class<?> theClass = tmp.getClass().getField(fildsnames.get(j)).getType();
                                                                     tmp.getClass().getField(fildsnames.get(j)).set(tmp, theClass.cast(res[i][j]));
                                                            }
                                                  }
                                        }
                                        
                                        //if(cf != null)
                                        if(cf.size() > 0)
                                        {
                                                    for(int k = 0; k < cf.size(); k++)
                                                    {
                                                            Class typin = (Class)((ParameterizedType) cf.get(k).getGenericType()).getActualTypeArguments()[0];
                                                            MproEntityRelation t = (MproEntityRelation) typin.newInstance();
                                                            t.superCod = ((MproEntity)tmp).cod;
                                                            ArrayList<?> mpR = MproEntity.getWhere(typin.cast(t));
                                                            cf.get(k).set(tmp, mpR);
                                                    }
                                        }
                                        
                                        list.add(tmp);
                              }
                    } catch (IllegalArgumentException ex) {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (InstantiationException ex) {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (NoSuchFieldException ex) {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SecurityException ex) {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return list;
          }
          
          public MproEntity()
          {
                   if(_conn == null)
                            _conn = new LauDB(BasePath + "/MproEntity"  + ProjectName +  ".lau");
              
                    this.cod = 0;
                    this._class = this.getClass();
                    this.toNull();
                    this.initialConfig();
          }
          
          /**
           * Insere os dados atuais no banco;
           */
          public void Save()
          {
                    if(this.cod == Integer.MAX_VALUE)
                    {
                              _conn.execute("INSERT INTO " + this._class.getName().replace('.', '_') + " VALUES( " + this.getValues() + ");");
                              this.cod = _conn.get_last_insert_rowid();
                              if(this.joined) // salva nossos amigos
                              {
                                        try 
                                        {
                                                    for(int j = 0; j < this.namesRelation.size(); j++)
                                                    {
                                                            //ArrayList<MproEntityRelation> arr = (ArrayList<MproEntityRelation>) this._class.getField(this.nameRelation).get(this);
                                                            ArrayList<MproEntityRelation> arr = (ArrayList<MproEntityRelation>) this._class.getField(this.namesRelation.get(j)).get(this);
                                                            if(arr != null)
                                                            {
                                                                    for(int i = 0; i < arr.size(); i++)
                                                                    {
                                                                              arr.get(i).superCod = this.cod;
                                                                              arr.get(i).Save();
                                                                    }
                                                            }
                                                    }
                                        } 
                                        catch (NoSuchFieldException ex) 
                                        {
                                                  Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                                        } 
                                        catch (SecurityException ex) 
                                        {
                                                  Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
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
                    }
                    else
                    {
                              _conn.execute("UPDATE " + this._class.getName().replace('.', '_') + " SET " + this.getValuesUpdate() + " WHERE cod = " + this.cod);
                              if(this.joined) // salva nossos amigos
                              {
                                        try 
                                        {
                                                  for(int j = 0; j < this.namesRelation.size(); j++)
                                                    {
                                                            //ArrayList<MproEntityRelation> arr = (ArrayList<MproEntityRelation>) this._class.getField(this.nameRelation).get(this);
                                                            ArrayList<MproEntityRelation> arr = (ArrayList<MproEntityRelation>) this._class.getField(this.namesRelation.get(j)).get(this);
                                                            if(arr != null)
                                                            {
                                                                    for(int i = 0; i < arr.size(); i++)
                                                                    {
                                                                              arr.get(i).superCod = this.cod;
                                                                              arr.get(i).Save();
                                                                    }
                                                            }
                                                    }
                                                  this.joined = true;
                                        } 
                                        catch (NoSuchFieldException ex) 
                                        {
                                                  Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                                        } 
                                        catch (SecurityException ex) 
                                        {
                                                  Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
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
                    }
          }
          
          /**
           * Apaga o registro
           */
          public void Delete()
          {
                    if(this.cod != 0)
                    {
                              _conn.execute("DELETE FROM " + this._class.getName().replace('.', '_') + " WHERE cod = " + this.cod);
                              this.cod = 0;
                    }
          }
          
          private void toNull()
          {
                    try 
                    { 
                              for(int i = 0; i < this._class.getFields().length; i++)
                              {
                                        if(this._class.getFields()[i].getType().equals(int.class))
                                                  this._class.getFields()[i].set(this, Integer.MAX_VALUE);
                                         else if(this._class.getFields()[i].getType().equals(double.class))
                                                  this._class.getFields()[i].set(this, Double.MAX_VALUE);  
                                         else if(this._class.getFields()[i].getType().equals(long.class))
                                                  this._class.getFields()[i].set(this, Long.MAX_VALUE); 
                                         else if(!this._class.getFields()[i].getType().equals(boolean.class))
                                                  this._class.getFields()[i].set(this, null);
                              }
                    }
                    catch (IllegalArgumentException ex) 
                    {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                              Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                    } 
          }
          
          /**
           * Na construcao vamos ver se a tabela ja existe
           */
          private void initialConfig()
          {
                    //CREATE TABLE IF NOT EXISTS __teste__ (cod INTEGER PRIMARY KEY, nome TEXT, jujubas TEXT);
                    //pragma table_info(__teste__);
                    //pragma table_info(__testa);
                    boolean isEqual = false;
                    String[][] tableInfo = _conn.query("PRAGMA table_info(" + this._class.getName().replace('.', '_') + ")");
                    ArrayList<String> fieldNot = new ArrayList();
                    ArrayList<containField> changesTable = new ArrayList();
                    
                    if((tableInfo == null) || (tableInfo.length == 0))
                    {
                              // cria do zero
                              _conn.execute("CREATE TABLE " + this._class.getName().replace('.', '_') + "(" + this.getTableFields() + ");");
                              return;
                    }    
                    else
                    {
                                this.namesRelation.clear();
                              // verifica os campos
                              for(int j = 0; j < this._class.getFields().length; j++)
                              {
                                        for(int i = 0; i < tableInfo.length; i++)
                                        {
                                                 if(this._class.getFields()[j].getType() != ArrayList.class)
                                                 {
                                                            isEqual = tableInfo[i][1].equals(this._class.getFields()[j].getName()) ? true : false;
                                                            if(isEqual)
                                                                       break;
                                                 }
                                                 else
                                                 {
                                                           this.joined = true;
                                                           this.nameRelation = this._class.getFields()[j].getName();
                                                           this.namesRelation.add(this._class.getFields()[j].getName());
                                                 }
                                        } 
                                        // se tem campo q nao tem temos q alterar
                                        if(!isEqual)
                                        {
                                                  fieldNot.add(this._class.getFields()[j].getName());
                                        }
                              }
                              
                              // se tem algum no fieldNot
                              if(fieldNot.size() > 0)
                              {
                                        fieldNot = this.getTableFieldsFromArrayList(fieldNot);
                                        for(String s : fieldNot)
                                        {
                                                  _conn.execute(s);
                                        }
                              }
                              
                              // vamos testar se temos que trocar algo
                              isEqual = false;
                              for(int w = 0; w < tableInfo.length; w++)
                              {
                                        containField cf = new containField(tableInfo[w][1], tableInfo[w][2], false);
                                        for(int q = 0; q < this._class.getFields().length; q++)
                                        {
                                                  cf.isDB = this._class.getFields()[q].getName().equals(cf.name) ? true : false;
                                                  if(cf.isDB)
                                                            break;
                                        }
                                        if(cf.isDB)
                                                  changesTable.add(cf);
                                        else
                                                  isEqual = true;
                              }
                              
                              // agora podemos fazer as querys
                              if(isEqual)
                                        this.changeTable(changesTable);
                    }
          }
          
          /**
           * Pega uma string já parametrizada
           */
          private String getTableFields()
          {
                    String parts = "";
                    this.namesRelation.clear();
                    for(int i = 0; i < this._class.getFields().length; i++)
                    {
                              if(this._class.getFields()[i].getType() != ArrayList.class)
                              {
                                        if(!"cod".equals(this._class.getFields()[i].getName()))
                                                  parts += this._class.getFields()[i].getName() + " " + (this._class.getFields()[i].getType() == String.class ? "TEXT, " : "NUMERIC, ");
                                        else
                                                  parts += this._class.getFields()[i].getName() + " INTEGER PRIMARY KEY";
                              }
                              else
                              {
                                        this.joined = true;
                                        this.nameRelation = this._class.getFields()[i].getName();
                                        this.namesRelation.add(this._class.getFields()[i].getName());
                              }
                    }
                    return parts;
          }
          
          /**
           * 
           */
          private void changeTable(ArrayList<containField> arrcf)
          {
                    if(arrcf.size() > 0)
                    {
                              String parts = "CREATE TABLE tmp(" + this.getTableFields() + ");";
                              String parts1 = "INSERT INTO tmp SELECT ";
                              for(int i = 0; i < arrcf.size(); i++)
                              {
                                        if(i < arrcf.size() -1)
                                                  parts1 += arrcf.get(i).name + ", ";
                                        else
                                                  parts1 += arrcf.get(i).name + " ";
                              }
                              parts1 += "FROM " + this._class.getName().replace('.', '_') + ";";
                              // começa
                              _conn.execute(parts);
                              _conn.execute(parts1 );
                              _conn.execute("DROP TABLE " + this._class.getName().replace('.', '_') + ";");
                              _conn.execute("ALTER TABLE tmp RENAME TO " + this._class.getName().replace('.', '_') + ";");
                    }
          }
          
          /**
           * Pega os parametrizados para alteração
           */
          private ArrayList<String> getTableFieldsFromArrayList(ArrayList<String> arrl)
          {
                    String parts;
                    ArrayList<String> parts_ = new ArrayList();
                    parts_.add("CREATE TABLE tmp(" + this.getTableFields() + ");");
                    parts = "";
                    for(int i = 0; i < arrl.size(); i++)
                    {
                              for(int j = 0; j < this._class.getFields().length; j++)
                              {
                                        if(!arrl.get(i).equals(this._class.getFields()[j].getName()))
                                        {
                                                  parts += this._class.getFields()[j].getName() + ", ";
                                        }
                              }
                    }
                    parts = parts.replaceFirst(", $", " ");
                    parts_.add("INSERT INTO tmp(" + parts + ") SELECT " + parts + "FROM " + this._class.getName().replace('.', '_') + ";");
                    parts_.add("DROP TABLE " + this._class.getName().replace('.', '_') + ";");
                    parts_.add("ALTER TABLE tmp RENAME TO " + this._class.getName().replace('.', '_') + ";");
                    return parts_;
          }
          
          /**
           * Pega valores para insert  
           */
          private String getValues()
          {
                    String parts = "";
                    this.namesRelation.clear();
                    for(int i = 0; i < this._class.getFields().length; i++)
                    {
                              try {
                                        
                                        if(this._class.getFields()[i].getType() != ArrayList.class)
                                        {
                                                  if(this._class.getFields()[i].getType() == boolean.class)
                                                            parts += ((Boolean)this._class.getFields()[i].get(this)) ? "1, " : "0, ";
                                                  else if(!"cod".equals(this._class.getFields()[i].getName()))
                                                            parts += (this._class.getFields()[i].getType() == String.class ? "'" : "") + this._class.getFields()[i].get(this).toString()
                                                                      + (this._class.getFields()[i].getType() == String.class ? "', " : ", ");
                                                  else
                                                            parts += "NULL";
                                        }
                                        else
                                        {
                                                  this.joined = true;
                                                  this.nameRelation = this._class.getFields()[i].getName();
                                                  this.namesRelation.add(this._class.getFields()[i].getName());
                                        }
                              } catch (IllegalArgumentException ex) {
                                        Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                              } catch (IllegalAccessException ex) {
                                        Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                              }
                    }
                    return parts;
          }
          
          /**
           * Pega valores com seus campos para update
           */
          private String getValuesUpdate()
          {
                    String parts = "";
                    for(int i = 0; i < this._class.getFields().length; i++)
                    {
                              try {
                                        if(this._class.getFields()[i].getType() == boolean.class)
                                                            parts += this._class.getFields()[i].getName() + " = " + ((Boolean)this._class.getFields()[i].get(this) == true ? "1, " : "0, ");
                                        if(i < this._class.getFields().length -1)
                                                  parts += this._class.getFields()[i].getName() + " = " + (this._class.getFields()[i].getType() == String.class ? "'" : "") + this._class.getFields()[i].get(this).toString()
                                                            + (this._class.getFields()[i].getType() == String.class ? "', " : ", ");
                                        else
                                                  parts += this._class.getFields()[i].getName() + " = " + (this._class.getFields()[i].getType() == String.class ? "'" : "") + this._class.getFields()[i].get(this).toString()
                                                            + (this._class.getFields()[i].getType() == String.class ? "'" : "");
                              } catch (IllegalArgumentException ex) {
                                        Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                              } catch (IllegalAccessException ex) {
                                        Logger.getLogger(MproEntity.class.getName()).log(Level.SEVERE, null, ex);
                              }
                    }
                    return parts;
          }
          
          private class containField
          {
                    public boolean isDB;
                    public String name;
                    public String type;
                    public Field field;

                    public containField(String _name, String _type, boolean _isdb)
                    {
                              this.isDB = _isdb;
                              this.name = _name;
                              this.type = _type;
                    }
                    
                    public containField(Field _field)
                    {
                              this.field = _field;
                    }
          }
}