import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExampleTicket from "../components/organisms/ticket";

export const Home = () => {
    const navigate = useNavigate();
    const [eventName, setEventName] = useState('2023 World Series');
    const [eventSubtitle, setEventSubtitle] = useState('VIP Entry Ticket');
    const [eventNumber, setEventNumber] = useState('Game 3');
    const [eventDescription, setEventDescription] = useState(`New York Yankees vs Arizona Diamondbacks`);
    const [eventDate, setEventDate] = useState('Oct 09, 2023');
    const [eventTime, setEventTime] = useState('7PM');
    const [eventVenue, setEventVenue] = useState('Yankee Stadium');
    const [eventSection, setEventSection] = useState('415');
    const [eventRow, setEventRow] = useState('J');
    const [eventSeat, setEventSeat] = useState('7');
    const [imgUrl, setImgUrl] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F513e03a1e4b00efcff5aa03d%2F1370532403248-B7JTN2CASB1LWM5YWSX1%2Fke17ZwdGBToddI8pDm48kNVjfR5kDa6jbBkrq_LoDDF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3zXOvpZoLj-zrwUcoeghK_zqqXjS3CfNDSuuf31e0tVH8gayrKhTJ_a0qjpge_-3DaDV-2eBmFlp-ifSeZPc-_8SfgUBqPeJJSwQPE1X-OZQ%2FWorld_Champions_2009_Yankees.jpg&f=1&nofb=1&ipt=5f1b17a6d83003b9466b21e94cf8f41b4571bdf4097080dd18b10bbe3d77f0b1&ipo=images')
    const [ticketColor, setTicketColor] = useState('#EEEEEE')
    const [showConfetti, setShowConfetti] = useState(true);
    const [gifterName, setGifterName] = useState("Ben");
    const [giftMessage, setGiftMessage] = useState("Happy Birthday! Can't wait to celebrate in style at the baseball game.");

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setShowConfetti(isChecked);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const encodedName = encodeURIComponent(eventName);
        const encodedSubtitle = encodeURIComponent(eventSubtitle);
        const encodedEventNumber = encodeURIComponent(eventNumber);
        const encodedDescription = encodeURIComponent(eventDescription);
        const encodedEventDate = encodeURIComponent(eventDate);
        const encodedTime = encodeURIComponent(eventTime);
        const encodedVenue = encodeURIComponent(eventVenue);
        const encodedSection = encodeURIComponent(eventSection);
        const encodedRow = encodeURIComponent(eventRow);
        const encodedSeat = encodeURIComponent(eventSeat);
        const encodedImgUrl = encodeURIComponent(imgUrl);
        const encodedTicketColor = encodeURIComponent(ticketColor);
        const encodedMessage = encodeURIComponent(giftMessage);
        const encodeGifterName = encodeURIComponent(gifterName);
        const encodeMode = 'creatorMode' // default to creator mode on submit
        const longURL = `/results/${showConfetti}/${encodedName}/${encodedSubtitle}/${encodedEventNumber}/${encodedDescription}/${encodedEventDate}/${encodedTime}/${encodedVenue}/${encodedSection}/${encodedRow}/${encodedSeat}/${encodedImgUrl}/${encodedTicketColor}/${encodeGifterName}/${encodedMessage}/${encodeMode}`;
        navigate(longURL);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 lg:p-10 pb-20">
            <div className="flex-1 klg:w-1/2 px-4 lg:ml-10">
                <div className="pl-4 mb-6 animate-in fade-in zoom-in ease-in-out mt-20 sm:mt-16 sm:mb-8">
                    <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-center text-gray-700 mb-2 inline-block">
                        Pretty Tickets
                    </h1>
                    <img className="inline-block ml-2 -mt-10" width={75} src="/logo128.png" alt="ticket" />
                    <h2 className="text-[20px] text-gray-700 font-bold italic">Elevate Your Ticketing Experience</h2>
                    <p className="my-6 sm:my-8">Transform that ordinary event booking into an elegant, tailor-made online ticket that's perfect for gifting and sharing.</p>

                    <p className="mb-1"><b>1. Customize:</b> Input event details and add a personal touch.</p>
                    <p className="mb-1"><b>2. Preview:</b> Get a real-time look at your stylish ticket before finalizing.</p>
                    <p className="mb-1"><b>3. Share:</b> Create a unique link and send your beautiful ticket to its lucky recipient.</p>

                </div>
                <form className="rounded-xl shadow-xl border border-white flex flex-col justify-between max-h-[240px] md:max-h-[300px] overflow-y-scroll pb-4 bg-white bg-opacity-30 px-4 pt-3 sm:px-4 sm:pt-4 animate-in fade-in zoom-in ease-in-out min-w-[250px]" onSubmit={handleSubmit}>
                    <div className="flex-grow overflow-y-scroll">
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Title</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Subtitle</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventSubtitle}
                                onChange={(e) => setEventSubtitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Number (optional)</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventNumber}
                                onChange={(e) => setEventNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Description</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Date</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Time</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Venue</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventVenue}
                                onChange={(e) => setEventVenue(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Section</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventSection}
                                onChange={(e) => setEventSection(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Row</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventRow}
                                onChange={(e) => setEventRow(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Seat(s)</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={eventSeat}
                                onChange={(e) => setEventSeat(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Image URL</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Ticket Color</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={ticketColor}
                                onChange={(e) => setTicketColor(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Your Name</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={gifterName}
                                onChange={(e) => setGifterName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Gift Message</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                                type="text"
                                value={giftMessage}
                                onChange={(e) => setGiftMessage(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <div>
                                <label className="font-bold pr-2">Show Confetti?</label>
                            </div>
                            <input
                                className="py-0.5 px-1 rounded shadow-xl"
                                type="checkbox"
                                name="confetti"
                                value="show"
                                checked={showConfetti}
                                onChange={handleRadioChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center md:col-span-2 pt-4">
                        <button className="bg-white px-6 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex-1 md:w-1/2 px-4 mt-12 sm:mt-0 animate-in fade-in zoom-in ease-in-out">
                <h2 className="text-xl lg:text-3xl font-extrabold leading-tight text-center text-gray-700 sm:mt-20">Preview</h2>
                <div className="mt-4 mb-10">
                    <ExampleTicket
                        eventName={eventName}
                        eventSubtitle={eventSubtitle}
                        eventDescription={eventDescription}
                        eventNumber={eventNumber}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        eventVenue={eventVenue}
                        eventSection={eventSection}
                        eventRow={eventRow}
                        eventSeat={eventSeat}
                        imgUrl={imgUrl}
                        ticketColor={ticketColor}
                    />
                </div>
            </div>
        </div>
    );
}
