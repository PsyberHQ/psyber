import { useState } from 'react';
import Image from 'next/image';
import { ContentType, LessonType } from '@/Types/Task';

const LessonContent = ({
  lesson,
  index,
  handleNextContent,
}: {
  lesson: LessonType;
  index: number;
  handleNextContent: () => void;
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const showNextContent = () => {
    const nextIdx = currentIdx + (lesson.content[currentIdx].type === 'image' ? 1 : 2);

    if (nextIdx >= lesson.content.length) {
      handleNextContent();
    } else {
      setCurrentIdx(nextIdx);
    }
  };

  return (
    <div className="flex h-full flex-col items-center gap-8 rounded-lg">
      {/* Header Section */}
      <div className="flex w-full items-center justify-between bg-[#F47C92] px-10 py-6 text-white">
        <div>
          <h1 className="mb-2 font-gliker text-2xl">Lesson {index + 1}</h1>
          <h2 className="mb-2 font-gliker text-2xl">{lesson.title}</h2>
        </div>
        {lesson.specialImage && (
          <div className="flex justify-center">
            <Image
              src={lesson.specialImage}
              alt="Special Image"
              width={721}
              height={721}
              className="h-16 w-fit object-contain"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="w-full overflow-scroll px-10 pb-10">
        {lesson.content[currentIdx]?.type === 'image' ? (
          <div className="mb-4 flex justify-center">
            <Image
              src={lesson.content[currentIdx].image || ''}
              alt="Lesson Image"
              width={1021}
              height={1021}
              className="w-fit object-contain"
            />
          </div>
        ) : (
          <div className="">
            {lesson.content.slice(currentIdx, currentIdx + 2).map((content: ContentType, idx) => (
              <div key={idx} className="mb-4">
                <h2 className="mb-4 text-xl font-bold md:text-3xl">{content.heading}</h2>
                <p className="mb-4 text-base md:text-lg">{content.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Section */}
        <div className="flex w-full items-center justify-center gap-4 rounded-t-lg bg-white">
          <button onClick={showNextContent} className="green-btn mt-4">
            {currentIdx + (lesson.content[currentIdx].type === 'image' ? 1 : 2) >=
            lesson.content.length
              ? 'Finish'
              : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
