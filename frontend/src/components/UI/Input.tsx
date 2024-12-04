interface inputProps {
    type: 'text' | 'number' | 'email' | 'password';
    placeholder: string;
    name: string;
    label?: string;
    className?: string;
    onChange: (value: string) => void;
}

const Input: React.FC<inputProps> = ({type, placeholder, name, label, className, onChange}) => {
    return (

        < input type={type} name={name} placeholder={placeholder}
                className="px-2 py-1 border-2 border-gray-500 hover:border-gray-300 focus:border-primary rounded-md focus:outline-none focus:text-gray-400 bg-transparent transition-all duration-300 ease-in-out w-full"
                onChange={e => onChange(e.target.value)}/>
    )
}

export default Input;