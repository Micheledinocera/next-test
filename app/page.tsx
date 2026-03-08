import Link from "next/link";

export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">
          Benvenuto
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Accedi all'app per continuare
        </p>
        <Link
          href="/app"
          className="inline-block px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Accedi all'App
        </Link>
      </div>
    </main>
  );
}
