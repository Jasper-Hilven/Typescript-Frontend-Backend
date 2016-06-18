/// <reference path="./index.gen.ts" />

module frontend {
  export class AppFactory {
    constructor() { }
    public BuildApp(sliderProvider: ISliderProvider, datePickerProvider: IDatePickerProvider) {
      let loggerFactory = new commonend.LoggerFactory(console);
      let appLogger = loggerFactory.GetLogger("APP");

      // Basic factories
      let hFactory = new HFactory();
      let divLayout = new DivLayout(hFactory);

      // App info
      let myAppInfo = new PayTogether();
      let title = myAppInfo.GetTitle();
      let createChipment = myAppInfo.GetCreateChipment();
      let createChipmentUrl = myAppInfo.GetNewChipmentURL();
      // Navigation
      let navigationElements =
        [new NavigationElement("Home", ""),
          new NavigationElement("About", "#about"),
          new NavigationElement(createChipment, createChipmentUrl)];
      let createNavigator = function() { return new Navigator(hFactory, title, navigationElements); };
      let routeController = new RouteController();

      // Backend
      let backendProxy = new BackendProxy("");
      // Build the content
      let formCreator = new FormCreator(divLayout, hFactory, datePickerProvider, sliderProvider);
      let footerText = "copyright, 2016 PayTogether, Inc.";
      let createFooter = () => divLayout.GetFooter(footerText);
      let pages = <[IPageController]>[];
      let mainPage = new MainPage(divLayout, hFactory, datePickerProvider, createNavigator(), createFooter(), myAppInfo, backendProxy, title);
      pages.push(mainPage);
      pages.push(new NewChipmentPage(divLayout, hFactory, createNavigator(), createFooter(), formCreator, backendProxy, title));
      pages.push(new ExistingChipmentPageController(
        divLayout, hFactory, createNavigator, createFooter, backendProxy, formCreator, title));
      pages.push(new AboutPage(divLayout, hFactory, createNavigator(), createFooter(), title));
      pages.push(new CreatedNewChipmentPage(divLayout, hFactory, createNavigator(), createFooter(), backendProxy, title));
      let application = new PageSelector(routeController, pages, mainPage);
      appLogger.SetLevel(commonend.LogLevel.Info);
      appLogger.Info("Application constructed");
      appLogger.Info("Initializing application");
      application.Initialize();
      appLogger.Info("Application Initialized");
    }
  }
}
