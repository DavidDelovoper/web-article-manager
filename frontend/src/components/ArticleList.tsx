import { useEffect, useState } from 'react';
import { fetchArticles, deleteArticle } from '../api';

interface Article {
  _id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

interface Props {
  refreshTrigger: number; // Re-request articles when updating
}

function ArticleList({ refreshTrigger }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    }
    loadArticles();
  }, [refreshTrigger]);

  async function handleDelete(articleId: string) {
    try {
      await deleteArticle(articleId);
      setArticles(articles.filter((article) => article._id !== articleId));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }

  // Get all unique tags
  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags)));

  // Filter articles by selected tag
  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags.includes(selectedTag))
    : articles;

  return (
    <div>
      {/* Tags panel */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded ${selectedTag === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded ${selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* List of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article._id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => window.open(article.url, '_blank')}
          >
            <h2 className="text-lg font-bold text-blue-600">{article.title}</h2>
            <p className="text-gray-700 mt-2">{article.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-300 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // To prevent the link from opening
                    setSelectedTag(tag);
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(article._id);
              }}
              className="mt-4 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
