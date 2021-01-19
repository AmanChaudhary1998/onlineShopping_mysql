const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    }
});

module.exports = Cart;






















// ----------------------- File System Approach -------------------------------------------------------------------

// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'cart.json'
//   );
  
// module.exports = class Cart {
//     static addProduct(id,productPrize) {

//         fs.readFile(p,(err,fileContent)=>{
//             let cart = {products:[], totalPrice: 0};
//             if(!err)
//             {
//                 cart = JSON.parse(fileContent);
//                 console.log(cart);
//             }
//             const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
//             const existingProduct = cart.products[existingProductIndex];
//             let updatedProduct;
//             if(existingProduct)
//             {
//                 updatedProduct = {...existingProduct};
//                 updatedProduct.qty = updatedProduct.qty + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProduct;
//             }
//             else{
//                 updatedProduct = {id:id,qty: 1};
//                 cart.products = [...cart.products,updatedProduct];
//             }
//             cart.totalPrice = cart.totalPrice + +productPrize;
//             fs.writeFile(p, JSON.stringify(cart),(err)=>{
//                 console.log(err);
//             })
//         });
//     }

//     static deleteProduct(id, productPrize) {
//         fs.readFile(p, (err, fileContent) =>{
//             if(err)
//             {
//                 return;
//             }
//             const updatedCart = {...JSON.parse(fileContent)}
//             const product = updatedCart.products.find(prod=> prod.id === id);
//             if(!product) {
//                 return;
//             }
//             const productQty = product.qty
//             updatedCart.products = updatedCart.products.filter(prod=> prod.id !== id);
//             updatedCart.totalPrice = updatedCart.totalPrice - productPrize*productQty;

//             fs.writeFile(p, JSON.stringify(updatedCart),(err)=>{
//                 console.log(err);
//             });
//         });
//     }

//     static getCart(cb) {
//         fs.readFile(p,(err,fileContent)=>{
//             const cart = JSON.parse(fileContent);
//             if(err)
//             {
//                 return cb(null);
//             }else {
//                 cb(cart);
//             }
//         });
//     }
// }