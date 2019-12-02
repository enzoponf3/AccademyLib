let cardsContainer = document.getElementById("cardsContainer")
let tituloSec = document.getElementById("tituloSec")
let titulo = document.getElementById("titulo")
let libros = []
let autores = []
let generos = []
let editoriales = []


function getBooks() {
    let xhr = new XMLHttpRequest()
    xhr.open("get", "/Book/getBooks")
    xhr.addEventListener("readystatechange",()=> {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            let objs = JSON.parse(xhr.response)
            objs.forEach(obj => {
                if (!(libros.find(l =>  l.Id === obj.Id ))) {
                        libros.push(obj)
                }
            })
            showAr(libros, 0)
            return xhr.status
        }
    })
    xhr.send()
}

function getEditorles() {
    let xhr = new XMLHttpRequest()
    xhr.open("get", "/Publisher/getPublishers")
    xhr.addEventListener("readystatechange", () => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            let objs = JSON.parse(xhr.response)
            objs.forEach(obj => {
                if (!(editoriales.find(l => l.Id === obj.Id))) {
                    editoriales.push(obj)
                }
            })
            return xhr.status
        }
    })
    xhr.send()
}

function getGeneros() {
    let xhr = new XMLHttpRequest()
    xhr.open("get", "/Genre/getGenres")
    xhr.addEventListener("readystatechange", () => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            let objs = JSON.parse(xhr.response)
            objs.forEach(obj => {
                if (!(generos.find(l => l.Id === obj.Id))) {                    
                    generos.push(obj)
                }
            })
            return xhr.status
        }
    })
    xhr.send()
}

function getAutores() {
    let xhr = new XMLHttpRequest()
    xhr.open("get", "/Author/getAuthors")
    xhr.addEventListener("readystatechange", () => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            let objs = JSON.parse(xhr.response)
            objs.forEach(obj => {
                if (!(autores.find(l => l.Id === obj.Id))) {
                    autores.push(obj)
                }                    
            })
            return xhr.status
        }
    })
    xhr.send()
}

titulo.addEventListener("click", () => {
    showAr(libros,0)
})

document.addEventListener('DOMContentLoaded', () => {
    getBooks()    
    getEditorles()        
    getGeneros()            
    getAutores()
})

let librosBtn = document.getElementById("libro")
librosBtn.addEventListener("click", () => {
    getBooks()
    setTimeout(showAr(libros,0), 300)
    
})

let editorialesBtn = document.getElementById("editorial")
editorialesBtn.addEventListener("click", () => {
    getEditorles()
    setTimeout(showAr(editoriales, 1), 300)

})

let generoBtn = document.getElementById("genero")
generoBtn.addEventListener("click", () => {
    getGeneros()
    setTimeout(showAr(generos,2), 300)
})

let autoresBtn = document.getElementById("autor")
autoresBtn.addEventListener("click", () => {
    getAutores()
    setTimeout(showAr(autores, 3),300)

})

