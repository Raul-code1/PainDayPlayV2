/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useUploadImageCompanyMutation } from '../../../redux/services/companiesApi';

type FormData = {
  image: FileList;
};

export default function UploadImageForCompany() {
  const { register, handleSubmit } = useForm<FormData>();
  const [uploadImageCompany, { error, data }] = useUploadImageCompanyMutation();

  function onSubmit(data: FormData) {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    uploadImageCompany(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('image')} type="file" name="image" />
      {error && 'data' in error && <span className="form-error-msg">{error.data.msg}</span>}
      {data && (
        <p>
          Url para copiar imagen: <span>{data.imageUrl}</span>
        </p>
      )}
      <button>subir imagen</button>
    </form>
  );
}
