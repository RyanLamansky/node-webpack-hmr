import {
  Request, Response,
} from "express";
import server from "./server";

const mockRequest = (req: Partial<Request>) => req as unknown as Request;

const mockResponse = () => {
  const res = {
    contentType: jest.fn(),
    send: jest.fn(),
    status: jest.fn(),
    write: jest.fn(),
  };
  res.contentType.mockReturnValue(res);
  res.send.mockReturnValue(res);
  res.status.mockReturnValue(res);
  res.write.mockReturnValue(true);
  return res;
};

test("`/` serves home page", () => {
  const req = mockRequest({ path: "/" });
  const res = mockResponse();
  const served = server(req, res as unknown as Response);
  expect(served).toStrictEqual(undefined);
  expect(res.status).toHaveBeenCalledTimes(0);
  expect(res.send).toHaveBeenCalledTimes(1);
});

test("`/notfound` serves 404", () => {
  const req = mockRequest({ path: "/notfound" });
  const res = mockResponse();
  const served = server(req, res as unknown as Response);
  expect(served).toStrictEqual(undefined);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledTimes(1);
});
