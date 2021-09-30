// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chaiEnzyme from 'chai-enzyme';
import chai from 'chai';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';

chai.use(chaiEnzyme());

Enzyme.configure({
  adapter: new Adapter(),
});

let rulesTestEnvironment: RulesTestEnvironment;

beforeAll(async () => {
  rulesTestEnvironment = await initializeTestEnvironment({
    projectId: 'demo-test',
  });
});

afterAll(async () => {
  await rulesTestEnvironment.cleanup();
});
