import { Container, DisplayObject, IDestroyOptions } from '@pixi/display';
import { Ticker } from '@pixi/ticker';
import { Text, TextStyle } from '@pixi/text';
import { Graphics } from '@pixi/graphics';
import { FederatedPointerEvent } from '@pixi/events';

import { FpsCounterOptions } from '../types/FpsCounterOptions';
import { defaultOptions } from '../config/defaultOptions';

export class PixiFpsCounter extends Container {
  private _dragParent: DisplayObject;
  private _elapsed = 0;
  private _isDragging = false;
  private _options: FpsCounterOptions = defaultOptions;
  private _text = new Text(`FPS: 00`);

  public alpha = 0.6;

  constructor(private _ticker: Ticker, options?: FpsCounterOptions) {
    super();
    this._options = { ...this._options, ...options };
    this._dragParent = this._options.dragParent;
    this.setup();
  }

  set textStyle(value: TextStyle) {
    this._options.textStyle = value;
    this._text.style = value;
  }

  private setup = (): void => {
    this.createText();
    this.createBackground();

    if (this._dragParent) {
      this.initDragAndDrop();
    }

    this._ticker.add(this.renderFps);
  };

  private createText = (): void => {
    this._text.style = this._options.textStyle;
    this.addChild(this._text);
  };

  private createBackground = (): void => {
    const { backgroundPadding } = this._options;
    const background = new Graphics()
      .beginFill(this._options.backgroundColor)
      .drawRect(
        0,
        0,
        this.width + 2 * backgroundPadding,
        this.height + 2 * backgroundPadding,
      )
      .endFill();
    background.position.set(-backgroundPadding);
    this.pivot.set(-backgroundPadding);
    this.addChildAt(background, 0);
  };

  private renderFps = (delta: number) => {
    this._elapsed += delta;

    if (this._elapsed >= this._options.updateCoefficient) {
      const fps = Math.round(this._ticker.FPS);
      this._elapsed = 0;
      this._text.text = `FPS: ${fps}`;
    }
  };

  private initDragAndDrop = (): void => {
    this.eventMode = 'static';
    this.cursor = 'grab';
    this._dragParent.eventMode = 'static';
    this._dragParent.addEventListener('pointerdown', this.onDragStart);
    this._dragParent.addEventListener('pointerup', this.onDragEnd);
    this._dragParent.addEventListener('pointerupoutside', this.onDragEnd);
  };

  private onDragMove = (event: FederatedPointerEvent): void => {
    if (this._isDragging) {
      this.cursor = 'grabbing';
      this._dragParent.toLocal(event.global, null, this.position);
    }
  };

  private onDragStart = (): void => {
    this._isDragging = true;
    this._dragParent.addEventListener('pointermove', this.onDragMove);
  };

  private onDragEnd = (): void => {
    if (this._isDragging) {
      this._dragParent.removeEventListener('pointermove', this.onDragMove);
      this._isDragging = false;
      this.cursor = 'grab';
    }
  };

  public destroy(_options?: IDestroyOptions | boolean) {
    super.destroy(_options);
  }
}
