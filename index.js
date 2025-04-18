import menuArray from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
const menuEl = document.getElementById("menu")
const orderEl = document.getElementById("order")
const formEl = document.getElementById("form")
let order = []
let fullOrder = ``
let thanks = ''

document.addEventListener("click", function(e){
    if (e.target.dataset.foodElection){
        if (e.target.dataset.sumormin === "min"){
            const index = order.findIndex(food => food.name === e.target.dataset.foodElection)
            console.log(index)
            order.splice(index, 1)
            render(order)
        } else if (e.target.dataset.sumormin === "sum"){
        const selected = menuArray.filter(food => food.name === e.target.dataset.foodElection)[0]
        let selectedClone = {...selected}
        selectedClone["uuid"] = uuidv4()
        order.push(selectedClone)
        render(order)
        }
    }
    if (e.target.dataset.uuid){
        order = order.filter(food => food.uuid !== e.target.dataset.uuid)
        render(order)
    }
    if (e.target.dataset.button) {
        document.getElementById("paying").style.display = "inline"
    }
})

formEl.addEventListener("submit", function(e){
    e.preventDefault()
    document.getElementById("paying").style.display = "none"
    order = []
    
    thanks = `<p class="thanks container">Thanks, ${document.getElementById("username").value}! Your order is on its way!</p>`
    document.getElementById("form").reset()
    render()
})



function render(order=[]){
    if (order.length === 0){
        fullOrder = ``
    } else {
    thanks = ''
    const menuElection = order.map(food => `
        <div class="order-election">
            <p class="order-food">${food.name}</p>
            <button class="remove" data-uuid=${food.uuid} data-price=${food.price}>remove</button>
            <p class="order-price">$${food.price}</p>
        </div>`).join("")
    fullOrder = `
        <div class="order">
            <h3 class="order-title">Your order</h3>
            ${menuElection}
            <div class="total">
                <p class="order-food">Total Price:</p>
                <p class="order-price">$${order.map(food => food.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
            </div>
            <button data-button="complete"class="complete-order-btn">Complete order</button>
        </div>`
    }
    menuEl.innerHTML = menuArray.map(food => {
        const count = order.filter(orderedfood => orderedfood.name === food.name).length
        return`
        <div class="option">
            <img class="option-emoji" src="images/${food.name.toLowerCase()}.png" alt="pizza emoji">
            <div>
                <h3 class="option-title">${food.name}</h3>
                <p class="option-ingredients">${food.ingredients.join(", ")}</p>
                <p class="option-price">$${food.price}</p>
            </div>
            <div class="btns">
                ${count > 0 ? `
                    <button class="option-add-btn" data-food-election=${food.name} data-sumormin="min">-</button>
                    <p class="count">${count}</p> ` : ""}
                <button class="option-add-btn" data-food-election=${food.name} data-sumormin="sum">+</button>
            </div>
        </div>`
    }).join("") + fullOrder + thanks
}

render()