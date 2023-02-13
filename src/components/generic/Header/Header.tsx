"use client";
import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setCoords } from "@/redux/slices/coordsSlice";
import { RxMagnifyingGlass } from "react-icons/rx";

function Header() {
  const dispatch = useDispatch();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [isGoogle, setIgGoogle] = useState(false);

  useEffect(() => {
    setIgGoogle(true);
  }, []);

  const onLoad = (autoC: any) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete instanceof google.maps.places.Autocomplete) {
      const lat = autocomplete.getPlace()?.geometry?.location?.lat();
      const lng = autocomplete.getPlace()?.geometry?.location?.lng();

      dispatch(
        setCoords({
          lat,
          lng,
        })
      );
    }
  };

  return (
    <header className="bg-[#2444b7] sticky top-0 p-4 grid grid-flow-col justify-between items-center">
      <div className="text-white text-xl">
        <h2>Travel Advisor</h2>
      </div>

      <div className="flex items-center justify-end gap-4">
        <h4 className="text-white font-medium text-lg">Explore new places</h4>

        {isGoogle ? (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="flex gap-2 items-center bg-white/30 backdrop-blur-lg rounded-md px-2 py-[0.15rem]">
              <RxMagnifyingGlass className="text-white text-xl" />

              <input
                type="text"
                className="bg-transparent text-white outline-none  placeholder:text-white/50 placeholder:font-light"
                placeholder="Search..."
              />
            </div>
          </Autocomplete>
        ) : (
          <div className="flex gap-2 items-center bg-white/30 backdrop-blur-lg rounded-md px-2 py-[0.15rem] w-[50%]">
            <RxMagnifyingGlass className="text-white text-xl" />

            <input
              disabled
              type="text"
              className="bg-transparent text-white outline-none placeholder:text-white/50 placeholder:font-light"
              placeholder="Search..."
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
