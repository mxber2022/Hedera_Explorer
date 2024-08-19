import Image from "next/image";
import Nav from "./Components/Nav/Nav";
import Search from "./Components/Search/Search";
import LatestTransaction from "./Components/LatestTransaction/LatestTransaction";
import Footer from "./Components/Footer/Footer";
import HederaData from "./Components/HederaData/HederaData";
import { NetworkProvider } from '../app/Components/NetworkContext/NetworkContext';

export default function Home() {
  return (
   <>
   <NetworkProvider>
      <Nav/>
      <Search/>
      <HederaData/>
      <LatestTransaction/>
      <Footer/>
  </NetworkProvider>
   </>
  );
}

