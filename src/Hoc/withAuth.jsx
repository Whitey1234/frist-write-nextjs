'use client'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { useRouter } from 'next/navigation';


const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return <div>Loading...</div>; // Or a spinner component
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;