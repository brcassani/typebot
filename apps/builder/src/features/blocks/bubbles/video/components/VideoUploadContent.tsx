import { Button, HStack, Stack } from '@chakra-ui/react'
import { VideoBubbleBlock } from '@typebot.io/schemas'
import { parseVideoUrl } from '@typebot.io/schemas/features/blocks/bubbles/video/helpers'
import { useState } from 'react'
import { PexelsPicker } from '@/components/VideoUploadContent/PexelsPicker'
import { VideoLinkEmbedContent } from '@/components/VideoUploadContent/VideoLinkEmbedContent'

type Tabs = 'link' | 'pexels'

type Props = {
  content?: VideoBubbleBlock['content']
  onSubmit: (content: VideoBubbleBlock['content']) => void
  initialTab?: Tabs
} & (
  | {
      includedTabs?: Tabs[]
    }
  | {
      excludedTabs?: Tabs[]
    }
)

const defaultDisplayedTabs: Tabs[] = ['link', 'pexels']

export const VideoUploadContent = ({
  content,
  onSubmit,
  initialTab,
  ...props
}: Props) => {
  const includedTabs =
    'includedTabs' in props
      ? props.includedTabs ?? defaultDisplayedTabs
      : defaultDisplayedTabs
  const excludedTabs = 'excludedTabs' in props ? props.excludedTabs ?? [] : []
  const displayedTabs = defaultDisplayedTabs.filter(
    (tab) => !excludedTabs.includes(tab) && includedTabs.includes(tab)
  )

  const [currentTab, setCurrentTab] = useState<Tabs>(
    initialTab ?? displayedTabs[0]
  )

  const updateUrl = (url: string) => {
    const {
      type,
      url: matchedUrl,
      id,
      videoSizeSuggestion,
    } = parseVideoUrl(url)
    if (currentTab !== 'link') {
      // Allow user to update video settings after selection
      setCurrentTab('link')
    }
    return onSubmit({
      ...content,
      type,
      url: matchedUrl,
      id,
      ...(!content?.aspectRatio && !content?.maxWidth
        ? videoSizeSuggestion
        : {}),
    })
  }

  return (
    <Stack>
      <HStack>
        {displayedTabs.includes('link') && (
          <Button
            variant={currentTab === 'link' ? 'solid' : 'ghost'}
            onClick={() => setCurrentTab('link')}
            size="sm"
          >
            Link
          </Button>
        )}
        {displayedTabs.includes('pexels') && (
          <Button
            variant={currentTab === 'pexels' ? 'solid' : 'ghost'}
            onClick={() => setCurrentTab('pexels')}
            size="sm"
          >
            Pexels
          </Button>
        )}
      </HStack>

      {/* Body content to be displayed below conditionally based on currentTab */}
      {currentTab === 'link' && (
        <VideoLinkEmbedContent
          content={content}
          updateUrl={updateUrl}
          onSubmit={onSubmit}
        />
      )}
      {currentTab === 'pexels' && (
        <PexelsPicker
          imageSize="regular"
          onImageSelect={updateUrl}
          videoSize="small"
          onVideoSelect={updateUrl}
        />
      )}
    </Stack>
  )
}
