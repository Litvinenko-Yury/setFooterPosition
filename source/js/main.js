'use strict';

window.addEventListener('DOMContentLoaded', () => {
  setFooterPosition('#footer'); // запускать функцию при старте страницы

  window.addEventListener('resize', () => {
    setFooterPosition('#footer'); // запускать функцию при изменении размеров вьюпорта
  });

  function setFooterPosition(a) {
    const footer = document.querySelector(a); // находим нужный элемент
    const heightViewport = document.documentElement.clientHeight; //найти высоту вьюпорта

    const b = -60; // на сколько смещать footer относительно низа вьюпорта
    let footerOffsetX = heightViewport + b; // вычисление позиции footer относительно родителя

    //расположить footer на нужное кол-во пикселей выше низа вьюпорта
    footer.style.position = 'absolute';
    footer.style.top = `${footerOffsetX}px`;
  }

  //При необходимости, можно добавить изменение footerOffsetX при изменении вертикальных padding и размера шрифта для desktop
});
