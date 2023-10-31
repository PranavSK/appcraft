// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';

import { setProjectAnnotations } from '@storybook/react';

import * as projectAnnotations from './.storybook/preview';

setProjectAnnotations(projectAnnotations);
