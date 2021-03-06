
/**
 * Declaração da Classe de Utils do teclado
 * @returns {KeyBoardUtils}
 */
function KeyBoardUtils()
{
        var _eventsDelete = new Array();
        var _eventsZ = new Array();
        var _eventsY = new Array();
        var _eventsUp = new Array();
        var _eventsDown = new Array();
        var _eventsLeft = new Array();
        var _eventsRight = new Array();
        var _eventsCopy = new Array();
        var _eventsPaste = new Array();
        var _eventsNew = new Array();
        
        window.onkeyup = function(event)
        {
                if((event.target.nodeName !== "INPUT") && (event.target.nodeName !== "TEXTAREA") && (event.target.nodeName !== "SELECT"))
                {
                        //console.log(event);
                        if(event.keyCode === 46) // delete
                        {
                                console.log("DELETA");
                                for(var i = 0; i < _eventsDelete.length; i++)
                                {
                                        _eventsDelete[i]();
                                }
                        }
                        else if(event.ctrlKey && (event.keyCode === 67)) // copy
                        {
                                console.log("COPIA");
                                for(var i = 0; i < _eventsCopy.length; i++)
                                {
                                        _eventsCopy[i]();
                                }
                        }
                        else if(event.ctrlKey && (event.keyCode === 86)) // paste
                        {
                                console.log("COLA");
                                for(var i = 0; i < _eventsPaste.length; i++)
                                {
                                        _eventsPaste[i]();
                                }
                        }
                        else if(event.ctrlKey && (event.keyCode === 90)) // ctr-z
                        {
                                console.log("UNDO");
                                for(var i = 0; i < _eventsZ.length; i++)
                                {
                                        _eventsZ[i]();
                                }
                        }
                        else if(event.ctrlKey && (event.keyCode === 89)) // ctr-y
                        {
                                console.log("BACK");
                                for(var i = 0; i < _eventsY.length; i++)
                                {
                                        _eventsY[i]();
                                }
                        }
                        else if(event.ctrlKey && (event.keyCode === 88)) // ctrl-x copy between pages
                        {
                                console.log("NEW");
                                for(var i = 0; i < _eventsNew.length; i++)
                                {
                                        _eventsNew[i]();
                                        event.preventDefault();
                                }
                        }
                }
        };
        
        window.onkeydown = function(event)
        {
                if((event.target.nodeName !== "INPUT") && (event.target.nodeName !== "TEXTAREA") && (event.target.nodeName !== "SELECT"))
                {
                        //if(event.keyIdentifier === "Down")
                        if(event.keyCode === 40)
                        {
                                console.log("BAIXO");
                                for(var i = 0; i < _eventsDown.length; i++)
                                {
                                        _eventsDown[i]();
                                }
                        }
                        else if(event.keyCode === 38) //if(event.keyIdentifier === "Up")
                        {
                                console.log("CIMA");
                                for(var i = 0; i < _eventsUp.length; i++)
                                {
                                        _eventsUp[i]();
                                }
                        }
                        else if(event.keyCode === 37) //if(event.keyIdentifier === "Left")
                        {
                                console.log("ESQUERDA");
                                for(var i = 0; i < _eventsLeft.length; i++)
                                {
                                        _eventsLeft[i]();
                                }
                        }
                        else if(event.keyCode === 39) //if(event.keyIdentifier === "Right")
                        {
                                console.log("DIREITA");
                                for(var i = 0; i < _eventsRight.length; i++)
                                {
                                        _eventsRight[i]();
                                }
                        }
                        event.preventDefault();
                }
        };
        
        this.onDeletePressed = function(func)
        {
                _eventsDelete.push(func);
        };
        
        this.onCtrZPressed = function(func)
        {
                _eventsZ.push(func);
        };
        
        this.onCtrYPressed = function(func)
        {
                _eventsY.push(func);
        };
        
        this.onUpPressed = function(func)
        {
                _eventsUp.push(func);
        };
        
        this.onDownPressed = function(func)
        {
                _eventsDown.push(func);
        };
        
        this.onLeftPressed = function(func)
        {
                _eventsLeft.push(func);
        };
        
        this.onRightPressed = function(func)
        {
                _eventsRight.push(func);
        };
        
        this.onCtrCPressed = function(func)
        {
                _eventsCopy.push(func);
        };
        
        this.onCtrVPressed = function(func)
        {
                _eventsPaste.push(func);
        };
        
        this.onCtrNPressed = function(func)
        {
                _eventsNew.push(func);
        };
}