import React from "react";
import { View } from "react-native";
import { Searchbar, SearchbarProps, Text, useTheme } from "react-native-paper";
import { withTheme } from "../HOC";
import { useDebouncer } from "../hooks";
import {
  DocumentNode,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery,
} from "@apollo/client";
const Search = (props: Omit<SearchbarProps, "value"> & { query: TQuery }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState("");
  const [] = useLazyQuery(props.query);
  const debouncer = useDebouncer();
  const onChangeSearch = (query: string) => {
    setData(query);
  };
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(e) => {
          setSearchQuery(e);
          debouncer(onChangeSearch, 2000)(e);
        }}
        {...props}
        value={searchQuery}
        theme={props.theme}
      />
      {data && (
        <View style={{ backgroundColor: "yellow", width: "100%" }}>
          <Text>{data}</Text>
        </View>
      )}
    </>
  );
};

export const SearchField = withTheme(Search);

type TQuery = DocumentNode | TypedDocumentNode<any, OperationVariables>;
