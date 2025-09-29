import { ListItem as ListItemType } from "@/types";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";

interface ListItemProps {
  item: ListItemType;
  listId: string;
  onCompleteChange: (itemId: string) => void;
}

const ListItem = ({ item, listId, onCompleteChange }: ListItemProps) => {
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
      className={clsx("flex items-center gap-2", isDragging && "opacity-50")}
      ref={listItemRef}
    >
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onCompleteChange(item.id)}
      />
      <p>{item.text}</p>
    </div>
  );
};

export default ListItem;
