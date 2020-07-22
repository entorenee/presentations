import { assign, createMachine } from 'xstate'

const generateCondensedPageNumbers = (totalPages) =>
  Array.from({ length: totalPages - 2 }, (_, i) => i + 2)
const generateBeginningPageNumbers = (bookendPageCount) =>
  Array.from({ length: bookendPageCount }, (_, i) => i + 2)
const generateMiddlePageNumbers = (currPage) => [
  currPage - 1,
  currPage,
  currPage + 1,
]
const generateEndPageNumbers = ({
  bookendPageCount,
  totalPages,
}) =>
  Array.from({ length: bookendPageCount }, (_, i) => i + 1)
    .reverse()
    .map((pageDiff) => totalPages - pageDiff)

const pagerMachine = ({
  totalPages,
}) =>
  createMachine(
    {
      initial: 'idle',
      context: {
        beginningPages: [],
        condensedPages: [],
        currPage: 1,
        bookendPageCount: 4,
        endPages: [],
        middlePages: [],
        totalPages,
      },
      on: {
        GO_TO_PAGE: [
          {
            actions: 'updateCurrPage',
            cond: 'isNewPageAtBeginning',
            target: 'beginning',
          },
          {
            actions: 'updateCurrPage',
            cond: 'isNewPageAtMiddle',
            target: 'middle',
          },
          {
            actions: 'updateCurrPage',
            cond: 'isNewPageAtEnd',
            target: 'end',
          },
        ],
      },
      states: {
        idle: {
          on: {
            '': [
              {
                target: 'condensed',
                cond: 'isCondensedPager',
                actions: 'setCondensedPages',
              },
              {
                target: 'beginning',
                actions: ['setBeginningPages', 'setEndPages'],
              },
            ],
          }
        },
        condensed: {
          on: {
            GO_TO_PAGE: {
              actions: 'updateCurrPage',
            },
            NEXT_PAGE: {
              actions: 'incrementPage',
              cond: 'isNotLastPage',
            },
            PREVIOUS_PAGE: {
              actions: 'decrementPage',
              cond: 'isNotFirstPage',
            },
          },
        },
        beginning: {
          on: {
            NEXT_PAGE: [
              {
                actions: 'incrementPage',
                cond: 'nextPageShouldTransitionToMiddle',
                target: 'middle',
              },
              {
                actions: 'incrementPage',
              },
            ],
            PREVIOUS_PAGE: {
              actions: 'decrementPage',
              cond: 'isNotFirstPage',
            },
          },
        },
        middle: {
          entry: 'setMiddlePages',
          on: {
            NEXT_PAGE: [
              {
                actions: 'incrementPage',
                cond: 'nextPageShouldTransitionToEnd',
                target: 'end',
              },
              {
                actions: 'incrementPage',
                target: 'middle',
              },
            ],
            PREVIOUS_PAGE: [
              {
                actions: 'decrementPage',
                cond: 'previousPageShouldTransitionToBeginning',
                target: 'beginning',
              },
              {
                actions: 'decrementPage',
              },
            ],
          },
        },
        end: {
          on: {
            NEXT_PAGE: {
              actions: 'incrementPage',
              cond: 'isNotLastPage',
            },
            PREVIOUS_PAGE: [
              {
                actions: 'decrementPage',
                cond: 'previousPageShouldTransitionToMiddle',
                target: 'middle',
              },
              {
                actions: 'decrementPage',
              },
            ],
          },
        },
      },
    },
    {
      actions: {
        decrementPage: assign({
          currPage: (context) => context.currPage - 1,
        }),
        incrementPage: assign({
          currPage: (context) => context.currPage + 1,
        }),
        updateCurrPage: assign({
          currPage: (context, event) =>
            event.type === 'GO_TO_PAGE' ? event.page : context.currPage,
        }),
        setBeginningPages: assign({
          beginningPages: (context) =>
            generateBeginningPageNumbers(context.bookendPageCount),
        }),
        setEndPages: assign({
          endPages: (context) =>
            generateEndPageNumbers({
              bookendPageCount: context.bookendPageCount,
              totalPages: context.totalPages,
            }),
        }),
        setCondensedPages: assign({
          condensedPages: (context) =>
            generateCondensedPageNumbers(context.totalPages),
        }),
        setMiddlePages: assign({
          middlePages: ({ currPage }) => generateMiddlePageNumbers(currPage),
        }),
      },
      guards: {
        isCondensedPager: (context) =>
          context.totalPages <= context.bookendPageCount + 1,
        isNewPageAtBeginning: (context, event) =>
          event.type === 'GO_TO_PAGE'
            ? event.page <= context.bookendPageCount
            : false,
        isNewPageAtMiddle: (context, event) =>
          event.type === 'GO_TO_PAGE'
            ? event.page > context.bookendPageCount &&
              event.page < context.totalPages - context.bookendPageCount
            : false,
        isNewPageAtEnd: (context, event) =>
          event.type === 'GO_TO_PAGE'
            ? event.page >= context.totalPages - context.bookendPageCount
            : false,
        isNotFirstPage: (context) => context.currPage > 1,
        isNotLastPage: (context) =>
          context.currPage < context.totalPages,
        nextPageShouldTransitionToEnd: (context) =>
          context.currPage + 1 >= context.totalPages - context.bookendPageCount,
        nextPageShouldTransitionToMiddle: (context) =>
          context.currPage + 1 > context.bookendPageCount,
        previousPageShouldTransitionToBeginning: (context) =>
          context.currPage - 1 <= context.bookendPageCount,
        previousPageShouldTransitionToMiddle: (context) =>
          context.currPage - 1 < context.totalPages - context.bookendPageCount,
      },
    },
  )

export default pagerMachine
