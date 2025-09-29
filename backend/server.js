require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql =require("mysql2")
const passport=require("passport")
const session=require("express-session")
const LocalStrategy=require("passport-local").Strategy;
const bcrypt=require("bcryptjs")
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const multer = require("multer");
app.use(cors({
  origin: "http://localhost:5173",   // frontend ka port
 credentials:true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads")); // image ko serve karne ke liye
app.use(express.urlencoded({ extended: true }));

const db=mysql.createConnection({
host:process.env.MYSQLHOST,
user:process.env.MYSQLUSER,
database:process.env.MYSQLDATABASE
})

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // server band ho jaye agar DB hi connect na ho
  }
  console.log("Database connected successfully");
});


// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique name
  }
});

const upload = multer({ storage: storage });
const sessionStore = new MySQLStore({}, db.promise());

app.use(session({
  secret:process.env.SESSION_SECRET,
 store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,   // dev mein false rakho, production mein true (https ke saath)
    maxAge: 1000 * 60 * 60 * 24 // 1 din
  }
}));


app.use(passport.initialize());
app.use(passport.session());

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // user login hai, aage jane do
  }
  res.status(401).json({ message: "Not logged in" });
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.json({ message: "Already logged in" });
  }
  next();
}


passport.use(new LocalStrategy({usernameField:"email"},(email,password,done)=>{
const sql=`select * from users where email=?`
db.query(sql,[email],(err,result)=>{
if(err) return done(err);
if(result.length===0) return done(null,false,{message:"user not registered"})
const user=result[0];
bcrypt.compare(password,user.password,(err,match)=>{
if(err) return done(err)
if(!match) return done(null,false,{message:"password not correct"})
delete user.password
return done(null,user)
})
})
}))

passport.serializeUser((user,done)=> done(null,user.user_id))
passport.deserializeUser((id,done)=>{
db.query("select * from users where user_id=?",[id],(err,result)=>{
if(err) return done(err);
return done(null,result[0])
})
})

app.get("/", (req, res) => {
    res.send("E-commerce backend is running...");
});





app.post("/register" ,(req,res)=>{
const {name,email,password,phone,address,role}=req.body;
bcrypt.hash(password,10,(err,hash)=> {
let sql=`insert into users (name,email,password,phone,address,role) values (?,?,?,?,?,?)`
db.query(sql,[name,email,hash,phone,address,role],(err,result)=>{
res.status(200).json({message:"successful"})
})
})
})

app.get("/categories",(req,res)=>{
let sql="select * from categories"
db.query(sql,(err,result)=>{
if(err) return res.status(500).send(err);
res.json(result)
})
})

app.get("/subcategory/:categoryId",(req,res)=>{
const {categoryId}=req.params;
let sql="select * from subcategories where category_id=?"
db.query(sql,[categoryId],(err,result)=>{
if(err) return  res.status(500).json(err)
res.json(result)
})
})






app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


app.get("/products/:subcategoryId", (req, res) => {
const {subcategoryId}=req.params;
let sql= "SELECT * FROM products where subcategory_id=?";
  db.query(sql,[subcategoryId],(err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get("/randomsP/:subcategoryId",(req,res)=>{
const {subcategoryId}=req.params;
db.query("select * from products where subcategory_id=? order by rand() limit 8; ",[subcategoryId],(err,result)=>{
if(err) return res.status(500).send(err)
res.json(result)
})
})

app.post("/login",checkNotAuthenticated,passport.authenticate("local"), (req,res) => {
  res.json({ message:"logged in successful", user:req.user });
});


app.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).send({ message: "Logout error", error: err });
    }

    // Session destroy
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send({ message: "Session destroy error", error: err });
      }

      // Cookie clear
      res.clearCookie("connect.sid");
      return res.send({ message: "Logged out successfully" });
    });
  });
});






app.post("/product", upload.array("file",5), (req, res) => {                                                                                   const { name, description, price, stock, category_id, subcategory_id} = req.body;
  const image_url = req.files.map(file => `/uploads/${file.filename}`);

  let sql = `INSERT INTO products
    (name, description, price, stock, category_id, image_url,subcategory_id)
    VALUES (?,?,?,?,?,?,?)`;
  db.query(sql, [name, description, price, stock, category_id, JSON.stringify(image_url),subcategory_id], (err, result) => {
    if (err) {
return res.status(500).send(err);}
    res.json({ message: "Product added", productId: result.insertId });
  });
});


//cart routes




