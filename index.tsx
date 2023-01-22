import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Navigator } from "./src/navigation";
import { SearchField } from "./src/shared/components";
import { gql } from "@apollo/client";
const QUERY = gql`
  query searchPlayer($playerName: String!) {
    serchPlayer {
      data(playerName: $playerName, withoutFriend: true) {
        edges {
          node {
            userId {
              firstName
              lastName
              pk
            }
          }
        }
      }
      message
      status
    }
  }
`;
export default function Index() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Text>aaa</Text>
      </SafeAreaView>
      <SearchField<"them", "aaa", { a: string }>
        query={{
          query: QUERY,
          queryOptions: { variables: { playerName: "Ln4" } },
        }}
        value=""
      >
        {({ node }) => {
          return <>{a}</>;
        }}
      </SearchField>
      {/* <Navigator /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "5%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

type TChildren<p2 extends string, T extends Object> = (props: {
  node: {
    [key in p2]: T;
  };
}) => React.ReactElement;
