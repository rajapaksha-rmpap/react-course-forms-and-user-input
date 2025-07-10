import Header from "./components/Header.jsx";
// import Login from "./components/Login.jsx";
import Login from "./components/LoginWithState.jsx";
// import SignUp from "./components/SignUp.jsx";
import SignUp from "./components/SignUpWithFormActions.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <SignUp />
      </main>
    </>
  );
}

export default App;
