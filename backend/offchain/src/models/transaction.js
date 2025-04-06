import mongoose, {Schema} from 'mongoose';

const transactionTypes = ['recharge', 'purchase', 'refund', 'withdrawal', 'money_transfer'];

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
  payment_id: {
    type: String, 
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
  refunded: {
    type: Number,
    required: () => this.transaction_type === 'purchase',
  },
  refund_from: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: () => this.transaction_type === 'refund' 
  },
  notes: String,
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;