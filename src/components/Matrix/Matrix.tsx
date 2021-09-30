import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import CustomPaper from '../CustomPaper';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { database } from '../../firebase';
import { ref, set, onValue } from 'firebase/database';
import { MATRIX_EISENHOWER } from '../../constants';
//import { ramdomizeLists } from "./initialData";

type MatrixType = {
  '1': string[];
  '2': string[];
  '3': string[];
  '4': string[];
};

type TableCodeType = '1' | '2' | '3' | '4';

const defaultMatrix: MatrixType = {
  '1': [],
  '2': [],
  '3': [],
  '4': [],
};

const Matrix: React.FC = () => {
  const path = sessionStorage.getItem('userUID') ?? undefined;
  const [lists, setLists] = useState<MatrixType>(defaultMatrix);

  const addItem = (tableCode: TableCodeType) => (newItem: string) => {
    setLists(prev => {
      if (!Array.isArray(prev[tableCode])) {
        prev[tableCode] = [newItem];
      } else prev[tableCode].push(newItem);
      return prev;
    });
    set(ref(database, path), lists);
  };

  const removeItem = (tableCode: TableCodeType) => (itemIndex: number) => {
    setLists(prev => {
      console.log(prev[tableCode]);
      prev[tableCode].splice(itemIndex, 1);
      return prev;
    });

    set(ref(database, path), lists);
  };

  useEffect(() => {
    onValue(ref(database, path), snapshot => {
      const value = snapshot.val();
      if (value) {
        setLists(value as MatrixType);
      }
    });
  }, [path]);

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));

  const classes = useStyles();

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const itemIndex = draggableId.split('-')[1];
    let item = '';
    setLists(prev => {
      const sourceIndex: TableCodeType = source.droppableId as TableCodeType;
      item = prev[sourceIndex][+itemIndex];
      prev[sourceIndex].splice(source.index, 1);
      const destinationIndex: TableCodeType =
        destination.droppableId as TableCodeType;
      if (!Array.isArray(prev[destinationIndex])) {
        prev[destinationIndex] = [item];
      } else prev[destinationIndex].splice(destination.index, 0, item);

      return prev;
    });
    set(ref(database, path), lists);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.root}>
        {MATRIX_EISENHOWER.map(({ key, title, color }) => (
          <CustomPaper
            key={key}
            index={key}
            title={title}
            color={color}
            list={lists[key.toString() as TableCodeType]}
            onSetList={addItem(key.toString() as TableCodeType)}
            onRemoveItem={removeItem(key.toString() as TableCodeType)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Matrix;
