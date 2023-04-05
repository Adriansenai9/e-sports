class Validation {
    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-equal',
      ];
    }
  
    /* Inicia a validação de todos os elementos*/
    validate(form) {
      /* Pega as inputs*/
      let inputs = form.getElementsByTagName('input');
      let inputsArray = [...inputs];
  
      /* Loop nas inputs e validação mediante aos atributos encontrados*/
      inputsArray.forEach(function (input) {
        for (let i = 0; this.validations.length > i; i++) {
          if (input.getAttribute(this.validations[i]) !== null) {
            let method = this.validations[i].replace('data-', '').replace('-', '');
            let value = input.getAttribute(this.validations[i]);
  
            if (!this[method]) {
              alert(`Método ${method} não existe em Validation.`);
              return;
            }
  
            this[method](input, value);
          }
        }
      }, this);
    }
  
    /*Verifica se um input tem um número mínimo de caracteres*/
    minlength(input, minValue) {
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
  
      if (inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
    }
  
    /* Verifica se um input passou do limite de caracteres*/
    maxlength(input, maxValue) {
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
  
      if (inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
    }
  
    /* Valida se o campo tem apenas letras*/
    onlyletters(input) {
      let re = /^[A-Za-z]+$/;
  
      let inputValue = input.value;
      let errorMessage = `O campo só pode conter letras`;
  
      if (!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
    }
  
    /* Valida se um campo é um email válido*/
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
      let errorMessage = `Insira um email válido`;
  
      if (!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
    }
  
    /* Verifica se dois campos são iguais*/
    equal(input, inputName) {
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `Este campo precisa ser igual ao ${inputName}`;
  
      if (input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
  
    /* Exibe input com mensagem de erro*/
    printMessage(input, msg) {
      /* Remove as mensagens de erro antigas*/
      let errorEl = input.parentNode.querySelector('.error-validation');
  
      if (errorEl === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        errorEl = template;
      }
  
      errorEl.textContent = msg;
  
      let inputParent = input.parentNode;
  
      errorEl.classList.remove('template');
  
      inputParent.appendChild(errorEl);
    }
  }
  
  let form = document.getElementById('registro-form');
  let submit = document.getElementById('btn-submit');
  let validation = new Validation();
  
  /* Evento de envio de formulário, verifica validação*/
  submit.addEventListener('click', function (e) {
    e.preventDefault();
  
    validation.validate(form);
  
    if (form.checkValidity()) {
      alert('Formulário validado com sucesso!');
      window.location.href = "outra_pagina.html";
    }
});

// Seleciona os elementos HTML do formulário
const fileInput = document.getElementById("file-input");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");

// Adiciona um listener para o evento "submit" do formulário
form.addEventListener("bnt-submit", (event) => {
  /*Previne o comportamento padrão do formulário, que é recarregar a página ao enviar*/
  event.preventDefault();

  /*Cria um objeto FormData para enviar os dados do formulário*/
  const formData = new FormData();
  formData.append("file", fileInput.files[0]); /*Adiciona o arquivo selecionado no input de arquivo*/

  /*Cria um objeto XMLHttpRequest para enviar a requisição assincronamente*/
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php"); /*Define o método e o URL da requisição*/

  /*Adiciona um listener para o evento de progresso do upload*/
  xhr.upload.addEventListener("progress", (event) => {
    const percent = (event.loaded / event.total) * 100; 
    progressBar.style.width = percent + "%"; /*Atualiza a barra de progresso*/
  });

  /*Adiciona um listener para o evento de conclusão da requisição*/
  xhr.addEventListener("load", (event) => {
    progressContainer.style.display = "none"; /*Esconde o container de progresso*/
    alert("Arquivo enviado com sucesso!"); /*Exibe uma mensagem de sucesso*/
  });

  /* Adiciona um listener para o evento de erro da requisição*/
  xhr.addEventListener("error", (event) => {
    progressContainer.style.display = "none"; /* Esconde o container de progresso*/
    alert("Ocorreu um erro ao enviar o arquivo."); /*Exibe uma mensagem de erro*/
  });

  progressContainer.style.display = "block"; /* Exibe o container de progresso*/
  xhr.send(formData); /* Envia a requisição com os dados do formulário*/
});