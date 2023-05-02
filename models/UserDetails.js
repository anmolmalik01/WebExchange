import mongoose from 'mongoose';

const userdetailsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userDesc: { type: String },
    tags: [{
      type: String,
      required: true,
    }],
    github: { type: String },
    instagram: { type: String },
    medium: { type: String },


  }, { timestamps: true });

const UserDetails = mongoose.models.UserDetails || mongoose.model('UserDetails', userdetailsSchema);
export default UserDetails;