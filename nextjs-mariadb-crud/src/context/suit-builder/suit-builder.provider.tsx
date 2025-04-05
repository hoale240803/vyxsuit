import { useContext, useState, useEffect, ReactNode, JSX } from "react";
import {
  ProductSeletection,
  StepBuilderVerify,
  SuitBuilderContext,
  SuitBuilderContextType,
  SuitBuilderDefault,
} from "./suit-builder.context";
import {
  ImageMeasurementType,
  MeasurementType,
  Product,
  ShirtMeasurementType,
  SuitStyle,
  SuitType,
  TrouserMeasurementType,
  UnitMeasurementType,
} from "@/models/product.model";
import { CustomerRequest, ShippingInfoRequest } from "@/models/request/request.model";

export const localStorageKey = {
  Term: "suilt-builder:term",
  Product: "suilt-builder:product",
  SuitType: "suilt-builder:suit-type",
  TrouserType: "suilt-builder:trouser",
  SuitStyle: "suilt-builder:suit-style",
  Fabric: "suilt-builder:fabric",
  Lining: "suilt-builder:lining",
  Button: "suilt-builder:button",
  Measurement: "suilt-builder:measurement",
  Customer: "suilt-builder:customer",
  Shipping: "suilt-builder:shipping"
};

export interface SuitBuilderContextProviderProps {
  children: ReactNode;
}

export const SuitBuilderContextProvider: React.FC<
  SuitBuilderContextProviderProps
