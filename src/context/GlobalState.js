import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";

function getLocalTransactions() {
  let transaction = localStorage.getItem("transactions");

  if (transaction) {
    return {transactions: JSON.parse(localStorage.getItem("transactions"))};
  } else {
    return {transactions: []};
  }
}

// create context
export const GlobalContext = createContext(getLocalTransactions());

// Provider component
export function GlobalProvider({children}) {
  const [state, dispatch] = useReducer(AppReducer, getLocalTransactions());

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions])

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    });
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      deleteTransaction,
      addTransaction
    }} >
      {children}
    </GlobalContext.Provider>
  )
}