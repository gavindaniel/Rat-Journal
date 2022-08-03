# Rat Journal

Rat Journal is a website for helping players of the game *Escape from Tarkov* keep track of items they need for quests and the hideout.

## How It Works

In order to keep the project ad-free and light-weight, all data storage happens locally in the browser using [IndexedDB]. This unfortunately means a couple of things:

* The website will not function in a private browser unless data storage for the site is enabled by the user.
* There is no cross-browser support, meaning if you open the website on a different device or in a different browser, the data will not carry over. 
* If the user clears their browser history/data, then the user data will be lost and a fresh website will be loaded.

[IndexedDB]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

