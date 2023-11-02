import { Steps } from '@/pages/components/steps';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const path = '/sample';
const steps = [1, 2, 3, 4, 5];

export default function Sample() {
  const router = useRouter();
  const step = Number((router.query['step'] as string) ?? 1);

  useEffect(() => {
    if (router.query['step'] === undefined)
      router.replace({ pathname: path, query: { step: 1 } }, path);
  }, [router]);

  useEffect(() => {
    const eventFunction = function (event: PopStateEvent) {
      const historyStep = extractStepValueFromString(event.state.url);
      if (historyStep == null) return;
      if (Number(historyStep) !== step)
        router.replace({ pathname: path, query: { step: historyStep } }, path);
    };
    window.addEventListener('popstate', eventFunction);

    return () => window.removeEventListener('popstate', eventFunction);
  }, [router, step]);

  const switchComponent = () => {
    switch (String(step)) {
      case '1':
        return <Card step={step} />;
      case '2':
        return <Card step={step} />;
      case '3':
        return <Card step={step} />;
      case '4':
        return <Card step={step} />;
      case '5':
        return <Card step={step} />;

      default:
        return <Card step={1} />;
    }
  };

  return (
    <main className='m-10 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Sample1</h1>

      <div className='flex gap-4'>
        <Steps steps={steps} currentStep={step} />
      </div>

      <div>{switchComponent()}</div>
    </main>
  );
}

const Card: React.FC<{ step: number }> = ({ step }) => {
  const router = useRouter();

  const handleClickNext = () => {
    const query = { step: step + 1 };
    if (isDisabledNext) {
      router.push('/sample2');
      return;
    } else {
      router.push({ pathname: path, query: query }, path);
      history.pushState(null, '', null);
    }
  };

  const handleClickBack = () => {
    router.back();
  };

  const isDisabledNext = step === 5;
  const isDisabledBack = step === 1;

  return (
    <div className={`flex w-full flex-col gap-4 bg-red-200 p-10`}>
      <p>{step}の要素</p>
      <p>
        URL
        <br />
        {`${router.asPath}?step=${router.query['step']}`}
      </p>
      <div className='flex gap-4'>
        <button
          className={`w-1/2 rounded-md ${
            isDisabledBack ? 'bg-gray-200' : 'bg-gray-400'
          } px-4 py-2`}
          onClick={handleClickBack}
          disabled={isDisabledBack}
        >
          Stepを戻す
        </button>
        <button
          className={`w-1/2 rounded-md bg-blue-400 px-4 py-2`}
          onClick={handleClickNext}
        >
          {isDisabledNext ? 'Sample2へ遷移' : 'Stepを進める'}
        </button>
      </div>
    </div>
  );
};

function extractStepValueFromString(input: string): string | null {
  const stepIndex = input.indexOf('step=');
  if (stepIndex !== -1) {
    const stepSubstring = input.slice(stepIndex + 5);
    const stepValue = parseInt(stepSubstring, 10);
    if (!isNaN(stepValue)) {
      return String(stepValue);
    }
  }

  return null;
}
