export default function SignUpPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 rounded font-semibold hover:bg-cyan-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-300 mt-4 text-center">
          Already have an account? <a href="/login" className="text-cyan-500 hover:text-cyan-400">Login</a>
        </p>
      </div>
    </div>
  );
}
