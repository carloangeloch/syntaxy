interface InputProps {
  text: string;
  name: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ text, name, onchange }: InputProps) => {
  return (
    <div className="relative">
      <input
        type="email"
        name={name}
        id={name}
        placeholder={name}
        className="peer w-full h-10 focus:outline-none border-b-2 border-slate-500 focus:border-purple-500 duration-300 ease-in-out placeholder-transparent"
        onChange={onchange}
      />
      <label
        htmlFor={name}
        className="absolute left-0 text-sm -top-4 text-purple-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-900 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-purple-700 duration-300 ease-in-out"
      >
        {text}
      </label>
    </div>
  );
};

export default Input;
