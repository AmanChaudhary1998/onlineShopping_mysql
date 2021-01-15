const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log(editMode);
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId
  Product.findById(prodId,(product)=>{
    if(!product) {
      return res.render('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product:product
    });
  });
};

exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  const updatetitle = req.body.title;
  const updateImageUrl = req.body.imageUrl;
  const updateprice = req.body.price;
  const updatedescription = req.body.description;

  const updatedProduct = new Product(
    prodId,updatetitle,updateImageUrl, updatedescription,updateprice
  );
  console.log(updatedProduct);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  console.log(prodId);
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
