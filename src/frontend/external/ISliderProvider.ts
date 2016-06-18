
module frontend {
  export interface ISliderProvider {
    getSlider(element, options): ISlider;
  }
  export interface ISlider {
    on(action: string, event): void;

  }
  export class DummySlider implements ISlider {
    on(action: string, event) {
    }
  }

  export class DummySliderProvider implements ISliderProvider {
    getSlider(element, options) {
      return new DummySlider();
    }
  }
  declare var Slider;
  export class JQSliderProvider implements ISliderProvider {
    getSlider(element, options) {
      return <any>new Slider(element, {});
    }
  }
}
