import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery as useApolloQuery,
} from "@apollo/client";
import { useHandleLoading } from "@src/shared/Loading";

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  const result = useApolloQuery(query, options);
  const { handleLoading } = useHandleLoading();

  if (result.loading) {
    handleLoading?.(true);
  } else {
    handleLoading?.(false);
  }
  return result;
}

export type QueryTypes<TData = any, TVariables = OperationVariables> = {
  query: TQuery<TData, TVariables>;
  options?: TOptions<TData, TVariables>;
};

type TQuery<TData = any, TVariables = OperationVariables> =
  | DocumentNode
  | TypedDocumentNode<TData, TVariables>;

type TOptions<TData = any, TVariables = OperationVariables> = QueryHookOptions<
  TData,
  TVariables
>;
