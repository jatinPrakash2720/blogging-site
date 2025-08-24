"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { LayoutToggle, type LayoutType } from "../../common/subComps/layout-toggle";

interface MenuBarItem {
  slug: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface FeatureBarProps {
  items: MenuBarItem[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  layout?: LayoutType;
  onLayoutChange?: (layout: LayoutType) => void;
  
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  items,
  activeFilter,
  setActiveFilter,
  layout = "square",
  onLayoutChange,
}) => {
  return (
    <>
      {/* Desktop FeatureBar */}
      <div className="hidden pt-4 md:flex items-center justify-between w-full">
        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.slug}
                onClick={() => setActiveFilter(item.slug)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  activeFilter === item.slug
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Layout toggle */}
        {onLayoutChange && (
          <LayoutToggle
            layout={layout}
            onLayoutChange={onLayoutChange}
            className="ml-4 flex-shrink-0"
          />
        )}
      </div>

      {/* Mobile Menubar */}
      <div className="md:hidden w-full">
        <div className="bg-background/80 backdrop-blur-md border rounded-lg shadow-lg px-4 py-1 flex items-center gap-1">
          {items.map((item) => {
            return (
              <button
                key={item.slug}
                onClick={() => setActiveFilter(item.slug)}
                className={cn(
                  "text-xs font-medium px-2 py-2 rounded-md transition-all duration-200 flex-1 min-w-0 truncate",
                  activeFilter === item.slug
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                title={item.label}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeatureBar;
