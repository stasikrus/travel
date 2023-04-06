const createTripCoast = (randomPoints) => {
    let totalCoast = 0;
    randomPoints.forEach(({base_price}) => totalCoast += base_price);
    return totalCoast;
};

export const createCoastTemplate = (randomPoints) => {
    return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${createTripCoast(randomPoints)}</span>
    </p>`
};