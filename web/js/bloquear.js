//Páginas

function ir(url)
{
window.location = url;
}

//Bloqueador de Conteúdo
function down() { if (event.button==2) { /*alert("Esta pagina esta Protegida ! Todos os direitos reservados à UNIFENAS!");*/ } }
function up() { if (event.button==2) { /*alert("Esta pagina esta Protegida ! Todos os direitos reservados à UNIFENAS!");*/}}
document.onmousedown=down; document.onmouseup=up;
function MM_displayStatusMsg(msgStr) { //v1.0
status=msgStr;
document.MM_returnValue = true;}
function keypressed() { /*alert("Esta pagina esta Protegida ! Todos os direitos reservados à UNIFENAS!");*/ }
document.onkeydown=keypressed;

function down() { if (event.button==2) { /*alert("Esta pagina esta Protegida ! Todos os direitos reservados à UNIFENAS!");*/ } }
function up() { if (event.button==2) { /*alert("Esta pagina esta Protegida ! Todos os direitos reservados à UNIFENAS!");*/}}
document.onmousedown=down; document.onmouseup=up;
function MM_displayStatusMsg(msgStr) { //v1.0
status=msgStr;
document.MM_returnValue = true;}
function keypressed() { /*alert("Esta pagina esta Protegida ! Todos os direitos reservados à UNIFENAS!");*/ }
document.onkeydown=keypressed;


document.onselectstart = function(){return false}
