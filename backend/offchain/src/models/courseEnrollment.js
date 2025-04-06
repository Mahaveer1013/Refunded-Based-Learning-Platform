import mongoose, {Schema} from 'mongoose';

const courseEnrollmentSchema = new Schema({
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    course: { 
      type: Schema.Types.ObjectId, 
      ref: 'Course', 
      required: true 
    },
    amount_paid: { 
      type: Number, 
      required: true 
    },
    is_completed: { 
      type: Boolean, 
      default: false 
    },
    completion_date: Date,
    created_at: { 
      type: Date, 
      default: Date.now 
    },
    updated_at: { 
      type: Date, 
      default: Date.now 
    }
  });
  
  courseEnrollmentSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });
  
  const CourseEnrollment = mongoose.model('CourseEnrollment', courseEnrollmentSchema);
  module.exports = CourseEnrollment;