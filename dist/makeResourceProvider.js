"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResourceProvider = void 0;
const toPrismaFilter_1 = require("./toPrismaFilter");
const makeResourceProvider = ({ caseInsensitive, getPk = (resource) => resource.id, where = (id) => ({ id }), nounGql, }) => {
    const $ResourceProvider = {
        // Create methods //////////////////////////////////////////////////
        create: ({ client, variables }) => __awaiter(void 0, void 0, void 0, function* () {
            return client
                .mutation(nounGql.create, variables)
                .toPromise()
                .then((result) => (Object.assign({ 
                // ensure the id field is explicitly set for Refine.
                id: getPk(result.data) }, result.data)));
        }),
        createMany: ({ client, variables }) => __awaiter(void 0, void 0, void 0, function* () {
            return client
                .mutation(nounGql.createMany, {
                data: variables,
            })
                .toPromise()
                .then((result) => (Object.assign({ 
                // ensure the id field is explicitly set for Refine.
                id: getPk(result.data) }, result.data)));
        }),
        // Read methods //////////////////////////////////////////////////
        getList: ({ client, pagination, hasPagination, sort, filters,
        // dataProviderName,
         }) => __awaiter(void 0, void 0, void 0, function* () {
            return client
                .query(nounGql.getList, {
                skip: pagination === null || pagination === void 0 ? void 0 : pagination.current,
                take: pagination === null || pagination === void 0 ? void 0 : pagination.pageSize,
                // order = "asc" | "desc" in both refine and prisma
                orderBy: sort === null || sort === void 0 ? void 0 : sort.map(({ field, order }) => ({ field: order })),
                where: (0, toPrismaFilter_1.toPrismaFilters)(filters, caseInsensitive),
            })
                .toPromise()
                .then((result) => {
                const id = result.data.id;
                return Object.assign({ id }, result.data);
            });
        }),
        getMany: ({ client, ids }) => __awaiter(void 0, void 0, void 0, function* () {
            return client
                .query(nounGql.getMany, {
                where: {
                    OR: ids.map((id) => where(id)),
                },
            })
                .toPromise()
                .then((result) => {
                return {
                    data: result.data.map((resource) => (Object.assign({ id: getPk(resource) }, result.data))),
                };
            });
        }),
        getOne: ({ client, id }) => __awaiter(void 0, void 0, void 0, function* () {
            return client
                .query(nounGql.getOne, {
                where: where(id),
            })
                .toPromise()
                .then((result) => {
                return {
                    data: Object.assign({ id: getPk(result.data) }, result.data),
                };
            });
        }),
        // Update methods //////////////////////////////////////////////////
        update: ({ client, id, variables }) => __awaiter(void 0, void 0, void 0, function* () {
            return client
                .mutation(nounGql.update, {
                data: variables,
                where: {
                    id, // TODO: replace $pk with primary key
                },
            })
                .toPromise()
                .then((result) => {
                const id = getPk(result.data);
                return Object.assign({ id }, result.data);
            });
        }),
        updateMany: ({ client, ids, variables, metaData }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const result = yield client
                .mutation(nounGql.updateMany, {
                where: {
                    OR: ids.map((id) => where(id)),
                },
                data: {
                    relationalMany: variables,
                },
            })
                .toPromise();
            return $ResourceProvider.getMany && ((_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0 > 0)
                ? // prisma does not return the updated objects.
                    // we need to make a second call to fetch these.
                    $ResourceProvider.getMany({ client, ids, metaData })
                : { data: [] };
        }),
        // Delete methods //////////////////////////////////////////////////
        deleteOne: ({ client, variables }) => __awaiter(void 0, void 0, void 0, function* () {
            return client
                .mutation(nounGql.deleteOne, variables)
                .toPromise()
                .then((result) => {
                const id = getPk(result.data);
                return {
                    data: Object.assign({ id }, result.data),
                };
            });
        }),
        deleteMany: ({ client, ids, metaData }) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            const result = yield client
                .mutation(nounGql.deleteMany, {
                where: {
                    OR: ids.map((id) => where(id)),
                },
            })
                .toPromise();
            return $ResourceProvider.getMany && ((_d = (_c = result.data) === null || _c === void 0 ? void 0 : _c.count) !== null && _d !== void 0 ? _d : 0 > 0)
                ? // prisma does not return the deleted objects.
                    // we need to make a second call to fetch these.
                    $ResourceProvider.getMany({ client, ids, metaData })
                : { data: [] };
        }),
    };
    return $ResourceProvider;
};
exports.makeResourceProvider = makeResourceProvider;
exports.default = exports.makeResourceProvider;
