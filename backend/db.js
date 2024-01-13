const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mernSecond:gaurav123@cluster0.6gccduu.mongodb.net/food_love?retryWrites=true&w=majority"


const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) {
            console.log("---", err)
        }
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category")
                foodCategory.find({}).toArray(function(err, catData){
                    if (err) { console.log("err") }
                    else{
                        global.food_items = data
                        global.foodCategory = catData
                        // console.log(global.foodCategory)
                    }
                })
                // if (err) { console.log("err") }
                // else {
                //     global.food_items = data
                //     // console.log(global.food_items)
                // }
            })
        }
    })
}

module.exports = mongoDB


// Expected an assignment or function call and instead saw an expression.
//with previous version of mongoose 7.2.3 as mongoose.connect is no longer excepting callbacks.


