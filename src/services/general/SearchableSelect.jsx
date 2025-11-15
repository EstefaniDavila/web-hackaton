import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'black',
    color: 'white',
    borderColor: '#4A5568',
    fontSize: '0.875rem',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'black',
    color: 'white',
    fontSize: '0.875rem', 
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2D3748' : 'black',
    color: state.isSelected ? 'white' : '#CBD5E0',
    '&:hover': {
      backgroundColor: '#2D3748',
      color: 'white',
    },
    fontSize: '0.875rem', 
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
    fontSize: '0.875rem', 
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
    fontSize: '0.875rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#A0AEC0',
    fontSize: '0.875rem', 
  }),
};

const SearchableSelect = ({ options, onSelectChange, placeholder, label, selectedValue }) => {
  const handleChange = (selectedOption) => {
    onSelectChange(selectedOption ? selectedOption.value : null);
  };

  const formattedOptions = options.map(option => ({
    value: option.id,
    label: option.name || option.label || option.full_name
  }));

  const selectedOption = formattedOptions.find(option => option.value === selectedValue);

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-bold text-white">{label}</label>}
      <Select
        options={formattedOptions}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable
        styles={customStyles}
        classNamePrefix="react-select"
        value={selectedOption}
      />
    </div>
  )
}

export default SearchableSelect