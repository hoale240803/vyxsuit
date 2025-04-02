import { useContext, useState, useEffect, ReactNode, JSX } from "react";
import {
  SuitBuilderContext,
  SuitBuilderContextType,
} from "./suit-builder.context";
import {
  Buttontype,
  Fabric,
  ImageMeasurementType,
  LiningType,
  MeasurementType,
  Product,
  ShirtMeasurementType,
  SuitStyle,
  SuitType,
  TrouserMeasurementType,
  TrouserType,
  UnitMeasurementType,
} from "@/models/product.model";

export const localStorageKey = {
  Product: "suilt-builder:product",
  SuitType: "suilt-builder:suit-type",
  TrouserType: "suilt-builder:trouser",
  SuitStyle: "suilt-builder:suit-style",
  Fabric: "suilt-builder:fabric",
  Lining: "suilt-builder:lining",
  Button: "suilt-builder:button",
  Measurement: "suilt-builder:measurement",
};

export interface SuitBuilderContextProviderProps {
  children: ReactNode;
}

export const SuitBuilderDefault = {
  Product: {
    Id: 0,
    Name: '',
    Description: '',
    S3Url: '',
    ProductType: '',
    Code: '',
    Price: 0
  },
  Measurement: {
    Shirt: {
      Chest: 0,
      Shoulder: 0,
      ArmLength: 0,
      ArmShoulderJoint: 0,
      ArmBicepWidth: 0,
      JacketLength: 0,
      Abdomen: 0,
      Belly: 0,
      Hips: 0,
      Neck: 0,
    },
    Trouser: {
      Waist: 0,
      UpperHips: 0,
      Hips: 0,
      Crotch: 0,
      Outswam: 0,
      Thigh: 0,
      Calf: 0,
    },
    Images: [],
    Unit: 'cm'
  }
}

export const SuitBuilderContextProvider: React.FC<
  SuitBuilderContextProviderProps
