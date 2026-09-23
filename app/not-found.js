import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 pt-20 text-center">
      <div>
        <p className="font-display text-8xl font-black text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-fg">
          This pair walked off
        </h1>
        <p className="mt-2 text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </div>
  );
}
