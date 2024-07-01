import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="text-center mx-300px">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
