const RandomTriviaQuestions = () => {
  const [state, send] = useMachine(triviaMachine)

  const fetchQuestions = async () => {
    send('FETCH')
    try {
      const results = await fetch(/* *** */)
      send({ type: 'SUCCESS', data: results })
    } catch (e) {
      send({ type: 'FAILURE', message: e.message })
    }
  }

  return (
    <div>
      {state.matches('loading') && <div>Loading data...</div>}
      {state.matches('success') &&
        state.context.results.map((result) => <div key={result}>{result}</div>)}
      {state.matches('failure') && <div>{state.context.errorMessage}</div>}
      <button type='button' onClick={fetchQuestions}>
        Get fresh questions
      </button>
    </div>
  )
}

