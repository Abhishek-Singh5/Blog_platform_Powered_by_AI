import React from 'react';
import { useNavigate } from 'react-router-dom';

function BlogCard({ blog }) {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  // Function to determine badge color based on category
  const getBadgeColor = (cat) => {
    switch (cat.toLowerCase()) {
      case 'technology':
        return 'bg-blue-500/10 text-blue-500';
      case 'lifestyle':
        return 'bg-pink-500/10 text-pink-500';
      case 'travel':
        return 'bg-purple-500/10 text-purple-500';
      case 'food':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'all':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='w-full rounded-2xl overflow-hidden backdrop-blur-3xl bg-white/20 border border-white/20 shadow-lg transition-all duration-300 cursor-pointer
      hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/20'
    >
      <img src={image} alt={title} className='aspect-video object-cover' />
      <div className='p-6'>
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 ${getBadgeColor(
            category
          )}`}
        >
          {category}
        </span>
        <h5 className='mb-2 font-bold text-gray-900 leading-snug'>
          {title}
        </h5>
        <p
          className='mb-3 text-sm text-gray-600 leading-relaxed line-clamp-2'
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}

export default BlogCard;