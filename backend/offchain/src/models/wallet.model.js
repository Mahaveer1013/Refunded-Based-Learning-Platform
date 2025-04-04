import mongoose, { Schema } from 'mongoose';

const walletStatus = ['active', 'suspended', 'closed'];

const walletSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  balance: { 
    type: Number, 
    default: 0.0 
  },
  locked_balance: { 
    type: Number, 
    default: 0.0 
  },
  status: { 
    type: String, 
    enum: walletStatus, 
    default: 'active' 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

walletSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;