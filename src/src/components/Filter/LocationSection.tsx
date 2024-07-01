export default function LocationSection({
  locations,
  selectedLocations,
  onLocationClick,
  onRemoveLocation,
}: {
  locations: string[];
  selectedLocations: string[];
  onLocationClick: (location: string) => void;
  onRemoveLocation: (location: string) => void;
}) {
  return (
    <div className="flex flex-col gap-16px">
      <p>위치</p>
      <div className="p-36px border border-solid rounded-6px grid grid-cols-2 gap-32px overflow-y-scroll h-280px">
        {locations.map((item) => (
          <button
            key={item}
            type="button"
            className="text-14px"
            onClick={() => onLocationClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-8px">
        {selectedLocations.map((location) => (
          <div
            key={location}
            className="flex items-center bg-red10 text-custom-orange px-10px py-6px rounded-20px font-bold text-14px"
          >
            {location}
            <button
              className="ml-2 text-custom-orange"
              onClick={() => onRemoveLocation(location)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
