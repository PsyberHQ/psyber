import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { getServerSession } from 'next-auth';
import { WalletModel } from '@/model/Wallet';

export async function POST(request: Request) {
  const userSession = await getServerSession();
  const userEmail = userSession?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.badge || user.badge === '') {
      return NextResponse.json(
        { error: "User hasn't completed the quiz, redirecting...", redirect: true },
        { status: 400 }
      );
    }

    const { taskId, walletAddress } = await request.json();
    if (!taskId) {
      return NextResponse.json({ error: 'Task number is required' }, { status: 400 });
    }

    const task = parseInt(taskId, 10);
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

    const taskReward = task <= 2 ? 50 : task === 3 ? 100 : 0;

    const walletSession = await WalletModel.startSession();
    try {
      walletSession.startTransaction();

      await UserModel.updateOne(
        { _id: user._id },
        {
          level: task,
          xp: user.xp + taskReward,
        },
        { session: walletSession }
      );

      if (walletAddress) {
        await WalletModel.create(
          [
            {
              address: walletAddress,
              type: 'primary',
              chain: 'solana',
              user: user._id,
            },
          ],
          { session: walletSession }
        );
      }

      await walletSession.commitTransaction();
    } catch (error) {
      console.error('Error updating user badge:', error);
      await walletSession.abortTransaction();
      return NextResponse.json({ error: 'Failed to update user badge' }, { status: 500 });
    } finally {
      walletSession.endSession();
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
