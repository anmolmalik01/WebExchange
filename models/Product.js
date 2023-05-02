import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    websiteName: { type: String },
    websiteLink: { type: String },
    websiteDesc: { type: String },
    websiteType: { type: String },
    // username: { type: String },
    // email: { type: String },
},
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;