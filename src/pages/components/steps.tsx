type Props = {
  steps: number[];
  currentStep: number;
};

export const Steps: React.FC<Props> = ({ steps, currentStep }) => {
  return steps.map((step, i) => (
    <div key={step} className='flex w-full flex-col'>
      <Step isActive={i < currentStep} />
    </div>
  ));
};

const Step: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div
      className={`flex h-3 ${isActive ? 'bg-blue-500' : 'bg-gray-500'}`}
    ></div>
  );
};
