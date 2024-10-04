import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  try {
    await dbConnect();
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (!user.badge && user.badge === '') {
      return NextResponse.json(
        { error: 'User havent completed the quiz, redirecting...', redirect: true },
        { status: 400 }
      );
    }
    const { taskId } = await request.json();
    if (!taskId) {
      return NextResponse.json({ error: 'Task number is required' }, { status: 400 });
    }
    const task = parseInt(taskId as string);
    const { level } = user;
    if (task <= level) {
      return NextResponse.json(
        { error: 'User already completed this task', redirect: true },
        { status: 400 }
      );
    }
    if (task > level + 1) {
      return NextResponse.json({ error: 'User skipped tasks', redirect: true }, { status: 400 });
    }
    const taskReward = task <= 2 ? 50 : task === 3 ? 100 : task === 4 ? 0 : 0;
    try {
      await UserModel.updateOne(
        { _id: user._id },
        {
          level: task,
          xp: user.xp + taskReward,
        }
      );
    } catch (error) {
      console.error('Error updating user badge:', error);
      return NextResponse.json({ error: 'Failed to update user badge' }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: 'User level updated successfully',
        level: task,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json({ error: 'Failed to save quiz result' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  try {
    await dbConnect();
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ level: user.level });
  } catch (error) {
    console.error('Error getting user level:', error);
    return NextResponse.json({ error: 'Failed to get user level' }, { status: 500 });
  }
}
