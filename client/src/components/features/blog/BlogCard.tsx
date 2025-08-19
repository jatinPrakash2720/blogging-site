import React from "react";
import { Link } from "react-router-dom"; // Assuming you'll use React Router
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import type { Blog, User } from "@/types/api.ts"; // Assuming types are in a central file

// Define the props for the BlogCard
interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    thumbnail: string;
    slug: string;
    content: string;
    category: { name: string }; // Simplified for this example
    owner: {
      avatar: string;
      fullName: string;
    };
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // Function to create a short excerpt from the blog content
  const createExcerpt = (htmlContent: string, length: number = 100) => {
    const text = htmlContent.replace(/<[^>]+>/g, ""); // Strip HTML tags
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  return (
    <Link to={`/blog/${blog.slug}`} className="block group">
      <Card className="w-auto h-auto overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
        <CardHeader className="p-0">
          <Avatar
            src={blog.owner.avatar}
            alt={blog.owner.fullName}
            className="h-8 w-8"
          />
          <span className="text-sm font-medium">{blog.owner.fullName}</span>
        </CardHeader>
        <div className="flex flex-row">
          <CardContent className="p-4">
            <Badge variant="secondary" className="mb-2">
              {blog.category.name}
            </Badge>
            <CardTitle className="text-lg font-bold leading-snug whitespace-nowrap">
              {blog.title}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {createExcerpt(blog.content)}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center gap-2">
            <div className="aspect-video">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full"
              />
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
