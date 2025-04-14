import menuArray from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
const menuEl = document.getElementById("menu")
const orderEl = document.getElementById("order")
let order = []
let total = 0
menuEl.innerHTML = menuArray.map(food => `
    <div class="option">
        <img class="option-emoji" src="images/${food.name.toLowerCase()}.png" alt="pizza emoji">
        <div>
            <h3 class="option-title">${food.name}</h3>
            <p class="option-ingredients">${food.ingredients.join(", ")}</p>
            <p class="option-price">$${food.price}</p>
        </div>
        <button class="option-add-btn" data-food-election=${food.name}>+</button>
    </div>`
).join("");

document.addEventListener("click", function(e){
    if (e.target.dataset.foodElection){
        const selected = menuArray.filter(food => food.name === e.target.dataset.foodElection)[0]
        let selectedClone = {...selected}
        selectedClone["uuid"] = uuidv4()
        order.push(selectedClone)
        total += selected.price
        renderOrder(order)
    }
    if (e.target.dataset.uuid){
        order = order.filter(food => food.uuid !== e.target.dataset.uuid)
        total -= e.target.dataset.price
        renderOrder(order)
    }
})

function renderOrder(order){
    if (order.length === 0){
        orderEl.innerHTML = ``
    } else {
    const menuElection = order.map(food => `
        <div class="order-election">
            <p class="order-food">${food.name}</p>
            <button class="remove" data-uuid=${food.uuid} data-price=${food.price}>remove</button>
            <p class="order-price">$${food.price}</p>
        </div>`).join("")
    orderEl.innerHTML = `
        <h3 class="order-title">Your order</h3>
        ${menuElection}
        <div class="total">
            <p class="order-food">Total Price:</p>
            <p class="order-price">$${total}</p>
        </div>
        <button class="complete-order-btn">Complete order</button>`
}}