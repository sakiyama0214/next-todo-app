import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    onClick?: () => void;
}

const PrimaryButton: React.FC<Props> = (props) => {
    const {children, onClick} = props;
  return (
    <button className=
        'rounded-full bg-teal-200 py-2 px-4 my-3 hover:bg-teal-400'
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default PrimaryButton