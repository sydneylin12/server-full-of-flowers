export const wait = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const makeRequest = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    return await response.json();
};

/**
 * HACK: query the URL to get the chapter ID since we can't use hooks in class components.
 * @returns The chapter ID in the URL params.
 */
export const getParam = () => {
    const parts = window.location.href.split('/');
    const lastPart = parts[parts.length -1]
    const regex = /chapter-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.exec(lastPart)?.[0];
};
