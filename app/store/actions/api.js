import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');
export const apiCallFailed = createAction('api/callFailed');
export const apiCallSucceeded = createAction('api/callSucceeded');
