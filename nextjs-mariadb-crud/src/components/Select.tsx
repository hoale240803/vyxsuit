// Select.tsx
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Select.module.scss";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[] | string[];
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, placeholder, onChange }) => {
  const [source, setSource] = useState<Option[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = source.find(option => option.value === value);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (selectedValue: string) => {
    if (onChange) {
      const event = {
        target: { value: selectedValue }
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    function isOptionArray(value: unknown): value is Option[] {
      return (
        Array.isArray(value) &&
        value.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            typeof item.value === "string" &&
            typeof item.label === "string"
        )
      );
    }

    if (isOptionArray(options)) {
      setSource(options);
    } else {
      setSource(options.map((option) => ({ label: option, value: option })));
    }
  }, [options]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${styles["custom-select-container"]} ${
        isOpen ? styles.active : ""
      }`}
      ref={containerRef}
    >
      <div
        className={styles["custom-select"]}
        onClick={handleSelectClick}
        tabIndex={0}
      >
        {selectedOption ? selectedOption.label : placeholder || 'Select'}
        <div className={styles["custom-select-arrow"]}></div>
      </div>
      <div className={styles["custom-options"]}>
        {source.map((option) => (
          <div
            key={option.value}
            className={`${styles["custom-option"]} ${
              option.value === value ? styles.selected : ""
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
