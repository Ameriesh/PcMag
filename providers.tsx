// Fichier : app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Créez une instance de QueryClient (une seule fois)
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}