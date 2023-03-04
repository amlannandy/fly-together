import { createMock } from '@golevelup/ts-jest';
import { Request, Response } from 'express';

export const mockRequestObject = () => {
  return createMock<Request>({
    body: jest.fn().mockReturnThis(),
  });
};

export const mockResponseObject = () => {
  return createMock<Response>({
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  });
};
