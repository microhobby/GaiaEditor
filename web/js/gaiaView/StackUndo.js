
/**
 * Declaração da Classe de pilhas para elementos
 * @returns {StackUndo}
 */
function StackUndo()
{
        var _momentumsZ = new Array();
        var _momentumsY = new Array();
        
        this.makeMomentumZ = function(obj)
        {
                _momentumsZ.push($.extend(new Array(), obj));
        };
        
        this.makeMomentumY = function(obj)
        {
                _momentumsY.push($.extend(new Array(), obj));
        };
        
        this.getMomentumZ = function(obj)
        {
                var tmp = _momentumsZ.pop();
                this.makeMomentumY(obj);
                return tmp;
        };
        
        this.getMomentumY = function(obj)
        {
                var tmp = _momentumsY.pop();
                this.makeMomentumZ(obj);
                return tmp;
        };
}
