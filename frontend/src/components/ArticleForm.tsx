import { useState } from 'react';
import { addArticle } from '../api';

function ArticleForm({ onArticleAdded }: { onArticleAdded: () => void }) {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addArticle({ url, tags: tags.split(',').map(tag => tag.trim()) });
    setUrl('');
    setTags('');
    onArticleAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 text-white">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Article URL"
        className="border p-2 flex-1"
        required
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="border p-2 flex-1"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add
      </button>
    </form>
  );
}

export default ArticleForm;
