let shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x)=>{
        let {id, name, img, desc, price} = x
        let search = basket.find((y) => y.id == id) || []
          
        return `<div id="product-id-${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${search.noOfItems===undefined?0:search.noOfItems}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    }).join(""))
}
generateShop();


let increment = (id) => {
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
    localStorage.setItem("data", JSON.stringify(basket))

    update(id)
} 


let decrement = (id) => {
    let search = basket.find((x)=>x.id===id)
    
    if(search=== undefined || search.noOfItems===0) return;
    else{
        search.noOfItems--
    }
    update(id)
    basket = basket.filter((x)=>x.noOfItems!==0)
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) =>{
    let search = basket.find((x) => x.id === id)
    if(search != undefined)
    document.getElementById(id).innerHTML = search.noOfItems
    calculation()
}

let calculation = () =>{
    let cartAmount = document.getElementById('cartAmount')
    cartAmount.innerHTML = basket.map((x)=>x.noOfItems).reduce((previousValue, currentValue)=>{
        return previousValue+currentValue
    },0)
}

calculation()