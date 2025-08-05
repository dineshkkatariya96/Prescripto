import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        
        const res = await mongoose.connect(process.env.MONGO_URI);
        
        // Once connected, this event will fire
        mongoose.connection.on('connected', () => {
            console.log("Database connected");
        });
    } catch (err) {
        console.log("Database connection error:", err);
    }
};

export default connectDB;
