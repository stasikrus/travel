import { FilterType } from "../const";
import { isPointPast, isPointFuture } from "./point";

export const filter = {
    [FilterType.EVERYTHING]: (points) => points,
    [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.date_from)),
    [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.date_to)),
}