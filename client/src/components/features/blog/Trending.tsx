import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/wrappers/Card";
import Badge from "@/components/common/wrappers/Badge";

// Mock data for demonstration
const mockTrendingTags = [
  "Technology",
  "AI",
  "React",
  "Travel",
  "Foodie",
  "Productivity",
  "JavaScript",
];

const Trending: React.FC = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg">Trending Tags</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1">
        {mockTrendingTags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="cursor-pointer gap-1 hover:bg-gray-300"
          >
            {tag}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};

export default Trending;
