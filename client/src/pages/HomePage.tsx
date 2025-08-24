"use client";

import type React from "react";
import { useEffect, useState } from "react";
import BlogList from "@/components/features/blog/BlogList";
import { Home, Compass, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ParticleBackground from "@/components/common/background/ParticeBackground";
import { useAuth } from "@/store/auth";
import { useBlogs } from "@/store/blog";
import FeatureBar from "@/components/features/blog/FeatureBar";
import { MenuBar } from "@/components/common/subComps/MenuBar";
import Loader from "@/components/ui/Loader";
import { useInView } from "@/hooks/UseInView";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LayoutType } from "../components/common/subComps/layout-toggle";

interface MenuBarItem {
  slug: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const mockFavoriteTags = [
  { name: "Technology", slug: "technology" },
  { name: "Travel", slug: "travel" },
  { name: "Food", slug: "food" },
];
const exploreBlogs = [
  {
    _id: "1",
    slug: "future-of-ai",
    category: "Technology",
    title: "The Future of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is revolutionizing software development, from automated testing to code generation.",
    authorName: "John Doe",
    authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    readTime: "5 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1620712943543-95fc6968475b?q=80&w=800&auto=format&fit=crop",
    likeCount: 154,
    commentCount: 23,
    topTag: "AI",
  },
  {
    _id: "2",
    slug: "gems-of-asia",
    category: "Travel",
    title: "Exploring the Hidden Gems of Southeast Asia",
    excerpt:
      "Discover the lesser-known destinations in Southeast Asia that offer unique cultural experiences and breathtaking landscapes.",
    authorName: "Jane Smith",
    authorAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    readTime: "7 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=800&auto=format&fit=crop",
    likeCount: 210,
    commentCount: 45,
    topTag: "Travel",
  },
  {
    _id: "3",
    slug: "homemade-pasta",
    category: "Food",
    title: "Mastering the Art of Homemade Pasta",
    excerpt:
      "Learn the secrets to making perfect homemade pasta, from selecting the right ingredients to mastering the techniques.",
    authorName: "Mike Jones",
    authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    readTime: "4 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1621996346565-e326b20f54b2?q=80&w=800&auto=format&fit=crop",
    likeCount: 98,
    commentCount: 17,
    topTag: "Cooking",
  },
  {
    _id: "4",
    slug: "sustainable-living",
    category: "Lifestyle",
    title: "A Beginner's Guide to Sustainable Living",
    excerpt:
      "Simple steps you can take to reduce your carbon footprint and live a more eco-friendly life.",
    authorName: "Sarah Chen",
    authorAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
    readTime: "6 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1549488344-f18705f4e1f7?q=80&w=800&auto=format&fit=crop",
    likeCount: 341,
    commentCount: 68,
    topTag: "Sustainability",
  },
  {
    _id: "5",
    slug: "meditation-benefits",
    category: "Wellness",
    title: "The Surprising Benefits of Daily Meditation",
    excerpt:
      "Discover how just 10 minutes of meditation a day can improve your mental clarity and reduce stress.",
    authorName: "David Lee",
    authorAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
    readTime: "5 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1577742137119-c70e7e4a64e1?q=80&w=800&auto=format&fit=crop",
    likeCount: 278,
    commentCount: 55,
    topTag: "Mindfulness",
  },
  {
    _id: "6",
    slug: "quantum-computing-explained",
    category: "Technology",
    title: "Quantum Computing: The Next Frontier",
    excerpt:
      "A deep dive into the principles of quantum mechanics and how they're being applied to create powerful new computers.",
    authorName: "Emily White",
    authorAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
    readTime: "8 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800&auto=format&fit=crop",
    likeCount: 450,
    commentCount: 112,
    topTag: "Quantum",
  },
  {
    _id: "7",
    slug: "solo-travel-europe",
    category: "Travel",
    title: "My Solo Adventure Across Europe",
    excerpt:
      "Tips and tricks for navigating Europe on your own, from budgeting to finding the best local spots.",
    authorName: "Chris Green",
    authorAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
    readTime: "10 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=800&auto=format&fit=crop",
    likeCount: 320,
    commentCount: 88,
    topTag: "Europe",
  },
  {
    _id: "8",
    slug: "vegan-baking-101",
    category: "Food",
    title: "Vegan Baking Made Easy",
    excerpt:
      "Delicious and simple recipes for classic desserts, all completely plant-based.",
    authorName: "Jessica Brown",
    authorAvatar: "https://randomuser.me/api/portraits/women/8.jpg",
    readTime: "6 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop",
    likeCount: 180,
    commentCount: 34,
    topTag: "Vegan",
  },
  {
    _id: "9",
    slug: "minimalist-home-decor",
    category: "Lifestyle",
    title: "The Art of Minimalist Home Decor",
    excerpt:
      "How to declutter your space and create a calming, minimalist environment that sparks joy.",
    authorName: "Alex Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/men/9.jpg",
    readTime: "5 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1567699333330-192742a2d45e?q=80&w=800&auto=format&fit=crop",
    likeCount: 290,
    commentCount: 59,
    topTag: "Minimalism",
  },
  {
    _id: "10",
    slug: "digital-detox-guide",
    category: "Wellness",
    title: "How a Digital Detox Can Change Your Life",
    excerpt:
      "Feeling overwhelmed by screens? Here's a practical guide to unplugging and reconnecting with the world around you.",
    authorName: "Olivia Martinez",
    authorAvatar: "https://randomuser.me/api/portraits/women/10.jpg",
    readTime: "7 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516542949234-16a7c1a3a6a8?q=80&w=800&auto=format&fit=crop",
    likeCount: 410,
    commentCount: 95,
    topTag: "Wellness",
  },
];
const technologyBlogs = [
  {
    _id: "1",
    slug: "future-of-ai",
    category: "Technology",
    title: "The Future of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is revolutionizing software development, from automated testing to code generation.",
    authorName: "John Doe",
    authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    readTime: "5 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1620712943543-95fc6968475b?q=80&w=800&auto=format&fit=crop",
    likeCount: 154,
    commentCount: 23,
    topTag: "AI",
  },
  {
    _id: "6",
    slug: "quantum-computing-explained",
    category: "Technology",
    title: "Quantum Computing: The Next Frontier",
    excerpt:
      "A deep dive into the principles of quantum mechanics and how they're being applied to create powerful new computers.",
    authorName: "Emily White",
    authorAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
    readTime: "8 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800&auto=format&fit=crop",
    likeCount: 450,
    commentCount: 112,
    topTag: "Quantum",
  },
  {
    _id: "11",
    slug: "blockchain-beyond-crypto",
    category: "Technology",
    title: "Blockchain Beyond Cryptocurrency",
    excerpt:
      "Exploring the innovative use cases for blockchain technology in supply chain, healthcare, and voting systems.",
    authorName: "Ben Carter",
    authorAvatar: "https://randomuser.me/api/portraits/men/11.jpg",
    readTime: "9 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
    likeCount: 520,
    commentCount: 130,
    topTag: "Blockchain",
  },
];
const travelBlogs = [
  {
    _id: "2",
    slug: "gems-of-asia",
    category: "Travel",
    title: "Exploring the Hidden Gems of Southeast Asia",
    excerpt:
      "Discover the lesser-known destinations in Southeast Asia that offer unique cultural experiences and breathtaking landscapes.",
    authorName: "Jane Smith",
    authorAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    readTime: "7 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=800&auto=format&fit=crop",
    likeCount: 210,
    commentCount: 45,
    topTag: "Travel",
  },
  {
    _id: "7",
    slug: "solo-travel-europe",
    category: "Travel",
    title: "My Solo Adventure Across Europe",
    excerpt:
      "Tips and tricks for navigating Europe on your own, from budgeting to finding the best local spots.",
    authorName: "Chris Green",
    authorAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
    readTime: "10 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=800&auto=format&fit=crop",
    likeCount: 320,
    commentCount: 88,
    topTag: "Europe",
  },
  {
    _id: "12",
    slug: "road-trip-usa",
    category: "Travel",
    title: "The Ultimate American Road Trip",
    excerpt:
      "A coast-to-coast itinerary covering the most iconic national parks and roadside attractions.",
    authorName: "Sophia Rodriguez",
    authorAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
    readTime: "12 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470119313559-3165b3693414?q=80&w=800&auto=format&fit=crop",
    likeCount: 630,
    commentCount: 150,
    topTag: "USA",
  },
];
const foodBlogs = [
  {
    _id: "3",
    slug: "homemade-pasta",
    category: "Food",
    title: "Mastering the Art of Homemade Pasta",
    excerpt:
      "Learn the secrets to making perfect homemade pasta, from selecting the right ingredients to mastering the techniques.",
    authorName: "Mike Jones",
    authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    readTime: "4 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1621996346565-e326b20f54b2?q=80&w=800&auto=format&fit=crop",
    likeCount: 98,
    commentCount: 17,
    topTag: "Cooking",
  },
  {
    _id: "8",
    slug: "vegan-baking-101",
    category: "Food",
    title: "Vegan Baking Made Easy",
    excerpt:
      "Delicious and simple recipes for classic desserts, all completely plant-based.",
    authorName: "Jessica Brown",
    authorAvatar: "https://randomuser.me/api/portraits/women/8.jpg",
    readTime: "6 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop",
    likeCount: 180,
    commentCount: 34,
    topTag: "Vegan",
  },
  {
    _id: "13",
    slug: "gourmet-coffee-at-home",
    category: "Food",
    title: "Brewing Gourmet Coffee at Home",
    excerpt:
      "From pour-over to cold brew, learn the techniques to make cafe-quality coffee in your own kitchen.",
    authorName: "Daniel Kim",
    authorAvatar: "https://randomuser.me/api/portraits/men/13.jpg",
    readTime: "6 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511920183353-3c9c35b5c21a?q=80&w=800&auto=format&fit=crop",
    likeCount: 250,
    commentCount: 48,
    topTag: "Coffee",
  },
];
const forYouBlogs = [
  {
    _id: "16",
    slug: "cybersecurity-trends-2025",
    category: "Technology",
    title: "Top Cybersecurity Trends to Watch in 2025",
    excerpt:
      "From AI-powered threats to zero-trust architecture, stay ahead of the curve with these key cybersecurity insights.",
    authorName: "Kevin Mitnick",
    authorAvatar: "https://randomuser.me/api/portraits/men/16.jpg",
    readTime: "8 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    likeCount: 480,
    commentCount: 95,
    topTag: "Security",
  },
  {
    _id: "17",
    slug: "patagonia-adventure",
    category: "Travel",
    title: "Trekking Through the Wilds of Patagonia",
    excerpt:
      "A breathtaking journey through the dramatic landscapes of Torres del Paine National Park.",
    authorName: "Rachel Adams",
    authorAvatar: "https://randomuser.me/api/portraits/women/17.jpg",
    readTime: "11 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518002583126-1a187c3f3d9b?q=80&w=800&auto=format&fit=crop",
    likeCount: 720,
    commentCount: 180,
    topTag: "Adventure",
  },
  {
    _id: "18",
    slug: "artisan-bread-making",
    category: "Food",
    title: "The Simple Joy of Artisan Bread Making",
    excerpt:
      "Learn to bake crusty, flavorful artisan bread at home with this simple, step-by-step guide.",
    authorName: "Carlos Garcia",
    authorAvatar: "https://randomuser.me/api/portraits/men/18.jpg",
    readTime: "7 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop",
    likeCount: 310,
    commentCount: 65,
    topTag: "Baking",
  },
  {
    _id: "19",
    slug: "finding-flow-state",
    category: "Lifestyle",
    title: "How to Find Your Flow State and Boost Creativity",
    excerpt:
      "Unlock peak performance and creativity by understanding and harnessing the power of the flow state.",
    authorName: "Amanda Wells",
    authorAvatar: "https://randomuser.me/api/portraits/women/19.jpg",
    readTime: "6 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=800&auto=format&fit=crop",
    likeCount: 455,
    commentCount: 92,
    topTag: "Creativity",
  },
  {
    _id: "20",
    slug: "gut-health-importance",
    category: "Wellness",
    title: "Why Gut Health is the Secret to Overall Wellness",
    excerpt:
      "Explore the connection between your gut microbiome and everything from your mood to your immune system.",
    authorName: "Dr. Evelyn Reed",
    authorAvatar: "https://randomuser.me/api/portraits/women/20.jpg",
    readTime: "8 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1599949980225-b6d85b1a3e35?q=80&w=800&auto=format&fit=crop",
    likeCount: 680,
    commentCount: 140,
    topTag: "Health",
  },
  {
    _id: "21",
    slug: "future-of-vr",
    category: "Technology",
    title: "Virtual Reality: No Longer Just for Gaming",
    excerpt:
      "From surgical training to virtual tourism, VR is expanding into industries you'd never expect.",
    authorName: "Tom Henderson",
    authorAvatar: "https://randomuser.me/api/portraits/men/21.jpg",
    readTime: "7 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
    likeCount: 390,
    commentCount: 78,
    topTag: "VR",
  },
  {
    _id: "22",
    slug: "japanese-culture-trip",
    category: "Travel",
    title: "A Cultural Immersion in Kyoto, Japan",
    excerpt:
      "Experience the ancient temples, serene gardens, and rich traditions of Japan's former imperial capital.",
    authorName: "Yuki Tanaka",
    authorAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
    readTime: "9 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=800&auto=format&fit=crop",
    likeCount: 810,
    commentCount: 210,
    topTag: "Japan",
  },
  {
    _id: "23",
    slug: "perfect-steak",
    category: "Food",
    title: "How to Cook the Perfect Steak Every Time",
    excerpt:
      "Master the reverse sear technique for a steak that's perfectly cooked from edge to edge.",
    authorName: "Frank Miller",
    authorAvatar: "https://randomuser.me/api/portraits/men/23.jpg",
    readTime: "5 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1529692236671-f1f6b5f46b54?q=80&w=800&auto=format&fit=crop",
    likeCount: 550,
    commentCount: 115,
    topTag: "Grilling",
  },
  {
    _id: "24",
    slug: "side-hustle-ideas",
    category: "Lifestyle",
    title: "20 Side Hustles You Can Start This Weekend",
    excerpt:
      "Looking to earn extra income? Here are 20 practical ideas you can start with minimal investment.",
    authorName: "Brenda Davis",
    authorAvatar: "https://randomuser.me/api/portraits/women/24.jpg",
    readTime: "10 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-15614646431262ab714a52?q=80&w=800&auto=format&fit=crop",
    likeCount: 950,
    commentCount: 250,
    topTag: "Finance",
  },
  {
    _id: "25",
    slug: "science-of-sleep",
    category: "Wellness",
    title: "The Science of Sleep: How to Get a Better Night's Rest",
    excerpt:
      "Understand the stages of sleep and learn actionable tips for improving your sleep quality and energy levels.",
    authorName: "Dr. Samuel Jones",
    authorAvatar: "https://randomuser.me/api/portraits/men/25.jpg",
    readTime: "8 min read",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1495572526201-2e091e2439a9?q=80&w=800&auto=format&fit=crop",
    likeCount: 780,
    commentCount: 190,
    topTag: "Sleep",
  },
];

const HomePage: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [activeFilter, setActiveFilter] = useState<string>("for-you");
  const [blogsToDisplay, setBlogsToDisplay] = useState(forYouBlogs);
  const [layout, setLayout] = useState<LayoutType>("square");
  const [headerHeight, setHeaderHeight] = useState(0);

