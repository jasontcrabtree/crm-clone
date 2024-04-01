import { Label } from "@radix-ui/react-select";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import { ConnectionType } from "@/lib/types/entities";

interface Option {
    value: any;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    selectLabel: string;
    placeholder: string;
    defaultValue?: string;
}

const CustomSelect = ({ options, selectLabel, placeholder, defaultValue }: CustomSelectProps) => {

    return (
        <SelectGroup>
            <Label>
                {selectLabel}
                <Select defaultValue={defaultValue}>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option: Option, index: number) => (
                            <SelectItem key={index} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Label>
        </SelectGroup>
    )
}

export default CustomSelect;