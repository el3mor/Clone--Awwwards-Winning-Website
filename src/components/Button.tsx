import { ReactNode } from 'react';

const Button = ({
  text,
  backgroundColor = 'bg-yellow-300',
  lefticon,
  righticon,

}: {
  text: string;
  backgroundColor?: string;
  lefticon?: ReactNode;
  righticon?: ReactNode;

}) => {
  return (
    <button className={`${backgroundColor} px-6 py-3 rounded-full flex gap-2`}>
      {lefticon}
      <span className='font-general text-xs uppercase'>{text}</span>
      {righticon}
    </button>
  );
};

export default Button;
