import LoginForm from './components/LoginForm';
import { useLogin } from './hooks/useLogin';

function App() {
  const { auth, register, login } = useLogin();
  return (
    <main className="bg-[#343a40] h-screen">
      <div className="flex h-full items-center justify-center">
        {!auth ? (
          <LoginForm login={login} register={register} />
        ) : (
          <div>Logged in</div>
        )}
      </div>
    </main>
  );
}

export default App;
