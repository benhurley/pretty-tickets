import Confetti from 'react-confetti'
import ExampleTicket from "../components/organisms/ticket";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

export const Results = () => {
    const {
        showConfetti,
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
        gifterName,
        giftMessage,
        mode
    } = useParams();
    const [shareBtnCopy, setShareBtnCopy] = useState("Share")
    const [tinyURL, setTinyURL] = useState(sessionStorage.getItem('tinyURL'));

    const shortenUrl = async () => {
        const requestBody = {
            url: window.location.href.replace("creatorMode", "recipientMode"),
        };

        try {
            const response = await fetch('https://api.tinyurl.com/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_TINYURL_API_KEY}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                setTinyURL(data.data.tiny_url)
                navigator.clipboard.writeText(data.data.tiny_url);
                setShareBtnCopy("Link Created")
            } else {
                console.error('Error shortening URL:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); 

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 px-2 py-10 sm:px-10">
            <Confetti run={showConfetti === "true"} width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} drawShape={ctx => {
                ctx.beginPath();
                for (let i = 0; i < 22; i++) {
                    const angle = 0.35 * i;
                    const x = (0.2 + (1.5 * angle)) * Math.cos(angle);
                    const y = (0.2 + (1.5 * angle)) * Math.sin(angle);
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.closePath();

                ctx.translate(0, 0); // Reset translation
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0.2, 0);
                ctx.lineTo(0.2, -0.2);
                ctx.lineTo(-0.2, -0.2);
                ctx.lineTo(-0.2, 0);
                ctx.fillStyle = "#8067B7"; // Purple color for the "ticket"
                ctx.fill();
                ctx.closePath();
            }} />
            <div className="flex-1 md:w-1/2 flex flex-col items-center md:items-start justify-center p-10 z-10">
                <>
                    {mode === "creatorMode" &&
                        <div style={{ background: '#c6ecd9' }} className='rounded-xl shadow-2xl bg-white px-4 sm:px-10 animate-in fade-in zoom-in ease-in-out mx-auto mb-4 sm:mb-10'>
                            <p className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-gray-800 my-4 animate-in fade-in zoom-in ease-in-out mx-auto text-center">Your ticket is ready!</p>
                            <p className="text-lg md:text-xl lg:text-2xl font-extrabold leading-tight text-gray-800 mb-4 animate-in fade-in zoom-in ease-in-out mx-auto text-center">Here's what they'll see <img className='inline-block' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficons.iconarchive.com%2Ficons%2Ficons8%2Fios7%2F512%2FArrows-Down-2-icon.png&f=1&nofb=1&ipt=0d2f8a912b61c9a6dac423ecfed6a60fb93011843d5a8226dab42c993f827c7b&ipo=images" alt="arrow-down" width={30} /></p>
                        </div>}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-700 my-6 animate-in fade-in zoom-in ease-in-out mx-auto text-center max-w-[400px]">{gifterName} sent you tickets for an upcoming event!</h1>
                    <div className='rounded-xl shadow-2xl bg-white p-4 animate-in fade-in zoom-in ease-in-out mx-auto'>
                        <p>{`${giftMessage} - ${gifterName}`}</p>
                    </div>
                </>
                {mode === "creatorMode" && (
                    <div className='flex mx-auto mt-6 sm:mt-8'>
                        <button disabled={!!tinyURL} style={{ background: '#c6ecd9' }} className="px-6 py-2 rounded-2xl text-md shadow-xl animate-in fade-in zoom-in ease-in-out transform hover:scale-105 transition-transform duration-300" onClick={() => {
                            shortenUrl();
                        }}>
                            <div className='inline-block pr-2'>
                                {shareBtnCopy.includes("Created")
                                    ? <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_143278.png&f=1&nofb=1&ipt=478c24a8f8ef3658de10b939b7c7bd3a84d688db93bd7e8cdd5e9fcf824f06f3&ipo=images" className="-mb-1" width={25} alt="success icon" />
                                    : <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fshare%2Fshare_PNG52.png&f=1&nofb=1&ipt=a194c632dab401ac1cec221e25326f23a661b5d8b8b3becd7275a809dad16023&ipo=images" className="-mb-1" width={20} alt="share icon" />}
                            </div>
                            <div className='inline-block'>
                                <p className='text-lg'>{shareBtnCopy}</p>
                            </div>

                        </button>
                    </div>
                )}
                {tinyURL &&
                    <div style={{ background: '#c6ecd9' }} className='rounded-xl shadow-2xl bg-white mt-6 -mb-6 p-4 animate-in fade-in zoom-in ease-in-out mx-auto'>
                        <a target='_blank' rel="noreferrer" href={tinyURL}>{tinyURL}</a>
                    </div>
                }
            </div>
            <div className="flex-1 md:w-1/2">
                <div className='md:pt-[60px] animate-in fade-in zoom-in ease-in-out'>
                    <ExampleTicket
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
