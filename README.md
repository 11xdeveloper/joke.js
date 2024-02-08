<div align="center">
  <a href="https://github.com/11xdeveloper/jokejs#readme">
    <img alt="🤣 chucklejs" src="https://i.imgur.com/6Mxp81A.png" height="150px" />
  </a>
</div>

<br/>

<div align="center">
  <strong>As you can tell, we can't afford a logo designer (Yes, that's Comic Sans 🤣)</strong>
  <br />
  <a href="https://www.npmjs.com/package/chucklejs">
    <img src="https://img.shields.io/npm/dw/chucklejs" alt="Downloads: /week">
  </a>
  <a href="https://bundlephobia.com/package/chucklejs">
    <img src="https://img.shields.io/bundlephobia/minzip/chucklejs" alt="bundle size">
  </a>
  <img src="https://img.shields.io/badge/module%20formats-cjs,%20esm-green" alt="module formats: cjs, esm">
</div>

---

## Installation

Use the `install` command of your favourite package manager!

e.g.

```bash
npm install chucklejs
```

---

## Usage

Simply import which ever utilities you would like to use

e.g.

```ts
import { getJoke } from "chucklejs";

try {
  console.log(
    await getJoke(["Programming", "Dark", "Pun"], {
      blacklistFlags: ["nsfw", "racist", "explicit"],
      types: ["twopart"],
    })
    /*  [
            {
                category: "Programming",
                type: "twopart",
                setup: "why do python programmers wear glasses?",
                delivery: "Because they can't C.", 🤣🤣🤣
            }
        ]
    */
    ]
  );
} catch (error) {
  /* Error Handling */
}
```

---

## Docs

```ts
function getJoke(
  categories: Category[] | undefined,
  { blacklistFlags, amount, language, contains, types }: Options
): Promise<
  (
    | {
        category: Category;
        type: "single";
        joke: string;
      }
    | {
        category: Category;
        type: "twopart";
        setup: string;
        delivery: string;
      }
  )[]
>;
```
