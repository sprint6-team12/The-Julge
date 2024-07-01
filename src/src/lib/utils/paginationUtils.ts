/**
 * 여기서 적용해본 문법의 의도는 paginationUtils.totalPages()에서 괄호를 제거하려는 시도입니다.
 * 데이터와 함수를 객체로 만들어서 다루는 방법에 대해 우리팀의 시도에 영감을 받았습니다.
 *
 * getter와 setter는 JavaScript의 문법입니다.
 * getter는 객체의 특정 속성에 접근할 때마다 실행되는 메서드를 정의할 수 있게 해줍니다.
 * setter는 객체의 특정 속성에 값을 할당할 때마다 실행되는 메서드를 정의할 수 있게 해줍니다.
 * 이를 통해 속성을 계산된 값으로 정의하거나,
 * 속성에 접근하거나 값을 설정할 때마다 특정 동작을 수행할 수 있습니다.
 */

type PaginationValues = {
  count?: number;
  limit?: number;
  offset?: number;
};

type PaginationUtilsType = {
  _count: number;
  _limit: number;
  _offset: number;
  set setValues(values: PaginationValues);
  readonly totalPages: number;
  readonly pageRange: number;
  readonly currentPage: number;
};
const paginationUtils: PaginationUtilsType = {
  _count: 0,
  _limit: 10,
  _offset: 0,

  set setValues({ count, limit, offset }: PaginationValues) {
    count !== undefined && (this._count = count);
    limit !== undefined && (this._limit = limit);
    offset !== undefined && (this._offset = offset);
  },

  get totalPages() {
    return Math.ceil(this._count / this._limit);
  },

  get pageRange() {
    return this.totalPages < 7 ? this.totalPages : 7;
  },

  get currentPage() {
    return Math.floor(this._offset / this._limit) + 1;
  },
};

export default paginationUtils;
