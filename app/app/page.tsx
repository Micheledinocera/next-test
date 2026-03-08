'use client';

export default function AppPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Benvenuto nell'App</h1>
        <p>
          Questa è la pagina iniziale della tua applicazione.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-2">Sezione 1</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Contenuto della prima sezione
          </p>
        </div>
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-2">Sezione 2</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Contenuto della seconda sezione
          </p>
        </div>
      </div>
    </div>
  );
}
