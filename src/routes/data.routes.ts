// @ts-nocheck
import { Router } from "express";
import { createData, deleteData, getData, getAllData, updateData } from "../controllers/data.route";

const dataRoute = Router();


dataRoute.post('', createData)
dataRoute.get('', getAllData)
dataRoute.get('/:id', getData)
dataRoute.put('/:id', updateData)
dataRoute.delete('/:id', deleteData)

export default dataRoute;
