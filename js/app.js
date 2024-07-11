import { USERS } from "../db/server.js"
//popap start
const btnOpen = document.querySelector(".btn__open")
const btnClose = document.querySelector(".btn__close")
const popap = document.querySelector(".popap")
const overlay = document.querySelector(".overlay")
//popap end

//Model start
const model = document.querySelector(".model")
const modelName = document.querySelector(".model__name")
const modelUsername = document.querySelector(".model__username")
const modelPassword = document.querySelector(".model__password")
const modelPasswordComfirm = document.querySelector(".model__password-confirm")
const eyePassword = document.querySelector(".eye__exist")
const eyePasswordConfirm = document.querySelector(".eye__conform")
//Model end

//Card start
const wrapper = document.querySelector(".wrapper")
//Card end

model.addEventListener("submit",(event) =>{
    event.preventDefault()
    let name = modelName.value
    let username = modelUsername.value
    let password = modelPassword.value
    let passwordConfirm = modelPasswordComfirm.value
    // if (password !== passwordConfirm) {
    //     eyePassword.style.border = "1px solid red"
    //     eyePasswordConfirm.style.border = "1px solid red"
    //     return
    // }
    // eyePassword.style.border = "1px solid #0002 "
    // eyePasswordConfirm.style.border = "1px solid #0002"


    let existUser = USERS.findIndex(user => user.username === username)
    if (existUser >= 0) {
        return alert("username ro'yxatdan o'tgan")
    }
    let newUser = {
        id:new Date().getTime(),
        name,
        username,
        password
    }
    USERS.push(newUser)
    console.log(USERS);
    model.reset()
    popapState("none")
    createCard(USERS)
})




//EYES start
eyePassword.addEventListener("click", ()=>{
    if (modelPassword.type === "text") {
        modelPassword.type = "password"
    }else{
        modelPassword.type = "text"
    }
})
modelPassword.addEventListener("input", (e)=>{
    let val = e.target.value
    if (val) {
        eyePassword.style.display = "flex"
    }else{
        eyePassword.style.display = "none"
    }
})



eyePasswordConfirm.addEventListener("click", ()=>{
    if (modelPasswordComfirm.type === "text") {
        modelPasswordComfirm.type = "password"
    }else{
        modelPasswordComfirm.type = "text"
    }
})
modelPasswordComfirm.addEventListener("input", (e)=>{
    let val = e.target.value
    if (val) {
        eyePasswordConfirm.style.display = "flex"
    }else{
        eyePasswordConfirm.style.display = "none"
    }
})
//EYES end






//CARD start
function createCard(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove()
    }
    data.forEach( user =>{
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
        <div class="card__circle"></div>
        <h3>${user.name} </h3>
        <p> ${user.username}</p>
        <p>id: ${user.id}</p>
        `
        wrapper.appendChild(card)
    })
}
createCard(USERS)
//CARD end









btnOpen.addEventListener("click", ()=>{
    popapState("flex")
})

btnClose.addEventListener("click", ()=>{
    popapState("none")
})

overlay.addEventListener("click", ()=>{
    popapState("none")
})

function popapState(state) {
    popap.style.display = state
}

