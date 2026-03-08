import Link from "next/link";

export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">
          Benvenuto
        </h1>
        <p className="text-xl text-foreground">
          Accedi all'app per continuare
        </p>
        <Link
          href="/app"
          className="inline-block px-8 py-3 bg-background text-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Accedi all'App
        </Link>
      </div>
    </main>
  );
}
