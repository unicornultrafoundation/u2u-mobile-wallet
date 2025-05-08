import { getDomain } from "./string"

export const parseRun = (id: any, result: any) => {
	const parsedResult = typeof result === 'string' ? `'${result}'` : JSON.stringify(result)
	return `
		window.ethereum.sendResponse(${id}, ${parsedResult})
	`
}

export const parseError = (id: any, errMessage: any) => {
	return `
		window.ethereum.sendError(${id}, '${errMessage}')
	`
}

export const parseEmit = (event: string, message: any) => {
	const parsedMessage = typeof message === 'string' ? `'${message}'` : JSON.stringify(message)
	return `
		window.ethereum.remoteEmit(${event}, '${parsedMessage}')
	`
}

export const hardReload = () => {
	return `
		window.ethereum.replace(window.location.href + '?reload=${Date.now()}')
	`
}

export const isListedDApp = (url: string, dappList: Record<string, any>[]) => {
	if (!url || url === '') return false

	const listedDomainList = dappList.map((i) => getDomain(i.url))
	const domain = getDomain(url)

	return listedDomainList.includes(domain) || domain.includes('google.com')
}