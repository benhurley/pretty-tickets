import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/organisms/ticket";
import { IntroHero } from "../components/organisms/introHero";
import { InputTextField } from "../components/molecules/inputTextField";
import { InputCheckboxField } from "../components/molecules/inputCheckboxField";
import { emptyValue } from "../helpers/globalConstants";
import { InputTextFieldWithAI } from "../components/molecules/inputTextFieldWithAI";
import { fetchGiftMessage } from "../helpers/fetchOpenAI";

export const Home = () => {
    const navigate = useNavigate();

    const [eventName, setEventName] = useState('2023 US Open Tennis');
    const [eventSubtitle, setEventSubtitle] = useState('VIP Entry');
    const [eventNumber, setEventNumber] = useState('Session 24');
    const [eventDescription, setEventDescription] = useState(`Women's Final/Mixed Doubles Final`);
    const [eventDate, setEventDate] = useState('Sept 09, 2023');
    const [eventTime, setEventTime] = useState('12PM');
    const [eventVenue, setEventVenue] = useState('Arthur Ashe Stadium');
    const [eventSection, setEventSection] = useState('415');
    const [eventRow, setEventRow] = useState('J');
    const [eventSeat, setEventSeat] = useState('7');

    const [imgUrl, setImgUrl] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.premierevents.co.uk%2Fuploads%2FSPORT%2FUS-OPEN-TICKETS.jpg&f=1&nofb=1&ipt=8ccc3e565c3de232fd6c07b21480dc8d62c0961bac1b70109dbdb347f5ad535a&ipo=images')
    const [ticketColor, setTicketColor] = useState('#e3ebe5')
    const [textColor, setTextColor] = useState('#000')

    const [showConfetti, setShowConfetti] = useState(true);
    const [gifterName, setGifterName] = useState("Someone secret");
    const [giftMessage, setGiftMessage] = useState(`"Happy Birthday! Can't wait to celebrate with you and finally see the pros face-off at The US Open."`);
    const [isLoadingAIGiftMessage, setIsLoadingAIGiftMessage] = useState(false);

    const handleStyleReset = (e: any) => {
        e.preventDefault();
        setImgUrl("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F513e03a1e4b00efcff5aa03d%2F1370532403248-B7JTN2CASB1LWM5YWSX1%2Fke17ZwdGBToddI8pDm48kNVjfR5kDa6jbBkrq_LoDDF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3zXOvpZoLj-zrwUcoeghK_zqqXjS3CfNDSuuf31e0tVH8gayrKhTJ_a0qjpge_-3DaDV-2eBmFlp-ifSeZPc-_8SfgUBqPeJJSwQPE1X-OZQ%2FWorld_Champions_2009_Yankees.jpg&f=1&nofb=1&ipt=5f1b17a6d83003b9466b21e94cf8f41b4571bdf4097080dd18b10bbe3d77f0b1&ipo=images")
        setTicketColor('#EEEEEE')
        setTextColor('#000')
    }

    const handleGenerateMessageWithAI = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsLoadingAIGiftMessage(true)
        const message = await fetchGiftMessage({
            eventName,
            eventSubtitle,
            eventNumber,
            eventDescription,
            eventDate,
            eventTime,
            eventVenue,
        })

        setIsLoadingAIGiftMessage(false)

        if (!!message) {
            setGiftMessage(message)
        }
    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setShowConfetti(isChecked);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
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
            ticketColor,
            textColor,
            giftMessage,
            gifterName,
            showConfetti,
        };
        sessionStorage.setItem('formData', JSON.stringify(formData));

        const queryParams = new URLSearchParams();
        queryParams.set('mode', 'creatorMode'); // default to creator mode on submit
        queryParams.set('showConfetti', showConfetti.toString());

        queryParams.set('eventName', eventName || emptyValue);
        queryParams.set('eventSubtitle', eventSubtitle || emptyValue);
        queryParams.set('eventNumber', eventNumber || emptyValue);
        queryParams.set('eventDescription', eventDescription || emptyValue);
        queryParams.set('eventDate', eventDate || emptyValue);
        queryParams.set('eventTime', eventTime || emptyValue);
        queryParams.set('eventVenue', eventVenue || emptyValue);
        queryParams.set('eventSection', eventSection || emptyValue);
        queryParams.set('eventRow', eventRow || emptyValue);
        queryParams.set('eventSeat', eventSeat || emptyValue);

        queryParams.set('imgUrl', imgUrl || emptyValue);
        queryParams.set('ticketColor', ticketColor || emptyValue);
        queryParams.set('textColor', textColor || emptyValue);
        queryParams.set('giftMessage', giftMessage || emptyValue);
        queryParams.set('gifterName', gifterName || 'Someone secret');

        const queryString = queryParams.toString();
        const longURL = `/results?${queryString}`;

        navigate(longURL);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Retrieve stored form data from sessionStorage
        const storedFormData = sessionStorage.getItem('formData');

        if (storedFormData) {
            const parsedFormData = JSON.parse(storedFormData);
            setEventName(parsedFormData.eventName);
            setEventSubtitle(parsedFormData.eventSubtitle);
            setEventNumber(parsedFormData.eventNumber);
            setEventDescription(parsedFormData.eventDescription);
            setEventDate(parsedFormData.eventDate);
            setEventTime(parsedFormData.eventTime);
            setEventVenue(parsedFormData.eventVenue);
            setEventSection(parsedFormData.eventSection);
            setEventRow(parsedFormData.eventRow);
            setEventSeat(parsedFormData.eventSeat);
            setImgUrl(parsedFormData.imgUrl);
            setTicketColor(parsedFormData.ticketColor);
            setTextColor(parsedFormData.textColor);
            setGiftMessage(parsedFormData.giftMessage);
            setGifterName(parsedFormData.gifterName);
            setShowConfetti(parsedFormData.showConfetti);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 lg:p-10">
            <div className="grid justify-center my-10">
                <IntroHero />
            </div>
            <div className="flex flex-col md:flex-row items-center pb-20 max-w-[1440px] mx-auto">
                <div className="flex-1 klg:w-1/2 px-4 lg:ml-10 mt-6 sm:mt-10 max-w-full w-full">
                    <form className="rounded-xl shadow-xl border border-white flex flex-col justify-between max-h-[300px] md:max-h-none overflow-y-scroll pb-4 bg-white bg-opacity-30 px-4 pt-3 mx-2 sm:px-6 sm:pt-4 animate-in fade-in zoom-in ease-in-out min-w-[250px]" onSubmit={handleSubmit}>
                        <div className="flex-grow overflow-y-scroll">
                            <div className="mt-2">
                                <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-center text-gray-800">Event Information</h3>
                                <InputTextField
                                    label="Title*"
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
                                    label="Date*"
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
                                    label="Venue*"
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
                            </div>
                            <div className="my-8">
                                <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-center text-gray-800">Ticket Design</h3>
                                <InputTextField
                                    label="Image URL"
                                    required={false}
                                    value={imgUrl}
                                    callbackFn={setImgUrl}
                                />
                                <InputTextField
                                    label="Ticket Color*"
                                    value={ticketColor}
                                    callbackFn={setTicketColor}
                                />
                                <InputTextField
                                    label="Font Color*"
                                    value={textColor}
                                    callbackFn={setTextColor}
                                />
                                <div className="flex justify-center">
                                    <button className="bg-white mt-3 px-4 py-1 rounded-2xl text-sm shadow-xl transform hover:scale-105 transition-transform duration-300" onClick={handleStyleReset}>Reset Styles</button>
                                </div>
                            </div>

                            <div className="mb-2">
                                <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-center text-gray-800">Gift Information</h3>
                                <InputTextField
                                    label="Your Name"
                                    required={false}
                                    value={gifterName}
                                    callbackFn={setGifterName}
                                />
                                <InputTextFieldWithAI
                                    label="Gift Message"
                                    required={false}
                                    value={giftMessage}
                                    inputCallbackFn={setGiftMessage}
                                    aiCallbackFn={handleGenerateMessageWithAI}
                                    isLoading={isLoadingAIGiftMessage}
                                />
                                <InputCheckboxField
                                    checked={showConfetti}
                                    label="Show Confetti?"
                                    onChangeFn={handleRadioChange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:col-span-2 pt-4">
                            <button className="bg-white px-6 py-1 rounded-2xl text-lg shadow-xl transform hover:scale-105 transition-transform duration-300" type="submit">
                                Create Ticket
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex-1 md:w-1/2 px-4 sm:mt-0 animate-in fade-in zoom-in ease-in-out mb-auto sticky top-4">
                    <h2 className="sm:hidden text-xl lg:text-3xl font-extrabold leading-tight text-center text-gray-800 mt-10">Preview</h2>
                    <div className="mt-4 mx-2 sm:mt-10 mb-10">
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
                            textColor={textColor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
