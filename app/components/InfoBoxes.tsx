import InfoBox from './InfoBox';
const InfoBoxes = () => {
  return (
    <section className='px-4 mt-8'>
      <div className='container grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4'>
        <InfoBox
          title='For Renters'
          description='Find your dream rental property. Bookmark properties and contact owners.'
          button={{
            label: 'Browse Properties',
            href: '/properties',
            bg: 'bg-black',
            bg_hover: 'hover:bg-black/70',
          }}
        />
        <InfoBox
          title='For Property Owners'
          description='List your properties and reach potential tenants. Rent as an airbnb or long term.'
          button={{
            label: 'Add Property',
            href: '/properties/add',
            bg: 'bg-blue-500',
            bg_hover: 'hover:bg-blue-600',
          }}
        />
      </div>
    </section>
  );
};

export default InfoBoxes;
