import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */
let workList = [];
let homeList = [];
let birthdaylist = [];
let wishlist = [];
//post route for adding new task
app.post("/", (req, res, next) => {
    var key = Object.keys(req.body)[0];
    var ItemToBeAdded = req.body[key];
    if (key == "newItem") {
      homeList.push(ItemToBeAdded);
      res.redirect("/");
      next();
    }
    else if (key == "newItem3") {
      wishlist.push(ItemToBeAdded);
      res.redirect("/wishList");
      next();
    }
    else if (key == "newItem4") {
      birthdaylist.push(ItemToBeAdded);
      res.redirect("/birthdayList");
      next();
    } else {
      workList.push(ItemToBeAdded);
      res.redirect("/workList");
      next();
    }
  });
//render the ejs and display added task, task(index.ejs) = task(array)
app.get("/",(req,res)=>{
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };  
    let day = new Date().toLocaleDateString(undefined,options);
    res.render("index.ejs",{
    today : day,      
    newListItems1 : homeList }); // objects which need to be shown in index.ejs
  });

app.get("/workList",(req,res)=>{
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };  
    let day = new Date().toLocaleDateString(undefined,options);
    res.render("work.ejs",{
    today : day,
    newListItems2 : workList }); // objects which need to be shown in index.ejs
  });
  app.get("/wishList",(req,res)=>{
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };  
    let day = new Date().toLocaleDateString(undefined,options);
    res.render("wishlist.ejs",{
    today : day,
    newListItems3 : wishlist }); // objects which need to be shown in index.ejs
  });
  app.get("/birthdayList",(req,res)=>{
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };  
    let day = new Date().toLocaleDateString(undefined,options);
    res.render("birthday.ejs",{
    today : day,
    newListItems4 : birthdaylist }); // objects which need to be shown in index.ejs
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  
});
