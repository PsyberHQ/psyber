import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { InitQuizModel } from '@/model/InitQuiz';
import { UserModel } from '@/model/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { userEmail, score } = await request.json();
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
    const userId = user['_id'];
    const badge =
      score == 20
        ? 'Visionary'
        : score >= 15
          ? 'Adventurer'
          : score >= 10
            ? 'Explorer'
            : 'Beginner';

    const quizResult = new InitQuizModel({
      userId,
      score,
      badge,
    });

    // Start a session
    const session = await UserModel.startSession();
    session.startTransaction();
    try {
      await quizResult.save({ session });
      await UserModel.updateOne({ _id: user._id }, { badge }, { session });
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
        score,
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
    return NextResponse.json({ error: 'Failed to save quiz result' }, { status: 500 });
  }
}
