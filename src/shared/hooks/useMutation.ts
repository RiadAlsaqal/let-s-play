import {
  ApolloCache,
  DefaultContext,
  DocumentNode,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  TypedDocumentNode,
  useMutation as useApolloMutation,
} from "@apollo/client";
import { useHandleLoading } from "@src/shared/Loading";

export function useMutation<
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext, TCache>
): MutationTuple<TData, TVariables, TContext, TCache> {
  const result = useApolloMutation(mutation, options);
  const { handleLoading } = useHandleLoading();

  if (result[1].loading) {
    handleLoading?.(true);
  } else {
    handleLoading?.(false);
  }
  return result;
}

type TOptions<
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
> = MutationHookOptions<TData, TVariables, TContext, TCache>;

type TMutation<TData = any, TVariables = OperationVariables> =
  | DocumentNode
  | TypedDocumentNode<TData, TVariables>;

export type MutationTypes = {
  Mutation: TMutation;
  Options?: TOptions;
};
