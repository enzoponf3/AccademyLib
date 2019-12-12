function crearCarta() {
    const div = document.createElement("div")
    div.classList.add("card")
    const head = document.createElement("div")
    head.classList.add("card-top")
    const body = document.createElement("div")
    body.classList.add("card-main")
    const foot = document.createElement("div")
    foot.classList.add("card-footer")
    div.appendChild(head)
    div.appendChild(body)
    div.appendChild(foot)
    return div
    /**
     * <div class ="card">
     *      <div class="cardHead"></div>
     *      <div class="cardBody"></div>
     *      <div class="cardFoot"></div>
     * </div>
     */
}

function crearBotones() {
    const frag = document.createDocumentFragment()
    const editBtn = document.createElement("a")
    editBtn.innerHTML = "Editar"
    editBtn.classList.add("cardButton")
    const deleteBtn = document.createElement("a")
    deleteBtn.innerHTML = "Borrar"
    deleteBtn.classList.add("cardButton")
    frag.appendChild(editBtn)
    frag.appendChild(deleteBtn)
    return frag
    /**
     *  <frag>
     *      <a>edit</a>
     *      <a>delete</a>
     *  </frag> 
     */
}