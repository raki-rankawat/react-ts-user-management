type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  variant: ButtonVariant
  disabled?: boolean
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  type = 'button',
  variant,
  disabled,
  className,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={['btn', variant, className].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
