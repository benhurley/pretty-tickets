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
        giftMessage
    } = useParams();
    const [showMessage, setShowMessage] = useState(false)
    const [shortenedUrl, setShortenedUrl] = useState(null);

    const shortenUrl = async () => {
        const requestBody = {
            url: window.location.href,
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
                setShortenedUrl(data.tiny_url);
            } else {
                console.error('Error shortening URL:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const copyToClipboard = () => {
        if (shortenedUrl) {
            navigator.clipboard.writeText(shortenedUrl)
                .then(() => {
                    console.log('Shortened URL copied to clipboard');
                })
                .catch((error) => {
                    console.error('Error copying to clipboard:', error);
                });
        }
    };

    useEffect(() => {
        setTimeout(() => setShowMessage(true), 1250);
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-pink-200 bg-opacity-50 p-10">
            <Confetti run={showConfetti === "true"} width={window.innerWidth} height={window.innerHeight} numberOfPieces={100} drawShape={ctx => {
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
                        <div className="flex-1 md:w-1/2 flex flex-col items-center md:items-start justify-center p-10 z-20">
                {showMessage && (
                    <>
                        <h1 className="text-1xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-gray-800 my-4 animate-in fade-in zoom-in mx-auto">{gifterName} sent you some tickets!</h1>
                        <div className='rounded-xl shadow-2xl bg-white mt-10 md:mt-0 p-4 animate-in fade-in zoom-in mx-auto'>
                            <p>{`${giftMessage} - ${gifterName}`}</p>
                        </div>
                    </>
                )}
                {showMessage && (
                    <div className='flex mx-auto mt-10'>
                        <button style={{ background: '#c6ecd9' }} className="px-4 py-2 rounded-2xl text-md shadow-xl animate-in fade-in zoom-in" onClick={() => {
                            shortenUrl();
                            copyToClipboard();
                        }}>
                            <div className='inline-block pr-2'>
                                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fshare%2Fshare_PNG52.png&f=1&nofb=1&ipt=a194c632dab401ac1cec221e25326f23a661b5d8b8b3becd7275a809dad16023&ipo=images" width={20} alt="share icon" />
                            </div>
                            <div className='inline-block'>
                                <p className='text-lg'>Share</p>
                            </div>

                        </button>
                    </div>
                )}
            </div>
            <div className="flex-1 md:w-1/2">
                <div className='md:pt-[60px] animate-in zoom-in-50 ease-in-out duration-1000'>
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
