import {
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import { ClearOutlined, DragHandle } from '@mui/icons-material';
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

export type ItemProps = {
  id: string;
  index: number;
  text: string;
  onRemoveItem?: () => void;
};

const Item: React.FC<ItemProps> = ({
  id,
  index,
  text,
  onRemoveItem = () => {
    // Do nothing
  },
}) => (
  <Draggable draggableId={id} index={index}>
    {(provided: DraggableProvided) => (
      <div {...provided.draggableProps} ref={provided.innerRef}>
        <ListItem>
          <ListItemIcon {...provided.dragHandleProps}>
            <DragHandle />
          </ListItemIcon>
          <ListItemText primary={text} />
          <ListItemSecondaryAction onClick={() => onRemoveItem()}>
            <IconButton edge="end" aria-label="delete" size="large">
              <ClearOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    )}
  </Draggable>
);

export default Item;
