import { useCallback, useEffect, useRef, useState } from "react";

interface Item {
  id: string | number;
  [key: string]: any;
}

interface UseVirtualScrollProps<T extends Item> {
  fetchItems: (page: number) => Promise<T[]>;
  initialItems?: T[];
  itemsPerPage?: number;
  threshold?: number;
}

interface UseVirtualScrollResult<T extends Item> {
  allItems: T[];
  newLoadedItems: T[];
  isLoading: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

function useVirtualScroll<T extends Item>({
  fetchItems,
  initialItems = [],
  itemsPerPage = 10,
  threshold = 200,
}: UseVirtualScrollProps<T>): UseVirtualScrollResult<T> {
  const [allItems, setAllItems] = useState<T[]>(initialItems);
  const [newLoadedItems, setNewLoadedItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreItems = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newItems = await fetchItems(page);
      setAllItems((prevItems) => [...prevItems, ...newItems]);
      setNewLoadedItems(newItems);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchItems, page, isLoading]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - threshold && !isLoading) {
      loadMoreItems();
    }
  }, [isLoading, loadMoreItems, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (initialItems.length === 0) {
      loadMoreItems();
    }
  }, []);

  return {
    allItems,
    newLoadedItems,
    isLoading,
    containerRef,
  };
}

export default useVirtualScroll;
