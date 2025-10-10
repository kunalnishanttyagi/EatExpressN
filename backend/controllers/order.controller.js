import orderModel from "../models/order.model.js";
import shopModel from "../models/shop.model.js";
import itemModel from "../models/item.model.js";
// export const placeOrder=async(req,res)=>{
//     try{
//         let {cartItems,address,paymentMethod,totalAmount}=req.body;
//         console.log(cartItems,address,paymentMethod,totalAmount);
//         const cartItemss=cartItems.filter((item,index)=>index>=1)
//         console.log(cartItemss);
//         cartItems=cartItemss;
//         if(cartItems.length<=0) return res.status(400).json({message:"Please add atleast 2 items to your cart"});
//         if(!address.text || !address.latitude || !address.longitude) return res.status(400).json({message:"Please provide your delivery address"});
//         const groupByShop={};
//         cartItems.forEach((item)=>{
//             if(!groupByShop[item.shop]){
//                 groupByShop[item.shop]=[]
//             }
            
//             groupByShop[item.shop].push(item)
//         });
//         //     )
//         // });
//             const shopOrder=await Promise.all( Object.keys(groupByShop).map(async(shopId)=>{
//                 const shop=await shopModel.findById(shopId).populate("owner");
//                 if(!shop) return res.status(400).json({message:"Shop not found"});
//                 console.log(shop);
//                 const items=groupByShop[shopId];
//                 let subTotal=items.reduce((sum,i)=> sum+(Number(i.price)*Number(i.quantity)) ,0);
//                 console.log(subTotal);
//                 console.log(items);
//                 return {
//                     shop:shop._id,
//                     owner:shop.owner._id,
//                     items:items.map((i)=>({
//                         item:i._id,
//                         quantity:i.quantity,
//                         price:i.price,
//                         name:i.name
//                     })),
//                     subTotal:subTotal,
//                 } 
            

//                 }
//             ));
            
//         console.log("this is shop order", shopOrder);
//             console.log(req.userId,totalAmount,address,paymentMethod,shopOrder);
//         const newOrder=await orderModel.create({
//             user:req.userId,
//             totalAmount:totalAmount,
//             address:address,
//             payment:paymentMethod,
//             shopOrders:shopOrder
//         })
//         console.log(newOrder);
//         return res.status(200).json({message:"Order placed successfully",order:newOrder});


//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({message:"Something went wrong while placing your order in the backend",error:err});
//     }
// }

// export const placeOrder = async (req, res) => {
//     try {
//         let { cartItems, address, paymentMethod } = req.body;
//         // Note: We will ignore the client-sent totalAmount for security.

//         if (!cartItems || cartItems.length < 1) {
//             return res.status(400).json({ message: "Please add at least one item to your cart" });
//         }
//         if (!address.text || !address.latitude || !address.longitude) {
//             return res.status(400).json({ message: "Please provide your delivery address" });
//         }

//         // --- Step 1: Fetch Authoritative Item Data from DB ---
//         // Get all unique item IDs from the client's cart
//         const itemIds = cartItems.map(cartItem => cartItem._id);
        
//         // Fetch all of them from the database in a single, efficient query
//         const actualItemsFromDB = await itemModel.find({ '_id': { $in: itemIds } });

//         // Create a Map for quick access to the real item data
//         const itemMap = new Map(actualItemsFromDB.map(item => [item._id.toString(), item]));

//         let serverCalculatedTotal = 0;
//         const groupByShop = {};

//         // --- Step 2: Validate Cart and Group by Shop using DB Data ---
//         for (const cartItem of cartItems) {
//             const actualItem = itemMap.get(cartItem._id);

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


