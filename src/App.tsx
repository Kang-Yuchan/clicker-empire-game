import GameApp from './components/GameApp';
import LoginForm from './components/LoginForm';
import { useLogin } from './hooks/useLogin';

function App() {
  const { user, register, login } = useLogin();
  return (
    <main className="bg-[#343a40]">
      <div className="flex h-screen items-center justify-center p-0 md:p-12">
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
