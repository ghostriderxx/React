function delay(interval) {
    return new Promise(resolve => setTimeout(resolve, interval));
}

export {delay}