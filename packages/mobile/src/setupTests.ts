// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things upvote:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: {},
      removeListener: {},
    };
  };
