export const IntroHero = () => {
    return (
        <div className="max-w-[650px] px-6 pt-10 sm:pt-4 animate-in fade-in zoom-in ease-in-out">
            <div>
                <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-center text-gray-700 mb-2 inline-block">
                    Pretty Tickets
                </h1>
                <img className="inline-block ml-1 sm:ml-2 -mt-10 animate-in spin-in ease-in-out duration-1000" width={75} src="/logo128.png" alt="ticket" />
            </div>
            <h2 className="text-[20px] text-gray-700 font-bold italic ">Elevate Your Ticketing Experience</h2>
            <p className="my-6 sm:my-6">Transform that ordinary event booking into an elegant, tailor-made online ticket that's perfect for gifting and sharing.</p>

            <p className="mb-1"><b>1. Customize:</b> Input event details and add a personal touch.</p>
            <p className="mb-1"><b>2. Preview:</b> Get a real-time look at your stylish ticket before finalizing.</p>
            <p className="mb-1"><b>3. Share:</b> Create a unique link and send your beautiful ticket to its lucky recipient.</p>
        </div>
    )
}
