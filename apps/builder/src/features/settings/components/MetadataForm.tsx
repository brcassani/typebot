import React from 'react'
import { Metadata } from 'models'
import {
  FormLabel,
  Popover,
  PopoverTrigger,
  Stack,
  Image,
  PopoverContent,
  HStack,
  Text,
} from '@chakra-ui/react'
import { CodeEditor } from '@/components/CodeEditor'
import { ImageUploadContent } from '@/components/ImageUploadContent'
import { MoreInfoTooltip } from '@/components/MoreInfoTooltip'
import { Input, Textarea } from '@/components/inputs'

type Props = {
  typebotId: string
  typebotName: string
  metadata: Metadata
  onMetadataChange: (metadata: Metadata) => void
}

export const MetadataForm = ({
  typebotId,
  typebotName,
  metadata,
  onMetadataChange,
}: Props) => {
  const handleTitleChange = (title: string) =>
    onMetadataChange({ ...metadata, title })
  const handleGoogleTagManagerChange = (googleTagManagerId: string) =>
  onMetadataChange({...metadata, googleTagManagerId })
  const handleDescriptionChange = (description: string) =>
    onMetadataChange({ ...metadata, description })
  const handleFavIconSubmit = (favIconUrl: string) =>
    onMetadataChange({ ...metadata, favIconUrl })
  const handleImageSubmit = (imageUrl: string) =>
    onMetadataChange({ ...metadata, imageUrl })
  const handleHeadCodeChange = (customHeadCode: string) =>
    onMetadataChange({ ...metadata, customHeadCode })

  return (
    <Stack spacing="6">
      <Stack>
        <FormLabel mb="0" htmlFor="icon">
          Icon:
        </FormLabel>
        <Popover isLazy placement="top">
          <PopoverTrigger>
            <Image
              src={metadata.favIconUrl ?? '/favicon.png'}
              w="20px"
              alt="Fav icon"
              cursor="pointer"
              _hover={{ filter: 'brightness(.9)' }}
              transition="filter 200ms"
              rounded="md"
            />
          </PopoverTrigger>
          <PopoverContent p="4">
            <ImageUploadContent
              filePath={`typebots/${typebotId}/favIcon`}
              defaultUrl={metadata.favIconUrl ?? ''}
              onSubmit={handleFavIconSubmit}
              isGiphyEnabled={false}
            />
          </PopoverContent>
        </Popover>
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="image">
          Image:
        </FormLabel>
        <Popover isLazy placement="top">
          <PopoverTrigger>
            <Image
              src={metadata.imageUrl ?? '/viewer-preview.png'}
              alt="Website image"
              cursor="pointer"
              _hover={{ filter: 'brightness(.9)' }}
              transition="filter 200ms"
              rounded="md"
            />
          </PopoverTrigger>
          <PopoverContent p="4">
            <ImageUploadContent
              filePath={`typebots/${typebotId}/ogImage`}
              defaultUrl={metadata.imageUrl}
              onSubmit={handleImageSubmit}
              isGiphyEnabled={false}
            />
          </PopoverContent>
        </Popover>
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="title">
          Title:
        </FormLabel>
        <Input
          id="title"
          defaultValue={metadata.title ?? typebotName}
          onChange={handleTitleChange}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="description">
          Description:
        </FormLabel>
        <Textarea
          id="description"
          defaultValue={metadata.description}
          onChange={handleDescriptionChange}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="googleTagManager">
          Google Tag Manager Id:
          </FormLabel>
          <Input
          id="googleTagManager"
          defaultValue={metadata.googleTagManagerId}
          placeholder="GTM-XXXXXX"
          onChange={handleGoogleTagManagerChange}
          />

      </Stack>
      <Stack>
        <HStack as={FormLabel} mb="0" htmlFor="head">
          <Text>Custom head code:</Text>
          <MoreInfoTooltip>
            Will be pasted at the bottom of the header section, just above the
            closing head tag. Only `meta` and `script` tags are allowed.
          </MoreInfoTooltip>
        </HStack>
        <CodeEditor
          id="head"
          value={metadata.customHeadCode ?? ''}
          onChange={handleHeadCodeChange}
          lang="html"
          withVariableButton={false}
        />
      </Stack>
    </Stack>
  )
}
