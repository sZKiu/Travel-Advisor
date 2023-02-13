'use client';
import Header from "@/components/generic/Header/Header";
import ContainerHome from "@/components/home/ContainerHome/ContainerHome";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Header />

        <main className="flex w-screen h-[88vh] p-2">
          <ContainerHome />
        </main>
      </Provider>
    </>
  );
}
