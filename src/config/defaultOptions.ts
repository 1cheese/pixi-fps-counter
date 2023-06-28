import { TextStyle } from '@pixi/text';

import { FpsCounterOptions } from '../types/FpsCounterOptions';

export const defaultOptions: FpsCounterOptions = {
  backgroundColor: 0x000000,
  backgroundPadding: 10,
  textStyle: new TextStyle({
    fill: '#00ff00',
    fontSize: 24,
    fontWeight: 'bold',
    strokeThickness: 1,
  }),
  updateCoefficient: 50,
};
