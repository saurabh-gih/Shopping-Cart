let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () =>{
    let cartAmount = document.getElementById('cartAmount')
    cartAmount.innerHTML = basket.map((x)=>x.noOfItems).reduce((previousValue, currentValue)=>{
        return previousValue+currentValue
    },0)
}
calculation()

let generateCartItems = () => {
    if(basket.length !==0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let {id, noOfItems} = x
            let search = shopItemsData.find((element)=>(element.id == id))
            
            return `
            <div class="cart-item">
                <img  width="100" src="${search.img}" alt="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})"class="bi bi-x-lg"></i>
                    </div>
                    <div class="cart-buttons buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${noOfItems}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$ ${noOfItems * search.price}</h3>
                </div>
            </div>
            
            `
        }).join(""))
    } else {
        shoppingCart.innerHTML=""
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="/">
            <button class="HomeBtn">Back to Home</button>
        </a>
        `
    }
}

generateCartItems()

let increment = (id) => {
    selectedElement = document.getElementById(id)

    let search = basket.find((x)=>x.id===id)
    
    if(search===undefined){
        basket.push({
            id:id,
            noOfItems:1,
        })
    }
    else{
        search.noOfItems++
    }
    update(id)
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket))

} 

let decrement = (id) => {
    let search = basket.find((x)=>x.id===id)
    
    if(search=== undefined || search.noOfItems===0) return;
    else{
        search.noOfItems--
    }
    update(id)
    basket = basket.filter((x)=>x.noOfItems!==0)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) =>{
    let search = basket.find((x) => x.id === id)
    if(search != undefined)
    document.getElementById(id).innerHTML = search.noOfItems
    calculation()
    totalAmount()

}

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id)
    localStorage.setItem("data", JSON.stringify(basket))
    calculation()
    generateCartItems()
    totalAmount()
}

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}

let totalAmount = () =>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let search = shopItemsData.find((element)=>element.id == x.id) || []
            return x.noOfItems*search.price
        }).reduce((previousValue, currentValue) => previousValue+currentValue,0);
        
        label.innerHTML = `
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }else return;
}

totalAmount()
