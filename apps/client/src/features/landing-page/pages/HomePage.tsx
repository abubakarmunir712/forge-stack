import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex items-center gap-2 p-2">
      <h1>Home Page</h1>
      <Button asChild>
        <Link to={'/login'}>Go to Login Page</Link>
      </Button>

      <Button asChild>
        <Link to={'/register'}>Go to Register Page</Link>
      </Button>
    </div>
  );
}
