# GenFPL

GenFPL is a tool for DSL-embeddable functional programming languages.
It takes a simple configuration and generates a number of artifacts for the implementation of a functional programming language (**FPL*) from that:

* The metamodel of the FPL, as a set of languages defined using the [LionWeb](https://lionweb.io/) LionCore M3 formalism.
* An interpreter capable of executing the FPL.

Such an FPL can be embedded in any DSL, provided that the DSL is based on LionWeb as well.

It's (loosely) inspired by (the principles underlying) [KernelF](https://markusvoelter.medium.com/design-evolution-and-use-of-kernelf-b6c76993757d) for JetBrains MPS, while aiming to be portable and as technology-independent as possible.

