import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

export default function AppLayout() { //Defines layout
  return (
    <>
      <Navbar /> {/*Navbar gets loaded here from the components*/}
      <main style={{ padding: 20 }}> {/*Main gets loaded here (depends on the page)*/}
        <Outlet />
      </main>
      {/*Footer gets loaded here from the components (once created)*/} 
    </>
  );
}