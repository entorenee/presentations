# Declarative & Manageable State Management with XState

**Abstract:** Finding your applications landing in impossible states the application logic didn't account for? Does your app use numerous boolean flags for state managed flow control? Finite State Machines bring reason to the madness of exponential boolean complexity, and enable greater confidence in state management. In this talk we will dive into the basics of Finite State Machines using the XState library. We'll cover how to take advantage of their declarative, event driven paradigm and compare it to their unbridled compatriots. It's time to kick impossible states to the curb.

## Sample Machines

- [Machine with states only](https://xstate.js.org/viz/?gist=1ba9f404ec88558ee43545936696eba1)
- [Machine with state transitions](https://xstate.js.org/viz/?gist=ab4ff07dc1b026cdbc2d7388e7dd94f1)
- [Machine with state transitions and context](https://xstate.js.org/viz/?gist=286ef0ee6e79d01f2380084e899b3379)
- [Technology Hype machine with conditionals](https://xstate.js.org/viz/?gist=3394bd7746d07cf7a0007189aec2c992)
- [Complex pager machine with conditionals and branching](https://xstate.js.org/viz/?gist=e5062bd71e5de353293d1c3b92803429)

The code for these machines is also located within these repositories. Each file includes the corresponding exports
from XState and would require the `xstate` npm dependency to be installed.
