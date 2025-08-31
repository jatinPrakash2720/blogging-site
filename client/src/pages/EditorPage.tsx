"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@/components/features/blog/Editor";
import Header from "@/components/layout/Header";
import ParticleBackground from "@/components/common/background/ParticeBackground";
import { Preview } from "@/components/features/blog/Preview";

export default function BlogEditorPage() {
  const [title, setTitle] = useState("");
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onHeightChange={(height) => console.log(height)}
        disableScrollEffect={true}
      />
      <div className="mx-auto max-w-6xl space-y-8">
        <ParticleBackground className="fixed inset-0 -z-10" quantity={250} />

        <div className="space-y-3 z-0">
          <Label
            htmlFor="blog-title"
            className="text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            Blog Title
          </Label>
          <Input
            id="blog-title"
            type="text"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              text-lg font-medium h-12 px-4
              backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 
              border border-white/20 dark:border-gray-700/30 
              rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20
              hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30
              focus:shadow-xl focus:shadow-black/10 dark:focus:shadow-black/30
              transition-all duration-300 ease-out
              placeholder:text-gray-400 dark:placeholder:text-gray-500
            "
          />
        </div>

        <div className="space-y-3 z-0">
          <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Content
          </Label>
          <Editor />
        </div>
      </div>
    </div>
  );
  
}
