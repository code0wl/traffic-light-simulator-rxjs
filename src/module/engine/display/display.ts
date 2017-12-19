export interface iResolution {
    width: number
    height: number
}

export const Display = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
};