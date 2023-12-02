import { TextBubbleEditor } from "@/features/blocks/bubbles/textBubble/components/TextBubbleEditor"
import { useTypebot } from "@/features/editor/providers/TypebotProvider"
import { groupWidth } from "@/features/graph/constants"
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { chakra, Stack, useColorModeValue } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useRef } from 'react'

type Props = {
  groupId: string
  currentCoordinates: Record<"x" | "y", number>
	setIsCommentActive: Dispatch<SetStateAction<boolean>>
}

export const GroupComment = ({ groupId, currentCoordinates, setIsCommentActive }: Props) => {
	const stackRef = useRef(null)
  const { typebot } = useTypebot()
  const bg = useColorModeValue("white", "gray.900")
	
	function handleCommentClose() {
		setIsCommentActive(false)
	}

	useOutsideClick({
		ref: stackRef,
		handler: handleCommentClose
	})
	
  return (
    <Stack
      id={`comment-${groupId}`}
			ref={stackRef}
      p="4"
      pb="5"
      rounded="xl"
      bg={bg}
      borderWidth="1px"
      w={groupWidth}
      transition="border 300ms, box-shadow 200ms"
      pos="absolute"
      style={{
        transform: `translate(${
          currentCoordinates?.x + groupWidth + 12 ?? 0
        }px, ${currentCoordinates?.y ?? 0}px)`,
        touchAction: "none",
      }}
      cursor={"auto"}
      shadow="md"
    >
      <chakra.h3 fontWeight="semibold" pl="1" py="2">
        Note
      </chakra.h3>
      {typebot && (
        <TextBubbleEditor
          id={`text-comment-${groupId}`}
          initialValue={[{ type: "p", children: [{ text: "" }] }]}
          onClose={() => {}}
        />
      )}
    </Stack>
  )
}
