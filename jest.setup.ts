import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
class MockHTTPService {
  public static getInstance(): MockHTTPService {
    return new MockHTTPService();
  }

  public async addCartItem(payload: any, token: string) {
    return Promise.resolve({ success: true });
  }
  public async login<T = any>(payload: object): Promise<T> {
    return Promise.resolve({ token: "kndan" } as any);
  }

  public async register<T = any>(payload: object): Promise<T> {
    return Promise.resolve({} as any);
  }

  public async getProducts<T = any>(): Promise<T> {
    return Promise.resolve([] as any);
  }

  public async editCartItem<T = any>(
    id: number,
    payload: object,
    token: string
  ): Promise<T> {
    return Promise.resolve({} as any);
  }

  public async deleteCartItem<T = any>(id: number, token: string): Promise<T> {
    return Promise.resolve({} as any);
  }

  public async getCart<T = any>(token: string): Promise<T> {
    return Promise.resolve({} as any);
  }
}

// jest.mock("../services/api", () => ({
//   getInstance: jest.fn(() => MockHTTPService.getInstance()),
// }));

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"));
