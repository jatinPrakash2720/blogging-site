import type React from "react";
import BlogCard from "./BlogCard";
import type { LayoutType } from "../../common/subComps/layout-toggle";

interface BlogListProps {
  blogs: any[];
  layout?: LayoutType;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, layout = "square" }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">No posts found</h2>
        <p className="text-gray-500 mt-2">Check back later for new articles!</p>
      </div>
    );
  }

  const gridClasses =
    layout === "landscape"
      ? "grid grid-cols-1 gap-8 justify-items-center"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center";

  return (
    <div
      className={`${gridClasses}`}
    >
      {blogs.map((blog) => (
        <BlogCard layout={layout} key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
