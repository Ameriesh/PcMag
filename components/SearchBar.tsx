
"use client"; 

import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'; 
import React, { FormEvent, useState } from 'react';

export function SearchBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (searchInput.trim() === '') {
        
        return;
    }

 
    router.push(`/?q=${encodeURIComponent(searchInput.trim())}`);
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSearch} className="searchbar-input-group">
        
        {/* L'icône initiale de recherche (searchbar-icon) a été supprimée du JSX */}
        
        {/* Input Text */}
        <input
            type="text"
            placeholder="Rechercher des articles..."
            className="searchbar-input flex-1" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Bouton pour effacer (Visible uniquement si l'input n'est pas vide) */}
        {searchInput.length > 0 && (
            <button 
                type="button" // Important : type="button" pour éviter de soumettre le formulaire
                // onClick={handleClear} 
                className="searchbar-clear-btn"
            >
                <X size={16} />
            </button>
        )}

        {/* Bouton de soumission (Icône Search) */}
        <button type="submit" className="searchbar-submit-btn">
            <Search size={16} />
        </button>
      </form>
    </div>
  );
}