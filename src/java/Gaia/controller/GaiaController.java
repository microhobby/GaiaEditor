package Gaia.controller;

import Gaia.model.Estados;
import Gaia.model.Eventos;
import Gaia.model.Layout;
import Gaia.model.Objetos;
import Gaia.model.Paginas;
import Gaia.model.Projeto;
import Gaia.model.Recursos;
import Gaia.model.User;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspWriter;
import mpro.MproEntity.MproEntity;
import org.bson.types.ObjectId;

/**
 *
 * @author matheus
 */
public class GaiaController
{
    public static String PHP_CONTEXT = "/var/www";
    public static String PHP_URL = "http://localhost:8084/GaiaEditor";

    /*public static String PHP_CONTEXT = "C:\\Data\\domains\\mpro3.com.br\\wwwroot";
        public static String PHP_URL = "http://mpro3.com.br";*/
    
    /*public static String PHP_CONTEXT = "";
        public static String PHP_URL = "http://gaia.mpro3.com.br/dados";*/

    User userContext;
    HttpServletRequest request;
    JspWriter out;
    String context;
    String realContext;

    public GaiaController(String userCod, HttpServletRequest _request, JspWriter _out, ServletContext _context)
    {
        this.request = _request;
        this.out = _out;

        this.context = (System.getenv("OPENSHIFT_DATA_DIR") != null
                ? System.getenv("OPENSHIFT_DATA_DIR") : _context.getRealPath("/") + "/");

        this.realContext = (System.getenv("OPENSHIFT_REPO_DIR") != null
                ? System.getenv("OPENSHIFT_REPO_DIR") + "/src/main/webapp/" : _context.getRealPath("/") + "/");

        User tmpU = new User();
        tmpU.cod = new ObjectId(userCod);
        User u = MproEntity.getWhere(tmpU);

        if(u != null)
        {
            this.userContext = u;
        }

        if (this.userContext != null)
        {
            if (this.request.getParameter("method") != null)
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
        } else
        {
            writeStream("Usuário não encontrado.", "null", true);
        }
    }

    public void getUser()
    {
        userContext.deleteDeleteds();
        writeStream("UserReturn", userContext.toJson(), false);
    }

    public void makePackage()
    {
        ProjectSources proSrc = MproEntity.fromJson(this.request.getParameter("filesSrc"), ProjectSources.class);
        Projeto ptrProjeto = filterProjeto(this.request.getParameter("projectCod"));
        proSrc.setProjeto(ptrProjeto);
        String sandBox = this.context + this.userContext.UserName + "_" + this.userContext.cod + "/";
        FileWriter fileWriter = new FileWriter();
        fileWriter.FileWriter(ptrProjeto, this.userContext, proSrc, sandBox, this.realContext);
        fileWriter.FolderZip(ptrProjeto, this.userContext, sandBox, this.context);
        writeStream("Sucesso", "{\"url\": \"" + (PHP_URL + "/" + this.userContext.UserName + "_" + this.userContext.cod + "/" + "sandbox/" + ptrProjeto.cod + "/" + ptrProjeto.Nome + ".zip") + "\"}", false);
    }

    public void makeProject()
    {
        ProjectSources proSrc = MproEntity.fromJson(this.request.getParameter("filesSrc"), ProjectSources.class);
        Projeto ptrProjeto = filterProjeto(this.request.getParameter("projectCod"));
        proSrc.setProjeto(ptrProjeto);
        String sandBox = this.context + this.userContext.UserName + "_" + this.userContext.cod + "/";
        FileWriter fileWriter = new FileWriter();
        fileWriter.FileWriter(ptrProjeto, this.userContext, proSrc, sandBox, this.realContext);
        //writeStream("Sucesso", "{\"url\": \"" + ("../" + this.userContext.UserName + "_" + this.userContext.cod + "/" + "sandbox/" + ptrProjeto.cod + "/html/index.htm") + "\"}", false);
        writeStream("Sucesso", "{\"url\": \"" + (PHP_URL + "/" + this.userContext.UserName + "_" + this.userContext.cod + "/sandbox/" + ptrProjeto.cod + "/html/index.html") + "\"}", false);
    }

    public void makeUserEntities()
    {
        ProjectSources proSrc = MproEntity.fromJson(this.request.getParameter("filesSrc"), ProjectSources.class);
        Projeto ptrProjeto = filterProjeto(this.request.getParameter("projectCod"));
        proSrc.setProjeto(ptrProjeto);
        Gson g = new Gson();
        writeStream("Sucesso", "{\"entities\": " + g.toJson(proSrc.getUserEntities()) + "}", false);
    }