  const [featureBarRef, isFeatureBarVisible] = useInView({ threshold: 0.5 });

  const { loading } = useBlogs();
  const { currentUser } = useAuth();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const menuItems: MenuBarItem[] = [
    { slug: "for-you", label: "For You", icon: Home },
    { slug: "explore", label: "Explore", icon: Compass },
    ...mockFavoriteTags.map((tag) => ({
      slug: tag.slug,
      label: tag.name,
      icon: Tag,
    })),
  ];

  useEffect(() => {
    if (activeFilter === "for-you") {
      setBlogsToDisplay(forYouBlogs);
    } else if (activeFilter === "explore") {
      setBlogsToDisplay(exploreBlogs);
    } else if (activeFilter === "technology") {
      setBlogsToDisplay(technologyBlogs);
    } else if (activeFilter === "travel") {
      setBlogsToDisplay(travelBlogs);
    } else if (activeFilter === "food") {
      setBlogsToDisplay(foodBlogs);
    }
  }, [activeFilter]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        theme={theme}
        themeProp={handleThemeChange}
        onHeightChange={setHeaderHeight}
      />
      <div
        className="relative flex-grow w-full"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <ParticleBackground
          className="fixed inset-0 -z-10"
          quantity={250}
          color={theme === "light" ? "#00000" : "#ffffff"}
        />
        <main className="container max-w-[95%] mx-auto px-4">
          <div className="my-6">
            <div ref={featureBarRef}>
              <FeatureBar
                items={menuItems}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                layout={layout}
                onLayoutChange={setLayout}
              />
            </div>
          </div>
          <div className={cn("transition-all duration-300")}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                {loading ? (
                  <Loader />
                ) : (
                  <BlogList blogs={blogsToDisplay} layout={layout} />
                )}
              </div>
              <div className="hidden lg:block lg:col-span-1">
                <Sidebar />
              </div>
            </div>
          </div>
        </main>
      </div>
      <AnimatePresence>
        {!isFeatureBarVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 right-0 h-24 bg-white/50 dark:bg-black/50 backdrop-blur-md z-40"
              style={{
                maskImage:
                  "linear-gradient(to top, black 50%, transparent 100%)",
              }}
            ></motion.div>
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
            >
              <MenuBar
                items={menuItems}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                layout={layout}
                onLayoutChange={setLayout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
