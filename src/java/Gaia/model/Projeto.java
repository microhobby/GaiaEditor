package Gaia.model;

import java.util.List;
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
        public List<Layout> layout = new ArrayList();
        public List<Paginas> paginas = new ArrayList();
        public  List<Recursos> recursos = new ArrayList();
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
