'use client';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useState } from 'react';
import { TProperty } from 'type';

const PropertyMap = ({ property }: { property: TProperty }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLon] = useState(0);

  const url = process.env.NEXT_PUBLIC_LOCATIONIQ_URL;
  const apiKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const res = await fetch(
          `${url}?key=${apiKey}&q=${property.location.street} ${property.location.city}&format=json`
        );

        const data = await res.json();
        const { lat, lon } = data[0];
        setLat(+lat);
        setLon(+lon);
      } catch (error) {
        console.log(error);
      }
    };
    getCoordinates();
  }, [url, apiKey, property.location.city, property.location.street]);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style:
        'https://tiles.locationiq.com/v3/streets/vector.json?key=pk.8f4156856d305e0199d10b06063887bd',
      center: [lng, lat],
      zoom: 12,
    });

    const marker = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map);
  }, [lng, lat]);

  return <div id='map' className='h-[400px] w-full'></div>;
};

export default PropertyMap;
