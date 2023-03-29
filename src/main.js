import { createSiteMenuTemplate } from "./view/site-menu.js";

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteHeadElement = document.querySelector('.page-header');
const siteHeaderElement = siteHeadElement.querySelector('.trip-controls__navigation');

render(siteHeaderElement, createSiteMenuTemplate(), 'beforeend');