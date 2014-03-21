/* 
 *  Objeto para loop de elementos
 *  Requer Jquery
 */

function Looper(obj)
{
        var elemDiv = obj.id;
        var time = obj.time;
        var vertical = obj.vertical;
        var childs = null;
        var pra = "+=";
        var offset = 10;
        
        if(obj.offset != undefined)
                offset = obj.offset;
        
       this.Refresh = function()
        {
                for(var i = 0; i < childs.length; i++)
                {
                       delete childs[i];
                }
                Loop();
        };
        
        var Loop = function()
        {
                var size;
                if(vertical)
                        size = $("#" + elemDiv).get(0).scrollWidth;
                else
                        size = $("#" + elemDiv).get(0).scrollHeight;
                
                childs = $("#" + elemDiv).children();
                
                for(var i = 0; i < childs.length; i++)
                {
                        childs[i].funTime = new newTimeGo();
                }
                childs[i] = {id: null};
                childs[i].funTime = new newTimeGo(); 
                
                for(var i = 0; i < childs.length; i++)
                {       
                        if(!vertical)
                        {
                                 if(i == (childs.length -2))
                                         if(i == 0)
                                                childs[i].funTime.setParameters($(childs[i]).height(), childs[0].funTime.exec, true, i);
                                        else
                                                childs[i].funTime.setParameters($(childs[i]).height(), childs[0].funTime.exec, undefined, i);
                                else if(i == 0)
                                        childs[i].funTime.setParameters($(childs[i]).height(), childs[i+1].funTime.exec, true, i);
                                else
                                        childs[i].funTime.setParameters($(childs[i]).height(), childs[i+1].funTime.exec, undefined, i);
                        }
                        else
                        {
                                if(i == (childs.length -2))
                                        if(i == 0)
                                                childs[i].funTime.setParameters($(childs[i]).width(), childs[0].funTime.exec, true, i);
                                        else
                                                childs[i].funTime.setParameters($(childs[i]).width(), childs[0].funTime.exec, undefined, i);
                                else if(i == 0)
                                        childs[i].funTime.setParameters($(childs[i]).width(), childs[i+1].funTime.exec, true, i);
                                else
                                        childs[i].funTime.setParameters($(childs[i]).width(), childs[i+1].funTime.exec, undefined, i);
                        }
                }
                
                if(childs.length)
                        childs[0].funTime.exec();
        };
        
        var newTimeGo = function()
        {       
                var size;
                var fun;
                var _pra;
                var ii;
                
                this.setParameters = function(_size, _fun, __pra, _ii)
                {
                        size = _size;
                        fun = _fun;
                        ii = _ii;
                        _pra = __pra;
                };
                
                this.exec = function()
                {
                        if(_pra != undefined)
                        {
                                pra = (pra == "+=" ? "-=" : "+=");
                        }
                        
                        if(vertical)
                                setTimeout(function()
                                {
                                        $("#" + elemDiv).animate(
                                        {
                                                left: pra + (size +offset)
                                        }, fun);
                                }, time);
                        else
                                setTimeout(function()
                                {
                                        $("#" + elemDiv).animate(
                                        {
                                                top: pra + (size +offset)
                                        }, fun);
                                }, time);
                };
        };
        
        // chama
        Loop();
}
