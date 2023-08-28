import Linen from "../components/atoms/ticketTextures/linen.png";
import Vertical from "../components/atoms/ticketTextures/vertical.png";
import Recycled from "../components/atoms/ticketTextures/recycled.png";
import Weathered from "../components/atoms/ticketTextures/weathered.png";
import Wrinkled from "../components/atoms/ticketTextures/wrinkled.png";
import Horizontal from "../components/atoms/ticketTextures/horizontal.png";
import Marble from "../components/atoms/ticketTextures/marbled.png";
import Wood from "../components/atoms/ticketTextures/wood.png";
const textures = [
    { name: "Linen", value: Linen },
    { name: "Horizontal Lines", value: Horizontal },
    { name: "Vertical Lines", value: Vertical },
    { name: "Recycled", value: Recycled },
    { name: "Weathered", value: Weathered },
    { name: "Wrinkled", value: Wrinkled },
    { name: "Marble", value: Marble },
    { name: "Wood", value: Wood }
];

export const getTextures = () => {
    return textures;
}