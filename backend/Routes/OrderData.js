const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Order = require('../models/Orders')

// const axios = require('axios')

//Order data end point
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()

    /*    let eId = await Order.findOne({ 'email': req.body.email })
                          ^
    TypeError: Order.findOne is not a function */
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        // for the first order of the user
        try {
            console.log(data)
            console.log("1231242343242354", req.body.email)
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                // appending to privious existing order
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


// // Get logged in User details, Login Required.
// router.post('/getuser', fetch, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId).select("-password") // -password will not pick password from db.
//         res.send(user)
//     } catch (error) {
//         console.error(error.message)
//         res.send("Server Error")

//     }
// })
// // Get logged in User details, Login Required.
// router.post('/getlocation', async (req, res) => {
//     try {
//         let lat = req.body.latlong.lat
//         let long = req.body.latlong.long
//         console.log(lat, long)
//         let location = await axios
//             .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
//             .then(async res => {
//                 // console.log(`statusCode: ${res.status}`)
//                 console.log(res.data.results)
//                 // let response = stringify(res)
//                 // response = await JSON.parse(response)
//                 let response = res.data.results[0].components;
//                 console.log(response)
//                 let { village, county, state_district, state, postcode } = response
//                 return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
//             })
//             .catch(error => {
//                 console.error(error)
//             })
//         res.send({ location })

//     } catch (error) {
//         console.error(error.message)
//         res.send("Server Error")

//     }
// })




router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }


});

module.exports = router