interface TextareaProps {
    placeholder: string;
    name: string;
    onChange: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({placeholder, name, onChange}) => {
    return (
        <textarea name={name} placeholder={placeholder}
                  className="px-2 py-1 border-2 border-gray-500 hover:border-gray-300 focus:border-primary rounded-md focus:outline-none focus:text-gray-400 bg-transparent transition-all duration-300 ease-in-out w-full"
                  onChange={e => onChange(e.target.value)}/>
    )
}

export default Textarea;