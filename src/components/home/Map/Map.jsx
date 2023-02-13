"use client";
import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector, useDispatch } from "react-redux";
import { setCoords } from "@/redux/slices/coordsSlice";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function Map({
  setBounds,
  data,
  setScrollView,
}) {
  const coords = useSelector((state) => state.coords);
  const dispatch = useDispatch();

  return (
    <div className="w-[60%]">
      {coords.lat === 0 ? null : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBUoBRAhpgOG3zD6_gtBqUBNqmZRP1MEik" }}
          center={coords}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          // options={""}
          onChange={(e) => {
            dispatch(
              setCoords({
                lat: e.center.lat,
                lng: e.center.lng,
              })
            );

            setBounds({
              ne: {
                lat: Number(e.marginBounds.ne.lat.toFixed(3)),
                lng: Number(e.marginBounds.ne.lng.toFixed(3)),
              },
              sw: {
                lat: Number(e.marginBounds.sw.lat.toFixed(3)),
                lng: Number(e.marginBounds.sw.lng.toFixed(3)),
              },
            });
          }}
          onChildClick={(e) => setScrollView(e)}
        >
          {data?.map((el, i) => {
            return (
              <div
                key={i}
                lat={Number(el.lat)}
                lng={Number(el.lng)}
                className="absolute -translate-x-[50%] -translate-y-[50%] z-[50] hover:z-[51] hover:scale-105 transition-transform duration-200 bg-white w-[6rem] p-2 shadow-lg flex items-center justify-center flex-col gap-2"
              >
                <h4 className="text-center text-sm">{el.name}</h4>
                {el.img ? (
                  <img src={el.img} alt={el.name} className="w-16 h-12" />
                ) : (
                  <div className="w-full h-6 flex items-center justify-center">
                    <p className="text-xs w-max text-[#09133a]">No Image</p>
                  </div>
                )}
                <div>
                  {Number(el.rating) >= 5 ? (
                    <div className="flex gap-1">
                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />
                    </div>
                  ) : Number(el.rating) >= 4.5 ? (
                    <div className="flex gap-1">
                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarHalf className="text-orange-600" />
                    </div>
                  ) : Number(el.rating) >= 4 ? (
                    <div className="flex gap-1">
                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />
                    </div>
                  ) : Number(el.rating) >= 3.5 ? (
                    <div className="flex gap-1">
                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarHalf className="text-orange-600" />
                    </div>
                  ) : Number(el.rating) >= 3 ? (
                    <div className="flex gap-1">
                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />
                    </div>
                  ) : Number(el.rating) >= 2.5 ? (
                    <div className="flex gap-1">
                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />

                      <BsStarHalf className="text-orange-600" />
                    </div>
                  ) : Number(el.rating) >= 1.5 ? (
                    <div className="flex gap-1">
                      <BsStarFill className="text-orange-600" />

                      <BsStarFill className="text-orange-600" />
                    </div>
                  ) : Number(el.rating) === 0 || !el.rating ? (
                    <BsStar />
                  ) : null}
                </div>
              </div>
            );
          })}
        </GoogleMapReact>
      )}
    </div>
  );
}

export default Map;

// import React from "react";
// import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
// import GoogleMapReact from "google-map-react";

// function Map({
//   coords,
//   setBounds,
//   setCordinates,
//   data,
//   setScrollView,
// }: {
//   coords: { lat: number; lng: number };
//   setBounds: (x: {
//     ne: { lat: number; lng: number };
//     sw: { lat: number; lng: number };
//   }) => void;
//   setCordinates: (x: { lat: number; lng: number }) => void;
//   data: any;
//   setScrollView: (x: any) => void;
// }) {
//   return (
//     <div className="w-[60%]">
//       {coords.lat === 0 ? null : (
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyBUoBRAhpgOG3zD6_gtBqUBNqmZRP1MEik" }}
//           center={coords}
//           defaultZoom={14}
//           margin={[50, 50, 50, 50]}
//           // options={""}
//           onChange={(e) => {
//             setCordinates({
//               lat: e.center.lat,
//               lng: e.center.lng,
//             });

//             setBounds({
//               ne: {
//                 lat: Number(e.marginBounds.ne.lat.toFixed(3)),
//                 lng: Number(e.marginBounds.ne.lng.toFixed(3)),
//               },
//               sw: {
//                 lat: Number(e.marginBounds.sw.lat.toFixed(3)),
//                 lng: Number(e.marginBounds.sw.lng.toFixed(3)),
//               },
//             });
//           }}
//           onChildClick={(e) => setScrollView(e)}
//         >
//           {data?.map((el: any, i: number) => {
//             return (
//               <div
//                 key={i}
//                 lat={Number(el.lat)}
//                 lng={Number(el.lng)}
//                 className="absolute -translate-x-[50%] -translate-y-[50%] z-[50] hover:z-[51] hover:scale-105 transition-transform duration-200 bg-white w-[6rem] p-2 shadow-lg flex items-center justify-center flex-col gap-2"
//               >
//                 <h4 className="text-center text-sm">{el.name}</h4>
//                 {el.img ? (
//                   <img src={el.img} alt={el.name} className="w-16 h-12" />
//                 ) : (
//                   <div className="w-full h-6 flex items-center justify-center">
//                     <p className="text-xs w-max text-[#09133a]">No Image</p>
//                   </div>
//                 )}
//                 <div>
//                   {Number(el.rating) >= 5 ? (
//                     <div className="flex gap-1">
//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />
//                     </div>
//                   ) : Number(el.rating) >= 4.5 ? (
//                     <div className="flex gap-1">
//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarHalf className="text-orange-600" />
//                     </div>
//                   ) : Number(el.rating) >= 4 ? (
//                     <div className="flex gap-1">
//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />
//                     </div>
//                   ) : Number(el.rating) >= 3.5 ? (
//                     <div className="flex gap-1">
//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarHalf className="text-orange-600" />
//                     </div>
//                   ) : Number(el.rating) >= 3 ? (
//                     <div className="flex gap-1">
//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />
//                     </div>
//                   ) : Number(el.rating) >= 2.5 ? (
//                     <div className="flex gap-1">
//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />

//                       <BsStarHalf className="text-orange-600" />
//                     </div>
//                   ) : Number(el.rating) >= 1.5 ? (
//                     <div className="flex gap-1">
//                       <BsStarFill className="text-orange-600" />

//                       <BsStarFill className="text-orange-600" />
//                     </div>
//                   ) : Number(el.rating) === 0 || !el.rating ? (
//                     <BsStar />
//                   ) : null}
//                 </div>
//               </div>
//             );
//           })}
//         </GoogleMapReact>
//       )}
//     </div>
//   );
// }

// export default Map;
