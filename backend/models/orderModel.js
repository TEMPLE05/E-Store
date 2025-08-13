import mongoose from "mongoose";

// Clear the cached model to ensure fresh schema
delete mongoose.connection.models['order'];

const orderSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: [true, 'User ID is required']
    },
    items: { 
        type: Array, 
        required: [true, 'Order items are required'],
        validate: {
            validator: function(items) {
                return Array.isArray(items) && items.length > 0;
            },
            message: 'Order must contain at least one item'
        }
    },
    amount: { 
        type: Number, 
        required: [true, 'Order amount is required'],
        min: [0, 'Amount must be positive']
    },
    address: { 
        type: String, 
        required: [true, 'Delivery address is required'],
        minlength: [5, 'Address must be at least 5 characters']
    },
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['COD', 'BANK_TRANSFER'],
            message: '{VALUE} is not a valid payment method. Use COD or BANK_TRANSFER'
        },
        default: 'COD'
        // Note: No required field, default handles it
    },
    payment: { 
        type: Boolean, 
        default: false 
    },
    date: { 
        type: Number, 
        default: Date.now 
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Add indexes for better performance
orderSchema.index({ userId: 1 });
orderSchema.index({ date: -1 });

// Pre-save middleware for additional validation
orderSchema.pre('save', function(next) {
    console.log('Pre-save middleware - paymentMethod:', this.paymentMethod);
    
    // Ensure paymentMethod is set if not provided
    if (!this.paymentMethod) {
        this.paymentMethod = 'COD';
        console.log('Set default paymentMethod to COD');
    }
    
    next();
});

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;