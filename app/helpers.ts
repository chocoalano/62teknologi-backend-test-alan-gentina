import fs from 'fs/promises'
import moment from 'moment'
export async function unlink(filepath: string){
    try {
        await fs.unlink(filepath)
        return true
    } catch (error) {
        return false
    }
}
export function dateformat(date: moment.MomentInput, format: string){
    return moment(date).format(format);
}