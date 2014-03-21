
/* *
 * Classe para Fonte de Dados
 * @return {GList}
 */
function GList(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        var essaLista = new List();
        var meuModelo = new ItemModel();
        
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GList";
        this.JqueryId = "#GList" + this.Id;
        this.Text = "Seu Texto aqui...";
        this.Name = "GList" + this.Id;
        
        //@override
        this.returnCodeInstructs = function()
        {
                return instructs;
        };
        
        //@override
        this.returnCodeVars = function()
        {
                return vars;
        };
        
        //@override
        this.getPrivateAttrs = function()
        {
                return privateAttrs;
        };
        
        //@override
        this.resolveSpecialFields = function()
        {
                var privateAttrsTmp = JSON.parse(this.SpecialFields);
                for(var i = 0; i < privateAttrsTmp.length; i++)
                {
                        privateAttrs[i] = privateAttrsTmp[i];
                }
        };
        
        //@override
        this.parseSpecialFields = function()
        {
                this.SpecialFields = JSON.stringify(privateAttrs);
        };
        
        //@override
        this.canCreateVar = function()
        {
                return false;
        };
        
        this.getPrivateAttrs().push(new SpecialAttrs("Fonte", "objText", "setFonteDados", ""));
        this.getPrivateAttrs().push(new SpecialAttrs("Coluna", "objText", "setCollum", ""));
        this.getPrivateAttrs().push(new SpecialAttrs("Itens", "objText", "setItems", "Item1;Item2;Item3"));
        this.getPrivateAttrs().push(new SpecialAttrs("Input Filtro", "objText", "setFilterElement", ""));
        
        this.setFilterElement = function(nameElement)
        {
                this.getPrivateAttrs()[3].Data = nameElement;
        };
        
        this.setFonteDados = function(nameFonte)
        {
                 this.getPrivateAttrs()[0].Data = nameFonte;
        };
        
        this.setCollum = function(nameCollum)
        {
               this.getPrivateAttrs()[1].Data = nameCollum; 
        };
        
        this.setItems = function(items)
        {
                this.getPrivateAttrs()[2].Data = items;
                meuModelo.clear();
                var its = items.split(";");
                for(var i = 0; i < its.length; i++)
                {
                        meuModelo.add(new Item(its[i], i));
                }
        };
        
        //@override
        this.returnCode = function(flag, isPreview)
        {
                // zera
                vars = "";
                instructs = "";
                
                
                if(flag == undefined)
                        flag = false;
                if(isPreview == undefined)
                        isPreview = false;
                
                var code;
                var display = "none";
                var italico = "italic";
                var negrito = "bold";
                var subline = "underline";
                var position = "absolute";
                var width = "";
                var height = "";
                
                if(!flag)
                {
                        if(this.Visible)
                                display = "block";
                }
                else
                        display = "block";

                if(this.StaticPos)
                {
                        width = "auto";
                        position = "static";
                        height = "auto";
                }
                else
                {
                        height = this.H + "px";
                        width = this.W + "px";
                }

                if(!this.Italico)
                        italico = "normal";
                if(!this.Negrito)
                        negrito = "normal";
                if(!this.Subline)
                        subline = "normal";
                
                code =	'\n<div id="GList' + this.Id + '"\n' +
                                                ' class="badWolf" style="display:' + display + '; position:' + position + '; \n' +
                                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + width + '; \n' +
                                                ' height: ' + height + '; padding: ' + this.P + 'px;\n' + 
                                                ' background-color: ' + this.Cb + '; ' +
                                                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                                                ' border-radius: ' + this.R + 'px;\n' +
                                                ' -webkit-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -moz-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -o-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -ms-transform: rotate(' + this.A + 'deg);\n' +
                                                ' transform: rotate(' + this.A + 'deg);\n' +
                                                'box-sizing: initial; \n' +
                                                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; opacity: ' + (this.Opacity / 100) + ';' +
                                                ' z-index: '+this.Zindex+';" class="things">\n' +
                                                '<div id="GList' + this.Id + 'Items" class="list-group">' +
                                                        //vai ser o conteudo aqui
                                                '\n</div></div>\n';
                
                if(!flag)
                {
                        /*code +=         '<script>\n' +
                                                'var ' + this.Name + ' = new List();\n' +
                                                'var model' + this.Name + ' = new ItemModel();\n'+
                                                '$(document).ready(function(){\n  ' + this.Name + '.setElement("#GList' + this.Id + 'Items");\n' +
                                                '' + this.Name + '.setModel(model' + this.Name + ');\n' +
                                                '' + this.Name + '.setInputFilter("' +this.getPrivateAttrs()[3].Data+ 'input");\n';*/
                                        
                        vars +=           'var ' + this.Name + ' = new List();\n' +
                                                'var model' + this.Name + ' = new ItemModel();\n';
                                        
                        instructs +=    '' + this.Name + '.setElement("#GList' + this.Id + 'Items");\n' +
                                                '' + this.Name + '.setModel(model' + this.Name + ');\n' +
                                                '' + (this.getPrivateAttrs()[3].Data !== "" ? this.Name + '.setInputFilter("' +this.getPrivateAttrs()[3].Data+ 'input");\n' : "");
                        
                        if(this.getPrivateAttrs()[0].Data === "")
                        {
                                for(var i = 0; i < meuModelo.getTam(); i++)
                                {
                                        //code +=         'model' + this.Name + '.add(new Item("' + meuModelo.lista_[i].string + '", ' + i + '));\n';
                                        instructs += 'model' + this.Name + '.add(new Item("' + meuModelo.lista_[i].string + '", ' + i + '));\n';
                                }
                                //code += ' });\n';
                        }
                        else
                        {
                                // DB SOURCE
                               /* code += '' + this.getPrivateAttrs()[0].Data +'.addLink({model: model' + this.Name + ', collum: "'+
                                        this.getPrivateAttrs()[1].Data+'"});\n });';*/
                                
                                instructs += '' + this.getPrivateAttrs()[0].Data +'.addLink({model: model' + this.Name + ', collum: "'+
                                        this.getPrivateAttrs()[1].Data+'"});\n';
                                
                                /*code += 'var thread' + this.Name + ' = new Thread(function(){\n';
                                code += 'if(threadRunned' + this.getPrivateAttrs()[0].Data  + '){\n';
                                code += 'for(var i = 0; i < ' + this.getPrivateAttrs()[0].Data + '.length; i++){ model' + this.Name + '.add(new Item('
                                + this.getPrivateAttrs()[0].Data + '[i].' + this.getPrivateAttrs()[1].Data + 
                                ', i), true); }\n model' + this.Name + '.dispatchEvents();\n thread' + this.Name + '.stop();\n';
                                code += '}});\n thread' + this.Name + '.run();';*/
                        }
                                                
                        //code +=         '</script>';
                }
                
                var me = this;
                var meessaLista = essaLista;
                var memeuModelo = meuModelo;
                
                setTimeout(function()
                {
                        meessaLista.setElement(me.JqueryId + "Items");
                        meessaLista.setModel(memeuModelo);
                        me.setItems(me.getPrivateAttrs()[2].Data);
                }, 200);
                
                return code;
        };
}

// Herança
GList.prototype = new Objetos();