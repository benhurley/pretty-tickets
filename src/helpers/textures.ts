import Linen from "../components/atoms/ticketTextures/linen.webp";
import Vertical from "../components/atoms/ticketTextures/vertical.webp";
import Recycled from "../components/atoms/ticketTextures/recycled.webp";
import Weathered from "../components/atoms/ticketTextures/weathered.webp";
import Wrinkled from "../components/atoms/ticketTextures/wrinkled.webp";
import Horizontal from "../components/atoms/ticketTextures/horizontal.webp";
import Marble from "../components/atoms/ticketTextures/marbled.webp";
import Wood from "../components/atoms/ticketTextures/wood.webp";
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