import Image from 'next/image';

const LoaderComp = ({ text }: { text: string }) => {
  return (
    <div className="absolute inset-0">
      <div className="flex h-full flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-10 md:p-20">
          <Image
            src="/Loader.gif"
            alt="Book"
            width={521}
            height={521}
            className="w-16 scale-110 object-contain"
          />
          {text && <p className="text-center text-slate-500">{text}</p>}
        </div>
      </div>
    </div>
  );
};
export default LoaderComp;
