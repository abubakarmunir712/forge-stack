import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex items-center gap-2 p-2">
      <h1>Login Page</h1>
      <Button asChild>
        <Link to={'/'}>Go to Home Page</Link>
      </Button>
    </div>
  );
}
