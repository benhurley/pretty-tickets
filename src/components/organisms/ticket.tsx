type ExampleTicketData = {
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

type ExampleTicketProps = {
    [key in keyof ExampleTicketData]?: string;
};

const ExampleTicket = ({
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
}: ExampleTicketProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="absolute bg-green-500 z-0"></div>
            <div className="max-w-md w-full h-auto mx-auto z-10">
                <div className="flex flex-col">
                    <div className="bg-white shadow-2xl rounded-2xl">
                        <div style={{background: ticketColor}} className="border-t border-b border-dashed border-b-4 border-t-4 border-white relative px-6 py-6 m-4">
                            <div className="absolute rounded-full w-9 h-9 bg-white -mt-11 -left-4"></div>
                            <div className="absolute rounded-full w-9 h-9 bg-white -mt-11 -right-4"></div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-2xl font-semibold uppercase">{eventName}</div>
                                <div className="text-sm text-gray-500">{eventSubtitle}</div>
                            </div>
                            <div className="top --flex-column mb-4">
                                {imgUrl && <img className="rounded-md shadow-2xl border-4 border-white" src={imgUrl} alt="venue" />}
                            </div>
                            <div className="flex items-center">
                                {eventNumber && <h3 className="font-semibold text-lg pr-4 min-w-[100px]">{eventNumber}</h3>}
                                {eventDescription && <p className="text-gray-600">{eventDescription}</p>}
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="max-w-[160px]">
                                    <span className="text-sm">Date</span>
                                    <div className="font-semibold">{eventDate}</div>
                                </div>
                                <div className="max-w-[160px]">
                                    <span className="text-sm">Time</span>
                                    <div className="font-semibold">{eventTime}</div>
                                </div>
                                <div className="max-w-[160px]">
                                    <span className="text-sm">Venue</span>
                                    <div className="font-semibold">{eventVenue}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between my-4">
                                <div>
                                    <span className="text-sm">Section</span>
                                    <div className="font-semibold">{eventSection}</div>
                                </div>
                                <div>
                                    <span className="text-sm">Row</span>
                                    <div className="font-semibold">{eventRow}</div>
                                </div>
                                <div>
                                    <span className="text-sm">Seat(s)</span>
                                    <div className="font-semibold">{eventSeat}</div>
                                </div>
                            </div>
                            <div className="absolute rounded-full w-9 h-9 bg-white mt-1 -left-4"></div>
                            <div className="absolute rounded-full w-9 h-9 bg-white mt-1 -right-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default ExampleTicket;
