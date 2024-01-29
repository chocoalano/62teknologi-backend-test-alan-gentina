import fs from 'fs/promises'
export async function unlink(filepath: string){
    try {
        await fs.unlink(filepath)
        return true
    } catch (error) {
        return false
    }
}