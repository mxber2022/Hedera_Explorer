"use client";
import React, { useState } from "react";
import "./Search.css";

function Search() {
    const [inputValue, setInputValue] = useState("");
    const [accountData, setAccountData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value); 
    }

    async function fetchAccountInfo(idOrAliasOrEvmAddress: any) {
        const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${idOrAliasOrEvmAddress}`, {
            method: 'GET',
            headers: {},
        });
        const data = await response.json();
        return data;
    }

    async function searchData(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        try {
            const data = await fetchAccountInfo(inputValue);
            console.log("data: ", data);
            setAccountData(data); // Store the fetched data in state
            setError(null); // Clear any previous errors
        } catch (err) {
            setError("Failed to fetch account data. Please check the input and try again.");
            setAccountData(null); // Clear previous data if any error occurs
        }
    }

    return (
        <>
            <section className="Search">
                <div className='Search__container'>
                    <div className="nav__search">
                        <input onChange={handleInputChange} type="text" placeholder="Search by idOrAliasOrEvmAddress" value={inputValue} />
                    </div>
                    <div className="search_btn">
                        <button onClick={searchData}>Search</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Search;
