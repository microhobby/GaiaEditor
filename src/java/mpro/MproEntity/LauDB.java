/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mpro.MproEntity;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author matheus
 */
public class LauDB
{   
    private Connection connection;
    private Statement statement;
    private ResultSet sql;
    public boolean Err;
    public String Message;
    private String[][] elems;
    private String[] elem;
    private int numRows;
    private int numCollsI;
    
    /**
        * Código construtor </br>
        * file: Caminho do arquivo de banco de dados a ser
        * aberto
        */
    public LauDB(String file)
    {
        try 
        {
            Class.forName("org.sqlite.JDBC");
            //Class.forName("com.mysql.jdbc.Driver");
        }
        catch (ClassNotFoundException ex)
        {
            System.err.println(ex.getMessage());
        }
        
        connection = null;
        
        // cria a conexão com o banco
        try
        {
            connection = DriverManager.getConnection("jdbc:sqlite:" + file);
            //connection = DriverManager.getConnection("jdbc:mysql://mysql5.hostingzone.com.br:3307/", "mpro3", "");
            statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timer out para 30 segundos
            statement.execute("PRAGMA synchronous=OFF");
            this.Err = true;
        }
        catch(SQLException e)
        {
            System.err.println(e.getMessage());
            this.Message = "Mpro L.A.U DB ERROR: " + e.getMessage();
            this.Err = false;
        }
    }
    
    /**
        * Executa comando sql </br>
        * cmd: String sql </br>
        * String Matriz: Objeto com os dados retornados pela sql
        */
    public String[][] query(String cmd)
    {
        try
        {
            sql = statement.executeQuery(cmd);
            this.elems = this.fetchAll(sql);
            this.Err = true;
            
            if(this.numRows > 0)
                return this.elems;
            
            return new String[0][0];
        }
        catch (SQLException ex)
        {
            System.err.println(ex.getMessage() + "\n| " + cmd);
            this.Message = "Mpro L.A.U DB ERROR: " + ex.getMessage();
            this.Err = false;
        }
        return null;
    }
    
    /**
        * Funcao que implementa fetch All PDO
        */
    private String[][] fetchAll(ResultSet res) throws SQLException
    {
                ResultSetMetaData rsmd = res.getMetaData();
                this.numCollsI = rsmd.getColumnCount();
                String[][] elemTmp = new String[1][this.numCollsI];
                
                int count = 0;
                while(res.next())
                {
                        elemTmp = Arrays.copyOf(elemTmp, count+1);
                        elemTmp[count] = new String[this.numCollsI];
                        for(int i = 0; i < rsmd.getColumnCount(); i++)
                        {
                                elemTmp[count][i] = res.getString(i+1);
                        }
                        count++;
                }
                this.numRows = count;
                return elemTmp;
    }
    
        /**
        * Executa comando sql sem retornar todos os dados
        */
        public boolean unQuery(String cmd)
        {
                boolean result = false;
                try 
                {
                        sql = statement.executeQuery(cmd);
                        ResultSetMetaData rsmd = sql.getMetaData();
                        this.numCollsI = rsmd.getColumnCount();
                        return true;
                 } 
                catch (SQLException ex)
                {
                        System.err.println(ex.getMessage() + "\n| " + cmd); 
                        this.Message = "Mpro L.A.U DB ERROR: " + ex.getMessage();
                        this.Err = false;
                }
                return result;
        }
    
       /**
        * Função que aponta pra linha que quero
        */
       private String Row(int row, int table)
       {
               String tmp = "";
               try
               {
                       tmp = this.elems[row][table];
               }
               catch(Exception e)
               { /* erro de limite */ }
               return tmp;
       }
        
       /**
        * Implementa o fetch do objetos de dados </br>
        * É aconselhável que só se use esse método quando for implementa-lo em loop while
        */
       public String[] prox()
       {
               this.elem = new String[this.numCollsI];
                try 
                {
                        this.sql.next();
                        for(int i = 0; i < this.numCollsI; i++)
                        {
                                this.elem[i] = sql.getString(i);
                        }
                        return this.elem;
                }
                catch (SQLException ex) 
                {
                         System.err.println(ex.getMessage()); 
                        this.Message = "Mpro L.A.U DB ERROR: " + ex.getMessage();
                        this.Err = false;
                }
                return null;
       }
       
       /**
        * Retorna o objeto resgatado pelo prox() </br>
        * É aconselhável que só se use esse método quando for implementa-lo em loop while
        */
       public String[] getElem()
       {
               return this.elem;
       }
       
    /**
        * Executa comando sql </br>
        * cmd: String sql </br>
        * return: Verdadeiro caso haja sucesso no comando e falso caso não
        */
    public boolean execute(String cmd)
    {
        boolean result = false;
        try
        {
            result = statement.execute(cmd);
        }
        catch (SQLException ex)
        {
                System.err.println(ex.getMessage() + "\n| " + cmd); 
                this.Message = "Mpro L.A.U DB ERROR: " + ex.getMessage();
                this.Err = false;
        }
        return result;
    }
    
    /**
        * Retorna quantos elementos foram aplicados </br>
        */
    public int count()
    {
            return this.numRows;
    }
    
    public int get_last_insert_rowid()
    {
              this.unQuery("SELECT last_insert_rowid();");
              try {
                        return this.sql.getInt(1);
              } catch (SQLException ex) {
                        Logger.getLogger(LauDB.class.getName()).log(Level.SEVERE, null, ex);
              }
              return 0;
    }
    
    /**
     * Fecha banco de Dados
     */
    public void close()
    {
        try
        {
            this.connection.close();
        }
        catch (SQLException ex)
        {
           System.err.println(ex.getMessage()); 
        }
    }
}
