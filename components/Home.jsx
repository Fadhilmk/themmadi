import Image from "next/image";
export default function Home() {
  return (
    <div>
      <section className="text-grey-800 p-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My App</h1>
        <p className="text-xl mb-8">
          Your one-stop solution for WhatsApp messaging.
        </p>
        <div className="container">
          <a
            href="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className="p-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-4 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Feature One</h3>
            <p>Detail about feature one.</p>
          </div>
          <div className="p-4 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Feature Two</h3>
            <p>Detail about feature two.</p>
          </div>
          <div className="p-4 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Feature Three</h3>
            <p>Detail about feature three.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
