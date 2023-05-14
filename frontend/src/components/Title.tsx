import { useEffect } from 'react'
import { useIntl } from 'react-intl'

export function Title({ text }: { text?: string }) {
  const { formatMessage } = useIntl()

  useEffect(() => {
    // TODO: change 'appName' to something else
    document.title = text ? `${formatMessage({ id: text, defaultMessage: text })} | appName` : 'appName'
  }, [text])

  return null
}
