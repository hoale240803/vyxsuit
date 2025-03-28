import { SuitStyle, SuitType, TrouserType } from '@/models/product.model';
import { createContext } from 'react';

// Define the type for the context value
export interface SuitBuilderContextType {
  suitType: SuitType;
  selectSuitType: (option: SuitType) => void;
  trouser: TrouserType;
  selectTrouser: (option: TrouserType) => void;

  suitStyle: SuitStyle;
  selectSuitStyle: (option: SuitStyle) => void;
  
  clear: () => void;
}

export const suitBuilderContextValue: SuitBuilderContextType = {
  suitType: '',
  selectSuitType: () => {},
  trouser: '',
  selectTrouser: () => {},
  suitStyle: '',
  selectSuitStyle: () => {},
  clear: () => {},
};

// Create a context with a default value (null)
export const SuitBuilderContext = createContext<SuitBuilderContextType>(suitBuilderContextValue);
