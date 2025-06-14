type TCardComponentProps = {
    keyId: string;
    title: string;
    description: string;
    score?: number;
};

export function CardComponent({ keyId, description, score, title }: TCardComponentProps) {
    return (
        <div
            key={keyId}
            className="bg-gray-100 p-2 rounded mb-2 shadow-sm  min-h-[80px]"
        >
            <div className="flex justify-between items-center">
                <h4 className="font-semibold">{title}</h4>
                {score !== undefined && (
                    <span className="flex items-center gap-1">
                        {score}
                        <span>⭐</span>
                    </span>
                )}

            </div>
            <p className="text-sm text-gray-600 pt-1">{description}</p>
        </div>
    )
}