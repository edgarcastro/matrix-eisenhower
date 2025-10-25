import { ListItem } from "@/types";
import ListItemComponent from "./ListItem";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import clsx from "clsx";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

interface ListProps {
  name: string;
  id: string;
  styles: string;
  items: ListItem[];
  isLoading: boolean;
  onCompleteChange: (id: string) => void;
  onAddItem: (text: string) => void;
  onRemoveItem: (id: string) => void;
}

const List = ({
  id,
  name,
  styles,
  items,
  onCompleteChange,
  onAddItem,
  onRemoveItem,
  isLoading,
}: ListProps) => {
  const ListRef = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ListRef.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({
        listId: id,
      }),
    });
  }, [id]);

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const value = target.value.trim();
      if (value) {
        onAddItem(value);
        target.value = "";
      }
    }
  };

  if (isLoading) {
    return (
      <div
        className={clsx(`flex flex-col gap-2 p-2 rounded-md h-50%`, styles)}
        ref={ListRef}
      >
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        `flex flex-col gap-2 p-2 rounded-md h-50%`,
        isDraggedOver && "opacity-50",
        styles
      )}
      ref={ListRef}
    >
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <Input
        className="border-gray-500 placeholder:text-gray-500 bg-white"
        type="text"
        placeholder="Add a new item"
        onKeyDown={handleAddItem}
        name={`add-item-input-${id}`}
      />
      <div className={clsx("flex flex-col gap-2")}>
        {items.map((item) => (
          <ListItemComponent
            key={item.id}
            item={item}
            listId={id}
            onCompleteChange={onCompleteChange}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
