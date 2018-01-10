export const createSubscriber = (tag) => {
  return {
    'next': item => console.log(`${tag}.next: ${item}`),
    'error': err => console.log(`${tag}.err: ${err.stack || err}`),
    'complete': () => console.log(`${tag}.complete`) 
  }
}