import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @desc     Create new order
// @route    POST /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;


  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
    return;
  } else {
    // create new order
    const order = new Order({
      orderItems,
      user: req.user_id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    // save to DB
    const createdOrder = await Order.save();

    // return the data we saved and created
    res.status(201).json(createdOrder);
  }

})

export {
  addOrderItems
}