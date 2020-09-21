
document.addEventListener('DOMContentLoaded', getProducts())

function calSum() {
  let cart = JSON.parse(localStorage.getItem('cart'))
  return cart.flat().reduce((total, curr) => {
    total += parseInt(curr.price)
    return total
  }, 0)
}



function getProducts() {
  let cart = JSON.parse(localStorage.getItem('cart'))
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].length){
      let wrapper = document.querySelector('.wrapper')
      wrapper.style.display = 'block'
       populateDom(cart[i][0], cart[i].length)
      sum.innerHTML = calSum()
    }
    
  }
  
}



function populateDom(data,length) {
  let result = document.querySelector('.cart__result')

  let html = `
  <div class="cart__products">
            <div class="cart__products-wrapper">
              <img src="${data.image}" alt="" srcset="" />
            </div>
            <p class="cart__products-name">
              ${data.name}
            </p>
            <p></p>
            <p class="cart__product-price">
              ${data.price}
            </p>
            
            <p class="cart__products-qty">
              ${length}
            </p>
             
          </div>
          
  </div>`

  result.innerHTML += html
  let qty = document.querySelectorAll('.cart__products-qty')
  qty.forEach(item=>{
    item.style.fontSize = '20px'
    item.style.color = '#000000'
    item.style.background = '#54A73B'
    item.style.height = '30px'
    item.style.width = '30px'
    item.style.textAlign = 'center'
    item.style.borderRadius = '50%'
  })
  
}

function subtotal(data) {
  var text = document.getElementById('sum').textContent;
  let sub = parseInt(text)
  let sum = parseInt(data.price) + sub
  document.getElementById('sum').innerHTML = +sum

}

function removingAllFromLocalStorage(){
  let keysToRemove = ["cart", "singelCount",'totalProd'];
  keysToRemove.forEach(item=>{
    console.log(item)
    localStorage.removeItem(item)
  })
}

document.querySelectorAll('a').forEach(item=>{
  item.addEventListener('click', e => {
     removingAllFromLocalStorage()
  })

})
