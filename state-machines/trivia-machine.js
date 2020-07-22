import { assign, createMachine } from 'xstate'

const triviaMachine = createMachine({
  initial: 'idle',
  context: {
    errorMessage: '',
    results: []
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      }
    },
    loading: {
      on: {
        SUCCESS: {
          target: 'success',
          actions: 'setResults'
        },
        FAILURE: {
          target: 'failure',
          actions: 'setError'
        }
      }
    },
    success: {
      on: {
        FETCH: 'loading',
      },
    },
    failure: {
      on: {
        FETCH: 'loading',
      }
    },
  }
}, {
  actions: {
    setError: assign({
      errorMessage: (context, event) => event.message
    }),
    setResults: assign({
      results: (context, event) => event.data
    }),
  }
})

export default triviaMachine
