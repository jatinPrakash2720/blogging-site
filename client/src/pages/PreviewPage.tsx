import  { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
// import { Preview } from "@/components/features/blog/Preview";
import AuthorProfileCard from "@/components/features/user/AuthorPreviewCard";
import type { Blog} from "@/types/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/wrappers/DropdownMenu";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { useParams } from "react-router-dom";
import Loader from "@/components/ui/Loader";
import { useBlogs } from "@/store/blog";

const BlogActionBar = ({blog}:{blog:Blog}) => {
  return (
    <div className="flex items-center justify-between w-full px-3 dark:bg-neutral-900/50 bg-neutral-100/50 backdrop-blur-lg border border-border rounded-xl rounded-t-none shadow-sm">
      {/* Left side actions: Like, Comment, Share */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span className="text-xs">{blog.likeCount}Likes</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs">{blog.commentCount}Comment</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          <span className="text-xs">Share</span>
        </Button>
      </div>

      {/* Right side actions: Save and More Options */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report this content</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};


export default function BlogPreviewPage() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const { blogId } = useParams<{ blogId: string }>();
  const { currentBlog, fetchSingleBlog, loadingSingleBlog, error } = useBlogs();

  useEffect(() => {
    if (blogId) {
      fetchSingleBlog(blogId);
    }
  }, [blogId, fetchSingleBlog]);

  if (loadingSingleBlog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
  console.log(currentBlog);

  if (error || !currentBlog) {
    return (
      <div className="flex items-centern justify-center min-h-screen">
        <p className="text-muted-foreground">{error || "Blog not found."}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-muted/50">
      <Header onHeightChange={setHeaderHeight} disableScrollEffect={true} />
      <div
        className="relative flex-grow w-full"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <main className="container mx-auto py-8">
          <div className="mx-auto space-y-4">
            <div>
              <AuthorProfileCard author={currentBlog.owner} />
              <BlogActionBar blog={currentBlog} />
            </div>
              {/* <Preview content={currentBlog.content} /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
