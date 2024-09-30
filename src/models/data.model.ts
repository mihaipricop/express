import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

interface IData extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  course: string;
  semester: string;
  year: string;
  owner: string;
}

const dataSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    lowercase: true, 
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email format'
    }
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'], 
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'any'),
      message: 'Invalid phone number format'
    }
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'], 
    trim: true 
  },
  birthday: { 
    type: String, 
    required: [true, 'Birthday is required'], 
    validate: {
      validator:  (value: string) => /^\d{2}\/\d{2}$/.test(value),
      message: 'Invalid birthday format. Expected format: MM/DD'
    }
  },
  course: { 
    type: String, 
    required: [true, 'Course is required'], 
    trim: true 
  },
  semester: { 
    type: String, 
    required: [true, 'Semester is required'], 
    enum: ['Fall', 'Spring', 'Summer'],
    trim: true 
  },
  year: { 
    type: String, 
    required: [true, 'Year is required'], 
    validate: {
      validator: (value: string) => validator.isInt(value, { min: new Date().getFullYear() - 1 , max: new Date().getFullYear() + 5 }),
      message: 'Invalid year format, should be between last year and 5 years from now'
    }
  },
  owner: { 
    type: String, 
    required: true
  }
});

const Data = mongoose.model<IData>('Data', dataSchema);

export default Data;