# TaDa - простая тудушница

_Вероника Заярная_

**Стек**: React + TS + Vite + Vitest

Запуск dev-режима командой `npm i && npm run start`

Посмотреть рабочее приложение можно здесь https://zayarnaya.github.io/todo/

Основной функционал (добавление, редактирование, удаление, отметка, удаление всех сделанных) и фильтры протестированы

Простое приложение для записи тудушек. Ограничение на тудушку - 300 знаков. Приложение годно:

- добавить тудушку
- редактировать добавленную тудушку
- удалить тудушку
- отметить тудушку как сделанную
- удалить все сделанные тудушки
- поменять приоритет тудушки (передвинуть вверх или вниз по списку)

Фильтры:

- все тудушки
- активные (не сделанные) тудушки
- сделанные тудушки

Сортировка (восходящая):

- по приоритету
- по времени добавления

Еще приложение умеет:

- менять локализацию (русский - английский) - сами тудушки не переводятся )
- менять тему (есть светлая и темная)
- пагинацию (ограничение 5 тудушек на страницу)
- хранить тудушки в localStorage и при загрузке брать оттуда
- на самый всякий случай есть кнопка "Delete All", которая заодно чистит localStorage
