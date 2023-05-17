import { useEffect } from 'react'
import { useIntl } from 'react-intl'

export function Title({ text }: { text?: string }) {
  const { formatMessage } = useIntl()

  useEffect(() => {
    document.title = text
      ? `${formatMessage({ id: text, defaultMessage: text })} | Pengu`
      : 'Pengu'
  }, [text])

  return null
}
