const Resource = require('../../models/roles/resource.model');

const getResources = async (req, res, next) => {
    try{
        const resources = await Resource.findAll();
        res.json(resources);
    }catch(err){
        next(err);
    }
}

const getResourcesById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const resource = await Resource.findByPk(id);
        res.json(resource);
    }catch(err){
        next(err);
    }
}

const createResource = async (req, res, next) => {
    try{
        const { name } = req.body;
        const newResource = await Resource.create({name});
        res.json(newResource);
    }catch(err){
        next(err);
    }
}

const updateResource = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { name } = req.body;
        const resource = await Resource.findByPk(id);
        resource.name = name;
        await resource.save();
        res.json(resource);
    }catch(err){
        next(err);
    }
}

const deleteResource = async (req, res, next) => {
    try{
        const { id } = req.params;
        const resource = await Resource.findByPk(id);
        await resource.destroy();
        res.json(resource);
    }catch(err){
        next(err);
    }
}

module.exports = {
    getResources,
    getResourcesById,
    createResource,
    updateResource,
    deleteResource
}
