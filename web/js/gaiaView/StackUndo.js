
/**
 * Declaração da Classe de pilhas para elementos
 * @returns {StackUndo}
 */
function StackUndo()
{
        var _momentumsZ = new Array();
        var _momentumsY = new Array();
        
        /**
         * 
         * @param {Array} stack
         */
        function stackOverFlow(stack)
        {
                if(stack.length > 100)
                {
                        stack.splice(0, 1);
                }
        }
        
        this.makeMomentumZ = function(obj)
        {
                var moTmp = new Array();
                $.each(obj, function(i, obj)
                {
                        obj.parseSpecialFields();
                        moTmp.push($.extend(true, new window[obj.ClassType](), obj));
                        Objetos.counterId--;
                });
                _momentumsZ.push(moTmp);
                stackOverFlow(_momentumsZ);
        };
        
        this.makeMomentumY = function(obj)
        {
                var moTmp = new Array();
                $.each(obj, function(i, obj)
                {
                        obj.parseSpecialFields();
                        moTmp.push($.extend(true, new window[obj.ClassType](), obj));
                        Objetos.counterId--;
                });
                _momentumsY.push(moTmp);
                stackOverFlow(_momentumsY);
        };
        
        this.actDeletedItemInZ = function(obj)
        {
                obj.Deleted = true;
                $.each(_momentumsZ, function(i, arr)
                {
                        obj.parseSpecialFields();
                        var tmpObj = $.extend(true, new window[obj.ClassType](), obj);
                        Objetos.counterId--;
                        arr.push(tmpObj);
                });
                obj.Deleted = false;
        };
        
        this.actDeletedItemIny = function(obj)
        {
                obj.Deleted = true;
                $.each(_momentumsY, function(i, arr)
                {
                        obj.parseSpecialFields();
                        var tmpObj = $.extend(true, new window[obj.ClassType](), obj);
                        Objetos.counterId--;
                        arr.push(tmpObj);
                });
                obj.Deleted = false;
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
        
        this.verifiStackY = function()
        {
                return (_momentumsY.length > 0 ? true : false);
        };
        
        this.verifiStackZ = function()
        {
                return (_momentumsZ.length > 0 ? true : false);
        };
}
