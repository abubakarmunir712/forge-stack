import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-2">Home Page</h1>
      <Link to={'/login'} className="bg-white p-2 text-black">
        Go to Login Page
      </Link>
    </div>
  );
}
