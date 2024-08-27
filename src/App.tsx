import GameApp from './components/GameApp';
import LoginForm from './components/LoginForm';
import { useLogin } from './hooks/useLogin';

function App() {
  const { user, register, login } = useLogin();
  return (
    <main className="bg-[#343a40] h-screen">
      <div className="flex h-full items-center justify-center">
        {user ? (
          <GameApp user={user} />
        ) : (
          <LoginForm login={login} register={register} />
        )}
      </div>
    </main>
  );
}

export default App;
