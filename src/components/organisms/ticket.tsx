import { isValidInput } from "../../helpers/isValidInput";

type TicketData = {
    eventName: string;
    eventSubtitle: string;
    eventNumber: string;
    eventDescription: string;
    eventDate: string;
    eventTime: string;
    eventVenue: string;
    eventSection: string;
    eventRow: string;
    eventSeat: string;
    imgUrl: string;
    ticketColor: string;
};

type TicketProps = {
    [key in keyof TicketData]?: string;
};

const Ticket = ({
    eventName,
    eventSubtitle,
    eventNumber,
    eventDescription,
    eventDate,
    eventTime,
    eventVenue,
    eventSection,
    eventRow,
    eventSeat,
    imgUrl,
    ticketColor
}: TicketProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="absolute bg-green-500 z-0"></div>
            <div className="max-w-md w-full h-auto mx-auto z-10">
                <div className="flex flex-col">
                    <div className="bg-white shadow-2xl rounded-2xl md:min-w-[365px]">
                        <div style={{ background: ticketColor }} className="border-t border-b border-dashed border-b-4 border-t-4 border-white relative px-6 py-6 m-4">
                            <div className="absolute rounded-full w-9 h-9 bg-white -mt-11 -left-4"></div>
                            <div className="absolute rounded-full w-9 h-9 bg-white -mt-11 -right-4"></div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-2xl font-bold uppercase">{eventName}</div>
                                {isValidInput(eventSubtitle) && <div className="text-sm text-gray-500 text-right">{eventSubtitle}</div>}
                            </div>
                            <div className="top --flex-column mb-4">
                                {isValidInput(imgUrl) && <img className="rounded-md shadow-2xl border-4 border-white" src={imgUrl} alt="venue" />}
                            </div>
                            <div className="flex flex-col lg:flex-row md:space-y-0 md:justify-between">
                                {isValidInput(eventNumber) && <h3 className="font-semibold text-lg pr-4 min-w-[100px]">{eventNumber}</h3>}
                                {isValidInput(eventDescription) && <p className="text-gray-600">{eventDescription}</p>}
                            </div>
                            <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between mt-4">
                                <div className="max-w-[160px]">
                                    <span className="text-sm">Date</span>
                                    <div className="font-semibold">{eventDate}</div>
                                </div>
                                {isValidInput(eventTime) && <div className="max-w-[160px]">
                                    <span className="text-sm">Time</span>
                                    {eventTime && <div className="font-semibold">{eventTime}</div>}
                                </div>}
                                <div className="max-w-[160px]">
                                    <span className="text-sm">Venue</span>
                                    <div className="font-semibold">{eventVenue}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between my-4">
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
