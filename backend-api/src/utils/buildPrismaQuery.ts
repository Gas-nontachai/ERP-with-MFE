export type QueryParams = {
  search?: string;
  skip?: string | number;
  take?: string | number;
  sortBy?: string;
  order?: "asc" | "desc";
  [key: string]: any; // อนุญาตให้ใส่ field เพิ่ม
};

export function buildPrismaQuery(params: QueryParams) {
  const { search, skip, take, sortBy, order, ...filters } = params;

  // Convert string to number safely
  const safeNumber = (val: string | number | undefined): number | undefined => {
    if (val === undefined) return undefined;
    const n = typeof val === "string" ? parseInt(val) : val;
    return isNaN(n) ? undefined : n;
  };

  const prismaQuery: {
    where?: Record<string, any>;
    skip?: number;
    take?: number;
    orderBy?: Record<string, "asc" | "desc">;
  } = {};

  // WHERE
  if (Object.keys(filters).length > 0) {
    prismaQuery.where = {};
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== "") {
        prismaQuery.where[key] = filters[key];
      }
    }
  }

  // Search (ถ้าอยากใส่แบบ contains หลาย field)
  if (search) {
    prismaQuery.where = {
      ...prismaQuery.where,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        // เพิ่ม field ที่จะค้นหา
      ],
    };
  }

  // Pagination
  if (safeNumber(skip) !== undefined) prismaQuery.skip = safeNumber(skip);
  if (safeNumber(take) !== undefined) prismaQuery.take = safeNumber(take);

  // Order
  if (sortBy && (order === "asc" || order === "desc")) {
    prismaQuery.orderBy = {
      [sortBy]: order,
    };
  }

  return prismaQuery;
}
