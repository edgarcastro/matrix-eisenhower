import { ListItem as ListItemType } from "@/types";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

interface ListItemProps {
  item: ListItemType;
  listId: string;
  onCompleteChange: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
}

const ListItem = ({
  item,
  listId,
  onCompleteChange,
  onRemoveItem,
}: ListItemProps) => {
  const listItemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const el = listItemRef.current;
    invariant(el);

    return draggable({
      element: el,
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
      getInitialData: () => ({
        listId,
        itemId: item.id,
      }),
    });
  }, [listId, item.id]);
  return (
    <div
      className={clsx("flex items-center", isDragging && "opacity-50")}
      ref={listItemRef}
    >
      <Checkbox
        className="cursor-pointer"
        checked={item.completed}
        onCheckedChange={() => onCompleteChange(item.id)}
        id={`${listId}-${item.id}-checkbox`}
      />
      <label
        className="pl-2 cursor-pointer"
        htmlFor={`${listId}-${item.id}-checkbox`}
      >
        {item.text}
      </label>
      <Button
        className="ml-auto cursor-pointer"
        variant="ghost"
        size="icon"
        onClick={() => onRemoveItem(item.id)}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ListItem;
