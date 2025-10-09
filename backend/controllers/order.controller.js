import orderModel from "../models/order.model.js";
import shopModel from "../models/shop.model.js";
export const placeOrder=async(req,res)=>{
    try{
        let {cartItems,address,paymentMethod,totalAmount}=req.body;
        console.log(cartItems,address,paymentMethod,totalAmount);
        const cartItemss=cartItems.filter((item,index)=>index>=1)
        console.log(cartItemss);
        cartItems=cartItemss;
        if(cartItems.length<=1) return res.status(400).json({message:"Please add atleast 2 items to your cart"});
        if(!address.text || !address.latitude || !address.longitude) return res.status(400).json({message:"Please provide your delivery address"});
        const groupByShop={};
        cartItems.forEach((item)=>{
            if(!groupByShop[item.shop]){
                groupByShop[item.shop]=[]
            }
            
            groupByShop[item.shop].push(item)
        });
        //     )
        // });
            const shopOrder=await Promise.all( Object.keys(groupByShop).map(async(shopId)=>{
                const shop=await shopModel.findById(shopId).populate("owner");
                if(!shop) return res.status(400).json({message:"Shop not found"});
                console.log(shop);
                const items=groupByShop[shopId];
                let subTotal=items.reduce((sum,i)=> sum+(Number(i.price)*Number(i.quantity)) ,0);
                console.log(subTotal);
                console.log(items);
                return {
                    shop:shop._id,
                    owner:shop.owner._id,
                    items:items.map((i)=>({
                        item:i._id,
                        quantity:i.quantity,
                        price:i.price,
                        name:i.name
                    })),
                    subTotal:subTotal,
                } 
            

                }
            ));
            
        console.log("this is shop order", shopOrder);
            console.log(req.userId,totalAmount,address,paymentMethod,shopOrder);
        const newOrder=await orderModel.create({
            user:req.userId,
            totalAmount:totalAmount,
            address:address,
            payment:paymentMethod,
            shopOrders:shopOrder
        })
        console.log(newOrder);
        return res.status(200).json({message:"Order placed successfully",order:newOrder});


    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong while placing your order in the backend",error:err});
    }
}

export const getUserOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({user:req.userId}).sort({createdAt:-1}).populate("shopOrders.shop shopOrders.owner");
        console.log( "user order are", orders);
        res.status(200).json({message:"Orders fetched successfully",orders:orders});

        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong while getting  your order in the backend",error:err});
    }
}
export const getOwnerOders=async(req,res)=>{
    try{
        const orders=await orderModel.find({"shopOrders.owner":req.userId}).sort({createdAt:-1}).populate("order.shopOrders.owner orders.shopOrders.shop");
        console.log( "owner order are", orders);
        res.status(200).json({message:"Orders fetched successfully",orders:orders});

        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong while getting  your order in the backend",error:err});
    }
}

export default {placeOrder,getUserOrders,getOwnerOders};