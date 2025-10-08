import List from "./components/List";
import { EisenhowerList, ListItem } from "./types";
import React, { useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { writeEisenhowerList, readEisenhowerList } from "./api";

const userId = "123";
const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const initialLists: EisenhowerList = [
  {
    id: "1",
    title: "Urgent and Important",
    urgent: true,
    important: true,
    items: [] as ListItem[],
    color: "#E74C3C",
    // dark red #8B0000
  },
  {
    id: "2",
    title: "Urgent and Not Important",
    urgent: true,
    important: false,
    items: [] as ListItem[],
    color: "#FFD700",
    // dark yellow #B38600
  },
  {
    id: "3",
    title: "Not Urgent and Important",
    urgent: false,
    important: true,
    items: [] as ListItem[],
    color: "#2ECC71",
    // dark green #008000
  },
  {
    id: "4",
    title: "Not Urgent and Not Important",
    urgent: false,
    important: false,
    items: [] as ListItem[],
    color: "#3498DB",
    // dark blue #000080
  },
];

function App() {
  const [lists, setLists] = React.useState<EisenhowerList>(initialLists);

  useEffect(() => {
    const fetchLists = async () => {
      const { list } = await readEisenhowerList(userId);
      if (list) {
        setLists(list);
      }
    };
    fetchLists();
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          // if dropped outside of any drop targets
          return;
        }
        const destinationListId = destination.data.listId as string;
        const sourceListId = source.data.listId as string;
        const sourceItemId = source.data.itemId as string;

        handleMoveItem(sourceListId, destinationListId, sourceItemId);
      },
    });
  }, [lists]);

  const handleMoveItem = (
    sourceListId: string,
    destinationListId: string,
    sourceItemId: string
  ) => {
    setLists((prevLists) => {
      const sourceItem = prevLists
        .find((list) => list.id === sourceListId)
        ?.items?.find((item) => item.id === sourceItemId);
      if (!sourceItem) {
        return prevLists;
      }
      const newLists = [...prevLists]
        .map((list) =>
          list.id !== sourceListId
            ? list
            : {
                ...list,
                items: list.items?.filter((item) => item.id !== sourceItemId),
              }
        )
        .map((list) =>
          list.id === destinationListId
            ? { ...list, items: [...(list.items || []), sourceItem] }
            : list
        );

      writeEisenhowerList(userId, newLists);

      return newLists;
    });
  };

  const handleCompleteChange = (listId: string, itemId: string) => {
    setLists((prevLists) => {
      const newLists = prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items?.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      );

      writeEisenhowerList(userId, newLists);

      return newLists;
    });
  };

  const handleAddItem = (listId: string, itemText: string) => {
    setLists((prevLists) => {
      const newLists = prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...(list.items || []),
                { id: generateId(), text: itemText, completed: false },
              ],
            }
          : list
      );

      writeEisenhowerList(userId, newLists);

      return newLists;
    });
  };

  const handleRemoveItem = (listId: string, itemId: string) => {
    setLists((prevLists) => {
      const newLists = prevLists.map((list) =>
        list.id === listId
          ? { ...list, items: list.items?.filter((item) => item.id !== itemId) }
          : list
      );

      writeEisenhowerList(userId, newLists);

      return newLists;
    });
  };

  return (
    <div className="flex flex-col gap-2 h-screen">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-2 flex-1 p-2">
        {lists.map((list) => (
          <List
            key={list.id}
            id={list.id}
            items={list.items || []}
            name={list.title}
            color={list.color}
            onCompleteChange={(itemId) => handleCompleteChange(list.id, itemId)}
            onAddItem={(itemText) => handleAddItem(list.id, itemText)}
            onRemoveItem={(itemId) => handleRemoveItem(list.id, itemId)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
