package Gaia.model;

import java.util.ArrayList;
import mpro.MproEntity.MproEntityRelation;

/**
 *
 * @author matheus
 */
public class Projeto extends MproEntityRelation
{
        public String Nome;
        public double AlturaPaginas;
        public double LarguraPaginas;
        public ArrayList<Layout> layout = new ArrayList();
        public ArrayList<Paginas> paginas = new ArrayList();
        public  ArrayList<Recursos> recursos = new ArrayList();
        public String Obs;
        
        public Projeto(){}
        
        public Projeto(String nome, double altura, double largura, String obs)
        {
                this.Nome = nome;
                this.AlturaPaginas = altura;
                this.LarguraPaginas = largura;
                this.Obs = obs;
        }
}