export const placeOrder = async (req, res) => {
    try {
        let { cartItems, address, paymentMethod } = req.body;
        console.log(cartItems);
        // Note: We will ignore the client-sent totalAmount for security.
        const cartItemss=cartItems.filter((item,index)=>index>=1)
        // console.log(cartItemss);
        cartItems=cartItemss;
        console.log(cartItems);
        // if(cartItems.length<=1) return res.status(400).json({message:"Please add atleast 2 items to your cart"});
        if (!cartItems || cartItems.length < 1) {
            return res.status(400).json({ message: "Please add at least one item to your cart" });
        }
        if (!address.text || !address.latitude || !address.longitude) {
            return res.status(400).json({ message: "Please provide your delivery address" });
        }

        // --- Step 1: Fetch Authoritative Item Data from DB ---
        // Get all unique item IDs from the client's cart
        const itemIds = cartItems.map(cartItem => cartItem.id);
        console.log(itemIds);
        
        // Fetch all of them from the database in a single, efficient query
        const actualItemsFromDB = await itemModel.find({ '_id': { $in: itemIds } });
        console.log(actualItemsFromDB);
        // Create a Map for quick access to the real item data
        const itemMap = new Map(actualItemsFromDB.map(item => [item._id.toString(), item]));
        console.log(itemMap);
        let serverCalculatedTotal = 0;
        const groupByShop = {};
        console.log("hii");

        // --- Step 2: Validate Cart and Group by Shop using DB Data ---
        for (const cartItem of cartItems) {
            const actualItem = itemMap.get(cartItem.id);

            if (!actualItem) {
                throw new Error(`Item with ID ${cartItem._id} not found in the database.`);
            }

            // Group by the shop ID from the *database item*
            const shopId = actualItem.shop.toString();
            if (!groupByShop[shopId]) {
                groupByShop[shopId] = [];
            }
            
            // Use the price from the DATABASE, not the client request
            serverCalculatedTotal += actualItem.price * cartItem.quantity;

            // Add the validated item data to the group
            groupByShop[shopId].push({
                item: actualItem._id, // This is the authoritative ObjectId
                name: actualItem.name, // Use authoritative name
                price: actualItem.price, // Use authoritative price
                quantity: cartItem.quantity, // Quantity is from the user's cart
            });
        }

        // --- Step 3: Create the ShopOrder sub-documents ---
        const shopOrder = await Promise.all(
            Object.keys(groupByShop).map(async (shopId) => {
                const shop = await shopModel.findById(shopId).populate("owner");
                if (!shop) throw new Error(`Shop with ID ${shopId} not found`);

                const items = groupByShop[shopId];
                const subTotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    items: items, // 'items' is now an array of validated objects
                    subTotal: subTotal,
                };
            })
        );
        
        // --- Step 4: Create and Save the Final Order ---
        const newOrder = await orderModel.create({
            user: req.userId,
            totalAmount: serverCalculatedTotal, // Use the secure, server-calculated total
            address: address,
            payment: paymentMethod,
            shopOrders: shopOrder
        });

        console.log("Successfully created order:", newOrder);
        return res.status(200).json({ message: "Order placed successfully", order: newOrder });

    } catch (err) {
        console.error("Error in placeOrder:", err);
        res.status(500).json({ message: "Something went wrong while placing your order", error: err.message });
    }
};



export const getUserOrders=async(req,res)=>{
    try{
        const orders = await orderModel.find({ user: req.userId })
    .sort({ createdAt: -1 })
    .populate({
        path: 'shopOrders', // 1. Start by populating the 'shopOrders' array
        populate: [
            {
                path: 'shop', // 2. Within each shopOrder, populate the 'shop' field
                model: 'Shop'
            },
            {
                path: 'owner', // 3. Also populate the 'owner' field
                model: 'User'
            },
            {
                path: 'items', // 4. And also populate the 'items' array
                populate: {
                    path: 'item', // 5. WITHIN each item, populate the 'item' field
                    model: 'Item'
                }
            }
        ]
    });

console.log("user order are", orders);
        console.log( "user order are", orders);
        res.status(200).json({message:"Orders fetched successfully",orders:orders});

        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong while getting  your order in the backend",error:err});
    }
}
export const getOwnerOrders=async(req,res)=>{
    try{
        const orders = await orderModel.find({ "shopOrders.owner": req.userId })
    .sort({ createdAt: -1 }).populate("user")
    .populate({
        path: 'shopOrders', // 1. Start by populating the 'shopOrders' array
        populate: [
            {
                path: 'shop', // 2. Within each shopOrder, populate the 'shop' field
                model: 'Shop'
            },
            {
                path: 'owner', // 3. Also populate the 'owner' field
                model: 'User'
            },
            {
                path: 'items', // 4. And also populate the 'items' array
                populate: {
                    path: 'item', // 5. WITHIN each item, populate the 'item' field
                    model: 'Item'
                }
            }
        ],
        // populate: {
        //     path: 'user', // 2. Within each shopOrder, populate the 'shop' field
        //     model: 'User'
        // },
    }


);

// console.log("user order are", orders);
    console.log(orders.length);
        console.log( "user order are", orders);
        res.status(200).json({message:"Orders fetched successfully",orders:orders});

        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong while getting  your order in the backend",error:err});
    }
}

export default {placeOrder,getUserOrders,getOwnerOrders};