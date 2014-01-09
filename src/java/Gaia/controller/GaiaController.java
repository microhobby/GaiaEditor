
package Gaia.controller;

import Gaia.model.Estados;
import Gaia.model.Eventos;
import Gaia.model.Layout;
import Gaia.model.Objetos;
import Gaia.model.Paginas;
import Gaia.model.Projeto;
import Gaia.model.Recursos;
import Gaia.model.User;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspWriter;
import mpro.MproEntity.MproEntity;

/**
 *
 * @author matheus
 */
public class GaiaController 
{
        public static String PHP_CONTEXT = "/var/www";
        public static String PHP_URL = "http://localhost";
        
        User userContext;
        HttpServletRequest request;
        JspWriter out;
        ServletContext context;
        
        public GaiaController(String userCod, HttpServletRequest _request, JspWriter _out, ServletContext _context)
        {
                this.request = _request;
                this.out = _out;
                this.context = _context;
                User tmpU = new User();
                tmpU.cod = Integer.parseInt(userCod);
                ArrayList<User> users = MproEntity.getWhere(tmpU);
                
                for(User u : users)
                {
                        this.userContext = u;
                }
                
                if(this.userContext != null)
                {
                        if(this.request.getParameter("method") != null)
                        {
                                try 
                                {
                                        this.getClass().getMethod(this.request.getParameter("method")).invoke(this);
                                } 
                                catch (Exception ex) 
                                {
                                        Logger.getLogger(GaiaController.class.getName()).log(Level.SEVERE, null, ex);
                                }
                        }
                }
                else
                    writeStream("Usuário não encontrado.", "null", true);
        }
        
        public void getUser()
        {
                userContext.deleteDeleteds();
                writeStream("UserReturn", userContext.toJson(), false);
        }
        
        public void makePackage()
        {
                 int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                ProjectSources proSrc = MproEntity.fromJson(this.request.getParameter("filesSrc"), ProjectSources.class);
                Projeto ptrProjeto = filterProjeto(projectCod);
                proSrc.setProjeto(ptrProjeto);
                String sandBox = this.context.getRealPath("/") + this.userContext.UserName + "_" + this.userContext.cod + "/";
                FileWriter fileWriter = new FileWriter();
                fileWriter.FileWriter(ptrProjeto, this.userContext, proSrc, sandBox, this.context.getRealPath("/"));
                fileWriter.FolderZip(ptrProjeto, this.userContext, sandBox, this.context.getRealPath("/"));
                writeStream("Sucesso", "{\"url\": \"" + ("../" + this.userContext.UserName + "_" + this.userContext.cod + "/" + "sandbox/" + ptrProjeto.cod + "/" + ptrProjeto.Nome + ".zip") + "\"}", false);
        }
        
        public void makeProject()
        {
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                ProjectSources proSrc = MproEntity.fromJson(this.request.getParameter("filesSrc"), ProjectSources.class);
                Projeto ptrProjeto = filterProjeto(projectCod);
                proSrc.setProjeto(ptrProjeto);
                String sandBox = this.context.getRealPath("/") + this.userContext.UserName + "_" + this.userContext.cod + "/";
                FileWriter fileWriter = new FileWriter();
                fileWriter.FileWriter(ptrProjeto, this.userContext, proSrc, sandBox, this.context.getRealPath("/"));
                //writeStream("Sucesso", "{\"url\": \"" + ("../" + this.userContext.UserName + "_" + this.userContext.cod + "/" + "sandbox/" + ptrProjeto.cod + "/html/index.htm") + "\"}", false);
                writeStream("Sucesso", "{\"url\": \"" + (PHP_URL + "/" + this.userContext.UserName + "_" + this.userContext.cod + "/" + ptrProjeto.cod + "/html/index.php") + "\"}", false);
        }
        
        public void newProject() 
        {
                Projeto newPro = MproEntity.fromJson(this.request.getParameter("project"), Projeto.class);
                newPro.JsonEntities = "{\"Entities\": []}";
                this.userContext.Projetos.add(newPro);
                this.userContext.Save();
                writeStream("Projeto retornado", this.userContext.Projetos.get(this.userContext.Projetos.size() -1).toJson(), false);
        }
        
        public void newRecurso()
        {
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                Projeto ptrProjeto = filterProjeto(projectCod);
                Recursos resource = MproEntity.fromJson(this.request.getParameter("resource"), Recursos.class);
                ptrProjeto.recursos.add(resource);
                ptrProjeto.Save();
                writeStream("Codigo do recurso", "{\"cod\": " + resource.cod + ", \"superCod\": " + ptrProjeto.cod + "}", false);
        }
        
        public void newLayout()
        {
                Layout newLayout = MproEntity.fromJson(this.request.getParameter("layout"), Layout.class);
                Projeto proPtr = this.filterProjeto(Integer.parseInt(this.request.getParameter("proCod")));
                proPtr.paginas = newLayout.resolveHeaderFooter(proPtr);
                proPtr.layout.add(newLayout);
                proPtr.paginas.add(new Paginas("", 2));
                this.userContext.Save();
                writeStream("Projeto retornado", this.filterProjeto(Integer.parseInt(this.request.getParameter("proCod"))).toJson(), false);
        }
        
        public void newPage()
        {
                Projeto proPtr = this.filterProjeto(Integer.parseInt(this.request.getParameter("proCod")));
                Paginas ptrPage = new Paginas("", proPtr.paginas.size());
                proPtr.paginas.add(ptrPage);
                this.userContext.Save();
                writeStream("Sucesso", "{\"cod\": " + ptrPage.cod + ", \"superCod\": " + ptrPage.superCod + "}", true);
        }
        
