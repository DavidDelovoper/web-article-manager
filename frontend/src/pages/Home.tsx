import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import ArticleList from '../components/ArticleList';
import { fetchArticles } from '../api';

function Home() {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        await fetchArticles(); // Checking access
      } catch (error) {
        setIsAuthorized(false);
        navigate('/login'); // If 401, send to login page
      }
    }
    checkAuth();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token'); // Delete the token
    navigate('/login'); // Redirect to input
  }

  if (!isAuthorized) {
    return <p className="text-center mt-20 text-gray-600">Redirement to the login page ...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 w-screen text-black">
      {/* Output button in the upper right corner */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">📚 My articles</h1>
        
        <ArticleForm onArticleAdded={() => setRefreshTrigger(prev => prev + 1)} />
        
        <div className="mt-6">
          <ArticleList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default Home;
