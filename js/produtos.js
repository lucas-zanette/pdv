$(function(){

    $("#preco").mask("000.00");

    listarProdutos();

    $("#salvar-produto").click(function(){

        if ($('#nome').val().length <= 0){

            $('#nome').addClass('is-invalid');
            return false;
        }
        
        if ($('#marca').val() == 0){

            $('#marca').addClass('is-invalid');
            return false;
        }
        
        if ($('#preco').val() <= 0){

            $('#preco').addClass('is-invalid');
            return false;
        }

        var dados = {
            produto: $('#nome').val(),
            marca: $('#marca').val(),
            categora: $('#categora').val(),
            preco: $('#preco').val(),
            sexo: $('input[name=sexo]:checked').val(),
            id: $('#id').val(),
        };

        var tipo = $(this).attr("tipo");
        var url = (tipo == "editar") ? '/model/edita-produto.php' : '/model/insere-produto.php';        

        $.post(url, dados, function(info){
            if (info == "ok") {
                $("#novo-produto").modal("hide");
                listarProdutos();
            } else {
                $('#msg-erro').html(info);
                $('#msg-erro').show();
            }
        });
    }); // fim do click #salvar-produto

    $('#lista-produtos tbody').on('click', '.btn-deletar-produto', function(){
        var codigo = $(this).parent().parent().attr('codigo');
        $('#btn-del').attr('href', '/model/deleta-produto.php?id=' + codigo);
        $("#deletar-produto").modal('show');
    });  //btn-deletar-produto

    $('#lista-produtos tbody').on('click', '.btn-editar-produto', function(){
        var codigo = $(this).parent().parent().attr('codigo');
        $("#salvar-produto").attr('tipo', 'editar');        

        $.getJSON('/model/carrega-produto.php', {"id": codigo}, function(val) {  //val retorna o valor do json no momento que clica no editar
            $("#novo-produto").modal('show');
           // console.log(val);

            $('#nome').val(val.nome);
            $('#marca').val(val.marca);
            $('#categora').val(val.categora);
            $('#sexo').val(val.sexo);
            $('#preco').val(val.preco);
            $("#id").val(codigo);

            $('input[name=sexo]').each(function(i, el) {
                if(val.sexo == $(el).val()) {
                    $(el).prop("checked", "checked")
                }
            }); //fim do each
        }); //fim do getJson
    }); //fim btn-editar-produto

    $("#btn-novo").click(function(){
        $("#novo-produto").modal('show');
        $('input[type=text]').val();
        $('select').val(0);
        $('input[type=radio]:checked').removeProp('checked', false);

        $('#salvar-produto').attr('tipo', 'novo');
    });

    $('.btn-ord').click(function(){
        listarProdutos(this).attr('coluna');
    });

});

function listarProdutos(coluna){
    $.getJSON('/model/listar-produtos.php', { ordem: coluna }, function(dados){
        $('#lista-produtos tbody').empty();
        dados.forEach(function(el, id){
            
            var tr = '<tr codigo="'+ el.id +'">'
                    +'<td>'+ el.id +'</td>'
                    +'<td>'+ el.nome +'</td>'
                    +'<td>'+ el.categora +'</td>'
                    +'<td>R$ '+ el.preco +'</td>'
                    +'<td> '
                        +'<button class="btn btn-primary btn-editar-produto" title="Editar"><i class="fas fa-edit"></i></button>'
                        +'<button class="btn btn-danger btn-deletar-produto"  title="Deletar"><i class="fas fa-minus-circle"></i></button>'
                    +'</td>'
                +'</tr>';

            $('#lista-produtos tbody').append(tr);
        });// forEach
    });// getJSON
}