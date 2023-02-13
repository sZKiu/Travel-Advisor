"use client";
import React, { useState, useEffect } from "react";
import Map from "../Map/Map";
import List from "../List/List";
import { useDispatch } from "react-redux";
import { setCoords } from "@/redux/slices/coordsSlice";
import getTravelPoints from "../../../service/getTravelPoints";
import { useGetTravelPointsQuery } from "../../../redux/service/travelAdvisor";

function ContainerHome() {
  const dispatch = useDispatch();
  const [bounds, setBounds] = useState({
    ne: {
      lat: 0,
      lng: 0,
    },
    sw: {
      lat: 0,
      lng: 0,
    },
  });
  const [type, setType] = useState<string | undefined>("restaurants");
  const [rating, setRating] = useState<string>();
  const [isOpen, setIsOpen] = useState("false");
  const [scrollView, setScrollView] = useState("");
  const [dataRating, setDataRating] = useState();
  const { data, isFetching, error } = useGetTravelPointsQuery({
    type: type,
    ne: bounds.ne,
    sw: bounds.sw,
  });
  let newData: any;
  if (data) newData = getTravelPoints(data.data);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      dispatch(
        setCoords({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
        })
      );
    });
  }, []); //eslint-disable-line

  useEffect(() => {
    setScrollView("");
    if (isOpen === "true") {
      const openData = newData?.filter((el: any) =>
        el?.isClosed?.includes("Open")
      );

      setDataRating(data);
      if (rating === "3") {
        const openNewdata = openData.filter((el: any) => el.rating >= rating);
        setDataRating(openNewdata);
      } else if (rating === "4") {
        const openNewdata = openData.filter((el: any) => el.rating >= rating);
        setDataRating(openNewdata);
      } else if (rating === "4.5") {
        const openNewdata = openData.filter((el: any) => el.rating >= rating);
        setDataRating(openNewdata);
      } else {
        setDataRating(openData);
      }
    } else {
      if (rating === "3") {
        const data = newData.filter((el: any) => el.rating >= rating);
        setDataRating(data);
      } else if (rating === "4") {
        const data = newData.filter((el: any) => el.rating >= rating);
        setDataRating(data);
      } else if (rating === "4.5") {
        const data = newData.filter((el: any) => el.rating >= rating);
        setDataRating(data);
      } else {
        setDataRating(newData);
      }
    }
  }, [rating, isOpen, data]); //eslint-disable-line

  return (
    <>
      <List
        isFetching={isFetching}
        type={type}
        setType={setType}
        setRating={setRating}
        data={dataRating}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        scrollView={scrollView}
      />

      <Map
        setBounds={setBounds}
        data={dataRating}
        setScrollView={setScrollView}
      />
    </>
  );
}

export default ContainerHome;

// import React, { useState, useEffect } from "react";
// import Map from "../Map/Map";
// import List from "../List/List";
// import getTravelPoints from "../../../service/getTravelPoints";
// import { useGetTravelPointsQuery } from "../../../redux/service/travelAdvisor";

// function ContainerHome() {
//   const [position, setPosition] = useState({
//     lat: 0,
//     lng: 0,
//   });
//   const [bounds, setBounds] = useState({
//     ne: {
//       lat: 0,
//       lng: 0,
//     },
//     sw: {
//       lat: 0,
//       lng: 0,
//     },
//   });
//   const [type, setType] = useState<string | undefined>("restaurants");
//   const [rating, setRating] = useState<string>();
//   const [isOpen, setIsOpen] = useState("false");
//   const [scrollView, setScrollView] = useState("");
//   const [dataRating, setDataRating] = useState();
//   const { data, isFetching, error } = useGetTravelPointsQuery({
//     type: type,
//     ne: bounds.ne,
//     sw: bounds.sw,
//   });
//   let newData: any;
//   if (data) newData = getTravelPoints(data.data);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((e) => {
//       setPosition({
//         lat: e.coords.latitude,
//         lng: e.coords.longitude,
//       });
//     });
//   }, []);

//   useEffect(() => {
//     setScrollView("");
//     if (isOpen === "true") {
//       const openData = newData?.filter((el: any) =>
//         el?.isClosed?.includes("Open")
//       );

//       setDataRating(data);
//       if (rating === "3") {
//         const openNewdata = openData.filter((el: any) => el.rating >= rating);
//         setDataRating(openNewdata);
//       } else if (rating === "4") {
//         const openNewdata = openData.filter((el: any) => el.rating >= rating);
//         setDataRating(openNewdata);
//       } else if (rating === "4.5") {
//         const openNewdata = openData.filter((el: any) => el.rating >= rating);
//         setDataRating(openNewdata);
//       } else {
//         setDataRating(openData);
//       }
//     } else {
//       if (rating === "3") {
//         const data = newData.filter((el: any) => el.rating >= rating);
//         setDataRating(data);
//       } else if (rating === "4") {
//         const data = newData.filter((el: any) => el.rating >= rating);
//         setDataRating(data);
//       } else if (rating === "4.5") {
//         const data = newData.filter((el: any) => el.rating >= rating);
//         setDataRating(data);
//       } else {
//         setDataRating(newData);
//       }
//     }
//   }, [rating, isOpen, data]); //eslint-disable-line

//   return (
//     <>
//       <List
//         isFetching={isFetching}
//         type={type}
//         setType={setType}
//         setRating={setRating}
//         data={dataRating}
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         scrollView={scrollView}
//       />

//       <Map
//         coords={position}
//         setBounds={setBounds}
//         data={dataRating}
//         setCordinates={setPosition}
//         setScrollView={setScrollView}
//       />
//     </>
//   );
// }

// export default ContainerHome;
