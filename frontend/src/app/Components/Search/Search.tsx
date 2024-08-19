"use client";
import React, { useState } from "react";
import "./Search.css";
import GetTransactionByTransactionId from "../GetTransactionByTransactionId/GetTransactionByTransactionId";

interface Token {
    token_id: string;
    balance: number;
}

interface NFTTransfer {
    is_approval: boolean;
    receiver_account_id: string;
    sender_account_id: string;
    serial_number: number;
    token_id: string;
}

interface TokenTransfer {
    token_id: string;
    account: string;
    amount: number;
    is_approval: boolean;
}

interface Transfer {
    account: string;
    amount: number;
    is_approval: boolean;
}

interface Transaction {
    charged_tx_fee: number;
    consensus_timestamp: string;
    transaction_id: string;
    entity_id: string;
    max_fee: number;
    name: string;
    staking_reward_transfers: Array<{ account: number; amount: number }>;
    token_transfers: TokenTransfer[];
    transfers: Transfer[];
    nft_transfers: NFTTransfer[];
    valid_duration_seconds: number;
    valid_start_timestamp: string;
}

interface AccountData {
    account: string;
    alias: string;
    balance: {
        timestamp: string;
        balance: number;
        tokens: Token[];
    };
    created_timestamp: string;
    decline_reward: boolean;
    deleted: boolean;
    ethereum_nonce: number;
    evm_address: string;
    max_automatic_token_associations: number;
    memo: string;
    pending_reward: number;
    receiver_sig_required: boolean;
    staked_account_id: string | null;
    staked_node_id: number;
    stake_period_start: string;
    transactions: Transaction[];
}

function Search() {
    const [inputValue, setInputValue] = useState<string>("");
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'details' | 'balance' | 'transactions'>('details');
    const [activeTransactionTab, setActiveTransactionTab] = useState<'all' | 'nft' | 'token' | 'general'>('all');
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    async function fetchAccountInfo(idOrAliasOrEvmAddress: string): Promise<AccountData> {
        try {
            const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${idOrAliasOrEvmAddress}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched data:', data); // Debugging line
            return data;
        } catch (error) {
            throw new Error('Failed to fetch account data.');
        }
    }

    async function searchData(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        setLoading(true);
        setError(null);
        setAccountData(null);

        try {
            const data = await fetchAccountInfo(inputValue);
            setAccountData(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    const handleTransactionClick = (id: string) => {
        setSelectedTransactionId(id);
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransactionId(null);
    };

    return (
        <section className="search">
            <div className='search__container'>
                {/* <div className="search__text">
                    <h1>test lorem ipsum</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eveniet?</p>
                </div> */}
                <div className="search__top">
                    <div className="nav__search">
                        <input
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Search by idOrAliasOrEvmAddress"
                            value={inputValue}
                        />
                    </div>
                    <div className="search_btn">
                        <button onClick={searchData} disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </div>
                <div className="search__results">
                {error && <p className="error">{error}</p>}
                {accountData && (
                    <div className="tabs">
                        <div className="tab-buttons">
                            <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>Account Details</button>
                            <button onClick={() => setActiveTab('balance')} className={activeTab === 'balance' ? 'active' : ''}>Balance</button>
                            <button onClick={() => setActiveTab('transactions')} className={activeTab === 'transactions' ? 'active' : ''}>Transactions</button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'details' && (
                                <div>
                                    <h2>Account Details</h2>
                                    <div className="tab-content__card">
                                        <p><strong>Account ID:</strong> {accountData.account}</p>
                                        <p><strong>Alias:</strong> {accountData.alias}</p>
                                        <p><strong>Ethereum Nonce:</strong> {accountData.ethereum_nonce}</p>
                                        <p><strong>EVM Address:</strong> {accountData.evm_address}</p>
                                        <p><strong>Memo:</strong> {accountData.memo}</p>
                                        <p><strong>Pending Reward:</strong> {accountData.pending_reward}</p>
                                        <p><strong>Staked Node ID:</strong> {accountData.staked_node_id}</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'balance' && (
                                <div className="balance__content">
                                    <h2>Balance</h2>
                                    <p><strong>Balance:</strong> {accountData.balance.balance}</p>
                                    <p><strong>Balance Timestamp:</strong> {accountData.balance.timestamp}</p>
                                    <h3>Tokens</h3>
                                    <ul>
                                        {accountData.balance.tokens.map((token, index) => (
                                            <li key={index}>Token ID: {token.token_id}, Balance: {token.balance}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'transactions' && (
                                <div className="transaction-tabs">
                                    <div className="transaction-tab-buttons">
                                        <button onClick={() => setActiveTransactionTab('all')} className={activeTransactionTab === 'all' ? 'active' : ''}>All Transactions</button>
                                        <button onClick={() => setActiveTransactionTab('nft')} className={activeTransactionTab === 'nft' ? 'active' : ''}>NFT Transfers</button>
                                        <button onClick={() => setActiveTransactionTab('token')} className={activeTransactionTab === 'token' ? 'active' : ''}>Token Transfers</button>
                                    </div>
                                    <div className="transaction-tab-content">
                                        {activeTransactionTab === 'all' && (
                                            <div>
                                                <h2>All Transactions</h2>
                                                <ul>
                                                    {accountData.transactions.map((tx, index) => (
                                                        <li key={index}>
                                                            <h3>Transaction Name: {tx.name}</h3>
                                                            <p className="tt_link" onClick={() => handleTransactionClick(tx.transaction_id)} style={{ cursor: 'pointer'}}>
                                                                <strong>Transaction ID:</strong> {tx.transaction_id}
                                                            </p>
                                                            <p><strong>Charged Fee:</strong> {tx.charged_tx_fee}</p>
                                                            <p><strong>Max Fee:</strong> {tx.max_fee}</p>
                                                            <p><strong>Valid Start Timestamp:</strong> {tx.valid_start_timestamp}</p>
                                                            <p><strong>Valid Duration:</strong> {tx.valid_duration_seconds} seconds</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {activeTransactionTab === 'nft' && (
                                            <div>
                                                <h2>NFT Transfers</h2>
                                                <ul>
                                                    {accountData.transactions.flatMap(tx => tx.nft_transfers).map((nft, index) => (
                                                        <li key={index}>
                                                            <p><strong>Token ID:</strong> {nft.token_id}</p>
                                                            <p><strong>Serial Number:</strong> {nft.serial_number}</p>
                                                            <p><strong>Sender:</strong> {nft.sender_account_id}</p>
                                                            <p><strong>Receiver:</strong> {nft.receiver_account_id}</p>
                                                            <p><strong>Approval:</strong> {nft.is_approval ? 'Yes' : 'No'}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {activeTransactionTab === 'token' && (
                                            <div>
                                                <h2>Token Transfers</h2>
                                                <ul>
                                                    {accountData.transactions.flatMap(tx => tx.token_transfers).map((token, index) => (
                                                        <li key={index}>
                                                            <p><strong>Token ID:</strong> {token.token_id}</p>
                                                            <p><strong>Account:</strong> {token.account}</p>
                                                            <p><strong>Amount:</strong> {token.amount}</p>
                                                            <p><strong>Approval:</strong> {token.is_approval ? 'Yes' : 'No'}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {isModalOpen && selectedTransactionId && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}>X</button>
                            <GetTransactionByTransactionId id={selectedTransactionId} />
                        </div>
                    </div>
                )}
                </div>
            </div>
        </section>
    );
}

export default Search;
