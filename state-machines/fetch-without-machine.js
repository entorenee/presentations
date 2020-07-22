const RandomTriviaQuestions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])

  const fetchQuestions = async () => {
    setIsLoading(true)
    try {
      const results = await fetch(/* *** */)
      setResults(results)
      setIsLoading(false)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      {isLoading && <div>Loading data...</div>}
      {results.map((result) => (
        <div key={result}>{result}</div>
      ))}
      {error && <div>{error}</div>}
      <button type='button' onClick={fetchQuestions}>
        Get fresh questions
      </button>
    </div>
  )
}

