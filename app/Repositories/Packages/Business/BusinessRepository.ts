import BaseRepository from "../../BaseRepository.js";
import Business from '#models/Businness/business';

export default class BusinessRepository extends BaseRepository {
    constructor() {
        super(Business);
    }
}