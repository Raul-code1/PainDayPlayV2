type Props = {
  companyId: string;
};

export default function Comments({ companyId }: Props) {
  console.log(companyId);

  return <div>Comments</div>;
}
