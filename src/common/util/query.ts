/** @format */

const ORDERBY_REGEX = /^\w+(:(asc|desc))?$/i;
const FILTER_REGEX = /(\w+):(eq|gt|ne|ge|lt|le):([a-zA-Z0-9-.\s,']+)/i;
const IS_STRING_REGEX = /^'.*'$/;

export const parseOrderByQueryParams = (orderByQueryParamString: string | undefined) => {
  if (orderByQueryParamString?.trim().length) {
    let orderByQueryParams = orderByQueryParamString
      .split(',')
      .map(each => each.replace(/\s/g, ''))
      .filter(each => each.length !== 0);

    const allMatch = orderByQueryParams.every(each => ORDERBY_REGEX.test(each));

    if (allMatch) {
      orderByQueryParams = orderByQueryParams.map(each => {
        each = each.trim();
        each = each[0].toUpperCase() + each.substring(1);
        each = each.replace(/:/g, ' ');
        return each;
      });
      return orderByQueryParams;
    }

    throw new Error(
      `Incorrect orderBy query param passed : ${orderByQueryParamString}. Expected format: <Attribute>:(asc|desc)`,
    );
  }
  return [];
};

export const parseFilterQueryParams = (filterQueryParamString: string | undefined) => {
  if (filterQueryParamString?.trim().length) {
    let filterQueryParams = filterQueryParamString
      .split(',')
      .map(each => each.trim())
      .filter(each => each.length !== 0);

    const allMatch = filterQueryParams.every(each => FILTER_REGEX.test(each));

    if (allMatch) {
      const result = filterQueryParams.map(queryParam => {
        queryParam = queryParam[0].toUpperCase() + queryParam.substring(1);
        queryParam.match(FILTER_REGEX);
        const attribute = RegExp.$1;
        const operator = RegExp.$2;
        const comparisonValue = RegExp.$3;
        if (IS_STRING_REGEX.test(comparisonValue)) {
          const extractedValue = comparisonValue.substring(1, comparisonValue.length - 1);
          return { [attribute]: { [operator]: extractedValue } };
        } else {
          return { [attribute]: { [operator]: Number(comparisonValue) } };
        }
      });
      return result;
    }

    throw new Error(`Incorrect filter query param passed : ${filterQueryParamString}. Expected format: <Attribute>:<operator>:<value>\n
  Operators currently supported eq, ne, gt, ge, lt, le`);
  }
  return [];
};
