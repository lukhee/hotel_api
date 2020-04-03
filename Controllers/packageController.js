const { validationResult } = require('express-validator')
const Package = require('../Models/PackageSchema')

exports.createPackage = async  (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { 
        type, 
        genders,
        no_of_beds,
        bed_type,
        cost
    } = req.body

    // create packageObj
    const packageObj = { 
        type, 
        genders,
        no_of_beds,
        cost
    }

    //  check if bed_type
    if(bed_type) packageObj.bed_type = bed_type

    try{
        // check if the package exit
        let package = await Package.findOne({ type })
        if(package) return res.status(400).json({ error: [{ msg: 'type already created' }]})
        
        // create new package
        package = new Package(packageObj)
        await package.save()

        res.json(package)
    } catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }
}

exports.getAllPackage = async (req, res, next) => {
    try {
        let package = await Package.find()
        res.json(package)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
}

exports.updatePackage = async (req, res, next) => {
    const {
        type, 
        genders,
        no_of_beds,
        bed_type,
        cost
    } = req.body

    // create packageObj
    const packageObj = { 
        type, 
        genders,
        no_of_beds,
        cost
    }

    //  check if bed_type
    if(bed_type) packageObj.bed_type = bed_type

    try {
        const package = await Package.findOneAndUpdate(
            {_id: req.params.id},
            { $set: packageObj },
            { new: true })
            res.json(package)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
}

exports.deletePackage = async (req, res, next) => {
    try {
        await Package.findOneAndRemove({ _id: req.params.id })
        res.json({msg: "Package deleted successfully"})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
}