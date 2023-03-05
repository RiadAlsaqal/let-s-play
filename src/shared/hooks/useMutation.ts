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
import { useErrorBoundry } from "@src/shared/ErrorBoundry";
import { toPairs } from "lodash";
import React from "react";
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
  const [status, setStatus] = React.useState(false);
  const { handleLoading } = useHandleLoading();
  const setMessage = useErrorBoundry();
  const Networkstatus = toPairs(
    toPairs(result[1].data!)[0]?.[1] as {}
  )[1]?.[1] as number;
  const errorMessage = toPairs(
    toPairs(result[1].data!)[0]?.[1] as {}
  )[0]?.[1] as string;

  if (result[1].loading) {
    console.log("lolol");
    handleLoading?.(true);
    !status && setStatus(true);
  }
  if (Networkstatus < 300) {
    status && setStatus(false);

    !!status && setMessage?.("done");
  }
  if (Networkstatus > 300) {
    status && setStatus(false);

    !!status && setMessage?.(errorMessage);
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
