export function getCharacterType(c)
{
    if(c === ' ') return "space"
    if(["a","e","i","o","u"].indexOf(c) >= 0 ) return "vowel"
    return "consonant" 
}