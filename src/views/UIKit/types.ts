import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  active?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children?: ReactNode;
}
