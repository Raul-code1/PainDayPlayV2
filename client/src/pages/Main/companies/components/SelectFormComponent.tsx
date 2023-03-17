import Select from 'react-select';
import type { SingleValue } from 'react-select';

type Props = {
  options: { value: string; label: string }[];
  // eslint-disable-next-line no-unused-vars
  onChange: (selectData: SingleValue<{ label: string; value: string }>) => void;
};

export default function SelectFormComponent({ options, onChange }: Props) {
  return (
    <>
      <Select
        options={options}
        onChange={onChange}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: '#242629',
            border: '1px solid gray',
            borderRadius: 4,
            padding: 6,
          }),
          indicatorsContainer: (base) => ({
            ...base,
            color: 'white',
          }),
          option: (base, state) => ({
            ...base,
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected ? '#242629' : 'white',
          }),
          singleValue: (base) => ({
            ...base,
            color: 'white',
          }),
        }}
      />
    </>
  );
}
