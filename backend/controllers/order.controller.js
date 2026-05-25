// import orderModel from "../models/order.model.js";
// import shopModel from "../models/shop.model.js";
// import itemModel from "../models/item.model.js";
// // export const placeOrder=async(req,res)=>{
// //     try{
// //         let {cartItems,address,paymentMethod,totalAmount}=req.body;
// //         console.log(cartItems,address,paymentMethod,totalAmount);
// //         const cartItemss=cartItems.filter((item,index)=>index>=1)
// //         console.log(cartItemss);
// //         cartItems=cartItemss;
// //         if(cartItems.length<=0) return res.status(400).json({message:"Please add atleast 2 items to your cart"});
// //         if(!address.text || !address.latitude || !address.longitude) return res.status(400).json({message:"Please provide your delivery address"});
// //         const groupByShop={};
// //         cartItems.forEach((item)=>{
// //             if(!groupByShop[item.shop]){
// //                 groupByShop[item.shop]=[]
// //             }
            
// //             groupByShop[item.shop].push(item)
// //         });
// //         //     )
// //         // });
// //             const shopOrder=await Promise.all( Object.keys(groupByShop).map(async(shopId)=>{
// //                 const shop=await shopModel.findById(shopId).populate("owner");
// //                 if(!shop) return res.status(400).json({message:"Shop not found"});
// //                 console.log(shop);
// //                 const items=groupByShop[shopId];
// //                 let subTotal=items.reduce((sum,i)=> sum+(Number(i.price)*Number(i.quantity)) ,0);
// //                 console.log(subTotal);
// //                 console.log(items);
// //                 return {
// //                     shop:shop._id,
// //                     owner:shop.owner._id,
// //                     items:items.map((i)=>({
// //                         item:i._id,
// //                         quantity:i.quantity,
// //                         price:i.price,
// //                         name:i.name
// //                     })),
// //                     subTotal:subTotal,
// //                 } 
            

// //                 }
// //             ));
            
// //         console.log("this is shop order", shopOrder);
// //             console.log(req.userId,totalAmount,address,paymentMethod,shopOrder);
// //         const newOrder=await orderModel.create({
// //             user:req.userId,
// //             totalAmount:totalAmount,
// //             address:address,
// //             payment:paymentMethod,
// //             shopOrders:shopOrder
// //         })
// //         console.log(newOrder);
// //         return res.status(200).json({message:"Order placed successfully",order:newOrder});


// //     }
// //     catch(err){
// //         console.log(err);
// //         res.status(500).json({message:"Something went wrong while placing your order in the backend",error:err});
// //     }
// // }

// // export const placeOrder = async (req, res) => {
// //     try {
// //         let { cartItems, address, paymentMethod } = req.body;
// //         // Note: We will ignore the client-sent totalAmount for security.

// //         if (!cartItems || cartItems.length < 1) {
// //             return res.status(400).json({ message: "Please add at least one item to your cart" });
// //         }
// //         if (!address.text || !address.latitude || !address.longitude) {
// //             return res.status(400).json({ message: "Please provide your delivery address" });
// //         }

// //         // --- Step 1: Fetch Authoritative Item Data from DB ---
// //         // Get all unique item IDs from the client's cart
// //         const itemIds = cartItems.map(cartItem => cartItem._id);
        
// //         // Fetch all of them from the database in a single, efficient query
// //         const actualItemsFromDB = await itemModel.find({ '_id': { $in: itemIds } });

// //         // Create a Map for quick access to the real item data
// //         const itemMap = new Map(actualItemsFromDB.map(item => [item._id.toString(), item]));

// //         let serverCalculatedTotal = 0;
// //         const groupByShop = {};

// //         // --- Step 2: Validate Cart and Group by Shop using DB Data ---
// //         for (const cartItem of cartItems) {
// //             const actualItem = itemMap.get(cartItem._id);

// //             if (!actualItem) {
// //                 throw new Error(`Item with ID ${cartItem._id} not found in the database.`);
// //             }

