import { useForm, useFieldArray } from 'react-hook-form';

import { AddAndEditCompanyFormState } from '../../../models/companies.types';
import { useCreateAdminCompanyMutation, useUpdateAdminCompanyMutation } from '../../../redux/services/companiesApi';
import UploadImageForCompany from './UploadImageForCompany';
import { toast } from 'react-toastify';

type Props = {
  company: CompanyInfo;
  isEditing: boolean;
  companyId?: string;
};

export type CompanyInfo = {
  name: string;
  category: string;
  description: string;
  location: string;
  pricing: {
    price: number;
    plan: string;
  }[];
  phone: string;
  website: string;
  imageUrl: string;
};

export default function AddAndEditForm({ company, isEditing, companyId }: Props) {
  const handleFormState: CompanyInfo = {
    name: company.name || '',
    category: company.category || '',
    description: company.description || '',
    location: company.location || '',
    pricing: company.pricing || [],
    phone: company.phone || '',
    website: company.website || '',
    imageUrl: company.imageUrl || '',
  };
  const { handleSubmit, register, control } = useForm<AddAndEditCompanyFormState>({
    defaultValues: { ...handleFormState },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'pricing',
    control,
  });

  const [createAdminCompany, { error }] = useCreateAdminCompanyMutation();
  const [updateAdminCompany] = useUpdateAdminCompanyMutation();

  function onSubmit(formData: CompanyInfo) {
    console.log(formData);
    if (isEditing && companyId) {
      updateAdminCompany({ company: formData, id: companyId });
      return toast.success('Instalacion actualizada');
    } else {
      createAdminCompany(formData);

      return toast.success('Instalacion creada');
    }
  }

  return (
    <div>
      <UploadImageForCompany />
      {error && 'data' in error && <span className="form-error-msg">{error.data.msg}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          <span>Name</span>
          <input id="name" type="text" placeholder="name" {...register('name')} /> <br />
        </label>
        {/*  */}
        <label htmlFor="location">
          <span>Localizacion</span>
          <input type="text" placeholder="location" {...register('location')} /> <br />
        </label>
        {/*  */}
        <label htmlFor="category">
          <span>Categoria</span>
          <select {...register('category')} name="category" id="category">
            <option value="paintball">Paintball</option>
            <option value="airsoft">Airsoft</option>
            <option value="laser tag">Laser tag</option>
          </select>
        </label>
        <br />
        {/*  */}
        <label htmlFor="description">
          <span>Descripcion</span>
          <input type="text" placeholder="description" {...register('description')} /> <br />
        </label>
        {/*  */}
        <label htmlFor="phone">
          <span>Contacto</span>
          <input type="text" id="phone" placeholder="contacto" {...register('phone')} /> <br />
        </label>
        {/*  */}
        <label htmlFor="website">
          <span>Pagina web</span>
          <input type="text" id="website" placeholder="pagina web" {...register('website')} /> <br />
        </label>
        {/*  */}
        <label htmlFor="image">
          <span>Imagen debe obtener este formato /uploads/(nombre de la imagen)</span>
          <input type="text" id="image" placeholder=" image path" {...register('imageUrl')} /> <br />
        </label>
        {/*  */}
        <h5>Añadir plan y precio</h5>
        {fields.map((field, index) => {
          return (
            <div key={index}>
              <input placeholder="Aañadir plan" type="text" {...register(`pricing.${index}.plan`)} />
              <input type="number" {...register(`pricing.${index}.price`, { valueAsNumber: true })} />
              <button type="button" onClick={() => remove(index)}>
                Eliminar
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            append({
              plan: '',
              price: 0,
            });
          }}
        >
          Otro plan
        </button>
        <br />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
}
