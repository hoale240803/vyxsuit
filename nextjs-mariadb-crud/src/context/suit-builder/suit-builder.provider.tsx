
import { useContext, useState, useEffect, ReactNode, JSX } from 'react';
import { SuitBuilderContext, SuitBuilderContextType } from './suit-builder.context';
import { Buttontype, Fabric, ImageMeasurementType, LiningType, ShirtMeasurementType, SuitStyle, SuitType, TrouserMeasurementType, TrouserType } from '@/models/product.model';

export const localStorageKey = {
  SuitType: 'suilt-builder:suit-type',
  TrouserType: 'suilt-builder:trouser',
  SuitStyle: 'suilt-builder:suit-style',
  Fabric: 'suilt-builder:fabric',
  Lining: 'suilt-builder:lining',
  Button: 'suilt-builder:button'
}

export interface SuitBuilderContextProviderProps {
    children: ReactNode;
  }
  
  export const SuitBuilderContextProvider: React.FC<SuitBuilderContextProviderProps> = ({ children }): JSX.Element => {
    const [suitTypeChoosen, setSuitType] = useState<SuitType>('');
    const [trouserChoosen, setTrouser] = useState<TrouserType>('');
    const [suitStyleChoosen, setSuitStyle] = useState<SuitStyle>('');
    const [fabricChoosen, setFabric] = useState<Fabric>('');
    const [liningChoosen, setLining] = useState<LiningType>('');
    const [buttonChoosen, setButton] = useState<Buttontype>('');
    const [shirtMeasurementChoosen, setShirtMeasurement] = useState<ShirtMeasurementType>();
    const [trouserMeasurementChoosen, setTrouserMeasurement] = useState<TrouserMeasurementType>();
    const [imageMeasurementChoosen, setImageMeasurement] = useState<ImageMeasurementType>('');
    const [imageMeasurementDeleted, delImageMeasurement] = useState<number>(-1);

  
    useEffect(() => {
      // Load saved value from localStorage on first render
      const sultTypeOption = localStorage.getItem(localStorageKey.SuitType) as SuitType;
      if (sultTypeOption) setSuitType(sultTypeOption);

      const trouserOption = localStorage.getItem(localStorageKey.TrouserType) as TrouserType;
      if (trouserOption) setTrouser(trouserOption);

      const suitStyleOption = localStorage.getItem(localStorageKey.SuitStyle) as SuitStyle;
      if (suitStyleOption) setSuitStyle(suitStyleOption);

      const fabricOption = localStorage.getItem(localStorageKey.Fabric) as Fabric;
      if (fabricOption) setFabric(fabricOption);

      const liningOption = localStorage.getItem(localStorageKey.Lining) as LiningType;
      if (liningOption) setLining(liningOption);

      const buttonOption = localStorage.getItem(localStorageKey.Button) as Buttontype;
      if (buttonOption) setButton(buttonOption);
    }, []);
  
    const updateSuitType = (option: SuitType) => {
      setSuitType(option);
      localStorage.setItem(localStorageKey.SuitType, option); // Save to localStorage
    };

    const updateTrouser = (option: TrouserType) => {
      setTrouser(option);
      localStorage.setItem(localStorageKey.TrouserType, option); // Save to localStorage
    };

    const updateSuitStyle = (option: SuitStyle) => {
      setSuitStyle(option);
      localStorage.setItem(localStorageKey.SuitStyle, option); // Save to localStorage
    };

    const updateFabric = (option: Fabric) => {
      setFabric(option);
      localStorage.setItem(localStorageKey.Fabric, option); // Save to localStorage
    };

    const updateLining = (option: LiningType) => {
      setLining(option);
      localStorage.setItem(localStorageKey.Lining, option); // Save to localStorage
    };

    const updateButton = (option: Buttontype) => {
      setButton(option);
      localStorage.setItem(localStorageKey.Button, option); // Save to localStorage
    };

    const handleClearLocalStorage = () => {
      localStorage.clear();
      setSuitType('');
      setTrouser('');
      setSuitStyle('');
      setFabric('');
      setLining('');
      setButton('');
    }
  
    const value: SuitBuilderContextType = { 
      suitType: suitTypeChoosen, 
      selectSuitType: updateSuitType,
      trouser: trouserChoosen,
      selectTrouser: updateTrouser,
      suitStyle: suitStyleChoosen,
      selectSuitStyle: updateSuitStyle,
      clear: handleClearLocalStorage,
      fabric: fabricChoosen,
      selectFabric: updateFabric,
      lining: liningChoosen,
      selectLining: updateLining,
      button: buttonChoosen,
      selectButton: updateButton,
    };
  
    return (
      <SuitBuilderContext.Provider value={value}>
        {children}
      </SuitBuilderContext.Provider>
    );
  };
  
  // Export the context to use it in other files
  export const useSuitBuilder = () => {
    const context = useContext(SuitBuilderContext);
    if (!context) {
      throw new Error('useSuitBuilder must be used within a SuitBuilderContextProvider');
    }
    return context;
  };
  