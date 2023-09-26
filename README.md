# Pixi JS FPS Counter

This counter works well with Pixi JS v.7. `PixiFpsCounter` class extends basic PixiJS `Container` class. Thus, it has
all the properties that `Container` class has. E.g., you can alter its `alpha`, `position` properties the same way you
do with your `DisplayObject`s.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Usage with options](#usage-with-options)

## Installation

```bash
npm install pixi-fps-counter
```

## Usage

The only required argument you should pass to `PixiFpsCounter` constructor is a `Ticker`:

```typescript
import { PixiFpsCounter } from 'pixi-fps-counter';

const counter = new PixiFpsCounter(pixiApp.ticker);
pixiApp.stage.addChild(counter);
```

## Usage with options

Pass `options` object as a second argument if you need to adjust some additional parameters.

```typescript
import { TextStyle } from '@pixi/text';
import { PixiFpsCounter, FpsCounterOptions } from 'pixi-fps-counter';

const options: FpsCounterOptions = {
  backgroundColor: 0x9f3a0d,
  backgroundPadding: 7,
  dragParent: pixiApp.stage,
  textStyle: new TextStyle({
    fill: '#fff7db',
    fontSize: 48,
    fontWeight: 'bolder',
    strokeThickness: 9,
  }),
  updateCoefficient: 10,
};
const counter = new PixiFpsCounter(pixiApp.ticker, options);
pixiApp.stage.addChild(counter);
```

Here's the table with possible options:

| Parameter           | Type            | Default Value           | Comment                                                                                                                                                                                                                                      |
|---------------------|-----------------|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `backgroundColor`   | `number`        | `0x000000`              |                                                                                                                                                                                                                                              |
| `backgroundPadding` | `number`        | `10`                    | Background padding value in pixels                                                                                                                                                                                                           |
| `dragParent`        | `DisplayObject` | `undefined`             | A PixiJS [`DisplayObject`](https://pixijs.download/release/docs/PIXI.DisplayObject.html) inside which it would be possible to drag and drop the counter. If this parameter is passed `PixiFpsCounter` initiates Drag And Drop functionality. |
| `textStyle`         | `TextStyle`     | Observe the table below | A PixiJS [`TextStyle`](https://pixijs.download/release/docs/PIXI.HTMLTextStyle.html) instance.                                                                                                                                               |
| `updateCoefficient` | `number`        | `50`                    | The value that represents the frequency of counter update                                                                                                                                                                                    |

`textStyle` default values are :

| Parameter         | Default Value |
|-------------------|---------------|
| `fill`            | `'#00ff00'`   |
| `fontSize`        | `24`          |
| `fontWeight`      | `'bold'`      |
| `strokeThickness` | `1`           |
