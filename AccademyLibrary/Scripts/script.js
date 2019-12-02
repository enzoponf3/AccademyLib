let cardsContainer = document.getElementById("cardsContainer")
let tituloSec = document.getElementById("tituloSec")
let titulo = document.getElementById("titulo")
let libros = []
let autores = []
let generos = []
let editoriales = []

function runAjaxx(getString, arr, reqCode) {
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

titulo.addEventListener("click", () => {
    showAr(libros,0)
})

document.addEventListener('DOMContentLoaded', () => {
    runAjaxx("/Book/getBooks", libros, 0)

})

let librosBtn = document.getElementById("libro")
librosBtn.addEventListener("click", () => {
  
    runAjaxx("/Book/getBooks", libros, 0)
    showAr(libros, 0)
    
})

let editorialesBtn = document.getElementById("editorial")
editorialesBtn.addEventListener("click", () => {
    runAjaxx("/Publisher/getPublishers", editoriales, 1)
    showAr(editoriales, 1)

})

let generoBtn = document.getElementById("genero")
generoBtn.addEventListener("click", () => {
    runAjaxx("/Genre/getGenres", generos, 2)
    showAr(generos, 2)

})

let autoresBtn = document.getElementById("autor")
autoresBtn.addEventListener("click", () => {
    runAjaxx("/Author/getAuthors", autores, 3)
    showAr(autores, 3)

})

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
                    modalLibro(div,obj.Id)
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

function borrarElemento(id, arr) {

}

function editarElemento(id,arr) {

}

let modal = document.querySelector(".modal")
let cerrarMBtn = document.getElementById("cerrarModal")
let modalH = document.getElementById("modalHead")
let modalB = document.getElementById("modalBody")
let modalF = document.getElementById("modalFoot")
function modalLibro(div,id) {
    div.addEventListener("click", () => {
        let h3 = document.createElement("h3")
        let subTitulo = document.createElement("span")
        let autores = document.createElement("span")
        let libro = libros[libros.findIndex(i => i.Id == id)]
        console.log(libro)
        h3.innerHTML = libro.Title
        subTitulo.innerHTML = libro.Subtitle + `<br> Editorial: <br><p>${libro.Pub}</p> <br>`
        autores.innerHTML = "Autor/es: "
        console.log(libro.Authors)
        libro.Authors.forEach(autor => {
            console.log(autor)
            let autorp = document.createElement("p")
            autorp.innerHTML= autor
            autores.appendChild(autorp)
        })
        modalH.appendChild(h3)
        modalB.appendChild(subTitulo)
        modalB.appendChild(autores)
        modalF.appendChild(botonesCarta(id, libros))
        modal.classList.toggle("showModal")
    })
    
}


function cerrarModal() {
    modal.classList.toggle("showModal")
    modalH.innerHTML = ""
    modalB.innerHTML = ""
    modalF.innerHTML = ""
}

function windowOnClick(event) {
    if (event.target === modal) {
        cerrarModal()
    }
}

cerrarMBtn.addEventListener("click", cerrarModal)
window.addEventListener("click", windowOnClick)

let menuBtn = document.getElementById("navHamb")
menuBtn.addEventListener("click", () => {
    let sideBar = document.getElementById("navCont")
    console.log(sideBar)
    sideBar.classList.toggle("sideBar")
    sideBar.classList.toggle("navList")

})

let agregar = document.getElementById("agregarIcon")
agregar.addEventListener("click", e => {
    modalAddForm()
})

function modalAddForm() {
    let modTitle = document.createElement("h3")
    modTitle.innerHTML = "Agregar"
    let select = document.createElement("select")
    let libOpt = document.createElement("option")
    let autOpt = document.createElement("option")
    let genOpt = document.createElement("option")
    let editOpt = document.createElement("option")
    libOpt.value = "/Book/AddBook"
    libOpt.innerHTML = "Libro"
    autOpt.value = "/Author/AddAuthor"
    autOpt.innerHTML = "Autor"
    genOpt.value = "/Genre/AddGenre"
    genOpt.innerHTML = "Género"
    editOpt.value = "/Publisher/AddPublisher"
    editOpt.innerHTML = "Editorial"
    select.innerHTML="<option value =`null`>Agregar . . . </option>"
    select.appendChild(libOpt)
    select.appendChild(autOpt)
    select.appendChild(genOpt)
    select.appendChild(editOpt)
    modalH.appendChild(modTitle)
    modalB.appendChild(select)
    select.addEventListener("change", e => {
        if (e.target.value != `null`) {
            let form = new FormData
            let tituloLabel = document.createElement("p")
            let tituloInput = document.createElement("input")
            if (e.target.value == "/Book/AddBook") {
                modalB.innerHTML = ""
                modalF.innerHTML = ""
                tituloLabel.innerHTML = "Título"
                tituloInput.placeholder = "Ingrese el nombre del Libro"
                tituloInput.setAttribute = ("min", "1")
                let subtLabel = document.createElement("p")
                let subtInput = document.createElement("input")
                subtLabel.innerHTML = "Subtitulo"
                subtInput.placeholder = "Ingrese el Subtitulo del Libro"
                modalB.appendChild(subtLabel)
                modalB.appendChild(subtInput)
                let isbnLabel = document.createElement("p")
                let isbnInput = document.createElement("input")
                isbnLabel.innerHTML = "ISBN"
                isbnInput.placeholder = "Ingrese el numero de ISBN-13"
                modalB.appendChild(isbnLabel)
                modalB.appendChild(isbnInput)
                let autLabel = document.createElement("p")
                let autInput = document.createElement("input")
                autLabel.innerHTML = "Autor/es"
                autInput.setAttribute("list", "autoresId")
                let sugest = document.createElement("datalist")
                sugest.setAttribute("id", "autoresId")
                let autoresId = []
                autores.forEach(autor => {
                    let autOption = document.createElement("option")
                    autOption.innerHTML = autor.Name
                    autOption.value = autor.Name
                    console.log(autOption)
                    sugest.appendChild(autOption)
                })
                document.body.appendChild(sugest)
                autInput.addEventListener("change", e => {
                    autoresId.push(e.target.value)
                    let div = document.createElement("div")
                    let close = document.createElement("button")
                    close.className = "close"
                    close.innerText = "x"
                    div.className = "chip"
                    div.innerText = e.target.value
                    div.appendChild(close)
                    modalB.appendChild(div)
                    autInput.value = ""

                    div.addEventListener("click", e => {
                        let i = autores.findIndex(f => f.Name == e.target.value)
                        autoresId.splice(i, 1)
                        e.target.parentNode.removeChild(e.target)
                        console.log(autoresId)
                    })
                })
                modalB.appendChild(autLabel)
                modalB.appendChild(autInput)
                let genLabel = document.createElement("p")
                let genInput = document.createElement("input")
                genLabel.innerHTML = "Genero/s"
                genInput.setAttribute("list", "generosId")
                let sugestGen = document.createElement("datalist")
                sugestGen.setAttribute("id", "generosId")
                let generosId = []
                generos.forEach(genero => {
                    let genOption = document.createElement("option")
                    genOption.innerHTML = genero.Name
                    genOption.value = genero.Name
                    console.log(genOption)
                    sugestGen.appendChild(genOption)
                })
                document.body.appendChild(sugestGen)
                genInput.addEventListener("change", e => {
                    generosId.push(e.target.value)
                    let div = document.createElement("div")
                    let close = document.createElement("button")
                    close.className = "close"
                    close.innerText = "x"
                    div.className = "chip"
                    div.innerText = e.target.value
                    div.appendChild(close)
                    modalB.appendChild(div)
                    autInput.value = ""

                    div.addEventListener("click", e => {
                        let i = generos.findIndex(f => f.Title == e.target.value)
                        generosId.splice(i, 1)
                        e.target.parentNode.removeChild(e.target)
                    })
                })
                modalB.appendChild(genLabel)
                modalB.appendChild(genInput)
                let ediLabel = document.createElement("p")
                let ediInput = document.createElement("input")
                ediLabel.innerHTML = "Editorial"
                ediInput.setAttribute("list", "editorialesId")
                let sugestEdits = document.createElement("datalist")
                sugestEdits.setAttribute("id", "editorialesId")
                editoriales.forEach(editorial => {
                    let ediOption = document.createElement("option")
                    ediOption.innerHTML = editorial.Name
                    ediOption.value = editorial.Name
                    console.log(ediOption)
                    sugestEdits.appendChild(ediOption)
                })
                modalB.appendChild(ediLabel)
                modalB.appendChild(ediInput)
                document.body.appendChild(sugestEdits)
                form.append("book", JSON.stringify( { Title: tituloInput.value, Subtitle: subtInput.value, ISBN: isbnInput.value }))
                form.append("genres", JSON.stringify({ generosId }))
                form.append("publisher", JSON.stringify(editoriales.findIndex(f => f.Name == ediInput.value)))


            }
            if (e.target.value == "/Author/AddAuthor") {
                modalB.innerHTML = ""
                modalF.innerHTML = ""
                tituloLabel.innerHTML = "Nombre"
                tituloInput.placeholder = "Nombre. . ."
                tituloInput.setAttribute = ("min", "1")
                let nacLabel = document.createElement("p")
                let nacInput = document.createElement("input")
                nacLabel.innerHTML = "Nacionalidad"
                nacInput.placeholder = "3 caracteres!"
                nacInput.setAttribute = ("maxlength", "3")
                modalB.appendChild(nacLabel)
                modalB.appendChild(nacInput)
            }
            if (e.target.value == "/Genre/AddGenre") {
                modalB.innerHTML = ""
                modalF.innerHTML = ""
                tituloLabel.innerHTML = "Nombre"
                tituloInput.placeholder = "Nombre. . ."
                tituloInput.setAttribute = ("min", "1")
                let desLabel = document.createElement("p")
                let desInput = document.createElement("input")
                desLabel.innerHTML = "Descripción"
                desInput.placeholder = "Descripción del Género"
                desInput.setAttribute = ("min", "20")
                modalB.appendChild(desLabel)
                modalB.appendChild(desInput)
            }
            if (e.target.value == "/Publisher/AddPublisher") {
                modalB.innerHTML = ""
                modalF.innerHTML = ""
                tituloLabel.innerHTML = "Nombre"
                tituloInput.placeholder = "Nombre. . ."
                tituloInput.setAttribute = ("min", "1")
            }


            let okBtn = document.createElement("a")
            okBtn.innerHTML = "OK"
            okBtn.classList.add("modalBtn")
            modalF.appendChild(okBtn)
            modalB.insertBefore(tituloInput, modalB.childNodes[0])
            modalB.insertBefore(tituloLabel, modalB.childNodes[0])
            okBtn.addEventListener("click", () => {
                postAjax(select.value, form, libros, 0)
            })
        }
    })
    modal.classList.toggle("showModal")

}


function postAjax(url, form,arr,code) {
    let req = new XMLHttpRequest
    req.open("post", url)
    req.addEventListener("readystatechange", e => {
        if ((e.target.readyState == 4) && (e.target.status == 200)) {
            alert("El formulario se ha enviado correctamente!")
            showAr(arr,code)
        }
    })
    req.send(form)
}