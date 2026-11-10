import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/organisms/ticket";
import { InputTextField } from "../components/molecules/inputFields/inputTextField";
import { InputCheckboxField } from "../components/molecules/inputFields/inputCheckboxField";
import { emptyValue } from "../helpers/globalConstants";
import { InputTextAreaFieldWithAI } from "../components/molecules/inputFields/inputTextAreaFieldWithAI";
import { fetchEventInfo, fetchGiftMessage, fetchTicketDesign } from "../helpers/fetchOpenAI";
import { InputColorField } from "../components/molecules/inputFields/inputColorField";
import { InputTextAreaField } from "../components/molecules/inputFields/inputTextAreaField";
import { isValidInput } from "../helpers/isValidInput";
import VerticalLines from "../components/atoms/ticketTextures/vertical.webp";
import { InputDropdownField } from "../components/molecules/inputFields/inputDropdownField";
import { getTextures } from "../helpers/textures";
import { getFonts } from "../helpers/fonts";
import { IntroHero } from "../components/organisms/introHero";
import { GenerateWithAIButton } from "../components/molecules/buttons/generateWithAIButton";
import { InputDateField } from "../components/molecules/inputFields/inputDateField";
import { InputTimeField } from "../components/molecules/inputFields/inputTimeField";
import { Button } from "../components/molecules/buttons/button";
import { fetchImageURL } from "../helpers/fetchImageURL";
import ShowHideContent from "../components/molecules/showHideContent";

const FORM_STORAGE_KEY = 'formData';

const defaultFormData = {
    eventType: "Tennis Match",
    eventName: '2025 US Open Tennis',
    eventSubtitle: 'VIP ENTRY',
    eventDescription: `Session 24: Women's Final / Mixed Doubles Final`,
    eventDate: "2025-09-09",
    eventStartTime: "12:00",
    eventEndTime: "17:00",
    eventVenue: 'Arthur Ashe Stadium',
    eventSection: '415',
    eventRow: 'J',
    eventSeat: '7',

    imgUrl: '/example.webp',
    ticketColor: '#F5F5F5',
    ticketTexture: VerticalLines,
    textColor: '#000000',
    font: 'sans-serif',

    showConfetti: true,
    gifterName: "Someone",
    giftMessage: `"Happy Birthday! Can't wait to celebrate with you and finally see the pros face-off at The US Open."`,
};

type FormData = typeof defaultFormData;
type StringField = { [K in keyof FormData]: FormData[K] extends string ? K : never }[keyof FormData];

const loadFormData = (): FormData => {
    try {
        const stored = sessionStorage.getItem(FORM_STORAGE_KEY);
        return stored ? { ...defaultFormData, ...JSON.parse(stored) } : defaultFormData;
    } catch {
        return defaultFormData;
    }
};

