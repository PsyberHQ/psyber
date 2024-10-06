import dbConnect from '@/lib/dbConnect';
import { FullTasksModel } from '@/model/FullTasks';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const fullTasks = await FullTasksModel.find({}).lean();

    // Remove the _id field
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transformedTasks = fullTasks.map(({ _id, ...rest }) => rest);

    return NextResponse.json(transformedTasks);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
