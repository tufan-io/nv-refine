import type { Client } from "urql";
import type { DataProvider, NounProviders, VerbProviders } from "./types";

// MakeDataProvider initializes the noun & verb providers
export type MakeDataProvider = (
  nounProviders: NounProviders,
  verbProviders: VerbProviders
) => InstantiateDataProvider;

// InstantiateDataProvider binds the data provider to a urql instance with URL.
// this is done in the client (typically via env vars), as a last step before
// the dataProvider is usable by refine.
export type InstantiateDataProvider = (
  client: Client,
  url: string
) => Required<DataProvider>;

/**
 * A simple router to appropriate resourceProviders
 * Each resource maps 1:1 to a "noun"
 * Verbs are defined at the API layer, with the inputs
 * binding them to appropriate noun(s).
 *
 */
export const makeDataProvider: MakeDataProvider =
  (nounProviders: NounProviders, verbProviders: VerbProviders) =>
  (client: Client, url: string): Required<DataProvider> => ({
    create: ({ resource, variables, metaData }) => {
      if (resource in nounProviders) {
        return nounProviders[resource].create({
          client,
          // TODO: is there a better way to do this?
          variables: variables as unknown as any,
          metaData,
        });
      } else {
        throw new Error(`Unknown resource requested: ${resource}`);
      }
    },
    createMany: ({ resource, variables, metaData }) => {
      if (resource in nounProviders) {
        if ("createMany" in nounProviders[resource]) {
          return nounProviders[resource].createMany!({
            client,
            // TODO: is there a better way to do this?
            variables: variables as unknown as any,
            metaData,
          });
        }
      }
      throw new Error(`Unknown resource requested: ${resource}`);
    },

    // read methods
    getList: ({ resource, ...rest }) => {
      if (resource in nounProviders) {
        return nounProviders[resource].getList({
          client,
          ...rest,
        });
      } else {
        throw new Error(`Unknown resource requested: ${resource}`);
      }
    },
    getMany: ({ resource, ...rest }) => {
      if (resource in nounProviders) {
        if ("getMany" in nounProviders[resource]) {
          return nounProviders[resource].getMany!({ client, ...rest });
        }
      }
      throw new Error(`Unknown resource requested: ${resource}`);
    },
    getOne: ({ resource, ...rest }) => {
      if (resource in nounProviders) {
        return nounProviders[resource].getOne({ client, ...rest });
      } else {
        throw new Error(`Unknown resource requested: ${resource}`);
      }
    },

    // update methods
    update: ({ resource, id, variables, metaData }) => {
      if (resource in nounProviders) {
        return nounProviders[resource].update({
          client,
          id,
          // TODO: is there a better way to do this?
          variables: variables as unknown as any,
          metaData,
        });
      } else {
        throw new Error(`Unknown resource requested: ${resource}`);
      }
    },
    updateMany: ({ resource, ids, variables, metaData }) => {
      if (resource in nounProviders) {
        if ("updateMane" in nounProviders[resource]) {
          return nounProviders[resource].updateMany!({
            client,
            ids,
            // TODO: is there a better way to do this?
            variables: variables as unknown as any,
            metaData,
          });
        }
      }
      throw new Error(`Unknown resource requested: ${resource}`);
    },

    // delete methods
    deleteOne: ({ resource, variables, metaData }) => {
      if (resource in nounProviders) {
        return nounProviders[resource].deleteOne({
          client,
          variables,
          metaData,
        });
      } else {
        throw new Error(`Unknown resource requested: ${resource}`);
      }
    },
    deleteMany: ({ resource, ...rest }) => {
      if (resource in nounProviders) {
        if ("deleteMany" in nounProviders[resource]) {
          return nounProviders[resource].deleteMany!({ client, ...rest });
        }
      }
      throw new Error(`Unknown resource requested: ${resource}`);
    },
    getApiUrl: () => url,
    custom: (params) => {
      throw new Error(`Custom method not supported`);
    },
    // all custom verbs that are requested will show up here.
    verb: verbProviders,
  });

export default makeDataProvider;
