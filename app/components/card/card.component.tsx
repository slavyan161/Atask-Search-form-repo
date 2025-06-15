type TCardComponentProps = {
    keyId: string | number;
    title: string;
    description: string | null;
    score?: number;
};

export function CardComponent({ keyId, description, score, title }: TCardComponentProps) {
    return (
        <div
            key={keyId}
            className="bg-gray-100 p-2 rounded mb-2 shadow-sm  min-h-[80px]"
        >
            <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm md:text-base">{title || ''}</h4>
                {score !== undefined && (
                    <span className="flex items-center gap-1 text-sm md:text-base pl-1 md:pl-0">
                        {score}
                        <span>⭐</span>
                    </span>
                )}

            </div>
            <p className="text-sm text-gray-600 pt-1 text-sm md:text-base">{description || ''}</p>
        </div>
    )
}