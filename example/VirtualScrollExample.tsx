import React from "react";
import { useVirtualScroll } from "../src";

interface Post {
  id: number;
  title: string;
}

const fetchPosts = async (page: number): Promise<Post[]> => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({ length: 10 }, (_, i) => ({
    id: (page - 1) * 10 + i + 1,
    title: `Post ${(page - 1) * 10 + i + 1}`,
  }));
};

const VirtualScrollExample: React.FC = () => {
  const { allItems, isLoading, containerRef } = useVirtualScroll<Post>({
    fetchItems: fetchPosts,
    threshold: 200, // 200px before the end of the list
  });

  return (
    <div ref={containerRef} style={{ height: "600px", overflow: "auto" }}>
      {allItems.map((post) => (
        <div
          key={post.id}
          style={{ height: "100px", border: "1px solid #ccc", margin: "10px" }}
        >
          {post.title}
        </div>
      ))}
      {isLoading && <div>Loading more posts...</div>}
    </div>
  );
};

export default VirtualScrollExample;
