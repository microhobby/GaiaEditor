
/* *
 * Classe para Text Editor
 * @return {GTextEditor}
 */
function GTextEditor(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GTextEditor";
        this.JqueryId = "#GTextEditor" + this.Id;
        this.Text = "Seu Texto aqui...";
        this.Name = "GTextEditor" + this.Id;
        
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
        this.canCreateVar = function()
        {
                return false;
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
                        for(var i = 0; i < privateAttrs.length; i++)
                        {
                                this[privateAttrs[i].Method](privateAttrs[i].Data);
                        }
                }
        };
        
        //@override
        this.parseSpecialFields = function()
        {
                this.SpecialFields = JSON.stringify(privateAttrs);
        };
        
        this.getPrivateAttrs().push(new SpecialAttrs("MproTag", "objText", "setMproTag", ""));
        
        this.setMproTag = function(tag)
        {
                this.getPrivateAttrs()[0].Data = tag;
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
                
                code =	'\n<div fonte="' + this.Text + '" id="GTextEditor' + this.Id + '"\n' +
                                                ' class="GTextEditor badWolf" style="display:' + display + '; position:' + position + '; \n' +
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
                                                ' z-index: '+this.Zindex+';" class="things" mprotag="'
                                                + this.getPrivateAttrs()[0].Data
                                                +'">\n' +
                                                '<div id="GTextEditor' + this.Id + 'Container"></div>'
                                                +'</div>\n';
                
                if(!flag)
                {           
                        vars +=           'var ' + this.Name + ' = $("#GTextEditor' + this.Id + 'Container");\n';
                                        
                        instructs +=   '' + this.Name + '.summernote({ height: "68%", focus: true});\n';
                        instructs += '' + this.Name + '.code("' + this.Text + '");';
                }
                
                var me = this;
                
                setTimeout(function()
                {
                        $("#GTextEditor" + me.Id + "Container").summernote();
                        $("#GTextEditor" + me.Id + "Container").code(me.Text);
                }, 500);
                
                return code;
        };
}

// Herança
GTextEditor.prototype = new Objetos();