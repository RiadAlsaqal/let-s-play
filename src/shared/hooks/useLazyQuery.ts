import {
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResultTuple,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useLazyQuery as useApolloLazyQuery,
} from "@apollo/client";
import { useHandleLoading } from "@src/shared/Loading";

export function useLazyQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: LazyQueryHookOptions<TData, TVariables>
): LazyQueryResultTuple<TData, TVariables> {
  const result = useApolloLazyQuery(query, options);
  const { handleLoading } = useHandleLoading();

  if (result[1].loading) {
    handleLoading?.(true);
  } else {
    handleLoading?.(false);
  }
  return result;
}