// //             // Group by the shop ID from the *database item*
// //             const shopId = actualItem.shop.toString();
// //             if (!groupByShop[shopId]) {
// //                 groupByShop[shopId] = [];
// //             }
            
// //             // Use the price from the DATABASE, not the client request
// //             serverCalculatedTotal += actualItem.price * cartItem.quantity;

// //             // Add the validated item data to the group
// //             groupByShop[shopId].push({
// //                 item: actualItem._id, // This is the authoritative ObjectId
// //                 name: actualItem.name, // Use authoritative name
// //                 price: actualItem.price, // Use authoritative price
// //                 quantity: cartItem.quantity, // Quantity is from the user's cart
// //             });
// //         }

// //         // --- Step 3: Create the ShopOrder sub-documents ---
// //         const shopOrder = await Promise.all(
// //             Object.keys(groupByShop).map(async (shopId) => {
// //                 const shop = await shopModel.findById(shopId).populate("owner");
// //                 if (!shop) throw new Error(`Shop with ID ${shopId} not found`);

// //                 const items = groupByShop[shopId];
// //                 const subTotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

// //                 return {
// //                     shop: shop._id,
// //                     owner: shop.owner._id,
// //                     items: items, // 'items' is now an array of validated objects
// //                     subTotal: subTotal,
// //                 };
// //             })
// //         );
        
// //         // --- Step 4: Create and Save the Final Order ---
// //         const newOrder = await orderModel.create({
// //             user: req.userId,
// //             totalAmount: serverCalculatedTotal, // Use the secure, server-calculated total
// //             address: address,
// //             payment: paymentMethod,
// //             shopOrders: shopOrder
// //         });

// //         console.log("Successfully created order:", newOrder);
// //         return res.status(200).json({ message: "Order placed successfully", order: newOrder });

// //     } catch (err) {
// //         console.error("Error in placeOrder:", err);
// //         res.status(500).json({ message: "Something went wrong while placing your order", error: err.message });
// //     }
// // };


// export const placeOrder = async (req, res) => {
//     try {
//         let { cartItems, address, paymentMethod } = req.body;
//         console.log(cartItems);
//         // Note: We will ignore the client-sent totalAmount for security.
//         const cartItemss=cartItems.filter((item,index)=>index>=1)
//         // console.log(cartItemss);
//         cartItems=cartItemss;
//         console.log(cartItems);
//         // if(cartItems.length<=1) return res.status(400).json({message:"Please add atleast 2 items to your cart"});
//         if (!cartItems || cartItems.length < 1) {
//             return res.status(400).json({ message: "Please add at least one item to your cart" });
//         }
//         if (!address.text || !address.latitude || !address.longitude) {
//             return res.status(400).json({ message: "Please provide your delivery address" });
//         }

//         // --- Step 1: Fetch Authoritative Item Data from DB ---
//         // Get all unique item IDs from the client's cart
//         const itemIds = cartItems.map(cartItem => cartItem.id);
//         console.log(itemIds);
        
//         // Fetch all of them from the database in a single, efficient query
//         const actualItemsFromDB = await itemModel.find({ '_id': { $in: itemIds } });
//         console.log(actualItemsFromDB);
//         // Create a Map for quick access to the real item data
//         const itemMap = new Map(actualItemsFromDB.map(item => [item._id.toString(), item]));
//         console.log(itemMap);
//         let serverCalculatedTotal = 0;
//         const groupByShop = {};
//         console.log("hii");

//         // --- Step 2: Validate Cart and Group by Shop using DB Data ---
//         for (const cartItem of cartItems) {
//             const actualItem = itemMap.get(cartItem.id);

//             if (!actualItem) {
//                 throw new Error(`Item with ID ${cartItem._id} not found in the database.`);
//             }

//             // Group by the shop ID from the *database item*
//             const shopId = actualItem.shop.toString();
//             if (!groupByShop[shopId]) {
//                 groupByShop[shopId] = [];
//             }
            
//             // Use the price from the DATABASE, not the client request
//             serverCalculatedTotal += actualItem.price * cartItem.quantity;

