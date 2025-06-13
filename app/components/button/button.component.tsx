import type { r } from "node_modules/@react-router/dev/dist/routes-DHIOx0R9";
import { LoadingAnimation } from "../loading/loading-animation";

type ButtonProps = {
    label: string;
    onClick?: () => void;
    isLoading?: boolean;
    isUseLabelLoading?: boolean;
    className?: string;
    suffix?: string | React.ReactNode;
    isSuffixWithLoading?: boolean;
    suffixLoadingSpinnerColor?: 'text-black' | 'text-white' | 'text-gray-500' | 'text-blue-500' | 'text-red-500';
    dataTestId?: string;
    [key: string]: any;
};

export function ButtonComponent({
    label,
    onClick,
    isLoading = false,
    className = 'bg-blue-500 text-white w-full py-1 flex justify-center items-center gap-2 disabled:opacity-50',
    suffix = null,
    isUseLabelLoading = true,
    isSuffixWithLoading = false,
    suffixLoadingSpinnerColor = 'text-blue-500',
    dataTestId = 'button-component',
    ...rest
}: ButtonProps) {
    return (
        <button
            data-testid={dataTestId}
            disabled={isLoading}
            className={`rounded-md ${className}`}
            onClick={onClick}
            title={label}
            {...rest}
        >
            {isLoading && isUseLabelLoading && (
                <LoadingAnimation color={suffixLoadingSpinnerColor} />
            )}

            {isLoading && isUseLabelLoading ? 'Loading...' : label}
            {suffix && isSuffixWithLoading && isLoading ? <LoadingAnimation color={suffixLoadingSpinnerColor} /> : suffix}
        </button>
    );
}