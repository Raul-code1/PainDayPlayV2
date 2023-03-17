import type { SingleValue } from 'react-select';

import SelectFormComponent from './SelectFormComponent';
import { FilterMenuContainer } from '../styled-components/filter-menu';

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleSetQueries: ({ name, value }: { name: string; value: string }) => void;
};

export default function FilterMenu({ handleSetQueries }: Props) {
  const options = [
    { value: 'all', label: 'Todos' },
    { value: 'paintball', label: 'Paintball' },
    { value: 'airsoft', label: 'Airsoft' },
    { value: 'laser tag', label: 'Laser tag' },
  ];
  const optionsPricing = [
    { value: 'pricing', label: 'Menor precio' },
    { value: '-pricing', label: 'Mayor precio' },
  ];

  function onChange(selectData: SingleValue<{ label: string; value: string }>): void {
    if (!selectData) return;

    handleSetQueries({ name: 'category', value: selectData?.value });
  }
  function onChangePricing(selectData: SingleValue<{ label: string; value: string }>): void {
    if (!selectData) return;
    handleSetQueries({ name: 'pricing', value: selectData?.value });
  }

  return (
    <FilterMenuContainer>
      <div className="select-category-container">
        <SelectFormComponent options={options} onChange={onChange} />
      </div>
      <div className="select-pricing-container">
        <SelectFormComponent options={optionsPricing} onChange={onChangePricing} />
      </div>
    </FilterMenuContainer>
  );
}
