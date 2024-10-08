# Virtual Scroll Library

A React hook for implementing virtual scrolling with infinite loading capabilities.

## Demo

Check out the live demo of the Virtual Scroll Library in action:
[Virtual Scroll Library Demo](https://virtual-scroll-library-demo.vercel.app)

## GitHub Repository

For the latest updates, issue reporting, and contribution guidelines, please visit our GitHub repository:
[Virtual Scroll Library on GitHub](https://github.com/husnain129/virtual-scroll-library)

## Installation

You can install the Virtual Scroll Library using npm or yarn:

```bash
npm install virtual-scroll-library
# or
yarn add virtual-scroll-library
```

## Usage

Here's a complete example of how to use the `useVirtualScroll` hook in your React component:

```tsx
import React from "react";
import { useVirtualScroll } from "virtual-scroll-library";

interface Post {
  id: number;
  title: string;
  content: string;
}

const VirtualScrollExample: React.FC = () => {
  const fetchPosts = async (page: number): Promise<Post[]> => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i + 1,
      title: `Post ${(page - 1) * 10 + i + 1}`,
      content: `This is the content of post ${(page - 1) * 10 + i + 1}...`,
    }));
  };

  const { allItems, isLoading, containerRef } = useVirtualScroll<Post>({
    fetchItems: fetchPosts,
    threshold: 200, // 200px before the end of the list
  });

  return (
    <div
      ref={containerRef}
      style={{ height: "600px", overflow: "auto", padding: "20px" }}
    >
      {allItems.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      {isLoading && <div>Loading more posts...</div>}
    </div>
  );
};

export default VirtualScrollExample;
```

## API

### `useVirtualScroll<T>`

A hook that implements virtual scrolling functionality.

#### Parameters

The hook accepts an object with the following properties:

- `fetchItems: (page: number) => Promise<T[]>`: A function that fetches items for a given page.
- `initialItems?: T[]`: (Optional) An initial set of items to display.
- `itemsPerPage?: number`: (Optional) The number of items to fetch per page. Default is 10.
- `threshold?: number`: (Optional) The distance from the bottom of the list (in pixels) at which to trigger loading more items. Default is 200.

#### Return Value

The hook returns an object with the following properties:

- `allItems: T[]`: An array containing all loaded items.
- `newLoadedItems: T[]`: An array containing only the most recently loaded items.
- `isLoading: boolean`: A boolean indicating whether new items are currently being loaded.
- `containerRef: React.RefObject<HTMLDivElement>`: A ref to be attached to the scrollable container.

## TypeScript Support

This library is written in TypeScript and provides full type definitions. The `useVirtualScroll` hook is generic, allowing you to specify the type of your list items for improved type safety.

## Performance Considerations

- The virtual scroll implementation efficiently renders only the visible items, making it suitable for large lists.
- Consider implementing memoization techniques (e.g., `React.memo`, `useMemo`) for child components to optimize rendering performance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
