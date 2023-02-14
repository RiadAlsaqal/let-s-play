import { createGqlQuery } from "@src/shared/factory";

export const AVAILABLE_ON_MAP = createGqlQuery(
  ` mutation changeSearchMap{
        changeSearchMap{
        
          message
          status
        }
      }
    `
);
