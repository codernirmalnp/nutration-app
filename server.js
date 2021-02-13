require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwtDecode = require('jwt-decode');
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const User = require('./data/User');
const InventoryItem = require('./data/Item');
const path=require('path')
const multer=require('multer')

var dir = path.join(__dirname, 'uploads');





const {
  createToken,
  hashPassword,
  verifyPassword
} = require('./util');

const app = express();
const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false})); 
app.use(express.json());
app.use(cookieParser())
app.use('/uploads',express.static(dir))



const storage=multer.diskStorage({
  destination:function(req,file,cb)
  {
    cb(null,'uploads')
  },
  filename:function(req,file,cb)
  {
    cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("image")
app.post('/api/authenticate',async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email
    }).lean();
  
    if (!user) {
      return res.status(403).json({
        message: 'Wrong email or password.'
      });
    }

    const passwordValid = await verifyPassword(
      password,
      user.password
    );

    if (passwordValid) {
      const { password, bio, ...rest } = user;
      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(userInfo);

      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      res.cookie('token',token,{httpOnly:true,sameSite:true})    
      res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt
      });
    } else {
      res.status(403).json({
        message: 'Wrong email or password.'
      });
    }
  } catch (err) {
   
    return res
      .status(400)
      .json({ message: 'Something went wrong.' });
  }
});
app.get(
  '/api/item',
 async (req, res) => {
   const totalItem=await InventoryItem.countDocuments().exec();
   const page=req.query.page ? parseInt(req.query.page):1
 
   const searchKeyword = req.query.search !="undefined"
    ? {
        itemName: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {};
   const limit=3;
   const startIndex=(page-1)*limit
   const endIndex=limit*page;
   const result={}
   result.totalPage=Math.ceil(totalItem/limit);
   result.currentPage=page
   if(startIndex > 0)
   {
     result.previous={
      page:page-1,
      limit:limit
     }
   }
   if(endIndex < totalItem)
   {
     result.next={
       page:page+1,
       limit:limit
     }
   }

   try{
   
   
    result.data=await InventoryItem.find({...searchKeyword}).limit(limit).skip(startIndex)
    

    
      res.status(200).json(result)

   }
   catch(e)
   {
     res.send(e)
   }


  

}
  
);


const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication invalid' });
  }
  const decodedToken = jwtDecode(token);

  if (!decodedToken) {
    return res.status(401).json({
      message: 'There was a problem authorizing the request'
    });
  } else {
    req.user = decodedToken;
    next();
  }
};

app.use(attachUser);

const requireAuth = jwt({
  secret: process.env.JWT_SECRET,
  audience: 'api.orbit',
  issuer: 'api.orbit',
  getToken:req=>req.cookies.token
 
});


const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res
      .status(401)
      .json({ message: 'Insufficient role' });
  }
  next();
};


app.post('/api/logout',async (req, res) => {
  res.cookie('token', '', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
  })
  res.status(200).json({ success: true, message: 'User logged out successfully' })
})





app.post(
  '/api/item',
  requireAuth,
  requireAdmin,
   (req, res) => {
    upload(req, res, async function (err) {

      if (err) {

              return res.send({ success: false, msg: 'something went wrong' })
          

          }

      else {

          if (!req.file) {

              return res.send({ success: false, msg: 'No file selected' })

          }

          try {
       const {fat,protein,carbohydrate,itemName}=req.body
       const image=req.file.filename
            const inventoryItem = new InventoryItem({fat,protein,carbohydrate,itemName,image});
            await inventoryItem.save();
            res.status(201).json({
              message: ' item created!',
              inventoryItem
            });
          } catch (err) {
            console.log(err)
            return res.status(400).json({
              message: 'There was a problem creating the item'
            });
          }


      }

  });
 
  }
);

app.delete(
  '/api/item/:id',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const deletedItem = await InventoryItem.findOneAndDelete(
        { _id: req.params.id }
      );
      await deletedItem.remove();
      res.status(201).json({
        message: 'Inventory item deleted!',
        deletedItem
      });
    } catch (err) {
      return res.status(400).json({
        message: 'There was a problem deleting the item.'
      });
    }
  }
);

app.get('/api/users', requireAuth, async (req, res) => {
  try {
    const users = await User.find()
      .lean()
      .select('_id firstName lastName avatar bio');

    res.json({
      users
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem getting the users'
    });
  }
});


  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });


async function connect() {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } catch (err) {
    console.log('Mongoose error', err);
  }
  app.listen(process.env.PORT || 3000);
  console.log(`API listening on localhost:${process.env.PORT} `);
}

connect();
