export interface IPagination <T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T[];
}

export class Pagination<T> implements IPagination<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T[] = [];
}
