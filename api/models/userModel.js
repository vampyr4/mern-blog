import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true, trim:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"},
    isAdmin:{ type:Boolean, default: false}

}
,{timestamps:true});

const User = mongoose.model('User',userSchema);
export default User;
