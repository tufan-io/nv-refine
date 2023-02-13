"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDataProvider = void 0;
/**
 * A simple router to appropriate resourceProviders
 * Each resource maps 1:1 to a "noun"
 * Verbs are defined at the API layer, with the inputs
 * binding them to appropriate noun(s).
 *
 */
const makeDataProvider = (nounProviders, verbProviders) => (client, url) => ({
    create: ({ resource, variables, metaData }) => {
        if (resource in nounProviders) {
            return nounProviders[resource].create({
                client,
                // TODO: is there a better way to do this?
                variables: variables,
                metaData,
            });
        }
        else {
            throw new Error(`Unknown resource requested: ${resource}`);
        }
    },
    createMany: ({ resource, variables, metaData }) => {
        if (resource in nounProviders) {
            if ("createMany" in nounProviders[resource]) {
                return nounProviders[resource].createMany({
                    client,
                    // TODO: is there a better way to do this?
                    variables: variables,
                    metaData,
                });
            }
        }
        throw new Error(`Unknown resource requested: ${resource}`);
    },
    // read methods
    getList: (_a) => {
        var { resource } = _a, rest = __rest(_a, ["resource"]);
        if (resource in nounProviders) {
            return nounProviders[resource].getList(Object.assign({ client }, rest));
        }
        else {
            throw new Error(`Unknown resource requested: ${resource}`);
        }
    },
    getMany: (_a) => {
        var { resource } = _a, rest = __rest(_a, ["resource"]);
        if (resource in nounProviders) {
            if ("getMany" in nounProviders[resource]) {
                return nounProviders[resource].getMany(Object.assign({ client }, rest));
            }
        }
        throw new Error(`Unknown resource requested: ${resource}`);
    },
    getOne: (_a) => {
        var { resource } = _a, rest = __rest(_a, ["resource"]);
        if (resource in nounProviders) {
            return nounProviders[resource].getOne(Object.assign({ client }, rest));
        }
        else {
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
                variables: variables,
                metaData,
            });
        }
        else {
            throw new Error(`Unknown resource requested: ${resource}`);
        }
    },
    updateMany: ({ resource, ids, variables, metaData }) => {
        if (resource in nounProviders) {
            if ("updateMane" in nounProviders[resource]) {
                return nounProviders[resource].updateMany({
                    client,
                    ids,
                    // TODO: is there a better way to do this?
                    variables: variables,
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
        }
        else {
            throw new Error(`Unknown resource requested: ${resource}`);
        }
    },
    deleteMany: (_a) => {
        var { resource } = _a, rest = __rest(_a, ["resource"]);
        if (resource in nounProviders) {
            if ("deleteMany" in nounProviders[resource]) {
                return nounProviders[resource].deleteMany(Object.assign({ client }, rest));
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
exports.makeDataProvider = makeDataProvider;
exports.default = exports.makeDataProvider;
