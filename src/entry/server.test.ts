/* eslint-disable @typescript-eslint/unbound-method */
import {
  Request, Response,
} from "express";
import server from "./server";

const mockRequest = (req: Partial<Request>) => req as unknown as Request;

const mockResponse = () => {
  const res: { [key: string]: unknown } = {};
  res.contentType = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as unknown as Response;
};

test("`/` serves home page", () => {
  const req = mockRequest({ path: "/" });
  const res = mockResponse();
  const served = server(req, res);
  expect(served).toStrictEqual(undefined);
  expect(res.status).toHaveBeenCalledTimes(0);
  expect(res.send).toHaveBeenCalledTimes(1);
});

test("`/notfound` serves 404", () => {
  const req = mockRequest({ path: "/notfound" });
  const res = mockResponse();
  const served = server(req, res);
  expect(served).toStrictEqual(undefined);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledTimes(1);
});
