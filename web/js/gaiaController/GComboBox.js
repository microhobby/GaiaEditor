/* *
 * Classe para ComboBox com Dados
 * @return {GList}
 */
function GComboBox(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        var essaLista = new Combobox();
        var meuModelo = new ItemModel();
        
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GComboBox";
        this.JqueryId = "#GComboBox" + this.Id;
        this.Text = "Seu Texto aqui...";
        this.Name = "GComboBox" + this.Id;
        this.Cb = "#3276b1";
        
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
                if(this.SpecialFields !== "")
                {
                        var privateAttrsTmp = JSON.parse(this.SpecialFields);
                        for(var i = 0; i < privateAttrsTmp.length; i++)
                        {
                                privateAttrs[i] = privateAttrsTmp[i];
                        }
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
        this.getPrivateAttrs().push(new SpecialAttrs("MproTag", "objText", "setMproTag", ""));
        
        this.setMproTag = function(tag)
        {
                this.getPrivateAttrs()[4].Data = tag;
        };
        
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
        
        this.calculeHexHUE = function()
        {
                return (parseInt(this.Cb.substr(1, this.Cb.length), 16) + 1186337).toString(16);
        }
        
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
                        width = this.W + "px";
                        position = "relative";
                        height = this.H + "px";
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
                
                code =	'\n<div id="GComboBox' + this.Id + '"\n' +
                                                ' class="GComboBox badWolf" style="display:' + display + '; position:' + position + '; \n' +
                                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + width + '; \n' +
                                                ' height: ' + height + '; padding: ' + this.P + 'px;\n' + 
                                                /*' background-color: ' + this.Cb + '; ' +*/
                                                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                                                ' border-radius: ' + this.R + 'px;\n' +
                                                ' -webkit-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -moz-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -o-transform: rotate(' + this.A + 'deg);\n' +
                                                ' -ms-transform: rotate(' + this.A + 'deg);\n' +
                                                ' transform: rotate(' + this.A + 'deg);\n' +
                                                ' color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + ';\n' +
                                                'box-sizing: initial; \n' +
                                                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; opacity: ' + (this.Opacity / 100) + ';' +
                                                ' z-index: '+this.Zindex+';" class="things">\n' +
                                                '<div id="GComboBox' + this.Id + 'Items" class="btn-group" style="width: inherit; height: inherit;">' +
                                                
                                                '<style id="btDinamic' + this.Id + '"> \n' +
                                                '#myItems' + this.Id + ' > li > a:hover{\n' +
                                                'background-image: -webkit-gradient(linear, left 0%, left 100%, from(#' + this.calculeHexHUE() + '), to(' + this.Cb + '));\n'+
                                                'background-image: -webkit-linear-gradient(top, #' + this.calculeHexHUE() + ', 0%, ' + this.Cb + ', 100%);\n'+
                                                'background-image: -moz-linear-gradient(top, #' + this.calculeHexHUE() + ' 0%, ' + this.Cb + ' 100%);\n'+
                                                'background-image: linear-gradient(to bottom, #' + this.calculeHexHUE() + ' 0, ' + this.Cb + ' 100%); \n'+
                                                'background-repeat: repeat-x;\n' +
                                                'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr= \'#ff'+  this.calculeHexHUE() + '\', endColorstr=\'#ff' + this.Cb.replace("#", "") + '\', GradientType=0);\n' +
                                                '} \n'+
                                                '#bt' + this.Id + '{\n' +
                                                'text-shadow: initial; background-image: -webkit-gradient(linear, left 0%, left 100%, from(#' + this.calculeHexHUE() + '), to(' + this.Cb + '));\n'+
                                                'background-image: -webkit-linear-gradient(top, #' + this.calculeHexHUE() + ', 0%, ' + this.Cb + ', 100%);\n'+
                                                'background-image: -moz-linear-gradient(top, #' + this.calculeHexHUE() + ' 0%, ' + this.Cb + ' 100%);\n'+
                                                'background-image: linear-gradient(to bottom, #' + this.calculeHexHUE() + ' 0, ' + this.Cb + ' 100%); \n'+
                                                'background-repeat: repeat-x;\n' +
                                                'border-color: ' + this.Cb + '; border-radius: 4px; -webkit-border-radius: 4px; -mox-border-radius: 4px; \n' +
                                                'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr= \'#ff'+  this.calculeHexHUE() + '\', endColorstr=\'#ff' + this.Cb.replace("#", "") + '\', GradientType=0);\n' +
                                                '} \n'+
                                                '#bt' + this.Id + ':active { background-color: ' + this.Cb + '; background-image: none; border-radius: 4px; -webkit-border-radius: 4px; -mox-border-radius: 4px; }' +
                                                '</style>' +
                                                
                                                '<button id="bt' + this.Id + '" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" style="width: inherit; height: inherit; '+
                                'font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit; text-decoration: inherit; ' +
                                'color: inherit;">' +
                                                '<span id="textHere">' + this.Text + '</span><span class="caret"></span>' +
                                                '</button>' +
                                                '<ul id="myItems' + this.Id + '" class="dropdown-menu" style="width: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit; text-decoration: inherit; color: inherit;' +
                                'color: inherit;" role="menu">' +          
                                                '</ul>' +
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
                                        
                        vars +=           'var ' + this.Name + ' = new Combobox();\n' +
                                                'var model' + this.Name + ' = new ItemModel();\n' +
                                                 'var ' + this.JqueryId.replace("#", "util") + ' = {};\n';
                        
                        instructs +=    '' + this.Name + ' = $.extend({}, ' + this.Name + ', $("' + this.JqueryId + '"));\n';
                        instructs +=    '' + this.Name + '.setElement("#GComboBox' + this.Id + 'Items");\n' +
                                                '' + this.Name + '.setModel(model' + this.Name + ');\n' +
                                                '' + this.JqueryId.replace("#", "util") + '.Fonte = "' + this.getPrivateAttrs()[0].Data + '";\n' +
                                                '' + this.JqueryId.replace("#", "util") + '.Coluna = "' + this.getPrivateAttrs()[1].Data + '";\n' +
                                                '' + this.JqueryId.replace("#", "util") + '.Model = model' + this.Name + ';\n' +
                                                '' + this.JqueryId.replace("#", "util") + '.MproTag = "' + this.getPrivateAttrs()[4].Data + '";\n';
                        
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
                        
                       instructs +=  '' + (this.getPrivateAttrs()[3].Data !== "" ? this.Name + '.setInputFilter("' +this.getPrivateAttrs()[3].Data+ 'input");\n' : "");
                                                
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
};

// Herança
GComboBox.prototype = new Objetos();