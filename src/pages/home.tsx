import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/organisms/ticket";
import { IntroHero } from "../components/organisms/introHero";
import { InputTextField } from "../components/molecules/inputFields/inputTextField";
import { InputCheckboxField } from "../components/molecules/inputFields/inputCheckboxField";
import { emptyValue } from "../helpers/globalConstants";
import { InputTextAreaFieldWithAI } from "../components/molecules/inputFields/inputTextAreaFieldWithAI";
import { fetchGiftMessage } from "../helpers/fetchOpenAI";
import { InputColorField } from "../components/molecules/inputFields/inputColorField";
import { InputTextAreaField } from "../components/molecules/inputFields/inputTextAreaField";
import { isValidInput } from "../helpers/isValidInput";
import Linen from "../components/atoms/ticketTextures/linen.png";
import { InputDropdownField } from "../components/molecules/inputFields/inputDropdownField";
import { getTextures } from "../helpers/textures";
import { getFonts } from "../helpers/fonts";

export const Home = () => {
    const navigate = useNavigate();

    const [eventName, setEventName] = useState('2023 US Open Tennis');
    const [eventSubtitle, setEventSubtitle] = useState('VIP ENTRY');
    const [eventDescription, setEventDescription] = useState(`Session 24: Women's Final / Mixed Doubles Final`);
    const [eventDate, setEventDate] = useState('Saturday, September 9th, 2023');
    const [eventTime, setEventTime] = useState('12PM EST');
    const [eventVenue, setEventVenue] = useState('Arthur Ashe Stadium');
    const [eventSection, setEventSection] = useState('415');
    const [eventRow, setEventRow] = useState('J');
    const [eventSeat, setEventSeat] = useState('7');

    const [imgUrl, setImgUrl] = useState('https://tinyurl.com/example-img')
    const [ticketColor, setTicketColor] = useState('#EAF1E4')
    const [ticketTexture, setTicketTexture] = useState(Linen)
    const [textColor, setTextColor] = useState('#000000')
    const [font, setFont] = useState('sans-serif')

    const [showConfetti, setShowConfetti] = useState(true);
    const [gifterName, setGifterName] = useState("Someone secret");
    const [giftMessage, setGiftMessage] = useState(`"Happy Birthday! Can't wait to celebrate with you and finally see the pros face-off at The US Open."`);
    const [isLoadingAIGiftMessage, setIsLoadingAIGiftMessage] = useState(false);

    const handleGenerateMessageWithAI = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoadingAIGiftMessage(true)
        const message = await fetchGiftMessage({
            eventName,
            eventSubtitle,
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

    const handleSubmit = () => {
        const formData = {
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
            ticketTexture,
            textColor,
            font,
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
        queryParams.set('eventDescription', eventDescription || emptyValue);
        queryParams.set('eventDate', eventDate || emptyValue);
        queryParams.set('eventTime', eventTime || emptyValue);
        queryParams.set('eventVenue', eventVenue || emptyValue);
        queryParams.set('eventSection', eventSection || emptyValue);
        queryParams.set('eventRow', eventRow || emptyValue);
        queryParams.set('eventSeat', eventSeat || emptyValue);

        queryParams.set('imgUrl', imgUrl || emptyValue);
        queryParams.set('ticketColor', ticketColor || emptyValue);
        queryParams.set('ticketTexture', ticketTexture || emptyValue);
        queryParams.set('textColor', textColor || emptyValue);
        queryParams.set('font', font || emptyValue);
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
            setEventDescription(parsedFormData.eventDescription);
            setEventDate(parsedFormData.eventDate);
            setEventTime(parsedFormData.eventTime);
            setEventVenue(parsedFormData.eventVenue);
            setEventSection(parsedFormData.eventSection);
            setEventRow(parsedFormData.eventRow);
            setEventSeat(parsedFormData.eventSeat);
            setImgUrl(parsedFormData.imgUrl);
            setTicketColor(parsedFormData.ticketColor);
            setTicketTexture(parsedFormData.ticketTexture);
            setTextColor(parsedFormData.textColor);
            setFont(parsedFormData.font);
            setGiftMessage(parsedFormData.giftMessage);
            setGifterName(parsedFormData.gifterName);
            setShowConfetti(parsedFormData.showConfetti);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 lg:p-10">
            <div className="grid justify-center mt-6 mb-4 sm:my-10">
                <IntroHero />
            </div>
            <div className="flex flex-col md:flex-row items-center max-w-[1200px] mx-auto">
                <div className="flex-1 md:w-1/2 px-4 lg:ml-10 mt-6 sm:mt-10 max-w-full w-full">
                    <div className="rounded-xl shadow-xl border border-white flex flex-col justify-between max-h-[420px] md:max-h-none overflow-y-scroll pb-4 bg-white bg-opacity-30 px-4 pt-3 mx-2 sm:px-6 sm:pt-4 min-w-[250px] md:max-w-[500px]">
                        <div className="flex-grow overflow-y-scroll">
                            <div className="mt-2">
                                <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-center text-gray-800">Event Info</h3>
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
                                <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-center text-gray-800">Design</h3>
                                <div className="inline-flex justify-around w-[100%] mt-4 mb-2">
                                    <InputColorField
                                        label="Background"
                                        value={ticketColor}
                                        callbackFn={setTicketColor}
                                    />
                                    <InputColorField
                                        label="Font"
                                        value={textColor}
                                        callbackFn={setTextColor}
                                    />
                                </div>
                                <InputDropdownField
                                    label="Texture"
                                    value={ticketTexture}
                                    callbackFn={setTicketTexture}
                                    inputList={getTextures()}
                                />
                                <InputDropdownField
                                    label="Font"
                                    value={font}
                                    callbackFn={setFont}
                                    inputList={getFonts()}
                                />
                                <InputTextAreaField
                                    label="Image URL"
                                    required={false}
                                    value={imgUrl}
                                    callbackFn={setImgUrl}
                                />
                            </div>

                            <div className="mb-2">
                                <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-center text-gray-800">Gift Info</h3>
                                <InputTextField
                                    label="Your Name"
                                    required={false}
                                    value={gifterName}
                                    callbackFn={setGifterName}
                                />
                                <InputTextAreaFieldWithAI
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
                    </div>
                </div>
                <div className="flex-1 md:w-1/2 px-4 sm:mt-0 mb-auto sticky top-4">
                    <div className="mt-4 mx-2 sm:mt-10 mb-10">
                        <h2 className="text-sm lg:text-md font-extrabold leading-tight text-center text-gray-800 mx-auto italic mt-12 mb-6 sm:my-6">Ticket Preview:</h2>
                        <Ticket
                            eventName={eventName}
                            eventSubtitle={eventSubtitle}
                            eventDescription={eventDescription}
                            eventDate={eventDate}
                            eventTime={eventTime}
                            eventVenue={eventVenue}
                            eventSection={eventSection}
                            eventRow={eventRow}
                            eventSeat={eventSeat}
                            imgUrl={imgUrl}
                            ticketColor={ticketColor}
                            ticketTexture={ticketTexture}
                            textColor={textColor}
                            font={font}
                        />
                        <h2 className="text-sm lg:text-md font-extrabold leading-tight text-center text-gray-800 mx-auto italic mt-12 sm:mt-6">Gift Preview:</h2>
                        <h1 className="text-xl lg:text-2xl font-extrabold leading-tight text-gray-800 mt-10 mb-6 sm:mt-6 mx-auto text-center max-w-[250px] md:max-w-[400px]">{gifterName} sent you tickets to an event!</h1>
                        {isValidInput(giftMessage) && isValidInput(giftMessage) && <div className='rounded-xl shadow-2xl bg-white p-4 mx-auto max-w-[575px]'>
                            <p>{`${giftMessage} - ${gifterName}`}</p>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center sm:py-12">
                <button className="bg-green-100 font-bold px-6 py-1 rounded-2xl text-lg shadow-xl transform hover:scale-105 transition-transform duration-300" onClick={handleSubmit}>
                    Create Ticket
                </button>
            </div>
            <div>
                <p className="text-xs pb-20 px-6 pt-12 italic max-w-[1200px] mx-auto">Disclaimer: Pretty Tickets creates decorative online ticket replicas intended for gifting and sharing. These replicas are not valid for event entry. They hold no actual event admission value. Always refer to your official electronic ticket for event access. Pretty Tickets are designed solely to enhance the presentation of your gift and share event details in a creative way.</p>
            </div>
        </div>
    );
}
