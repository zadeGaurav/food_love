const express = require('express')
const router = express.Router()

router.post("/foodData", (req,res)=>{
    try{
        // console.log(global.food_items)
        res.send([global.food_items, global.foodCategory])
        // console.log("send global.food_items to frontend and checked via thunder client")
    }catch(error){
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports = router;