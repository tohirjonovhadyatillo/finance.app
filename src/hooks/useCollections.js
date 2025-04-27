// hooks/useCollections.js

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollectionsData = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const getCollections = async () => {
      const balanceQuery = getDocs(collection(db, "balance"));
      const budgetsQuery = getDocs(collection(db, "budgets"));
      const potsQuery = getDocs(collection(db, "pots"));
      const transactionsQuery = getDocs(collection(db, "transactions"));

      setIsPending(true);
      const [balanceData, budgetsData, potsData, transactionsData] =
        await Promise.all([
          balanceQuery,
          budgetsQuery,
          potsQuery,
          transactionsQuery,
        ]);

      const balance = balanceData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const budgets = budgetsData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const pots = potsData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const transactions = transactionsData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData({
        balance,
        transactions,
        pots,
        budgets,
      });
      setIsPending(false);
    };

    getCollections();
  }, []);

  return { data, isPending };
};

export const useTransactions = () => {
  const { data, isPending } = useCollectionsData();

  return { transactions: data?.transactions, isPending };
};
