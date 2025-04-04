import mongoose, {Schema} from 'mongoose';

const transactionTypes = ['recharge', 'purchase', 'completion_refund', 'withdrawal'];

const transactionSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  transaction_type: { 
    type: String, 
    enum: transactionTypes, 
    required: true 
  },
  reference_id: String,
  status: { 
    type: String, 
    default: 'completed' 
  },
  notes: String,
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;