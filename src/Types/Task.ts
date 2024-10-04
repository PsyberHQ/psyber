export type TaskWithLessonQuiz = {
  id: string; // Unique identifier for the task
  title: string; // The title of the task
  description: string; // A brief description of the task
  learningTip: string; // A tip to help users learn better
  reward: string; // The reward (e.g., tokens) for completing the task
  lessons: Lesson[]; // An array of lessons related to the task
  quiz: Quiz[]; // An array of quiz questions related to the task
};

type Lesson = {
  id: number; // Unique identifier for the lesson
  title: string; // The title of the lesson
  content: Content[]; // An array of content blocks within the lesson
};

type Content = {
  id: number; // Unique identifier for the content block
  type: 'text' | 'image' | 'video'; // The type of content (in this case, 'text' is used)
  heading: string; // Heading for the content
  content: string; // The actual content text
};

type Quiz = {
  id: number; // Unique identifier for the quiz question
  question: string; // The question text
  options: Option[]; // An array of possible answers
  correctAnswer: number; // The id of the correct answer
};

type Option = {
  id: number; // Unique identifier for each option
  content: string; // The content of the option
};
