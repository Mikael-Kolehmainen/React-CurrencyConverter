import './App.css';
import updateResult from "./apis/currency_converter";


function App() {
  return (
    <section>
      <article className='box'>
        <h1>Currency converter</h1>
        <form>
          <label>
            From (ISO alpha-3):
            <input type='text' id='fromCurrency' maxLength='3' onChange={updateResult}/>
          </label>
          <label>
            To (ISO alpha-3):
            <input type='text' id='toCurrency' maxLength='3' onBlur={updateResult}/>
          </label>
          <label>
            Amount:
            <input type='number' id='amount' onBlur={updateResult}/>
          </label>
        </form>
        <p id='result'>Result:<br/></p>
      </article>
    </section>
  );
}

export default App;
