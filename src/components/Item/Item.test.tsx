import React from 'react';
import Item, { ItemProps } from './Item';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { render } from '@testing-library/react';

const defaultProps: ItemProps = {
  id: '1',
  index: 1,
  text: 'test',
};

function renderItem(props: ItemProps, onDragEnd: () => void) {
  return render(
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-test-id">
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef}>
            <Item {...props} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

describe('<Item>', () => {
  it('Expect to render the item text', async () => {
    const { findByText } = renderItem(defaultProps, () => ({}));
    const itemText = await findByText(defaultProps.text);
    expect(itemText).toBeTruthy();
  });
});
