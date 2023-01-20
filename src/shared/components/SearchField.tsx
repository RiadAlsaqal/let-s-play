import React, { useState } from "react";
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
  const [Search, { called, data, loading }] = useLazyQuery(props.query);
  const [data1, setData1] = useState("");
  const onChangeSearch = (query: string) => {
    setData1(query);
  };
  const { handleDebounce } = useDebouncer({
    callback: onChangeSearch,
    time: 2000,
  });

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(e) => {
          setSearchQuery(e);
          handleDebounce(e);
        }}
        {...props}
        value={searchQuery}
        theme={props.theme}
      />

      <View style={{ backgroundColor: "yellow", width: "100%" }}>
        <Text>{data1}</Text>
      </View>
    </>
  );
};

export const SearchField = withTheme(Search);

type TQuery = DocumentNode | TypedDocumentNode<any, OperationVariables>;
