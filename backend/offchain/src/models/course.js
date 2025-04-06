import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
    title: { 
      type: String, 
      required: true, 
      maxlength: 100 
    },
    description: { 
      type: String, 
      maxlength: 500 
    },
    price: { 
      type: Number, 
      required: true 
    },
    is_active: { 
      type: Boolean, 
      default: true 
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
  
  courseSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;