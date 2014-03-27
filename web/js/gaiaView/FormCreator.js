
// $("#GTable1").clone().children().remove().end().text()

/**
 * Declaração da Classe que faz bind dos dados para um formulário seguindo o Gaia Tags
 * Dependencias: JQUERY
 * @returns {FormCreator}
 */
function FormCreator(classe, elem)
{
        // Campos privados
        
        /**
         * @type MProEntity
         */
        this.Source = null;
        /**
         * @type MproEntity
         */
        this.Classe = classe;
        /**
         * @type $
         */
        this.Elem = $(elem);
        /**
         * @type Array
         */
        this.ElemsClone = new Array();
        
        // Construtor
        
        this.Elem.css("height", "auto");
        //this.Elem.hide();
        
        for(var i = 0; i < this.Elem.children().length; i++) 
        {
                var tmp = $(this.Elem.children()[i]); 
                if(tmp.attr("id").indexOf("GInput") !== -1 || 
                tmp.attr("id").indexOf("GTextArea") !== -1 || 
                tmp.attr("id").indexOf("GTextEditor") !== -1 ||
                tmp.attr("id").indexOf("GComboBox") !== -1 || 
                tmp.attr("id").indexOf("GTable") !== -1)
                        this.ElemsClone.push(tmp.clone());
        }
        
        // Metodos publicos
        
        /**
         *  Seta o dado a ser editado
         * @param {MproEntity} dado
         * @returns {undefined}
         */
        this.setData = function(dado)
        {
                this.Source = dado;
                
                // gogogo
                for(var i = 0; i < this.ElemsClone.length; i++)
                {
                        var elemC = $(this.ElemsClone[i]);
                        elemC.css("height", "auto");
                        var tags = $(this.ElemsClone[i]).html().match(/@{(.*?)}/g);
                        
                        if(!tags)
                        {
                                if($(this.ElemsClone[i]).attr("fonte") !== "" && $(this.ElemsClone[i]).attr("fonte") !== undefined)
                                {
                                        tags = [];
                                        tags[0] = $(this.ElemsClone[i]).attr("fonte");
                                }
                        }
                        
                        if(tags)
                        {
                                var clearTag = tags[0].replace("@{", "").replace("}", "");
                                if(elemC.attr("id").indexOf("GInput") !== -1)
                                {
                                        this.Elem.find("#" + elemC.attr("id")).find("input").val(this.Source[clearTag]);
                                }
                                else if(elemC.attr("id").indexOf("GTextArea") !== -1)
                                {
                                        this.Elem.find("#" + elemC.attr("id")).find("textarea").val(this.Source[clearTag]);
                                }
                                else if(elemC.attr("id").indexOf("GTextEditor") !== -1)
                                {
                                        this.Elem.find("#" + elemC.attr("id")).find("#" + elemC.attr("id") + "Container").code(this.Source[clearTag]);
                                }
                        }
                        else
                        {
                                if(elemC.attr("id").indexOf("GComboBox") !== -1 || elemC.attr("id").indexOf("GTable") !== -1)
                                        tags = window["util" + elemC.attr("id")].Fonte;
                                
                                if(tags)
                                {
                                        var clearTag = tags.replace("@{", "").replace("}", "");
                                        if(elemC.attr("id").indexOf("GComboBox") !== -1)
                                        {      
                                                window["util" + elemC.attr("id")].Model.clear();
                                                if(this.Source[clearTag] && this.Source[clearTag].length)
                                                {
                                                        for(var ix = 0; ix < this.Source[clearTag].length; ix++)
                                                        {
                                                                window["util" + elemC.attr("id")].Model.add(new Item(
                                                                        this.Source[clearTag][ix][window["util" + elemC.attr("id")].Coluna], 
                                                                        this.Source[clearTag][ix]
                                                                ));
                                                        }
                                                }
                                        }
                                        else if(elemC.attr("id").indexOf("GTable") !== -1)
                                        {
                                                if(this.Source[clearTag] && this.Source[clearTag].length)
                                                        window["util" + elemC.attr("id")].Table.setSourceArray(this.Source[clearTag]);
                                        }
                                }
                        }
                }
        };
        
        /**
         * Pega o objeto em edição
         * @returns {MproEntity|this.Classe}
         */
        this.getData = function()
        {
                return this.Source;
        };
        
        /**
         * Factory um novo Objeto
         * @returns {MproEntity}
         */
        this.New = function()
        {
                this.Source = new this.Classe();
                
                // gogogo
                for(var i = 0; i < this.ElemsClone.length; i++)
                {
                        var elemC = $(this.ElemsClone[i]);
                        elemC.css("height", "auto");
                        var tags = $(this.ElemsClone[i]).html().match(/@{(.*?)}/g);
                        
                        if(!tags)
                        {
                                if($(this.ElemsClone[i]).attr("fonte") !== "" && $(this.ElemsClone[i]).attr("fonte") !== undefined)
                                {
                                        tags = [];
                                        tags[0] = $(this.ElemsClone[i]).attr("fonte");
                                }
                        }
                        
                        if(tags)
                        {
                                var clearTag = tags[0].replace("@{", "").replace("}", "");
                                if(elemC.attr("id").indexOf("GInput") !== -1)
                                {
                                        this.Elem.find("#" + elemC.attr("id")).find("input").val("");
                                }
                                else if(elemC.attr("id").indexOf("GTextArea") !== -1)
                                {
                                        this.Elem.find("#" + elemC.attr("id")).find("textarea").val("");
                                }
                                else if(elemC.attr("id").indexOf("GTextEditor") !== -1)
                                {
                                        this.Elem.find("#" + elemC.attr("id")).find("#" + elemC.attr("id") + "Container").code("");
                                }
                        }
                        else
                        {
                                if(elemC.attr("id").indexOf("GComboBox") !== -1 || elemC.attr("id").indexOf("GTable") !== -1)
                                        tags = window["util" + elemC.attr("id")].Fonte;
                                
                                if(tags && tags !== "")
                                {
                                        var clearTag = tags.replace("@{", "").replace("}", "");
                                        if(elemC.attr("id").indexOf("GComboBox") !== -1)
                                        {      
                                                window["util" + elemC.attr("id")].Model.clear();
                                        }
                                        else if(elemC.attr("id").indexOf("GTable") !== -1)
                                        {
                                                window["util" + elemC.attr("id")].Table.setSourceArray([]);
                                        }
                                }
                        }
                }
                
                return this.Source;
        };
        
        /**
         * Salva objeto na edição
         * @returns {undefined}
         */
        this.Save = function()
        {
                
                // gogogo
                for(var i = 0; i < this.ElemsClone.length; i++)
                {
                        var elemC = $(this.ElemsClone[i]);
                        elemC.css("height", "auto");
                        var tags = $(this.ElemsClone[i]).html().match(/@{(.*?)}/g);
                        
                        if(!tags)
                        {
                                if($(this.ElemsClone[i]).attr("fonte") !== "" && $(this.ElemsClone[i]).attr("fonte") !== undefined)
                                {
                                        tags = [];
                                        tags[0] = $(this.ElemsClone[i]).attr("fonte");
                                }
                        }
                        
                        if(tags)
                        {
                                var clearTag = tags[0].replace("@{", "").replace("}", "");
                                if(elemC.attr("id").indexOf("GInput") !== -1)
                                {
                                        this.Source[clearTag] = this.Elem.find("#" + elemC.attr("id")).find("input").val();
                                }
                                else if(elemC.attr("id").indexOf("GTextArea") !== -1)
                                {
                                        this.Source[clearTag] = this.Elem.find("#" + elemC.attr("id")).find("textarea").val();
                                }
                                else if(elemC.attr("id").indexOf("GTextEditor") !== -1)
                                {
                                        this.Source[clearTag] = this.Elem.find("#" + elemC.attr("id")).find("#" + elemC.attr("id") + "Container").code();
                                }
                        }
                        else
                        {
                                if(elemC.attr("id").indexOf("GComboBox") !== -1 || elemC.attr("id").indexOf("GTable") !== -1)
                                        tags = window["util" + elemC.attr("id")].Fonte;
                                
                                if(tags && tags !== "")
                                {
                                        var clearTag = tags.replace("@{", "").replace("}", "");
                                        if(elemC.attr("id").indexOf("GComboBox") !== -1)
                                        {      
                                                //window["util" + elemC.attr("id")].Model.clear();
                                                var dadas = new Array();
                                                for(var j = 0; j < window["util" + elemC.attr("id")].Model.tam; j++)
                                                {
                                                        dadas = window["util" + elemC.attr("id")].Model.get(j).obj;
                                                }
                                                this.Source[clearTag] = dadas;
                                        }
                                        else if(elemC.attr("id").indexOf("GTable") !== -1)
                                        {
                                                //window["util" + elemC.attr("id")].Table.setSourceArray([]);
                                                this.Source[clearTag] = window["util" + elemC.attr("id")].Table.getSourceArray();
                                        }
                                }
                        }
                }
                
                this.Source.Save();
        };
}