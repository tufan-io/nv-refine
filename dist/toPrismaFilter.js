"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrismaFilters = void 0;
const toPrismaFilters = (filters, caseInsensitive) => {
    const ignoreCase = caseInsensitive ? { mode: "insensitive" } : {};
    return filters.map((filter) => toPrismaFilter(filter, ignoreCase)).flat(1);
};
exports.toPrismaFilters = toPrismaFilters;
// https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
// https://refine.dev/docs/api-reference/core/interfaceReferences/#crudfilter
// https://refine.dev/docs/advanced-tutorials/data-provider/handling-filters/
const toPrismaFilter = (filter, ignoreCase) => {
    const { operator, value } = filter;
    const Field = (f) => f.field;
    const prismaFilter = {
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#equals
        eq: { [Field(filter)]: { equals: value } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#equals
        ne: { NOT: { [Field(filter)]: { equals: value } } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#lt
        lt: { [Field(filter)]: { lt: value } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#gt
        gt: { [Field(filter)]: { gt: value } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#lte
        lte: { [Field(filter)]: { lte: value } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#gte
        gte: { [Field(filter)]: { gte: value } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#in
        in: { [Field(filter)]: { in: value } },
        nin: { NOT: { [Field(filter)]: { in: value } } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#contains
        contains: { [Field(filter)]: Object.assign({ contains: value }, ignoreCase) },
        ncontains: {
            NOT: { [Field(filter)]: Object.assign({ contains: value }, ignoreCase) },
        },
        containss: { [Field(filter)]: { contains: value } },
        ncontainss: { NOT: { [Field(filter)]: { contains: value } } },
        between: [
            { [Field(filter)]: { lte: value[0] } },
            { [Field(filter)]: { gte: value[1] } },
        ],
        nbetween: {
            NOT: {
                between: [
                    { [Field(filter)]: { lte: value[0] } },
                    { [Field(filter)]: { gte: value[1] } },
                ],
            },
        },
        null: { [Field(filter)]: { equals: null } },
        nnull: { NOT: { [Field(filter)]: { equals: null } } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#startswith
        startswith: { [Field(filter)]: Object.assign({ startsWith: value }, ignoreCase) },
        nstartswith: {
            NOT: { [Field(filter)]: Object.assign({ startsWith: value }, ignoreCase) },
        },
        startswiths: { [Field(filter)]: { startsWith: value } },
        nstartswiths: { NOT: { [Field(filter)]: { startsWith: value } } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#endswith
        endswith: { [Field(filter)]: Object.assign({ endsWith: value }, ignoreCase) },
        nendswith: { NOT: { [Field(filter)]: Object.assign({ endsWith: value }, ignoreCase) } },
        endswiths: { [Field(filter)]: { endsWith: value } },
        nendswiths: { NOT: { [Field(filter)]: { endsWith: value } } },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#and
        and: {
            AND: value.map((item) => toPrismaFilter(item, ignoreCase)),
        },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#or
        or: {
            OR: value.map((item) => toPrismaFilter(item, ignoreCase)),
        },
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#not
        not: { NOT: toPrismaFilter(value, ignoreCase) },
    }[operator];
    return prismaFilter;
};