        public void newObjeto()
        {
                int pageCod = Integer.parseInt(this.request.getParameter("pageCod"));
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                Objetos ptrObj = MproEntity.fromJson(this.request.getParameter("objeto"), Objetos.class);
                Paginas contextPage = filterPagina(projectCod, pageCod);
                contextPage.Elementos.add(ptrObj);
                this.userContext.Save();
                writeStream("Codigo do objeto", "{\"cod\": " + ptrObj.cod + ", \"superCod\": " + ptrObj.superCod + "}", false);
        }
        
        public void deleteObjeto()
        {
                int pageCod = Integer.parseInt(this.request.getParameter("pageCod"));
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                Objetos ptrObj = MproEntity.fromJson(this.request.getParameter("objeto"), Objetos.class);
                Paginas contextPage = filterPagina(projectCod, pageCod);
                for(Objetos obj : contextPage.Elementos)
                {
                        if(obj.cod == ptrObj.cod)
                                obj.Delete();
                }
                writeStream("Sucesso", "{\"cod\":" + ptrObj.cod + "}", false);
        }
        
        public void savePagina()
        {
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                Projeto ptrProjeto = filterProjeto(projectCod);
                Paginas ptrPaginas = MproEntity.fromJson(this.request.getParameter("pagina"), Paginas.class);
                replacePagina(ptrProjeto, ptrPaginas);
                this.userContext.Save();
                this.writeStream("Pagina salva", "", false);
        }
        
        public void saveEntity()
        {
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                Projeto ptrProjeto = filterProjeto(projectCod);
                ptrProjeto.JsonEntities = this.request.getParameter("entities");
                this.userContext.Save();
                this.writeStream("Entidades salvas", "", false);
        }
        
        public void newEvento()
        {
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                int paginaCod = Integer.parseInt(this.request.getParameter("pageCod"));
                int objectCod = Integer.parseInt(this.request.getParameter("objCod"));
                Objetos ptrElem = filterElemento(projectCod, paginaCod, objectCod);
                Eventos evTmp = MproEntity.fromJson(this.request.getParameter("evento"), Eventos.class);
                ptrElem.eventos.add(evTmp);
                ptrElem.Save();
                writeStream("Sucesso", "{\"cod\": " + evTmp.cod + ", \"superCod\": " + evTmp.superCod + "}", false);
        }
        
        public void newState()
        {
                int projectCod = Integer.parseInt(this.request.getParameter("projectCod"));
                int paginaCod = Integer.parseInt(this.request.getParameter("pageCod"));
                int objectCod = Integer.parseInt(this.request.getParameter("objCod"));
                Objetos ptrElem = filterElemento(projectCod, paginaCod, objectCod);
                Estados esTmp = MproEntity.fromJson(this.request.getParameter("estado"), Estados.class);
                ptrElem.estados.add(esTmp);
                ptrElem.Save();
                writeStream("Sucesso", "{\"cod\": " + esTmp.cod + ", \"superCod\": " + esTmp.superCod + "}", false);
        }
        
        private void replaceProjeto(Projeto candidate)
        {
                for(int i = 0; i < this.userContext.Projetos.size(); i++)
                {
                        if(candidate.cod == this.userContext.Projetos.get(i).cod)
                        {
                                this.userContext.Projetos.set(i, candidate);
                        }
                }
        }
        
        private void replacePagina(Projeto ptrProjeto, Paginas candidate)
        {
                for(int i = 0; i < ptrProjeto.paginas.size(); i++)
                {
                        if(candidate.cod == ptrProjeto.paginas.get(i).cod)
                        {
                                Paginas tmpPaginas = ptrProjeto.paginas.get(i);
                                ptrProjeto.paginas.set(i, candidate);
                                
                                // verifica objetos deletados
                                for(Objetos obj : candidate.Elementos)
                                {
                                        boolean tem = false;
                                        for(Objetos objs : tmpPaginas.Elementos)
                                        {
                                                if(obj.cod == objs.cod)
                                                {
                                                        tem = true;
                                                }
                                        }
                                        
                                        if(!tem)
                                                obj.cod = Integer.MAX_VALUE;
                                }
                        }
                }
        }
        
        public void writeStream(String response, String data, boolean error)
        {
                try 
                {
                        out.print("{\"response\": \"" + response + "\", \"data\": " + data + ", \"error\": "  + (error ? true : false) +  "}");
                } 
                catch (IOException ex) 
                {
                        Logger.getLogger(GaiaController.class.getName()).log(Level.SEVERE, null, ex);
                }
        }
        
        private Projeto filterProjeto(int cd)
        {
                for(Projeto proj : userContext.Projetos)
                {
                        if(proj.cod == cd)
                                return proj;
                }
                return null;
        }
        
        private Paginas filterPagina(int pcd, int cd)
        {
                Projeto proTmp = filterProjeto(pcd);
                for(Paginas pag : proTmp.paginas)
                {
                        if(pag.cod == cd)
                                return pag;
                }
                return null;
        }
        
        private Objetos filterElemento(int pcd, int gcd, int ecd)
        {
                Paginas pageTmp = filterPagina(pcd, gcd);
                for(Objetos o : pageTmp.Elementos)
                {
                        if(o.cod == ecd)
                                return o;
                }
                return null;
        }
}
