import React from "react";
import { useParams } from "react-router-dom";

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams();
  return (
    <div className="p-8">
      <h1>Blog Post: {slug}</h1>
    </div>
  );
};

export default BlogDetailPage;
