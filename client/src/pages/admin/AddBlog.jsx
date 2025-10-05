import React, { useEffect, useState, useRef } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { parse } from "marked";

function AddBlog() {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", { prompt: title });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 min-h-screen flex justify-center items-start py-12 px-4 bg-gradient-to-b from-blue-50 to-blue-100 overflow-y-auto"
    >
      <div className="bg-white/90 w-full max-w-4xl p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-sm text-gray-800">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-wide">
          ✨ Create a New Blog
        </h1>

        {/* Upload Thumbnail */}
        <p className="font-semibold text-gray-700 mb-2">Upload Thumbnail</p>
        <label
          htmlFor="image"
          className="mt-2 block w-40 cursor-pointer rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition relative"
        >
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="thumbnail"
            className="h-28 w-full object-cover rounded-xl"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>

        {/* Blog Title */}
        <div className="mt-6">
          <p className="font-semibold text-gray-700 mb-2">Blog Title</p>
          <input
            type="text"
            placeholder="Enter blog title"
            required
            className="w-full p-4 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Sub Title */}
        <div className="mt-6">
          <p className="font-semibold text-gray-700 mb-2">Sub Title</p>
          <input
            type="text"
            placeholder="Enter sub title"
            required
            className="w-full p-4 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition shadow-sm"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>

        {/* Blog Description */}
        <div className="mt-6 relative">
          <p className="font-semibold text-gray-700 mb-2">Blog Description</p>
          <div className="w-full min-h-[250px] border border-gray-300 rounded-xl overflow-hidden bg-white">
            <div ref={editorRef} className="h-full" />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 border-4 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <button
              disabled={loading}
              type="button"
              onClick={generateContent}
              className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm shadow-lg hover:scale-105 transition transform"
            >
              ⚡ Generate with AI
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="mt-6">
          <p className="font-semibold text-gray-700 mb-2">Blog Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition shadow-sm"
          >
            <option value="">Select category</option>
            {blogCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-4 mt-6">
          <p className="font-semibold text-gray-700">Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer accent-blue-600"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-10 w-full py-4 font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
        >
          {isAdding ? "Adding..." : "🚀 Publish Blog"}
        </button>
      </div>
    </form>
  );
}

export default AddBlog;
