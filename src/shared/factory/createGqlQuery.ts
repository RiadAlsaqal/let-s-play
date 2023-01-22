import { DocumentNode, gql } from "@apollo/client";

export const createGqlQuery = (query: string) =>
  gql`
    ${query}
  `;