//             // Add the validated item data to the group
//             groupByShop[shopId].push({
//                 item: actualItem._id, // This is the authoritative ObjectId
//                 name: actualItem.name, // Use authoritative name
//                 price: actualItem.price, // Use authoritative price
//                 quantity: cartItem.quantity, // Quantity is from the user's cart
//             });
//         }

//         // --- Step 3: Create the ShopOrder sub-documents ---
//         const shopOrder = await Promise.all(
//             Object.keys(groupByShop).map(async (shopId) => {
//                 const shop = await shopModel.findById(shopId).populate("owner");
//                 if (!shop) throw new Error(`Shop with ID ${shopId} not found`);

//                 const items = groupByShop[shopId];
//                 const subTotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

//                 return {
//                     shop: shop._id,
//                     owner: shop.owner._id,
//                     items: items, // 'items' is now an array of validated objects
//                     subTotal: subTotal,
//                 };
//             })
//         );
        
//         // --- Step 4: Create and Save the Final Order ---
//         const newOrder = await orderModel.create({
//             user: req.userId,
//             totalAmount: serverCalculatedTotal, // Use the secure, server-calculated total
//             address: address,
//             payment: paymentMethod,
//             shopOrders: shopOrder
//         });

//         console.log("Successfully created order:", newOrder);
//         return res.status(200).json({ message: "Order placed successfully", order: newOrder });

//     } catch (err) {
//         console.error("Error in placeOrder:", err);
//         res.status(500).json({ message: "Something went wrong while placing your order", error: err.message });
//     }
// };



// export const getUserOrders=async(req,res)=>{
//     try{
//         const orders = await orderModel.find({ user: req.userId })
//     .sort({ createdAt: -1 })
//     .populate({
//         path: 'shopOrders', // 1. Start by populating the 'shopOrders' array
//         populate: [
//             {
//                 path: 'shop', // 2. Within each shopOrder, populate the 'shop' field
//                 model: 'Shop'
//             },
//             {
//                 path: 'owner', // 3. Also populate the 'owner' field
//                 model: 'User'
//             },
//             {
//                 path: 'items', // 4. And also populate the 'items' array
//                 populate: {
//                     path: 'item', // 5. WITHIN each item, populate the 'item' field
//                     model: 'Item'
//                 }
//             }
//         ]
//     });

// console.log("user order are", orders);
//         console.log( "user order are", orders);
//         res.status(200).json({message:"Orders fetched successfully",orders:orders});

        
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({message:"Something went wrong while getting  your order in the backend",error:err});
//     }
// }
// export const getOwnerOrders=async(req,res)=>{
//     try{
//         const orders = await orderModel.find({ "shopOrders.owner": req.userId })
//     .sort({ createdAt: -1 }).populate("user")
//     .populate({
//         path: 'shopOrders', // 1. Start by populating the 'shopOrders' array
//         populate: [
//             {
//                 path: 'shop', // 2. Within each shopOrder, populate the 'shop' field
//                 model: 'Shop'
//             },
//             {
//                 path: 'owner', // 3. Also populate the 'owner' field
//                 model: 'User'
//             },
//             {
//                 path: 'items', // 4. And also populate the 'items' array
//                 populate: {
//                     path: 'item', // 5. WITHIN each item, populate the 'item' field
//                     model: 'Item'
//                 }
//             }
//         ],
//         // populate: {
//         //     path: 'user', // 2. Within each shopOrder, populate the 'shop' field
//         //     model: 'User'
//         // },
//     }


// );

// // console.log("user order are", orders);
//     console.log(orders.length);
//         console.log( "user order are", orders);
//         res.status(200).json({message:"Orders fetched successfully",orders:orders});

        
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({message:"Something went wrong while getting  your order in the backend",error:err});
//     }
// }

// export default {placeOrder,getUserOrders,getOwnerOrders};

























