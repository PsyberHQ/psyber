import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { InitQuizQuestionsModel, InitQuizResultsModel } from '@/model/InitQuiz';
import { UserModel } from '@/model/User';
type Option = {
  text: string;
  points: number;
};
type Question = {
  _id: string;
  index: number;
  question: string;
  options: Option[];
};
type Answer = {
  index: number; // Refers to the question index
  answer: string;
};

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { userEmail, answers } = await request.json();
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (user.badge && user.badge !== '') {
      return NextResponse.json(
        { error: 'User has already completed the quiz, redirecting...', redirect: true },
        { status: 400 }
      );
    }

    const questions = await InitQuizQuestionsModel.find({}).sort({ index: 1 });
    const calculateScore = (answers: Answer[], questions: Question[]): number => {
      return answers.reduce((total: number, answer: Answer) => {
        const question = questions[answer.index - 1]; // Access the question by index
        if (!question || !question.options) {
          console.warn(`Question not found for index ${answer.index}`);
          return total; // Skip to the next answer
        }
        const selectedOption = question.options.find((option) => option.text === answer.answer);
        return total + (selectedOption ? selectedOption.points : 0);
      }, 0);
    };

    const score = calculateScore(answers, questions);

    const userId = user['_id'];
    const badge =
      score === 20
        ? 'Visionary'
        : score >= 15
          ? 'Adventurer'
          : score >= 10
            ? 'Explorer'
            : 'Beginner';

    const quizResult = new InitQuizResultsModel({
      userId,
      score,
      badge,
    });

    // Start a session
    const session = await UserModel.startSession();
    session.startTransaction();
    try {
      await quizResult.save({ session });
      await UserModel.updateOne(
        { _id: user._id },
        {
          badge,
          level: score >= 10 ? 1 : 0, // Set level based on score
          onboardingCompleted: true,
        },
        { session }
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

    return NextResponse.json(
      {
        message: 'Quiz result saved successfully',
        userId,
        badge,
        comment:
          "You're just starting your web3 journey, and that's perfectly okay! Everyone begins somewhere. With a bit of guidance, you'll quickly pick up the basics.",
        comment2:
          "You might be unfamiliar with some web3 terms, but don't worry, we'll take it step-by-step.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz result', errorDetails: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const questions = await InitQuizQuestionsModel.find({}).sort({ index: 1 });
    const sendQuestions = questions.map((question) => {
      return {
        question: question.question,
        options: question.options.map((option: { text: string; points: number }) => {
          return {
            text: option.text,
          };
        }),
        answer: question.answer,
      };
    });
    return NextResponse.json({ questions: sendQuestions });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
