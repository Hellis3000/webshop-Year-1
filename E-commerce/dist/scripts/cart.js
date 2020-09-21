

let cartText=document.querySelector('.cart__text')
let wrapper = document.querySelector('.wrapper')
let sum = document.querySelector('.sum')
let cartCount = document.querySelector('.nav__cart-count')
let empty = document.querySelector('.cart__empty p')
let cartResult = document.querySelector('.cart__result')
let cartCheckout = document.querySelector('.cart__checkout')

getCartData()
getTotal()

function getTotal() {
  let total = localStorage.getItem('totalProd')
  cartCount.innerHTML = total
  console.log(total)
}




function calSum(){
  let cart = JSON.parse(localStorage.getItem('cart'))
 return cart.flat().reduce((total,curr)=>{
   total += parseInt(curr.price)
   return total
  },0)}

function creatingArr() {
  let data = JSON.parse(localStorage.getItem('cart'))
  return data.reduce((arr) => {
    arr.push(new Array)
    return arr
  }, [])

  console.log(arr)
}


function creatingProdCOuntObj() {
  let cartData = JSON.parse(localStorage.getItem('cart'))

  return cartData.reduce((obj, curr, i) => {
    obj[i] = 0
    return obj
  }, {})
}
let obj = creatingProdCOuntObj()

console.log(obj)
empty.addEventListener('click',(e)=>{
 
  localStorage.setItem('cart', JSON.stringify(creatingArr()))
  localStorage.setItem('totalProd', JSON.stringify(0))
  localStorage.setItem('singelCount', JSON.stringify(obj))
  let element = document.querySelector('.cart__result');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
    element.classList.add("removed-item")
  }
  cartCount.innerHTML=0
  wrapper.style.display = 'none'
  cartText.style.display = 'block'
})



function getCartData(){    
  let cart=JSON.parse(localStorage.getItem('cart'))
  
  if(!cart){
    cartText.style.display = 'block'
  }else{
    for (let i = 0; i < cart.length; i++) {

      if (cart[i].length) {
        wrapper.style.display = 'block'
        populateDom(cart[i][0], cart[i], i)
        sum.innerHTML = calSum()
      } else if (!cart.flat().length) {

        cartText.style.display = 'block'
      }

    }
  }

}




  let close = document.querySelectorAll('.cart__products-close')
  close.forEach(item=>{
    
    item.addEventListener('click', (e) => {
      console.log(e)
      // e.target.parentElement.classList.add("removed-item")
      
      let cart = JSON.parse(localStorage.getItem('cart'))
      let singelCount = JSON.parse(localStorage.getItem('singelCount'))
      cart[e.target.parentElement.id]=[]
      singelCount[e.target.parentElement.id]=0
      
      localStorage.setItem('cart',JSON.stringify(cart))
      localStorage.setItem('totalProd', cart.flat().length)
      localStorage.setItem('singelCount', JSON.stringify(singelCount))
      cartCount.innerHTML = localStorage.getItem('totalProd')
      sum.innerHTML = calSum()
      e.target.parentElement.remove()
     
      if(!cart.flat().length){
        wrapper.style.display = 'none'
        cartText.style.display = 'block'
      }
    })
  })
  



let input=document.querySelectorAll('.qty')
input.forEach(item=>{
  item.addEventListener('input',(e)=>{
    let id = e.target.parentElement.parentElement.id
    let cart = JSON.parse(localStorage.getItem('cart'))
    let singelCount = JSON.parse(localStorage.getItem('singelCount'))
    localStorage.setItem('totalProd', cart.flat().length)
    let temArr=[]
    // if (e.target.value==0){
    //   setTimeout(() => {
    //     if(e.target.value == 0){
    //       e.target.parentElement.parentElement.remove()
    //     } }, 3000);
    //    }

    if (e.target.value){
      for (let i = 0; i < e.target.value ; i++) {
        temArr.push(cart[id][0])
      }
      cart[id]=temArr
      singelCount[id] = parseInt(e.target.value)
      localStorage.setItem('cart',JSON.stringify(cart))
      localStorage.setItem('singelCount', JSON.stringify(singelCount))
      localStorage.setItem('totalProd', JSON.stringify(cart.flat().length))
      cartCount.innerHTML = localStorage.getItem('totalProd')
      sum.innerHTML = calSum()
    }
  })
  
})




function populateDom(data=null,total=null,id=null){
  let result = document.querySelector('.cart__result')

  let html = ` <div id="${id}"class="cart__products">
            <div class="cart__products-wrapper">
              <img src="${data.image}" alt="" srcset="" />
            </div>
            <p class="cart__products-name">
              ${data.name}
            </p>
            <div class="cart__products-close">
              x
            </div>
            <p class="cart__products-price">
              ${data.price}
            </p>
            <div class="cart__products-quntity">
              <label for="qty">Qty</label>
              <input class="qty" type="number" min="1" id="qty" value="${total.length}" />
            </div>
          </div>`

  result.innerHTML+=html
}

cartCheckout.addEventListener('click',()=>{
  window.location.href='../dist/checkout.html'
})