import DeliveryAssignment from "../models/deliveryAssignment.model.js"
import Order from "../models/order.model.js"
import Shop from "../models/shop.model.js"
import User from "../models/user.model.js"
// import { sendDeliveryOtpMail } from "../utils/mail.js"
// import RazorPay from "razorpay"
import dotenv from "dotenv"
import { count } from "console"

dotenv.config()
// let instance = new RazorPay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

export const placeOrder = async (req, res) => {
    try {
        let { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body
        // console.log(cartItems);
        if (cartItems.length == 1 || !cartItems) {
            return res.status(400).json({ message: "cart is empty" })
        }
        let cartItemss=cartItems.filter((item,index)=>index>=1)
        cartItems=cartItemss;
        // console.log(cartItems)
        if (!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({ message: "send complete deliveryAddress" })
        }
        // console.log(cartItems);
        const groupItemsByShop = {}

        cartItems.forEach(item => {
            const shopId = item.shop
            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = []
            }
            groupItemsByShop[shopId].push(item)
        });

        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner")
            if (!shop) {
                return res.status(400).json({ message: "shop not found" })
            }
            const items = groupItemsByShop[shopId]
            const subtotal = items.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0)
            return {
                shop: shop._id,
                owner: shop.owner._id,
                subtotal,
                shopOrderItems: items.map((i) => ({
                    item: i.id,
                    price: i.price,
                    quantity: i.quantity,
                    name: i.name
                }))
            }
        }
        ))

        if (paymentMethod == "online") {
            const razorOrder = await instance.orders.create({
                amount: Math.round(totalAmount * 100),
                currency: 'INR',
                receipt: `receipt_${Date.now()}`
            })
            const newOrder = await Order.create({
                user: req.userId,
                paymentMethod,
                deliveryAddress,
                totalAmount,
                shopOrders,
                razorpayOrderId: razorOrder.id,
                payment: false
            })

            return res.status(200).json({
                razorOrder,
                orderId: newOrder._id,
            })

        }

        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders
        })

        await newOrder.populate("shopOrders.shopOrderItems.item", "name image price")
        await newOrder.populate("shopOrders.shop", "name")
        await newOrder.populate("shopOrders.owner", "name socketId")
        await newOrder.populate("user", "name email mobile")

        const io = req.app.get('io')

        if (io) {
            newOrder.shopOrders.forEach(shopOrder => {
                const ownerSocketId = shopOrder.owner.socketId
                if (ownerSocketId) {
                    io.to(ownerSocketId).emit('newOrder', {
                        _id: newOrder._id,
                        paymentMethod: newOrder.paymentMethod,
                        user: newOrder.user,
                        shopOrders: shopOrder,
                        createdAt: newOrder.createdAt,
                        deliveryAddress: newOrder.deliveryAddress,
                        payment: newOrder.payment
                    })
                }
            });
        }



        return res.status(201).json({msg:"order placed successfully",order:newOrder})
    } catch (error) {
        return res.status(500).json({ message: `place order error ${error}` })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, orderId } = req.body
        const payment = await instance.payments.fetch(razorpay_payment_id)
        if (!payment || payment.status != "captured") {
            return res.status(400).json({ message: "payment not captured" })
        }
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(400).json({ message: "order not found" })
        }

        order.payment = true
        order.razorpayPaymentId = razorpay_payment_id
        await order.save()

        await order.populate("shopOrders.shopOrderItems.item", "name image price")
        await order.populate("shopOrders.shop", "name")
        await order.populate("shopOrders.owner", "name socketId")
        await order.populate("user", "name email mobile")

        const io = req.app.get('io')

        if (io) {
            order.shopOrders.forEach(shopOrder => {
                const ownerSocketId = shopOrder.owner.socketId
                if (ownerSocketId) {
                    io.to(ownerSocketId).emit('newOrder', {
                        _id: order._id,
                        paymentMethod: order.paymentMethod,
                        user: order.user,
                        shopOrders: shopOrder,
                        createdAt: order.createdAt,
                        deliveryAddress: order.deliveryAddress,
                        payment: order.payment
                    })
                }
            });
        }


        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json({ message: `verify payment  error ${error}` })
    }
}



