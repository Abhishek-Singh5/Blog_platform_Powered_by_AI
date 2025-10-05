import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import Moment from "moment";
import toast from 'react-hot-toast';

function Blog() {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
      if (data.success) setComments(data.comments);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/blog/add-comment`, { blog: id, name, content });
      if (data.success) {
        toast.success(data.message);
        setName('');
        setContent('');
        fetchComments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen">
      {/* Background overlay */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute top-0 left-0 w-full h-[400px] object-cover -z-10 opacity-30"
      />

      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 px-4">
        <p className="text-primary py-2 font-medium text-sm md:text-base">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto text-gray-900 tracking-tight mb-3">
          {data.title}
        </h1>
        <h2 className="my-4 max-w-xl mx-auto text-lg md:text-xl text-gray-600 italic">
          {data.subTitle}
        </h2>
        <p className="inline-block py-1 px-5 mb-6 border rounded-full text-sm font-medium bg-primary/10 text-primary shadow-md">
          Abhishek Singh
        </p>
      </div>

      {/* Blog Body */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10">
        <img
          src={data.image}
          alt=""
          className="rounded-3xl mb-8 shadow-xl hover:scale-[1.02] transition-all duration-500"
        />
        <div
          className="rich-text max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-5 text-lg md:text-xl"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-16 mb-12 max-w-3xl mx-auto">
          <p className="font-semibold text-2xl mb-6 text-gray-800">💬 Comments ({comments.length})</p>
          <div className="flex flex-col gap-5">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-white/90 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={assets.user_icon} alt="" className="w-8 h-8 rounded-full" />
                  <p className="font-semibold text-gray-800">{item.name}</p>
                </div>
                <p className="text-gray-700 ml-11 text-sm md:text-base">{item.content}</p>
                <div className="absolute right-4 bottom-3 text-xs text-gray-400">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold text-2xl mb-6 text-gray-800">✍️ Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition shadow-sm text-gray-900"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Write your comment..."
              className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition shadow-sm text-gray-900 h-36 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all font-semibold"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="my-24 max-w-3xl mx-auto text-center">
          <p className="font-semibold text-lg md:text-xl mb-6 text-gray-800">
            📢 Share this article on Social Media
          </p>
          <div className="flex justify-center gap-6">
            {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map((icon, idx) => (
              <img
                key={idx}
                src={icon}
                width={50}
                className="cursor-pointer hover:scale-110 transition transform"
                alt="social"
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

export default Blog;
