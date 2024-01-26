import BaseRepository from "../../BaseRepository.js";
import Category from '#models/Businness/category';

export default class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category);
    }
}