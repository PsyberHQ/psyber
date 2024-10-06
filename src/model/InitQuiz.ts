import mongoose, { Document } from 'mongoose';

interface InitQuizResultsType extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  score: number;
  badge: string;
  createdAt: Date;
}

const InitQuizResults = new mongoose.Schema<InitQuizResultsType>(
  {
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
  },
  { timestamps: true }
);

interface InitQuizQuestionsType extends Document {
  index: number;
  question: string;
  options: {
    text: string;
    points: number;
  }[];
}

const InitQuizQuestions = new mongoose.Schema<InitQuizQuestionsType>(
  {
    index: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        points: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const InitQuizQuestionsModel =
  mongoose.models.InitQuizQuestions ||
  mongoose.model<InitQuizQuestionsType>('InitQuizQuestions', InitQuizQuestions);

const InitQuizResultsModel =
  mongoose.models.InitQuizResults ||
  mongoose.model<InitQuizResultsType>('InitQuizResults', InitQuizResults);

export { InitQuizResultsModel, InitQuizQuestionsModel };
export type { InitQuizResultsType, InitQuizQuestionsType };
