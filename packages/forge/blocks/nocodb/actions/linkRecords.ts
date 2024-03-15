import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import { HTTPError, got } from 'got'
import { LinkRecordsResponse } from '../types'

export const linkRecords = createAction({
  auth,
  name: 'Link Records',
  options: option.object({
    tableId: option.string.layout({
      label: 'Table ID',
      isRequired: true,
      helperText: 'Identifier of the table to link records in.',
    }),
    linkFieldId: option.string.layout({
      label: 'Link Field ID',
      isRequired: true,
      helperText: 'Identifier of the link field to create links for.',
    }),
    recordId: option.string.layout({
      label: 'Record ID',
      isRequired: true,
      helperText: 'Identifier of the record to create links for.',
    }),
    recordIds: option.keyValueList.layout({
      label: 'Record IDs',
      helperText: 'List of record IDs to link.',
      isRequired: true,
    }),
  }),
  run: {
    server: async ({
      credentials: { apiEndpoint, apiKey },
      options: { tableId, linkFieldId, recordId, recordIds },
      logs,
      variables,
    }) => {
      try {
        if (!recordIds || recordIds.length === 0) return

        const res: LinkRecordsResponse = await got
          .post(
            `${apiEndpoint}/api/v2/tables/${tableId}/links/${linkFieldId}/records/${recordId}`,
            {
              headers: {
                'Xc-Token': apiKey,
              },
              json: recordIds.map((recordId) => ({ Id: recordId.value })),
            }
          )
          .json()
      } catch (error) {
        if (error instanceof HTTPError)
          return logs.add({
            status: 'error',
            description: error.message,
            details: error.response.body,
          })
        console.error(error)
      }
    },
  },
})
