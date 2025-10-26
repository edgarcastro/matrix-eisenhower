import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { readEisenhowerList, writeEisenhowerList } from "./api";
import Footer from "./components/Footer";
import ListComponent from "./components/List";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { useAuth } from "./hooks/useAuth";
import { EisenhowerList, List } from "./types";

const initialLists: EisenhowerList = [
  {
    id: "1",
    title: "Urgent and Important",
    urgent: true,
    important: true,
    styles: "bg-red-500 dark:bg-red-900",
    color: "#e74c3c",
    darkColor: "#8b0000",
  },
  {
    id: "2",
    title: "Urgent and Not Important",
    urgent: true,
    important: false,
    styles: "bg-yellow-500 dark:bg-yellow-900",
    color: "#ffd700",
    darkColor: "#b38600",
  },
  {
    id: "3",
    title: "Not Urgent and Important",
    urgent: false,
    important: true,
    styles: "bg-green-500 dark:bg-green-900",
    color: "#2ecc71",
    darkColor: "#008000",
  },
  {
    id: "4",
    title: "Not Urgent and Not Important",
    urgent: false,
    important: false,
    styles: "bg-blue-500 dark:bg-blue-900",
    color: "#3498db",
    darkColor: "#000080",
  },
];

function App() {
  const [lists, setLists] = React.useState<EisenhowerList>(initialLists);
  const [listsLoaded, setListsLoaded] = React.useState(false);
  const { isAuthenticated } = useAuth();

  const handleWriteLists = React.useCallback(
    (lists: EisenhowerList) => {
      if (isAuthenticated) {
        const userId = auth.currentUser!.uid;
        writeEisenhowerList(userId, lists);
      }
    },
    [isAuthenticated]
  );

  useEffect(() => {
    const fetchLists = async () => {
      if (!isAuthenticated) {
        setListsLoaded(true);
        return;
      }
      const userId = auth.currentUser!.uid;
      const listValue = await readEisenhowerList(userId);
      const list = listValue?.list;
      if (list) {
        setLists((prevLists) => {
          return prevLists.map((prevList) => {
            // update only items
            const updated = list.find((l: List) => l.id === prevList.id);
            if (updated && updated.items) {
              return {
                ...prevList,
                items: updated.items,
              };
            }
            return prevList;
          });
        });
      }
      setListsLoaded(true);
    };
    fetchLists();
  }, [isAuthenticated]);

  const handleMoveItem = React.useCallback(
    (sourceListId: string, destinationListId: string, sourceItemId: string) => {
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

        handleWriteLists(newLists);
        return newLists;
      });
    },
    [handleWriteLists]
  );

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

      handleWriteLists(newLists);
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
                { id: uuidv4(), text: itemText, completed: false },
              ],
            }
          : list
      );

      handleWriteLists(newLists);
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

      handleWriteLists(newLists);
      return newLists;
    });
  };

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
  }, [lists, handleMoveItem]);

  return (
    <div className="flex flex-col gap-2 h-screen">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-2 flex-1 p-2">
        {lists.map((list) => (
          <ListComponent
            key={list.id}
            id={list.id}
            items={list.items || []}
            name={list.title}
            styles={list.styles}
            isLoading={!listsLoaded}
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
