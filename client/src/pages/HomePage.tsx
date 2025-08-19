import React from "react";
import Header from "../components/layout/Header.tsx";
import Sidebar from "../components/layout/Sidebar.tsx";
import BlogList from "../components/features/blog/BlogList";

// Mock data for demonstration
const mockBlogs = [
  {
    _id: "1",
    title: "The Future of AI in Software Development",
    thumbnail:
      "https://images.unsplash.com/photo-1754887966362-952236591654?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "future-of-ai",
    content:
      "<p>Explore how artificial intelligence is revolutionizing software development... Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam minus ex debitis ullam voluptatibus sapiente dolor beatae aliquam, libero est mollitia, reprehenderit porro quis, sed neque veniam eius tempore esse reiciendis vitae fugit. Nulla laboriosam temporibus, at culpa enim inventore itaque fuga magnam aliquam corrupti sed possimus veniam est optio earum illum eaque, consequatur ad quod eveniet quas laborum? Magni exercitationem non ex neque optio. Quibusdam aliquam hic voluptatum tempora, quia tenetur, qui, dicta nulla unde incidunt assumenda. Cum, tenetur. Repellat veniam vero, unde eaque saepe numquam porro quam adipisci distinctio similique amet, odio deserunt nam veritatis dicta neque est quo atque blanditiis! Cum corporis magni consequatur ab placeat omnis ea accusamus iste quod velit officia eaque non quasi asperiores ratione atque, eveniet est minus aliquam aspernatur, vitae vel! Ratione porro officia possimus, eum dicta tenetur explicabo optio commodi nihil accusantium in a veniam cupiditate nam beatae obcaecati? Omnis quas, unde animi ducimus nulla quisquam error et blanditiis commodi obcaecati itaque laudantium pariatur cumque! Magnam animi voluptate obcaecati illo tempora magni doloremque nisi cumque cupiditate, in tenetur hic rerum, earum saepe beatae deserunt dicta, ad nam? Placeat soluta culpa modi aliquam cupiditate iste dolor molestias officiis velit facere dolore, quo ut accusamus maiores id eius! Iste cupiditate recusandae tempore quasi blanditiis ipsam enim, sequi, libero doloribus at modi maiores nostrum impedit facere dolore reprehenderit sapiente accusantium quos illum a maxime quis. Voluptatum hic porro sapiente odit explicabo cum, dolorum dolores, quis pariatur animi sint dolorem possimus nemo in. Rem?</p>",
    category: { name: "Technology" },
    owner: {
      avatar: "https://github.com/shadcn.png",
      fullName: "John Doe",
    },
  },
  // Add 2-3 more mock blog objects here for a better layout
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">For you</h1>
            <BlogList blogs={mockBlogs} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
