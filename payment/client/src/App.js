// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import WrappedPaymentPage from './PaymentPage';
// import TransactionsPage from './TransactionsPage';

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={WrappedPaymentPage} />
//         <Route path="/transactions" component={TransactionsPage} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WrappedPaymentPage from './PaymentPage';
import TransactionsPage from './TransactionsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WrappedPaymentPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;