export const getMyOrders = async (req, res) => {
    try {
        
        const user = await User.findById(req.userId)
        // console.log(user);
        if (user.role == "user") {
            const orders = await Order.find({ user: req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "name email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price")
            // console.log(orders);
            return res.status(200).json(orders)
        } else if (user.role == "owner") {
            const orders = await Order.find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user")
                .populate("shopOrders.shopOrderItems.item", "name image price")
                .populate("shopOrders.assignedDeliveryBoy", "fullName mobile")



            const filteredOrders = orders.map((order => ({
                _id: order._id,
                paymentMethod: order.paymentMethod,
                user: order.user,
                shopOrders: order.shopOrders.find(o => o.owner._id == req.userId),
                createdAt: order.createdAt,
                deliveryAddress: order.deliveryAddress,
                payment: order.payment
            })))


            return res.status(200).json(filteredOrders)
        }

    } catch (error) {
        return res.status(500).json({ message: `get User order error ${error}` })
    }
}


export const updateOrderStatus = async (req, res) => {
    try {
        console.log("trying to update order status");
        const { orderId, shopId } = req.params
        const { status } = req.body
        const order = await Order.findById(orderId)
        console.log("order is",order);


        const shopOrder = order.shopOrders.find(o => o.shop == shopId)
        if (!shopOrder) {
            return res.status(400).json({ message: "shop order not found" })
        }
        console.log("shoporder is",shopOrder);
        shopOrder.status = status
        let deliveryBoysPayload = []
        if (status == "out of delivery" && !shopOrder.assignment) {
            const { longitude, latitude } = order.deliveryAddress
            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                        $geometry: { type: "Point", coordinates: [Number(longitude), Number(latitude)] },
                        $maxDistance: 5000
                    }
                }
            })

            const nearByIds = nearByDeliveryBoys.map(b => b._id)
            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: { $nin: ["brodcasted", "completed"] }

            }).distinct("assignedTo")

            const busyIdSet = new Set(busyIds.map(id => String(id)))

            const availableBoys = nearByDeliveryBoys.filter(b => !busyIdSet.has(String(b._id)))
            const candidates = availableBoys.map(b => b._id)

            if (candidates.length == 0) {
                await order.save()
                return res.json({
                    message: "order status updated but there is no available delivery boys"
                })
            }

            const deliveryAssignment = await DeliveryAssignment.create({
                order: order?._id,
                shop: shopOrder.shop,
                shopOrderId: shopOrder?._id,
                brodcastedTo: candidates,
                status: "brodcasted"
            })

            shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo
            shopOrder.assignment = deliveryAssignment._id
            deliveryBoysPayload = availableBoys.map(b => ({
                id: b._id,
                fullName: b.fullName,
                longitude: b.location.coordinates?.[0],
                latitude: b.location.coordinates?.[1],
                mobile: b.mobile
            }))

            await deliveryAssignment.populate('order')
            await deliveryAssignment.populate('shop')
            const io = req.app.get('io')
            if (io) {
                availableBoys.forEach(boy => {
                    const boySocketId = boy.socketId
                    if (boySocketId) {
                        io.to(boySocketId).emit('newAssignment', {
                            sentTo:boy._id,
                            assignmentId: deliveryAssignment._id,
                            orderId: deliveryAssignment.order._id,
                            shopName: deliveryAssignment.shop.name,
                            deliveryAddress: deliveryAssignment.order.deliveryAddress,
                            items: deliveryAssignment.order.shopOrders.find(so => so._id.equals(deliveryAssignment.shopOrderId)).shopOrderItems || [],
                            subtotal: deliveryAssignment.order.shopOrders.find(so => so._id.equals(deliveryAssignment.shopOrderId))?.subtotal
                        })
                    }
                });
            }





        }


        await order.save()
        const updatedShopOrder = order.shopOrders.find(o => o.shop == shopId)
        await order.populate("shopOrders.shop", "name")
        await order.populate("shopOrders.assignedDeliveryBoy", "fullName email mobile")
        await order.populate("user", "socketId")

        const io = req.app.get('io')
        if (io) {
            const userSocketId = order.user.socketId
            if (userSocketId) {
                io.to(userSocketId).emit('update-status', {
                    orderId: order._id,
                    shopId: updatedShopOrder.shop._id,
                    status: updatedShopOrder.status,
                    userId: order.user._id
                })
            }
        }



        return res.status(200).json({
            shopOrder: updatedShopOrder,
            assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
            availableBoys: deliveryBoysPayload,
            assignment: updatedShopOrder?.assignment?._id

        })



    } catch (error) {
        return res.status(500).json({ message: `order status error ${error}` })
    }
}


