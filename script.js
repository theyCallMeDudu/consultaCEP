async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();

        if (consultaCEPConvertida.erro) {
            throw Error('O CEP informado não existe!');
        }
        var estado = document.getElementById('estado');
        var cidade = document.getElementById('cidade');
        var bairro = document.getElementById('bairro');
        var logradouro = document.getElementById('endereco');

        estado.innerHTML = consultaCEPConvertida.uf;
        cidade.innerHTML = consultaCEPConvertida.localidade;
        bairro.innerHTML = consultaCEPConvertida.bairro;
        logradouro.innerHTML = consultaCEPConvertida.logradouro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
        estado.innerHTML = "";
        cidade.innerHTML = "";
        bairro.innerHTML = "";
        logradouro.innerHTML = "";
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
console.log(cep);
cep.addEventListener("focusout", () => buscaEndereco(cep.value));