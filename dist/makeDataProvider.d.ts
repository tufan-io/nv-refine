import type { Client } from "urql";
import type { DataProvider, NounProviders, VerbProviders } from "./types";
export type MakeDataProvider = (nounProviders: NounProviders, verbProviders: VerbProviders) => InstantiateDataProvider;
export type InstantiateDataProvider = (client: Client, url: string) => Required<DataProvider>;
/**
 * A simple router to appropriate resourceProviders
 * Each resource maps 1:1 to a "noun"
 * Verbs are defined at the API layer, with the inputs
 * binding them to appropriate noun(s).
 *
 */
export declare const makeDataProvider: MakeDataProvider;
export default makeDataProvider;
//# sourceMappingURL=makeDataProvider.d.ts.map