export const getDeliveryBoyAssignment = async (req, res) => {
    try {
        const deliveryBoyId = req.userId
        const assignments = await DeliveryAssignment.find({
            brodcastedTo: deliveryBoyId,
            status: "brodcasted"
        })
            .populate("order")
            .populate("shop")

        const formated = assignments.map(a => ({
            assignmentId: a._id,
            orderId: a.order._id,
            shopName: a.shop.name,
            deliveryAddress: a.order.deliveryAddress,
            items: a.order.shopOrders.find(so => so._id.equals(a.shopOrderId)).shopOrderItems || [],
            subtotal: a.order.shopOrders.find(so => so._id.equals(a.shopOrderId))?.subtotal
        }))

        return res.status(200).json(formated)
    } catch (error) {
        return res.status(500).json({ message: `get Assignment error ${error}` })
    }
}


export const acceptOrder = async (req, res) => {
    try {
        const { assignmentId } = req.params
        const assignment = await DeliveryAssignment.findById(assignmentId)
        if (!assignment) {
            return res.status(400).json({ message: "assignment not found" })
        }
        if (assignment.status !== "brodcasted") {
            return res.status(400).json({ message: "assignment is expired" })
        }

        const alreadyAssigned = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: { $nin: ["brodcasted", "completed"] }
        })

        if (alreadyAssigned) {
            return res.status(400).json({ message: "You are already assigned to another order" })
        }

        assignment.assignedTo = req.userId
        assignment.status = 'assigned'
        assignment.acceptedAt = new Date()
        await assignment.save()

        const order = await Order.findById(assignment.order)
        if (!order) {
            return res.status(400).json({ message: "order not found" })
        }

        let shopOrder = order.shopOrders.id(assignment.shopOrderId)
        shopOrder.assignedDeliveryBoy = req.userId
        await order.save()


        return res.status(200).json({
            message: 'order accepted'
        })
    } catch (error) {
        return res.status(500).json({ message: `accept order error ${error}` })
    }
}



export const getCurrentOrder = async (req, res) => {
    try {
        const assignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        })
            .populate("shop", "name")
            .populate("assignedTo", "fullName email mobile location")
            .populate({
                path: "order",
                populate: [{ path: "user", select: "fullName email location mobile" }]

            })

        if (!assignment) {
            return res.status(400).json({ message: "assignment not found" })
        }
        if (!assignment.order) {
            return res.status(400).json({ message: "order not found" })
        }

        const shopOrder = assignment.order.shopOrders.find(so => String(so._id) == String(assignment.shopOrderId))

        if (!shopOrder) {
            return res.status(400).json({ message: "shopOrder not found" })
        }

        let deliveryBoyLocation = { lat: null, lon: null }
        if (assignment.assignedTo.location.coordinates.length == 2) {
            deliveryBoyLocation.lat = assignment.assignedTo.location.coordinates[1]
            deliveryBoyLocation.lon = assignment.assignedTo.location.coordinates[0]
        }

        let customerLocation = { lat: null, lon: null }
        if (assignment.order.deliveryAddress) {
            customerLocation.lat = assignment.order.deliveryAddress.latitude
            customerLocation.lon = assignment.order.deliveryAddress.longitude
        }

        return res.status(200).json({
            _id: assignment.order._id,
            user: assignment.order.user,
            shopOrder,
            deliveryAddress: assignment.order.deliveryAddress,
            deliveryBoyLocation,
            customerLocation
        })


    } catch (error) {

    }
}

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId)
            .populate("user")
            .populate({
                path: "shopOrders.shop",
                model: "Shop"
            })
            .populate({
                path: "shopOrders.assignedDeliveryBoy",
                model: "User"
            })
            .populate({
                path: "shopOrders.shopOrderItems.item",
                model: "Item"
            })
            .lean()

        if (!order) {
            return res.status(400).json({ message: "order not found" })
        }
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({ message: `get by id order error ${error}` })
    }
}

