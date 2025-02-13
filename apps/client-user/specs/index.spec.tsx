import { render } from "@testing-library/react";
import { useRouter } from "next/router";
import React from "react";
import Index from "../src/pages/index";

// next/router를 모킹합니다.
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Index", () => {
  it("should render successfully", () => {
    // useRouter를 모킹된 함수로 설정합니다.
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    }));

    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
