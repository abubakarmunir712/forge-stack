import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-2">Login Page</h1>
      <Link to={'/login'} className="bg-white p-2 text-black">
        Go to Home Page
      </Link>
    </div>
  );
}
