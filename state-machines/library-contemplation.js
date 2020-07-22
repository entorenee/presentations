import { assign, createMachine } from 'xstate'

const libraryContemplationMachine = createMachine(
  {
    initial: 'idle',
    context: {
      numberOfTimesMentioned: 0,
      opinion: '',
    },
    states: {
      idle: {
        on: {
          TECHNOLOGY_MENTIONED: [
            {
              target: 'investigating',
              cond: 'hasReceivedEnoughHype',
            },
            {
              actions: 'hearAboutTechnology',
            }
          ],
        },
      },
      investigating: {
        on: {
          INVEST: {
            target: 'invest',
            actions: 'formOpinion',
          },
          NOT_INTERESTED: {
            target: 'notInterested',
            actions: 'formOpinion',
          },
        },
      },
      invest: {
        on: {
          RECONSIDER: 'investigating',
        },
      },
      notInterested: {
        on: {
          INSISTENT_COLLEAGUE: 'investigating',
        },
      },
    },
  },
  {
    actions: {
      formOpinion: assign({
        opinion: (context, event) => event.opinion,
      }),
      hearAboutTechnology: assign({
        numberOfTimesMentioned: (context) =>
          context.numberOfTimesMentioned + 1,
      }),
    },
    guards: {
      hasReceivedEnoughHype: (context) => context.numberOfTimesMentioned >= 2,
    },
  },
)

export default libraryContemplationMachine
