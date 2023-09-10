import Confetti from 'react-confetti'
import Ticket from "../components/organisms/ticket";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchTinyURL } from '../helpers/fetchTinyURL';
import { isValidInput } from '../helpers/isValidInput';
import ShareIcon from '../components/atoms/shareIcon.png';

export const Results = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const mode = queryParams.get('mode');
    const showConfetti = queryParams.get('showConfetti');
    const eventName = queryParams.get('eventName');
    const eventSubtitle = queryParams.get('eventSubtitle');
    const eventDescription = queryParams.get('eventDescription');
    const eventDate = queryParams.get('eventDate');
    const eventTime = queryParams.get('eventTime');
    const eventVenue = queryParams.get('eventVenue');
    const eventSection = queryParams.get('eventSection');
    const eventRow = queryParams.get('eventRow');
    const eventSeat = queryParams.get('eventSeat');
    const imgUrl = queryParams.get('imgUrl');
    const ticketColor = queryParams.get('ticketColor');
    const ticketTexture = queryParams.get('ticketTexture');
    const textColor = queryParams.get('textColor');
    const font = queryParams.get('font');
    const gifterName = queryParams.get('gifterName');
    const giftMessage = queryParams.get('giftMessage');

    const [shareBtnCopy, setShareBtnCopy] = useState("Share")
    const [tinyURL, setTinyURL] = useState(sessionStorage.getItem('tinyURL'));
    const [hasCopiedTinyUrl, setHasCopiedTinyURL] = useState(false);

    const handleFetchTinyURL = async () => {
        const res = await fetchTinyURL()
        if (res) {
            setTinyURL(res.data.tiny_url)
            navigator.clipboard.writeText(res.data.tiny_url);
        } else {
            setShareBtnCopy("Error Creating TinyURL");
        }
    }

    const handleCopyClick = (tinyURL: string) => {
        navigator.clipboard.writeText(tinyURL).then(() => setHasCopiedTinyURL(true)
        );
        setHasCopiedTinyURL(true)
        console.log(`Copied to clipboard: ${tinyURL}`)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const ShareCTA = () => {
        return (
            <div className='flex mx-auto my-2 pb-3 min-w-[250px]'>
                {!tinyURL
                    ? <button disabled={!!tinyURL} className="bg-white mx-auto px-6 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300 disabled:scale-100" onClick={() => { handleFetchTinyURL() }}>
                        {shareBtnCopy.includes("Share") && <div className='inline-block pr-2'>
                            <img src={ShareIcon} className="-mb-1" width={18} alt="share icon" />
                        </div>}
                        <div className='inline-block'>
                            <p className='text-md font-bold'>{shareBtnCopy}</p>
                        </div>
                    </button>
                    : <button className="bg-white mx-auto px-6 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300 disabled:scale-100" onClick={() => handleCopyClick(tinyURL)}>{hasCopiedTinyUrl ? <span className='px-6'>Copied to clipboard ✔</span> : tinyURL}</button>}
            </div>
        )
    }

    const ThankYouModule = () => {
        return (<>
            <p className="text-md lg:text-lg font-extrabold leading-tight text-gray-800 mt-4 mx-auto text-center">Thanks for using Pretty Tickets<span className="text-[10px] absolute -mt-1">™</span></p>
            <div className="inline-flex items-center justify-center md:col-span-2 pt-1 mt-2 mb-4 font-bold">
                <a className="bg-purple-100 px-4 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300 ml-2" href="https://github.com/benhurley/fancy-tickets" target="_blank" rel="noreferrer">
                    Contribute
                </a>
                <a className="bg-blue-100 px-4 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300 ml-2" href="https://github.com/sponsors/benhurley" target="_blank" rel="noreferrer">
                    Donate
                </a>
                <a className="bg-pink-100 px-4 py-1 rounded-2xl text-md shadow-xl transform hover:scale-105 transition-transform duration-300 ml-2" href="https://github.com/sponsors/benhurley" target="_blank" rel="noreferrer">
                    Sponsor
                </a>
            </div>
        </>)
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 pb-20'>
            <Confetti run={showConfetti === "true"} width={window.innerWidth} height={window.innerHeight} numberOfPieces={150} />
            <div className="flex flex-col md:flex-row items-center justify-center px-2 py-[10%] sm:py-[6%] lg:px-10 lg:max-w-[1440px] lg:mx-auto mt-12 sm:mt-0">
                <div className="flex-1 md:w-1/2 flex flex-col items-center md:items-start justify-center px-4 py-6 sm:py-20 md:pt-0 z-10">
                    <p className="absolute top-16 md:top-20 left-6 sm:left-10 text-sm mr-auto text-gray-800 font-bold"><Link className="hover:underline" to="/">Home</Link> / Results</p>
                    <>
                        {mode === "creatorMode" &&
                            <>
                                <div style={{ background: '#c6ecd9' }} className='rounded-xl shadow-2xl bg-white px-3 sm:px-4 mx-auto mb-10 mt-10 sm:mt-0 lg:mt-8'>
                                    <p className="text-xl md:text-2xl font-bold leading-tight text-gray-800 my-4 mx-auto text-center px-4 lg:px-6">{tinyURL ? "Your Free URL:" : "Your ticket is ready to send!"}</p>
                                    <ShareCTA />
                                    {tinyURL && <ThankYouModule />}
                                </div>
                            </>
                        }
                        {isValidInput(giftMessage) && isValidInput(giftMessage) && <div className='rounded-xl shadow-2xl bg-white p-8 mx-auto max-w-[575px]'>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-800 mb-6 mx-auto text-center">{gifterName} sent you tickets to an event!</h1>
                            <div className='md:px-6'>
                                <p>{giftMessage}</p>
                                <p className='mt-3'>{`- ${gifterName}`}</p>
                            </div>
                        </div>}
                    </>
                </div>
                <div className="flex-1 md:w-1/2">
                    <div className='mx-4 md:pt-[60px]'>
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
                    </div>
                </div>
            </div>
            <div>
                <p className="text-xs px-6 pt-12 italic max-w-[1200px] mx-auto">Disclaimer: Pretty Tickets creates decorative online ticket replicas intended for gifting and sharing. These replicas are not valid for event entry. They hold no actual event admission value. Always refer to your official electronic ticket for event access. Pretty Tickets are designed solely to enhance the presentation of your gift and share event details in a creative way.</p>
            </div>
        </div>
    )
}
