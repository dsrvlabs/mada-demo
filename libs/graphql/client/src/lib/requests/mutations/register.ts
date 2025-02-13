import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const register = gql(/* GraphQL */ `
  mutation Register($input: UserInput!) {
    register(input: $input) {
      id
      address
      createdAt
      updatedAt
    }
  }
`);

export const useRegister = (options?: GQLOptions<typeof register>) => {
  return useMutation(register, {
    ...options,
  });
};