app.post("/cart/add", (req, res) => {
const {product_id,price,qty}= req.body;
console.log("user:",req.user)

if(!req.user) return res.status(401).send({message:"user not logged in"})
const sql="select * from carts where user_id=?"
let cartId;
db.query(sql,[req.user.user_id],(err,result)=>{
console.log(" najom 1",result[0])
if(err) return res.status(500).send(err)
if(result.length>0){
cartId=result[0].id
handleItems()
} else {
db.query("insert into carts (user_id,shipping_address,status,total_price) values (?,?,?,0)",[req.
user.user_id,req.user.address,'active'],(err,result)=>{
if(err) return res.status(500).send(err);
console.log("najim alam")
cartId=result.insertId
handleItems()

})
}
})

function handleItems (){
const sql2="select * from cart_items where cart_id=? and product_id=? "
db.query(sql2,[cartId,product_id],(err,result)=>{
if(err) return res.status(500).send(err);
if(result.length>0){
db.query("update cart_items set qty= qty + ? where cart_id= ? and product_id= ?",[qty,cartId,
product_id],(err)=>{
if(err) return res.status(500).send(err);
})
db.query("update carts set total_price=total_price + ? where id= ?",[price * qty,cartId],(err)=>{
if(err) return res.status(500).send(err);
})

}else{
console.log("hi najim")
db.query("insert into cart_items (cart_id,product_id,qty,price) values (?,?,?,?)", [cartId,product_id,qty,price],(err)=>{
if(err) return res.status(500).send(err);
})
db.query("update carts set total_price=total_price + ? where id= ?",[price * qty,cartId],(err)=>{
if(err) return res.status(500).send(err);
return res.send({message:"data insert in cart_items",cartId})
})

}


})
}
});

app.get("/cart/views",(req,res)=>{
if(!req.user) return res.send({message:"user not logged in"});
db.query("select * from carts where user_id=?",[req.user.user_id],(err,result)=>{
if(err) return res.status(500).send(err);
if(result.length>0){
db.query("select c.id as cartItem_id,c.cart_id,c.qty,p.name,p.price,p.description,p.image_url from cart_items c join products p on c.product_id=p.product_id where cart_id=?",[result[0].id],(err,result2)=>{
if(err) return res.status(500).send(err);

return res.send({message:"your cart items",items:result2})
})
}else{
return res.send({message:"your cart empty",items:result})
}
})
})

app.delete("/itemRemove/:id",(req,res)=>{
const {id}=req.params
db.query("delete from cart_items where id=?",[id],(err,result)=>{
if(err) return res.status(500).send(err);
res.send({message:"remove item from cart"})
})
})



app.post("/placeOrder",(req,res)=>{
const {cartId,total_price,shipping_address}=req.body
if(!req.user) return res.send({message:"user not logged in"})
const userId=req.user.user_id
db.beginTransaction(err=>{
if(err) return res.status(500).send(err)
db.query("select * from carts where id=? and status=?",[cartId,"active"],(err,result)=>{
if(err) return rollback(()=>res.status(500).send(err))
if(result.length===0) return res.send({message:"cart already check out"})
db.query("update carts set status=? where id=?",["checked_out",cartId],(err,result)=>{
if(err) return rollback(()=>res.status(500).send(err))
db.query("select * from cart_items where cart_id=?",[cartId],(err,resultItem)=>{
if(err) return rollback(()=>res.status(500).send(err))
if(resultItem.length===0) return res.send({message:"empty cart"})
db.query("insert into orders (user_id,cart_id,total_price,payment_status,order_status,shipping_address) values (?,?,?,?,?,?)"
,[userId,cartId,total_price,'pending','processing',shipping_address],(err,resultOrder)=>{
const orderId=resultOrder.insertId
if(err) return rollback(()=>res.status(500).send(err))
db.query("insert into order_items (order_id,product_id,qty,price) select ?,product_id,qty,price from cart_items where cart_id=?",
[orderId,cartId],(err,result)=>{
if(err) return rollback(()=>res.status(500).send(err))
db.commit(err=>{
if(err) return rollback(()=>res.status(500).send(err))
res.send({message:"place order successful"})
})
})
})
})
})
})
})
})

app.get("/product/:id/ratings", (req,res)=>{
  const productId = req.params.id;
  db.query(
    "SELECT ROUND(AVG(rating),1) AS average_rating, COUNT(*) AS total_reviews FROM ratings WHERE product_id=?",
    [productId],
    (err,result)=>{
      if(err) return res.status(500).send(err);
      res.json(result); 
    }
  )
})


app.get("/carts/:id",(req,res)=>{
const {id}=req.params
db.query("select id as cartId,total_price,shipping_address from carts where id=?",[id],(err,result)=>{
if(err) return res.status(500).send(err)
res.send(result)
})
})

app.post("/reviews",(req,res)=>{
const {reviews,rating,product_id}=req.body
const userId=req.user.user_id
console.log(userId)
db.query("insert into ratings (user_id,product_id,rating,review_text) values (?,?,?,?)",[userId,product_id,rating,reviews],(err,result)=>{
console.log("successfull")
console.log(req.body,userId)
res.send("reviews data")
})
})


app.get("/reviews",(req,res)=>{
db.query("select * from ratings",(err,result)=>{
res.send("select successfull")
})
})

const PORT =process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

