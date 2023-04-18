import AbstractView from "./abstract";

const createTripTemplate = () => {
    return `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <!-- Сортировка -->

    <!-- Контент -->
    </section>`
}

export default class Trip extends AbstractView {
    getTemplate() {
        return createTripTemplate();
    }
};