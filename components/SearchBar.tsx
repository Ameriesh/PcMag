"use client"; 
import { Search, X } from "lucide-react";
import { useRouter } from 'next/navigation'; 
import React, { FormEvent, useState } from 'react';

export function SearchBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const reset = () =>{
    setSearchInput('')
    router.push('/')
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (searchInput.trim() === '') {
        
        return;
    }

 
    router.push(`/searchResuls?q=${encodeURIComponent(searchInput.trim())}`);
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSearch} className="searchbar-input-group">
        
        
        <input
            type="text"
            placeholder="Rechercher des articles..."
            className="searchbar-input flex-1" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />

       
        {searchInput.length > 0 && (
            <button 
                onClick={reset}
                type="button" 
                className="searchbar-clear-btn bg-secondary-200"
            >
                <X size={16} />
            </button>
        )}

        <button type="submit" className="searchbar-submit-btn">
            <Search size={16} />
        </button>
      </form>
    </div>
  );
}