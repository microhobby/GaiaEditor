
/**
 * Classe que retorna HTML de button
 * @returns {GButton}
 */
function GButton(largura, altura, topo, esquerda, visivel)
{
        var instructs = "";
        var vars = "";
        
        this.init(largura, altura, topo, esquerda, visivel);

        this.ClassType = "GButton";
        this.Name = "GButton" + this.Id;
        this.JqueryId = "#cont_bt" + this.Id;
        this.Text = "Ok";
        this.SizeFont = 15;
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
        this.canCreateVar = function()
        {
                return false;
        };
        
        this.calculeHexHUE = function()
        {
                return (parseInt(this.Cb.substr(1, this.Cb.length), 16) + 1186337).toString(16);
        }
        
        this.returnCode = function(flag, isPreview)
        {
                // zera
                vars = "";
                instructs = "";
                
                 if(flag === undefined)
                        flag = false;
                if(isPreview === undefined)
                        isPreview = false;
                
                var code;
                var display = "none";
                var italico = "italic";
                var negrito = "bold";
                var subline = "underline";
                var recursoInt = this.recurso;
                var position = "absolute";
                var width = "";
                var height = "";
                
                if(this.StaticPos)
                {
                        width = this.W + "px";
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
                
                
                code =    '\n<div id="cont_bt' + this.Id +'"\n' +
                                ' class="GButton badWolf" style="display: ' + display + '; position:' + position + ';\n' +
                                ' left: ' + this.L + 'px; top: ' + this.T + 'px; ' +
                                ' height: ' + height + '; width: ' + width + '; \n' +
                                ' padding: ' + this.P + "px; \n" +
                                ' -webkit-border-radius: ' + this.R + 'px;\n' +
                                ' border-radius: ' + this.R + 'px; opacity: ' + (this.Opacity / 100) + ';\n' +
                                ' -webkit-box-shadow: 9px 20px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' -moz-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' -o-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' -ms-box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + ';\n' +
                                ' box-shadow: 9px 14px 18px ' + this.S + 'px ' + this.Cs + '; z-index: '+this.Zindex+';' +
                                ' -webkit-transform: rotate(' + this.A + 'deg);\n' +
                                ' -moz-transform: rotate(' + this.A + 'deg);\n' +
                                ' -o-transform: rotate(' + this.A + 'deg);\n' +
                                ' -ms-transform: rotate(' + this.A + 'deg);\n' +
                                ' transform: rotate(' + this.A + 'deg);\n' +
                                ' color: ' + this.Cf + '; font-size: ' + this.SizeFont + 'px; font-family: ' + this.Font + ';\n' +
                                ' font-style: ' + italico + '; font-weight: ' + negrito + '; text-decoration: ' + subline + ';\n' +
                                '" class="">\n' +
                                '<style id="btDinamic' + this.Id + '"> #bt' + this.Id + '{\n' +
                                'background-image: -webkit-gradient(linear, left 0%, left 100%, from(#' + this.calculeHexHUE() + '), to(' + this.Cb + '));\n'+
                                'background-image: -webkit-linear-gradient(top, #' + this.calculeHexHUE() + ', 0%, ' + this.Cb + ', 100%);\n'+
                                'background-image: -moz-linear-gradient(top, #' + this.calculeHexHUE() + ' 0%, ' + this.Cb + ' 100%);\n'+
                                'background-image: linear-gradient(to bottom, #' + this.calculeHexHUE() + ' 0, ' + this.Cb + ' 100%); \n'+
                                'background-repeat: repeat-x;\n' +
                                'border-color: ' + this.Cb + ';\n' +
                                'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr= \'#ff'+  this.calculeHexHUE() + '\', endColorstr=\'#ff' + this.Cb.replace("#", "") + '\', GradientType=0);\n' +
                                '} \n'+
                                '#bt' + this.Id + ':active { background-color: ' + this.Cb + '; background-image: none;}' +
                                '</style>' +
                                '	<button id="bt'+this.Id+'" class="btn btn-primary buttonOk" style="'+
                                'font-size: inherit; font-family: inherit; font-style: inherit; font-weight: inherit; text-decoration: inherit; ' +
                                'color: inherit; background-color: ' + this.Cb + ';"><i class="glyphicon "><img id="cont_img' + this.Id + '" src="' +
                                                (this.recurso !== null ?  
                                                this.GetFileResource(recursoInt) : "../img/blank.gif") + '" width="100%" height="100%" /></i><span id="textHere">' + this.Text + '</span></button>\n' +
                                '</div>\n\n';
                        
                        vars += 'var ' + this.Name + ' = $("' + this.JqueryId + '");\n';
                        instructs += '' + this.Name + '.text = function(t){ return (t != undefined ? $("' + this.JqueryId + '").find("#textHere").html(t) : $("' + this.JqueryId + '").find("#textHere").html()) }\n;';
                        instructs += '' + this.Name + '.click = function(fun){  if(fun != undefined){ $("' + this.JqueryId + '").click(fun); } };\n';

                return code;
        }
}

// Herança
GButton.prototype = new Objetos();