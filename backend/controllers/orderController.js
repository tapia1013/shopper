import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @desc     Create new order
// @route    POST /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  // bring the data from the front end/req.body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  // check to see if order if no orders throw error, else create new order
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    // if there is an order create new order
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    // save to db
    const createdOrder = await order.save()

    // response with 201 = created, and repond with info
    res.status(201).json(createdOrder)
  }
})




// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  // fetch the order by the url, and user name,email
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  // check if the order exists
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})



export { addOrderItems, getOrderById }