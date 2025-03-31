import { Fabric, SuitStyle, SuitType, TrouserType } from '@/models/product.model';
import { createContext } from 'react';

// Define the type for the context value
export interface SuitBuilderContextType {
  suitType: SuitType;
  selectSuitType: (option: SuitType) => void;
  trouser: TrouserType;
  selectTrouser: (option: TrouserType) => void;
  suitStyle: SuitStyle;
  selectSuitStyle: (option: SuitStyle) => void;
  fabric: Fabric;
  selectFabric: (option: Fabric) => void;
  
  clear: () => void;
}

export const suitBuilderContextDefaultValue: SuitBuilderContextType = {
  suitType: '',
  selectSuitType: () => {},
  trouser: '',
  selectTrouser: () => {},
  suitStyle: '',
  selectSuitStyle: () => {},
  fabric: '',
  selectFabric: () => {},
  clear: () => {},
};

// Create a context with a default value (null)
export const SuitBuilderContext = createContext<SuitBuilderContextType>(suitBuilderContextDefaultValue);
