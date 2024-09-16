export default function LikeIcon({ isLike, ...props }) {
    return (
        <svg
            width="16px"
            height="16px"
            viewBox="0 0 0.48 0.48"
            fill={isLike ? 'blue' : "none"}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            style={{ cursor: 'pointer' }}
        >
            <g id="style=linear">
                <g id="like">
                    <path
                        id="vector"
                        d="m0.153 0.202 0.082 -0.122c0.008 -0.012 0.028 -0.02 0.044 -0.014 0.018 0.006 0.03 0.026 0.026 0.044l-0.01 0.064c-0.002 0.014 0.008 0.024 0.02 0.024h0.08c0.03 0 0.048 0.023 0.038 0.052s-0.02 0.081 -0.048 0.126c-0.013 0.021 -0.027 0.035 -0.052 0.035H0.133"
                        stroke={isLike ? "#ffffff" : "#000000"}
                        strokeWidth={0.03}
                        strokeMiterlimit={10}
                    />
                    <path
                        id="rec"
                        d="M0.044 0.211a0.02 0.02 0 0 1 0.02 -0.02h0.07a0.02 0.02 0 0 1 0.02 0.02v0.2h-0.09a0.02 0.02 0 0 1 -0.02 -0.02z"
                        stroke={isLike ? "#ffffff" : "#000000"}
                        strokeWidth={0.03}
                    />
                </g>
            </g>
        </svg>
    )
}