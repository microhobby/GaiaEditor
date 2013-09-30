/* 
 * Metodos AJAX
 */

function newProject()
{
        // Testa a integridade das informações
        if($("#nameProjectText").val() != ""
            && $("#alturaProjectText").val() != ""
            &&  $("#larguraProjectText").val() != "")
        {
                var ptrProject = new Projeto($("#nameProjectText").val(), 
                                        parseFloat($("#alturaProjectText").val()), parseFloat($("#larguraProjectText").val()),
                                        $("#obsProjectText").val());
                $.ajax({
                            async: true,
                            type:'post',
                            cache:false,
                            url: slice_url,
                            data: {user: LogedUser.cod, project: JSON.stringify(ptrProject), method: "newProject"},
                            success: function(data)
                            {
                                      console.log(data);
                                      var objData = JSON.parse(data);
                                      var pro = new Projeto(objData.data);
                                      LogedUser.Projetos.push(pro);
                                      
                                      unFlipWindowProjectsNew(flipWindowLayout);
                            },
                            error: function(data)
                            {
                                    console.log(data);
                            }
                });
        }
        else
                alert("Todos os campos devem ser preenchidos!");
}

