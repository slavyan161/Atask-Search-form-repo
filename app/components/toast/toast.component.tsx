import { useEffect, useState } from "react";

export function ToastComponent({ isVisible }: { isVisible: boolean }) {
    return (
        <div
            id="toast-default"
            className={`flex items-center w-full max-w-xs p-2 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-out ${isVisible ? 'top-2 opacity-100' : '-top-10 opacity-0'
                }`}
            role="alert"
        >
            🚫 You are offline
        </div>
    )
} 