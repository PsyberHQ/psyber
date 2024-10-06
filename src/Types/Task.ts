export type LessonType = {
  id: number; // Unique identifier for the lesson
  title: string; // The title of the lesson
  content: ContentType[]; // An array of content blocks within the lesson
  specialImage?: string; // URL of a special image for the lesson
};

export type ContentType = {
  id: number; // Unique identifier for the content block
  type: 'text' | 'image' | 'video'; // The type of content (in this case, 'text' is used)
  heading?: string; // Heading for the content
  content?: string; // The actual content text
  image?: string; // URL of the image (if the content type is 'image')
};

export type QuizType = {
  id: number; // Unique identifier for the quiz question
  question: string; // The question text
  options: OptionType[]; // An array of possible answers
  correctAnswer: number; // The id of the correct answer
};

export type OptionType = {
  id: number; // Unique identifier for each option
  content: string; // The content of the option
};

export type TaskWithLessonQuizType = {
  index: number; // Unique identifier for the task
  title: string; // The title of the task
  description: string; // A brief description of the task
  learningTip: string; // A tip to help users learn better
  reward: string; // The reward (e.g., tokens) for completing the task
  lessons: LessonType[]; // An array of lessons related to the task
  quiz: QuizType[]; // An array of quiz questions related to the task
  type: 'TaskWithLessonQuiz'; // The type of task (in this case, 'TaskWithLessonQuiz' is used)
};

export type TaskWithImageType = {
  index: number; // Unique identifier for the task
  title: string; // The title of the task
  description: string; // A brief description of the task
  learningTip: string; // A tip to help users learn better
  reward: string; // The reward (e.g., tokens) for completing the task
  lessons: LessonType[]; // An array of lessons related to the task
  type: 'TaskWithImage'; // The type of task (in this case, 'TaskWithImage' is used)
};

export type FulltasksType = TaskWithLessonQuizType | TaskWithImageType;
