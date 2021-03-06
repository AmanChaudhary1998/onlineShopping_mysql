const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-Item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// Checking mysql database working properly or not 

// db.execute('SELECT * FROM products')
// .then((result)=>{
//   console.log(result);
// })
// .catch((err)=>{
//   console.log(err);
// })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findByPk(1)
  .then((user)=>{
    req.user = user;
    next();
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.use('/admin', adminRoutes);
app.use('/',shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '404' });
});

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
//.sync({force: true})
.sync()
.then((result)=>{
  return User.findByPk(1);
})
.then((user)=>{
  if(!user)
  {
    return User.create({
      name:"Aman",
      email: "text@test.com"
    });
  }
  return user;
})
.then((user)=>{
  console.log('user', user);
  return user.createCart();
})
.then((cart)=>{
  app.listen(PORT,()=>{
    console.log(`Server is connected at http://localhost:${PORT}`)
  });
})
.catch((err) =>{
  console.log(err);
})

