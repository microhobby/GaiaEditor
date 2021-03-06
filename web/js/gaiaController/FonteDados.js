
/* *
 * Classe para Fonte de Dados
 * @return {FonteDados}
 */
function FonteDados(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "FonteDados";
        this.JqueryId = "#FonteDados" + this.Id;
        this.Text = "Seu Texto aqui...";
        this.Name = "FonteDados" + this.Id;
        
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
        
        this.getPrivateAttrs().push(new SpecialAttrs("Entidade", "objCombo", "setEntidade", null, "modelEntities"));
        this.getPrivateAttrs().push(new SpecialAttrs("Quantidade Maxima", "objNumber", "setMax", 100));
        this.getPrivateAttrs().push(new SpecialAttrs("Comece do número", "objNumber", "setBegin", 0));
        this.getPrivateAttrs().push(new SpecialAttrs("Filtros", "objText", "setWhere", ""));
        this.getPrivateAttrs().push(new SpecialAttrs("Ordenar", "objText", "setOrdBy", ""));
        
        this.setWhere = function(where)
        {
                this.getPrivateAttrs()[3].Data = where;
        };
        
        this.setEntidade = function(entityName)
        {
                this.getPrivateAttrs()[0].Data = entityName;
        };
        
        this.setMax = function(max)
        {
                this.getPrivateAttrs()[1].Data = max;
        };
        
        this.setBegin = function(beg)
        {
                this.getPrivateAttrs()[2].Data = beg;
        };
        
        this.setOrdBy = function(ordBy)
        {
                this.getPrivateAttrs()[4].Data = ordBy;
        };
        
        //@override
        this.returnCode = function(flag, isPreview)
        {
                // zera
                vars = "";
                instructs = "";
                
                var code = "";
                
                if(!flag)
                {
                        /*code += "<script>\n";*/
                        /*code += "var "+ this.Name + " = new Array();\n var threadRunned" + this.Name 
                                + " = false;\n var thread" + this.Name + " = new Thread(function(){\n";
                        code += "" + this.Name + " = MproEntity.getAll(" + this.getPrivateAttrs()[0].Data + ", [" + this.getPrivateAttrs()[2].Data + ","
                                        + this.getPrivateAttrs()[1].Data + "]);\n thread" + this.Name + ".stop();\n threadRunned" + this.Name 
                                + " = true;";
                        code += "});\n thread" + this.Name + ".run();";*/
                        /*code += "var " + this.Name + " = new DBsource(" 
                                                        + this.getPrivateAttrs()[0].Data + ","
                                                        + this.getPrivateAttrs()[1].Data + ", "
                                                        + this.getPrivateAttrs()[2].Data + ", '"
                                                        + this.getPrivateAttrs()[3].Data +"');\n";
                        code += "</script>\n";*/
                        vars += "var " + this.Name + " = new DBsource(" 
                                                        + this.getPrivateAttrs()[0].Data + ","
                                                        + this.getPrivateAttrs()[1].Data + ", "
                                                        + this.getPrivateAttrs()[2].Data + ", '"
                                                        + this.getPrivateAttrs()[3].Data +"','"
                                                        + this.getPrivateAttrs()[4].Data + "');\n";
                        instructs += "" + this.Name + ".getData();\n";
                }
                else
                {
                        code += '<div id="FonteDados' + this.Id + '" class="badWolf" style="width: 1px; height: 1px; \n' +
                                        'position: absolute; left: ' + this.L + 'px; top: ' + this.T + 'px; z-index: ' + this.Zindex + ';' +
                                        '"><img src="../img/db_blank16.png" ></img></div>';
                }
                
                return code;
        };
}

// Herança
FonteDados.prototype = new Objetos();