> = ({ children }): JSX.Element => {
  const [productChoosen, setProduct] = useState<Product>(SuitBuilderDefault.Product);
  const [suitTypeChoosen, setSuitType] = useState<SuitType>("");
  const [trouserChoosen, setTrouser] = useState<TrouserType>("");
  const [suitStyleChoosen, setSuitStyle] = useState<SuitStyle>("");
  const [fabricChoosen, setFabric] = useState<Fabric>("");
  const [liningChoosen, setLining] = useState<LiningType>("");
  const [buttonChoosen, setButton] = useState<Buttontype>("");
  const [unitOfMeasurementChoosen, setUnitOfMMeasurement] = useState<UnitMeasurementType>("cm");
  const [measurementChoosen, setMeasurement] = useState<MeasurementType>(SuitBuilderDefault as unknown as MeasurementType);
  const [shirtMeasurementChoosen, setShirtMeasurement] =
    useState<ShirtMeasurementType>({
      Chest: 0,
      Shoulder: 0,
      ArmLength: 0,
      ArmShoulderJoint: 0,
      ArmBicepWidth: 0,
      JacketLength: 0,
      Abdomen: 0,
      Belly: 0,
      Hips: 0,
      Neck: 0,
    });
  const [trouserMeasurementChoosen, setTrouserMeasurement] =
    useState<TrouserMeasurementType>({
      Waist: 0,
      UpperHips: 0,
      Hips: 0,
      Crotch: 0,
      Outswam: 0,
      Thigh: 0,
      Calf: 0,
    });
  const [imageMeasurementChoosen, setImageMeasurement] = useState<ImageMeasurementType[]>([]);

  useEffect(() => {
    // Load saved value from localStorage on first render
    const productOption = localStorage.getItem(
      localStorageKey.Product
    ) as unknown as Product;
    if (productOption) setProduct(productOption);

    const sultTypeOption = localStorage.getItem(
      localStorageKey.SuitType
    ) as SuitType;
    if (sultTypeOption) setSuitType(sultTypeOption);

    const trouserOption = localStorage.getItem(
      localStorageKey.TrouserType
    ) as TrouserType;
    if (trouserOption) setTrouser(trouserOption);

    const suitStyleOption = localStorage.getItem(
      localStorageKey.SuitStyle
    ) as SuitStyle;
    if (suitStyleOption) setSuitStyle(suitStyleOption);

    const fabricOption = localStorage.getItem(localStorageKey.Fabric) as Fabric;
    if (fabricOption) setFabric(fabricOption);

    const liningOption = localStorage.getItem(
      localStorageKey.Lining
    ) as LiningType;
    if (liningOption) setLining(liningOption);

    const buttonOption = localStorage.getItem(
      localStorageKey.Button
    ) as Buttontype;
    if (buttonOption) setButton(buttonOption);

    const measurementOption = localStorage.getItem(localStorageKey.Measurement);
    if (measurementOption) {
      const measurement = JSON.parse(measurementOption) as MeasurementType;
      console.log("load from local:", measurement);
      setMeasurement(measurement);
      setShirtMeasurement(measurement.Shirt);
      setTrouserMeasurement(measurement.Trouser);
      setUnitOfMMeasurement(measurement.Unit);
      setImageMeasurement(measurement.Images);
    } else {
      setMeasurement({
        Shirt: shirtMeasurementChoosen,
        Trouser: trouserMeasurementChoosen,
        Images: imageMeasurementChoosen,
        Unit: unitOfMeasurementChoosen,
      });
    }
  }, []);

  const updateProduct = (option: Product) => {
    setProduct(option);
    localStorage.setItem(localStorageKey.Product, JSON.stringify(option)); // Save to localStorage
  };

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

  const updateUnitOfMeasurement = (option: UnitMeasurementType) => {
    setUnitOfMMeasurement(option);
    const measurement: MeasurementType = {
      Shirt: {...measurementChoosen.Shirt},
      Trouser: {...measurementChoosen.Trouser},
      Images: [...imageMeasurementChoosen],
      Unit: option,
    };
    localStorage.setItem(
      localStorageKey.Measurement,
      JSON.stringify(measurement)
    ); // Save to localStorage
    setMeasurement(measurement);
  };

  const handleUpdateShirtMeasurement = (
    shirtMeasurement: ShirtMeasurementType
  ) => {
    setShirtMeasurement(shirtMeasurement);
    const measurement: MeasurementType = {
      Shirt: shirtMeasurement,
      Trouser: trouserMeasurementChoosen,
      Images:
        imageMeasurementChoosen.length > 0 ? [...imageMeasurementChoosen] : [],
      Unit: unitOfMeasurementChoosen,
    };
    localStorage.setItem(
      localStorageKey.Measurement,
      JSON.stringify(measurement)
    ); // Save to localStorage
    setMeasurement(measurement);
  };

  const handleUpdateTrouserMeasurement = (
    trouserMeasurement: TrouserMeasurementType
  ) => {
    setTrouserMeasurement(trouserMeasurement);
    const measurement: MeasurementType = {
      Shirt: shirtMeasurementChoosen,
      Trouser: trouserMeasurement,
      Images:
        imageMeasurementChoosen.length > 0 ? [...imageMeasurementChoosen] : [],
      Unit: unitOfMeasurementChoosen,
    };
    localStorage.setItem(
      localStorageKey.Measurement,
      JSON.stringify(measurement)
    ); // Save to localStorage
  };

  const handlePushImageMeasuremented = (
    imageMeasurement: ImageMeasurementType | ImageMeasurementType[]
  ) => {
    let images: string | string[]; // = [...imageMeasurementChoosen, imageMeasurement];
    if(Array.isArray(imageMeasurement)) {
      images = [...imageMeasurementChoosen, ...imageMeasurement];
    } else {
      images = [...imageMeasurementChoosen, imageMeasurement]
    }
    saveImageMeasurementToLocalStorage(images);
  };

  const handleDeleteImageMeasuremented = (index: number) => {
    imageMeasurementChoosen.splice(index, 1);
    saveImageMeasurementToLocalStorage(imageMeasurementChoosen);
  };

  const saveImageMeasurementToLocalStorage = (
    images: ImageMeasurementType[]
  ) => {
    setImageMeasurement(images);
    const measurement: MeasurementType = {
      Shirt: shirtMeasurementChoosen,
      Trouser: trouserMeasurementChoosen,
      Images: images,
      Unit: unitOfMeasurementChoosen,
    };
    localStorage.setItem(
      localStorageKey.Measurement,
      JSON.stringify(measurement)
    ); // Save to localStorage
    setMeasurement(measurement);
  };

  const handleClearLocalStorage = () => {
    localStorage.clear();
    setProduct(SuitBuilderDefault.Product);
    setSuitType("");
    setTrouser("");
    setSuitStyle("");
    setFabric("");
    setLining("");
    setButton("");
    setUnitOfMMeasurement("cm");
    setMeasurement({} as MeasurementType);
    setShirtMeasurement({} as ShirtMeasurementType);
    setTrouserMeasurement({} as TrouserMeasurementType);
    setImageMeasurement([]);
    localStorage.clear();
  };

  const value: SuitBuilderContextType = {
    product: productChoosen,
    selectProduct: updateProduct,
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
    measurement: measurementChoosen,
    selectUnitOfMeasurement: updateUnitOfMeasurement,
    updateShirtMeasurement: handleUpdateShirtMeasurement,
    updateTrouserMeasurement: handleUpdateTrouserMeasurement,
    pushImageMeasurement: handlePushImageMeasuremented,
    deleteImageMeasurement: handleDeleteImageMeasuremented,
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
    throw new Error(
      "useSuitBuilder must be used within a SuitBuilderContextProvider"
    );
  }
  return context;
};
