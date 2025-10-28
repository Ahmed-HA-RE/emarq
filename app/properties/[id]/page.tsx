const PropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return <div>Property Page {(await params).id}</div>;
};

export default PropertyPage;
