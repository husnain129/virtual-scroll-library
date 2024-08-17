import { useCallback, useEffect, useRef, useState } from "react";

interface Item {
  id: string | number;
  [key: string]: any;
}

interface UseVirtualScrollProps<T extends Item> {
  /**
   * A function that fetches items for a given page.
   * @param page - The page number to fetch (1-indexed).
   * @param itemsPerPage - The number of items to fetch per page.
   * @returns A promise that resolves to an array of items.
   */
  fetchItems: (page: number, itemsPerPage: number) => Promise<T[]>;

  /**
   * An optional array of items to initialize the list with.
   * Use this if you want to prepopulate the list with existing data.
   * Default is an empty array.
   */
  initialItems?: T[];

  /**
   * The number of items to fetch in each batch.
   * This determines how many items are loaded each time the user scrolls to the bottom.
   * Default is 10.
   */
  itemsPerPage?: number;

  /**
   * The distance from the bottom of the scrollable container (in pixels) at which
   * to trigger loading more items. A smaller value will trigger loading later,
   * while a larger value will trigger it earlier as the user scrolls.
   * Default is 200 pixels.
   */
  threshold?: number;
}

interface UseVirtualScrollResult<T extends Item> {
  allItems: T[];
  newLoadedItems: T[];
  isLoading: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * useVirtualScroll: A custom React hook for implementing virtual scrolling
 *
 * This hook manages the loading and display of items in a scrollable container,
 * fetching new items as the user scrolls and approaching the end of the current content.
 *
 * @template T - The type of items being scrolled, must extend the Item interface
 * @param {UseVirtualScrollProps<T>} props - Configuration options for the virtual scroll
 * @param {function} props.fetchItems - Function to fetch more items. It should accept a page number and items per page, and return a Promise resolving to an array of items.
 * @param {T[]} [props.initialItems=[]] - Initial items to populate the list. Use this if you have items to display immediately.
 * @param {number} [props.itemsPerPage=10] - Number of items to fetch in each batch. Adjust this based on your UI and performance needs.
 * @param {number} [props.threshold=200] - Distance from bottom of the container (in pixels) at which to trigger loading more items.
 * @returns {UseVirtualScrollResult<T>} An object containing the scroll state and ref
 */
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
      const newItems = await fetchItems(page, itemsPerPage);
      setAllItems((prevItems: T[]) => [...prevItems, ...newItems]);
      setNewLoadedItems(newItems);
      setPage((prevPage: number) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchItems, page, isLoading, itemsPerPage]);

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
