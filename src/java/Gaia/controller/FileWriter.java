
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
        public FileWriter()
        {}
        
        public void WriteFile(String content, String path) 
        {
                try 
                {
                        File file = new File(path);
                        /*if (!file.exists()) 
                        {
                                file.createNewFile();
                        }*/
                        FileUtils.write(file, content, "UTF-8");
                        /*java.io.FileWriter fw = new java.io.FileWriter(file);
                        BufferedWriter bw = new BufferedWriter(fw);
                        bw.write(content);
                        bw.close();*/
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(Utils.class.getName()).log(Level.SEVERE, null, ex);
                }
        }
        
        public void FolderZip(Projeto proj, User usu, String folder, String realFolder)
        {
                MproZip zip = new MproZip();
                zip.Zip(folder + "sandbox/" + proj.cod, folder + "sandbox/" + proj.cod + "/" + proj.Nome + ".zip");
        }
        
        public void FileWriter(Projeto proj, User usu, ProjectSources proSrc, String folder, String realFolder)
        {
                try {
                        String preFolder  =  folder + "sandbox/" + proj.cod + "/";
                        String recursosFolder = preFolder + "/" + usu.UserName + "_" + usu.cod + "/";
                        // cria sandbox
                        File sandBox = new File(preFolder);
                        sandBox.mkdir();
                        
                        File tmpFile;
                        File scrFile;
                        
                        tmpFile = new File(realFolder + "/img/loader.gif");
                        scrFile = new File(preFolder + "/img/");
                        scrFile.mkdir();
                        scrFile = new File(preFolder + "/img/loader.gif");
                        FileUtils.copyFile(tmpFile, scrFile);
                        tmpFile = new File(realFolder + "/img/question5.png");
                        scrFile = new File(preFolder + "/img/question5.png");
                        FileUtils.copyFile(tmpFile, scrFile);
                        tmpFile = new File(realFolder + "/img/blank.gif");
                        scrFile = new File(preFolder + "/img/blank.gif");
                        FileUtils.copyFile(tmpFile, scrFile);
                        
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
                        
                        FileUtils.copyDirectory(scrFile, tmpFile);
                        
                        scrFile = new File(realFolder + "MproEntity/");
                        tmpFile = new File(preFolder + "MproEntity/");
                        
                        FileUtils.copyDirectory(scrFile, tmpFile);
                        
                        scrFile = new File(realFolder + "js/");
                        tmpFile = new File(preFolder + "js/");
                        
                        FileUtils.copyDirectory(scrFile, tmpFile);
                        
                        scrFile = new File(realFolder + "lib/");
                        tmpFile = new File(preFolder + "lib/");

                        FileUtils.copyDirectory(scrFile, tmpFile);
                        
                        scrFile = new File(realFolder + "dist/");
                        tmpFile = new File(preFolder + "dist/");

                        FileUtils.copyDirectory(scrFile, tmpFile);
                        
                        // cria os arquivos das paginas
                        tmpFile = new File(preFolder + "html/");
                        tmpFile.mkdir();
                        int count = 1;
                        
                        for(String src : proSrc.Paginas)
                        {
                                this.WriteFile(src, preFolder + "html/Pg_" + count + ".html");
                                count++;
                        }
                        
                        // cria index
                        this.WriteFile(proSrc.getIndex(), preFolder + "html/index.php");
                        
                        // reescreve lib
                        this.WriteFile(proSrc.getAppJs(), preFolder + "lib/app.js");
                        
                        // reescreve css
                        this.WriteFile(proSrc.getAulaCss(), preFolder + "css/aulas.css");
                        
                        // reescreve UserEntities
                        this.WriteFile(proSrc.getUserEntities(), preFolder + "js/UserEntities.js");
                        
                        // manda pro ambiente do PHP
                        //FileUtils.deleteDirectory(new File(GaiaController.PHP_CONTEXT + "/" + usu.UserName + "_" + usu.cod + "/" + proj.cod));
                        
                        scrFile = new File(preFolder);
                        tmpFile = new File(GaiaController.PHP_CONTEXT + "/" + usu.UserName + "_" + usu.cod + "/" + proj.cod);
                        
                        FileUtils.copyDirectory(scrFile, tmpFile);
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(FileWriter.class.getName()).log(Level.SEVERE, null, ex);
                }
               
        }
}
