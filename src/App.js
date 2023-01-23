import './App.css';

function App() {
  return (
    <section>
      <article className='box'>
        <h1>Currency converter</h1>
        <form>
          <label>
            From (ISO alpha-3):
            <input type='text' id='fromCurrency' />
          </label>
          <label>
            To (ISO alpha-3):
            <input type='text' id='toCurrency' />
          </label>
          <label>
            Amount:
            <input type='number' id='amount' />
          </label>
        </form>
        <p id='result'>Result: </p>
      </article>
    </section>
  );
}

export default App;
