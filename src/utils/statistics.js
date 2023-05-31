export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByType = (points, type) => {
    return points.filter((point) => point.type.type === type).length;
};

export const countPointsByPrice = (points, type) => {
    return points.reduce((sum, point) => {
      if (point.type.type === type) {
        return sum + point.base_price;
      }
      return sum;
    }, 0);
  };
  