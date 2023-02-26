import {
  DocumentNode,
  LazyQueryHookOptions,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";

export type TQuery = {
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>;
  queryOptions?: LazyQueryHookOptions;
};
