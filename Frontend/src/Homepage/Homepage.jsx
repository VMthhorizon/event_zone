import NavbarHome from "./NavbarHomepage/NavbarHome";
import EventCard from "./EventCard/EventCard";

function Homepage() {
  return (
    <div className="flex-column">
      <NavbarHome />
      <EventCard />
    </div>
  );
}

export default Homepage;
