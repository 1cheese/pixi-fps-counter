import { TextStyle } from '@pixi/text';
import { DisplayObject } from '@pixi/display';

export type FpsCounterOptions = {
  backgroundColor?: number;
  backgroundPadding?: number;
  dragParent?: DisplayObject;
  textStyle?: TextStyle;
  updateCoefficient?: number;
}
