"use client";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { AiFillStar, AiFillPhone } from "react-icons/ai";
import { BiMap } from "react-icons/bi";

function List({
  isFetching,
  setType,
  setRating,
  type,
  data,
  isOpen,
  setIsOpen,
  scrollView,
}: {
  isFetching: boolean;
  setType: (x: string) => void;
  setRating: (x: string) => void;
  type: string | undefined;
  data: any;
  isOpen: string;
  setIsOpen: (x: string) => void;
  scrollView: string;
}) {
  useEffect(() => {
    document?.getElementById("unic-st")?.scroll(0, 0);
  }, [isFetching, data]);

  if (scrollView)
    document.querySelector(`[data-scroll="${scrollView}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <div className="w-[40%] p-4 flex flex-col gap-4 relative">
      <h1 className="text-2xl text-center">
        Restaurants, Hotels & Attractions around you
      </h1>

      <div className="flex gap-2 mx-auto my-0">
        <select
          className={`border-transparent border-b-zinc-700 border pb-0.5 outline-none ${
            type ? null : "text-gray-500"
          }`}
          onChange={(e) => setType(e.target.value)}
        >
          <option defaultValue="" selected disabled>
            Type
          </option>
          <option
            disabled={isFetching}
            className={`${!isFetching ? "text-black" : "text-gray-500"}`}
            value="restaurants"
          >
            Restaurants
          </option>
          <option
            disabled={isFetching}
            className={`${!isFetching ? "text-black" : "text-gray-500"}`}
            value="hotels"
          >
            Hotel
          </option>
          <option
            disabled={isFetching}
            className={`${!isFetching ? "text-black" : "text-gray-500"}`}
            value="attractions"
          >
            Attractions
          </option>
        </select>

        <select
          className={`border-transparent border-b-zinc-700 border pb-0.5 outline-none ${
            type ? null : "text-gray-500"
          }`}
          onChange={(e) => setRating(e.target.value)}
        >
          <option defaultValue="" selected disabled>
            Rating
          </option>
          <option
            disabled={isFetching}
            value="all"
            className={`${!isFetching ? "text-black" : "text-gray-500"}`}
          >
            All
          </option>
          <option
            className={`${!isFetching ? "text-black" : "text-gray-500"}`}
            disabled={isFetching}
            value={3}
          >
            Above 3.0
          </option>
          <option
            className={`${!isFetching ? "text-black" : "text-gray-500"}`}
            value={4}
            disabled={isFetching}
          >
            Above 4.0
          </option>
          <option
            className={`${!isFetching ? "text-black" : "text-gray-500"}`}
            value={4.5}
            disabled={isFetching}
          >
            Above 4.5
          </option>
        </select>

        <div
          className="flex items-center gap-1 text-base cursor-pointer"
          onClick={(e) => {
            if (!isFetching) {
              if (isOpen === "true") setIsOpen("false");
              else setIsOpen("true");
            }
          }}
        >
          Open
          <button
            className="relative w-3 h-3 p-2 border border-zinc-900 rounded-full"
            onClick={(e) => {
              if (!isFetching) {
                if (isOpen === "true") setIsOpen("false");
                else setIsOpen("true");
              }
            }}
          >
            {isOpen === "true" ? (
              <div className="absolute bg-[#2444b7] w-2 h-2 rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
            ) : null}
          </button>
        </div>
      </div>

      {isFetching ? (
        <ClipLoader className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
      ) : (
        <div
          id="unic-st"
          className={`${
            data?.length ? "overflow-y-scroll" : "overflow-y-hidden"
          } p-3 pr-0 relative`}
        >
          {data?.length ? (
            data.map((el: any, i: number) => {
              return (
                <div
                  data-scroll={i}
                  key={i}
                  className={`${data.at(-1) !== data[i] && "mb-3"}`}
                >
                  {el.img ? (
                    <img
                      src={el.img}
                      alt={el.name}
                      className="w-full h-[16rem]"
                    />
                  ) : (
                    <div className="w-full h-[16rem] flex items-center justify-center">
                      <p className="text-lg text-[#09133a]">
                        No Image to Show 😥
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-1 shadow-lg p-2">
                    <h3 className="text-base font-medium pb-2">{el.name}</h3>

                    <div className="flex justify-between">
                      <div className="flex gap-1 items-center">
                        <AiFillStar className="text-orange-600 text-xl" />

                        <p>{el.rating ? el.rating : 0}</p>
                      </div>

                      <p className="text-sm text-gray-600">
                        {el.reviews} reviews
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Price</p>

                      <p className="text-gray-600">
                        {el.priceLevel ? el.priceLevel : "$$"}
                      </p>
                    </div>

                    {el.ranking ? (
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Ranking</p>

                        <p className="text-sm">{el.ranking}</p>
                      </div>
                    ) : null}

                    {el.address ? (
                      <div className="flex justify-between items-center">
                        <BiMap className="text-2xl" />

                        <p
                          className={`text-sm text-gray-600 ${
                            el.address.length > 60 ? "text-[0.6rem]" : "text-sm"
                          }`}
                        >
                          {el.address}
                        </p>
                      </div>
                    ) : null}

                    {el.phone ? (
                      <div className="flex justify-between">
                        <AiFillPhone className="text-2xl" />

                        <p className="text-sm text-gray-600">{el.phone}</p>
                      </div>
                    ) : null}

                    {el.web || el.webReview ? (
                      <div className="mt-3 flex gap-2">
                        {el.webReview ? (
                          <a
                            className="text-sm text-gray-600"
                            href={el.webReview}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            TRIP ADVISOR
                          </a>
                        ) : null}

                        {el.web ? (
                          <a
                            className="text-sm text-gray-600"
                            href={el.web}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            WEBSITE
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-lg font-medium text-center mt-6">
              No content to show
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default List;
