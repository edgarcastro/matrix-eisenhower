import React, { useState } from 'react';
import { Paper, List, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import Item from '../Item';
import './CustomPaper.scss';

interface CustomPaperProps {
  index: number;
  title: string;
  list?: Array<string>;
  color?: string;
  onSetList?: (input: string) => void;
  onRemoveItem?: (itemIndex: number) => void;
}

const CustomPaper: React.FC<CustomPaperProps> = ({
  index,
  title,
  list = [],
  color = '#787',
  onSetList = () => {
    // Do nothing
  },
  onRemoveItem = () => {
    // Do nothing
  },
}) => {
  const [input, setInput] = useState('');

  const useStyles = makeStyles(() => ({
    paper: {
      backgroundColor: color,
      height: 'auto',
      color: '#fff',
    },
  }));

  const onKeyChange = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSetList(input);
      setInput('');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const classes = useStyles();
  return (
    <Paper className={`${classes.paper} customPaper`}>
      <h1>{title}</h1>
      <TextField
        className={'customInput'}
        value={input}
        onKeyDown={onKeyChange}
        onChange={onChange}
        placeholder={'Agrega un nuevo elemento aqui...'}
      />
      <Droppable droppableId={`${index}`}>
        {(provided: DroppableProvided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {list.map((el, i) => (
              <Item
                key={i}
                index={i}
                id={`${index}-${i}`}
                text={el}
                onRemoveItem={() => onRemoveItem(i)}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Paper>
  );
};

export default CustomPaper;
