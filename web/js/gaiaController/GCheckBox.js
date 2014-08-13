
/* *
 * Classe para Input tipo CheckBox
 * @return {GCheckBox}
 */
function GCheckBox(largura, altura, topo, esquerda, visivel)
{
        var privateAttrs = new Array();
        var instructs = "";
        var vars = "";
        
        this.init(largura, altura, topo, esquerda, visivel);
        
        this.ClassType = "GCheckBox";
        this.JqueryId = "#GCheckBox" + this.Id;
        this.Text = "";
        this.Name = "GCheckBox" + this.Id;
        this.Cb = "transparent";
        
        this.parseRGB = function()
        {
                return parseInt(this.Cb.substring(1,3),16)+','+parseInt(this.Cb.substring(3,5),16)+','+parseInt(this.Cb.substring(5,7),16);
        };
        
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
                
                if(this.StaticPos)
                {
                        width = "auto";
                        position = "static";
                        height = this.H + "px";
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
                
                code =	'\n<div id="GCheckBox' + this.Id + '"\n' +
                                                ' class="badWolf" style="display:' + display + '; position: ' + position + '; \n' +
                                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; width: ' + width + '; \n' +
                                                ' height: ' + height + '; padding: ' + this.P + 'px;\n' + 
                                                ' /*background-color: ' + this.Cb + '; */ ' +
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
                                                ' z-index: '+this.Zindex+'; color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + '" mprotag="'
                                                + this.getPrivateAttrs()[0].Data
                                                +'">\n' +
                                                
                                                '<style id="inputDinamic' + this.Id + '">\n' +
                                                '#GCheckBox' + this.Id + 'input:focus{\n' +
                                                'border-color: rgba(' + this.parseRGB() + ', 0.8);\n' +
                                                //'box-shadow: 0 1px 1px rgba(#000, 0.075) inset, 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                                                'box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(' + this.parseRGB() + ', 0.6);\n' +
                                                'outline: 0 none;}\n' +
                                                '</style>\n' +
                                                
                                                '<table style="width: inherit; height: inherit; color: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit; text-decoration: inherit;">\n' +
                                                '<tbody style="width: inherit; height: inherit; color: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit; text-decoration: inherit;">\n' +
                                                '<tr style="width: inherit; height: inherit; color: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit; text-decoration: inherit;"><td style="width: 20%; height: 100%; margin: 0px">\n' +
                                                '<input id="GCheckBox' + this.Id + 'input" type="checkbox" class="form-control" style="height: inherit; margin: 0px;'+ 
                                                '"></td><td style="vertical-align: middle; color: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit; text-decoration: inherit;"><span id="label" style="padding: 5px; color: inherit; font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit;'+
                                                ' text-decoration: inherit;">' + this.Text + '</span>\n'+
                                                '</td></tr></tbody></table></div>';
                                                
                                                '</div>';
                
                vars += 'var ' + this.Name + ' = $("' + this.JqueryId + '");\n';
                
                instructs += '' + this.Name + '.text = function(t){ if(t != undefined) $(this).find("#label").html(t); else return $(this).find("#label").html(); };\n';
                instructs += '' + this.Name + '.check = function(t){ if(t != undefined) if(t == true) $("'+this.JqueryId+'input").attr("checked", "checked"); else  $("'+this.JqueryId+'input").removeAttr("checked"); else return $("'+this.JqueryId+'input").is(":checked"); };\n';
                
                return code;
        };
}

// Herança
GCheckBox.prototype = new Objetos();