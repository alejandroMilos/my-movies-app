import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type PillProps = {
    /** Text to display on the Pill */
    text: string;
    /** Color for the Pill that can be default, destructive, success, custom */
    color?: "default" | "destructive" | "success" | "custom";
};

const Pill = ({text, color = "default"}: PillProps) => {
    const colorMap = {
        default: "",
        destructive: "bg-red-500 text-white",
        success: "bg-green-500 text-white",
        custom: "bg-purple-500 text-white border border-purple-900",
    };

    return (
        <Badge className={cn("rounded-full px-4 ppy-1 text-sm", colorMap[color])}>
            {text}
        </Badge>
    );
};

export default Pill;