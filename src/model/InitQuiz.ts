import mongoose from 'mongoose';

const InitQuiz = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  score: {
    type: Number,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InitQuizModel = mongoose.models.InitQuiz || mongoose.model('InitQuiz', InitQuiz);

export { InitQuizModel };