export const sendDeliveryOtp = async (req, res) => {
    try {
        const { orderId, shopOrderId } = req.body
        const order = await Order.findById(orderId).populate("user")
        const shopOrder = order.shopOrders.id(shopOrderId)
        if (!order || !shopOrder) {
            return res.status(400).json({ message: "enter valid order/shopOrderid" })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        shopOrder.deliveryOtp = otp
        shopOrder.otpExpires = Date.now() + 5 * 60 * 1000
        await order.save()
        await sendDeliveryOtpMail(order.user, otp)
        return res.status(200).json({ message: `Otp sent Successfuly to ${order?.user?.fullName}` })
    } catch (error) {
        return res.status(500).json({ message: `delivery otp error ${error}` })
    }
}

export const verifyDeliveryOtp = async (req, res) => {
    try {
        const { orderId, shopOrderId, otp } = req.body
        const order = await Order.findById(orderId).populate("user")
        const shopOrder = order.shopOrders.id(shopOrderId)
        if (!order || !shopOrder) {
            return res.status(400).json({ message: "enter valid order/shopOrderid" })
        }
        if (shopOrder.deliveryOtp !== otp || !shopOrder.otpExpires || shopOrder.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid/Expired Otp" })
        }

        shopOrder.status = "delivered"
        shopOrder.deliveredAt = Date.now()
        await order.save()
        await DeliveryAssignment.deleteOne({
            shopOrderId: shopOrder._id,
            order: order._id,
            assignedTo: shopOrder.assignedDeliveryBoy
        })

        return res.status(200).json({ message: "Order Delivered Successfully!" })

    } catch (error) {
        return res.status(500).json({ message: `verify delivery otp error ${error}` })
    }
}

export const getTodayDeliveries=async (req,res) => {
    try {
        const deliveryBoyId=req.userId
        const startsOfDay=new Date()
        startsOfDay.setHours(0,0,0,0)

        const orders=await Order.find({
           "shopOrders.assignedDeliveryBoy":deliveryBoyId,
           "shopOrders.status":"delivered",
           "shopOrders.deliveredAt":{$gte:startsOfDay}
        }).lean()

     let todaysDeliveries=[] 
     
     orders.forEach(order=>{
        order.shopOrders.forEach(shopOrder=>{
            if(shopOrder.assignedDeliveryBoy==deliveryBoyId &&
                shopOrder.status=="delivered" &&
                shopOrder.deliveredAt &&
                shopOrder.deliveredAt>=startsOfDay
            ){
                todaysDeliveries.push(shopOrder)
            }
        })
     })

let stats={}

todaysDeliveries.forEach(shopOrder=>{
    const hour=new Date(shopOrder.deliveredAt).getHours()
    stats[hour]=(stats[hour] || 0) + 1
})

let formattedStats=Object.keys(stats).map(hour=>({
 hour:parseInt(hour),
 count:stats[hour]   
}))

formattedStats.sort((a,b)=>a.hour-b.hour)

return res.status(200).json(formattedStats)
  

    } catch (error) {
        return res.status(500).json({ message: `today deliveries error ${error}` }) 
    }
}


export default {placeOrder,getMyOrders,getDeliveryBoyAssignment,acceptOrder,getCurrentOrder,getOrderById,sendDeliveryOtp,verifyDeliveryOtp,getTodayDeliveries};
