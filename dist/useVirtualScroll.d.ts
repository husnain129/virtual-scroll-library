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
declare function useVirtualScroll<T extends Item>({ fetchItems, initialItems, itemsPerPage, threshold, }: UseVirtualScrollProps<T>): UseVirtualScrollResult<T>;
export default useVirtualScroll;
