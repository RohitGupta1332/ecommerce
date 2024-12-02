import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId, 
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

export const Cart = mongoose.model("cart", cartSchema);