//let inputs = document.getElementById("inp");
let text = document.querySelector(".friend-list");
const itemsArray = localStorage.getItem('friend_list') ? JSON.parse(localStorage.getItem('friend_list')) : [];


document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#inp")
    createItem(item)
})

document.querySelector("#inp").addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
      const item = document.querySelector("#inp")
      createItem(item)
    }
})


function displayItems(){
    //let items = ""
    for(let i = 0; i < itemsArray.length; i++){
        let items = document.createElement("ul");
        items.innerHTML = `${itemsArray[i]} <i class="fa-solid fa-trash deleteBtn"></i>`
        text.appendChild(items);
    }
    activateDeleteListeners()
}


function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
      dB.addEventListener("click", () => { deleteItem(i) })
    })
}

function Add(){
    if(inputs.value == ""){
        alert("Please Enter a name")
    }else{
        let newEle = document.createElement("ul");
        newEle.innerHTML=`${inputs.value} <i class="fa-solid fa-trash"></i>`;
        text.appendChild(newEle);
        inputs.value="";
        newEle.querySelector("i").addEventListener("click" , remove);
        function remove(){
            newEle.remove()
        }
    }
}

function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem('friend_list', JSON.stringify(itemsArray))
    location.reload()
}
  
function deleteItem(i){
    itemsArray.splice(i,1)
    localStorage.setItem('friend_list', JSON.stringify(itemsArray))
    location.reload()
}

window.onload = function() {
    displayItems()
};