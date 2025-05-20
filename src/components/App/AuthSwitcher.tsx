import Link from 'next/link';

const AuthSwitcher = () => {
  return (
    <div className="mb-6 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
      <p className="mb-2">
        We're testing a new authentication system! You can continue with Google login below, or try our new API-based authentication:
      </p>
      <div className="flex flex-wrap gap-2">
        <Link href="/psyber-auth/login">
          <button className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
            Login with Psyber API
          </button>
        </Link>
        <Link href="/psyber-auth/signup">
          <button className="rounded-md border border-blue-600 px-3 py-1 text-blue-600 hover:bg-blue-50">
            Sign up with Psyber API
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthSwitcher;