export class PaginationResponseDto {
    constructor(currentPage = 1, pageSize = 50, total = 0, data = []) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.total = total;
        this.data = data;
    }

    currentPage: number;
    pageSize: number;
    total: number;
    data: any[];
}
