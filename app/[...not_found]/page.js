import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className='flex items-center h-screen -translate-y-20 gap-1 justify-center flex-col max-w-md mx-auto'>
      <h1 className='text-2xl font-bold'>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link className ="bg-btn p-2 px-3 mt-6 rounded-md text-white font-medium" href="/dashboard">
        Go back to dashboard
      </Link>
    </div>
  );
};

export default Custom404;
