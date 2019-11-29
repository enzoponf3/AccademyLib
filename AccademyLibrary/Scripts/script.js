let cardsContainer = document.getElementById("cardsContainer")


document.addEventListener("DOMContentLoaded", () => {
    runAjax("/Book/getBooks",0)
})
let librosBtn = document.getElementById("libro")
librosBtn.addEventListener("click", () => {
    runAjax("/Book/getBooks",0)
})

let editorialesBtn = document.getElementById("editorial")
editorialesBtn.addEventListener("click", () => {
    runAjax("/Publisher/getPublishers",1)
})

let generoBtn = document.getElementById("genero")
generoBtn.addEventListener("click", () => {
    runAjax("/Genre/getGenres",2)
})

let autoresBtn = document.getElementById("autor")
autoresBtn.addEventListener("click", () => {
    runAjax("/Author/getAuthors",3)

})


function runAjax(getString,reqCode) {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("readystatechange", e => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            fillContainer(e.target, reqCode)
        }
    })
    xhr.open("get", getString)
    xhr.send()
}

function fillContainer(xhr, reqCode) {
    let f = document.createDocumentFragment()
    let objs = JSON.parse(xhr.response)
    let subNav = document.getElementById("subNav")
    objs.forEach(obj => {
        let div = document.createElement("div")
        let img = document.createElement("img")
        let h2 = document.createElement("h2")
        let span = document.createElement("span")
        if (reqCode >= 0) {
            switch (reqCode) {
                case 0:
                    img.src = "https://images.squarespace-cdn.com/content/v1/5202d1b3e4b099a0812c51a3/1379542435618-8IPEGCZF2G3UE0IT1U9Q/ke17ZwdGBToddI8pDm48kIWbT9tXmT5DTNf_0Np7QU5Zw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7Xj1nVWs2aaTtWBneO2WM-tnOkbiY7Tmo5ZmPweIAkIyhAZxpjlaWd_pu4-MQj_siw/Book-cover-design-copyediting-Logo.jpg"
                    img.alt = `${obj.Title}`
                    h2.innerHTML = obj.Title
                    span.innerHTML = obj.Subtitle + "<br/>" + "ISBN: " + obj.ISBN
                    break
                case 1:
                    img.src = "https://www.creativefabrica.com/wp-content/uploads/2019/07/Books-icon-by-Home-Sweet-580x387.jpg"
                    img.alt = `${obj.Name}`
                    h2.innerHTML = `${obj.Name}`
                    break
                case 2:
                    img.src = "https://icons-for-free.com/iconfiles/png/512/drama+happy+masks+sad+theatre+icon-1320086001701703108.png"
                    img.alt = `${obj.Name}`
                    span.innerHTML = `${obj.Description}`
                    break
                case 3:
                    img.src = "https://icon-library.net/images/author-icon/author-icon-21.jpg"
                    img.alt = `${obj.Name}`
                    h2.innerHTML = `${obj.Name}`
                    span.innerHTML = `Nacionalidad: ${obj.Nationality}`
                    break
            }
            img.height = "110"
            img.classList.add("cardImg")
            div.appendChild(img)
            div.appendChild(h2)
            div.appendChild(span)
            div.classList.add("card")
            f.appendChild(div)
        }
    })
    cardsContainer.innerHTML = ""
    cardsContainer.appendChild(f)
}


    /*
        Hace falta cargar los datos en la base para poder traer las tiles!
     let cCont = document.getElementById("cardsContainer")
    xhr.addEventListener("readystatechange", () => {
        let f = document.createDocumentFragment()
        let div = document.createElement("div")
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            console.dir(xhr.response)
            let authors = JSON.parse(xhr.response)
            console.log(authors)
            authors.forEach(author => {
                let img = document.createElement("img")
                let h2 = document.createElement("h2")
                let span = document.createElement("span")


                h2.innerHTML = author.Title
                span.innerHTML = author.Subtitle + "<br/>" + "ISBN: " + author.ISBN
                //keyword = author.Title + " " + author.Subtitle
                //img.src = buscar()
                div.appendChild(h2)
                div.appendChild(span)
                div.classList.add("card")
                f.appendChild(div)
            })
            f.appendChild(div)
        }
        cCont.appendChild(f)
    })
    xhr.open("GET", "/Book/getBooks")
    xhr.send()
     
     
     */    

    /*
     * var req = new XMLHttpRequest();
        req.open("GET", "/Movie/JsonListar");
        req.send();
        req.onreadystatechange = function (resp) {

     * 
     * < div class="card" >
        <img src="" alt="Alternate Text" />
        <h2>Titulo</h2>

        <span>Titulo <br /> Autor: Autor</span>

        </div >*/
