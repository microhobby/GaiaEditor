

package Gaia.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 *
 * @author matheus
 */
public class MproZip 
{
        private List<String> fileList;
        private String zipFile;
        private String source;

        public MproZip() 
        {
                fileList = new ArrayList<String>();
        }
        
        public void Zip(String folder, String zipFile)
        {
                this.source = folder;
                this.zipFile = zipFile;
                
                File tmpFile = new File(zipFile);
                tmpFile.delete();
                
                recursiveFileList(new File(folder));
                
                byte[] buffer = new byte[1024];
                String src = "";
                FileOutputStream fos = null;
                ZipOutputStream zos = null;
                
                try 
                {
                        try
                        {
                                src = source.substring(source.lastIndexOf("\\")+1, source.length());
                        }
                        catch(Exception e)
                        {
                                src = source;
                        }
                        
                        if(!tmpFile.exists())
                        {
                                fos = new FileOutputStream(zipFile);
                                zos = new ZipOutputStream(fos);
                                //zos.setLevel(Deflater.NO_COMPRESSION);

                                try {
                                        for(String file : this.fileList)
                                        {
                                                //ZipEntry ze = new ZipEntry(src + File.separator + file);
                                                ZipEntry ze = new ZipEntry(file);
                                                try {
                                                        zos.putNextEntry(ze);
                                                } catch (IOException ex) {
                                                        Logger.getLogger(MproZip.class.getName()).log(Level.SEVERE, null, ex);
                                                }
                                                FileInputStream in = new FileInputStream(source + file);
                                                int len;
                                                while((len = in.read(buffer)) > 0)
                                                {
                                                        zos.write(buffer, 0, len);
                                                }
                                                in.close();
                                        }

                                        zos.closeEntry();
                                        zos.close();
                                        fos.close();
                                 } catch (IOException ex) {
                                        Logger.getLogger(MproZip.class.getName()).log(Level.SEVERE, null, ex);
                                }
                        }
                } 
                catch (FileNotFoundException ex) 
                {
                        Logger.getLogger(MproZip.class.getName()).log(Level.SEVERE, null, ex);
                } 
                finally 
                {
                        try 
                        {
                                fos.close();
                        } 
                        catch (IOException ex) 
                        {
                                Logger.getLogger(MproZip.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
        }
        
        private String getFile(String file)
        {
                return file.substring(source.length(), file.length());
        }
        
        private void recursiveFileList(File folder)
        {
                if(folder.isFile())
                {
                        fileList.add(getFile(folder.toString()));
                }
                
                if(folder.isDirectory())
                {
                        String[] subFolder = folder.list();
                        
                        for(String fileName : subFolder)
                        {
                                recursiveFileList(new File(folder, fileName));
                        }
                }
        }
}
