# Solving an open transport problem / Музичний плеєр

[🇺🇸 English](#english-version) | [🇺🇦 Українська](#українська-версія)

---

## English Version

This is a small web application that was created to replicate the control and appearance of almost any music player _(with a couple of tweaks)_. The [Dropbox] service (www.dropbox.com) was used as a database for music.
Also, **it is important to note** that this web application was developed for educational purposes, but not for the purpose of commercialization or infringement of musical works.

### Main functions

- Ability to upload music files from Dropbox to the external part (to the website itself).
- The ability to add files from a computer to Dropbox using the interface of the music player itself.
- Ability to pause, skip to the next or previous track, as well as the ability to “repeat a specific track”.
- Delete an already added track from the list of downloaded music.
- Use the equalizer (more like a decoration than an analysis of audio files and their tone).

### Known issues

- The most obvious problem is the inability to use it directly. Only developers will be able to test the web application (or ordinary users who delve a little deeper into the topic of tokens). This problem can be fixed very easily: use a normal relational database (for example, SQLite).
- The basic “rewind” option is poorly implemented (has bugs).

---

## Українська версія

Це невеликий веб-додаток, який було створено з метою повторити управління, зовнішній вигляд практично будь-якого музичного плеєра _(з додаванням парочки фішок)_. Як базу даних для музичних творів було використано сервіс [Dropbox](www.dropbox.com).
Також, **важливо зазначити**, що цей веб-додаток розроблявся з метою навчання, але ніяк не з метою комерції або порушення прав музичних творів.

### Основні функції

- Можливість завантажувати музичні файли з Dropbox на зовнішню частину (на сам сайт).
- Можливість додавати файли з комп'ютера в Dropbox за допомогою інтерфейсу самого музичного плеєра.
- Можливість ставити на паузу, перемикати на наступний або попередній трек, а також можливість «повторювати певний трек».
- Видаляти вже доданий трек з листа завантаженої музики.
- Використання еквалайзера (більше як декорація, аніж аналіз аудіофайлів та їхньої тональності).

### Відомі проблеми

- Найочевидніша проблема - це неможливість користуватися напряму. Лише розробники зможуть протестувати веб-додаток (або ж звичайні користувачі, які трохи заглибляться в тему токенів). Проблему цю можна виправити дуже просто: використовувати нормальну реляційну базу даних (наприклад SQLite).
- Базова опція «перемотування» - погано реалізована (має баги).
