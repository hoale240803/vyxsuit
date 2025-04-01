import { Buttontype, Fabric, ImageMeasurementType, LiningType, MeasurementType, ShirtMeasurementType, SuitStyle, SuitType, TrouserMeasurementType, TrouserType, UnitMeasurementType } from '@/models/product.model';
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
  selectUnitOfMeasurement: (option: UnitMeasurementType) => void;
  updateShirtMeasurement: (option: ShirtMeasurementType) => void;
  updateTrouserMeasurement: (option: TrouserMeasurementType) => void;
  pushImageMeasurement: (option: ImageMeasurementType | ImageMeasurementType[]) => void;
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
  selectUnitOfMeasurement: () => {},
  updateShirtMeasurement: () => {},
  updateTrouserMeasurement: () => {},
  pushImageMeasurement: () => {},
  deleteImageMeasurement: () => {},
  clear: () => {},
};

// Create a context with a default value (null)
export const SuitBuilderContext = createContext<SuitBuilderContextType>(suitBuilderContextDefaultValue);
