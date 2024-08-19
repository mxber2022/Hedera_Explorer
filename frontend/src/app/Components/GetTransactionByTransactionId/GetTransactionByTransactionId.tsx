"use client"

import React, { useState, useEffect, useRef } from 'react';

interface Transfer {
    account: string;
    amount: number;
    is_approval: boolean;
}

interface Transaction {
    entity_id: string;
    name: string;
    transfers: Transfer[];
}

interface ApiResponse {
    transactions: Transaction[];
}

interface GetTransactionByTransactionIdProps {
    id: string;
}

const GetTransactionByTransactionId: React.FC<GetTransactionByTransactionIdProps> = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Use useRef to store mutable data
    const dataRef = useRef<ApiResponse | null>(null);

    useEffect(() => {
        async function fetchTransaction() {
            setLoading(true); // Set loading state to true when starting fetch
            setError(null); // Reset error state
            
            try {
                const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/transactions/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                dataRef.current = data; // Store data in useRef
            } catch (error) {
               // setError(error.message || 'Failed to fetch transaction data.');
            } finally {
                setLoading(false); // Set loading state to false when done
            }
        }

        fetchTransaction();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    // Use dataRef.current to access the data
    const data = dataRef.current;
    console.log(data);

    // If data is null or transactions is empty, handle it gracefully
    if (!data || data.transactions.length === 0) return <div>No transaction data available.</div>;

    return (
        <section className="LatestTransaction"> 
        <div className='LatestTransaction__container'>
            <h2>Transaction Details</h2>
            {data.transactions.map((transaction: Transaction, index: number) => (
                <div key={index} className="transaction-detail">
                    <h3>Transaction {index + 1}</h3>
                    <p><strong>Entity ID:</strong> {transaction.entity_id}</p>
                    <p><strong>Name:</strong> {transaction.name}</p>
                    <h4>Transfers</h4>

                    <div className='lt__lists'>
                    <span>Account</span>
                    <span>Amount</span>
                    <span>Approval</span>

                </div>
                    <ul className="transaction-list">
                        {transaction.transfers.length > 0 ? (
                            transaction.transfers.map((transfer, transferIndex) => (
                                <li key={transferIndex} className="transaction-item">
                                    <div className="transaction-info">
                                    <p><strong></strong> {transfer.account}</p>
                                    <p><strong></strong> {transfer.amount}</p>
                                    <p><strong></strong> {transfer.is_approval ? 'Yes' : 'No'}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No transfers available.</p>
                        )}
                    </ul>
                    
                </div>
                
            ))}
        </div>
        </section>
    );
}

export default GetTransactionByTransactionId;
