<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
        <head>
                <title>IDE Gaia 2021</title>

                <link rel="stylesheet" href="../lib/codemirror.css">
                <link rel="stylesheet" href="../lib/show-hint.css">
                <script src="../lib/codemirror.js"></script>
                <script src="../lib/show-hint.js"></script>
                <script src="../lib/javascript-hint.js"></script>
                <script src="../js/javascript.js"></script>
                <script src="../lib/active-line.js"></script>
                <script src="../lib/matchbrackets.js"></script>
                <link rel="stylesheet" href="../css/default.css" />

                <!-- SCRIPTS -->
                
                <script src="../js/gaiaController/Chatterbot.js" type="text/javascript"> </script>
                
                 <!-- SCRIPTS -->
    <script src="../js/crypt.js" type="text/javascript"> </script>
	<script src="../js/jquery.js" type="text/javascript"> </script>
	<script src="../js/jqueryMobile.js" type="text/javascript"> </script>
	<script src="../js/jqueryUI.js" type="text/javascript"> </script>
    <script src="../js/jQueryRotate.js" type="text/javascript"> </script>
    <!--<script src="../js/jqueryWheel.js" type="text/javascript"> </script>-->
    <script src="../js/utils.js" type="text/javascript"> <script src="../js/Anima.js" type="text/javascript"> </script>
    <script type="text/javascript" src="../js/jquerycsstransform.js"> </script>
	<script type="text/javascript" src="../js/rotate3Di.js"> </script>
                      <script type="text/javascript" src="../js/iscroll.js"> </script>
	<script src="../js/gaiaView/Ajax.js" type="text/javascript"> </script>
	<script src="../js/gaiaController/Thread.js" type="text/javascript"> </script>
	<script src="../js/gaiaController/DBsource.js" type="text/javascript"> </script>
                      <script src="../js/MproEntity_1.js" type="text/javascript"> </script>
	<script src="../js/MproEntityRelation.js" type="text/javascript"> </script>
	<script src="../js/UserEntities.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/Lista.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/List.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/Combobox.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/Repeater.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/Table.js" type="text/javascript"> </script>
	<script src="../js/Chart.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/MproChart.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/Item.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/ItemModel.js" type="text/javascript"> </script>
	<script src="../js/gaiaView/FormCreator.js" type="text/javascript"> </script>
	<script src="../lib/app_1.js" type="text/javascript"> </script>
	
                        <script src="../dist/js/bootstrap.min.js"></script>
                       <script src="../dist/js/summernote.min.js"></script>
                               <script src="../js/looper.js" type="text/javascript"> </script>
                        <script src="../js/gaiaView/FileUpload.js" type="text/javascript"> </script>
                
                <style type="text/css">
                        .completions {
                        position: absolute;
                        z-index: 10;
                        overflow: hidden;
                        -webkit-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
                        -moz-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
                        box-shadow: 2px 3px 5px rgba(0,0,0,.2);
                      }
                      .completions select {
                        background: #fafafa;
                        outline: none;
                        border: none;
                        padding: 0;
                        margin: 0;
                        font-family: monospace;
                      }
                        .CodeMirror 
                        {
                                /*border-top: 1px solid black; 
                                border-bottom: 1px solid black;*/
                                font-size: 12px;
                                height: auto;
                        }
                        .CodeMirror-scroll {
                                height: 100%; overflow-y: auto; overflow-x: auto;
                        }
                </style>
        </head>

        <body>
                <!-- THE IDE -->
                <div>
<textarea id="code" name="code"></textarea>
                </div>

                <div id="htmlParse" style="display: none;"></div>
                
                <!--<script src="../lib/complete.js"></script>-->
                
                <!-- THE SCRIPT -->
                <script>
               
               var coords = 0;
                        
              var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true,
                extraKeys: {"Ctrl-Space": "autocomplete", "." : "autocomplete", "Space" : "autocomplete"},
                mode: {name: "javascript", globalVars: true}
              });

              CodeMirror.on(editor, "keydown", function(ed, ev)
              { 
                      if(ev.keyCode == 190)
                      {
                              ed.replaceRange(".", ed.getCursor(), ed.getCursor());
                      }
                      else if(ev.keyCode == 32 && (!ev.ctrlKey))
                      {
                              ed.replaceRange(" ", ed.getCursor(), ed.getCursor());
                      }
              });

              window.onfocus = function()
              {
                      coords = editor.getCursor();
              };

              window.onkeyup = function()
              {
                      coords = editor.getCursor();
                      try
                      {
                        window.eval(editor.getValue());
                      }
                      catch(e){}
              };

              //pega o codigo digitado
              function getText()
              {
                return editor.getValue();
              }
              //seta o código que esta no objeto
              function setText(str)
              {
                editor.setValue(str);
              }
              //adiciona fragmento de código pré definido
              function addFragment(str)
              {
                        editor.replaceRange((str + "\n"), coords);
              }
              // vamos colocar as UserEntities
              function setUserEntities(str)
              {
                      window.eval(str);
              }
              // colocar o c�digo tbm
              function setHtmlPageParsed(obj)
              {
                      $("#htmlParse")[0].innerHTML = "";
                      $("#htmlParse")[0].innerHTML += obj.Rodape;
                      $("#htmlParse")[0].innerHTML += obj.Topo;
                
                      for(var i = 0; i < obj.Paginas.length; i++)
                      {
                              $("#htmlParse")[0].innerHTML += obj.Paginas[i];
                      }
                      
                        var arr = $("#htmlParse")[0].getElementsByTagName('script')
                        for (var n = 0; n < arr.length; n++)
                                try { window.eval(arr[n].innerHTML); } catch(e) {} //run script inside div
              }
        </script>

                
        </body>
</html>