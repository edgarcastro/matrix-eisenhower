import React from 'react';
import CustomPaper, { CustomPaperProps } from './CustomPaper';
import { DragDropContext } from 'react-beautiful-dnd';
import { render } from '@testing-library/react';

const defaultProps: CustomPaperProps = {
  index: 1,
  title: 'test',
};

function renderCustomPaper(props: CustomPaperProps, onDragEnd: () => void) {
  return render(
    <DragDropContext onDragEnd={onDragEnd}>
      <CustomPaper {...props} />
    </DragDropContext>
  );
}

describe('<CustomPaper>', () => {
  it('Expect to find the title text', async () => {
    const { findByText } = renderCustomPaper(defaultProps, () => ({}));
    const titleText = await findByText(defaultProps.title);
    expect(titleText).toBeTruthy();
  });
});
