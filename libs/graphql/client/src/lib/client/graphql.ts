import type { ApolloError, TypedDocumentNode } from "@apollo/client/core";

export type GQLReturnType<T extends TypedDocumentNode<any, any>> = NonNullable<ReturnType<NonNullable<T["__apiType"]>>>;

export type GQLInputType<T extends TypedDocumentNode<any, any>> = NonNullable<
  Parameters<NonNullable<T["__apiType"]>>[0]
>;

export type GQLOptions<T extends TypedDocumentNode<any, any>> = {
  onCompleted?: (data: GQLReturnType<T>) => void;
  onError?: (error: ApolloError) => void;
};
