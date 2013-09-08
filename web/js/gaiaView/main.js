/* 
 * main for VIEW Gaia Editor
 */

$(document).ready(function()
{
        /**
         *  REDIMENSIONAMENTO DAS TOOLS
         */
        window.onresize = function()
        {
                $("#tool1").css("height", (document.documentElement.clientHeight / 2.2) -20);
                $("#tool1base").css("height", (document.documentElement.clientHeight / 2.2) -20);
                $("#tool1base").css("left", -195);
                $("#tool1Things").css("height", (document.documentElement.clientHeight / 2.2) -60);
                
                $("#tool2").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("top", parseInt($("#tool1").css("height")) + 10);
                $("#tool2base").css("left", -195);
                $("#tool2Things").css("height", (document.documentElement.clientHeight / 1.8) - 60);
                
                $("#tool3").css("height", document.documentElement.clientHeight -20);
                $("#tool3").css("left", document.documentElement.clientWidth -225);
                $("#tool3Things").css("height", document.documentElement.clientHeight - 60);
                
                $("#safiraInputContainer").css("top", document.documentElement.clientHeight - 40);
                $("#safiraInputContainer").css("left", document.documentElement.clientWidth - 670);
                
                goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        }
        window.onresize();
    
        /**
         *  TOOL1 MOUSEHOVER
         */
        $("#tool1base, #tool2base").mouseenter(function()
        {
                $(this).animate(
                {
                        left: -1
                }, 100);
        }).mouseleave(function()
        {
                $(this).animate(
                {
                        left: -195
                }, 100);
        });
        
        /**
         * FOCUS CMD SAFIRA
         */
        $("#cmdSafira").focus(function()
        {
                $(this).animate(
                {
                        boxShadow: "0px 3px 5px #888"
                });
        }).focusout(function()
        {
                $(this).animate(
                {
                        boxShadow: "0px 0px 0px #888"
                });
        })
        
});

/**
* ENTER NO INPUT SAFIRA
*/
function safiraEnter(ev)
{
        if(ev.keyCode == 13)
        {
                $("#cmdSafira").val("");
        }
}