> = ({ children }): JSX.Element => {
  const [termAccepted, setTermAccepted] = useState<StepBuilderVerify>({
    orderPolicyAgreement: false,
    privacyPolicy: false
  });
  const [productChoosen, setProduct] = useState<Product>(SuitBuilderDefault.Product);
  const [suitTypeChoosen, setSuitType] = useState<SuitType>("");
  const [trouserChoosen, setTrouser] = useState<Product>(SuitBuilderDefault.Product);
  const [suitStyleChoosen, setSuitStyle] = useState<SuitStyle>("");
  const [fabricChoosen, setFabric] = useState<ProductSeletection>(SuitBuilderDefault.ProductSelection);
  const [liningChoosen, setLining] = useState<ProductSeletection>(SuitBuilderDefault.ProductSelection);
  const [buttonChoosen, setButton] = useState<ProductSeletection>(SuitBuilderDefault.ProductSelection);
  const [unitOfMeasurementChoosen, setUnitOfMMeasurement] = useState<UnitMeasurementType>("Cm");
  const [measurementChoosen, setMeasurement] = useState<MeasurementType>(SuitBuilderDefault.Measurement as unknown as MeasurementType);
  const [shirtMeasurementChoosen, setShirtMeasurement] =
    useState<ShirtMeasurementType>(SuitBuilderDefault.Measurement.Shirt);
  const [trouserMeasurementChoosen, setTrouserMeasurement] =
    useState<TrouserMeasurementType>(SuitBuilderDefault.Measurement.Trouser);
  const [imageMeasurementChoosen, setImageMeasurement] = useState<ImageMeasurementType[]>([]);

  const [customerOrder, setCustomer] = useState<CustomerRequest>(SuitBuilderDefault.Customer);
  const [shippingOrder, setShipping] = useState<ShippingInfoRequest>(SuitBuilderDefault.Shipping);

  useEffect(() => {
    // Load saved value from localStorage on first render
    const termOption = localStorage.getItem(
      localStorageKey.Term
    );
    if (termOption) setTermAccepted(JSON.parse(termOption));

    const productOption = localStorage.getItem(
      localStorageKey.Product
    );
    if (productOption) setProduct(JSON.parse(productOption));

    const sultTypeOption = localStorage.getItem(
      localStorageKey.SuitType
    ) as SuitType;
    if (sultTypeOption) setSuitType(sultTypeOption);

    const trouserOption = localStorage.getItem(
      localStorageKey.TrouserType
    );
    if (trouserOption) setTrouser(JSON.parse(trouserOption));

    const suitStyleOption = localStorage.getItem(
      localStorageKey.SuitStyle
    ) as SuitStyle;
    if (suitStyleOption) setSuitStyle(suitStyleOption);

    const fabricOption = localStorage.getItem(localStorageKey.Fabric);
    if (fabricOption) setFabric(JSON.parse(fabricOption));

    const liningOption = localStorage.getItem(localStorageKey.Lining);
    if (liningOption) setLining(JSON.parse(liningOption));

    const buttonOption = localStorage.getItem(localStorageKey.Button);
    if (buttonOption) setButton(JSON.parse(buttonOption));

    const measurementOption = localStorage.getItem(localStorageKey.Measurement);
    if (measurementOption) {
      const measurement = JSON.parse(measurementOption) as MeasurementType;
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

    const customerOption = localStorage.getItem(localStorageKey.Customer);
    if (customerOption) setCustomer(JSON.parse(customerOption));

    const shippingOption = localStorage.getItem(localStorageKey.Shipping);
    if (shippingOption) setShipping(JSON.parse(shippingOption));
  }, []);

  const updateTerm = (term: StepBuilderVerify) => {
    setTermAccepted(term);
    localStorage.setItem(localStorageKey.Term, JSON.stringify(term)); // Save to localStorage
  }

  const updateProduct = (option: Product) => {
    setProduct(option);
    localStorage.setItem(localStorageKey.Product, JSON.stringify(option)); // Save to localStorage
  };

  const updateSuitType = (option: SuitType) => {
    setSuitType(option);
    localStorage.setItem(localStorageKey.SuitType, option); // Save to localStorage
  };

  const updateTrouser = (option: Product) => {
    setTrouser(option);
    localStorage.setItem(localStorageKey.TrouserType, JSON.stringify(option)); // Save to localStorage
  };

  const updateSuitStyle = (option: SuitStyle) => {
    setSuitStyle(option);
    localStorage.setItem(localStorageKey.SuitStyle, option); // Save to localStorage
  };

  const updateFabric = (option: ProductSeletection) => {
    setFabric(option);
    localStorage.setItem(localStorageKey.Fabric, JSON.stringify(option)); // Save to localStorage
  };

  const updateLining = (option: ProductSeletection) => {
    setLining(option);
    localStorage.setItem(localStorageKey.Lining, JSON.stringify(option)); // Save to localStorage
  };

  const updateButton = (option: ProductSeletection) => {
    setButton(option);
    localStorage.setItem(localStorageKey.Button, JSON.stringify(option)); // Save to localStorage
  };

  const updateUnitOfMeasurement = (option: UnitMeasurementType) => {
    setUnitOfMMeasurement(option);
    const measurement: MeasurementType = {
      Shirt: { ...measurementChoosen.Shirt },
      Trouser: { ...measurementChoosen.Trouser },
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
    setMeasurement(measurement);
  };

  const handlePushImageMeasuremented = (
    imageMeasurement: ImageMeasurementType | ImageMeasurementType[]
  ) => {
    let images: string | string[]; // = [...imageMeasurementChoosen, imageMeasurement];
    if (Array.isArray(imageMeasurement)) {
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

  const customerOrderUpdated = (guest: CustomerRequest) => {
    setCustomer(guest);
    localStorage.setItem(localStorageKey.Customer, JSON.stringify(guest)); // Save to localStorage
  }

  const shippingUpdated = (info: ShippingInfoRequest) => {
    setShipping(info);
    localStorage.setItem(localStorageKey.Shipping, JSON.stringify(info)); // Save to localStorage
  }

  const handleClearLocalStorage = () => {
    localStorage.clear();
    setTermAccepted(SuitBuilderDefault.Term);
    setProduct(SuitBuilderDefault.Product);
    setSuitType("");
    setTrouser(SuitBuilderDefault.Product);
    setSuitStyle("");
    setFabric(SuitBuilderDefault.ProductSelection);
    setLining(SuitBuilderDefault.ProductSelection);
    setButton(SuitBuilderDefault.Product);
    setUnitOfMMeasurement("Cm");
    setMeasurement(SuitBuilderDefault.Measurement as unknown as MeasurementType);
    setShirtMeasurement(SuitBuilderDefault.Measurement.Shirt);
    setTrouserMeasurement(SuitBuilderDefault.Measurement.Trouser);
    setImageMeasurement([]);
    setCustomer(SuitBuilderDefault.Customer)
    setShipping(SuitBuilderDefault.Shipping);
  };

  const value: SuitBuilderContextType = {
    termAccepted: termAccepted,
    acceptTern: updateTerm,
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
    customer: customerOrder,
    selectCustomer: customerOrderUpdated,
    shipping: shippingOrder,
    selectShippingInfo: shippingUpdated,
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
