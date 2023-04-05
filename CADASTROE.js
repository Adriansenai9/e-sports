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