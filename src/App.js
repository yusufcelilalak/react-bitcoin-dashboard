import Counter from "./components/Counter";
import classes from "./App.module.css";
import BitcoinDashboard from "./components/BitcoinDashboard";

function App() {
  return (
    <main className={classes.main}>
      <section className={classes["application-field"]}>
        <Counter />
        <BitcoinDashboard />
      </section>
    </main>
  );
}

export default App;
