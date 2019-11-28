/*let script = document.createElement("script")
script.src = "https://www.google.com/jsapi"
document.head.appendChild(script)
google.load('search','1')
google.setOnLoadCallback(buscar)
let busqueda
let keyword

function buscar() {
    busqueda = new google.search.ImageSearch()
    busqueda.setSearchCompleteCallback(this, searchComplete, null)
    busqueda.ejecute(keyword)
    if ((busqueda.results) && (busqueda.results.lenght > 0)) {
        return busqueda.results[0]['url']
    }
    return '/Data/defCover.png'
}
*/

/*
  function OnLoad()
    {
        search = new google.search.ImageSearch();

        search.setSearchCompleteCallback(this, searchComplete, null);

        search.execute(keyword);
    }

    function searchComplete()
    {
        if (search.results && search.results.length > 0)
        {
            var rnd = Math.floor(Math.random() * search.results.length);

            //you will probably use jQuery and something like: $('body').css('background-image', "url('" + search.results[rnd]['url'] + "')");
            document.body.style.backgroundImage = "url('" + search.results[rnd]['url'] + "')";
        }
    }

 
 */


document.addEventListener("DOMContentLoaded", () => {

    var xhr = new XMLHttpRequest
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
    

})


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
