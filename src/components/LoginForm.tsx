import { ChangeEvent, useState } from 'react';

type LoginFormProps = {
  register: () => void;
  login: (userName: string) => void;
};

export default function LoginForm({ register, login }: LoginFormProps) {
  const [name, setName] = useState('');
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-sm">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">Clicker Empire Game</h2>
      </div>
      <input
        type="text"
        placeholder="Your name"
        className="placeholder:text-gray-500 text-[#495057] text-base rounded-md h-9 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-300 mb-8"
        value={name}
        onChange={handleChangeName}
      />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={register}
          className="rounded-md bg-blue-500 text-white flex justify-center items-center w-[130px] h-9 transition hover:opacity-80 cursor-pointer"
        >
          New
        </button>
        <button
          type="button"
          onClick={() => login(name)}
          className="rounded-md bg-blue-500 text-white flex justify-center items-center w-[130px] h-9 transition hover:opacity-80 cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
