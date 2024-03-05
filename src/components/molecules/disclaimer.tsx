export const Disclaimer = () => {
    const disclaimerCopy = 'Disclaimer: Pretty Tickets creates decorative, digitial commemorative tickets intended for gifting and sharing. These replicas are not valid for event entry. They hold no actual event admission value. Always refer to your official electronic ticket for event access. Pretty Tickets are designed solely to enhance the presentation of your gift and share event details in a creative way.';
    return (
        <div>
            <p className="text-xs pb-40 px-6 pt-12 italic max-w-[1200px] mx-auto">{disclaimerCopy}</p>
        </div>
    )
}
