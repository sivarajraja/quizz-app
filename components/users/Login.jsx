import { useState } from 'react';
import { useLogin } from '../../firebase/useLogin';
import image from '../../assets/signupImage.jpg';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { firebaseError, loginFirebase } = useLogin();

  const signInHandler = (e) => {
    e.preventDefault();

    loginFirebase({ email, password });
    console.log('Logging in!');
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center px-6">
        <img src={image} className="max-w-full max-h-full" alt="Signup" />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 font-myFont">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Welcome Back!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={signInHandler} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>

            {firebaseError && (
              <div className="text-white p-2 bg-red-600 mt-3 rounded-md">
                {firebaseError}
              </div>
            )}

            <div>
              <button
                type="submit"
                onClick={() => signInHandler}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            don't have an Account?{' '}
            <a
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              CREATE
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
