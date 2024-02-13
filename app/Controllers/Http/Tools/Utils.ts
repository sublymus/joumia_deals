export function paginate<T extends {page:number|undefined,limit:number|undefined}> (paginable : T): T & {page:number,limit:number}{
    let {page ,limit} = paginable;
    if (page && page < 1) throw new Error(" page must be between [1 ,n] ");
    if (limit && limit < 1) throw new Error(" limit must be between [1 ,n] ");

    page = page ?? 1;
    limit = limit ?? 25;

    return {
        ...paginable,
        limit,
        page
    }

}
