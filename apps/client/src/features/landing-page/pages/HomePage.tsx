import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
      <Button
        onClick={() => {
          toast('Hello from sonner');
          toast.success('Toast is working');
          toast.info('Hello World');
          toast.warning('Are u sure?');
          toast.error('Something went wrong');
          toast.loading('Loading ...');
        }}
      >
        Send Toast
      </Button>
    </div>
  );
}
