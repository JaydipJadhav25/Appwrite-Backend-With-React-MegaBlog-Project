

export const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-hite",
    className = '',
    ...props
}) => {
  return (
    <button className={`px-3 py-2 rounded ${bgColor} ${textColor} ${className}`} {...props}>{children}
    </button>
  )
}


export default Button
