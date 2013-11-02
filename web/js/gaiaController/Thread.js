
/**
 * Thread ???
 * @returns {Thread}
 */
function Thread(func)
{
        'use strict';
        var _func = func;
        var _timePtr = null;
        
        /**
         * Começa a nossa Thread
         */
        this.run = function()
        {
                _timePtr = setInterval(func, 0);
        };
        
        /**
         * Para nossa Thread
         */
        this.stop = function()
        {
                clearInterval(_timePtr);
        };
}