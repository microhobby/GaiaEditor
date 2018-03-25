package br.com.mpro3.MproEntity.utils;

import com.google.gson.JsonElement;
import java.util.ArrayList;

/**
 *
 * @author matheus
 */
public interface SQLBuilder
{
    public ArrayList<String> createTable();
    public void setJSONObject(JsonElement obj);
    public String insert();
    public String createRefTable();
    public String insertRef();
    public String update();
    public ArrayList<String> delete();
    public String selectAll();
    public String selectWhere();
}
