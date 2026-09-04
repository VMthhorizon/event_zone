// Gestione del badge sulle card in base al tipo di evento di evento
export const badgeColor = (eventType) => {
  switch (eventType) {
    case "CONCERTO":
      return "badge-color-concerto";
    case "CINEMA":
      return "badge-color-cinema";
    case "FESTIVAL":
      return "badge-color-festival";
    case "TEATRO":
      return "badge-color-teatro";
    default:
      return "bg-black";
  }
};
