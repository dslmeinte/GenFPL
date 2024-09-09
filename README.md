# GenFPL

GenFPL is a tool for DSL-embeddable functional programming languages.
It takes a simple configuration and generates a number of artifacts for the implementation of a functional programming language (**FPL*) from that:

* The metamodel of the FPL, as a set of languages defined using the [LionWeb](https://lionweb.io/) LionCore M3 formalism.
* An interpreter capable of executing the FPL.

Such an FPL can be embedded in any DSL, provided that the DSL is based on LionWeb as well.

It's (loosely) inspired by (the principles underlying) [KernelF](https://markusvoelter.medium.com/design-evolution-and-use-of-kernelf-b6c76993757d) for JetBrains MPS, while aiming to be portable and as technology-independent as possible.


## API (of generator)

* `generate(configuration: GenFPLConfiguration, hostLanguage: Language, generationPath: PathLike)` (CLI)

### Getting hold of the GenFPL configuration language's M2 serialization

```typescript
import genFPLConfigLangSerialization from "genfpl/dist/config-lang/genfpl-config-lang.definition.json" assert { type: "json" }
import {deserializeLanguages} from "@lionweb/core"
const genFPLConfigLang = deserializeLanguages(genFPLConfigLangSerialization)
```


## Organization

**Note**: currently written in TypeScript version 5.3.3 (instead of `latest`) because of ESLint support.

NPM packages (within scope `@genfpl`):

* `genfpl`: a package that exposes GenFPL (consisting of a definition of its configuration language, as well as its generator) as CLI tooling
* `build`: a package that generates (“builds”) parts of the `genfpl` language
* `test`: unit tests for (mainly) the generator
* `app`: a Web app to “click together” a GenFPL configuration — _(not yet implemented)_
* `interpret-base`: base artifacts for interpreter implementation — _(not yet implemented)_ — [only if necessary]

Run

```shell
npm run initialize
```

to fully initialize.

