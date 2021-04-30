'use strict';

window.addEventListener('DOMContentLoaded', () => {
  setFooterPosition('#footer'); // запускаем функцию при старте страницы

  window.addEventListener('resize', () => {
    setFooterPosition('#footer'); // запускаем функцию при изменении размеров вьюпорта
  });

  function setFooterPosition(a) {
    const footer = document.querySelector(a), // находим footer
      heightViewport = document.documentElement.offsetHeight, //найти высоту вьюпорта
      widthViewport = document.documentElement.offsetWidth; //найти ширину вьюпорта

    /**объект со значениями смещения футера для разных экранов*/
    const obj = {
      tab: -76,
      mob: -60
    };

    let footerOffsetX;
    if (widthViewport >= 768 && heightViewport > 500) {
      footerOffsetX = heightViewport + obj.tab; // вычисление позиции footer относительно родителя
    } else {
      footerOffsetX = heightViewport + obj.mob;
    }

    //расположить footer на нужное кол-во пикселей выше низа вьюпорта
    if (widthViewport < 1260) {
      if (heightViewport <= 88) {
        // координаты для mob и tab
        footer.style.position = 'absolute';
        footer.style.top = `${footerOffsetX + 20}px`;
      } else {
        // координаты для mob и tab
        footer.style.position = 'absolute';
        footer.style.top = `${footerOffsetX}px`;
      }
    } else {
      // координаты для desk
      footer.style.position = 'fixed';
      footer.style.bottom = `0px`;
      footer.style.top = `auto`;
    }
  }
});
