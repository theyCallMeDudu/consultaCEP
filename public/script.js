var estado = document.getElementById('estado');
var cidade = document.getElementById('cidade');
var bairro = document.getElementById('bairro');
var logradouro = document.getElementById('endereco');
var complemento = document.getElementById('complemento');
var mensagemErro = document.getElementById('erro');

document.addEventListener('DOMContentLoaded', function() {
    var inputCEP = document.getElementById('cep');
    
    inputCEP.addEventListener('input', function() {
        var valorDigitado = this.value;
        var valorNumerico = valorDigitado.replace(/[^0-9]/g, '');
        this.value = valorNumerico;
        
        if (valorDigitado.length === 8 && valorDigitado.length > 0) {
            mensagemErro.innerHTML = "";
            buscaEndereco(valorNumerico);
        } else {
            estado.innerHTML = "";
            cidade.innerHTML = "";
            bairro.innerHTML = "";
            logradouro.innerHTML = "";
            complemento.innerHTML = "";
            mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
        }
        
        if (valorDigitado.length === 0) {
            estado.innerHTML = "";
            cidade.innerHTML = "";
            bairro.innerHTML = "";
            logradouro.innerHTML = "";
            complemento.innerHTML = "";
            mensagemErro.innerHTML = "";
        }
    });
});

async function buscaEndereco(cep) {    
    const carregando = document.getElementById('carregando');
    carregando.style.display = 'flex';

    mensagemErro.innerHTML = "";

    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();

        // Aguarda 3 segundos antes de continuar
        await new Promise(resolve => setTimeout(resolve, 2000));
        carregando.style.display = 'none';

        if (consultaCEPConvertida.erro) {
            throw Error('O CEP informado não existe!');
        }

        estado.innerHTML = consultaCEPConvertida.uf;
        cidade.innerHTML = consultaCEPConvertida.localidade;
        bairro.innerHTML = consultaCEPConvertida.bairro;
        logradouro.innerHTML = consultaCEPConvertida.logradouro;
        complemento.innerHTML = consultaCEPConvertida.complemento;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>O CEP informado não existe! Tente novamente!</p>`;
        estado.innerHTML = "";
        cidade.innerHTML = "";
        bairro.innerHTML = "";
        logradouro.innerHTML = "";
        complemento.innerHTML = "";
        console.log(cep, erro, consultaCEP, consultaCEPConvertida);
    }
}

// var cep = document.getElementById('cep');
// console.log(cep);
// cep.addEventListener("focusout", () => buscaEndereco(cep.value));