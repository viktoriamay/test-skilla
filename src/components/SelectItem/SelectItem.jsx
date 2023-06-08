import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './SelectItem.scss';
import Select from 'react-select';

export const SelectItem = () => {
  const { inOut, setInOut } = useContext(AppContext);
  const options = [
    { value: '', label: 'Все звонки' },
    { value: 1, label: 'Входящие' },
    { value: 0, label: 'Исходящие' },
  ];

  const handleSelectChange = (selectedOption) => {
    // Обновляем состояние inOut
    setInOut(selectedOption.value);
  };

  const DropdownIndicator = (props) => {
    return <div />;
  };
  const customComponents = {
    DropdownIndicator,
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      appearance: 'none',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      position: 'relative',
      cursor: 'pointer',
      minHeight: 'inset',
      '&:focus': {
        backgroundColor: 'none',
      },
    }),

    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: state.isSelected ? '#002CFB' : '#899CB1',
      ':hover': {
        backgroundColor: '#dee4fe',
        color: '#122945',
      },
    }),

    menu: (provided, state) => ({
      ...provided,
      width: '160px',
      boxShadow: '0px 0px 26px rgba(233, 237, 243, 0.8)',
      border: '1px solid #EAF0FA',
      borderRadius: '4px',
      position: 'relative',
      zIndex: 500,
      right: -24,
    }),

    singleValue: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      color: '#5E7793',
      padding: '0',
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      padding: '0',
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  return (
    <Select
      components={customComponents}
      isSearchable={false}
      styles={customStyles}
      value={options.find((option) => option.value === inOut)}
      onChange={handleSelectChange}
      options={options}
      classNamePrefix="react-select"
      defaultValue={options.find((option) => option.value === '')}
    />
  );
};
