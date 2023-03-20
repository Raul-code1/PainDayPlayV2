import AddAndEditForm, { CompanyInfo } from '../components/AddAndEditForm';
export default function AdminAddCompany() {
  const handleFormState: CompanyInfo = {
    name: '',
    category: '',
    description: '',
    location: '',
    pricing: [{ plan: '', price: 0 }],
    phone: '',
    website: '',
    imageUrl: '/uploads/default.jpg',
  };

  return (
    <div>
      <AddAndEditForm isEditing={false} company={handleFormState} />
    </div>
  );
}
