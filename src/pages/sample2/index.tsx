import { useRouter } from 'next/router';

const path = '/sample';

export default function Sample2() {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  const handleClickNext = () => {
    router.replace({ pathname: path, query: { step: 5 } }, path);
  };

  return (
    <main className='m-10 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Sample2</h1>
      <div className='flex gap-4'>
        <button
          className={`w-1/2 rounded-md bg-gray-400 px-4 py-2`}
          onClick={handleClickBack}
        >
          router.back()で戻る
        </button>
        <button
          className={`w-1/2 rounded-md bg-blue-400 px-4 py-2`}
          onClick={handleClickNext}
        >
          router.replace()でsample?step=5を指定
        </button>
      </div>
    </main>
  );
}
