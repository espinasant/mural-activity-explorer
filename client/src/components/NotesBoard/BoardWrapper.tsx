import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"

interface BoardWrapperProps {
  children: React.ReactNode
  maxBounds: {
    x: number
    y: number
  }
}

const BoardWrapper = ({ children, maxBounds }: BoardWrapperProps) => {
  return (
    <TransformWrapper
      initialScale={0.8}
      limitToBounds={true}
      minPositionX={-maxBounds.x / 2}
      minPositionY={-maxBounds.y / 2}
      maxPositionX={maxBounds.x / 2}
      maxPositionY={maxBounds.y / 2}
      maxScale={5}
      minScale={0.8}
      autoAlignment={{ disabled: true }}
      wheel={{ step: 0.005 }}
    >
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", cursor: "grab" }}
      >
        {children}
      </TransformComponent>
    </TransformWrapper>
  )
}

export default BoardWrapper
