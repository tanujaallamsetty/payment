// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TransactionsPage = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const { data } = await axios.get('http://localhost:3000/transactions');
//       setTransactions(data);
//     };
//     fetchTransactions();
//   }, []);

//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//       {transactions.map((transaction, index) => (
//         <div key={index} style={{ border: '1px solid black', padding: '10px' }}>
//           <h3>{transaction.name}</h3>
//           <p>${transaction.amount}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TransactionsPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get('http://localhost:3000/transactions');
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-container">
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-card">
          <h3>{transaction.name}</h3>
          <p>${transaction.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionsPage;
