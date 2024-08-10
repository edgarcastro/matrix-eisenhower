import Copyright from './Copyright';
import { shallow } from 'enzyme';

function renderCopyright() {
  return shallow(<Copyright />);
}

describe('<Copyright>', () => {
  test('Expect the component contains the loading text', () => {
    const wrapper = renderCopyright();
    expect(wrapper).toHaveLength(1);
  });
});
