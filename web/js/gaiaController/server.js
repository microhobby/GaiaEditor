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
                LogedUser.Projetos.push(new Projeto($("#nameProjectText").val(), 
                                        parseFloat($("#alturaProjectText").val()), parseFloat($("#larguraProjectText").val()),
                                        $("#obsProjectText").val()));
                $.ajax({
                            async: true,
                            type:'post',
                            cache:false,
                            url: slice_url,
                            data: {user: JSON.stringify(LogedUser), method: "newProject"},
                            success: function(data)
                            {
                                      console.log(data);
                                      result1 = data;
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

