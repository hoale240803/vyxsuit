import { Buttontype, Fabric, ImageMeasurementType, LiningType, MeasurementType, ShirtMeasurementType, SuitStyle, SuitType, TrouserMeasurementType, TrouserType } from '@/models/product.model';
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
  lining: LiningType,
  selectLining: (option: LiningType) => void;
  button: Buttontype,
  selectButton: (option: Buttontype) => void;
  measurement: MeasurementType
  selectShirtMeasurement: (option: ShirtMeasurementType) => void;
  selectTrouserMeasurement: (option: TrouserMeasurementType) => void;
  selectImageMeasurement: (option: ImageMeasurementType) => void;
  deleteImageMeasurement: (index: number) => void;
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
  lining: '',
  selectLining: () => {},
  button: '',
  selectButton: () => {},
  measurement: {} as MeasurementType,
  selectShirtMeasurement: () => {},
  selectTrouserMeasurement: () => {},
  selectImageMeasurement: () => {},
  deleteImageMeasurement: () => {},
  clear: () => {},
};

// Create a context with a default value (null)
export const SuitBuilderContext = createContext<SuitBuilderContextType>(suitBuilderContextDefaultValue);