    public void newProject()
    {
        Projeto newPro = MproEntity.fromJson(this.request.getParameter("project"), Projeto.class);
        newPro.JsonEntities = "{\"Entities\": []}";
        this.userContext.Projetos.add(newPro);
        this.userContext.Save();
        writeStream("Projeto retornado", this.userContext.Projetos.get(this.userContext.Projetos.size() - 1).toJson(), false);
    }

    public void copyProject()
    {   
        /* instantiate a new project */
        Projeto newPro = new Projeto();
        
        /* get project to be copied */
        Projeto ptrProjeto = filterProjeto(this.request
                                            .getParameter("projectCod"));
        
        /* reset cod id */
        newPro = MproEntity.fromJson(ptrProjeto.toJson(), Projeto.class);
        newPro.resetAllIds();
        
        /* add all to new project */
        Date date = new Date();
        
        /* set project name */
        newPro.Nome = ptrProjeto.Nome + " (" 
                        + date.getDate() + "/" + date.getMonth() + "/"
                        + date.getHours() + "/" + date.getMinutes()
                        + ")_copy_";

        /* save copied project */
        newPro.Save();
        
        /* save */
        this.userContext.Projetos.add(newPro);
        this.userContext.Save();
        
        writeStream("Refresh Page", "{refresh=true}", false);
    }
    
    public void newRecurso()
    {
        Projeto ptrProjeto = filterProjeto(this.request.getParameter("projectCod"));
        Recursos resource = MproEntity.fromJson(this.request.getParameter("resource"), Recursos.class);
        ptrProjeto.recursos.add(resource);
        ptrProjeto.Save();
        writeStream("Codigo do recurso", "{\"cod\": \"" + resource.cod + "\"}", false);
    }

    public void newLayout()
    {
        Layout newLayout = MproEntity.fromJson(this.request.getParameter("layout"), Layout.class);
        Projeto proPtr = this.filterProjeto(this.request.getParameter("proCod"));
        proPtr.paginas = newLayout.resolveHeaderFooter(proPtr);
        proPtr.layout.add(newLayout);
        proPtr.paginas.add(new Paginas("", 2));
        this.userContext.Save();
        writeStream("Projeto retornado", this.filterProjeto(this.request.getParameter("proCod")).toJson(), false);
    }

    public void newPage()
    {
        Projeto proPtr = this.filterProjeto(this.request.getParameter("proCod"));
        Paginas ptrPage = new Paginas("", proPtr.paginas.size());
        proPtr.paginas.add(ptrPage);
        this.userContext.Save();
        writeStream("Sucesso", "{\"cod\": \"" + ptrPage.cod + "\"}", true);
    }

    public void newObjeto()
    {
        String pageCod = this.request.getParameter("pageCod");
        String projectCod = this.request.getParameter("projectCod");
        Objetos ptrObj = MproEntity.fromJson(this.request.getParameter("objeto"), Objetos.class);
        Paginas contextPage = filterPagina(projectCod, pageCod);
        contextPage.Elementos.add(ptrObj);
        this.userContext.Save();
        writeStream("Codigo do objeto", "{\"cod\": \"" + ptrObj.cod + "\"}", false);
    }

    public void deleteObjeto()
    {
        String pageCod = this.request.getParameter("pageCod");
        String projectCod = this.request.getParameter("projectCod");
        Objetos ptrObj = MproEntity.fromJson(this.request.getParameter("objeto"), Objetos.class);
        Paginas contextPage = filterPagina(projectCod, pageCod);
        for (Objetos obj : contextPage.Elementos)
        {
            if (obj.cod == ptrObj.cod)
            {
                obj.Delete();
            }
        }
        writeStream("Sucesso", "{\"cod\":\"" + ptrObj.cod + "\"}", false);
    }

    public void savePagina()
    {
        String projectCod = this.request.getParameter("projectCod");
        Projeto ptrProjeto = filterProjeto(projectCod);
        Paginas ptrPaginas = MproEntity.fromJson(this.request.getParameter("pagina"), Paginas.class);
        replacePagina(ptrProjeto, ptrPaginas);
        this.userContext.Save();
        this.writeStream("Pagina salva", "", false);
    }

