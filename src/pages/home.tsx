import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/organisms/ticket";
import { InputTextField } from "../components/molecules/inputFields/inputTextField";
import { InputCheckboxField } from "../components/molecules/inputFields/inputCheckboxField";
import { emptyValue } from "../helpers/globalConstants";
import { InputTextAreaFieldWithAI } from "../components/molecules/inputFields/inputTextAreaFieldWithAI";
import { fetchGiftMessage, fetchTicketDesign } from "../helpers/fetchOpenAI";
import { InputColorField } from "../components/molecules/inputFields/inputColorField";
import { InputTextAreaField } from "../components/molecules/inputFields/inputTextAreaField";
import { isValidInput } from "../helpers/isValidInput";
import VerticalLines from "../components/atoms/ticketTextures/vertical.png";
import { InputDropdownField } from "../components/molecules/inputFields/inputDropdownField";
import { getTextures } from "../helpers/textures";
import { getFonts } from "../helpers/fonts";
import { IntroHero } from "../components/organisms/introHero";
import { GenerateWithAIButton } from "../components/molecules/buttons/generateWithAIButton";
import { InputDateField } from "../components/molecules/inputFields/inputDateField";
import { InputTimeField } from "../components/molecules/inputFields/inputTimeField";

export const Home = () => {
    const navigate = useNavigate();

    const [eventName, setEventName] = useState('2023 US Open Tennis');
    const [eventSubtitle, setEventSubtitle] = useState('VIP ENTRY');
    const [eventDescription, setEventDescription] = useState(`Session 24: Women's Final / Mixed Doubles Final`);
    const [eventDate, setEventDate] = useState<string | undefined>("2023-09-09");
    const [eventStartTime, setEventStartTime] = useState("12:00");
    const [eventEndTime, setEventEndTime] = useState("17:00");
    const [eventVenue, setEventVenue] = useState('Arthur Ashe Stadium');
    const [eventSection, setEventSection] = useState('415');
    const [eventRow, setEventRow] = useState('J');
    const [eventSeat, setEventSeat] = useState('7');

    const [imgUrl, setImgUrl] = useState('https://tinyurl.com/example-img')
    const [ticketColor, setTicketColor] = useState('#F5F5F5')
    const [ticketTexture, setTicketTexture] = useState(VerticalLines)
    const [textColor, setTextColor] = useState('#000000')
    const [font, setFont] = useState('sans-serif')

    const [showConfetti, setShowConfetti] = useState(true);
    const [gifterName, setGifterName] = useState("Someone");
    const [giftMessage, setGiftMessage] = useState(`"Happy Birthday! Can't wait to celebrate with you and finally see the pros face-off at The US Open."`);
    const [isLoadingAIGiftMessage, setIsLoadingAIGiftMessage] = useState(false);
    const [isLoadingTicketDesignWithAI, setIsLoadingTicketDesignWithAI] = useState(false);

    const handleDesignTicketWithAI = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoadingTicketDesignWithAI(true)
        const design = await fetchTicketDesign({
            eventName,
            eventSubtitle,
            eventDescription,
            eventVenue,
        })

        setIsLoadingTicketDesignWithAI(false)

        if (!!design) {
            const textures = getTextures();
            setTicketColor(design.ticket_color)
            setFont(design.font)
            setTextColor(design.font_color)
            setTicketTexture(textures.find(t => t.name === design.texture)?.value || "");
        }
    }

    const handleGenerateMessageWithAI = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoadingAIGiftMessage(true)
        const message = await fetchGiftMessage({
            eventName,
            eventSubtitle,
            eventDescription,
            eventDate,
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

    const handleClearFields = () => {
        setEventName("")
        setEventSubtitle("")
        setEventDescription("")
        setEventDate(undefined)
        setEventStartTime("")
        setEventEndTime("")
        setEventVenue("")
        setEventSection("")
        setEventRow("")
        setEventSeat("")
        setImgUrl("")
    }

    const handleSubmit = () => {
        const formData = {
            eventName,
            eventSubtitle,
            eventDescription,
            eventDate,
            eventStartTime,
            eventEndTime,
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
        queryParams.set('eventStartTime', eventStartTime || emptyValue);
        queryParams.set('eventEndTime', eventEndTime || emptyValue);
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
        queryParams.set('gifterName', gifterName || 'Someone');

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
            setEventStartTime(parsedFormData.eventStartTime);
            setEventEndTime(parsedFormData.eventEndTime);
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
            <div className="grid justify-center mt-6 mb-4">
                <IntroHero />
            </div>
            <div className="flex flex-col md:flex-row items-center max-w-[1200px] mx-auto">
                <div className="flex-1 md:w-1/2 px-4 lg:ml-10 mt-2 sm:mt-6 max-w-full w-full">
                    <div className="bg-green-100 p-4 rounded-lg shadow-md text-center sm:flex-grow max-w-[350px] w-full mx-auto mb-8">
                        <h3 className="text-lg font-semibold mb-1 text-left">Add Details</h3>
                        <p className="text-sm text-gray-600 text-left">Auto-fill event details using Generative AI.</p>
                    </div>
                    <div className="rounded-xl shadow-xl border border-white flex flex-col justify-between max-h-[420px] md:max-h-none overflow-y-scroll pb-4 bg-white bg-opacity-30 px-4 pt-3 mx-2 sm:px-6 sm:pt-4 min-w-[250px] md:max-w-[500px]">
                        <div className="flex-grow overflow-y-scroll">
                            <div className="mt-2">
                                <div className="flex justify-between align-center mb-3">
                                    <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-left text-gray-800 ml-2">Event Information</h3>
                                    <div className="flex gap-2">
                                        <button className="bg-orange-100 text-xs border rounded-full px-4 py-1 font-semibold" onClick={() => window.location.reload()}>Reset Fields</button>
                                        <button className="bg-purple-100 text-xs border rounded-full px-4 py-1 font-semibold" onClick={handleClearFields}>Clear Fields</button>
                                    </div>
                                </div>
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
                                <InputDateField
                                    label="Date*"
                                    value={eventDate || ""}
                                    callbackFn={setEventDate}
                                />
                                <InputTimeField
                                    label="Start Time*"
                                    value={eventStartTime}
                                    callbackFn={setEventStartTime}
                                />
                                <InputTimeField
                                    label="End Time*"
                                    value={eventEndTime}
                                    callbackFn={setEventEndTime}
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
                                <div className="flex mt-3 mb-2">
                                    <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-left text-gray-800 mr-4 ml-2">Ticket Design</h3>
                                    <GenerateWithAIButton
                                        isLoading={isLoadingTicketDesignWithAI}
                                        aiCallbackFn={handleDesignTicketWithAI}
                                    />
                                </div>
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
                                <h3 className="text-mg lg:text-xl font-extrabold leading-tight text-left text-gray-800 ml-2">Gift Message (Optional)</h3>
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
                <div className="flex-1 md:w-1/2 px-4 mt-4 sm:mt-0 mb-auto sticky top-16">
                    <div className="mt-4 mx-2 sm:mt-6 mb-10">
                        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center sm:flex-grow max-w-[350px] w-full mx-auto mb-8">
                            <h3 className="text-lg font-semibold mb-1 text-left">Design</h3>
                            <p className="text-sm text-gray-600 text-left">Preview your commemorative ticket below:</p>
                        </div>
                        <Ticket
                            eventName={eventName}
                            eventSubtitle={eventSubtitle}
                            eventDescription={eventDescription}
                            eventDate={eventDate}
                            eventStartTime={eventStartTime}
                            eventEndTime={eventEndTime}
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
                        {isValidInput(gifterName) && <div className='rounded-xl shadow-2xl bg-white p-6 mx-auto max-w-[575px] mt-12'>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-gray-800 mx-auto text-center">{gifterName} sent you a ticket!</h3>
                            {isValidInput(giftMessage) && <div className='md:px-6 mt-6 mb-2'>
                                <p>{giftMessage}</p>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="block items-center justify-center sm:py-12">
                <div className="flex justify-center">
                    <button className="bg-green-100 font-bold px-8 py-2 rounded-full text-lg shadow-xl transform hover:scale-105 transition-transform duration-300" onClick={handleSubmit}>
                        Create Pretty Ticket
                    </button>
                </div>
            </div>
            <div>
                <p className="text-xs pb-20 px-6 pt-12 italic max-w-[1200px] mx-auto">Disclaimer: Pretty Tickets creates decorative online ticket replicas intended for gifting and sharing. These replicas are not valid for event entry. They hold no actual event admission value. Always refer to your official electronic ticket for event access. Pretty Tickets are designed solely to enhance the presentation of your gift and share event details in a creative way.</p>
            </div>
        </div>
    );
}
