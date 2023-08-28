import { isValidInput } from "../../helpers/isValidInput";
import Linen from "../atoms/ticketTextures/linen.png";

type TicketData = {
    eventName: string;
    eventSubtitle: string;
    eventDescription: string;
    eventDate: string;
    eventTime: string;
    eventVenue: string;
    eventSection: string;
    eventRow: string;
    eventSeat: string;
    imgUrl: string;
    ticketColor: string;
    textColor: string;
    ticketTexture: string;
    font: string;
};

type TicketProps = {
    [key in keyof TicketData]?: string | undefined | null;
};

const Ticket = ({
    eventName,
    eventSubtitle,
    eventDescription,
    eventDate,
    eventTime,
    eventVenue,
    eventSection,
    eventRow,
    eventSeat,
    imgUrl,
    ticketColor,
    textColor,
    ticketTexture,
    font,
}: TicketProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="absolute bg-green-500 z-0"></div>
            <div className="max-w-md w-full h-auto mx-auto z-10">
                <div className="flex flex-col">
                    <div className="bg-white shadow-2xl rounded-2xl md:min-w-[365px]">
                        <div
                            style={{
                                backgroundColor: ticketColor || "#EEEEEE",
                                backgroundImage: ticketTexture ? `url(${ticketTexture})` : `url(${Linen})`,
                                backgroundBlendMode: "multiply", // Blend the color and texture
                                backgroundRepeat: "no-repeat",
                                fontFamily: font || "sans-serif",
                            }}
                            className="border-t border-b border-dashed border-b-4 border-t-4 border-white relative px-6 py-6 m-4"
                        >
                            <div className="absolute rounded-full w-9 h-9 bg-white -mt-11 -left-4"></div>
                            <div className="absolute rounded-full w-9 h-9 bg-white -mt-11 -right-4"></div>
                            <div className="flex items-center justify-between mb-4">
                                <div style={{ color: textColor || "#000" }} className="text-2xl font-bold">{eventName}</div>
                                {isValidInput(eventSubtitle) && <div style={{ color: textColor || "#000" }} className="text-sm text-gray-500 text-right">{eventSubtitle}</div>}
                            </div>
                            <div className="top --flex-column mb-4">
                                {isValidInput(imgUrl) && <img className="rounded-md shadow-2xl border-4 border-white" src={imgUrl || ""} alt="venue" />}
                            </div>
                            <div className="flex flex-col lg:flex-row md:space-y-0 md:justify-between">
                                {isValidInput(eventDescription) && <p style={{ color: textColor || "#000" }} className="text-gray-600">{eventDescription}</p>}
                            </div>
                            <div style={{ color: textColor || "#000" }} className="flex space-y-2 flex-row justify-between mt-4">
                                <div>
                                    <span className="text-sm">Date</span>
                                    <div className="font-semibold">{eventDate}</div>
                                </div>
                                {isValidInput(eventTime) && <div>
                                    <span className="text-sm">Time</span>
                                    {eventTime && <div className="font-semibold">{eventTime}</div>}
                                </div>}

                            </div>
                            <div style={{ color: textColor || "#000" }} className="flex flex-col space-y-2 mb-6">
                                <div>
                                    <span className="text-sm">Venue</span>
                                    <div className="font-semibold">{eventVenue}</div>
                                </div>
                            </div>
                            <div style={{ color: textColor || "#000" }} className="flex items-center justify-around my-4">
                                {isValidInput(eventSection) && <div>
                                    <span className="text-sm">Section</span>
                                    {eventSection && <div className="font-semibold">{eventSection}</div>}
                                </div>}
                                {isValidInput(eventRow) && <div>
                                    <span className="text-sm">Row</span>
                                    {eventRow && <div className="font-semibold">{eventRow}</div>}
                                </div>}
                                {isValidInput(eventSeat) && <div>
                                    <span className="text-sm">Seat(s)</span>
                                    {eventSeat && <div className="font-semibold">{eventSeat}</div>}
                                </div>}
                            </div>
                            <div className="absolute rounded-full w-9 h-9 bg-white mt-1 -left-4"></div>
                            <div className="absolute rounded-full w-9 h-9 bg-white mt-1 -right-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default Ticket;
