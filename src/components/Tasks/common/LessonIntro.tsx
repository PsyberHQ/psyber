import Image from 'next/image';
import { LessonType } from '@/Types/Task';

interface LessonIntroProps {
  lesson: LessonType;
  currentPart: number;
  totalParts: number;
  startLesson: () => void;
}

const LessonIntro = ({ lesson, currentPart, totalParts, startLesson }: LessonIntroProps) => {
  const lessonTitle = lesson?.title || 'Lesson Title';
  const lessonImage = lesson?.specialImage || '/book.png';

  return (
    <div className="flex h-full flex-col items-center gap-8 rounded-lg bg-[#7047A3] p-20 text-white">
      <div className="flex justify-center">
        <Image
          src={lessonImage}
          alt="Lesson Image"
          width={521}
          height={521}
          className="size-20 w-fit object-contain"
        />
      </div>
      <div>
        <h1 className="mb-2 text-center font-gliker text-3xl">
          Lesson
          <span className="font-bold"> {currentPart}</span>
        </h1>
        <h2 className="mb-2 text-center font-gliker text-2xl">{lessonTitle}</h2>
      </div>
      <div className="mt-4 w-full">
        <div className="flex gap-1">
          {Array.from({ length: totalParts }).map((_, index) => (
            <div
              key={index}
              className={`h-2.5 w-full rounded-full ${
                index < currentPart ? 'bg-green-500' : 'bg-white'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button onClick={startLesson} className="green-btn mt-10 w-fit">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonIntro;
