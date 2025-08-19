import React from "react";
import BlogCard from "./BlogCard";
// import type { Blog } from "@/types"; // Assuming a central Blog type exists

interface BlogListProps {
  blogs: any[]; // Using 'any' for now to match the mock data in HomePage.tsx
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  // A placeholder for when there are no blogs to display
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No posts found</h2>
        <p className="text-gray-500 mt-2">Check back later for new articles!</p>
      </div>
    );
  }

  return (
    // This creates a responsive grid that shows:
    // - 1 column on small screens
    // - 2 columns on medium screens (tablets)
    // - 3 columns on large screens (desktops)
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
