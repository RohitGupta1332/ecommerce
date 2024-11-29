import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    brand: String,
    stock: Number,
    rating: Number,
    expiry: {type: Date}
});

export const Product = mongoose.model("product", productSchema);