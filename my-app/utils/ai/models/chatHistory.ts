import mongoose from 'mongoose';

// Keep the schemas simple
const chatHistorySchema = new mongoose.Schema({
  query: String,
  response: String,
  component: String,
  confidence: Number,
  timestamp: { type: Date, default: Date.now }
});

// export
export const ChatHistory = mongoose.models.ChatHistory || 
  mongoose.model('ChatHistory', chatHistorySchema);