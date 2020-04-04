/**
 * Returns a random number from min to max. 
 * @param min 
 * @param max 
 */
export function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/**
 * Returns 'vowel', 'consonant' or 'space' based on the 
 * input argument
 * @param char 
 */
export function getCharacterType(char)
{
    if(char === ' ') return "space"
    if(["a","e","i","o","u"].indexOf(char.toLowerCase()) >= 0 ) return "vowel"
    return "consonant" 
}