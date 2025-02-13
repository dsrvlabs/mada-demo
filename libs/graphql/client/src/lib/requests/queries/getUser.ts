import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const getUser = gql(/* GraphQL */ `
  query GetUser($input: UserInput!) {
    getUser(input: $input) {
      id
      address
      createdAt
      updatedAt
    }
  }
`);

export const useGetUser = (options?: GQLOptions<typeof getUser>) => {
  return useMutation(getUser, {
    ...options,
  });
};
