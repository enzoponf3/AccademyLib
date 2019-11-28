
let cCont = document.getElementById("cardsContainer")
let f = document.createDocumentFragment()


var xhr = new XMLHttpRequest


document.onload = function{

    xhr.open("GET", "/Book/getBooks")
    xhr.send()
    if ((xhr.status == 200) && (xhr.readyState == 4)) {
        let authors = xhr.response
        foreach(var au in authors) {
            let div = document.createElement("div")
            let img = document.createElement("img")
            let h2 = document.createElement("h2")
            let span = document.createElement("span")

            
            h2.innerHTML = au.Title
            span.innerHTML = au.Subtitle + "<br/>" + au.ISBN
            div.appendChild(h2)
            div.appendChild(span)
            f.appendChild(div)
        }
        eCont.appendChild(f)
    }

}


    /*
        Hace falta cargar los datos en la base para poder traer las tiles!
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
