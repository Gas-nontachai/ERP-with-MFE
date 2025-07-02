// pages/NotFound.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card shadow-xl bg-base-100 p-8">
        <h1 className="text-6xl font-extrabold text-error mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
}
