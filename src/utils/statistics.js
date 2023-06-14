import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';

export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByType = (points, type) => {
    return points.filter((point) => point.type === type).length;
};

export const countPointsByPrice = (points, type) => {
    return points.reduce((sum, point) => {
      if (point.type === type) {
        return sum + point.base_price;
      }
      return sum;
    }, 0);
};
  

export const calculateDurationByType = (points, type) => {
  const filteredPoints = points.filter(point => point.type === type);
  const totalDurationMs = filteredPoints.reduce((sum, point) => {
    const durationMs = dayjs(point.date_to).diff(dayjs(point.date_from));
    return sum + durationMs;
  }, 0);

  const duration = dayjs.duration(totalDurationMs);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${days}D ${hours}H ${minutes}M`;
};

export const calculateDurationByTypeMs = (points, type) => {
  const filteredPoints = points.filter(point => point.type === type);
  const totalDurationMs = filteredPoints.reduce((sum, point) => {
    const durationMs = dayjs(point.date_to).diff(dayjs(point.date_from));
    return sum + durationMs;
  }, 0);


  return totalDurationMs;
};