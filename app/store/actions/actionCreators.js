import { createAction } from '@reduxjs/toolkit';

export const conversationAdded = createAction(
  'conversations/conversationAdded',
);
export const conversationUpdated = createAction(
  'conversations/conversationUpdated',
);
export const testAdded = createAction('tests/testAdded');

export const loginUserSuccess = createAction('auth/userLoggedin');
