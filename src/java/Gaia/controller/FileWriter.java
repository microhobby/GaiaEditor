
package Gaia.controller;

import org.apache.commons.io.FileUtils;
import Gaia.model.Projeto;
import Gaia.model.Recursos;
import Gaia.model.User;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author matheus
 */
public class FileWriter 
{
        public static void WriteFile(String content, String path) 
        {
                try 
                {
                        File file = new File(path);
                        if (!file.exists()) 
                        {
                                file.createNewFile();
                        }
                        java.io.FileWriter fw = new java.io.FileWriter(file);
                        BufferedWriter bw = new BufferedWriter(fw);
                        bw.write(content);
                        bw.close();
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(Utils.class.getName()).log(Level.SEVERE, null, ex);
                }
        }
        
        public static void FileWriter(Projeto proj, User usu, ProjectSources proSrc, String folder, String realFolder)
        {
                String preFolder  =  folder + "sandbox/" + proj.cod + "/";
                String recursosFolder = preFolder + "/" + usu.UserName + "_" + usu.cod + "/";
                // cria sandbox
                File sandBox = new File(preFolder);
                sandBox.mkdir();
                
                File tmpFile;
                File scrFile;
                
                // copia recursos
                for(Recursos rec : proj.recursos)
                {
                        scrFile = new File(folder + rec.Arquivo);
                        tmpFile = new File(recursosFolder + rec.Arquivo);
                        try 
                        {
                                FileUtils.copyFile(scrFile, tmpFile);
                        }
                        catch (IOException ex) 
                        {
                                Logger.getLogger(FileWriter.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
                
                // copia pastas de infra
                scrFile = new File(realFolder + "css/");
                tmpFile = new File(preFolder + "css/");
                try 
                {
                        FileUtils.copyDirectory(scrFile, tmpFile);
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(FileWriter.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                scrFile = new File(realFolder + "js/");
                tmpFile = new File(preFolder + "js/");
                try 
                {
                        FileUtils.copyDirectory(scrFile, tmpFile);
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(FileWriter.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                scrFile = new File(realFolder + "lib/");
                tmpFile = new File(preFolder + "lib/");
                try 
                {
                        FileUtils.copyDirectory(scrFile, tmpFile);
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(FileWriter.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                scrFile = new File(realFolder + "dist/");
                tmpFile = new File(preFolder + "dist/");
                try 
                {
                        FileUtils.copyDirectory(scrFile, tmpFile);
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(FileWriter.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                // cria os arquivos das paginas
                tmpFile = new File(preFolder + "html/");
                tmpFile.mkdir();
                int count = 1;
                
                for(String src : proSrc.Paginas)
                {
                        FileWriter.WriteFile(src, preFolder + "html/Pg_" + count + ".html");
                        count++;
                }
                
                // cria index
                FileWriter.WriteFile(proSrc.getIndex(), preFolder + "html/index.htm");
                
                // reescreve lib
                FileWriter.WriteFile(proSrc.getAppJs(), preFolder + "lib/app.js");
                
                // reescreve css
                FileWriter.WriteFile(proSrc.getAulaCss(), preFolder + "css/aulas.css");
               
        }
}
