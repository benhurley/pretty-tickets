import Confetti from 'react-confetti'
import Ticket from "../components/organisms/ticket";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchTinyURL } from '../helpers/fetchTinyURL';
import { isValidInput } from '../helpers/isValidInput';

export const Results = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const mode = queryParams.get('mode');
    const showConfetti = queryParams.get('showConfetti');
    const eventName = queryParams.get('eventName');
    const eventSubtitle = queryParams.get('eventSubtitle');
    const eventNumber = queryParams.get('eventNumber');
    const eventDescription = queryParams.get('eventDescription');
    const eventDate = queryParams.get('eventDate');
    const eventTime = queryParams.get('eventTime');
    const eventVenue = queryParams.get('eventVenue');
    const eventSection = queryParams.get('eventSection');
    const eventRow = queryParams.get('eventRow');
    const eventSeat = queryParams.get('eventSeat');
    const imgUrl = queryParams.get('imgUrl');
    const ticketColor = queryParams.get('ticketColor');
    const gifterName = queryParams.get('gifterName');
    const giftMessage = queryParams.get('giftMessage');

    const [shareBtnCopy, setShareBtnCopy] = useState("Share")
    const [tinyURL, setTinyURL] = useState(sessionStorage.getItem('tinyURL'));

    const handleFetchTinyURL = async () => {
        const res = await fetchTinyURL()
        if (res) {
            setTinyURL(res.data.tiny_url)
            navigator.clipboard.writeText(res.data.tiny_url);
            setShareBtnCopy("TinyURL Created");
        } else {
            setShareBtnCopy("Error Creating TinyURL");
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const ShareCTA = () => {
        return (<>
            {mode === "creatorMode" && (
                <div className='flex mx-auto my-2 pb-3'>
                    <button disabled={!!tinyURL} className="bg-white mx-auto px-6 py-1 rounded-2xl text-md shadow-xl animate-in fade-in zoom-in ease-in-out transform hover:scale-105 transition-transform duration-300 disabled:scale-100" onClick={() => {
                        handleFetchTinyURL();
                    }}>
                        <div className='inline-block pr-2'>
                            {shareBtnCopy.includes("Share") &&
                                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fshare%2Fshare_PNG52.png&f=1&nofb=1&ipt=a194c632dab401ac1cec221e25326f23a661b5d8b8b3becd7275a809dad16023&ipo=images" className="-mb-1" width={20} alt="share icon" />}
                        </div>
                        <div className='inline-block'>
                            <p className='text-lg'>{tinyURL ? <a className="py-2" target='_blank' rel="noreferrer" href={tinyURL}>{tinyURL}</a> : shareBtnCopy}</p>
                        </div>
                    </button>
                </div>

            )}
        </>)
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 px-2 py-10 sm:px-10">
            <Confetti run={showConfetti === "true"} width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} />
            <div className="flex-1 md:w-1/2 flex flex-col items-center md:items-start justify-center px-4 py-10 sm:p-10 z-10">
                <>
                    {mode === "creatorMode" &&
                        <div style={{ background: '#c6ecd9' }} className='rounded-xl shadow-2xl bg-white px-4 sm:px-10 animate-in fade-in zoom-in ease-in-out mx-auto mb-4 sm:mb-10'>
                            <p className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-gray-800 my-4 animate-in fade-in zoom-in ease-in-out mx-auto text-center">{tinyURL ? "Your custom link:" : "Nice Work! Ready to Share?"}</p>
                            <ShareCTA />
                            {tinyURL &&
                                <>
                                    <p className="text-md md:text-lg lg:text-xl font-extrabold leading-tight text-gray-800 mt-2 animate-in fade-in zoom-in ease-in-out mx-auto text-center">Thanks for supporting Pretty Tickets!</p>
                                    <div className="flex items-center justify-center md:col-span-2 pt-4 md:pt-0 mt-2 mb-4">
                                        <a className="bg-gradient-to-br from-blue-200 to-pink-100 bg-opacity-80 px-6 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300 ml-2" href="https://github.com/sponsors/benhurley" target="_blank" rel="noreferrer">
                                            Donate to the project
                                        </a>
                                    </div>
                                </>
                            }
                        </div>}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-800 my-6 animate-in fade-in zoom-in ease-in-out mx-auto text-center max-w-[250px] md:max-w-[575px]">{gifterName} sent you tickets to an event!</h1>
                    {isValidInput(giftMessage) && isValidInput(giftMessage) && <div className='rounded-xl shadow-2xl bg-white p-4 animate-in fade-in zoom-in ease-in-out mx-auto'>
                        <p>{`${giftMessage} - ${gifterName}`}</p>
                    </div>}
                </>
            </div>
            <div className="flex-1 md:w-1/2">
                <div className='md:pt-[60px] animate-in fade-in zoom-in ease-in-out'>
                    <Ticket
                        eventName={eventName}
                        eventSubtitle={eventSubtitle}
                        eventNumber={eventNumber}
                        eventDescription={eventDescription}
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
    )
}
