import type React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/common/wrappers/Card";
import Avatar from "@/components/common/wrappers/Avatar";
import Badge from "@/components/common/wrappers/Badge";
import AspectRatio from "@/components/common/wrappers/AspectRatio";
import {
  ThumbsUp,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

// Define the props for the BlogCard to make it reusable
interface BlogCardProps {
  blog: {
    slug: string;
    thumbnailUrl: string;
    title: string;
    excerpt: string;
    likeCount: number;
    commentCount: number;
    authorName: string;
    authorAvatar: string;
    topTag: string;
  };
  layout?: "square" | "landscape";
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, layout = "square" }) => {
  if (layout === "landscape") {
    return (
      <Card className="backdrop-blur-xl p-0  bg-white/20 dark:bg-[#171717] border border-[#E0E1E1/30] dark:border-[#E0E1E1/40] w-full rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:bg-white/30 hover:border-[#E0E1E1/40] overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent dark:before:from-white/5 before:pointer-events-none before:rounded-2xl pb-0">
        <CardContent className="p-4 flex gap-4 relative z-10">
          {/* Left side content */}
          <div className="flex-1 flex flex-col justify-between min-h-[200px]">
            {/* Author info at top */}
            <div className="flex items-center gap-2 mb-3">
              <Avatar
                src={blog.authorAvatar}
                alt={blog.authorName}
                className="w-10 h-10 ring-2 ring-white/30 dark:ring-white/20 hover:ring-white/50 dark:hover:ring-white/30 transition-all duration-200"
              />
              <span className="text-base font-semibold text-gray-900/90 dark:text-white/90">
                {blog.authorName}
              </span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <Badge
                variant="secondary"
                className="backdrop-blur-sm bg-green-500/80 text-white border-none hover:bg-green-600/80 transition-all duration-200 text-xs"
              >
                {blog.topTag}
              </Badge>
              <Badge
                variant="secondary"
                className="backdrop-blur-sm bg-green-600/60 text-white border-none hover:bg-green-700/60 transition-all duration-200 text-xs"
              >
                subcategorie tag
              </Badge>
            </div>

            {/* Title section */}
            <Link to={`/blog/${blog.slug}`} className="block mb-3">
              <h3 className="font-bold text-lg leading-tight text-gray-900/90 dark:text-white/90 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                {blog.title}
              </h3>
            </Link>

            {/* Content section */}
            <div className="mb-4 flex-1">
              <p className="text-sm text-gray-700/80 dark:text-gray-300/80 line-clamp-3">
                {blog.excerpt}
              </p>
            </div>

            {/* Action Bar at bottom */}
            <div className="flex items-center justify-between text-gray-600/80 dark:text-gray-400/80">
              <div className="flex items-center">
                <button className="flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                  <ThumbsUp className="p-0" size={18} />
                  <span className="text-sm pr-2">{blog.likeCount}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                  <MessageCircle size={18} />
                  <span className="text-sm">{blog.commentCount}</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                  <Bookmark size={18} />
                </button>
                <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right side image */}
          <div className="w-92 flex-shrink-0">
            <Link to={`/blog/${blog.slug}`} className="block">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={blog.thumbnailUrl || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </AspectRatio>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-white/20 dark:bg-[#171717] border border-[#E0E1E1/30] dark:border-[#E0E1E1/40] w-full max-w-sm rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:bg-white/30 hover:border-[#E0E1E1/40] flex flex-col overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent dark:before:from-white/5 before:pointer-events-none before:rounded-2xl pb-0">
      <Link to={`/blog/${blog.slug}`} className="block relative z-10">
        <AspectRatio ratio={16 / 9}>
          <img
            src={blog.thumbnailUrl || "/placeholder.svg"}
            alt={blog.title}
            className="w-[90%] h-full mx-auto object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </AspectRatio>
      </Link>

      <CardContent className="p-4 flex flex-col flex-grow justify-between relative z-10">
        {/* Top section for title and excerpt */}
        <div>
          <Link to={`/blog/${blog.slug}`} className="block">
            <h3 className="font-bold text-lg leading-tight text-gray-900/90 dark:text-white/90 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {blog.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-700/80 dark:text-gray-300/80 mt-2 line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        {/* Bottom section for actions and author info */}
        <div>
          {/* Action Bar */}
          <div className="flex items-center justify-between text-gray-600/80 dark:text-gray-400/80 pt-2 pb-3">
            <div className="flex items-center">
              <button className="flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                <ThumbsUp className="p-0" size={18} />
                <span className="text-sm pr-2">{blog.likeCount}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                <MessageCircle size={18} />
                <span className="text-sm">{blog.commentCount}</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                <Bookmark size={18} />
              </button>
              <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/10">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Author and Tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                src={blog.authorAvatar}
                alt={blog.authorName}
                className="w-12 h-12 ring-2 ring-white/30 dark:ring-white/20 hover:ring-white/50 dark:hover:ring-white/30 transition-all duration-200"
              />
              <span className="text-[18px] font-semibold text-gray-900/90 dark:text-white/90">
                {blog.authorName}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-white/40 dark:bg-black/40 border-white/50 dark:border-white/20 text-gray-800 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-200"
            >
              {blog.topTag}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

// import type React from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/common/wrappers/Card";
// import Avatar from "@/components/common/wrappers/Avatar";
// import Badge from "@/components/common/wrappers/Badge";
// import AspectRatio from "@/components/common/wrappers/AspectRatio";
// import {
//   ThumbsUp,
//   MessageCircle,
//   Bookmark,
//   MoreHorizontal,
// } from "lucide-react";

// // Define the props for the BlogCard to make it reusable
// interface BlogCardProps {
//   blog: {
//     slug: string;
//     thumbnailUrl: string;
//     title: string;
//     excerpt: string;
//     likeCount: number;
//     commentCount: number;
//     authorName: string;
//     authorAvatar: string;
//     topTag: string;
//   };
//   layout?: "square" | "landscape";
// }

// const BlogCard: React.FC<BlogCardProps> = ({ blog, layout = "square" }) => {
//   if (layout === "landscape") {
//     return (
//       <Card className="backdrop-blur-xl bg-white/20 dark:bg-[#171717] border border-[#E0E1E1/30] dark:border-[#E0E1E1/40] w-full rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30
//         hover:bg-white/30
//         hover:border-[#E0E1E1/40]
//         overflow-hidden
//         relative
//         before:absolute
//         before:inset-0
//         before:bg-gradient-to-br
//         before:from-white/10
//         before:to-transparent
//         dark:before:from-white/5
//         before:pointer-events-none
//         before:rounded-2xl
//         pb-0
//       "
//       >
//         <CardContent className="p-4 flex gap-4 relative z-10">
//           {/* Left side content */}
//           <div className="flex-1 flex flex-col justify-between min-h-[200px]">
//             {/* Author info at top */}
//             <div className="flex items-center gap-2 mb-3">
//               <Avatar
//                 src={blog.authorAvatar}
//                 alt={blog.authorName}
//                 className="
//                   w-10
//                   h-10
//                   ring-2
//                   ring-white/30
//                   dark:ring-white/20
//                   hover:ring-white/50
//                   dark:hover:ring-white/30
//                   transition-all
//                   duration-200
//                 "
//               />
//               <span
//                 className="
//                 text-base
//                 font-semibold
//                 text-gray-900/90
//                 dark:text-white/90
//               "
//               >
//                 {blog.authorName}
//               </span>
//             </div>

//             {/* Tags */}
//             <div className="flex gap-2 mb-4">
//               <Badge
//                 variant="secondary"
//                 className="
//                   backdrop-blur-sm
//                   bg-green-500/80
//                   text-white
//                   border-none
//                   hover:bg-green-600/80
//                   transition-all
//                   duration-200
//                   text-xs
//                 "
//               >
//                 {blog.topTag}
//               </Badge>
//               <Badge
//                 variant="secondary"
//                 className="
//                   backdrop-blur-sm
//                   bg-green-600/60
//                   text-white
//                   border-none
//                   hover:bg-green-700/60
//                   transition-all
//                   duration-200
//                   text-xs
//                 "
//               >
//                 subcategorie tag
//               </Badge>
//             </div>

//             {/* Title section */}
//             <Link to={`/blog/${blog.slug}`} className="block mb-3">
//               <h3
//                 className="
//                 font-bold
//                 text-lg
//                 leading-tight
//                 text-gray-900/90
//                 dark:text-white/90
//                 line-clamp-2
//                 hover:text-blue-600
//                 dark:hover:text-blue-400
//                 transition-colors
//                 duration-200
//               "
//               >
//                 {blog.title}
//               </h3>
//             </Link>

//             {/* Content section */}
//             <div className="mb-4 flex-1">
//               <p
//                 className="
//                 text-sm
//                 text-gray-700/80
//                 dark:text-gray-300/80
//                 line-clamp-3
//               "
//               >
//                 {blog.excerpt}
//               </p>
//             </div>

//             {/* Action Bar at bottom */}
//             <div
//               className="
//               flex
//               items-center
//               justify-between
//               text-gray-600/80
//               dark:text-gray-400/80
//             "
//             >
//               <div className="flex items-center">
//                 <button
//                   className="
//                   flex
//                   items-center
//                   gap-1.5
//                   hover:text-blue-500
//                   dark:hover:text-blue-400
//                   transition-colors
//                   duration-200
//                   p-1
//                   rounded-lg
//                   hover:bg-white/20
//                   dark:hover:bg-white/10
//                 "
//                 >
//                   <ThumbsUp className="p-0" size={18} />
//                   <span className="text-sm pr-2">{blog.likeCount}</span>
//                 </button>
//                 <button
//                   className="
//                   flex
//                   items-center
//                   gap-1.5
//                   hover:text-blue-500
//                   dark:hover:text-blue-400
//                   transition-colors
//                   duration-200
//                   p-1
//                   rounded-lg
//                   hover:bg-white/20
//                   dark:hover:bg-white/10
//                 "
//                 >
//                   <MessageCircle size={18} />
//                   <span className="text-sm">{blog.commentCount}</span>
//                 </button>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   className="
//                   hover:text-blue-500
//                   dark:hover:text-blue-400
//                   transition-colors
//                   duration-200
//                   p-1
//                   rounded-lg
//                   hover:bg-white/20
//                   dark:hover:bg-white/10
//                 "
//                 >
//                   <Bookmark size={18} />
//                 </button>
//                 <button
//                   className="
//                   hover:text-blue-500
//                   dark:hover:text-blue-400
//                   transition-colors
//                   duration-200
//                   p-1
//                   rounded-lg
//                   hover:bg-white/20
//                   dark:hover:bg-white/10
//                 "
//                 >
//                   <MoreHorizontal size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right side image */}
//           <div className="w-92 flex-shrink-0">
//             <Link to={`/blog/${blog.slug}`} className="block">
//               <AspectRatio ratio={16 / 9}>
//                 <img
//                   src={blog.thumbnailUrl || "/placeholder.svg"}
//                   alt={blog.title}
//                   className="w-full h-full object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
//                 />
//               </AspectRatio>
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card
//       className="
//       backdrop-blur-xl
//       bg-white/20
//       dark:bg-[#171717]
//       border
//       border-[#E0E1E1/30]
//       dark:border-[#E0E1E1/40]
//       w-full
//       max-w-sm
//       rounded-2xl
//       shadow-lg
//       shadow-black/5
//       dark:shadow-black/20
//       transition-all
//       duration-300
//       hover:shadow-xl
//       hover:shadow-black/10
//       dark:hover:shadow-black/30
//       hover:bg-white/30
//       hover:border-[#E0E1E1/40]
//       flex
//       flex-col
//       overflow-hidden
//       relative
//       before:absolute
//       before:inset-0
//       before:bg-gradient-to-br
//       before:from-white/10
//       before:to-transparent
//       dark:before:from-white/5
//       before:pointer-events-none
//       before:rounded-2xl
//       pb-0
//     "
//     >
//       <Link to={`/blog/${blog.slug}`} className="block relative z-10">
//         <AspectRatio ratio={16 / 9}>
//           <img
//             src={blog.thumbnailUrl || "/placeholder.svg"}
//             alt={blog.title}
//             className="w-[90%] h-full mx-auto object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
//           />
//         </AspectRatio>
//       </Link>

//       <CardContent className="p-4 flex flex-col flex-grow justify-between relative z-10">
//         {/* Top section for title and excerpt */}
//         <div>
//           <Link to={`/blog/${blog.slug}`} className="block">
//             <h3
//               className="
//               font-bold
//               text-lg
//               leading-tight
//               text-gray-900/90
//               dark:text-white/90
//               line-clamp-2
//               hover:text-blue-600
//               dark:hover:text-blue-400
//               transition-colors
//               duration-200
//             "
//             >
//               {blog.title}
//             </h3>
//           </Link>
//           <p
//             className="
//             text-sm
//             text-gray-700/80
//             dark:text-gray-300/80
//             mt-2
//             line-clamp-3
//           "
//           >
//             {blog.excerpt}
//           </p>
//         </div>

//         {/* Bottom section for actions and author info */}
//         <div>
//           {/* Action Bar */}
//           <div
//             className="
//             flex
//             items-center
//             justify-between
//             text-gray-600/80
//             dark:text-gray-400/80
//             pt-2
//             pb-3
//           "
//           >
//             <div className="flex items-center">
//               <button
//                 className="
//                 flex
//                 items-center
//                 gap-1.5
//                 hover:text-blue-500
//                 dark:hover:text-blue-400
//                 transition-colors
//                 duration-200
//                 p-1
//                 rounded-lg
//                 hover:bg-white/20
//                 dark:hover:bg-white/10
//               "
//               >
//                 <ThumbsUp className="p-0" size={18} />
//                 <span className="text-sm pr-2">{blog.likeCount}</span>
//               </button>
//               <button
//                 className="
//                 flex
//                 items-center
//                 gap-1.5
//                 hover:text-blue-500
//                 dark:hover:text-blue-400
//                 transition-colors
//                 duration-200
//                 p-1
//                 rounded-lg
//                 hover:bg-white/20
//                 dark:hover:bg-white/10
//               "
//               >
//                 <MessageCircle size={18} />
//                 <span className="text-sm">{blog.commentCount}</span>
//               </button>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 className="
//                 hover:text-blue-500
//                 dark:hover:text-blue-400
//                 transition-colors
//                 duration-200
//                 p-1
//                 rounded-lg
//                 hover:bg-white/20
//                 dark:hover:bg-white/10
//               "
//               >
//                 <Bookmark size={18} />
//               </button>
//               <button
//                 className="
//                 hover:text-blue-500
//                 dark:hover:text-blue-400
//                 transition-colors
//                 duration-200
//                 p-1
//                 rounded-lg
//                 hover:bg-white/20
//                 dark:hover:bg-white/10
//               "
//               >
//                 <MoreHorizontal size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Author and Tag */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Avatar
//                 src={blog.authorAvatar}
//                 alt={blog.authorName}
//                 className="
//                   w-12
//                   h-12
//                   ring-2
//                   ring-white/30
//                   dark:ring-white/20
//                   hover:ring-white/50
//                   dark:hover:ring-white/30
//                   transition-all
//                   duration-200
//                 "
//               />
//               <span
//                 className="
//                 text-[18px]
//                 font-semibold
//                 text-gray-900/90
//                 dark:text-white/90
//               "
//               >
//                 {blog.authorName}
//               </span>
//             </div>
//             <Badge
//               variant="secondary"
//               className="
//                 backdrop-blur-sm
//                 bg-white/40
//                 dark:bg-black/40
//                 border-white/50
//                 dark:border-white/20
//                 text-gray-800
//                 dark:text-gray-200
//                 hover:bg-white/50
//                 dark:hover:bg-black/50
//                 transition-all
//                 duration-200
//               "
//             >
//               {blog.topTag}
//             </Badge>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default BlogCard;
