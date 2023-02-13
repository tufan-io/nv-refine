import type { BaseKey, BaseRecord } from "@pankod/refine-core";
import { AnyVariables } from "urql";
import { NounGql, ResourceProvider } from "./types";
type getPkFn = <Resource extends BaseRecord>(resource: Resource) => BaseKey;
type whereFn = (id: string | number) => {
    [k: string]: unknown;
};
export declare const makeResourceProvider: <$Resource extends BaseRecord, $ResourceUncheckedCreateInput extends AnyVariables, $ResourceCreateManyInput extends AnyVariables, $ResourceUncheckedUpdateInput extends AnyVariables, $ResourceUncheckedUpdateManyInput extends AnyVariables, $ResourceWhereUniqueInput extends AnyVariables>({ caseInsensitive, getPk, where, nounGql, }: {
    caseInsensitive: boolean;
    getPk: getPkFn;
    where: whereFn;
    nounGql: NounGql;
}) => ResourceProvider<$Resource, $ResourceUncheckedCreateInput, $ResourceCreateManyInput, $ResourceUncheckedUpdateInput, $ResourceUncheckedUpdateManyInput, $ResourceWhereUniqueInput>;
export default makeResourceProvider;
//# sourceMappingURL=makeResourceProvider.d.ts.map