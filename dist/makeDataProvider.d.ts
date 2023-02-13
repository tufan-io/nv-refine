import type { Client } from "urql";
import type { DataProvider, NounProviders, VerbProviders } from "./types";
/**
 * A simple router to appropriate resourceProviders
 * Each resource maps 1:1 to a "noun"
 * Verbs are defined at the API layer, with the inputs
 * binding them to appropriate noun(s).
 *
 */
export declare const makeDataProvider: (nounProviders: NounProviders, verbProviders: VerbProviders) => (client: Client, url: string) => Required<DataProvider>;
export default makeDataProvider;
//# sourceMappingURL=makeDataProvider.d.ts.map