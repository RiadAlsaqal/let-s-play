import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Searchbar, SearchbarProps, useTheme } from "react-native-paper";
import { TResponse, tStatePlayer } from "../types";
import { useDebouncer, useLazyQuery } from "../hooks";
import { TQuery } from "@src/shared/types";
const Search = <
  QueryPath1 extends string,
  QueryPath2 extends string,
  TData extends Object
>(
  props: TSearch<QueryPath2, TData>
) => {
  const [search, { called, data, loading }] = useLazyQuery<
    TResponse<QueryPath1, QueryPath2, TData>
  >(props.query.query, props.query.queryOptions);
  const onChangeSearch = (query: string) => {
    search();
  };
  const { handleDebounce } = useDebouncer({
    callback: onChangeSearch,
    time: 2000,
  });
  const theme = useTheme();
  let dataKey = Object.keys(data ?? {})[0] as QueryPath1;
  const children = props.children as TChildren;
  return (
    <>
      <Searchbar
        placeholder="Search"
        {...props}
        onChangeText={(e) => {
          props.onChangeText?.(e);
          handleDebounce(e);
        }}
        children={undefined}
        value={props.value}
        theme={theme}
      />

      <ScrollView style={{ width: "100%" }}>
        {data?.[dataKey]?.data?.edges.map((e) => children(e))}
      </ScrollView>
    </>
  );
};

export const SearchField = Search;

type TSearch<QueryPath2 extends string, TData> = Omit<
  SearchbarProps,
  "children" | "theme"
> & {
  query: TQuery;
  children: TChildren;
};

type TChildren = (props: {
  node: {
    state: tStatePlayer;
    pkPlayer: number;
    userId: {
      firstName: string;
      lastName: string;
    };
  };
}) => React.ReactNode;
