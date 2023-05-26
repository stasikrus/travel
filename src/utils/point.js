import dayjs from "dayjs";

export const isPointPast = (inputDate) => {
    const currentDate = dayjs();
    const providedDate = dayjs(inputDate);
  
    if (providedDate.isSame(currentDate, 'day')) {
      return false;
    } else if (providedDate.isAfter(currentDate)) {
      return false;
    } else {
      return true;
    }
}

export const isPointFuture = (inputDate) => {
    const currentDate = dayjs();
    const providedDate = dayjs(inputDate);
  
    if (providedDate.isSame(currentDate, 'day')) {
      return false;
    } else if (providedDate.isAfter(currentDate)) {
      return true;
    } 
}