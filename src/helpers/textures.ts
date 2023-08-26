import Linen from "../components/atoms/ticketTextures/linen.png";
import Vertical from "../components/atoms/ticketTextures/vertical.png";
import Recycled from "../components/atoms/ticketTextures/recycled.png";
import Weathered from "../components/atoms/ticketTextures/weathered.png";
import Wrinkled from "../components/atoms/ticketTextures/wrinkled.png";
import Horizontal from "../components/atoms/ticketTextures/horizontal.png";
import Marble from "../components/atoms/ticketTextures/marbled.png";
import Wood from "../components/atoms/ticketTextures/wood.png";

const textures = [
    { name: "Linen", path: Linen }, 
    { name: "Horizontal Lines", path: Horizontal }, 
    { name: "Vertical Lines", path: Vertical }, 
    { name: "Recycled", path: Recycled }, 
    { name: "Weathered", path: Weathered }, 
    { name: "Wrinkled", path: Wrinkled }, 
    { name: "Marble", path: Marble }, 
    { name: "Wood", path: Wood }
];

export const getTextures = () => {
    return textures;
}