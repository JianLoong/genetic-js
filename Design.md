# Design Decisions and Considerations

- Usage of `namespaces` are abandoned in favour of modules. Refer
  [here](https://michelenasti.com/2019/01/23/is-typescript-namespace-feature-deprecated.html)
- Usage of `extensions methods` are still be considered. Refer [here](https://www.c-sharpcorner.com/article/learn-about-extension-methods-in-typescript/) and [here](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)
- `Jest` is used as the testing framework.
- `Promise` in combination with `web workers` API will be used to "multi-thread".
- `Singleton` pattern is determined to be not needed. Refer [here](https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae)
- Testing randomness with `Jest` can be found [here](https://softwareengineering.stackexchange.com/questions/147134/how-should-i-test-randomness)
