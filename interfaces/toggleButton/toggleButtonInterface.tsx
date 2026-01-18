export interface ToggleButtonProps {
    id?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    className?: string;
    "aria-label"?: string;
}