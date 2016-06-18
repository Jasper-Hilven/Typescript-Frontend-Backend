/// <reference path="./index.gen.ts"/>

module frontend {
  module startupFrontend {
    declare var $: any;
    (new frontend.AppFactory()).BuildApp(new JQSliderProvider(), $);
  }
}
