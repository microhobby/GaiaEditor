
function MproChart(elem, type)
{
        /** 
         * @type $ 
         */
        var _jqueryElem = elem;
        var _type = type;
        var _context = $(elem).find("canvas").get(0).getContext("2d");
        
        var _labels = [];
        var _data = [[]];
        var __chart = null;
        var __charDatasets = [];
        var __colors = [];
        
        var __charData = {
                labels : _labels,
                datasets : __charDatasets
        };
        
        var Source = [];
        var Field = "";
        var me = this;
        
        var __charOptions = { bezierCurve : false};
        
        this.setDrawPoint = function(bool)
        {
                __charOptions.pointDot = bool;
        };
        
        this.setColor = function(color, datasetIndex)
        {
                __colors[datasetIndex] = color;
        };
        
        /**
         * FROM STACK OVERFLOW http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
         */
        function hexToRgb(hex) 
        {
                // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
        }
        
        this.drawChart = function()
        {
                 __charDatasets = [];
                 __charData = {
                        labels : _labels,
                        datasets : __charDatasets
                };
                
                for(var i = 0; i < _data.length; i++)
                {
                        var corTmp = null;
                        if(__colors[i] !== undefined)
                                corTmp = hexToRgb(__colors[i]);
                        
                       __charDatasets.push
                       (
                               {
                                        fillColor : corTmp ? "rgba(" + corTmp.r + ", "+ corTmp.g + ", " + corTmp.b + ", 0.5)" : "rgba(220,220,220,0.5)",
                                        strokeColor : corTmp ? "rgba(" + corTmp.r + ", "+ corTmp.g + ", " + corTmp.b + ", 1)" : "rgba(220,220,220, 1)",
                                        pointColor : corTmp ? "rgba(" + corTmp.r + ", "+ corTmp.g + ", " + corTmp.b + ", 1)" : "rgba(220,220,220, 1)",
                                        pointStrokeColor : "#fff",
                                        data : _data[i]
                                }
                       ); 
                }
                
                if(__chart !== null)
                        __chart[type](__charData, __charOptions);
                else
                {
                        __chart = new Chart(_context);
                        __chart[type](__charData, __charOptions);
                }
        };
        
        this.clearPoints = function()
        {
                _labels = [];
                _data = [];
        };
        
        this.addPoint = function(obj, datasetIndex)
        {
                if(_labels.indexOf(obj.label) === -1)
                        _labels.push(obj.label);
                
                if(_data[datasetIndex] instanceof Array)
                        _data[datasetIndex].push(obj.value);
                else
                {
                        _data[datasetIndex] = [];
                        _data[datasetIndex].push(obj.value);
                }
                //this.DrawChart();
        };
        
        function arrange(datasetIndex)
        {      
                if(Source[datasetIndex] && Source[datasetIndex].Data.length)
                {
                        me.clearPoints();
                         _data[datasetIndex] = new Array();
                        for(var i = 0; i < Source[datasetIndex].Data.length; i++)
                        {
                                _labels.push(i);
                                 _data[datasetIndex].push(Source[datasetIndex].Data[i][Field]);
                        }
                        me.drawChart();
                }
        }
        
        /**
         * @param {DBsource} model
         */
        this.setDBsource = function(model, datasetIndex)
        {
                Source[datasetIndex] = model;
                //Source[datasetIndex](model);
                //var this = this;
                Source[datasetIndex].setListener(function()
                {
                        arrange(datasetIndex);
                });
        };
        
        this.setSourceArray = function(data, datasetIndex)
        {
                Source[datasetIndex] = data;
                arrange(datasetIndex);
        };
        
        this.setFieldMap = function(field)
        {
                Field = field;
        };
};