export const Home = () => {
    const navigate = useNavigate();

    // Ticket data lives in one object so it can be restored, cleared, filled by AI and submitted as a unit.
    // Lazy init restores the previous session before first paint instead of in an effect.
    const [form, setForm] = useState<FormData>(loadFormData);
    const [purchaseData, setPurchaseData] = useState("");

    const [isLoadingAIGiftMessage, setIsLoadingAIGiftMessage] = useState(false);
    const [isLoadingTicketDesignWithAI, setIsLoadingTicketDesignWithAI] = useState(false);
    const [isLoadingAIEventInfo, setIsLoadingAIEventInfo] = useState(false);

    const updateForm = (patch: Partial<FormData>) => setForm(prev => ({ ...prev, ...patch }));
    const bind = (name: StringField) => ({
        value: form[name],
        callbackFn: (value: string) => updateForm({ [name]: value }),
    });

    // Takes the event details explicitly so it can run straight after an AI fill, before state has re-rendered.
    const designTicketWithAI = async (details: FormData) => {
        setIsLoadingTicketDesignWithAI(true)
        const design = await fetchTicketDesign({
            eventType: details.eventType,
            eventName: details.eventName,
            eventSubtitle: details.eventSubtitle,
            eventDescription: details.eventDescription,
            eventVenue: details.eventVenue,
        })

        setIsLoadingTicketDesignWithAI(false)

        if (!!design) {
            const textures = getTextures();
            updateForm({
                ticketColor: design.ticket_color,
                font: design.font,
                textColor: design.font_color,
                ticketTexture: textures.find(t => t.name === design.texture)?.value || "",
            });
        }

        const image = await fetchImageURL(details.eventType);

        if (image?.hits && image.hits?.length > 0) {
            updateForm({ imgUrl: image.hits[0].webformatURL })
        }
    }

    const handleDesignTicketWithAI = () => designTicketWithAI(form);

    const handleGenerateMessageWithAI = async () => {
        setIsLoadingAIGiftMessage(true)
        const message = await fetchGiftMessage({
            eventName: form.eventName,
            eventSubtitle: form.eventSubtitle,
            eventDescription: form.eventDescription,
            eventDate: form.eventDate,
            eventVenue: form.eventVenue,
        })

        setIsLoadingAIGiftMessage(false)

        if (!!message) {
            updateForm({ giftMessage: message })
        }
    }

    const handleFillEventFieldsWithAI = async () => {
        if (purchaseData.length > 0) {
            setIsLoadingAIEventInfo(true)

            const result = await fetchEventInfo({
                purchaseData
            })

            setIsLoadingAIEventInfo(false)

            if (!!result) {
                const filled: FormData = {
                    ...form,
                    eventType: result.type || "",
                    eventName: result.title || "",
                    eventSubtitle: result.subtitle || "",
                    eventDescription: result.description || "",
                    eventDate: result.date || "",
                    eventStartTime: result.start_time || "",
                    eventEndTime: result.end_time || "",
                    eventVenue: result.venue || "",
                    eventSection: result.section || "",
                    eventRow: result.row || "",
                    eventSeat: result.seats || "",
                    imgUrl: "",
                    giftMessage: "",
                };
                setForm(filled);
                designTicketWithAI(filled);
            }
        }
    }

    const handleConfettiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateForm({ showConfetti: e.target.checked });
    };

    const handleClearEventFields = () => {
        updateForm({
            eventName: "",
            eventSubtitle: "",
            eventDescription: "",
            eventDate: "",
            eventStartTime: "",
            eventEndTime: "",
            eventVenue: "",
            eventSection: "",
            eventRow: "",
            eventSeat: "",
            imgUrl: "",
        })
    }

    const handleClearGiftFields = () => {
        updateForm({ gifterName: "", giftMessage: "" })
    }

    const handleReset = () => {
        sessionStorage.removeItem(FORM_STORAGE_KEY);
        window.location.reload();
    }

    const handleSubmit = () => {
        sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));

        const queryParams = new URLSearchParams();
        queryParams.set('mode', 'creatorMode'); // default to creator mode on submit
        queryParams.set('showConfetti', form.showConfetti.toString());

        queryParams.set('eventName', form.eventName.slice(0, 50) || emptyValue);
        queryParams.set('eventSubtitle', form.eventSubtitle.slice(0, 50) || emptyValue);
        queryParams.set('eventDescription', form.eventDescription.slice(0, 200) || emptyValue);
        queryParams.set('eventDate', form.eventDate || emptyValue);
        queryParams.set('eventStartTime', form.eventStartTime || emptyValue);
        queryParams.set('eventEndTime', form.eventEndTime || emptyValue);
        queryParams.set('eventVenue', form.eventVenue.slice(0, 50) || emptyValue);
        queryParams.set('eventSection', form.eventSection.slice(0, 10) || emptyValue);
        queryParams.set('eventRow', form.eventRow.slice(0, 10) || emptyValue);
        queryParams.set('eventSeat', form.eventSeat.slice(0, 10) || emptyValue);

        queryParams.set('imgUrl', form.imgUrl || emptyValue);
        queryParams.set('ticketColor', form.ticketColor || emptyValue);
        queryParams.set('ticketTexture', form.ticketTexture || emptyValue);
        queryParams.set('textColor', form.textColor || emptyValue);
        queryParams.set('font', form.font || emptyValue);
        queryParams.set('giftMessage', form.giftMessage || emptyValue);
        queryParams.set('gifterName', form.gifterName.slice(0, 50) || 'Someone');

        const queryString = queryParams.toString();
        const longURL = `/results?${queryString}`;

        navigate(longURL);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="lg:p-10">
            <div className="grid justify-center mt-6 mb-4">
                <IntroHero />
            </div>
            <div className="flex flex-col md:flex-row items-center max-w-[1200px] mx-auto">
                <div className="flex-1 md:w-1/2 px-4 lg:ml-10 mt-2 sm:mt-6 max-w-full w-full">
                    {/* Test hiding description block 4-21-24 */}
                    {/* <div className="bg-green-100 p-4 rounded-lg shadow-md text-center sm:flex-grow max-w-[350px] w-full mx-auto mb-8">
                        <h3 className="text-lg font-semibold mb-1 text-left">Create The Perfect Ticket</h3>
                        <p className="text-sm text-gray-600 text-left">Fill out the event fields you need, apply styles, and include a message for your lucky recipient.</p>
                    </div> */}
                    <div className="rounded-xl shadow-xl border border-white flex flex-col justify-between md:max-h-none bg-white bg-opacity-30 mx-2 min-w-[250px] md:max-w-[500px]">
                        <div className="flex-grow overflow-y-scroll overflow-x-hidden px-4 py-6">
                            <div className="flex justify-between align-center mb-1">
                                <h3 className="text-md lg:text-xl font-extrabold leading-tight text-left text-gray-800 ml-2">Event Details</h3>
                            </div>
                            <p className="mx-2">Recommended: Paste details from a confirmation email below and let AI do the heavy lifting.</p>
                            <div className="mb-6">
                                <InputTextAreaFieldWithAI
                                    value={purchaseData}
                                    inputCallbackFn={setPurchaseData}
                                    aiCallbackFn={handleFillEventFieldsWithAI}
                                    isLoading={isLoadingAIEventInfo}
                                    aiButtonCopy="Use AI Details"
                                    rows={5}
                                    placeholder="e.g. Nets Pacers 7PM. Barlays Center. Section B25, Row 1, Seat 1 Seat 2."
                                />
                            </div>
                            <ShowHideContent title="Add Details Manually" >
                                <div className="flex justify-between align-center mb-3">
                                    <h3 className="text-sm lg:text-lg font-bold leading-tight text-left text-gray-800 ml-2">Event Form</h3>
                                    <div className="flex gap-2">
                                        <Button className="bg-orange-100 text-xs border rounded-full px-4 py-1 font-semibold" onClick={handleClearEventFields}>Clear</Button>
                                        <Button className="bg-red-100 text-xs border rounded-full px-4 py-1 font-semibold" onClick={handleReset}>Reset</Button>
                                    </div>
                                </div>
                                <InputTextField
                                    label="Event Type"
                                    {...bind("eventType")}
                                />
                                <InputTextField
                                    label="Title"
                                    {...bind("eventName")}
                                />
                                <InputTextField
                                    label="Subtitle"
                                    required={false}
                                    {...bind("eventSubtitle")}
                                />
                                <InputTextField
                                    label="Description"
                                    required={false}
                                    {...bind("eventDescription")}
                                />
                                <InputDateField
                                    label="Date"
                                    {...bind("eventDate")}
                                />
                                <InputTimeField
                                    label="Start Time"
                                    {...bind("eventStartTime")}
                                />
                                <InputTimeField
                                    label="End Time"
                                    {...bind("eventEndTime")}
                                />
                                <InputTextField
                                    label="Venue"
                                    {...bind("eventVenue")}
                                />
                                <InputTextField
                                    label="Section"
                                    required={false}
                                    {...bind("eventSection")}
                                />
                                <InputTextField
                                    label="Row"
                                    required={false}
                                    {...bind("eventRow")}
                                />
                                <InputTextField
                                    label="Seat(s)"
                                    required={false}
                                    {...bind("eventSeat")}
                                />
                            </ShowHideContent>
                        </div>
                    </div>
                    <div className="rounded-xl shadow-xl border border-white flex flex-col justify-between max-h-[420px] md:max-h-none overflow-y-scroll bg-white bg-opacity-30 mt-8 mx-2 min-w-[250px] md:max-w-[500px]">
                        <div className="flex-grow overflow-y-scroll overflow-x-hidden px-4 py-6">
                            <div className="flex justify-between mb-2 mr-2">
                                <h3 className="text-md lg:text-xl font-extrabold leading-tight text-left text-gray-800 ml-2">Design</h3>
                                <GenerateWithAIButton
                                    isLoading={isLoadingTicketDesignWithAI}
                                    copy="Use AI Design"
                                    aiCallbackFn={handleDesignTicketWithAI}
                                />
                            </div>
                            <div className="flex justify-left gap-5 w-[100%] mt-4 mb-2 ml-2 ">
                                <InputColorField
                                    label="Ticket Color"
                                    {...bind("ticketColor")}
                                />
                                <InputColorField
                                    label="Font Color"
                                    {...bind("textColor")}
                                />
                            </div>
                            <InputDropdownField
                                label="Texture"
                                {...bind("ticketTexture")}
                                inputList={getTextures()}
                            />
                            <InputDropdownField
                                label="Font"
                                {...bind("font")}
                                inputList={getFonts()}
                            />
                            <InputTextAreaField
                                label="Image URL"
                                required={false}
                                {...bind("imgUrl")}
                            />
                        </div>
                    </div>
                    <div className="rounded-xl shadow-xl border border-white flex flex-col justify-between max-h-[420px] md:max-h-none overflow-y-scroll bg-white bg-opacity-30 mt-8 mx-2 min-w-[250px] md:max-w-[500px]">
                        <div className="flex-grow overflow-y-scroll overflow-x-hidden px-4 py-6">
                            <div className="flex justify-between align-center mb-2">
                                <h3 className="text-md lg:text-xl font-extrabold leading-tight text-left text-gray-800 ml-2">Gift Message (Optional)</h3>
                                <div className="flex gap-2">
                                    <Button className="bg-orange-100 text-xs mr-2" onClick={handleClearGiftFields}>Clear</Button>
                                </div>
                            </div>
                            <InputTextField
                                label="Your Name"
                                required={false}
                                {...bind("gifterName")}
                            />
                            <InputTextAreaFieldWithAI
                                label="Gift Message"
                                required={false}
                                value={form.giftMessage}
                                inputCallbackFn={(value) => updateForm({ giftMessage: value })}
                                aiButtonCopy="Use AI Gift Message"
                                aiCallbackFn={handleGenerateMessageWithAI}
                                isLoading={isLoadingAIGiftMessage}
                            />
                            <InputCheckboxField
                                id="confettii"
                                checked={form.showConfetti}
                                label="Show Confetti?"
                                onChangeFn={handleConfettiChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 md:w-1/2 px-4 mt-4 sm:mt-0 mb-auto sticky top-16">
                    <div className="mt-12 sm:mt-6 mx-2 sm:mt-6 mb-10">
                        <Ticket {...form} />
                        {isValidInput(form.gifterName) && <div className='rounded-xl shadow-2xl bg-white p-6 mx-auto max-w-[575px] mt-6'>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-gray-800 mx-auto text-center">{form.gifterName} sent you a ticket!</h3>
                            {isValidInput(form.giftMessage) && <div className='md:px-6 mt-6 mb-2'>
                                <p>{form.giftMessage}</p>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="block items-center justify-center sm:py-12">
                <div className="flex justify-center">
                    <Button className="bg-green-100 font-semibold px-8 py-2 rounded-full text-lg shadow-xl transform hover:scale-105 transition-transform duration-300" onClick={handleSubmit}>
                        Create Ticket
                    </Button>
                </div>
            </div>
        </div>
    );
}
