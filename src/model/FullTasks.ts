import mongoose, { Schema, Document } from 'mongoose';

// Option Schema
const OptionSchema = new Schema({
  id: { type: Number, required: true },
  content: { type: String, required: true },
});

// Quiz Schema
const QuizSchema = new Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
  correctAnswer: { type: Number, required: true },
});

//  Content Schema
const ContentSchema = new Schema({
  id: { type: Number, required: true },
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  heading: { type: String },
  content: { type: String },
  image: { type: String },
});

// Lesson Schema
const LessonSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: [ContentSchema], required: true },
  specialImage: { type: String },
});

// Define Task Schema
const TaskSchema = new Schema({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  learningTip: { type: String, required: true },
  reward: { type: String, required: true },
  lessons: { type: [LessonSchema], required: true },
  quiz: { type: [QuizSchema], required: false },
  type: { type: String, enum: ['TaskWithLessonQuiz', 'TaskWithImage'], required: true },
});

// Create a Model for the Unified Task Schema
const FullTasksModel =
  mongoose.models.FullTasks || mongoose.model<Document>('FullTasks', TaskSchema);

export { FullTasksModel };
