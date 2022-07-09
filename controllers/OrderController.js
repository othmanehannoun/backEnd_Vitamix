const Order = require('../models/Order')

exports.addOrder = (req, res) => {
    const order = new Order(req.body)

    order.save((err, order) => {
        if(err) {
            return res.status('400').json({error: err})
        }

        res.send(order)
    })
}

//GET USER ORDERS
// exports.getOrderByUserId = (req, res) => {

//     try {
//       const orders = Order.find({ userId: req.params.userId });
//       res.status(200).json(orders);
//     } catch (err) {
//       res.status(500).json(err);
//     }

// }
exports.getOrderByUserId = (req, res) => {
  Order.find({userId: req.params.userId}).exec((err, order) => {
      if(err)
          return res.status('400').json({error: err})
      res.send(order)
  })
}

//GET USER ORDERS
exports.getOneOrder = (req, res) => {
  Order.findOne({_id: req.params.id}).exec((err, order) => {
      if(err)
          return res.status('400').json({error: err})
      res.send(order)
  })
}





// exports.getAllSubCategory = (req, res) => {
//     SubCategory.find({}).exec((err, subCategory) => {
//         if(err) {
//             return res.status('400').json({error: err})
//         }

//         res.send(subCategory)
//     })
// }

// exports.getAllSubCategoryFromOneCategory = (req, res) => {
//     SubCategory.find({fromCategory: req.params.subCID}).select('name').exec((err, subCategory) => {
//         if(err) {
//             return res.status('400').json({error: err})
//         }

//         res.send(subCategory)
//     })
// }
