

/**
 * Classe que retorna
 * @returns {GRepeater}
 */
function GTable(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        var minhasColuna = [];
        var tTmp = null;
        //var essaLista = new List();
        //var meuModelo = new ItemModel();
        
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "GTable";
        this.JqueryId = "#GTable" + this.Id;
        this.Cb = "#6666cc";
        this.Name = "GTable" + this.Id;
        
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
        this.getPrivateAttrs().push(new SpecialAttrs("Colunas", "objText", "setCollums", "Coluna1;Coluna2"));
        this.getPrivateAttrs().push(new SpecialAttrs("Input Filtro", "objText", "setFilterElement", ""));
        this.getPrivateAttrs().push(new SpecialAttrs("MproTag", "objText", "setMproTag", ""));
        
        this.setMproTag = function(tag)
        {
                this.getPrivateAttrs()[3].Data = tag;
        };
        
        this.setFilterElement = function(nameElement)
        {
                this.getPrivateAttrs()[2].Data = nameElement;
        };
        
        this.setFonteDados = function(nameFonte)
        {
                 this.getPrivateAttrs()[0].Data = nameFonte;
        };
        
        this.setCollums = function(collums)
        {
                this.getPrivateAttrs()[1].Data = collums;
                minhasColuna = [];
                var its = collums.split(";");
                for(var i = 0; i < its.length; i++)
                {
                        //meuModelo.add(new Item(its[i], i));
                        minhasColuna.push(its[i]);
                }
                if(tTmp !== null)
                {
                        tTmp.setCollums(minhasColuna);
                }
        };
        
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
                var position = "absolute";
                var width = "";
                var height = "";
                var italico = "italic";
                var negrito = "bold";
                var subline = "underline";
                
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
                
                  if(!flag)
                {
                        if(this.Visible)
                                display = "block";
                }
                else
                        display = "block";
                
                if(!this.Italico)
                        italico = "normal";
                if(!this.Negrito)
                        negrito = "normal";
                if(!this.Subline)
                        subline = "normal";
                
                code =	'\n<div id="GTable' + this.Id + '"\n' +
                                                ' class="badWolf" style="display:' + display + '; position: ' + position + '; \n' +
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
                                                ' color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + ';\n' +
                                                ' z-index: '+this.Zindex+';">\n' +
                                                '<table id="GTable' + this.Id + 'Items" class="table table-hover" style="border-collapse:  initial; border-color: rgb(189, 189, 189); border-style:solid; border-width:1px; width: 100%; height: auto; border-radius: 4px; -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.075); box-shadow: 0 1px 2px rgba(0,0,0,0.075);">' +
                                                '</table>'+
                                                        //vai ser o conteudo aqui
                                                        //this.Text +
                                                '\n</div>\n';
                                                
                        if(!flag)
                        {
                                vars += 'var ' + this.Name + ' = new Table("' + this.JqueryId + 'Items");\n' +
                                                'var ' + this.JqueryId.replace("#", "util") + ' = {};\n';
                                        
                                        instructs += '' + this.Name + ' = $.extend({}, ' + this.Name + ', $("' + this.JqueryId + '"));\n';
                                        
                                if(this.getPrivateAttrs()[0].Data !== "" && this.getPrivateAttrs()[0].Data.indexOf("@") === -1)
                                {
                                        instructs +=    '' + this.Name + '.setDBsource(' + this.getPrivateAttrs()[0].Data + ');\n';
                                }
                                else
                                        instructs += '' +  this.JqueryId.replace("#", "util") + '.Fonte = "' + this.getPrivateAttrs()[0].Data  + '";\n';
                                if(minhasColuna.length > 0)
                                {
                                        instructs +=  '' + this.Name + '.setCollums('+ JSON.stringify(minhasColuna) + ');\n';
                                }
                                if(this.getPrivateAttrs()[2].Data !== "")
                                {
                                        instructs += '' + this.Name + '.setInputFilter("'+ this.getPrivateAttrs()[2].Data+'input");\n';
                                }
                                instructs += '' +  this.JqueryId.replace("#", "util") + '.Table = ' + this.Name  + ';\n';
                                instructs += '' +  this.JqueryId.replace("#", "util") + '.MproTag = "' + this.getPrivateAttrs()[3].Data  + '";\n';
                        }
                        
                        var me = this;
                        setTimeout(function()
                        {
                                tTmp = new Table(me.JqueryId + "Items");
                                me.setCollums(me.getPrivateAttrs()[1].Data);
                        }, 200);
                        
                return code;
        };
}

// Herança
GTable.prototype = new Objetos();