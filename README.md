# Frontend Mentor - Tic Tac Toe solution

This is a solution to the [Tic Tac Toe challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the game either solo vs the computer or multiplayer against another person
- **Bonus 1**: Save the game state in the browser so that it’s preserved if the player refreshes their browser
- **Bonus 2**: Instead of having the computer randomly make their moves, try making it clever so it’s proactive in blocking your moves and trying to win

### Links

- Solution URL: [https://github.com/skhbabez/TIC-TAC-TOE](https://github.com/skhbabez/TIC-TAC-TOE)
- Live Site URL: [https://skhbabez.github.io/TIC-TAC-TOE/](https://skhbabez.github.io/TIC-TAC-TOE/)

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Storybook](https://storybook.js.org/) - JS library
- [Typescript](https://www.typescriptlang.org/)
- [clsx](https://github.com/lukeed/clsx#readme) - JS library
- [vite](https://vite.dev/)
- [Tailwind](https://tailwindcss.com/)

### What I learned

I used this project to finally dive back into tailwind. I was especially interested in creating my own theme and exploring some of the more complex features it offers. I was impressed how simple it was to inject my own design tokens into the framework and how it generates utilities on the fly.

```css
@theme {
  /* colors */
  --color-*: initial;
  --color-black: #000000;
  --color-dark-navy: #1a2a33;
  --color-dark-navy-b: #10212a;
  --color-semi-dark-navy: #1f3641;
  /* omitted code for brevity */
}
```

I also used this project to explore reducers in react. While this was not strictly necessary, it seemed liek a good opportunity to see a reducer in action. This also allowed me to play around with discriminated unions in typescript more.

```tsx
interface StartAction {
  type: "START";
  vsCpu: boolean;
}

interface MarkerAction {
  type: "MARKER";
  marker: Marker;
}

type GameAction =
  | StartAction
  | MarkerAction
  | TickAction
  | RestartAction
  | QuitAction
  | NextRoundAction;

const reducer = (gameState: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START":
      return {
        ...gameState,
        status: "running",
        vsCpu: action.vsCpu,
      };
    case "MARKER":
      return {
        ...gameState,
        marker: action.marker,
      };
    /* omitted code */
  }
};
```

I implemented a minimax algorithm for the cpu, trying to make the cpu unbeatable. This took some tinkering, especially making sure it feels human as the algorithm endorced soem predictable play patterns. I solved this, by selecting among equally rated moved randomly.

```ts
//...
  if (curPlayer === maxPlayer) {
    let max = -Infinity;
    for (const idx of emptyTiles) {
      if (tiles[idx] === null) {
        const newTiles = [...tiles];
        newTiles[idx] = curPlayer;
        max = Math.max(
          minimax(maxPlayer, nextPlayer, newTiles, depth + 1),
          max
        );
      }
    }
    return max;
  } else
//...
```

For the dialogs, I decided to wrap the logic in its own component. At first I used useRef directly in my game Component, one for each Dialog. Creating a resuable Component, which also uses showModal() for accessibility.

```tsx
const Dialog = ({ show, children, className, ...props }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !show) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && show) {
      dialogRef.current?.showModal();
    }
  }, [show]);
  /* code omitted*/
};
```

### Continued development

In the future, I need to stop taking the Figma file so literally. While this was good practice for Tailwind, forcing me to dive deeper into the framework to understand how to work beyond its constraints, it slowed me down a lot. In the future, I’ll use sensible values if the design file isn’t.

### Useful resources

- [Technische Universität Berlin](https://wiki.neuro.tu-berlin.de/en/home/teaching/2024ws-AlgoDat-SE/algorithms/minimax) - Source I used to understand and implement the minimax algorithm.
- [Stackoverflow Dialog Component](https://stackoverflow.com/questions/76567184/html-dialog-element-in-react-js) - I used this as a base to implement my Dialog Component.
