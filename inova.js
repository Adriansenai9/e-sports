const lista = document.getElementById("lista")
const image = document.querySelectorAll(".item")

let index = 0

function carrossel(){
    index++
    if(index > 1){
        index = 0
    }
    lista.style.transform = `translateX(${-index * 970}px)`
}
setInterval(carrossel, 10000)
