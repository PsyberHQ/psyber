import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GoogleSignInBtn from "@/components/App/GoogleSignInBtn";

const Login = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/app");
  }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg p-20 pt-10 shadow-lg w-max  text-center">
        <div className="mb-4">
          <img
            src="/mediBrain.png"
            alt="Meditating Brain"
            className="mx-auto w-36 h-36"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Psyber
        </h1>
        <p className="text-gray-600 mb-6">
          Your journey to mastering web3 starts here!
        </p>

        <GoogleSignInBtn />

        <p className="text-sm text-gray-500 mt-6">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-purple-600 underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-purple-600 underline">
            privacy policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
