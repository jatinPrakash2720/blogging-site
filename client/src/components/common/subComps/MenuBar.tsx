


"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LayoutToggle, type LayoutType } from "./layout-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/common/wrappers/Pagination"; // Import pagination components
import type { PaginatedBlogResponse } from "@/types/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MenuBarItem {
  slug: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
interface MenuBarProps {
  items: MenuBarItem[];
  activeFilter?: string;
  setActiveFilter?: (filter: string) => void;
  layout?: LayoutType;
  onLayoutChange?: (layout: LayoutType) => void;
  paginationData: PaginatedBlogResponse | null;
  onPageChange: (page: number) => void;
}

const usePagination = ({
  totalPageCount,
  siblingCount=1,
  currentPage,
}: {
    totalPageCount: number;
siblingCount ?: number;
currentPage: number;
  }) => {
  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPageCount - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [totalPageCount, siblingCount, currentPage]);

  return paginationRange;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  items,
  activeFilter,
  setActiveFilter,
  layout = "square",
  onLayoutChange,
  paginationData,
  onPageChange
}) => {

  const paginationRange = usePagination({
    currentPage: paginationData?.page || 1,
    totalPageCount: paginationData?.totalPages || 1,
  });
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md border rounded-full px-3 py-2 shadow-lg">
        {/* Filter Items */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.slug}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveFilter?.(item.slug)}
                    className={cn(
                      "p-2 rounded-full transition-all duration-200 flex-shrink-0",
                      activeFilter === item.slug
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Pagination COntrols*/}
        {paginationData && paginationData.totalPages > 1 && (
          <>
            <div className="w-px h-6 bg-border mx-1" />
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (paginationData.hasPrevPage)
                        onPageChange(paginationData.page - 1);
                    }}
                    className={cn(
                      "!w-9 !h-9",
                      !paginationData.hasPrevPage &&
                        "opacity-50 pointer-events-none"
                    )}
                    aria-label="Go to previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <span className="text-sm font-medium text-foreground px-2 tabular-nums">
                    {paginationData.page} / {paginationData.totalPages}
                  </span>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (paginationData.hasNextPage)
                        onPageChange(paginationData.page + 1);
                    }}
                    className={cn(
                      "!w-9 !h-9",
                      !paginationData.hasNextPage &&
                        "opacity-50 pointer-events-none"
                    )}
                    aria-label="Go to next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}

        {/* Layout Toggle*/}
        {onLayoutChange && (
          <div className="hidden sm:block w-px h-6 bg-border mx-1" />
        )}
        {onLayoutChange && (
          <LayoutToggle
            layout={layout}
            onLayoutChange={onLayoutChange}
            className="bg-transparent border-0 p-0 gap-1"
          />
        )}
      </div>
    </TooltipProvider>
  );
};