function showAr(arr, reqCode) {
    console.log(arr)
    cardsContainer.innerHTML =""
    let fra = document.createDocumentFragment()
    arr.forEach(obj => {
        if (reqCode >= 0) {
            tituloSec.innerHTML=""
            let div = document.createElement("div")
            let cardBox = document.createElement("div")
            let urlImg
            let btns
            switch (reqCode) {
                case 0:
                    tituloSec.innerHTML = "Libros"
                    urlImg = "Resources/bookIcon.png"
                    btns = botonesCarta(obj.Id, libros, "Book", reqCode)
                    cardBox = crearCarta(urlImg, obj.Title, obj.Subtitle, btns)
                    modalLibro(cardBox.childNodes[0], obj.Id)
                    break
                case 1:            
                    tituloSec.innerHTML = "Editoriales"
                    urlImg = "Resources/editorialIcon.png"
                    btns = botonesCarta(obj.Id, editoriales, "Publisher", reqCode)
                    cardBox = crearCarta(urlImg, obj.Name, "", btns)
                    break
                case 2:
                    tituloSec.innerHTML = "Género"
                    urlImg = "Resources/genreIcon.png"
                    btns = botonesCarta(obj.Id, generos, "Genre", reqCode)
                    cardBox = crearCarta(urlImg, obj.Name, "", btns)
                    break
                case 3:
                    tituloSec.innerHTML = "Autores"
                    urlImg = "Resources/authorIcon.png"
                    btns = botonesCarta(obj.Id, autores, "Author", reqCode)
                    cardBox = crearCarta(urlImg, obj.Name, obj.Nationality, btns)
                    break
            }
            div.appendChild(cardBox)
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

function botonesCarta(id,arr,cont,code) {
    let div = document.createElement("div")
    let borrarBtn = document.createElement("a")
    let editarBtn = document.createElement("a")
    editarBtn.innerHTML = "Editar"
    editarBtn.classList.add("cardButton")
    borrarBtn.innerHTML = "Borrar"
    borrarBtn.classList.add("cardButton")

    borrarBtn.addEventListener("click", () => {
        borrarElemento(id,arr,cont,code)
    })
    editarBtn.addEventListener("click", () => {
        console.log("sas");
        console.log(cont);
        editarElemento(id,arr,cont,code)
    })

    div.appendChild(editarBtn)
    div.appendChild(borrarBtn)
    return div
}

function borrarElemento(id, arr, cont, code) {    
    borrarBase(id, cont, arr, code)
    getShowAll(arr,code)
}

function borrarBase(id, cont,arr, code) {
    let req = new XMLHttpRequest
    req.open("post", `/${cont}/Delete`)
    req.addEventListener("readystatechange", () => {
        if ((req.status == 4) && (req.response == 200)) {
            getShowAll(arr, code)
            modal.classList.toggle("showModal")
            getShowAll(arr, code)
        }
    })
    let data = new FormData
    data.append(`${cont}`, id)
    req.send(data)
}

function editarElemento(id, arr, cont, code) {
    let data = editForm(id,code)
    let req = new XMLHttpRequest
    req.open("post", `/${cont}/Edit`)
    req.addEventListener("readystatechange", () => {
        if ((req.status == 4) && (req.response == 200)) {
            getShowAll(arr, code)
            modal.classList.toggle("showModal")
            getShowAll(arr, code)
        }
        if (req.response == 505) {
            alert(req.responseText)
        }
    })
    
    req.send(data)
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
    libOpt.value = "Book"
    libOpt.innerHTML = "Libro"
    autOpt.value = "Author"
    autOpt.innerHTML = "Autor"
    genOpt.value = "Genre"
    genOpt.innerHTML = "Género"
    editOpt.value = "Publisher"
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
            let c
            let arr
            let tituloLabel = document.createElement("p")
            let tituloInput = document.createElement("input")
            if (e.target.value == "Book") {
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
                    autoresId.push(autores.findIndex(f => f.Name == e.target.value))
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
                    console.dir(e.target.value)
                    generosId.push(generos.findIndex(f => f.Name == e.target.value))
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
                modalB.appendChild(ediLabel)
                modalB.appendChild(ediInput)
                editoriales.forEach(editorial => {
                    let ediOption = document.createElement("option")
                    ediOption.innerHTML = editorial.Name
                    ediOption.value = editorial.Name
                    console.log(ediOption)
                    sugestEdits.appendChild(ediOption)
                })
                ediInput.addEventListener("change", () => {

                    form.append("bookTitle", tituloInput.value)
                    form.append("bookSubtitle", subtInput.value)
                    form.append("ISBN", isbnInput.value)
                    form.append("authors", autoresId)
                    form.append("genres", generosId)
                    form.append("publisher", editoriales.findIndex(f => f.Name == ediInput.value))
                })
                document.body.appendChild(sugestEdits)
                console.dir(tituloInput)
                arr = libros
                c = 0

            }
            if (e.target.value == "Author") {
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
                nacInput.addEventListener("change", () => {
                    form.append("name", tituloInput.value)
                    form.append("nationality", nacInput.value)
                })
                arr = autores
                c = 3
            }
            if (e.target.value == "Genre") {
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
                tituloInput.addEventListener("change", () => {
                    form.append("name", tituloInput.value)
                    form.append("description", desInput.value)
                })
                arr = generos
                c = 2
            }
            if (e.target.value == "Publisher") {
                modalB.innerHTML = ""
                modalF.innerHTML = ""
                tituloLabel.innerHTML = "Nombre"
                tituloInput.placeholder = "Nombre. . ."
                tituloInput.setAttribute = ("min", "1")
                console.dir(tituloInput)
                tituloInput.addEventListener("change", e => {
                    console.log(e.target)
                    form.append("name", tituloInput.value)

                })
                arr = editoriales
                c = 1
            }


            let okBtn = document.createElement("a")
            okBtn.innerHTML = "OK"
            okBtn.classList.add("modalBtn")
            modalF.appendChild(okBtn)
            modalB.insertBefore(tituloInput, modalB.childNodes[0])
            modalB.insertBefore(tituloLabel, modalB.childNodes[0])
            okBtn.addEventListener("click", () => {
                postAjax(select.value, form, arr, c)
                modal.classList.toggle("showModal")
            })
        }
    })
    modal.classList.toggle("showModal")
}


function editForm(id, code) {
    let form = new FormData
    let tituloLabel = document.createElement("p")
    let tituloInput = document.createElement("input")
    switch (code) {
        case 0:


            break
        case 1:


            break
        case 2:


            break
        case 3:
            modalB.innerHTML = ""
            modalF.innerHTML = ""
            let autor = autores[autores.findIndex(a=>a.Id == id)]
            tituloLabel.innerHTML = "Nombre"
            tituloInput.placeholder = `${autor.Name}`
            tituloInput.setAttribute = ("min", "1")
            console.dir(tituloInput)
            tituloInput.addEventListener("change", e => {
                console.log(e.target)
                form.append("name", tituloInput.value)

            })
            break
    }
    let okBtn = document.createElement("a")
    okBtn.innerHTML = "OK"
    okBtn.classList.add("modalBtn")
    modalF.appendChild(okBtn)
    modalB.insertBefore(tituloInput, modalB.childNodes[0])
    modalB.insertBefore(tituloLabel, modalB.childNodes[0])
    okBtn.addEventListener("click", () => {
        return form
    })
}















function getShowAll(arr,c) {
    getGeneros()
    getEditorles()
    getAutores()
    getBooks()
    showAr(arr,c)
    
}
function postAjax(url, form,arr,code) {
    let req = new XMLHttpRequest
    req.open("post", `/${url}/Add`)
    req.addEventListener("readystatechange", e => {
        if ((e.target.readyState == 4) && (e.target.status == 200)) {
            alert("Agregado correctamente!")            
            getShowAll(arr,code)
        }
        if (e.target.status == 505) {
            alert(e.target.response)
        }
    })
    req.send(form)
}