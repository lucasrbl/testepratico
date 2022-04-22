// FUNÇÕES DE CORREÇÃO
 function fetchProductList(filePath) {
     const productList = require(filePath);
     return productList;
 }

 function characterReplacer(productList) {
     productList.forEach(product => product.name = product.name.replace(/æ/g, 'a').replace(/ø/g, 'o').replace(/¢/g, 'c').replace(/ß/g, 'b'))
 }

 function priceFormatter(productList) {
     productList.forEach(product => {
        if(typeof(product.price) === 'string'){  
            product.price = Number(product.price)
        } 
     })
 }


 function insertQuantity(productList) {
     productList.forEach(product => {
         if(!product.quantity) {
             product.quantity = 0;
         }
     })
 }


function exportNewDbJSON(productList){
    const fs = require('fs')
    const productListJSON = JSON.stringify(productList, null, 4);
    fs.writeFile("./saida.json", productListJSON, err => {
        if (err) {
          console.error(err)
          return
        }
    })
}



//FUNÇÕES DE VALIDAÇÃO


function sortbyCategoryID(productList){
    productList.sort((a, b) => {
    const idCompare = a.id - b.id
    return a.category.localeCompare(b.category) || idCompare 
})
}

function calcTotalPrice(productList){
    let categories = ["Eletrônicos", "Eletrodomésticos", "Panelas", "Acessórios"];
    
    let totalStockValue = {};

    for(let product of productList) {
        for(let category of categories) {
            if(product.category === category){
                totalStockValue[category] = totalStockValue[category] ? totalStockValue[category] + product.price * product.quantity : product.price * product.quantity;
            }
        }
    }
    console.log(totalStockValue)
}




 const productList = fetchProductList('./saida.json');





characterReplacer(productList)
priceFormatter(productList)
insertQuantity(productList)
exportNewDbJSON(productList)
sortbyCategoryID(productList)
calcTotalPrice(productList)
