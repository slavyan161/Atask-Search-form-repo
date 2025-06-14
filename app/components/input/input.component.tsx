type TInputComponentProps = {
    placeholder?: string;
    className?: string;
    [key: string]: any; // Allow any other props to be passed
    onEnter: (data: any) => void;
};

export function InputComponent({ onEnter, className, placeholder, type, ...rest }: TInputComponentProps) {
    return (
        <div className="flex items-center justify-center w-full">
            <input
                {...rest}
                placeholder={placeholder || "Enter username"}
                className={className || "w-full border px-2 py-1 mb-2 rounded-lg"}
                type={type || "text"}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onEnter(e.currentTarget.value);
                    }
                }}
            />
        </div>
    );
}