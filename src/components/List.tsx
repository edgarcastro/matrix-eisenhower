import { ListItem } from "@/types";
import ListItemComponent from "./ListItem";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import clsx from "clsx";

interface ListProps {
  name: string;
  id: string;
  color: string;
  items: ListItem[];
  onCompleteChange: (id: string) => void;
  onAddItem: (text: string) => void;
}

const List = ({
  id,
  name,
  color,
  items,
  onCompleteChange,
  onAddItem,
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

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 p-2 rounded-md h-50%",
        isDraggedOver && "opacity-50"
      )}
      style={{ backgroundColor: color }}
      ref={ListRef}
    >
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <input
        type="text"
        placeholder="Add a new item"
        onKeyDown={handleAddItem}
      />
      <div className={clsx("flex flex-col gap-2")}>
        {items.map((item) => (
          <ListItemComponent
            key={item.id}
            item={item}
            listId={id}
            onCompleteChange={onCompleteChange}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
