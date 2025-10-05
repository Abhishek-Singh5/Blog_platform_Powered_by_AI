import React from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { useState } from 'react';
import { motion } from "framer-motion";
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext.jsx';

function BlogList() {
    const [menu, setMenu] = useState("All");
    const { blogs, input } = useAppContext();

    const filteredBlogs = () => {
        if (input === '') {
            return blogs;
        }

        return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()));
    };

    return (
        <div>
            {/* Blog Categories Section */}
            <div className='sticky top-20 z-40 flex justify-center gap-4 sm:gap-8 my-10 p-2 mx-auto max-w-fit rounded-full shadow-lg backdrop-blur-3xl bg-white/20 border border-white/20'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button
                            onClick={() => setMenu(item)}
                            className={`relative z-10 cursor-pointer text-sm md:text-base font-medium px-4 py-1.5 rounded-full transition-colors duration-300
                            ${menu === item ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}
                        >
                            {item}
                        </button>
                        {menu === item && (
                            <motion.div
                                layoutId='underline'
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className='absolute inset-0 bg-blue-600 rounded-full shadow-lg'
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Blog List Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) =>
                    <BlogCard key={blog._id} blog={blog} />
                )}
            </div>
        </div>
    );
}

export default BlogList;