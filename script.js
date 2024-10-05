$(document).ready(function() {
    // Variável para armazenar o item a ser removido
    let itemParaRemover;

    // Função para exibir a notificação
    function exibirNotificacao(mensagem) {
        // Define a mensagem a ser exibida na notificação
        $('#notificacao').text(mensagem).fadeIn();
        
        // Esconde a notificação após 3 segundos
        setTimeout(function() {
            $('#notificacao').fadeOut();
        }, 3000);
    }

    // Função para atualizar o contador de itens
    function atualizarContador() {
        // Conta a quantidade de itens na lista
        let totalItens = $('#listaItens ul li').length;
        // Atualiza o texto do contador na página
        $('#totalItens').text(totalItens); // Ajustei para usar o ID correto
    }

    // Função para salvar a lista no Local Storage
    function salvarLista() {
        let itens = [];
        // Percorre cada item na lista e o adiciona ao array
        $('#listaItens ul li').each(function() {
            let itemTexto = $(this).find('.itemTexto').text();
            itens.push(itemTexto);
        });
        // Salva o array de itens no Local Storage
        localStorage.setItem('listaItens', JSON.stringify(itens));
    }

    // Função para carregar a lista do Local Storage
    function carregarLista() {
        // Verifica se há itens salvos no Local Storage
        let itensSalvos = localStorage.getItem('listaItens');
        if (itensSalvos) {
            // Converte a string JSON de volta para um array
            let itens = JSON.parse(itensSalvos);
            // Percorre os itens e os adiciona à lista
            itens.forEach(function(item) {
                let itemComBotoes = `
                    <li>
                        <span class="itemTexto">${item}</span> 
                        <button class="editarItem">Editar</button> 
                        <button class="removerItem">Remover</button>
                    </li>`;
                $('#listaItens ul').append(itemComBotoes);
            });
            // Atualiza o contador de itens
            atualizarContador();
        }
    }

    // Função para adicionar um novo item à lista
    $('#adicionarItem').click(function() {
        // Pega o valor do campo de entrada
        let novoItem = $('#novoItem').val();

        // Verifica se o campo não está vazio
        if (novoItem.trim() !== "") {
            // Cria um novo <li> com botões "Editar" e "Remover"
            let itemComBotoes = `
                <li>
                    <span class="itemTexto">${novoItem}</span> 
                    <button class="editarItem">Editar</button> 
                    <button class="removerItem">Remover</button>
                </li>`;

            // Adiciona o novo <li> à lista
            $('#listaItens ul').append(itemComBotoes);

            // Limpa o campo de entrada
            $('#novoItem').val('');

            // Exibe a notificação
            exibirNotificacao('Item adicionado!');

            // Atualiza o contador de itens
            atualizarContador();

            // Salva a lista no Local Storage
            salvarLista();
        } else {
            alert('Por favor, insira um item.'); // Alerta se o campo estiver vazio
        }
    });

    // Função para remover o item ao clicar no botão "Remover"
    $('#listaItens').on('click', '.removerItem', function() {
        // Armazena o item a ser removido
        itemParaRemover = $(this).parent();

        // Mostra o modal de confirmação
        $('#modalConfirmacao').fadeIn();
    });

    // Função para confirmar a remoção do item
    $('#confirmarRemocao').click(function() {
        // Remove o <li> correspondente ao botão clicado
        itemParaRemover.remove();

        // Esconde o modal
        $('#modalConfirmacao').fadeOut();

        // Exibe a notificação
        exibirNotificacao('Item removido!');

        // Atualiza o contador de itens
        atualizarContador();

        // Salva a lista no Local Storage
        salvarLista();
    });

    // Função para cancelar a remoção do item
    $('#cancelarRemocao').click(function() {
        // Esconde o modal
        $('#modalConfirmacao').fadeOut();
    });

    // Função para editar o item ao clicar no botão "Editar"
    $('#listaItens').on('click', '.editarItem', function() {
        // Pega o texto atual do item
        let itemTexto = $(this).siblings('.itemTexto').text();

        // Substitui o texto por um campo de entrada com o texto atual
        let campoEdicao = `
            <input type="text" class="campoEdicao" value="${itemTexto}">
            <button class="salvarItem">Salvar</button>`;
        
        // Atualiza o conteúdo do <li> para o campo de edição
        $(this).parent().html(campoEdicao);
    });

    // Função para salvar a edição do item
    $('#listaItens').on('click', '.salvarItem', function() {
        // Pega o valor digitado no campo de edição
        let novoTexto = $(this).siblings('.campoEdicao').val();

        // Substitui o campo de edição pelo novo texto e restaura os botões
        let itemEditado = `
            <span class="itemTexto">${novoTexto}</span> 
            <button class="editarItem">Editar</button> 
            <button class="removerItem">Remover</button>`;
        
        // Atualiza o conteúdo do <li> para o item editado
        $(this).parent().html(itemEditado);

        // Exibe a notificação
        exibirNotificacao('Item editado!');

        // Salva a lista no Local Storage
        salvarLista();
    });

    // Função para alternar entre temas claro e escuro
    $('#mudarTema').click(function() {
        // Alterna as classes tema-escuro e tema-claro no <body> e no <header>
        $('body').toggleClass('tema-escuro tema-claro');
        $('header').toggleClass('tema-escuro tema-claro');
    });

    // Função para filtrar a lista de itens em tempo real
    $('#filtroPesquisa').on('input', function() {
        // Pega o texto do campo de pesquisa e o converte para minúsculas
        let filtro = $(this).val().toLowerCase();

        // Filtra os itens na lista
        $('#listaItens ul li').filter(function() {
            // Mostra apenas os itens que incluem o texto do filtro
            $(this).toggle($(this).text().toLowerCase().indexOf(filtro) > -1);
        });
    });

    // Carrega a lista ao iniciar a página
    carregarLista();

    // Atualiza o contador ao carregar a página
    atualizarContador();
});