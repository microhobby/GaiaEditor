
/* *
 * Classe OBJETOS
 * @return {Objetos}
 */
function Objetos()
{
        this.init = function(largura, altura, topo, esquerda, visivel)
        {
                this.Id = Objetos.counterId++;
                this.JqueryId = "";
                this.W = largura;
                this.H = altura;
                this.T = topo;
                this.L = esquerda;
                this.B = 0;
                this.P = 7;
                this.R = 0;
                this.S = -100;
                this.Cb = "transparent";                               // Color Background
                this.Cbb = "#211620";                                   // Color border
                this.Cs = "#211620";
                this.Font = "Arial";
                this.FontId = 68;
                this.Cf = "#000000";
                this.SizeFont = 11;
                this.Negrito = false;
                this.Italico = false;
                this.Subline = false;
                this.Visible = visivel;
                this.Zindex = 1;
                this.Opacity = 100;
                this.Script = "";
                this.Text = "";
                this.FatherId = 0;
                this.recursos = new Array();
                this.eventos = new Array();
                this.ClassType = "Objetos";
                this.Name = "";
                this.cod = 2147483647;
                this.superCod = 2147483647;
        };
        
        this.setWidth = function(num)
        {
                this.W = num;
                $(this.JqueryId).css("width", num+"px"); 
        };
        
        this.setHeight = function(num)
        {
                this.H = num;
                $(this.JqueryId).css("height", num+"px");
        };
        
        this.setTop = function(num)
        {
                this.T = num;
                $(this.JqueryId).css("top", num+"px");
        }
        
        this.setLeft = function(num)
        {
                this.L = num;
                $(this.JqueryId).css("left", num+"px");
        };
        
        this.setPadding = function(num)
        {
                this.P = num;
                $(this.JqueryId).css("padding", num+"px");
        };
        
        this.setRadius = function(num)
        {
                this.R = num;
                $(this.JqueryId).css("border-radius", num+"px"); 
        };
        
        this.setShadow = function(num)
        {
                this.S = num;
                $(this.JqueryId).css("box-shadow", "9px 20px 18px " + num  + "px " + this.Cs);
        };
        
        this.setShadowColor = function(hex)
        {
                this.Cs = hex;
                $(this.JqueryId).css("box-shadow", "9px 20px 18px " + this.S  + "px " + this.Cs);
        };
        
        this.setZindex = function(num)
        {
                this.Zindex = num;
                $(this.JqueryId).css("z-index", num); 
        };
        
        this.setBackgroundColor = function(hex)
        {
                this.Cb = hex;
                $(this.JqueryId).css("background-color", hex); 
        };
        
        this.setBorder = function(num)
        {
                this.B = num;
                $(this.JqueryId).css("border-style", "solid");
                $(this.JqueryId).css("border-width", num);
                $(this.JqueryId).css("border-color", this.Cbb);
        };
        
        this.setBorderColor = function(hex)
        {
                this.Cbb = hex;
                $(this.JqueryId).css("border-color", this.Cbb);
        };
        
        this.setOpacity = function(num)
        {
                this.Opacity = num;
                $(this.JqueryId).css("opacity", this.Opacity / 100);
        };
        
        /**
         * Implementa rotinas de eventos dos elementos
         */
        this.implementGaiaEvents = function()
        {
                $(this.JqueryId).multidraggable();
                $(this.JqueryId).resizable();
                // mostra label com o id do objeto
                $(this.JqueryId).mouseover(function(evt)
                {
                        //evt.stopPropagation();
                        $(Objetos.jqueryLabel).text("#" + $(this).attr("id"));
                        $(Objetos.jqueryLabel).show();
                }).mouseout(function(evt)
                {
                        //evt.stopPropagation();
                        $(Objetos.jqueryLabel).hide();
                });
                // seleciona o cara
                var me = this;
                $(this.JqueryId).bind("mousedown",function()
                {
                        if(Objetos.grid)
                        {
                                $(".gaiaFocused").removeClass("gaiaFocused");
                        }
                        else
                        {
                                $(".gaiaFocused").removeClass("gaiaFocused")
                        }
                        $(this).addClass("gaiaFocused");
                        for(var i = 0; i < Objetos.selectAssigns.length; i++)
                        {
                                Objetos.selectAssigns[i](me);
                        }
                }).bind("mouseup", function()
                {
                        for(var i = 0; i < Objetos.selectAssigns.length; i++)
                        {
                                Objetos.selectAssigns[i](me);
                        }
                });
        };
}


// Estaticos
Objetos.counterId = 0;
Objetos.grid = false;
Objetos.jqueryLabel = null;
Objetos.selectAssigns = [];

Objetos.addSelectListener = function(func)
{
        Objetos.selectAssigns.push(func);
};