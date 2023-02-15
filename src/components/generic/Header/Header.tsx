"use client";
import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setCoords } from "@/redux/slices/coordsSlice";
import { RxMagnifyingGlass } from "react-icons/rx";

function Header() {
  const coords = useSelector((state: any) => state.coords);
  const dispatch = useDispatch();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [isGoogle, setIgGoogle] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
      if (typeof google !== "undefined") setIgGoogle(true);
  }, [coords]);

  const onLoad = (autoC: any) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete instanceof google.maps.places.Autocomplete) {
      const lat = autocomplete.getPlace()?.geometry?.location?.lat();
      const lng = autocomplete.getPlace()?.geometry?.location?.lng();

      setInputValue("");
      dispatch(
        setCoords({
          lat,
          lng,
        })
      );
    }
  };

  return (
    <header className="bg-[#2444b7] sticky top-0 py-4 px-6 grid grid-flow-col justify-between items-center">
      <div className="text-white text-xl">
        <h2 className="cursor-pointer">Travel Advisor</h2>
      </div>

      <div className="flex items-center justify-end gap-4">
        <h4 className="text-white font-medium text-lg">Explore new places</h4>

        {isGoogle ? (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="flex gap-2 items-center bg-white/30 backdrop-blur-lg rounded-sm px-2 py-[0.10rem]">
              <RxMagnifyingGlass className="text-white text-xl" />

              <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                className="bg-transparent text-white outline-none placeholder:text-white/50 placeholder:font-light text-base"
                placeholder="Search..."
              />
            </div>
          </Autocomplete>
        ) : (
          <div>
            <div className="flex gap-2 items-center bg-white/30 backdrop-blur-lg rounded-sm px-2 py-[0.10rem]">
              <RxMagnifyingGlass className="text-white text-xl" />

              <input
                disabled
                type="text"
                className="bg-transparent text-white outline-none placeholder:text-white/50 placeholder:font-light text-base"
                placeholder="Search..."
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
