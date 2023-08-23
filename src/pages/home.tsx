import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/organisms/ticket";
import { IntroHero } from "../components/organisms/introHero";
import { InputTextField } from "../components/molecules/inputTextField";
import { InputCheckboxField } from "../components/molecules/inputCheckboxField";
import { emptyValue } from "../helpers/globalConstants";

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
    const [gifterName, setGifterName] = useState("Someone");
    const [giftMessage, setGiftMessage] = useState("Happy Birthday! Can't wait to celebrate in style with some awesome seats at the baseball game.");

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setShowConfetti(isChecked);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emptyEncodedValue = encodeURIComponent(emptyValue); // for empty fields
        const encodedName = encodeURIComponent(eventName) || emptyEncodedValue;
        const encodedSubtitle = encodeURIComponent(eventSubtitle) || emptyEncodedValue;
        const encodedEventNumber = encodeURIComponent(eventNumber) || emptyEncodedValue;
        const encodedDescription = encodeURIComponent(eventDescription) || emptyEncodedValue;
        const encodedEventDate = encodeURIComponent(eventDate) || emptyEncodedValue;
        const encodedTime = encodeURIComponent(eventTime) || emptyEncodedValue;
        const encodedVenue = encodeURIComponent(eventVenue) || emptyEncodedValue;
        const encodedSection = encodeURIComponent(eventSection) || emptyEncodedValue;
        const encodedRow = encodeURIComponent(eventRow) || emptyEncodedValue;
        const encodedSeat = encodeURIComponent(eventSeat) || emptyEncodedValue;
        const encodedImgUrl = encodeURIComponent(imgUrl) || emptyEncodedValue;
        const encodedTicketColor = encodeURIComponent(ticketColor) || emptyEncodedValue;
        const encodedMessage = encodeURIComponent(giftMessage) || emptyEncodedValue;
        const encodeGifterName = encodeURIComponent(gifterName) || "Someone";
        const encodeMode = 'creatorMode' // default to creator mode on submit
        const longURL = `/results/${encodeMode}/${showConfetti}/${encodedName}/${encodedSubtitle}/${encodedEventNumber}/${encodedDescription}/${encodedEventDate}/${encodedTime}/${encodedVenue}/${encodedSection}/${encodedRow}/${encodedSeat}/${encodedImgUrl}/${encodedTicketColor}/${encodeGifterName}/${encodedMessage}`;
        navigate(longURL);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 lg:p-10">
            <div className="grid justify-center mt-10">
                <IntroHero />
            </div>
            <div className="flex flex-col md:flex-row items-center pb-20">
                <div className="flex-1 klg:w-1/2 px-4 lg:ml-10 mt-6 sm:mt-10 max-w-full w-full">
                    <form className="rounded-xl shadow-xl border border-white flex flex-col justify-between max-h-[300px] md:max-h-none overflow-y-scroll pb-4 bg-white bg-opacity-30 px-4 pt-3 mx-2 sm:px-6 sm:pt-4 animate-in fade-in zoom-in ease-in-out min-w-[250px]" onSubmit={handleSubmit}>
                        <div className="flex-grow overflow-y-scroll">
                            <InputTextField
                                label="Title *"
                                value={eventName}
                                callbackFn={setEventName}
                            />
                            <InputTextField
                                label="Subtitle"
                                required={false}
                                value={eventSubtitle}
                                callbackFn={setEventSubtitle}
                            />
                            <InputTextField
                                label="Event Number"
                                required={false}
                                value={eventNumber}
                                callbackFn={setEventNumber}
                            />
                            <InputTextField
                                label="Description"
                                required={false}
                                value={eventDescription}
                                callbackFn={setEventDescription}
                            />
                            <InputTextField
                                label="Date *"
                                value={eventDate}
                                callbackFn={setEventDate}
                            />
                            <InputTextField
                                label="Time"
                                required={false}
                                value={eventTime}
                                callbackFn={setEventTime}
                            />
                            <InputTextField
                                label="Venue *"
                                value={eventVenue}
                                callbackFn={setEventVenue}
                            />
                            <InputTextField
                                label="Section"
                                required={false}
                                value={eventSection}
                                callbackFn={setEventSection}
                            />
                            <InputTextField
                                label="Row"
                                required={false}
                                value={eventRow}
                                callbackFn={setEventRow}
                            />
                            <InputTextField
                                label="Seat(s)"
                                required={false}
                                value={eventSeat}
                                callbackFn={setEventSeat}
                            />
                            <InputTextField
                                label="Image URL"
                                required={false}
                                value={imgUrl}
                                callbackFn={setImgUrl}
                            />
                            <InputTextField
                                label="Ticket Color *"
                                value={ticketColor}
                                callbackFn={setTicketColor}
                            />
                            <InputTextField
                                label="Your Name"
                                required={false}
                                value={gifterName}
                                callbackFn={setGifterName}
                            />
                            <InputTextField
                                label="Gift Message"
                                required={false}
                                value={giftMessage}
                                callbackFn={setGiftMessage}
                            />
                            <InputCheckboxField
                                checked={showConfetti}
                                label="Show Confetti?"
                                onChangeFn={handleRadioChange}
                            />
                        </div>
                        <div className="flex items-center justify-center md:col-span-2 pt-4 md:pt-0">
                            <button className="bg-white px-6 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex-1 md:w-1/2 px-4 sm:mt-0 animate-in fade-in zoom-in ease-in-out mb-auto sticky top-4">
                    <h2 className="sm:hidden text-xl lg:text-3xl font-extrabold leading-tight text-center text-gray-800 mt-10">Preview</h2>
                    <div className="mt-4 sm:mt-10 mb-10">
                        <Ticket
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
        </div>
    );
}
