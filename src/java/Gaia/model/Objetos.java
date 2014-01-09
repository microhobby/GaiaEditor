
package Gaia.model;

import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntity;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Objetos extends MproEntityRelation
{
        private static int counterId = 1;
        public int Id;
        public String JqueryId;
        public double W;
        public double H;
        public double T;
        public double L;
        public double A;
        public double B;
        public double P;
        public double R;
        public double S;
        public String Cb;
        public String Cbb;
        public String Cs;
        public String Font;
        public int FontId;
        public String Cf;
        public int SizeFont;
        public boolean Negrito;
        public boolean Italico;
        public boolean Subline;
        public boolean Visible;
        public int Zindex;
        public double Opacity;
        //public String Script;
        public int recurso;
        public String Text;
        public String FatherId;
        public double Vss;
        public List<Eventos> eventos = new ArrayList();
        public List<Estados> estados = new ArrayList();
        public String ClassType;
        public String Name;
        public boolean Deleted;
        public String SpecialFields;
        public boolean StaticPos;
        private Recursos _recurso;
        
        public Objetos(){}
        
        public Objetos(double largura, double altura, double topo, double esquerda, boolean  visivel)
        {
                this.Id = Objetos.counterId;
                Objetos.counterId++;
                this.W = largura;
                this.H = altura;
                this.T = topo;
                this.L = esquerda;
                this.A = 0;
                this.Visible = visivel;
                this.Zindex = 1;
                this.Opacity = 1.0;
                //bordas
                this.B = 0;
                this.P = 7;
                this.R = 0;
                this.S = -100;
                this.Cb = "transparent";
                this.Cbb = "#211620";
                this.Cs = "#211620";
                //strings
                this.Text = "Seu texto aqui!";
                //fontes
                this.Font = "Arial";
                this.FontId = 68;
                this.Cf = "#000000";
                this.SizeFont = 11;
                this.Negrito = false;
                this.Italico = false;
                this.Subline = false;
                this.FatherId = "0";			//ID DO PAI DE CONTEINER
                this.ClassType = this.getClass().getName();
                this.Name = "";
                this.Deleted = false;
                this.SpecialFields = "";
                this.StaticPos = false;
                //this.Script = "";
        }
        
        public void ClearObjectsCount()
        {
                Objetos.counterId = 1;
        }
        
        public void ResourceResolve()
        {
                Recursos r = new Recursos();
                r.cod = this.recurso;
                ArrayList<Recursos> rTmp = MproEntity.getWhere(r);
                
                if(rTmp.size() > 0)
                    this._recurso = rTmp.get(0);
        }
        
        public void deleteDeleteds()
        {
                if(this.Deleted)
                        this.Delete();
                        
                for(int i =0; i < this.eventos.size(); i++)
                {
                        this.eventos.get(i).deleteDeleteds();
                }
                
                for(int j = 0; j < this.estados.size(); j++)
                {
                        this.estados.get(j).deleteDeleteds();
                }
        }
}
