let usuarios = [
    {
        nome: "du",
        senha: "123456"
    },

    {
        nome: "luis",
        senha: "123456"
    },
]


const usuarionavegador = localStorage.getItem("usuariologado")

let login1 = document.querySelector('input#loginbotao')
login1.addEventListener("click", entrar)



function entrar() {
  

    let nome = document.querySelector("input#usuario").value
    let pass = document.querySelector("input#senha").value

    let cont = 0



    for (let a = 0; a < usuarios.length; a++) {

        if (nome == usuarios[a].nome && pass == usuarios[a].senha) {
            alert("Seja Bem-Vindo")
            location.assign('https://www.youtube.com/')
            a = usuarios.length
            cont = 1
        }
    }
    if (cont == 0) {
        alert("Usuário ou senha incorretos.")
    }


}