    public void saveLayout()
    {
        String projectCod = this.request.getParameter("projectCod");
        Projeto ptrProjeto = filterProjeto(projectCod);
        Type listType = new TypeToken<List<Layout>>()
        {
        }.getType();
        //List<Layout> layouts = (new Gson()).fromJson(this.request.getParameter("layout"), listType);
        List<Layout> layouts = MproEntity.fromJson(this.request.getParameter("layout"), listType);
        ptrProjeto.layout = layouts;
        ptrProjeto.Save();
        this.writeStream("Layout salvo", "", false);
    }

    public void saveProject()
    {
        String projectCod = this.request.getParameter("projectCod");
        Projeto ptrProjeto = filterProjeto(projectCod);
        Projeto dados = MproEntity.fromJson(this.request.getParameter("projeto"), Projeto.class);
        ptrProjeto.AlturaPaginas = dados.AlturaPaginas;
        ptrProjeto.LarguraPaginas = dados.LarguraPaginas;
        ptrProjeto.Save();

        this.writeStream("Projeto salvo", "", false);
    }

    public void saveEntity()
    {
        String projectCod = this.request.getParameter("projectCod");
        Projeto ptrProjeto = filterProjeto(projectCod);
        ptrProjeto.JsonEntities = this.request.getParameter("entities");
        this.userContext.Save();
        this.writeStream("Entidades salvas", "", false);
    }

    public void newEvento()
    {
        String projectCod = this.request.getParameter("projectCod");
        String paginaCod = this.request.getParameter("pageCod");
        String objectCod = this.request.getParameter("objCod");
        Objetos ptrElem = filterElemento(projectCod, paginaCod, objectCod);
        Eventos evTmp = MproEntity.fromJson(this.request.getParameter("evento"), Eventos.class);
        ptrElem.eventos.add(evTmp);
        ptrElem.Save();
        writeStream("Sucesso", "{\"cod\": \"" + evTmp.cod + "\"}", false);
    }

    public void newState()
    {
        String projectCod = this.request.getParameter("projectCod");
        String paginaCod = this.request.getParameter("pageCod");
        String objectCod = this.request.getParameter("objCod");
        Objetos ptrElem = filterElemento(projectCod, paginaCod, objectCod);
        Estados esTmp = MproEntity.fromJson(this.request.getParameter("estado"), Estados.class);
        ptrElem.estados.add(esTmp);
        ptrElem.Save();
        writeStream("Sucesso", "{\"cod\": \"" + esTmp.cod + "\"}", false);
    }

    private void replaceProjeto(Projeto candidate)
    {
        for (int i = 0; i < this.userContext.Projetos.size(); i++)
        {
            if (candidate.cod.equals(this.userContext.Projetos.get(i).cod))
            {
                this.userContext.Projetos.set(i, candidate);
            }
        }
    }

    private void replacePagina(Projeto ptrProjeto, Paginas candidate)
    {
        for (int i = 0; i < ptrProjeto.paginas.size(); i++)
        {
            if (candidate.cod.equals(ptrProjeto.paginas.get(i).cod))
            {
                Paginas tmpPaginas = ptrProjeto.paginas.get(i);
                ptrProjeto.paginas.set(i, candidate);

                // verifica objetos deletados
                for (Objetos obj : candidate.Elementos)
                {
                    boolean tem = false;
                    for (Objetos objs : tmpPaginas.Elementos)
                    {
                        if (obj.cod.equals(objs.cod))
                        {
                            tem = true;
                        }
                    }

                    if (!tem)
                    {
                        //obj.cod = Integer.MAX_VALUE;
                    }
                }
            }
        }
    }

    public void writeStream(String response, String data, boolean error)
    {
        try
        {
            out.print("{\"response\": \"" + response + "\", \"data\": " + data + ", \"error\": " + (error ? true : false) + "}");
        } 
        catch (IOException ex)
        {
            Logger.getLogger(GaiaController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private Projeto filterProjeto(String cd)
    {
        for (Projeto proj : userContext.Projetos)
        {
            if (proj.cod.equals(new ObjectId(cd)))
            {
                return proj;
            }
        }
        return null;
    }

    private Paginas filterPagina(String pcd, String cd)
    {
        Projeto proTmp = filterProjeto(pcd);
        for (Paginas pag : proTmp.paginas)
        {
            if (pag.cod.equals(new ObjectId(cd)))
            {
                return pag;
            }
        }
        return null;
    }

    private Objetos filterElemento(String pcd, String gcd, String ecd)
    {
        Paginas pageTmp = filterPagina(pcd, gcd);
        for (Objetos o : pageTmp.Elementos)
        {
            if (o.cod.equals(new ObjectId(ecd)))
            {
                return o;
            }
        }
        return null;
    }
}
