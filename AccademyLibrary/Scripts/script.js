let cardsContainer = document.getElementById("cardsContainer")
let tituloSec = document.getElementById("tituloSec")
let titulo = document.getElementById("titulo")
let libros = []
let autores = []
let generos = []
let editoriales = []

titulo.addEventListener("click", () => {
    showAr(libros,0)
})

let librosBtn = document.getElementById("libro")
document.addEventListener("DOMContentLoaded", () => {
    runAjax("/Book/getBooks", libros, 0)
})
librosBtn.addEventListener("click", () => {
  
    runAjax("/Book/getBooks", libros, 0)
    showAr(libros, 0)
    
})

let editorialesBtn = document.getElementById("editorial")
editorialesBtn.addEventListener("click", () => {
    runAjax("/Publisher/getPublishers", editoriales, 1)
    showAr(editoriales, 1)

})

let generoBtn = document.getElementById("genero")
generoBtn.addEventListener("click", () => {
    runAjax("/Genre/getGenres", generos, 2)
    showAr(generos, 2)

})

let autoresBtn = document.getElementById("autor")
autoresBtn.addEventListener("click", () => {
    runAjax("/Author/getAuthors", autores, 3)
    showAr(autores, 3)

})

function runAjax(getString, arr, reqCode) {
    if (arr.length == 0) {
        let xhr = new XMLHttpRequest
        xhr.addEventListener("readystatechange", () => {
            if ((xhr.readyState == 4) && (xhr.status == 200)) {
                let objs = JSON.parse(xhr.response)
                objs.forEach(obj => {
                    arr.push(obj)
                })
                showAr(arr, reqCode)

            }
        })
        xhr.open("get", getString)
        xhr.send()
    }

}

function showAr(arr, reqCode) {
    console.log(arr)
    let fra = document.createDocumentFragment()
    arr.forEach(obj => {
        if (reqCode >= 0) {
            tituloSec.innerHTML=""
            let div = document.createElement("div")
            let urlImg
            let btns
            switch (reqCode) {
                case 0:
                    tituloSec.innerHTML = "Libros"
                    urlImg = "Resources/bookIcon.png"
                    btns = botonesCarta(obj.Id, libros)
                    div = crearCarta(urlImg, obj.Title, obj.Subtitle, btns)
                    break
                case 1:              
                    tituloSec.innerHTML = "Editoriales"
                    urlImg = "Resources/editorialIcon.png"
                    btns = botonesCarta(obj.Id, editoriales)
                    div = crearCarta(urlImg, obj.Name, "", btns)
                    break
                case 2:
                    tituloSec.innerHTML = "Género"
                    urlImg = "Resources/genreIcon.png"
                    btns = botonesCarta(obj.Id, generos)
                    div = crearCarta(urlImg, obj.Name, "", btns)
                    break
                case 3:
                    tituloSec.innerHTML = "Autores"
                    urlImg = "Resources/authorIcon.png"
                    btns = botonesCarta(obj.Id, autores)
                    div = crearCarta(urlImg, obj.Name, obj.Nationality, btns)
                    break
            }
           
            fra.appendChild(div)
        }

    })
    cardsContainer.innerHTML = ""
    cardsContainer.appendChild(fra)

    let btnSelected = document.getElementsByClassName("selected")
    if (btnSelected.length !=0) btnSelected[0].classList.toggle("selected")
}

function crearCarta(url, h2, span, botones) {
    let div = document.createElement("div")
    let topCard = document.createElement("div")
    let mainCard = document.createElement("div")
    topCard.innerHTML = `<img src=${url} class="cardImg">`
    mainCard.innerHTML = `<h2>${h2}</h2><span>${span}</span>`
    topCard.classList.add("card-top")
    mainCard.classList.add("card-main")
    botones.classList.add("card-footer")
    
    div.appendChild(topCard)
    div.appendChild(mainCard)
    div.appendChild(botones)
    div.classList.add("card")
    return div
}

function botonesCarta(id,arr) {
    let div = document.createElement("div")
    let borrarBtn = document.createElement("a")
    let editarBtn = document.createElement("a")
    editarBtn.innerHTML = "Editar"
    editarBtn.classList.add("cardButton")
    borrarBtn.innerHTML = "Borrar"
    borrarBtn.classList.add("cardButton")

    borrarBtn.addEventListener("click", () => {
        borrarElemento(id,arr)
    })
    editarBtn.addEventListener("click", () => {
        editarElemento(id,arr)
    })

    div.appendChild(editarBtn)
    div.appendChild(borrarBtn)
    return div
}