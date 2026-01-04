import * as React from 'react';
// We assume the existence of a ToastProvider and the exported ToastContext, 
// typically located in the UI component library structure.
import { ToastContext } from '@/components/ui/toast/toast-provider'; 

// --- Types ---

/**
 * Defines the permissible visual styles for a toast notification.
 */
export type ToastVariant = 'default' | 'success' | 'destructive' | 'warning' | 'info';

/**
 * Defines the input required to dispatch a new toast notification.
 */
export interface ToastAction {
  /** The main header or primary message of the toast. */
  title: string;
  /** Optional secondary details or context for the message. */
  description?: string;
  /** The visual variant/style of the toast (defaults to 'default'). */
  variant?: ToastVariant;
  /** How long the toast should remain visible (in milliseconds). Defaults usually set by the provider. */
  duration?: number;
  /** Optional action element (e.g., a button) to include inside the toast. */
  action?: React.ReactNode;
}

/**
 * Defines the contract for the Toast Context, typically provided by ToastProvider.
 */
interface ToastContextType {
  /** Function to display a new toast notification. */
  toast: (action: ToastAction) => void;
  /** Optional function to programmatically dismiss a specific toast. */
  dismiss: (id: string) => void;
  /** Optional function to update an existing toast (e.g., changing status). */
  update: (id: string, action: Partial<ToastAction>) => void;
}

// --- Hook Implementation ---

/**
 * useToast
 * 
 * An industry-standard hook used to trigger global application toast notifications.
 * This hook abstracts the complexity of state management for toasts, requiring 
 * the ToastProvider to wrap the application component tree.
 *
 * @returns {ToastContextType} An object containing the 'toast' dispatch function
 *          and utility functions like 'dismiss' and 'update'.
 */
export const useToast = (): ToastContextType => {
  // We explicitly assert the context type here, relying on the provider to fulfill the contract.
  const context = React.useContext(ToastContext);

  if (context === undefined) {
    // Enforces correct usage: standard practice for context hooks.
    throw new Error('useToast must be used within a ToastProvider');
  }

  // Cast context to the defined type, as useContext might return null/undefined 
  // outside the provider's scope, which we handled above.
  return context as ToastContextType;
};